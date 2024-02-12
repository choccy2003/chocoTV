import React from 'react'

const RecommendSection = () => {
  return (
    <>
    <div style={{display:"flex",gap:"2%",backgroundColor:"rgb(28, 29, 31)",padding:"2%",marginRight:"4%",borderRadius:"10px"}}>
        <img style={{width:"200px",maxHeight:"105px",minWidth:"200px",borderRadius:"10px"}} src='http://localhost:3001/images/thumbnail-1.png' alt='Thumbnail'/>
        <div style={{display:"flex",flexDirection:"column",maxHeight:"105px"}}>
            <div style={{fontSize:"17px",maxHeight:"67px"}}>Title here Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
            <div style={{fontSize:"14px",marginTop:"auto"}}>Channel name</div>
            <div style={{display:"inline-flex",fontSize:"14px"}}><div>500 views</div><div style={{backgroundColor:"white",width:"4px",borderRadius:"100%",height:"4px",margin:"9px 6px 9px 9px"}}></div><div>1 hours ago</div></div>
        </div>
    </div>
    </>
  )
}

export default RecommendSection