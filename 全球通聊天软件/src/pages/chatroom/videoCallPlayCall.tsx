import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Toast } from 'antd-mobile';
import { Camera } from './camera';
import { Drag } from '../../helpers';
declare global {
  interface Window {
    Peer: any;
    setTime: any;
  }
}
let slideChange: any = {};
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
  const [mySocketId] = useState(localStorage.getItem('mySocketId'));
  const [friendSocketId] = useState(localStorage.getItem('friendSocketId'));
  const [actionNames, setActionNames] = useState('');
  const [start, setStart] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const localVideo: any = useRef();
  const remoteVideo: any = useRef();
  const localAudio: any = useRef();
  const [headPortraits, setHeadPortraits] = useState(
    localStorage.getItem('headPortrait') || ''
  );
  const [switchVideo, setSwitchVideo] = useState(false);
  const [slide, setSlideChange] = useState<any>({ x: 0, y: 0 });
  const [narrow, setNarrow] = useState<any>(false);

  useEffect(() => {
    if (onStartQuery && call) {
      window.socket.emit('call', {
        to: friendSocketId,
        sender: window.socket.id,
        headPortrait: localStorage.getItem('myHeadPortrait'),
      }); // 发送 呼叫
    }
  }, [onStartQuery]);

  useEffect(() => {
    if (actionName) {
      Camera({
        localVideoElm: localVideo,
        remoteVideo,
        localAudio,
        video: actionName === '切换语音' ? true : false,
      });
    }
    setActionNames(actionName);
  }, [actionName]);

  useEffect(() => {
    window.socket.on('newcomerOnline', ({ name, socketId, text }: any) => {
      // console.log('newcomerOnline===>>>', name, socketId, text);
      if (text === '下线') {
        localStorage.removeItem('friendSocketId');
        clearIntervals();
      }
    });
    window.socket.on('switch', ({ to, sender, text }: any) => {
      setActionNames(text);
      if (text === '切换语音') {
        if (localVideo?.current) {
          localVideo.current.srcObject?.getTracks().forEach((track: any) => {
            if (track.kind === 'video') {
              track.enabled = false;
              track.stop();
            }
          });
        }
        setActionNames('静音');
      }
    });
    window.socket.on('call', ({ to, sender, headPortrait }: any) => {
      // console.log(to, sender);
      setHeadPortraits(headPortrait);
      localStorage.setItem('NestingIframe', 'true');
    });
    // 监听对方回应
    window.socket.on('respond', ({ to, sender, text }: any) => {
      // console.log('respond===>>>', to, sender, text)
      if (text === '接听') {
        setStart(true);
        setCallStarted(true);
      } else {
        localStorage.removeItem('startTime');
        if (localVideo?.current) {
          // console.log('关闭===>>>>', localVideo.current);
          localVideo.current.srcObject?.getTracks().forEach((track: any) => {
            track.enabled = false;
            track.stop();
          });
        }
        if (localAudio?.current) {
          localAudio.current.srcObject?.getTracks().forEach((track: any) => {
            track.enabled = false;
            track.stop();
          });
        }
      }
    });
    Drag({ slide: true, onSlideChange });
  }, []);

  const onSlideChange = ({ x, y, touchend }: any) => {
    // console.log(x, y, touchend, slideChange, slideChange.y < -100);
    if (touchend && slideChange.y < -100) {
      setNarrow(true);
    } else if (touchend) {
      setSlideChange({ x: 0, y: 0 });
    } else {
      setSlideChange({ x, y });
      slideChange = { x, y };
    }
  };

  const onSwitch = (test: string) => {
    if (localVideo.current) {
      localVideo.current.srcObject?.getTracks().forEach((track: any) => {
        if (track.kind === 'video') {
          track.enabled = false;
          track.stop();
        }
      });
    }
    window.socket.emit('switch', {
      to: friendSocketId,
      sender: mySocketId,
      text: test,
    });
  };
  const onActionName = () => {
    // console.log(actionNames);
    if (actionNames === '切换语音') {
      // console.log(actionNames);
      onSwitch('切换语音');
      setActionNames('静音');
    } else if (actionNames === '静音') {
      setActionNames('开启声音');
      if (localAudio) {
        localAudio.current.pause();
      }
    } else if (actionNames === '开启声音') {
      setActionNames('静音');
      if (localAudio) {
        localAudio.current.play();
      }
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
      setCallStarted(true);
    }
  };

  const onChange = (text: string) => {
    window.socket.emit('clientmessage', {
      fromName: myLocName,
      toName: chatNames,
      text: `${text}`,
      VideoAndVoice: `${text}`,
      conversation: true,
      startTime: localStorage.getItem('startTime'),
      endTime: new Date().getTime(),
      operator: myLocName,
    });
  };

  const clearIntervals = () => {
    setActionNames('');
    // 向对方通知挂断
    Camera({ close: true });
    window.socket.emit('respond', {
      to: friendSocketId,
      sender: mySocketId,
      text: '挂断',
    });
    if (!start) {
      if (call) {
        // videoCallCancel('取消通话');
        onChange('取消通话');
      } else {
        // videoCallCancel('拒绝通话');
        onChange('拒绝通话');
      }
    } else {
      // videoCallCancel('通话结束');
      onChange('结束');
    }
  };
  const onSwitchVideo = () => {
    if (!switchVideo) {
      setSwitchVideo(!switchVideo);
    }
  };
  const onSwitchVideoRemo = () => {
    if (switchVideo) {
      setSwitchVideo(!switchVideo);
    }
  };
  const styles = {
    width: '1.3rem',
    height: '1.3rem',
    borderRadius: '8px',
  };

  const infoBoxContainer = useCallback(
    (node) => {
      if (node && narrow) {
        Drag({ mv: node });
        node.style.left = '';
        node.style.top = '';
      } else if (node) {
        // node.style.transform = `scale(1, ${1 - slide.y / 100}) translateZ(0)`;
        // node.style.transition = '0ms cubic-bezier(.1, .57, .1, 1)';
      }
    },
    [narrow]
  );

  return (
    <div
      className={`videoCall ${narrow ? 'dragName' : 'dragNameNone'}`}
      ref={infoBoxContainer}
    >
      {narrow && (
        <img
          onClick={() => {
            slideChange = {};
            setNarrow(false);
          }}
          style={styles}
          src={headPortraits}
          alt=""
        />
      )}
      <div
        style={{
          display: `${!narrow ? 'block' : 'none'}`,
          width: '100%',
          height: '100%',
        }}
      >
        <div
          onClick={onSwitchVideoRemo}
          className={`${switchVideo ? 'videoCall-vice' : 'remoteVideo'}`}
        >
          <video
            muted={true}
            id="remoteVideo"
            autoPlay={true}
            // playsinline
            ref={remoteVideo}
            style={{
              display: `${actionNames === '切换语音' ? 'block' : 'none'}`,
            }}
          ></video>
        </div>
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
        <div
          onClick={onSwitchVideo}
          className={`${!switchVideo ? 'videoCall-vice' : 'remoteVideo'}`}
          style={{
            display: `${actionNames === '切换语音' ? 'block' : 'none'}`,
          }}
        >
          <video
            muted={true}
            id="localVideo"
            autoPlay={true}
            // playsinline
            ref={localVideo}
          ></video>
        </div>
        {actionNames !== '切换语音' && (
          <div
            style={{
              position: 'absolute',
              width: '1.9rem',
              height: '1.9rem',
              top: 0,
              left: 0,
              bottom: '20%',
              right: 0,
              margin: 'auto',
            }}
          >
            <img
              style={{ width: '100%', height: '100%' }}
              src={headPortraits}
              alt=""
            />
          </div>
        )}
        <audio
          style={{ display: 'none' }}
          id="local-audio"
          ref={localAudio}
          autoPlay={true}
          controls
        >
          播放麦克风捕获的声音
        </audio>
      </div>
    </div>
  );
};
export default VideoCallPlay;
