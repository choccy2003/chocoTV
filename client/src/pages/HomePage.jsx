import React,{ useEffect, useRef,useState } from "react"
import axios from 'axios'
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { setUserData } from "../redux-slice/userDataSlice";

const HomePage = () => {  
const btn=useRef(null)
const [file, setFile] = useState(null);
const userData=useSelector((state)=>state.userData)
const [videoDetails,updateVideoDetails]=useState({
  videoTitle:'',
  videoDescription:'',
  videoResourcePath:'',
  thumbnailResourcePath:'http://localhost:3001/images/thumbnail-1.png',
  channelName:'',
  channelId:'',
})
const dispatch=useDispatch();
const handleInputChange=(e)=>{
  const { name, value } = e.target;
  updateVideoDetails({...videoDetails,[name]:value})
}
const handleFileChange = (event) => {
  setFile(event.target.files[0]);
  
  updateVideoDetails({...videoDetails,channelName:userData.userName,channelId:userData.userId}) 

};

const handleSubmit = async (event) => {
  event.preventDefault();
  console.log(videoDetails)
  btn.current.disabled = true;

  try {
    const formData = new FormData();
    formData.append('mp4file', file);
    formData.append('videoTitle', videoDetails.videoTitle);
    formData.append('videoDescription', videoDetails.videoDescription);
    formData.append('channelName', videoDetails.channelName);
    formData.append('channelId', videoDetails.channelId);
    formData.append('thumbnailResourcePath',videoDetails.thumbnailResourcePath)
    const response = await axios.post('http://localhost:3001/users/upload-video', formData);
    console.log(response.data);
  } catch (error) {
    console.error('Error uploading video:', error);
  } finally {
    btn.current.disabled = false;
  }
};

useEffect(()=>{

const cookieValue = Cookies.get('token');  
if(cookieValue){
axios.post("http://localhost:3001/users/fetch-user-data",{}, {
  headers: { Authorization: `Bearer ${cookieValue}` },
})
.then((response)=>{
  dispatch(setUserData(response.data.data))
})
}
},[])
return(
<>
<Navbar/>
<div style={{marginTop:"60px"}}>

    <form onSubmit={handleSubmit}>
    Title: <input name="videoTitle" onChange={handleInputChange} type="text"></input>
    Description: <input name="videoDescription" onChange={handleInputChange} type="text"></input>
    <input  onChange={handleFileChange} type="file" accept="video/mp4" ></input>
    <input ref={btn} type="submit" ></input>

    </form>

</div>
</>
)
}

export default HomePage