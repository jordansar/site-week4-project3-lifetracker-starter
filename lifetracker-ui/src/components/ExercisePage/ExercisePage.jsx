import React, { useState, useEffect } from "react";





export default function ExercisePage() {
    const [exerciseLogged, setExerciseLogged] = useState(false)

    useEffect ( function checkLocalStorageForTokens () {
        const localStorageCheck = localStorage.getItem("token")
    
        if(localStorageCheck)
        {
            setExerciseLogged(true)
        }
    
    }) 



    return (
        <>
        
        {exerciseLogged ? (<h1> Form and etc </h1>)
        :  (<h1> Log In to View page </h1>)
    }

</>
    )

}