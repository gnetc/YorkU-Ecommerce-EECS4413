import React, {useState} from 'react'
import "./CSS/Registration.css"
import {useNavigate, Link} from 'react-router-dom'



function Registration () {
    const [errorMessage, setErrorState] = useState(null)
    const navigate = useNavigate()
    async function Signup(e) {
    e.preventDefault()
    const response = await fetch("http://localhost:8080/signup", {

        method:"POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            passwordHash: e.target.passwordHash.value,
            role: "user"

        })
    })

    if(!response.ok){
        const message = await response.text()
        setErrorState(message)
        console.log(message)
        return
    }
    const data = await response.text()
    navigate("/Login")
    }


    return (
        <div className='registration'>
            <div className='container'>
                <h1>Sign Up</h1>
                <form onSubmit = {Signup}>
                {errorMessage && <p>{errorMessage}</p>}
                <div className='registrationFields'>
                    <input type="text" placeholder='First Name' name = "firstName"></input>
                    <input type="text" placeholder='Last Name' name = "lastName"></input>
                    <input type="email" placeholder='Email Address' name = "email"></input>
                    <input type="password" placeholder='Password' name = "passwordHash"></input>
                </div>
                    <button type = 'submit'>Continue</button>
                </form>
                <p className='Login'>Already have an account? <Link to = "/Login">Login here</Link></p>
            </div>
        </div>
    )
}

export default Registration