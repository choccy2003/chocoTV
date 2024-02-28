import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from "axios"
import "../styles/channelpage.css"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import VideoGrid from '../components/VideoGrid'
import { ToastContainer, toast } from 'react-toastify';
const ChannelPage = () => {
    const data = useSelector((state) => state.videoData)
    const [isSubscribed, setIsSubscribed] = useState(null);
    const [isOwner, setIsOwner] = useState(false)
    const { channelId } = useParams()
    const userData = useSelector((state) => state.userData)
    const [accountData, setAccountData] = useState()
    const [inputSubs, setInputSubs] = useState(false)
    const [refreshData, setRefreshData] = useState(false)
    const [uploadedVideoData, setUploadedVideoData] = useState()
    useEffect(() => {
        if (accountData) {
            if (accountData.uploadedVideos) {
                axios.post("http://localhost:3001/users/fetch-byId", { idArray: accountData.uploadedVideos, option: "likes" })
                    .then((res) => {
                        setUploadedVideoData(res.data)
                    })
            }
        }
    }, [accountData])
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase())) {
            if (isSubscribed === null && channelId) {
                axios.post('http://localhost:3001/users/handle-subscription', { channelId: channelId, status: "default flag" }, {
                    withCredentials: true
                }).then((res) => {
                    if (res.data.msg == "is subscribed") {
                        setIsSubscribed(true)
                    }
                })
            }

            else if (inputSubs && channelId) {

                axios.post('http://localhost:3001/users/handle-subscription', { channelId: channelId, status: isSubscribed ? "subscribe" : "unsubscribe" }, {
                    withCredentials: true
                }).then((res) => {
                    if (res.data.msg == "subscribed!") {
                        setIsSubscribed(true)

                    }
                    else if (res.data.msg == "unsubscribed!") {
                        setIsSubscribed(false)
                    }
                    setRefreshData(true)
                })
            }
        }

        return () => {
            setInputSubs(false);
            setRefreshData(false)
        }
    }, [isSubscribed, channelId, localStorage.getItem('isLoggedIn')])
    useEffect(() => {
        if (channelId) {
            axios.post("http://localhost:3001/users/fetch-channel-data", { channelId: channelId })
                .then((res) => setAccountData(res.data))
        }

    }, [refreshData, channelId])
    useEffect(() => {
        if (userData.userId == channelId) {
            setIsOwner(true)
        }
        else {
            setIsOwner(false)
        }
    }, [userData, channelId])
    console.log(accountData)
    if (accountData) {
        return (
            <div>
                <ToastContainer />
                <Navbar />
                <div style={{ marginTop: "50px", paddingTop: "3%" }}>
                    <div className='channel-banner' style={{ width: "80%", margin: "auto", display: "flex", flexDirection: "column" }}>
                        <div style={{ width: "100%", height: "30vh", backgroundColor: "rgb(144 107 189)", borderRadius: "30px 30px 0 0", display: "flex" }}>
                            <div style={{ width: "65px", backgroundColor: "white", height: "65px", borderRadius: "50%", margin: "2% 1%", minWidth: "65px", backgroundImage: "url(http://localhost:3001/images/a.jpg)", backgroundSize: "contain", alignSelf: "end" }}></div>
                            <div style={{ alignSelf: "end", marginBottom: "2.2%" }} >
                                <div style={{ fontSize: "20px", fontFamily: "Righteous" }}>
                                    {accountData.channelName}

                                </div>
                                <div style={{ fontWeight: "500", opacity: "0.7" }}>
                                    {accountData.subscriberCount} Subscribers
                                </div>
                            </div>
                            <div style={{ alignSelf: "end", marginLeft: "1.2%", marginBottom: "2.2%" }}>
                                {!isOwner && (isSubscribed ? (<div
                                    onClick={() => {
                                        if (JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase())) {
                                            setIsSubscribed(false);
                                            setInputSubs(true)
                                        }
                                        else {
                                            toast.error("Please sign in before")
                                        }

                                    }}

                                    style={{
                                        padding: "1px 6px 2px 6px",
                                        fontSize: "0.8rem",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        backgroundColor: "rgb(46 47 49)"
                                    }}
                                >
                                    Subscribed
                                </div>) : (<div
                                    onClick={() => {
                                        if (JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase())) {
                                            setIsSubscribed(true);
                                            setInputSubs(true)
                                        }
                                        else {
                                            toast.error("Please sign in before")
                                        }
                                    }}
                                    className="subscribe-btn"
                                    style={{
                                        padding: "1px 6px 2px 6px",
                                        fontSize: "0.8rem",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        fontSize: "16px",
                                        fontWeight: "500"
                                    }}
                                >
                                    Subscribe
                                </div>))}
                            </div>
                        </div>
                        <div style={{ paddingTop: "20px", backgroundColor: "#1c1d1f", minHeight: "30vh" }}>
                            {accountData.uploadedVideos.length > 0 && uploadedVideoData ? (<><VideoGrid title={"Uploaded Videos"} data={uploadedVideoData} /></>) : (<><div style={{ display: "flex" }}>
                                <div style={{ fontSize: "24px", fontFamily: "Righteous", width: "fit-content", marginLeft: "25px" }}>
                                    Uploaded Videos
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

                            </div><div style={{ width: "fit-content", margin: "auto" }}><div style={{ fontSize: "20px", fontWeight: "500", paddingTop: "20%" }}>You have no uploaded videos</div></div></>)}

                        </div>
                    </div>
                </div>
            </div >
        )
    }

}

export default ChannelPage