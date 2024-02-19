import React,{ useEffect, useRef,useState } from "react"
import axios from 'axios'
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { setUserData } from "../redux-slice/userDataSlice";
import "../styles/homepage.css"
import VideoPlayer from "../components/VideoPlayer";

const UploadPage = () => {  
const btn=useRef(null)
const [file, setFile] = useState(null);
const [videoId,setVideoId]=useState()
const [jpgFile, setJpgFile] = useState(null);
const [displayPreview,setDisplayPreview]=useState(false)
const userData=useSelector((state)=>state.userData)
const [uploadStarted,setUploadStarted]=useState(false)
const [videoDetails,updateVideoDetails]=useState({
  videoTitle:'',
  videoDescription:'',
  videoResourcePath:'',
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
const handleJpgFileChange=(event)=>{
setJpgFile(event.target.files[0])

}

const handleSubmit = async (event) => {
  event.preventDefault();
  console.log(videoDetails)
  setUploadStarted(true)
  try {
    const formData = new FormData();
    formData.append('mp4file', file);
    formData.append('jpgfile', jpgFile);
    formData.append('videoTitle', videoDetails.videoTitle);
    formData.append('videoDescription', videoDetails.videoDescription);
    formData.append('channelName', videoDetails.channelName);
    formData.append('channelId', videoDetails.channelId);
    const response = await axios.post('http://localhost:3001/users/upload-video', formData).then((response)=>{
      if(response.data.msg==="Success"){
        setUploadStarted(false)
        setDisplayPreview(true)
        setVideoId(response.data.id)
      }
      
    }
    )
  } catch (error) {
    console.error('Error uploading video:', error);
  }
};

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
console.log(userData)
return(
<>
<Navbar/>
<div style={{marginTop:"100px"}}>
  <div style={{backgroundColor:"rgb(28, 29, 31)",padding:"2% 5%",margin:"1% 6%",borderRadius:"20px"}}> 
  <div style={{width:"fit-content",margin:"auto",fontSize:"26px",fontWeight:"500",fontFamily:"Righteous",paddingBottom:"2%"}}>Upload Video</div>
<form onSubmit={handleSubmit}>
  <div className="upload-area" style={{display:"flex",gap:"7vw"}}>
    <div style={{display:"flex",flexDirection:"column",gap:"15px"}}>
      <div style={{backgroundColor:"black",padding:"5px",borderRadius:"15px",border:"2px solid rgb(133, 133, 133)",fontFamily:"Righteous"}}>
        <div style={{fontWeight:"500",margin:"1% 2%"}}>Video Title</div>
         <textarea name="videoTitle" style={{ resize: "none",height:"3vw",width:"35vw",backgroundColor:"black",color:"white",borderRadius:"5px",border:"none",fontFamily:"calibri",marginLeft:"10px",overflow:"hidden",fontSize:"16px"}} onChange={handleInputChange}></textarea>
      </div>
     <div>
     <div style={{backgroundColor:"black",padding:"5px",borderRadius:"15px",border:"2px solid rgb(133, 133, 133)",fontFamily:"Righteous"}}>
      <div style={{fontWeight:"500",margin:"5px 10px"}}>Video Description</div>
                    <textarea name="videoDescription" style={{ resize: "none",height:"8.5vw",width:"30vw",backgroundColor:"black",color:"white",borderRadius:"5px",border:"none",fontFamily:"calibri",marginLeft:"10px",overflow:"hidden",fontSize:"16px"}} onChange={handleInputChange}>

              </textarea>
     </div>

              
     </div>
     <div style={{display:"flex",gap:"2%",flexWrap:"wrap"}}>
           <input style={{display:"none"}} id="mp4upload"  onChange={handleFileChange} type="file" accept="video/mp4" ></input>
           <label className="custom-file-input-1" htmlFor="mp4upload"></label>
           <input style={{display:"none"}} id="jpgupload"  onChange={handleJpgFileChange} type="file" accept="image/jpeg" ></input>
           <label className="custom-file-input-2" htmlFor="jpgupload"></label>
           <input className="submit-btn" value={"Upload Video"} type="submit"></input>
    </div>
    </div>

  <div className="preview-tab" style={{width:"30vw",backgroundColor:"#6161614d",height:"16.9vw",borderRadius:"15px",display:"grid",placeItems:"center",border:"2px solid rgb(133, 133, 133)"}}>
    
    {uploadStarted&&(<div>Uploading Video...</div>)}
    {displayPreview&&(<div>
      <VideoPlayer applyMediaQueries={false} videoId={videoId} width={30}/>
    </div>)}
    {!uploadStarted && !displayPreview && (<div>Video Preview Here</div>)}
    

  </div>

   
  </div>
    

    </form>
  </div>
    

</div>
</>
)
}

export default UploadPage