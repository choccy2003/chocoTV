import Navbar from "./components/Navbar";
import { useEffect } from 'react';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UploadPage from "./pages/UploadPage";
import VideoPage from "./pages/VideoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
function App() {
  

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
