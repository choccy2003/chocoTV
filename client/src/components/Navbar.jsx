import React, { useEffect, useState } from 'react'
import tvlogo from '../logos/tv.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import "../styles/navbar.css"
import { IoMenu } from "react-icons/io5";
const Navbar = () => {
  const navigate = useNavigate()

  const [toggleAnimation, setToggleAnimation] = useState(false)
  const [displayMenu, setDisplayMenu] = useState(false)
  const userData = useSelector((state) => state.userData)
  const [loginStatus, setLoginStatus] = useState(false)
  useEffect(() => {
    setLoginStatus(JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase()))
  }, [localStorage.getItem('isLoggedIn')])
  console.log(userData)
  const handleLogout = () => {
    axios.post('http://localhost:3001/users/logout', {}, {
      withCredentials: true
    }).then(
      (res) => {
        console.log(res)
        toast.success("logged out")
      }
    ).then(() => {
      localStorage.setItem("isLoggedIn", false)
      window.location.reload()
    }
    )

  }
  return (
    <>
      <ToastContainer />

      <div className='navbar-mobile' style={{ position: "fixed", top: "0", display: "none", padding: "0% 2%", gap: "1%", fontFamily: "Righteous", fontSize: "20px", zIndex: "100", backgroundColor: "#0d0d0f", width: "100vw", height: "fit-content", justifyContent: "center" }}>
        <div style={{ fontSize: "32px", border: "0.16rem solid #d9d9d9", height: "32px", borderRadius: "7px", backgroundColor: "rgb(28, 29, 31)", cursor: "pointer", position: "relative", top: "5px" }}>
          <IoMenu onClick={() => { displayMenu ? setDisplayMenu(false) : setDisplayMenu(true) }} stroke='#d9d9d9' />
        </div>
        <div style={{ alignSelf: "center", cursor: "pointer", margin: "0 auto" }} onClick={() => { navigate('/') }}><img style={{ position: "relative", top: "6px" }} height={"40px"} src={tvlogo}></img><div style={{ display: "inline-block", position: "relative", bottom: "8px", paddingRight: "30px" }}>chocoTV</div></div>

      </div>

      <div className='navbar' style={{ position: "fixed", top: "0", display: "flex", padding: "0% 2%", gap: "1%", fontFamily: "Righteous", fontSize: "20px", zIndex: "100", backgroundColor: "#0d0d0f", width: "95vw" }}>
        <div style={{ width: "40px", height: "50px" }}>
          <img style={{ position: "relative", top: "6px" }} height={"40px"} src={tvlogo}></img>
        </div>
        <div style={{ alignSelf: "center", cursor: "pointer" }} onClick={() => { navigate('/') }}>chocoTV</div>
        <div style={{ display: "flex", margin: "0 3% 0 3%", fontSize: "16px", alignItems: "end", gap: "15%", alignItems: "center" }}>
          <div>Trending</div>
          <div>Subscriptions</div>
          <div>Popular</div>
        </div>
        <div className='menu' style={{ marginLeft: "auto", fontSize: "32px", border: "0.16rem solid #d9d9d9", height: "32px", borderRadius: "7px", backgroundColor: "rgb(28, 29, 31)", cursor: "pointer", position: "relative", top: "6px" }}>
          <IoMenu onClick={() => { displayMenu ? setDisplayMenu(false) : setDisplayMenu(true) }} stroke='#d9d9d9' />
        </div>
      </div>
      {
        displayMenu && (<div style={{ height: "695px" }} className={`cart-menu cart-animation`}>
          <div style={{ fontFamily: "Righteous", fontSize: "28px", marginLeft: "22px", marginTop: "25px", marginBottom: "35px", display: "flex" }}><div>Welcome {loginStatus ? userData.userName : "User"}!</div> </div>
          {loginStatus ? (
            <div className="user-list" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.4)" }} onClick={handleLogout}>
              Logout
            </div>
          ) : (
            <div className="user-list" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.4)" }} onClick={() => navigate('/login')}>
              Login
            </div>
          )}<div className="user-list" onClick={() => { loginStatus ? navigate('/upload-video') : navigate('/login') }} >Upload videos</div><div onClick={() => { loginStatus ? navigate('/subscriptions') : navigate('/login') }} className="user-list">Subscriptions</div><div className="user-list" onClick={() => { loginStatus ? navigate('/liked-videos') : navigate('/login') }}>Liked videos</div>
          <div className="user-list" onClick={() => { loginStatus ? navigate(`/channel/${userData.userId}`) : navigate('/login') }} >Account</div>
          <div className="user-list">Privacy policy</div>
          <div className="user-list">FAQ</div>


        </div>)
      }

    </>


  )
}

export default Navbar