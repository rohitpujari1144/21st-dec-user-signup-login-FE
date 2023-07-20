import React from 'react'
import './navbar.css'

function Navbar(props) {
    return (
        <>
            <nav className="navbar navbar-expand-lg shadow sticky-top">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <span className="nav-link active text-dark" aria-current="page" style={{letterSpacing:'3px'}}>USER LOGIN - SIGNUP</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar