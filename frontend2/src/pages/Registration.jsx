import React from 'react';
import "./CSS/Registration.css"

function Registration () {
    return (
        <div className='registration'>
            <div className='container'>
                <h1>Sign Up</h1>
                <div className='registrationFields'>
                    <input type="text" placeholder='Your Name'></input>
                    <input type="email" placeholder='Email Address'></input>
                    <input type="password" placeholder='Password'></input>
                </div>
                <button>Continue</button>
                <p className='Login'>Already have an account? <span>Login here</span></p>
            </div>
        </div>
    )
}

export default Registration