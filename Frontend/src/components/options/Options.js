import React, { useState, useContext, useEffect, useRef } from "react"
import { Input, Button, Tooltip, Modal, message } from "antd"
import Phone from "../../assests/phone.gif"
import Teams from "../../assests/teams.mp3"
// import classes from "./Options.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard"
import VideoContext from "../../context/VideoContext"
import Hang from "../../assests/hang.svg"
import Swal from "sweetalert2"

import { TwitterIcon, TwitterShareButton, WhatsappShareButton, WhatsappIcon, FacebookIcon, FacebookShareButton } from "react-share"
import { UserOutlined, CopyOutlined, InfoCircleOutlined, PhoneOutlined } from "@ant-design/icons"
import { socket } from "../../context/VideoState"

const Options = () => {
  const [idToCall, setIdToCall] = useState("")

  const [isModalVisible, setIsModalVisible] = useState(false)
  const Audio = useRef()
  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
    otherUser,
    setOtherUser,
    leaveCall1,
  } = useContext(VideoContext)

  useEffect(() => {
    if (isModalVisible) {
      Audio?.current?.play()
    } else Audio?.current?.pause()
  }, [isModalVisible])

  const showModal = (showVal) => {
    setIsModalVisible(showVal)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    leaveCall1()
    window.location.reload()
  }
  useEffect(() => {
    if (call.isReceivingCall && !callAccepted) {
      setIsModalVisible(true)
      setOtherUser(call.from)
    } else setIsModalVisible(false)
  }, [call.isReceivingCall])

  return (
    <div className="options-body p-4">
      <div className="container">
      <div className="row">
        <div className="col-md-6">
          <p className="text-white h5">Account Info</p>
          <div className="option">
            <div className="input-group">
              <input
                placeholder="Your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  localStorage.setItem("name", e.target.value)
                }}
                className="form-control"
              />
              <CopyToClipboard text={me}>
                  <button
                    className="btn btn-primary"
                    tabIndex="0"
                    onClick={() => {
                      Swal.fire({
                        icon: "success",
                        text: "Code copied successfully",
                      })
                    }}>
                    <i class="fas fa-copy"></i>
                  </button>
                </CopyToClipboard>

              <div>
                

                
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <p className="text-white h5">Make a call</p>
          <div className="option">
            <div className="input-group">
              <input
                placeholder="Enter code to call"
                className="form-control"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
              />

              {callAccepted && !callEnded ? (
                <button onClick={leaveCall} className="btn btn-danger" tabIndex="0">
                  <img src={Hang} alt="hang up" style={{ height: "15px" }} />
                  &nbsp; Hang up
                </button>
              ) : (
                <button
                  type="primary"
                  icon={<PhoneOutlined />}
                  onClick={() => {
                    if (name.length) callUser(idToCall)
                    else
                      Swal.fire({
                        icon: "success",
                        text: "Please enter your name to call!",
                      })
                  }}
                  className="btn btn-success"
                  tabIndex="0">
                  <i class="fas fa-phone    "></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {call.isReceivingCall && !callAccepted && (
        <>
          <audio src={Teams} loop ref={Audio} />
          <Modal title="Incoming Call" visible={isModalVisible} onOk={() => showModal(false)} onCancel={handleCancel} footer={null}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h1>
                {call.name} is calling you: <img src={Phone} alt="phone ringing" style={{ display: "inline-block" }} />
              </h1>
            </div>
            <div>
              <Button
                variant="contained"
                color="#29bb89"
                icon={<PhoneOutlined />}
                onClick={() => {
                  answerCall()
                  Audio.current.pause()
                }}
                tabIndex="0">
                Answer
              </Button>
              <Button
                variant="contained"
                icon={<PhoneOutlined />}
                onClick={() => {
                  setIsModalVisible(false)
                  Audio.current.pause()
                }}
                tabIndex="0">
                Decline
              </Button>
            </div>
          </Modal>
        </>
      )}
      </div>

      
    </div>
  )
}

export default Options
