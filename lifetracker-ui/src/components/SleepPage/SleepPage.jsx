import React, { useState, useEffect } from "react";





export default function SleepPage() {
    const [sleepLogged, setSleepLogged] = useState(false)

    useEffect ( function checkLocalStorageForTokens () {
        const localStorageCheck = localStorage.getItem("token")
    
        if(localStorageCheck)
        {
            setSleepLogged(true)
        }
    
    }) 



    return (
        <>
        
        {sleepLogged ? (<h1> Form and etc </h1>)
        :  (<h1> Log In to View page </h1>)
    }

</>
    )

}