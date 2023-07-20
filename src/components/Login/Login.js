import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './/login.css'

function Login() {
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

  function emailValidate() {
    const emailId = document.getElementById('emailId')
    const emailIdError = document.getElementById('emailIdError')
    if (emailId.value === "") {
      emailIdError.innerText = "*Required"
    }
    else {
      emailIdError.innerText = ""
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

  function loginClick() {
    const emailId = document.getElementById('emailId')
    const password = document.getElementById('password')
    const emailIdError = document.getElementById('emailIdError')
    const passwordError = document.getElementById('passwordError')
    const invalidCredentials=document.getElementById('invalidCredentials')
    if (emailId.value === "") {
      emailIdError.innerText = "*Required"
    }
    else {
      emailIdError.innerText = ""
    }
    if (password.value === "") {
      passwordError.innerText = "*Required"
    }
    else {
      passwordError.innerText = ""
    }
    if (emailIdError.innerText === "" && passwordError.innerText === "") {
      axios.get(`https://user-signup-login-backend.onrender.com/login/${emailId.value}/${password.value}`)
        .then((response) => {
          if (response.data.message === "Login successful") {
            setPopupMessage("Login Successful")
            setOpen(true)
            setTimeout(() => {
              navigate('/home')
            }, 2000);
          }
          else{
            invalidCredentials.innerText="*Invalid email id/password"
            setTimeout(() => {
              invalidCredentials.innerText=""
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
        <h3 className='text-center' style={{ fontFamily: 'Arial' }}>Login</h3>
        <label htmlFor="emailId" className="form-label">Email Id</label>
        <input type="text" className="form-control" id="emailId" aria-describedby="emailHelp" placeholder='name@gmail.com' onKeyUp={() => { emailValidate() }} autoComplete='off'/>
        <span id="emailIdError" className="text-danger"></span><br />
        <label htmlFor="password" className="form-label mt-2">Password</label>
        <input type="password" className="form-control" id="password" aria-describedby="emailHelp" placeholder='password' onKeyUp={() => { passwordValidate() }} autoComplete='off'/>
        <span id="passwordError" className="text-danger"></span>
        <div className='text-center mt-2'>
        <span className='text-center text-danger' id='invalidCredentials'></span>

        </div>
        <div className='text-center'>
          <button className="btn btn-outline-primary mt-4" onClick={() => { loginClick() }}>Login</button>
        </div>
        <div className='text-center mt-3'>
          <span onClick={() => { navigate('/signup') }}>new user <span className='text-primary createAccount'>create an account</span></span>
        </div>
      </div>
      {
        open ? <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={popMessage} action={action} /> : ''
      }
    </>
  )
}

export default Login