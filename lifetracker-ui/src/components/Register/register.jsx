import * as React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"



export default function Register({ setAppState }) {

    const navigate  =useNavigate()
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    })


    const registerUrl = "https://my-lifetracker-backend.onrender.com/auth/register";





    const handleInputChange = async (event) => {

        if (event.target.name === "password") {
            if (form.confirmPassword && form.confirmPassword !== event.target.value) {
              setErrors((e) => ({ ...e, confirmPassword: "Password's do not match" }))

            } else {
              setErrors((e) => ({ ...e, confirmPassword: null }))
            }
          }


          if (event.target.name === "confirmPassword") {
            if (form.password && form.password !== event.target.value) {
              setErrors((e) => ({ ...e, confirmPassword: "Password's do not match" }))
            } else {
              setErrors((e) => ({ ...e, confirmPassword: null }))
            }
          }


          if (event.target.name === "email") {
            if (event.target.value.indexOf("@") === -1) {
              setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
            } else {
              setErrors((e) => ({ ...e, email: null }))
            }
          }


          setForm((f) => ({ ...f, [event.target.name]: event.target.value }))

    }

    


    

    const handleSubmit =  async () => {
        // event.preventDefault();
        setErrors((e) => ({ ...e, form: null }))
        
        
        
        if (form.confirmPassword !== form.password) {
            setErrors((e) => ({ ...e, confirmPassword: "Passwords do not match." }))
            //   setIsLoading(false)
            console.log(errors.email)
            return
        } else {
          setErrors((e) => ({ ...e, confirmPassword: null }))


        try {
            const res = await axios.post(registerUrl, {
                username: form.username,
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                password: form.password
            })


            console.log(res.data)

            

            if (res?.data?.user) {
                setAppState(res.data)
                // setIsLoading(false)
                navigate("/login")
              } else {
                setErrors((e) => ({ ...e, form: "Something went wrong with registration" }))
                // setIsLoading(false)
              }


        } catch (err) {
            
            console.log(err)
            const message = err?.response?.data?.error?.message
            setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
            // setIsLoading(false)
        }


        }


       
      };





    return (


<div className="registerHome">
        <h1>Register Here</h1>

    <div>
        <div>
            <label htmlFor="email"></label>
            <input type="email" id="email" name="email" placeholder="Email" value={form.email} onChange={handleInputChange}/>
            {errors.date && <span className="error">{errors.email}</span>}
        </div>


        <div>
            <label htmlFor="username"></label>
            <input type="text" id="username" name="username" placeholder="username" value={form.username} onChange={handleInputChange} />
        </div>

        <div>
            <label htmlFor="firstName"></label>
            <input type="text" id="firstName" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleInputChange}/>
        </div>


        <div>
            <label htmlFor="lastName"></label>
            <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleInputChange}/>
        </div>


        <div>
            <label htmlFor="password"></label>
            <input type="password" id="password" name="password"   placeholder="Password" value={form.password} onChange={handleInputChange}/>
        </div>


        <div>
            <label htmlFor="confirmPassword"></label>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleInputChange}/>
        </div>

        <div>
      <button onClick={handleSubmit}>Submit</button>
      </div>

      <div>
        <p>
            Already have an account? Login <Link to="/login" > here </Link>
        </p>
      </div>
    </div>

    </div>
    )
}


