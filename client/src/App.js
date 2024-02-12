import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VideoPage from "./pages/VideoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/video/:videoId" element={<VideoPage/>}/>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path='/register' element={<SignupPage/>}></Route>
    </Routes>
    </BrowserRouter>

    </>
   
  );
}

export default App;
