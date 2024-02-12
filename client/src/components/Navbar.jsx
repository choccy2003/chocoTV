import React from 'react'
import tvlogo from '../logos/tv.png'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
const Navbar = () => {
  return (
   <div style={{position:"fixed",top:"0",display:"flex",margin:"0% 2%",gap:"1%",fontFamily:"Righteous",fontSize:"20px",zIndex:"100",backgroundColor:"#0d0d0f",width:"100vw"}}><div style={{width:"40px",height:"50px"}}><img style={{position:"relative",top:"6px"}} height={"40px"} src={tvlogo}></img>
      </div><div style={{alignSelf:"center"}}>chocoTV</div>
    <div style={{display:"flex",margin:"0 3% 0 3%",fontSize:"16px",alignItems:"end",gap:"15%",alignItems:"center"}}><div>Trending</div><div>Subscriptions</div><div onClick={()=>{Cookies.remove('token');}}>Logout</div></div><div className='search-box'></div></div>
    
  )
}

export default Navbar