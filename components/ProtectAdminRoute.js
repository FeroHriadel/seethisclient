/* HOW TO USE:
    - just wrap the page you want to protect from non-logged-in users into this
*/


import React, { useEffect, useContext, useState } from "react";
import { useRouter } from 'next/router';
import { Context } from '../context';
import { getUser } from '../actions/userActions';



export default function ProtectAdminRoute({ children }) {
    //ROUTER
    const router = useRouter();

    //CONTEXT
    const { state, dispatch } = useContext(Context);
    
    /****************************************************************
    how beautiful life would be if I only could do this:

        useEffect(() => {
            if (!state || !state.user) {
                router.push('/')
            } else {
                getUser(state.user.token)
                    .then(data => {
                        //if data.role === 'admin'   => stay on this page
                        //if data.role !== 'admin'   => redirect
                    })
            }
        }, [state.user]);

    but SSR is a bitch and that's why:
   *****************************************************************/
    
    //STATE
    const [userFetched, setUserFetched] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [redirect, setRedirect] = useState(false);



    //KEEP CHECKING IF USER IS ADMIN:
    useEffect(() => {
        if (typeof window !== 'undefined') {

            if (state && state.user) {
                //fetch user
                getUser(state.user.token)
                .then(data => {
                    if (!data || data.error) {
                        console.log('ProtectAdminRoute getUser error');
                        return;
                    }
    
                    if (data.role === 'admin') {
                        setUserRole(data.role)
                        setUserFetched(true);
                    } else {
                        setUserRole(data.role);
                        setUserFetched(true);
                    }
                })
    
            //on signout
            } else {
                router.push('/');
            }

        }
    }, [state.user]);

    //redirect non-admins
    useEffect(() => {
        if (userFetched && userRole !== 'admin') {
            // console.log('NOT AN ADMIN');
            setRedirect(true);
        } else {
            console.log('Admin verified')
        }
    }, [userFetched]);

    useEffect(() => {
        if (redirect) {
            router.push('/');
        }
    }, [redirect]);



    //RENDER
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}
