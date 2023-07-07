import React, { useState, useEffect } from "react";





export default function NutritionPage() {
    const [nutritionLogged, setNutritionLogged] = useState(false)

    useEffect ( function checkLocalStorageForTokens () {
        const localStorageCheck = localStorage.getItem("token")
    
        if(localStorageCheck)
        {
            setNutritionLogged(true)
        }
    
    }) 



    return (
        <>
        
        {nutritionLogged ? (<h1> Form and etc </h1>)
        :  (<h1> Log In to View page </h1>)
    }

</>
    )

}