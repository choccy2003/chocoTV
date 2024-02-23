import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux-slice/userDataSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        email: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(formData.email && formData.password){
    axios.post("http://localhost:3001/users/login",formData,{
        withCredentials: true 
      })
        .then((response)=>{
            if(response.data.msg === "Success"){
                toast("Login Successful!")
                setTimeout(()=>{ navigate('/')},2000)
                
            }
            else if(response.data ==="Match Failure"){
                toast("Wrong Password!")
            }
            else{
                toast("No Account Found!")
            }
        }) 
        }
        else{
            toast("Recheck credentials!")
        }

    }
  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', zIndex: '9999', top: '0px', left: '0px' }}>
        <ToastContainer theme='dark'/>
            <div>
                <div style={{ fontSize: '44px', fontFamily: 'Arial, Helvetica, sans-serif', paddingTop: '5%', margin: 'auto', maxWidth: 'fit-content', fontWeight: 600 }}>
                    <span><Link to={'/'} style={{ textDecoration: 'none',color:"white"}}>chocoTV</Link></span>
                </div>
                <div style={{ height: '450px', width: '390px', backgroundColor: 'rgb(28, 29, 31)', borderRadius: '15px', margin: 'auto', marginTop: '70px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{ fontSize: '28px', fontFamily: 'Arial, Helvetica, sans-serif', paddingTop: '30px', fontWeight: 600, width: 'auto', marginBottom: '30px' }}>
                        <div style={{ margin: 'auto', width: 'fit-content' }}>Sign in</div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div style={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Arial, Helvetica, sans-serif', marginLeft: '80px', marginTop: '45px' }}>
                            Email<br />
                            <input
                                style={{ marginTop: '5px', backgroundColor: 'rgb(28, 29, 31)', width: '220px', border: '1px solid white', height: '23px', borderRadius: '3px' ,color:"white"}}
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ fontSize: '17px', marginTop: '15px', fontWeight: 500, fontFamily: 'Arial, Helvetica, sans-serif', marginLeft: '80px' }}>
                            Password<br />

                            <input
                                style={{ marginTop: '5px', backgroundColor: 'rgb(28, 29, 31)', width: '220px', border: '1px solid white', height: '23px', borderRadius: '3px',color:"white" }}
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ width: 'auto', marginLeft: '205px' }}>
                            <a style={{ color: 'white', fontSize: '13px', fontWeight: 500 ,position:"relative",top:"3px"}} href="#">Forgot password?</a>
                        </div>
                        <button
                            style={{ width: '230px', marginLeft: '80px', borderRadius: '5px', height: '33px', backgroundColor: '#BB86FC',border: "1px solid #9c5cac", color: 'white', fontSize: '16px', marginTop: "30px",cursor:"pointer" }}
                            type="submit"
                    className='login-btn'>
                            Log in
                        </button>
                    </form>
                    <div style={{ width: '60px', position: 'relative', left: '165px', top: '11px', zIndex: 10, backgroundColor: 'rgb(28, 29, 31))' }}>
                        <div style={{ width: 'fit-content', margin: 'auto' }}>or</div>
                    </div>
                    <hr style={{ width: '260px', margin: 'auto', marginBottom: '20px',border:"0px"}} />
                    <button
                        style={{ width: '230px', marginLeft: '80px', borderRadius: '5px', height: '33px', backgroundColor: '#e3483b', border: '1px solid rgb(153, 37, 37)', color: 'white', fontSize: '16px',cursor:"pointer" }}
                        type="button"
                    className='google-login-btn'>
                        Continue with Google
                    </button>

                </div>
                <div style={{ width: 'fit-content', margin: 'auto', marginTop: '10px', fontWeight: 500 }}>New to chocoTV? <span style={{ textDecoration: 'none' }}><Link to={'/register'}>Join now</Link></span></div>
                <div style={{ fontSize: '14px', width: 'fit-content', margin: 'auto', opacity: '0.6', marginTop: '50px' }}>
                    All content is © 2024 by chocoTV. All rights reserved
                </div>
            </div>
        </div>
  )
}

export default LoginPage