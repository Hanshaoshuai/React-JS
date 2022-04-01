import { remo, local } from '../../api';
import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    Peer: any;
  }
}
let timer: any = null;
const VideoCallPlay = ({
  call, // 开始按钮
  onStartQuery,
  videoCallCancel,
  actionName,
  onFinish,
  chatNames,
  locMyName,
  myLocName,
}: any) => {
  // 传输视频，不传输音频
  const [mediaStreamConstraints, setMediaStreamConstraints] = useState({
    video: true,
    audio: true,
  });
  const [LocName] = useState<any>(localStorage.getItem('name'));
  const [actionNames, setActionNames] = useState('');
  const [start, setStart] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const localVideo: any = useRef();
  const remoteVideo: any = useRef();
  //   var localVideo = document.getElementById('local_video'); // 本地视频 Video
  // var remoteVideo = document.getElementById('remote_video'); // 远端视频 Video
  var startButton: any = document.getElementById('startButton'); // 加入房间按钮
  var hangupButton: any = document.getElementById('hangupButton'); // 挂断按钮

  var pc: any; // RTCPeerConnection 实例（WebRTC 连接实例）
  var localStream: any; // 本地视频流
  // var socket = io.connect(); // 创建 socket 连接

  // ice 打洞服务器
  var config = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  };

  // offer 配置
  const offerOptions = {
    offerToReceiveVideo: 1,
    offerToReceiveAudio: 1,
  };
  // hangupButton.disabled = true;

  // startButton.addEventListener('click', () => {
  //   startActions();
  // });
  // hangupButton.addEventListener('click', hangupAction);

  // 点击加入房间
  const startActions = () => {
    console.log('123===>>>>', myLocName, chatNames);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediastream) => {
        localStream = mediastream; // 本地视频流
        console.log(localStream, myLocName, chatNames);
        localVideo.current.srcObject = mediastream; // 播放本地视频流
        // startButton.disabled = true;
        window.socket.emit('conn', `${myLocName}`, chatNames); // 连接 socket
        // socket 连接成功
        window.socket.on('conn', (room: any, chatNames: any) => {
          // hangupButton.disabled = false;
          pc = new RTCPeerConnection(config); // 创建 RTC 连接
          console.log('socket 连接成功', room, chatNames, localStream);
          localStream
            .getTracks()
            .forEach((track: any) => pc.addTrack(track, localStream)); // 添加本地视频流 track
          // 创建 Offer 请求
          pc.createOffer(offerOptions).then((offer: any) => {
            pc.setLocalDescription(new RTCSessionDescription(offer)); // 设置本地 Offer 描述，（设置描述之后会触发ice事件）
            window.socket.emit('signalOffer', offer, room, chatNames); // 发送 Offer 请求信令
          });
          // 监听 ice
          pc.addEventListener('icecandidate', (event: any) => {
            console.log(event);
            var iceCandidate = event.candidate;
            if (iceCandidate) {
              // 发送 iceOffer 请求
              window.socket.emit('iceOffer', iceCandidate, room, chatNames);
            }
          });
        });

        // 接收 Offer 请求信令
        window.socket.on(
          'signalOffer',
          (message: any, room: any, chatNames: any) => {
            console.log('接收 Offer 请求信令', message, room, chatNames);
            if (chatNames === LocName) {
              pc.setRemoteDescription(new RTCSessionDescription(message)); // 设置远端描述
              // 创建 Answer 请求
              pc.createAnswer((answer: any) => {
                pc.setLocalDescription(
                  new RTCSessionDescription(answer),
                  () => {
                    window.socket.emit('signalAnswer', answer, room, chatNames); // 发送 Answer 请求信令
                  }
                ); // 设置本地 Answer 描述
              });

              // 监听远端视频流
              pc.addEventListener('addstream', (event: any) => {
                console.log(event.stream);
                remoteVideo.current.srcObject = event.stream; // 播放远端视频流
              });
            }
          }
        );

        // 接收 Answer 请求信令
        window.socket.on(
          'signalAnswer',
          (message: any, room: any, chatNames: any) => {
            if (chatNames === LocName) {
              pc.setRemoteDescription(new RTCSessionDescription(message)); // 设置远端描述
              console.log('remote answer', message);
              window.socket.emit('iceAnswer', message, room, chatNames);
              // 监听远端视频流
              pc.addEventListener('addstream', (event: any) => {
                remoteVideo.current.srcObject = event.stream;
              });
            }
          }
        );

        // 接收 iceAnswer
        window.socket.on(
          'iceAnswer',
          (message: any, room: any, chatNames: any) => {
            addIceCandidates(message, room, chatNames);
          }
        );
        // 接收 iceOffer
        window.socket.on(
          'iceOffer',
          (message: any, room: any, chatNames: any) => {
            addIceCandidates(message, room, chatNames);
          }
        );
        // 添加 IceCandidate
        function addIceCandidates(message: any, room: any, chatNames: any) {
          if (pc !== 'undefined' && chatNames === LocName) {
            pc.addIceCandidate(new RTCIceCandidate(message));
          }
        }
        // 挂断
        function hangupAction() {
          localStream.getTracks().forEach((track: any) => track.stop());
          pc.close();
          pc = null;
          hangupButton.disabled = true;
          startButton.disabled = false;
        }
      })
      .catch(function (e) {
        console.log(JSON.stringify(e));
      });
  };

  let localPeerConnection: any = null;
  let transceiver: any = null;
  var webcamStream: any = null;

  useEffect(() => {
    if (onStartQuery && call) {
      console.log(onStartQuery);
      startIntervals();
      // startActions();
    }
  }, [onStartQuery]);

  useEffect(() => {
    setActionNames(actionName);
  }, [actionName]);

  useEffect(() => {
    if (onFinish) {
      clearIntervals();
    }
  }, [onFinish]);

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
    }
    startQuery(); // 开始呼叫
    startAction(); // 点击调用 获取本地视频
  };

  const clearIntervals = () => {
    setStart(false);
    setCallStarted(false);
    setActionNames('');
    clearInterval(timer); // 关闭
    localPeerConnection = null;
    transceiver = null;
    webcamStream = null;
    localVideo.current.srcObject?.getTracks()[0]?.stop();
    localVideo.current.srcObject?.getTracks()[1]?.stop();
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

  // 这个方法循环去请求去GET
  const startQuery = () => {
    timer = setInterval(function () {
      // console.log('这个方法循环去请求去');
      remo({ chatNames, text: call ? chatNames : locMyName }).then(
        (res: any) => {
          // console.log('这个方法循环去请求去===>>>>', res);
          if (res === '无数据' || res === '') {
          } else {
            // console.log('这个方法循环去请求去===>>>>', res);
            setCallStarted(true);
            // let msg = JSON.parse(res)
            let msg = res;
            // 做检测
            chackData(msg);
          }
        }
      );
    }, 1000);
  };

  // 检测函数
  const chackData = (msg: any) => {
    // console.log('收到-远端-type' + msg.MessageType);
    switch (msg.MessageType) {
      case '1':
        handleVideoOfferMsg(msg); // 处理视频提供消息
        break;
      case '2':
        handleVideoAnswerMsg(msg); // 处理视频应答信息
        break;
      case '3':
        handleNewICECandidateMsg(msg); // 处理新的候选项目
        break;
    }
  };

  // 返回需要发送的数据
  const sendDataByType = (type: any) => {
    // console.log(localPeerConnection.localDescription.sdp);
    let obj: any = {
      Data: localPeerConnection.localDescription.sdp,
      IceDataSeparator: ' ',
    };
    switch (type) {
      case 'Offer':
        obj.MessageType = '1';
        break;
      case 'Answer':
        obj.MessageType = '2';
        break;
    }
    return obj;
  };

  // 收到别的 offer 需要调用post发送 内容
  const handleVideoOfferMsg = async (msg: any) => {
    // console.log('远端-收到offer');
    if (!localPeerConnection) {
      createPeerConnection();
    }
    let obj: any = {
      type: 'offer',
      sdp: msg.Data,
    };
    var desc = new RTCSessionDescription(obj);
    localPeerConnection.setRemoteDescription(desc);

    if (!webcamStream) {
      try {
        // 播放本地视频
        webcamStream = await navigator.mediaDevices.getUserMedia(
          mediaStreamConstraints
        );
        // console.log('--------本地的被动视频流---------');
        if (localVideo) {
          localVideo.current.srcObject = webcamStream;
          // window.socket.emit('clientmessage', {
          //   //只作为文件上传完成使用
          //   uploadCompleted: true,
          // });
          // console.log('本地的被动视频流', webcamStream);
        }
      } catch (err) {
        handleGetUserMediaError(err);
        return;
      }
      try {
        webcamStream.getTracks().forEach(
          (transceiver = (track: any) =>
            localPeerConnection.addTransceiver(track, {
              streams: [webcamStream],
            }))
        );
      } catch (err) {
        handleGetUserMediaError(err);
      }
    }
    await localPeerConnection.setLocalDescription(
      await localPeerConnection.createAnswer()
    );
    // console.log(localPeerConnection);
    // 调用 post 请求 回复
    /////////////////////////////////////////////////
    let objs = sendDataByType('Answer');
    startPost(objs);
  };

  // 收到answer
  const handleVideoAnswerMsg = async (msg: any) => {
    // console.log('收到answer');
    let obj: any = {
      type: 'answer',
      sdp: msg.Data,
    };
    var desc = new RTCSessionDescription(obj);
    // console.log(desc);
    await localPeerConnection.setRemoteDescription(desc).catch();
  };

  // 收到ice
  const handleNewICECandidateMsg = async (msg: any) => {
    // console.log('收到ice==>>', msg);
    let arr = msg.Data.split(msg.IceDataSeparator);
    // console.log(arr);
    let obj = {
      candidate: arr[0],
      sdpMid: arr[1],
      sdpMLineIndex: arr[2],
    };
    var candidate = new RTCIceCandidate(obj);
    try {
      await localPeerConnection.addIceCandidate(candidate);
    } catch (err) {
      // console.log('iec 调用失败');
      // console.log(err);
    }
  };

  // post请求方法
  const startPost = (obj: any) => {
    // console.log(obj);
    obj.text = call ? chatNames : locMyName;
    local(obj).then((res: any) => {
      // console.log(res);
    });
  };

  // 获取本地视频
  const startAction = async () => {
    // startButton.disabled = true;
    createPeerConnection();

    try {
      // 播放本地视频
      webcamStream = await navigator.mediaDevices.getUserMedia(
        mediaStreamConstraints
      );
      // console.log('--------本地的---------');
      if (localVideo) {
        localVideo.current.srcObject = webcamStream;
      }
      // console.log(
      //   '本地的视频===>>',
      //   webcamStream,
      //   window.URL.createObjectURL(webcamStream)
      // );
    } catch (err) {
      handleGetUserMediaError(err);
      return;
    }
    try {
      webcamStream.getTracks().forEach(
        (transceiver = (track: any) =>
          localPeerConnection.addTransceiver(track, {
            streams: [webcamStream],
          }))
      );
    } catch (err) {
      handleGetUserMediaError(err);
    }
  };

  const createPeerConnection = async () => {
    localPeerConnection = new RTCPeerConnection();
    localPeerConnection.onicecandidate = handleICECandidateEvent;
    localPeerConnection.ontrack = handleTrackEvent;
    localPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
  };

  const handleICECandidateEvent = (event: any) => {
    // console.log('准备回调ice事件');
    if (event.candidate) {
      let obj = {
        Data:
          event.candidate.candidate +
          '|' +
          event.candidate.sdpMid +
          '|' +
          event.candidate.sdpMLineIndex,
        MessageType: 3,
        IceDataSeparator: '|',
      };
      // console.log(obj);
      startPost(obj);
    }
  };

  const handleTrackEvent = (event: any) => {
    const mediaStream = event.streams[0];
    if (remoteVideo) {
      remoteVideo.current.srcObject = mediaStream;
      // console.log('本地的视频1111===>>', mediaStream);
    }
    // remoteStream = mediaStream;
  };

  const handleNegotiationNeededEvent = async () => {
    // console.log('进入 createOffer()');
    try {
      const offer = await localPeerConnection.createOffer();
      await localPeerConnection.setLocalDescription(offer);
      let obj = sendDataByType('Offer');
      // console.log(obj);
      startPost(obj);
    } catch {}
  };

  const handleGetUserMediaError = (e: any) => {
    // console.log(e);
    switch (e.name) {
      case 'NotFoundError':
        alert(
          'Unable to open your call because no camera and/or microphone' +
            'were found.'
        );
        break;
      case 'SecurityError':
      case 'PermissionDeniedError':
        // Do nothing; this is the same as the user canceling the call.
        break;
      default:
        alert('Error opening your camera and/or microphone: ' + e.message);
        break;
    }
  };

  return (
    <div className="videoCall">
      <video
        muted={true}
        id="localVideo"
        autoPlay={true}
        // playsinline
        ref={localVideo}
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
          id="remoteVideo"
          autoPlay={true}
          // playsinline
          ref={remoteVideo}
        ></video>
      </div>
    </div>
  );
};
export default VideoCallPlay;
