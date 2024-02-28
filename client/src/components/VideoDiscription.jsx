import React, { useEffect, useRef, useState } from "react";
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import "../styles/videodiscription.css";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
const VideoDiscription = (props) => {
  const likeCount = useRef();
  const [likeButtonActive, setLikeButtonActive] = useState(null);
  const [dislikeButtonActive, setDislikeButtonActive] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [videoDetails, setVideoDetails] = useState(null);
  const [input, setInput] = useState(false)
  const userData = useSelector((state) => state.userData)
  const [inputDislike, setInputDislike] = useState(false)
  const [inputSubs, setInputSubs] = useState(false)
  const [channelData, setChannelData] = useState([])
  const [refreshData, setRefreshData] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (videoDetails) {
      axios.post("http://localhost:3001/users/fetch-channel-data", { channelId: videoDetails.channelId })
        .then((res) => setChannelData(res.data))
    }

  }, [refreshData, videoDetails])
  useEffect(() => {

    if (props.videoId) {
      axios
        .post("http://localhost:3001/users/fetch-video", {
          _id: props.videoId,
        })
        .then((response) => {
          setVideoDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching video:", error);
        });
    }
    setLikeButtonActive(null)
    setDislikeButtonActive(null)

  }, [props.videoId]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase())) {
      if (likeButtonActive == null && props.videoId) {

        axios
          .post(
            "http://localhost:3001/users/handle-like",
            {
              likeStatus: "default flag",
              videoId: props.videoId,
            },
            { withCredentials: true },
          )
          .then((res) => {

            if (res.data.likeStatus) {
              setLikeButtonActive(true)

            }

          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      else if (input && props.videoId) {
        axios
          .post(
            "http://localhost:3001/users/handle-like",
            {
              likeStatus: likeButtonActive ? "true" : "false",
              videoId: props.videoId,
            },
            { withCredentials: true },
          )
          .then((res) => {
            if (res.data.data) {
              console.log(res.data)
              setVideoDetails(res.data.data)
            }
            else if (res.data.likeStatus) {
              setLikeButtonActive(true)
            }

          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }

    return () => {
      setInput(false);
    }
  }, [likeButtonActive, props.videoId, localStorage.getItem('isLoggedIn')]);

  useEffect(() => {

    if (JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase())) {
      if (dislikeButtonActive == null && props.videoId) {

        axios
          .post(
            "http://localhost:3001/users/handle-dislike",
            {
              dislikeStatus: "default flag",
              videoId: props.videoId,
            },
            { withCredentials: true },
          )
          .then((res) => {
            if (res.data.dislikeStatus) {
              setDislikeButtonActive(true)

            }

          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      else if (inputDislike && props.videoId) {

        axios
          .post(
            "http://localhost:3001/users/handle-dislike",
            {
              dislikeStatus: dislikeButtonActive ? "true" : "false",
              videoId: props.videoId,
            },
            { withCredentials: true },
          )
          .then((res) => {
            if (res.data.data) {
              setVideoDetails(res.data.data)
            }
            else if (res.data.dislikeStatus) {
              setDislikeButtonActive(true)
            }

          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
    else {
      console.log("not logged in!!")
    }
    return () => {
      setInputDislike(false);
    }
  }, [dislikeButtonActive, props.videoId, localStorage.getItem("isLoggedIn")]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase())) {
      if (isSubscribed === null && videoDetails) {
        axios.post('http://localhost:3001/users/handle-subscription', { channelId: videoDetails.channelId, status: "default flag" }, {
          withCredentials: true
        }).then((res) => {
          if (res.data.msg == "is subscribed") {
            setIsSubscribed(true)
          }
        })
      }

      else if (inputSubs && videoDetails) {

        axios.post('http://localhost:3001/users/handle-subscription', { channelId: videoDetails.channelId, status: isSubscribed ? "subscribe" : "unsubscribe" }, {
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
  }, [isSubscribed, videoDetails, localStorage.getItem('isLoggedIn')])
  if (videoDetails) {
    return (
      <>
        <ToastContainer />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "0.5%",
            width: "100%",
          }}
        >
          <div
            className="video-title"
            style={{ fontSize: "1.6rem", fontWeight: "500" }}
          >
            {videoDetails.videoTitle}
          </div>
          <div
            style={{ margin: "0.2%", fontWeight: "500", fontSize: "0.9rem" }}
          >
            {videoDetails.viewCount} views
          </div>
          <div
            style={{ display: "flex", marginTop: "0.5%", maxHeight: "40px" }}
          >
            <div
              style={{
                width: "40px",
                backgroundColor: "white",
                height: "40px",
                borderRadius: "50%",
                marginRight: "1%",
                minWidth: "40px",
                backgroundImage: "url(http://localhost:3001/images/a.jpg)",
                backgroundSize: "contain",
              }}
            ></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                className="channel-name"
                style={{ fontSize: "1.1rem", fontWeight: "500", cursor: "pointer" }}
                onClick={() => {
                  navigate(`/channel/${videoDetails.channelId}`)
                }}
              >
                {videoDetails.channelName}{" "}
                {isSubscribed ? (
                  <span
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
                      backgroundColor: "#1c1d1f",
                      padding: "1px 4px 2px 4px",
                      fontSize: "0.8rem",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    className="subscribe-button"
                  >
                    Subscribed
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      if (JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase())) {
                        setIsSubscribed(true);
                        setInputSubs(true)
                      }
                      else {
                        toast.error("Please sign in before")
                      }
                    }}
                    className="subscribe-button"
                    style={{
                      backgroundColor: "#ff2d55",
                      padding: "1px 4px 2px 4px",
                      fontSize: "0.8rem",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Subscribe
                  </span>
                )}
              </div>
              <div
                style={{
                  opacity: "0.7",
                  fontSize: "0.8rem",
                  marginLeft: "0%",
                  width: "max-content",
                }}
              >
                {channelData ? channelData.subscriberCount : 0} subscribers
              </div>
            </div>
            <div
              className="share-button"
              style={{
                display: "flex",
                marginLeft: "auto",
                fontSize: "22px",
                backgroundColor: "#1c1d1f",
                padding: "5px 10px",
                borderRadius: "40px",
                alignItems: "center",
                gap: "10px",
                marginRight: "1%",
                minHeight: "25px",
                maxHeight: "25px",
              }}
            >
              <FaShare />
              <div style={{ fontSize: "16px" }}>Share</div>
            </div>
            <div
              className="button-grid"
              style={{
                margin: "0 5% 0 0",
                display: "flex",
                fontSize: "25px",
                gap: "18px",
                backgroundColor: "#1c1d1f",
                height: "fit-content",
                padding: "5px 10px",
                alignItems: "center",
                borderRadius: "40px",
                position: "relative",
                width: "146px",
                minHeight: "25px",
                flexShrink: "0",
              }}
            >
              <IoMdThumbsUp
                className="like-button"
                onClick={() => {
                  if (JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase())) {
                    if (!dislikeButtonActive) { // Check if the dislike button is not active
                      if (likeButtonActive) {
                        setLikeButtonActive(false);
                        setInput(true);
                      } else {
                        setLikeButtonActive(true);
                        setInput(true);
                      }
                    } else {
                      // Notify the user that they cannot like while disliking
                      toast.error("You can't like the video while disliking it!");
                    }
                  }
                  else {
                    toast.error("Please sign in before")
                  }

                }}
                style={{
                  fill: `${likeButtonActive ? "rgb(228, 115, 255)" : ""}`,
                }}
              />
              <div
                ref={likeCount}
                style={{
                  fontSize: "14px",
                  position: "relative",
                  right: "5%",
                  width: "12px"
                }}
              >
                {videoDetails.likeCount}
              </div>
              <hr
                style={{
                  height: "20px",
                  position: "absolute",
                  bottom: "-7px",
                  left: "82px",
                  maxWidth: "1px",
                  backgroundColor: "white",
                }}
              />
              <IoMdThumbsDown
                className="dislike-button"
                onClick={() => {
                  if (JSON.parse(localStorage.getItem('isLoggedIn').toLowerCase())) {
                    if (!likeButtonActive) { // Check if the like button is not active
                      if (dislikeButtonActive) {
                        setDislikeButtonActive(false);
                        setInputDislike(true);
                      } else {
                        setDislikeButtonActive(true);
                        setInputDislike(true);
                      }
                    } else {
                      // Notify the user that they cannot dislike while liking
                      toast.error("You can't dislike the video while liking it!");
                    }
                  }
                  else {
                    toast.error("Please sign in before")
                  }

                }}
                style={{
                  fill: `${dislikeButtonActive ? "rgb(255, 115, 115)" : ""}`,
                }}
              />
              <div style={{ fontSize: "14px", width: "12px" }}>
                {videoDetails.dislikeCount}
              </div>
            </div>
          </div>
          <div className="video-description" style={{}}>
            {videoDetails.videoDescription}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "0.5%",
            width: "100%",
          }}
        >
          <div
            className="video-title"
            style={{ fontSize: "1.6rem", fontWeight: "500" }}
          ></div>
          <div
            style={{ margin: "0.2%", fontWeight: "500", fontSize: "0.9rem" }}
          ></div>
          <div
            style={{ display: "flex", marginTop: "0.5%", maxHeight: "40px" }}
          >
            <div
              style={{
                width: "40px",
                backgroundColor: "white",
                height: "40px",
                borderRadius: "50%",
                marginRight: "1%",
                minWidth: "40px",
              }}
            ></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                className="channel-name"
                style={{ fontSize: "1.1rem", fontWeight: "500" }}
              >
                {" "}
                {isSubscribed ? (
                  <span
                    onClick={() => {
                      setIsSubscribed(false);

                    }}
                    style={{
                      backgroundColor: "#1c1d1f",
                      padding: "1px 4px 2px 4px",
                      fontSize: "0.8rem",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    className="subscribe-button"
                  >
                    Subscribed
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      setIsSubscribed(true);

                    }}
                    className="subscribe-button"
                    style={{
                      backgroundColor: "rgb(255, 115, 115)",
                      padding: "1px 4px 2px 4px",
                      fontSize: "0.8rem",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Subscribe
                  </span>
                )}
              </div>
              <div
                style={{ opacity: "0.7", fontSize: "0.8rem", marginLeft: "3%" }}
              ></div>
            </div>
            <div
              className="share-button"
              style={{
                display: "flex",
                marginLeft: "auto",
                fontSize: "22px",
                backgroundColor: "#1c1d1f",
                padding: "5px 10px",
                borderRadius: "40px",
                alignItems: "center",
                gap: "10px",
                marginRight: "1%",
                minHeight: "25px",
                maxHeight: "25px",
              }}
            >
              <FaShare />
              <div style={{ fontSize: "16px" }}>Share</div>
            </div>
            <div
              className="button-grid"
              style={{
                margin: "0 5% 0 0",
                display: "flex",
                fontSize: "25px",
                gap: "18px",
                backgroundColor: "#1c1d1f",
                height: "fit-content",
                padding: "5px 10px",
                alignItems: "center",
                borderRadius: "40px",
                position: "relative",
                width: "146px",
                minHeight: "25px",
                flexShrink: "0",
              }}
            >
              <IoMdThumbsUp
                className="like-button"
                style={{
                  fill: `${likeButtonActive ? "rgb(228, 115, 255)" : ""}`,
                }}
              />
              <div
                style={{
                  fontSize: "14px",
                  position: "relative",
                  right: "5%",
                  width: "12px",
                }}
              ></div>
              <hr
                style={{
                  height: "20px",
                  position: "absolute",
                  bottom: "-7px",
                  left: "82px",
                  maxWidth: "1px",
                  backgroundColor: "white",
                }}
              />
              <IoMdThumbsDown
                className="dislike-button"
                onClick={() => {
                  dislikeButtonActive
                    ? setDislikeButtonActive(false)
                    : setDislikeButtonActive(true);
                }}
                style={{
                  fill: `${dislikeButtonActive ? "rgb(255, 115, 115)" : ""}`,
                }}
              />
              <div style={{ fontSize: "14px", width: "12px" }}></div>
            </div>
          </div>
          <div className="video-description" style={{}}></div>
        </div>
      </>
    );
  }
};

export default VideoDiscription;