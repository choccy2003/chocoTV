import React from 'react'
import VideoCard from './VideoCard'
import { FaArrowRight } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import "../styles/homepage.css"
const VideoGrid = (props) => {
  const navigate = useNavigate()
  return (
    <>
      <div onClick={() => { navigate(props.path) }} style={{ display: "flex", alignItems: "center", width: "fit-content", cursor: "pointer" }}>
        <div style={{ fontSize: "24px", fontFamily: "Righteous", width: "fit-content", marginLeft: "25px" }}>
          {props.title}
        </div>
        <svg
          style={{ width: "30px" }}
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke='white'
            strokeLinecap="square"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M9 5l7 7-7 7"
          />
        </svg>

      </div>
      <div className='grid' style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,330px)", justifyContent: "start", gap: "15px", marginLeft: "1.2%" }}>
        {props.path ? (props.data.slice(0, 10).map((data, i) => {
          return <VideoCard data={data} key={i} />
        })) : (props.data.map((data, i) => {
          return <VideoCard data={data} key={i} />
        }))

        }


      </div>

    </>
  )
}

export default VideoGrid