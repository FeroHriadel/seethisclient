/* HOW TO USE:
    - just wrap the page you want to protect from non-logged-in users into this
*/


import React, { useEffect, useContext, useState } from "react";
import { useRouter } from 'next/router';
import { Context } from '../context';
import { getUser } from '../actions/userActions';



export default function ProtectRoute({ children }) {
    //ROUTER
    const router = useRouter();
    
    //CONTEXT
    const { state, dispatch } = useContext(Context);

    //STATE
    const [isUser, setIsUser] = useState(true);
    


    //CHECK IF USER IS LOGGED-IN:
        //component-did-mount user check
        useEffect(() => {
            if (typeof window !== 'undefined') {
                if (state && state.user && state.user) {
                    setIsUser(true);
                } else {
                    setIsUser(false);
                }
            }
        }, []);

        //keep checking Context state for user
        useEffect(() => {
            if (typeof window !== 'undefined') {

                if (!state || !state.user) {
                    setIsUser(false);
                } else {
                    setIsUser(true);
                }

            }
        }, [state.user])

        //redirect non-logged-in users
        useEffect(() => {
            if (!isUser) {
                router.push('/pleasesignin');
            }
        }, [isUser]);




    //RENDER
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}
