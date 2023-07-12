import React, { useState, useEffect } from "react";
import axios from "axios"
import "./SleepPage.css"



export default function SleepPage() {
    const [sleepLogged, setSleepLogged] = useState(false)
    const [sleeptime, setSleepTime] = useState("")
    const [waketime, setWakeTime] = useState("")
    const [displayData, setDisplayData] = useState([]);
    const [errors, setErrors] = useState({})
    const [sleepState, setSleepState] = useState({})
    const [formData, setFormData] = useState({sleeptime: "", waketime:  "", id: localStorage.getItem("id")})

    useEffect ( function checkLocalStorageForTokens () {
        const localStorageCheck = localStorage.getItem("token")
    
        if(localStorageCheck)
        {
            setSleepLogged(true)
        }
    
    })  
    

    useEffect(() => {
        getSleeps();

    }, [])
    


    async function getSleeps () {
        const localStorageCheck = localStorage.getItem("token")
        console.log("token in here? ", localStorage.getItem("id"))
        if(localStorageCheck)
        {
            // setSleepLogged(true)
        // }

        try {
              let res = await axios.post(`https://my-lifetracker-backend.onrender.com/auth/getSleep`, formData)
              console.log(res.data)
         
            //   if (res?.data) {
            //     console.log("returned", res.data)
            //   } else {
            //     setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
            //   }


    
            } catch {
                console.log(err)
                // const message = err?.response?.data?.error?.message
                // setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
            }
        }
    }
    
    

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        // setIsLoading(true)
        setErrors((e) => ({ ...e, form: null }))
    
        try {
        //   console.log("form", formData)
          let res = await axios.post(`https://my-lifetracker-backend.onrender.com/auth/sleep`, formData)
          
          
          console.log(res.data)
          
          if (res?.data) {
              setSleepState(res.data)
              setDisplayData([...displayData, formData])
            //   console.log("here's the display", displayData)
              // console.log(res.data)


            
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



    return (
        <>
        
        {sleepLogged ? 
        ( 
            // <h1> Form and etc </h1>
            <div className="css-vpbd2d">
                <div className="css-0">
                    <div className="css-pwgvc2">
                        <div className="chakra-stack css-1jtnem3">
                            <div className="css-1hv8zgx">
                                <div></div>
                                
                                <div className="css-mlsaez">
                                    <div className="chakra-stack css-13ra036">
                                        <h2 className="chakra-heading css-j6rr3f">Record Sleep</h2>
                                        <div className="css-ebzegt">
                                            <form>
                                                <div className="chakra-stack css-1db3zf7">
                                                        <div role="group" className="chakra-form-control css-1kxonj9">
                                                            <label id="field-:re:-label" htmlFor="field-:re:" className="chakra-form__label css-g6pte">
                                                                Start Time
                                                            <span role="presentation" aria-hidden="true" className="chakra-form__required-indicator css-1tfjd1n">*</span>
                                                            </label>
                                                        

                                                            <div className="chakra-input__group css-bx0blc" data-group="true">
                                                                <input name="startTime" type="datetime-local" placeholder="Start Time" id="field-:re:" required="" aria-required="true" className="chakra-input css-p20xy6" value={formData.sleeptime} onChange= {(e) => setFormData({...formData, sleeptime: e.target.value})}/>
                                                            </div>
                                                        </div>


                                    
                                                                <div role="group" className="chakra-form-control css-1kxonj9">
                                                                    <label id="field-:rf:-label" htmlFor="field-:rf:" className="chakra-form__label css-g6pte">End Time<span role="presentation" aria-hidden="true" className="chakra-form__required-indicator css-1tfjd1n">*</span></label>

                                    
                                                                            <div className="chakra-input__group css-bx0blc" data-group="true">
                                                                                <input name="endTime" type="datetime-local" placeholder="End Time" id="field-:rf:" required="" aria-required="true" className="chakra-input css-p20xy6" value={formData.waketime} onChange= {(e) => setFormData({...formData, waketime: e.target.value})} />
                                                                            </div>
                                                                </div>


                                                            <button type="submit" className="chakra-button css-1hnyqz6" onClick={handleOnSubmit}>Save</button>
                                                </div>
                                            </form>

                                        <div> { displayData.length > 0 ? (
                                             displayData.map((data, index) => (
                                                    <div className="sleepGrid" key={index}>
                                                        <div > Start time is {data.sleeptime}</div>
                                                        <p> End time is {data.waketime}</p>
                                                    </div>
                                                ))
                                                 ) : ( <p></p> )} </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        )
        :  
        (
            <h1> Log In to View page </h1>
        )

    }

    

</>
    )

}

