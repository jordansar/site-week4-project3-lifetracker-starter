import React from "react";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"



export default function Login ({ setAppState ,setToken, handleLogin, isLogged, setIsLogged}) {
    
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
      email: "",
      password: "",
    })



    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
          if (event.target.value.indexOf("@") === -1) {
            setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
          } else {
            setErrors((e) => ({ ...e, email: null }))
          }
        }
    
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
      }




      const handleOnSubmit = async (e) => {
        e.preventDefault()
        // setIsLoading(true)
        setErrors((e) => ({ ...e, form: null }))
    
        try {
        
          let res = await axios.post(`https://my-lifetracker-backend.onrender.com/auth/login`, form)
          
     
          if (res?.data) {
            // console.log("id in here for login", res.data.user.id)
            setAppState(res.data)
            setIsLogged(true)
            navigate("/")
            localStorage.setItem("token", res.data.user.token)
            localStorage.setItem("id", res.data.user.id)
            // console.log(res.data.user.token)
            // console.log('token below!')
            setToken(res.data.user.token)
            
          } else {
            setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
            // setIsLoading(false)
          }
        } catch (err) {
          console.log(err)
          const message = err?.response?.data?.error?.message
          setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
        //   setIsLoading(false)
        }
      }

      






      {/* <h1> Login Here</h1> */}


    return (
    
        // <div className="home">
        <div className="Login">
        <div className="media">
          
        </div>
  
        <div className="card">
          <h2>Login to the Portal</h2>
  
          {Boolean(errors.form) && <span className="error">{errors.form}</span>}
          <br />
  

          <div className="form">
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="user@gmail.com" value={form.email} onChange={handleOnInputChange}/>
              {errors.email && <span className="error">{errors.email}</span>}
            </div>



  
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleOnInputChange}/>
              {errors.password && <span className="error">{errors.password}</span>}
              
            </div>
            
            <button className="btn"  onClick={handleOnSubmit}>
            Login
            </button>
          </div>
  
          <div className="footer">
            <p>
              Don't have an account? Sign up <Link to="/register">here</Link>
            </p>
          </div>
        </div>
      </div>

               
        // </div>
    )
}