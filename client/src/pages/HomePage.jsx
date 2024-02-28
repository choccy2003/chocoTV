import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { setVideoData } from '../redux-slice/videoDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import RecommendSection from '../components/RecommendSection'
import VideoPlayer from '../components/VideoPlayer'
import VideoGrid from '../components/VideoGrid'
import LoginBanner from '../components/LoginBanner'
const HomePage = (props) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.videoData)
  const userData = useSelector((state) => state.userData)
  const [videoDataLikes, setVideoDataLikes] = useState(null)
  const [videoDataSubscriptions, setVideoDataSubscriptions] = useState(null)
  useEffect(() => {
    axios.post("http://localhost:3001/users/fetch-videos", {})
      .then((response) => {
        const videos = response.data.data
        dispatch(setVideoData(videos));
      })

  }, [])
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase())) {
      axios.post("http://localhost:3001/users/fetch-byId", { idArray: userData.likedVideos, option: "likes" })
        .then((res) => {
          setVideoDataLikes(res.data)
        })
    }

  }, [userData])
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase())) {
      axios.post("http://localhost:3001/users/fetch-byId", { idArray: userData.subscribedChannelIds, option: "subscriptions" })
        .then((res) => {
          setVideoDataSubscriptions(res.data[0])
        })
    }
  }, [userData])
  if (props.displayOption) {
    return (
      <div>
        <Navbar />
        <div style={{ marginTop: "50px" }}>
          {/* {
        data?(data.map((data)=>{
          return <div style={{margin:"20px"}}><RecommendSection data={data}/></div>
        })):(<div></div>)
      } */}
          <div className='hero-section' style={{ display: "flex", marginLeft: "40px", justifyContent: "space-evenly" }}>
            <div className='hero-font' style={{ fontSize: "44px", whiteSpace: "nowrap", fontFamily: "Righteous", margin: "5% 0% 0% -10%" }}>Explore the Latest Trends<br />in Video Content Discover<br /> What's Creating a Buzz<br /> Among Viewers<br /><div style={{ fontSize: "16px", fontFamily: "calibri", lineHeight: "20px", marginTop: "10px" }}>Dive into the depths of the ocean with us as we uncover the mysteries that lie beneath<br /> the waves. From vibrant coral reefs to mysterious shipwrecks, prepare to be amazed by<br /> the beauty and diversity of marine life</div> </div>
            <div style={{ marginTop: "3%" }}><VideoPlayer applyMediaQueries={false} videoId={"65d3684327189425cceb253d"} width={35} autoPlay={true} /> </div>
          </div>
          <div style={{ margin: "3% 1%" }}>

            <div style={{ backgroundColor: "#1c1d1f", padding: "1% 0", borderRadius: "20px" }}>
              {props.displayOption === 4 ? (<VideoGrid title={"Trending Now"} data={data} />) : (<></>)}
              {props.displayOption === 2 ? (<VideoGrid title={"Recommendations"} data={data} />) : (<></>)}
              {props.displayOption === 1 ? (videoDataLikes ? (<VideoGrid title={"Your Liked Videos"} data={videoDataLikes} />) : (<LoginBanner content1={"Get notified about new updates"} content2={"Start liking videos to see them here"} loginStatus={JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase())} title={"Your Liked Videos"} />)) : (<></>)}
              {props.displayOption === 3 ? (videoDataSubscriptions ? (<VideoGrid title={"Your Subscriptions"} data={videoDataSubscriptions} />) : (<LoginBanner content1={"Get notified about new updates"} content2={"Subscribed channels will be displayed in feed"} loginStatus={JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase())} title={"Your Subscriptions"} />)) : (<></>)}


            </div>


          </div>


        </div>

      </div>
    )
  }
  else {
    return (
      <div>
        <Navbar />
        <div style={{ marginTop: "50px" }}>
          {/* {
        data?(data.map((data)=>{
          return <div style={{margin:"20px"}}><RecommendSection data={data}/></div>
        })):(<div></div>)
      } */}
          <div className='hero-section' style={{ display: "flex", marginLeft: "40px", justifyContent: "space-evenly" }}>
            <div className='hero-font' style={{ fontSize: "44px", whiteSpace: "nowrap", fontFamily: "Righteous", margin: "5% 0% 0% -10%" }}>Explore the Latest Trends<br />in Video Content Discover<br /> What's Creating a Buzz<br /> Among Viewers<br /><div style={{ fontSize: "16px", fontFamily: "calibri", lineHeight: "20px", marginTop: "10px" }}>Dive into the depths of the ocean with us as we uncover the mysteries that lie beneath<br /> the waves. From vibrant coral reefs to mysterious shipwrecks, prepare to be amazed by<br /> the beauty and diversity of marine life</div> </div>
            <div style={{ marginTop: "3%" }}><VideoPlayer applyMediaQueries={false} videoId={"65d3684327189425cceb253d"} width={35} autoPlay={true} /> </div>
          </div>
          <div style={{ margin: "3% 1%" }}>


            <div style={{ backgroundColor: "#1c1d1f", padding: "1% 0", borderRadius: "20px" }}>
              <VideoGrid path={"/trending"} title={"Trending Now"} data={data} />
              <VideoGrid path={"/recommended-videos"} title={"Recommendations"} data={data} />
              {videoDataLikes ? (<VideoGrid path={"/liked-videos"} title={"Your Liked Videos"} data={videoDataLikes} />) : (<LoginBanner content1={"Get notified about new updates"} content2={"Start liking videos to see them here"} loginStatus={JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase())} title={"Your Liked Videos"} />)}
              {videoDataSubscriptions ? (<VideoGrid path={"/subscriptions"} title={"Your Subscriptions"} data={videoDataSubscriptions} />) : (<LoginBanner content1={"Get notified about new updates"} content2={"Subscribed channels will be displayed in feed"} loginStatus={JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase())} title={"Your Subscriptions"} />)}
            </div>





          </div>


        </div>

      </div>
    )
  }

}

export default HomePage