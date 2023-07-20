import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './signup.css'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function Signup() {
    let navigate = useNavigate()
    const [open, setOpen] = useState(false);
    let [popMessage, setPopupMessage] = useState('')

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    // const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/

    function nameValidate() {
        const name = document.getElementById('name')
        const nameError = document.getElementById('nameError')
        if (name.value === "") {
            nameError.innerText = "*Required"
        }
        else {
            if (!isNaN(name.value)) {
                nameError.innerText = "*Invalid"
            }
            else {
                nameError.innerText = ""
            }
        }
    }

    function emailValidate() {
        const email = document.getElementById('email')
        const emailError = document.getElementById('emailError')
        if (email.value === "") {
            emailError.innerText = "*Required"
        }
        else {
            if (!isNaN(email.value)) {
                emailError.innerText = "*Invalid"
            }
            else {
                emailError.innerText = ""
            }
        }
    }

    function passwordValidate() {
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        if (password.value === "") {
            passwordError.innerText = "*Required"
        }
        else {
            passwordError.innerText = ""
        }
    }

    function registerClick() {
        const name = document.getElementById('name')
        const nameError = document.getElementById('nameError')
        const email = document.getElementById('email')
        const emailError = document.getElementById('emailError')
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/

        if (name.value === "") {
            nameError.innerText = "*Required"
        }
        else {
            if (!isNaN(name.value)) {
                nameError.innerText = "*Invalid"
            }
            else {
                nameError.innerText = ""
            }
        }
        if (email.value === "") {
            emailError.innerText = "*Required"
        }
        else {
            if (email.value.match(emailPattern)) {
                emailError.innerText = ""
            }
            else {
                emailError.innerText = "*Invalid"
            }
        }
        if (password.value === "") {
            passwordError.innerText = "*Required"
        }
        else {
            if (password.value.length < 6 || password.value.length > 15) {
                passwordError.innerText = "*Password should be between 6 to 15"
            }
            else {
                passwordError.innerText = ""
            }
        }
        if (nameError.innerText === "" && emailError.innerText === "" && passwordError.innerText === "") {
            const signupDetails = {
                name: name.value,
                email: email.value,
                password: password.value
            }
            axios.post('https://user-signup-login-backend.onrender.com/signup', signupDetails)
                .then((response) => {
                    if (response.data.message === "signup successful") {
                        setPopupMessage("Signup Successful")
                        setOpen(true)
                        setTimeout(() => {
                            navigate('/')
                        }, 2000);
                    }
                    else {
                        emailError.innerText = "*Email Id already exist"
                        setTimeout(() => {
                            emailError.innerText = ""
                        }, 2500);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
    return (
        <>
            <div className="container shadow rounded-3 position-absolute top-50 start-50 translate-middle" style={{ maxWidth: '400px', padding: '20px' }}>
                {/* <div> */}
                <h4 className='text-center' style={{ fontFamily: 'Arial' }}>Signup</h4>
                <div>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onKeyUp={() => { nameValidate() }} />
                    <span className="text-danger" id='nameError'></span>
                </div>
                <div>
                    <label htmlFor="email" className="form-label emailId mt-3">Email Id</label>
                    <input type="text" className="form-control" id="email" aria-describedby="emailHelp" onKeyUp={() => { emailValidate() }} />
                    <span className="text-danger" id='emailError'></span>
                </div>
                <div>
                    <label htmlFor="password" className="form-label mt-3">Password</label>
                    <input type="password" className="form-control" id="password" aria-describedby="emailHelp" onKeyUp={() => { passwordValidate() }} />
                    <span className="text-danger" id='passwordError'></span>
                </div>

                <div className='text-center mt-3'>
                    <button className="btn btn-outline-primary" onClick={() => { registerClick() }}>Register</button>
                </div>

                <div className='text-center mt-3 backToLogin'>
                    <span className='text-primary' onClick={() => { navigate('/') }}>back to login</span>
                </div>
                {/* </div>  */}
            </div>
            {
                open ? <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} message={popMessage} action={action} /> : ''
            }
        </>
    )
}

export default Signup