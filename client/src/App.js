import Navbar from "./components/Navbar";
import { useEffect } from 'react';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UploadPage from "./pages/UploadPage";
import VideoPage from "./pages/VideoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { setUserData } from "./redux-slice/userDataSlice";
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{

    if(true){
    axios.post("http://localhost:3001/users/fetch-user-data",{},{
      withCredentials: true 
    })
    .then((response)=>{
      if(response.data.msg==='success'){
        dispatch(setUserData(response.data.data))
      }
      else{
    console.log("Session expired")
      }
    
      
    })
    }
    
    },[])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/video/:videoId" element={<VideoPage/>}/>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path='/register' element={<SignupPage/>}></Route>
      <Route path="/upload-video" element={<UploadPage/>}></Route>
    </Routes>
    </BrowserRouter>

    </>
   
  );
}

export default App;
