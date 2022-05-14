import './App.scss';
import React, { useReducer, useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSchedule } from './actions';
import Routers from './routers';
import { state, reducers } from './models';
import { MyContext } from './models/context';
import { APIS } from './api/ip';
import SuperMap from './pages/superMap';
import CompassClock from './pages/compassClock';
import VideoCallPlay from './pages/chatroom/videoCallPlayCall';

// const io = require("socket.io");
import io from 'socket.io-client';

declare global {
  interface Window {
    socket: any;
    modelName: any;
    userAgents: any;
    mui: any;
    plus: any;
    Recorder: any;
    promise: any;
    stream: any;
    mediaStreamTrack: any;
    time: any;
  }
}

// const IP = "http://192.168.1.101:2021";
const IP = APIS;
// const obj = window.location.origin.split(":");
// const IP =
//   obj.length === 2
//     ? `${window.location.origin}:2021`
//     : `${obj[0]}:${obj[1]}:2021`;
console.log(IP);
window.socket = io(IP);
// const socket = io(IP);
const states: any = state();
const reducer: any = reducers();
export default function App() {
  const dispatchs = useDispatch();
  const schedule: any = useSelector<any>((state) => state.schedule);
  const { textActionName } = schedule;
  let indexId: any = 0;
  // console.log(schedule);
  const [state, dispatch] = useReducer(reducer, states);
  const { videoCall, list }: any = state;
  const [messages, setMessages] = useState<any>({});
  const [superMaps, setSuperMaps] = useState(true);
  const [Clock, setClock] = useState(true);
  const [videoCalls, setVideoCalls] = useState(false);
  const [call, setCall] = useState(false);
  const [actionName, setActionName] = useState('');

  useEffect(() => {
    console.log(videoCall, textActionName);
    if (videoCall && textActionName) {
      setCall(true);
      setVideoCalls(true);
      setActionName(textActionName);
    }
  }, [videoCall, textActionName]);

  useEffect(() => {
    window.socket.on('message', function (data: any) {
      setMessages(data);
    });
    destroyGlobalSpinner();
    // dispatchs(
    //   setSchedule({
    //     data: '数据更改',
    //     list: [1, 2, 3],
    //   })
    // );

    // 视频语音通话部分
    window.socket.on('call', ({ to, sender, headPortrait }: any) => {
      // console.log(to, sender);
      localStorage.setItem('friendSocketId', sender);
      localStorage.setItem('headPortrait', headPortrait);
      setVideoCalls(true);
      setCall(false);
    });
    window.socket.on('respond', ({ to, sender, text }: any) => {
      // console.log('接听+++++++====>>>>', to, sender, text);
      if (text === '挂断') {
        localStorage.removeItem('startTime');
        // localStorage.removeItem('friendSocketId');
        window.time = setTimeout(() => {
          dispatchs({
            type: 'videoCall',
            videoCall: false,
          });
          dispatchs({
            type: 'textActionName',
            textActionName: '',
          });
          setVideoCalls(false);
          setCall(false);
          clearTimeout(window.time);
          localStorage.removeItem('NestingIframe');
        }, 500);
      }
    });
  }, []);

  useEffect(() => {
    const myLocName = localStorage.getItem('name');
    let toName: any = {};
    toName = JSON.parse(messages.toName || '{}');
    if (
      messages.toName &&
      Object.prototype.toString.call(toName) === '[object Array]'
    ) {
      // console.log(messages.toName);
      toName = toName.filter((term: any) => term.name === myLocName)[0] || {};
    }
    // console.log('message====>>>>>', messages, toName);
    if (
      messages.text !== '上线了' &&
      (messages?.text?.toName === myLocName || toName.name === myLocName)
    ) {
      const play: any = document.getElementById('play');
      indexId++;
      if (play && indexId === 1) {
        // console.log('message====>>>>>', play);
        if (messages?.text?.mp3) {
          play.src = `/mp3/${messages?.text?.mp3}.mp3`;
          play.play();
        } else {
          play.src = '/mp3/1.mp3';
          play.play();
        }
      } else {
        indexId = 0;
      }
    }

    // 视频语音通话部分
    if (
      messages?.text?.toName === myLocName ||
      messages?.text?.fromName === myLocName
    ) {
      if (messages?.text?.VideoAndVoice === '视频') {
        setVideoCalls(true);
        setActionName('切换语音');
        localStorage.setItem('startTime', messages?.text?.startTime);
      } else if (messages?.text?.VideoAndVoice === '语音') {
        setVideoCalls(true);
        setActionName('静音');
        localStorage.setItem('startTime', messages?.text?.startTime);
      } else if (messages?.text?.conversation) {
        window.time = setTimeout(() => {
          setVideoCalls(false);
          setCall(false);
          clearTimeout(window.time);
          localStorage.removeItem('NestingIframe');
        }, 500);
        localStorage.removeItem('NestingIframe');
      }
    }
  }, [messages]);

  const destroyGlobalSpinner = () => {
    const splash = document.querySelector('#splash-spinner');
    const spinner = document.querySelector('.spinner');
    if (splash) {
      document.head.removeChild(splash);
    }
    if (spinner && spinner.parentNode) {
      spinner.parentNode.removeChild(spinner);
    }
  };
  // const pipeline = function(...funcs:any) {
  //   return function(val:any){
  //    return funcs.reduce(function(a: any, b: any){
  //     return b(a);
  //    }, val);
  //   }
  //  }
  //  const plus1 = (a: number) => a + 1;
  //  const mult2 = (a: number) => a * 2;
  //  const addThenMult = pipeline(plus1, mult2);
  //  console.log(addThenMult(5))
  const callback = () => {
    setClock(false);
  };
  const callbackMap = () => {
    setSuperMaps(false);
  };

  return (
    <>
      {Clock && (
        <div className="Clock">
          <CompassClock callback={callback} />
        </div>
      )}
      {superMaps && <SuperMap callback={callbackMap} />}
      <audio id="play" src="/mp3/1.mp3"></audio>
      {videoCalls && (
        <VideoCallPlay
          call={call}
          onStartQuery={videoCalls}
          actionName={actionName}
          // chatNames={toChatName}
          // locMyName={locMyName}
          // myLocName={myLocName}
        />
      )}
      <Router>
        <MyContext.Provider value={{ state, dispatch, messages }}>
          <Switch>
            <Routers />
          </Switch>
        </MyContext.Provider>
      </Router>
    </>
  );
}
