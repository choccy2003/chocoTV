import React from 'react'
import tvlogo from '../logos/tv.png'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import "../styles/navbar.css"
import { IoMenu } from "react-icons/io5";
const Navbar = () => {
  const navigate = useNavigate()

  return (
    <>
    
    <div className='navbar-mobile' style={{position:"fixed",top:"0",display:"none",padding:"0% 2%",gap:"1%",fontFamily:"Righteous",fontSize:"20px",zIndex:"100",backgroundColor:"#0d0d0f",width:"100vw",height:"fit-content",justifyContent:"center"}}>
    <div style={{fontSize:"32px",border:"0.16rem solid #d9d9d9",height:"32px",borderRadius:"7px",backgroundColor:"rgb(28, 29, 31)",cursor:"pointer",position:"relative",top:"5px"}}>
<IoMenu stroke='#d9d9d9' />
    </div>
<div style={{alignSelf:"center",cursor:"pointer",margin:"0 auto"}} onClick={()=>{navigate('/')}}><img style={{position:"relative",top:"6px"}} height={"40px"} src={tvlogo}></img><div style={{display:"inline-block",position:"relative",bottom:"8px",paddingRight:"30px"}}>chocoTV</div></div>

  </div>

  <div className='navbar' style={{position:"fixed",top:"0",display:"flex",padding:"0% 2%",gap:"1%",fontFamily:"Righteous",fontSize:"20px",zIndex:"100",backgroundColor:"#0d0d0f",width:"95vw"}}>
    <div style={{width:"40px",height:"50px"}}>
        <img style={{position:"relative",top:"6px"}} height={"40px"} src={tvlogo}></img>
    </div>
    <div style={{alignSelf:"center",cursor:"pointer"}} onClick={()=>{navigate('/')}}>chocoTV</div>
    <div style={{display:"flex",margin:"0 3% 0 3%",fontSize:"16px",alignItems:"end",gap:"15%",alignItems:"center"}}>
        <div>Trending</div>
        <div>Subscriptions</div>
        <div>Popular</div>
    </div>
    <div className='menu' style={{marginLeft:"auto",fontSize:"32px",border:"0.16rem solid #d9d9d9",height:"32px",borderRadius:"7px",backgroundColor:"rgb(28, 29, 31)",cursor:"pointer",position:"relative",top:"6px"}}>
            <IoMenu stroke='#d9d9d9' />
        </div>
</div>
    </>
   
    
  )
}

export default Navbar