import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'antd-mobile';
import { Camera } from './camera';
declare global {
  interface Window {
    Peer: any;
    setTime: any;
  }
}

const VideoCallPlay = ({
  call, // 开始按钮
  onStartQuery,
  videoCallCancel,
  actionName,
  onFinish,
  chatNames,
  locMyName,
  myLocName,
  startCall,
}: any) => {
  // 传输视频，不传输音频
  const [mediaStreamConstraints, setMediaStreamConstraints] = useState({
    video: true,
    audio: true,
  });
  const [mySocketId] = useState(localStorage.getItem('mySocketId'));
  const [friendSocketId] = useState(localStorage.getItem('friendSocketId'));
  const [LocName] = useState<any>(localStorage.getItem('name'));
  const [actionNames, setActionNames] = useState('');
  const [start, setStart] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const localVideo: any = useRef();
  const remoteVideo: any = useRef();
  const [videoCall, setVideoCall] = useState(false);
  //   var localVideo = document.getElementById('local_video'); // 本地视频 Video
  // var remoteVideo = document.getElementById('remote_video'); // 远端视频 Video

  useEffect(() => {
    // console.log('onStartQuery===>>>>', onStartQuery);
    if (onStartQuery && call) {
      // console.log('socket123===>>>>', window.socket.id);
      // window.setTime = setInterval(() => {
      if (!friendSocketId) {
        clearIntervals();
        Toast.show({
          content: '对方不在线请稍后再试！',
          position: 'top',
        });
        return;
      }
      window.socket.emit('call', {
        to: friendSocketId,
        sender: window.socket.id,
      }); // 发送 呼叫
      // }, 1000);

      setVideoCall(true);
    }
    if (!onStartQuery) {
      setVideoCall(false);
    }
    if (!onStartQuery && localVideo.current) {
      // console.log('关闭===>>>>', localVideo.current);
      localVideo.current.srcObject?.getTracks()[0]?.stop();
      localVideo.current.srcObject?.getTracks()[1]?.stop();
    }
  }, [onStartQuery]);

  useEffect(() => {
    Camera({ localVideoElm: localVideo, remoteVideo });
    window.socket.on('newcomerOnline', ({ name, socketId, text }: any) => {
      // console.log('newcomerOnline===>>>', name, socketId, text);
      if (text === '下线') {
        localStorage.removeItem('friendSocketId');
        clearIntervals();
        Toast.show({
          content: '对方意外中断请重新链接！',
          position: 'top',
        });
      }
    });
  }, []);

  useEffect(() => {
    setActionNames(actionName);
  }, [actionName]);

  const onActionName = () => {
    // console.log(actionNames);
    if (actionNames === '切换语音') {
      // console.log(actionNames);
      setActionNames('静音');
      setMediaStreamConstraints({
        video: false,
        audio: true,
      });
    } else if (actionNames === '静音') {
      setActionNames('开启声音');
      setMediaStreamConstraints({
        video: false,
        audio: false,
      });
    } else if (actionNames === '开启声音') {
      setActionNames('静音');
      setMediaStreamConstraints({
        video: false,
        audio: true,
      });
    }
  };

  const startIntervals = () => {
    if (!call) {
      setStart(true);
      window.socket.emit('respond', {
        to: friendSocketId,
        sender: mySocketId,
        text: '接听',
      });
    }
    // startQuery(); // 开始呼叫 { to, sender }
    // startAction(); // 点击调用 获取本地视频
  };

  const clearIntervals = () => {
    setStart(false);
    setCallStarted(false);
    setActionNames('');
    // 向对方通知挂断
    // console.log('向对方通知挂断');
    window.socket.emit('respond', {
      to: friendSocketId,
      sender: mySocketId,
      text: '挂断',
    });
    if (localVideo.current) {
      localVideo.current.srcObject?.getTracks()[0]?.stop();
      localVideo.current.srcObject?.getTracks()[1]?.stop();
    }
    if (window.stream) {
      window.stream.getTracks().forEach((track: any) => track.stop());
    }
    // remoteVideo.current.srcObject.getTracks()[1].stop();
    if (!start) {
      if (call) {
        if (callStarted) {
          videoCallCancel();
        } else {
          videoCallCancel('取消通话');
        }
      } else {
        videoCallCancel('拒绝通话！');
      }
    } else {
      videoCallCancel();
    }
  };

  return (
    <div className="videoCall">
      <video
        muted={true}
        id="remoteVideo"
        autoPlay={true}
        // playsinline
        ref={remoteVideo}
      ></video>
      <div className="videoCall-button">
        {
          <>
            <div className="videoCall-switch-box">
              <div className="videoCall-cancel" onClick={clearIntervals}>
                {call && !callStarted ? '取消' : '挂断'}
              </div>
            </div>
            <div className="videoCall-switch-box">
              {start || call ? (
                <div
                  className="videoCall-cancel-center"
                  onClick={clearIntervals}
                >
                  关闭
                </div>
              ) : (
                <div
                  className="videoCall-cancel-center videoCall-cancel-center-srart"
                  onClick={startIntervals}
                >
                  接听
                </div>
              )}
            </div>
            <div className="videoCall-switch-box">
              <div className="videoCall-switch" onClick={onActionName}>
                {actionNames}
              </div>
            </div>
          </>
        }
      </div>
      <div className="videoCall-vice">
        <video
          muted={true}
          id="localVideo"
          autoPlay={true}
          // playsinline
          ref={localVideo}
        ></video>
      </div>
    </div>
  );
};
export default VideoCallPlay;
