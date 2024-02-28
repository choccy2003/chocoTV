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
import ChannelPage from "./pages/ChannelPage";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase())) {
      localStorage.setItem('isLoggedIn', true)
    }
    else {
      localStorage.setItem('isLoggedIn', null)
    }
  }, [])
  useEffect(() => {

    if (JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase())) {
      axios.post("http://localhost:3001/users/fetch-user-data", {}, {
        withCredentials: true
      })
        .then((response) => {
          if (response.data.msg === 'success') {
            dispatch(setUserData(response.data.data))
            localStorage.setItem('isLoggedIn', true)
          }
          else {
            console.log("Session expired")
          }


        })
    }

  }, [localStorage.getItem('isLoggedIn')])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path='/register' element={<SignupPage />}></Route>
          <Route path="/upload-video" element={<UploadPage />}></Route>
          <Route path="/channel/:channelId" element={<ChannelPage />}></Route>
          <Route path="/liked-videos" element={<HomePage displayOption={1} />}></Route>
          <Route path="/recommended-videos" element={<HomePage displayOption={2} />}></Route>
          <Route path="/subscriptions" element={<HomePage displayOption={3} />}></Route>
          <Route path="/trending" element={<HomePage displayOption={4} />}></Route>
        </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;
