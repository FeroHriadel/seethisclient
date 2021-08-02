import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../context';
import { getUsers, toggleUserRole } from '../../actions/userActions';
import Bricks from '../../components/Bricks';
import Switch from '../../components/Switch';
import Menu from '../../components/Menu';
import Heading from '../../components/Heading';
import ButtonSquare from '../../components/ButtonSquare';
import ProtectAdminRoute from '../../components/ProtectAdminRoute';
import { FaIdCardAlt } from "react-icons/fa";



export default function Users() {
    //CONTEXT
    const { state, dispatch } = useContext(Context);



    //VALUES
    const [message, setMessage] = useState('Getting users...')
    const [values, setValues] = useState({
        pageNumber: 1,
        numberOfPages: '',
        users: [],
        role: ''
    });

    const { pageNumber, numberOfPages, users, role } = values;



    //FETCH INITIAL USERS
    useEffect(() => {
        if (typeof window !== 'undefined' && state && state.user) {
            getUsers(state.user.token, 1, '') //required params: (authtoken, pageNumber, role)
            .then(data => {
                if (!data || data.error) {
                    return setMessage(`Error: ${data && data.error ? data.error : 'Users could not be fetched'}`)
                }

                setValues(data);
                setMessage('');
            });
        }
    }, [state.user]);



    //INFINITE SCROLL (didn't really test this => not enough users but it might work)
    const loadMore = (e) => {
        const totalHeight = e.target.scrollHeight;
        const scrolledFromTop = e.target.scrollTop;
        const viewHeight = e.target.clientHeight;

        if (
            scrolledFromTop + viewHeight >= totalHeight * 0.9
            &&
            pageNumber <= numberOfPages
        ) {
            getUsers(state.users.token, pageNumber, role)
                .then(data => {
                    if (!data || data.error) {
                        return console.log(`Error: ${data && data.error ? data.error : 'Could not load more'}`)
                    }

                    setValues({...values, pageNumber: values.pageNumber + 1, numberOfPages: values.numberOfPages, users: [...values.users, ...data.users]});
                });
        }
    }



    //FETCH FILTERED USERS
    const fetchFilteredUsers = (role) => {
        getUsers(state.user.token, 1, role)
            .then(data => {
                if (!data || data.error) {
                    return setMessage(`Error: ${data && data.error ? data.error : 'Could not filter users'}`)
                }

                setValues({...values, pageNumber: data.pageNumber, numberOfPages: data.numberOfPages, users: [...data.users], role: role});
                console.log(data)
                setMessage('');
            })
    }



    //CHANGE USER'S ROLE
    const changeUserRole = userId => {

        toggleUserRole(userId, state.user.token)
            .then(data => {
                if (!data || data.error) {
                    setMessage(`User's role could not be changed`);
                    setTimeout(() => {setMessage('')}, 3000);
                    return
                }

                let usersArray = values.users;
                let updatedUserIndex = usersArray.findIndex(user => user._id === userId);
                usersArray.splice(updatedUserIndex, 1, data);

                setValues({...values, users: [...usersArray]});
                setMessage('');
            });
    }



    //RENDER
    return (
        <ProtectAdminRoute>
            <div className='admin-user-list-page' onScroll={loadMore}>
                <Bricks />
                <Switch />
                <Menu />

                <div className='container'>
                    <Heading>
                        <span>User </span> List
                    </Heading>

                    {
                        message
                        &&
                        <p className='message'>{message}</p>
                    }

                    <section className='filter-box'>
                        <ButtonSquare 
                            text='Show all users' 
                            action={() => {
                                setValues({users: [], pageNumber: 1, role: ''});
                                fetchFilteredUsers('');
                            }}
                        />
                        <ButtonSquare 
                            text='Show non-admins' 
                            action={() => {
                                setValues({users: [], pageNumber: 1, role: 'user'});
                                fetchFilteredUsers('user');
                            }}
                        />
                        <ButtonSquare 
                            text='Show admins' 
                            action={() => {
                                setValues({users: [], pageNumber: 1, role: 'admin'});
                                fetchFilteredUsers('admin');
                            }}
                        />
                    </section>

                    <section className='users-list'>
                        {
                            !users || users.length < 1
                            ?
                            <p className='no-users-message'>No users found</p>
                            :
                            users.map(user => (
                                <div className='line' key={user._id}>
                                    <p className='email'>{user.email}</p>
                                    <h3 className='role'>{user.role}</h3>
                                    <p 
                                        className='btn' 
                                        title='Grant/Remove admin access'
                                        onClick={() => {changeUserRole(user._id)}}
                                    >
                                        <FaIdCardAlt />
                                    </p>
                                </div>
                            ))
                        }
                    </section>
                </div>
            </div>
        </ProtectAdminRoute>
    )
}
