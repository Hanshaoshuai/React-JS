import './App.scss';
import React, { useReducer, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSchedule } from './actions';
import Routers from './routers';
import { state, reducers } from './models';
import { MyContext } from './models/context';
import { APIS } from './api/ip';
import SuperMap from './pages/superMap';
import CompassClock from './pages/compassClock';

// const io = require("socket.io");
import io from 'socket.io-client';

declare global {
  interface Window {
    socket: any;
    modelName: any;
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
  const [myLocName] = useState<any>(localStorage.getItem('name'));
  let indexId: any = 0;
  // console.log(schedule);
  const [state, dispatch] = useReducer(reducer, states);
  const [messages, setMessages] = useState<any>({});
  const [superMaps, setSuperMaps] = useState(true);
  const [Clock, setClock] = useState(true);

  useEffect(() => {
    window.socket.on('message', function (data: any) {
      setMessages(data);
    });
    // window.socket.on("classIcon", (data: any) => {
    //   // console.log("classIcon====>>>>>", data);
    //   setMessages(data);
    // });

    destroyGlobalSpinner();
    dispatchs(
      setSchedule({
        data: '数据更改',
        list: [1, 2, 3],
      })
    );
  }, []);
  useEffect(() => {
    // console.log('message====>>>>>', messages);
    if (messages.text !== '上线了' && messages?.text?.toName === myLocName) {
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
