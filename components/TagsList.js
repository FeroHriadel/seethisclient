import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import { getTags } from '../actions/tagActions';
import BlackCircle from '../components/BlackCircle';
import { FaTrash, FaPenFancy } from "react-icons/fa";
import router from "next/router";



export default function TagsList() {
    //CONTEXT
    const { state, dispatch } = useContext(Context);



    //GET CATEGORIES
    const [message, setMessage] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        setMessage('Loading tags...');
        getTags()
            .then(data => {
                if (!data || data.error) {
                    return setMessage(`Error: ${data && data.error ? data.error : ''}`)
                }

                setTags(data);
                setMessage('');
            });
    }, [])



    //RENDER
    return (
        <section className='tags-list-container'>
            <ul>
                {
                    tags && tags.length < 1
                    ?
                    <li>
                        <h4>No tags found</h4>
                    </li>
                    :
                    tags.map(t => (
                        <li key={t._id}>
                            <BlackCircle>
                                <p>{t.name}</p>
                            </BlackCircle>

                            <h3>{t.name}</h3>

                            <div className='buttons'>
                                <p onClick={() => {router.push(`/admin/tagedit?tagId=${t._id}`)}}> <FaTrash /> </p>
                                <p onClick={() => {router.push(`/admin/tagedit?tagId=${t._id}`)}}> <FaPenFancy /> </p>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

