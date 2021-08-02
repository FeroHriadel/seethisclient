import React, { useState, useEffect, useContext } from "react";
import { Context } from '../context';



export default function Switch() {
    //GET THEME FROM CONTEXT.STATE.MODE
    const { state, dispatch } = useContext(Context);
    const [theme, setTheme] = useState(''); //in addition to context.state use react.state as html reacts poorly to changes in context.state

    useEffect(() => { //populate theme on componentDidMount
        if (typeof window !== 'undefined') {
            const themeFromLS = localStorage.getItem('theme');
            setTheme(themeFromLS)
        }
    }, []);



    //REWRITE SCSS VARIABLES ON CONTEXT.STATE.MODE CHANGE
    useEffect(() => {
        if (state.mode === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        }

        if (state.mode === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, [state.mode]);



    //DISPATCH NEW MODE TO CONTEXT ON SWITCH CLICK
    const switchTheme = () => {
        if (state.mode === 'light') {
            localStorage.setItem('theme', 'dark');
            dispatch({type: 'SET_MODE', payload: 'dark'});
            setTheme('dark');
        }

        if (state.mode === 'dark') {
            localStorage.setItem('theme', 'light');
            dispatch({type: 'SET_MODE', payload: 'light'});
            setTheme('light');
        }
    }



    //RENDER
    return (
        <div id="toggle" className={theme === 'light' ? '' : 'active'} onClick={switchTheme}>
            <i className="indicator"></i>
        </div>

    )
}
