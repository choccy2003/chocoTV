import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/homepage.css"
const LoginBanner = (props) => {
    const navigate = useNavigate()
    return (<>
        <div style={{ display: "flex", alignItems: "center", width: "fit-content", cursor: "pointer" }}>
            <div style={{ fontSize: "24px", fontFamily: "Righteous", width: "fit-content", marginLeft: "25px" }}>
                {props.title}
            </div>
            <svg
                style={{ width: "30px" }}
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke='white'
                    strokeLinecap="square"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M9 5l7 7-7 7"
                />
            </svg>

        </div>
        <div style={{ height: "275px" }}>
            {props.loginStatus ? (<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", gap: "10px" }}><div style={{ fontSize: "26px", fontWeight: "500" }}>{props.content1}
            </div><div>{props.content2}</div></div>) : (<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", gap: "10px" }}>
                <div style={{ fontSize: "26px", fontWeight: "500" }}>Login to use this feature
                </div><button style={{ justifySelf: "center" }} className="submit-btn" onClick={() => { navigate('/login') }}>Login</button>
            </div>)}
        </div>
    </>

    )
}

export default LoginBanner