import React from 'react'
import { useNavigate } from 'react-router-dom';

const RecommendSection = (props) => {
  const date = new Date(parseInt(props.data.uploadDate));
  const navigate=useNavigate()
  return (
    <>
    <div onClick={()=>{
      navigate(`/video/${props.data.videoId}`);
      window.scrollTo(0, 0);
    }} style={{display:"flex",gap:"2%",backgroundColor:"rgb(28, 29, 31)",padding:"2%",marginRight:"4%",borderRadius:"10px"}}>
        <img style={{width:"200px",maxHeight:"105px",minWidth:"200px",borderRadius:"10px"}} src={props.data.thumbnailResourcePath+".jpg"} alt='Thumbnail' />
        <div style={{display:"flex",flexDirection:"column",maxHeight:"105px"}}>
            <div style={{fontSize:"17px",maxHeight:"67px"}}>{props.data.videoTitle}</div>
            <div style={{fontSize:"14px",marginTop:"auto"}}>{props.data.channelName}</div>
            <div style={{display:"inline-flex",fontSize:"14px"}}><div>{props.data.viewCount} views</div><div style={{backgroundColor:"white",width:"4px",borderRadius:"100%",height:"4px",margin:"9px 6px 9px 9px"}}></div><div>{date.toLocaleString('en-US')}</div></div>
        </div>
    </div>
    </>
  )
}

export default RecommendSection