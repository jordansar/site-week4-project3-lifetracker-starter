import React from "react";
import { useState, useEffect } from "react";




export default function ActivityPage() {



    const [activityLogged, setActivityLogged] = useState(false)

    useEffect ( function checkLocalStorageForTokens () {
        const localStorageCheck = localStorage.getItem("token")
    
        if(localStorageCheck)
        {
            setActivityLogged(true)
        }
    
    }) 



    return (
        <>
        
        {activityLogged ? (<h1> Activities </h1>)
        :  (<h1> Log In to View page </h1>)
    }

</>
    )
}