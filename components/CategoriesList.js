import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import { getCategories } from '../actions/categoryActions';
import RedCircle from '../components/RedCircle';
import { FaTrash, FaPenFancy } from "react-icons/fa";
import router from "next/router";



export default function CategoriesList() {
    //CONTEXT
    const { state, dispatch } = useContext(Context);



    //GET CATEGORIES
    const [message, setMessage] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setMessage('Loading categories...');
        getCategories()
            .then(data => {
                if (!data || data.error) {
                    return setMessage(`Error: ${data && data.error ? data.error : ''}`)
                }

                setCategories(data);
                setMessage('');
            });
    }, [])


    //RENDER
    return (
        <section className='categories-list-container'>
            <ul>
                {
                    categories && categories.length < 1
                    ?
                    <li>
                        <h4>No categories found</h4>
                    </li>
                    :
                    categories.map(c => (
                        <li>
                            <RedCircle>
                                <p>{c.name}</p>
                            </RedCircle>

                            <h3>{c.name}</h3>

                            <div className='buttons'>
                                <p onClick={() => {router.push(`/admin/categoryedit?categoryId=${c._id}`)}}> <FaTrash /> </p>
                                <p onClick={() => {router.push(`/admin/categoryedit?categoryId=${c._id}`)}}> <FaPenFancy /> </p>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

