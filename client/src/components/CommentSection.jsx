import React, { useState } from 'react'
import "../styles/videodiscription.css"
const CommentSection = () => {
    const [lines,setlines]=useState(0);
    const [height,setheight]=useState(20)
    const handleInput=(e)=>{
      setlines(e.target.value.split('\n').length+1);
      if(lines>1){
         setheight(lines*10)  
      }
     
      
    }
  return (
    <>
    <div style={{marginTop:"1vw",overflow:"hidden",width:"97%"}}>
    
    <div style={{display:"inline-block",width:"100%"}}><textarea onChange={handleInput}  style={{padding:"1%",borderTop:"none",borderBottom:"2px solid white",borderLeft:"none",borderRight:"none",width:"95%",fontSize:"16px",resize:"none",overflow:"hidden",fontWeight:"lighter",height:`${height}px`,backgroundColor:"#0d0d0f",color:"white"}} type='text' placeholder='Add a comment'  ></textarea>
                </div>
                <div style={{display:"flex"}}><div style={{padding:"1%",borderRadius:"15px",backgroundColor:"rgb(28, 29, 31)",width:"fit-content",marginLeft:"auto",marginTop:"1%",marginRight:"3%",cursor:"pointer"}}>Post Comment</div></div>
                
    </div>
    
    </>
  )
}

export default CommentSection