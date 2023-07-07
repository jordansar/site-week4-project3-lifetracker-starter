import React, { useState } from "react";
import './Navbar.css'
import { Link } from "react-router-dom";








export default function Navbar({handleLogout, isLogged}) {




    return (
        <>
        <div className="Navbar css-15bu2in">
            <div className="css-70qvj9">
                <Link className="chakra-link css-14rj303"  to="/"> <img src="https://lifetracker.up.railway.app/assets/codepath-f1b3e41a.svg" alt="logo"/>  </Link>
                <Link className="chakra-link css-74uit1"  to="/activity" > Activity </Link>
                <Link className="chakra-link css-74uit1"  to="/exercise" > Exercise </Link> 
                <Link className="chakra-link css-74uit1"  to="/nutrition" > Nutrition </Link>
                <Link className="chakra-link css-74uit1"  to="/sleep" > Sleep </Link>
            </div>


            
            
            { isLogged ? (
                


             <div className="css-70qvj9">
                <a className="chakra-link css-spn4bz" href="/login">
                    <button type="button" className="chakra-button css-1t9i4zo"  onClick={handleLogout}>Sign Out</button>
                </a> 
            </div>
                ) : (  
               
                <div className="css-70qvj9">
                    <a className="chakra-link css-spn4bz" href="/login">
                        <button type="button" className="chakra-button css-1t9i4zo" >Sign In</button>
                    </a>
                
                    <a className="chakra-link css-spn4bz" href="/register">
                        <button type="button" className="chakra-button css-td8gbm">Register</button>
                    </a>
                </div>

                    )
                }


                

          



            


        </div>
        </>
    )
}









            {/* { !isLogged ? (  <div className="css-70qvj9">
                <a className="chakra-link css-spn4bz" href="/login">
                    <button type="button" className="chakra-button css-1t9i4zo" onClick={setIsLogged=(isLogged)}>Sign Out</button>
                </a> </div>) : (
                    <div className="css-70qvj9">
                    <a className="chakra-link css-spn4bz" href="/login">
                        <button type="button" className="chakra-button css-1t9i4zo" >Sign In</button>
                    </a>
                    
                    <a className="chakra-link css-spn4bz" href="/register">
                        <button type="button" className="chakra-button css-td8gbm">Register</button>
                    </a>
                </div>
                  )
            
            
            } */}


