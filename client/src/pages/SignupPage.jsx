import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignupPage = () => {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        email: '',
        phoneNumber: ''
    });
    const navigate=useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(formData.userName && formData.password && formData.email && formData.phoneNumber){
 axios.post("http://localhost:3001/users/register",formData).then((response)=>{
           
            if(response.data.msg === "success"){
               
                        toast("Signup Successful!")
             setTimeout(()=>{ navigate('/login')},2000)
            }
            else if(response.data.msg === "failure"){
                toast("Account already exists")
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
            <span><Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>chocoTV</Link></span>
        </div>
        <div style={{ height: '450px', width: '390px', backgroundColor: 'rgb(28, 29, 31)', borderRadius: '15px', margin: 'auto', marginTop: '70px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontSize: '28px', fontFamily: 'Arial, Helvetica, sans-serif', paddingTop: '30px', fontWeight: 600, width: 'auto', marginBottom: '30px' }}>
                <div style={{ width: 'fit-content', margin: 'auto' }}>Create your account</div>
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Arial, Helvetica, sans-serif', marginLeft: '80px', marginTop: '25px' }}>
                    Username<br />
                    <input
                        style={{ marginTop: '5px', backgroundColor: 'rgb(233, 233, 233)', width: '220px', border: '1px solid white', height: '23px', borderRadius: '3px',backgroundColor:'rgb(28, 29, 31)',color:"white" }}
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Arial, Helvetica, sans-serif', marginLeft: '80px', marginTop: '15px' }}>
                    Phone number<br />
                    <input
                        style={{ marginTop: '5px', backgroundColor: 'rgb(233, 233, 233)', width: '220px', border: '1px solid white', height: '23px', borderRadius: '3px',backgroundColor:'rgb(28, 29, 31)',color:"white" }}
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ fontSize: '17px', fontWeight: 500, fontFamily: 'Arial, Helvetica, sans-serif', marginLeft: '80px', marginTop: '15px' }}>
                    Email<br />
                    <input
                        style={{ marginTop: '5px', backgroundColor: 'rgb(233, 233, 233)', width: '220px', border: '1px solid white', height: '23px', borderRadius: '3px',backgroundColor:'rgb(28, 29, 31)',color:"white" }}
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ fontSize: '17px', marginTop: '15px', fontWeight: 500, fontFamily: 'Arial, Helvetica, sans-serif', marginLeft: '80px' }}>
                    Password<br />
                    <input
                        style={{ marginTop: '5px', backgroundColor: 'rgb(233, 233, 233)', width: '220px', border: '1px solid white', height: '23px', borderRadius: '3px',backgroundColor:'rgb(28, 29, 31)',color:"white" }}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ marginTop: '30px' }}>
                    <button
                        style={{ width: '230px', marginLeft: '80px', borderRadius: '5px', height: '33px', backgroundColor: '#BB86FC',border: "1px solid #9c5cac", color: 'white', fontSize: '16px', cursor:"pointer"}}
                        type="submit" className='login-btn'
                    >
                        Create your account
                    </button>
                </div>
            </form>
        </div>
    
        <div style={{ width: 'fit-content', margin: 'auto', marginTop: '10px', fontWeight: 500 }}>Already have an account? <span style={{ textDecoration: 'none' }} href="#"><Link to={'/login'}>Log in</Link></span></div>
        <div style={{ fontSize: '14px', width: 'fit-content', margin: 'auto', opacity: '0.6', marginTop: '50px' }}>
            All content is © 2024 by chocoTV. All rights reserved
        </div>
    </div>
</div>
  )
}

export default SignupPage