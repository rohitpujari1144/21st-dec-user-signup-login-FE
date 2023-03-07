// login div start
function showLoginDiv() {
    // console.log('showLoginDiv invoked');
    document.title = 'Login'
    document.getElementById('loginDiv').innerHTML =
        `<div class="container loginContainer">
            <h3 class="m-2 login">Login</h3>
            <div class="m-2">
                <label for="loginUsernameInput" class="form-label">Username</label>
                <input type="text" class="form-control" id="loginUsernameInput" aria-describedby="emailHelp" onkeyup="loginUsernameValidate()" autocomplete='off'>
                <span id="loginusernameError" style="color: red"></span>
            </div>
            <div class="m-2">
                <label for="passwordInput" class="form-label">Password</label>
                <input type="text" class="form-control" id="passwordInput" aria-describedby="emailHelp" onkeyup="loginPasswordValidate()" autocomplete='off'>
                <span id="loginPasswordError" style="color: red"></span>
            </div>
            <div class="m-3" style="text-align: center;">
                <button class="btn btn-primary" onclick="loginButtonClick()">Login</button>
            </div>
            <h6 class='newUser'>new user ? <a href='#' class='registerHere' onclick='registerHereClick()'>register here</a></h6>
        </div>`
}
showLoginDiv()

const loginUsernameInput = document.getElementById('loginUsernameInput')
const passwordInput = document.getElementById('passwordInput')
const loginusernameError = document.getElementById('loginusernameError')
const loginPasswordError = document.getElementById('loginPasswordError')

function loginButtonClick() {
    // console.log('submitButtonClick function invoked')
    if (loginUsernameInput.value == '') {
        loginUsernameInput.style = 'border-color: red;'
        loginusernameError.innerText = '*Please enter username'
    }
    else {
        loginusernameError.innerText = ''
    }
    if (passwordInput.value == '') {
        passwordInput.style = 'border-color: red;'
        loginPasswordError.innerText = '*Please enter password'
    }
    else {
        loginPasswordError.innerText = ''
    }
    if (loginusernameError.innerText == '' && loginPasswordError.innerText == '') {
        fetch('https://user-signup-login-be.onrender.com')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                let LoginInfo = data.filter((e) => e.username == loginUsernameInput.value)
                if (LoginInfo.length == 1) {
                    if (LoginInfo[0].password == passwordInput.value) {
                        passwordInput.removeAttribute('style')
                        sessionStorage.setItem('userLoginInfo', JSON.stringify(LoginInfo))
                        console.log(JSON.parse(sessionStorage.getItem('userLoginInfo')));
                        alert('Login successful')
                        document.title='Home'
                        document.getElementById('loginDiv').style='display:none'
                        document.getElementById('welcomeMsgDiv').removeAttribute('style')
                    }
                    else {
                        // alert('wrong password')
                        passwordInput.style = 'border-color: red;'
                        loginPasswordError.innerText = "*Invalid Password"
                    }
                }
                else {
                    alert('Invalid username')
                    loginUsernameInput.style = 'border-color: red;'
                    loginusernameError.innerText = "*Invalid username"
                }
            })
    }
}

function loginUsernameValidate() {
    if (loginUsernameInput.value == '') {
        loginUsernameInput.style = 'border-color: red;'
        loginusernameError.innerText = '*Please enter username'
    }
    else {
        loginUsernameInput.removeAttribute('style')
        loginusernameError.innerText = ''
    }
}

function loginPasswordValidate() {
    if (passwordInput.value == '') {
        passwordInput.style = 'border-color: red;'
        loginPasswordError.innerText = '*Please enter password'
    }
    else {
        passwordInput.removeAttribute('style')
        loginPasswordError.innerText = ''
    }
}
// login div end

// signup start
function registerHereClick() {
    // console.log('registerHereClick invoked');
    document.title='Sign Up'

    document.getElementById('loginUsernameInput').value=''
    document.getElementById('passwordInput').value=''
    document.getElementById('loginUsernameInput').removeAttribute('style')
    document.getElementById('loginusernameError').innerText=''
    document.getElementById('passwordInput').removeAttribute('style')
    document.getElementById('loginPasswordError').innerText=''

    document.getElementById('loginDiv').style = 'display:none'
    document.getElementById('signupDiv').removeAttribute('style')
    document.getElementById('signupDiv').innerHTML =
        `<div class="container signupContainer">
                <h3 class="m-2 signup">Sign up</h3>
                <div class="m-2">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" autocomplete="off"
                        onkeyup="nameValidate()">
                    <span id="nameError" style="color: red"></span>
                </div>
                <div class="m-2">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" aria-describedby="emailHelp" autocomplete="off"
                        onkeyup="usernameValidate()">
                    <span id="usernameError" style="color: red"></span>
                </div>
                <div class="m-2">
                    <label for="email" class="form-label">Email Id</label>
                    <input type="text" class="form-control" id="email" aria-describedby="emailHelp" autocomplete="off"
                        onkeyup="emailValidate()">
                    <span id="emailError" style="color: red"></span>
                </div>
                <div class="m-2">
                    <label for="password" class="form-label">Password</label>
                    <input type="text" class="form-control" id="password" aria-describedby="emailHelp" autocomplete="off"
                        onkeyup="passwordValidate()">
                    <span id="passwordError" style="color: red"></span>
                </div>
                <div class="m-3" style="text-align: center;">
                    <button class="btn btn-primary" onclick="registerButtonClick()">Register</button>
                </div>
                <h6 class='loginHereOne'>already have an account ? <a href='#' class='loginHere' onclick='loginHereClick()'>login here</a></h6>
            </div>`
}

function registerButtonClick() {
    // console.log('submitButtonClick function invoked')

    const signupName = document.getElementById('name')
    const username = document.getElementById('username')
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const nameError = document.getElementById('nameError')
    const usernameError = document.getElementById('usernameError')
    const emailError = document.getElementById('emailError')
    const passwordError = document.getElementById('passwordError')

    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (signupName.value == '') {
        signupName.style = 'border-color:red'
        nameError.innerText = '*Please enter name'
    }
    else {
        if (!isNaN(signupName.value)) {
            signupName.style = 'border-color:red'
            nameError.innerText = '*Please use characters only'
        }
        else if (signupName.value.length < 3) {
            signupName.style = 'border-color:red'
            nameError.innerText = '*Please enter a valid name'
        }
        else {
            signupName.removeAttribute('style')
            nameError.innerText = ''
        }
    }
    if (username.value == '') {
        username.style = 'border-color:red'
        usernameError.innerText = '*Please enter username'
    }
    else {
        if (!isNaN(username.value)) {
            username.style = 'border-color:red'
            usernameError.innerText = '*Please use characters only'
        }
        else if (username.value.length < 5) {
            username.style = 'border-color:red'
            usernameError.innerText = '*Please enter a valid username'
        }
        else {
            username.removeAttribute('style')
            usernameError.innerText = ''
        }
    }
    if (email.value == '') {
        email.style = 'border-color:red'
        emailError.innerText = '*Please enter email'
    }
    else {
        if (email.value.match(emailPattern)) {
            email.removeAttribute('style')
            emailError.innerText = ''
        }
        else {
            email.style = 'border-color:red'
            emailError.innerText = '*Please enter a valid email id'
        }
    }
    if (password.value == '') {
        password.style = 'border-color:red'
        passwordError.innerText = '*Please enter password'
    }
    else {
        if (!isNaN(password.value)) {
            password.style = 'border-color:red'
            passwordError.innerText = '*Please use characters only'
        }
        else if (password.value.length < 5) {
            password.style = 'border-color:red'
            passwordError.innerText = '*Please enter a valid password'
        }
        else {
            password.removeAttribute('style')
            passwordError.innerText = ''
        }
    }
    if (nameError.innerText == '' && usernameError.innerText == '' && email.innerText == '' && passwordError.innerText == '') {
        fetch('https://user-signup-login-be.onrender.com')
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                let newData = data.filter((e) => e.email == email.value)
                if (newData.length == 0) {
                    let newUsername = data.filter((e) => e.username == username.value)
                    if (newUsername.length == 0) {
                        const userSignupData = {
                            name: signupName.value,
                            username: username.value,
                            email: email.value,
                            password: password.value
                        }
                        fetch('https://user-signup-login-be.onrender.com/userSignup', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(userSignupData),
                        })
                            .then((response) => console.log(response))
                            .then((userSignupData) => {
                                console.log('Success : ', userSignupData);
                                alert('Sign up successful')
                                signupName.value = ''
                                username.value = ''
                                email.value = ''
                                password.value = ''
                                document.getElementById('signupDiv').style='display:none'
                                document.getElementById('loginDiv').removeAttribute('style') 
                            })
                            .catch((error) => {
                                console.error('Error : ', error)
                            })
                    }
                    else {
                        // console.log(newUsername)
                        alert(`User with username ${username.value} already exist`)
                    }
                }
                else {
                    // console.log(newData)
                    alert(`User with email id ${email.value} already exist`)
                }
            })
    }
}

function nameValidate() {
    const signupName = document.getElementById('name')
    const nameError = document.getElementById('nameError')

    if (signupName.value == '') {
        signupName.style = 'border-color:red'
        nameError.innerText = '*Please enter name'
    }
    else if (!isNaN(signupName.value)) {
        signupName.style = 'border-color:red'
        nameError.innerText = '*Please use characters only'
    }
    else if (signupName.value.length < 3) {
        signupName.style = 'border-color:red'
        nameError.innerText = '*Please enter a valid name'
    }
    else {
        signupName.removeAttribute('style')
        nameError.innerText = ''
    }
}

function usernameValidate() {
    if (username.value == '') {
        username.style = 'border-color:red'
        usernameError.innerText = '*Please enter username'
    }
    else if (!isNaN(username.value)) {
        username.style = 'border-color:red'
        usernameError.innerText = '*Please use characters only'
    }
    else if (username.value.length < 5) {
        username.style = 'border-color:red'
        usernameError.innerText = '*Please enter a valid username'
    }
    else {
        username.removeAttribute('style')
        usernameError.innerText = ''
    }
}

function emailValidate() {
    const email = document.getElementById('email')
    const emailError = document.getElementById('emailError')
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (email.value == '') {
        email.style = 'border-color:red'
        emailError.innerText = '*Please enter email'
    }
    else if (email.value.match(emailPattern)) {
        email.removeAttribute('style')
        emailError.innerText = ''
    }
    else {
        email.style = 'border-color:red'
        emailError.innerText = '*Please enter a valid email id'
    }
}

function passwordValidate() {
    if (password.value == '') {
        password.style = 'border-color:red'
        passwordError.innerText = '*Please enter password'
    }
    else if (!isNaN(password.value)) {
        password.style = 'border-color:red'
        passwordError.innerText = '*Please use characters only'
    }
    else if (password.value.length < 5) {
        password.style = 'border-color:red'
        passwordError.innerText = '*Please enter a valid password'
    }
    else {
        password.removeAttribute('style')
        passwordError.innerText = ''
    }
}

function loginHereClick(){
    // console.log('loginHereClick invoked');
    document.title='Login'
    document.getElementById('signupDiv').style='display:none'
    document.getElementById('loginDiv').removeAttribute('style') 
}
// signup end

// welcome msg start
document.getElementById('welcomeMsgDiv').innerHTML=
    `<h1 class='welcome'>Welcome Home !!</h1>`
// welcome msg end









