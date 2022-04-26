import './index.scss';

import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';
import {
  CheckList,
  Toast,
  Loading,
  ImageViewer,
  Badge,
  Dialog,
  TextArea,
} from 'antd-mobile';
import {
  PlayOutline,
  CloseCircleOutline,
  FileOutline,
  SoundOutline,
  DeleteOutline,
  EditSOutline,
} from 'antd-mobile-icons';

import { expressionList } from './expression';
import { moment, isObject, IsURL, textIsURL } from '../../helpers';
import { MyContext } from '../../models/context';
import OtherItems from './otherItems';
import { UploadImg } from '../A-components/uploadImg';
import { FileUpload } from '../A-components/fileUpload';
import Spins from '../A-Spin';
import NestingIframe from '../nestingIframe/nestingIframe';
import { startRecord, stopRecord } from './audios';

import {
  requestMessage,
  addFriend,
  requestResponse,
  messageClear,
  addBuildingGroup,
  buildingGroupMove,
  uploadFile,
  fileUpload,
  isRead,
  recordDeletionOrChange,
} from '../../api';
import { onUploadProgress } from '../../services/request';
import { sync } from 'resolve';
import VideoCallPlay from './videoCallPlayCall';
import { time } from 'console';
import { optionalIndexedAccessType } from '@babel/types';

let Flength = 0;
let dateTimes: any = '';
let domKeys = 0;
let textName = 0;
let textName_1 = 0;
let nickNames = '';
let domListL: any = [];
let toChatNameLength = 0;
let locComplete: any = '';
let page = 1;
let scrollSize = 0;
let smallFile = 0;
let imagelistId: any = {};
let imagelistIndex = 0;
let ws: any = null;
let as = 'pop-in';
let operationId: any = null;
let rec = window.Recorder(); //使用默认配置，mp3格式
let contentListChange: any = [];
let deleteOutlineList: any = [];

const ChatList = () => {
  const chatNames: any = localStorage.getItem('toChatName');
  const agreess: any = useRef();
  const texts: any = useRef();
  const boxTextes: any = useRef();
  const contentScroll: any = useRef();
  const history = useHistory();
  const { messages } = useContext(MyContext);
  const [tabShow, setTabShow] = useState<any>(false);
  const [expressionShow, setExpressionShow] = useState(false);
  const [addAnothers, setAddAnothers] = useState(false);

  const [voiceSotten, setVoiceSotten] = useState(false);
  const [inputContent, setInputContent] = useState('');

  const [shuruShow, setShuruShow] = useState(false);
  const [pageSize] = useState(19);
  const [textNameOld] = useState(localStorage.getItem('textName'));
  const [Myimg] = useState<any>(localStorage.getItem('myapathZoom'));
  const [Youimg] = useState<any>(localStorage.getItem('headPortrait'));
  // const [nickNameTop] = useState<any>(localStorage.getItem('nickName'));
  const [nickNameTop] = useState<any>(localStorage.getItem('nickNameSpare'));
  const [chatType] = useState(localStorage.getItem('type'));
  const [myLocName] = useState<any>(localStorage.getItem('name'));
  const [toChatName] = useState<any>(localStorage.getItem('toChatName'));
  const [locMyName] = useState(localStorage.getItem('myName'));
  const [groupOwner] = useState(localStorage.getItem('groupOwner'));
  const [imgId] = useState(localStorage.getItem('imgId'));
  const [imgIdLoc] = useState(
    JSON.parse(localStorage.getItem('imgIdLoc') || '[]')
  );
  const [contentList, setContentList] = useState<any>([]);
  const [mingSpanC] = useState('#f5f4f9');
  const [mingSpanB] = useState('#ff7a59');
  const [tanCengShow, setTanCengShow] = useState(false);
  const [checkListvalue, setCheckListvalue] = useState([]);
  const [getListL, setGetListL] = useState<any>(
    JSON.parse(localStorage.getItem('getListL') || '[]')
  );
  const [groupName] = useState<any>(localStorage.getItem('groupName') || '');
  const [firstEntry, setFirstEntry] = useState(false);
  const [deleteFl, setDeleteFl] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [getBuddyLists] = useState(
    JSON.parse(localStorage.getItem('getBuddyLists') || '[]')
  );
  const [origin, setorigin] = useState(window.location.origin);
  const [dataListL, setDataListL] = useState<any>(true);
  const [onPlayUrl, setOnPlayUrl] = useState<any>('');
  const [plays, setplays] = useState(true);
  const [progress, setProgress] = useState('');

  const [videoCalls, setVideoCalls] = useState(false);
  const [call, setCall] = useState(false);
  const [actionName, setActionName] = useState('切换语音');
  const [onFinish, setOnFinish] = useState(false);

  const [Loadings, setLoadings] = useState(false);
  const [total, setTotal] = useState(false);
  const [imagesList, setImagesList] = useState<any>([]);
  const [defaultIndex, setDefaultIndex] = useState<any>(0);
  const [iframeTitle, setIframeTitle] = useState('');
  const [display, setDisplay] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const [connectUrl, setConnectUrl] = useState(false);
  const [downloadName, setDownloadName] = useState<any>('');
  const [overallLoadings, setOverallLoadings] = useState(false);
  const [operationLoadings, setOperationLoadings] = useState(false);

  useEffect(() => {
    if (!voiceSotten && texts && texts.current) {
      texts.current.innerText = inputContent;
      if (!expressionShow && Flength !== 0) {
        moveCursor();
      }
    }
  }, [voiceSotten]);

  useEffect(() => {
    if (!operationLoadings) {
      scrollHeights(); //滚动底部
    } else {
      setOperationLoadings(false);
    }
    contentListChange = contentList;
  }, [contentList, expressionShow, addAnothers]);

  useEffect(() => {
    getList('');
    page = 1;
    scrollSize = 0;
    return componentWillUnmount;
  }, []);
  const componentWillUnmount = () => {
    page = 1;
    scrollSize = 0;
    imagelistId = {};
    imagelistIndex = 0;
  };
  useEffect(() => {
    //监听服务服务端emit的message事件发送的消息
    // console.log(messages);
    if (firstEntry) {
      messageVariety(messages);
    }
    setFirstEntry(true);

    if (
      messages?.text?.VideoAndVoice === '视频' &&
      messages?.text?.toName === myLocName
    ) {
      setVideoCalls(true);
    } else if (
      messages?.text?.VideoAndVoice === '语音' &&
      messages?.text?.toName === myLocName
    ) {
      setVideoCalls(true);
      setActionName('静音');
    } else if (
      messages?.text?.VideoAndVoice === '通话结束' &&
      messages?.text?.toName === myLocName
    ) {
      setOnFinish(true);
      setCall(false);
    }
  }, [messages]);

  useEffect(() => {
    const videoRef: any = document.getElementById('vdo') || false;
    if (!videoRef) return;
    videoRef.play() as any;
    setplays(true);
  }, [onPlayUrl]);

  useEffect(() => {
    const play: any = document.getElementById('play');
    const playImg: any = document.getElementById(audioUrl);
    const playImgPlay: any = document.getElementById(`${audioUrl}Play`);
    if (audioUrl) {
      play.setAttribute('index', audioUrl);
      play.src = `${audioUrl}`;
      play.play();
      const ended = () => {
        setAudioUrl('');
        play.setAttribute('index', '');
        // console.log('ended');
        play.removeEventListener('ended', ended, false);
        playImg.style.display = 'inline-block';
        playImgPlay.style.display = 'none';
      };
      play.addEventListener('ended', ended, false);
    }
  }, [audioUrl]);

  useEffect(() => {
    if (history.location.search === '?OnPlayUrl=0' && onPlayUrl) {
      videoPlays();
    }
    if (history.location.search !== '?ImageViewer=1') {
      setVisible(false);
    }
    if (history.location.search === '?OnPlayUrl=0') {
      setIframeUrl('');
    }
    operationChange();
  }, [history.location.search]);

  const onPause = (url: string) => {
    const play: any = document.getElementById('play');
    const playImg: any = document.getElementById(url);
    const playImgPlay: any = document.getElementById(`${url}Play`);
    if (play.getAttribute('index') === url) {
      // console.log(url, audioUrl);
      setAudioUrl('');
      play.setAttribute('index', '');
      play.src = ``;
      play.pause();
      playImg.style.display = 'inline-block';
      playImgPlay.style.display = 'none';
    } else {
      playImg.style.display = 'none';
      playImgPlay.style.display = 'inline-block';
    }
  };

  const onRead = (url: string, indexId: any) => {
    isRead({
      fromName: myLocName,
      toName: chatNames,
      type: chatType,
      groupName: groupName,
      fileUrl: url,
    }).then((res) => {
      // console.log(res);
      if (res?.code === 200) {
        // getList('');
        const dom = document.getElementById(`${indexId}`);
        if (dom) {
          dom.style.display = 'none';
        }
      }
    });
  };

  const onSetVideoCalls = (text: string) => {
    setCall(true);
    setVideoCalls(true);
    setActionName(text);
    setExpressionShow(false);
    setAddAnothers(false);
  };

  const videoCallCancel = (text: string) => {
    setVideoCalls(false);
    setOnFinish(false);
    setCall(false);
    if (onFinish) return;
    window.socket.emit('clientmessage', {
      fromName: myLocName,
      toName: toChatName,
      text: `${text ? text : '通话结束'}`,
      VideoAndVoice: '通话结束',
    });
  };

  const imgsOnLoad = () => {
    scrollHeights(); //滚动底部
    setExpressionShow(false);
    setAddAnothers(false);
  };

  const setVisibles = (url: any) => {
    // setFileUrl(url);
    setDefaultIndex(imagelistId[url]);
    setVisible(true);
    history.push(`${window.location.pathname}?ImageViewer=1`);
  };

  const onPlay = (url: any) => {
    setOnPlayUrl(url);
    history.push(`/chatroom?OnPlayUrl=1`);
  };
  const videoPlays = () => {
    // 视频开关
    setplays(!plays);
    setOnPlayUrl('');
  };

  useEffect(() => {
    if (iframeUrl) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, [iframeUrl]);

  const fileDownload = ({ d, e, url }: any) => {
    // console.log(d, e, url);
    if (url === true) {
      setConnectUrl(true);
      if (window.modelName === 'pc') {
        window.open(`${e}`);
      } else {
        setDownloadName('');
        setIframeTitle(e);
        setDisplay(true);
        setIframeUrl(e);
        history.push(`/chatroom?OnPlayUrl=0&iframe=1`);
        // if (window.plus) {
        //   plusReady();
        // } else {
        //   document.addEventListener('plusready', plusReady, false);
        // }
      }
    } else {
      setConnectUrl(false);
      setDownloadName(url);
      // window.open(`${origin + e}`);
      setIframeTitle(`${window.location.origin}${e}`);
      setDisplay(true);
      setIframeUrl(`${window.location.origin}${e}`);
      history.push(`/chatroom?OnPlayUrl=0&iframe=1`);
    }
  };
  const iframeGoBackS = (e?: any) => {
    history.goBack();
    setIframeUrl('');
    let timeout = setTimeout(() => {
      localStorage.removeItem('NestingIframe');
      clearTimeout(timeout);
    }, 310);
  };
  const messageVariety = (data: any) => {
    if (data.text === 'uploadCompleted') {
      getList('');
      return;
    }
    if (groupName && groupName !== data.text?.groupName) {
      return;
    } else if (data.text?.file && data.text.fromName !== myLocName) {
      return;
    }
    if (
      data.text &&
      Object.prototype.toString.call(data.text) === '[object Object]'
    ) {
      if (data.text.groupName && !groupName) {
        return;
      }
      // console.log(data);
      let newList: any = contentList.slice(0);
      if (data.text.fromName === myLocName) {
        if (data.text.text_last) {
          return;
        }
        newList.push(FasongShijian());
        if (data.text.text.friends === 'yes') {
          newList.push(
            TishiNeirong('你通过了对方的好友验证请求，现在可以开始聊天啦😄')
          );
          setContentList(newList);
        } else if (data.text.text.friend === 'no') {
          newList.push(
            TishiNeirong('您向对方发送了好友验证请求，请耐心等待！')
          );
          setContentList(newList);
        } else if (data.text.text.friends === 'no') {
          newList.push(TishiNeirong('您拒绝了对方的好友验证请求！'));
          setContentList(newList);
        } else {
          newList.push(
            My({ cont: data.text.text, file: data.text.file, data: data.text })
          );
          setContentList(newList);
          // console.log("11111-", newList, contentList);
        }
        return;
      } else if (
        data.text.fromName === myLocName &&
        data.text.toName !== '' &&
        data.text.toName !== myLocName
      ) {
        // console.log("111-", data.text);
        newList.push(FasongShijian());
        newList.push(
          My({ type: data.text.text, cont: data.text.file, data: data.text })
        );
        setContentList(newList);
        return;
      } else if (
        data.text.toName === myLocName &&
        data.text.fromName === window.localStorage.getItem('toChatName')
      ) {
        // console.log("222-", data.text);
        newList.push(FasongShijian());
        clearNumber(data.text.fromName, data.text.toName);
        if (data.text.text.friends === 'yes') {
          // $(".shuru").show();
          newList.push(TishiNeirong(data.text.text.text));
          setContentList(newList);
          setShuruShow(true);
        } else if (data.text.text.friend === 'no') {
          newList.push(
            You({
              yes: 'yes',
              type: '',
              cont:
                '😄来自' + data.text.fromName + '的好友验证请求，是否同意！',
              data: data.text,
            })
          );
          setContentList(newList);
          // $(".shuru").hide();
          setShuruShow(false);
        } else {
          if (data.text.text.friends === 'no') {
            newList.push(
              You({
                yes: 'yes',
                type: 'no',
                cont: '🙁对方拒绝了您的好友验证请求！是否再次添加好友...',
                DianJi: 'no',
                data: data.text,
              })
            );
            setContentList(newList);
          } else {
            newList.push(
              You({
                yes: 'yes',
                type: 'yes',
                cont: data.text.text,
                file: data.text.file,
                data: data.text,
              })
            );
            setContentList(newList);
          }
        }
        return;
      } else if (data.text.type === 'groupChat') {
        //群聊数据
        // console.log("333-", data);
        if (data.text.text_last) {
          Toast.show({
            content: '本群已被移除！',
            position: 'top',
          });
          history.push('/chatRecord');
          return;
        }
        newList.push(FasongShijian());
        setContentList(newList);
        if (data.text.text_first) {
          newList.push(TishiNeirong(data.text.text));
          setContentList(newList);
        } else {
          let imgs = '';
          imgIdLoc.map((item: any) => {
            if (item.name === data.text.fromName) {
              imgs = item.classIcon;
            }
            return item;
          });
          newList.push(
            You({
              yes: 'yes',
              type: 'yes',
              cont: data.text.text,
              DianJi: data.text.fromName,
              myIconName: data.text.myIconName,
              imgs: imgs,
              file: data.text.file,
              data: data.text,
            })
          );
          setContentList(newList);
          clearNumber(
            myLocName,
            localStorage.getItem('toChatName'),
            'groupChat',
            nickNameTop
          );
        }
        return;
      }
      if (data.text.toName === '' && data.text.fromName !== myLocName) {
        // console.log("444-", data.text);
      }
      // if (data.text.file) {
      //   getList("");
      // }
    }
  };

  const scrollHeights = useCallback(() => {
    if (contentScroll !== null) {
      const el_height = contentScroll.current.scrollHeight; //   ===>  获得滚动条的高度
      contentScroll.current.scrollTop = el_height; //  ===> 设置滚动条的位置，滚动到底部
      if (page > 1) {
        contentScroll.current.scrollTop =
          contentScroll.current.scrollHeight - scrollSize;
      }
    }
  }, []);

  const ChushiHuaTimes = () => {
    //初始化时间函数
    const times = new Date(); //实例化日期对象；
    let myMonth = times.getMonth(); //当前的月份；
    myMonth = myMonth + 1; //当前的月份；
    // const myDate = times.getDate(); //当前的日期；
    let myHours: any = times.getHours(); //当前的小时；
    let newNum = times.getTime(),
      time = new Date(newNum).toLocaleString();
    let myMinutes: any = '';
    if (/上午/.test(time)) {
      if (myHours === 12 || myHours < 5) {
        if (myHours === 12) {
          myHours = '凌晨00';
        } else {
          myHours = '凌晨0' + myHours.toString();
        }
      } else if (myHours === 5) {
        myHours = '清晨0' + myHours.toString();
      } else if (myHours > 5 && myHours < 11) {
        if (myHours === 10) {
          myHours = '早上' + myHours.toString();
        } else {
          myHours = '早上0' + myHours.toString();
        }
      } else if (myHours > 10 && myHours < 12) {
        myHours = '中午' + myHours.toString();
      }
    } else {
      if (myHours === 12 || myHours < 13) {
        if (myHours === 12) {
          myHours = '中午' + myHours.toString();
        } else {
          myHours = '中午' + myHours.toString();
        }
      } else if (myHours > 12 && myHours < 19) {
        myHours = '下午' + myHours.toString();
      } else if (myHours > 18 || myHours === 0) {
        myHours = '晚上' + myHours.toString();
      }
    }
    if (times.getMinutes() < 10) {
      myMinutes = '0' + times.getMinutes().toString(); //当前的分钟；
    } else {
      myMinutes = times.getMinutes(); //当前的分钟；
    }
    // console.log(times)
    return myHours + ':' + myMinutes;
  };

  const FasongShijian = () => {
    //发送时间显示函数
    domKeys += 1;
    const timeHour = new Date().getTime();
    if (timeHour - dateTimes < 100000) {
      // console.log(timeHour - dateTimes);
      dateTimes = timeHour;
      return;
    }
    dateTimes = timeHour;

    const style: any = {};
    style.fontSize = 0;
    style.padding = '0.2rem 0';
    style.textAlign = 'center';
    style.width = '82%';
    style.margin = '0px auto';
    const style1: any = {};
    style1.color = '#fff';
    style1.fontSize = '0.32rem';
    style1.background = '#cfced2';
    style1.display = 'inline-block';
    style1.padding = '0 0.12rem';
    style1.borderRadius = '0.08rem';
    style1.margin = '0';

    return (
      <div key={domKeys} style={style}>
        <p style={style1}>{ChushiHuaTimes()}</p>
      </div>
    );
    // contentTexte.scrollTop=contentTexte.scrollHeight;  //滚动条始终在下面
  };

  const clearNumber = (
    fromName?: any,
    toName?: any,
    groupChat?: any,
    nickNameTop?: any
  ) => {
    // console.log(fromName, toName, groupChat, nickNameTop);
    let toName_1 = null;
    if (groupChat) {
      toName_1 = JSON.stringify(toName);
    } else {
      toName_1 = toName;
    }
    // 消息清零
    messageClear({
      fromName: fromName,
      myName: toName_1,
      clear: 'ok',
      type: groupChat,
      nickName: nickNameTop,
    }).then((data) => {
      // console.log(data);
      if (data.code === 200) {
        // alert(data.msg);
      }
    });
  };

  const tousuoGo = (times: any, text: string, dateTim: any) => {
    //提示投诉信息内容按钮
    if (text === 'no') {
      return;
    }
    domKeys += 1;
    const style1: any = {};
    style1.color = '#fff';
    // style1.lineHeight = "0.44rem";
    style1.fontSize = '0.32rem';
    style1.background = '#cfced2';
    style1.display = 'inline-block';
    style1.padding = '0 0.12rem';
    style1.borderRadius = '0.08rem';
    style1.wordWrap = 'break-word';

    const style: any = {};
    style.fontSize = '0';
    style.width = '82%';
    style.margin = '0 auto';
    style.padding = '0.2rem 0';
    style.textAlign = 'center';
    return (
      <div key={domKeys} style={style} id={`&${dateTim}`}>
        <span style={style1}>{times}</span>
      </div>
    );
  };

  const TishiNeirong = (texts: string) => {
    domKeys += 1;
    //或其他公告提示信息
    return (
      <div
        key={domKeys}
        style={{
          width: '82%',
          fontSize: '0',
          margin: '0 auto',
          padding: '0.2rem 0',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            color: '#b4b4b4',
            lineHeight: '0.4rem',
            fontSize: '0.32rem',
            wordWrap: 'break-word',
          }}
        >
          {texts}
        </span>
      </div>
    );
  };

  const HuanquSenqing = (cont: string, DianJi: string | number, type: any) => {
    //换名片和发送项目申请提示处理函数
    domKeys += 1;
    const locFromName = window.localStorage.getItem('fromName');
    const myName = window.localStorage.getItem('name');

    const style: any = {
      // width: '4.04rem',
      // margin: '0 auto',
      minHeight: '1.26rem',
      position: 'relative',
      background: '#fff',
      margin: '0.16rem 0.2rem',
    };

    const style1: any = {};
    style1.lineHeight = '0.42rem';
    style1.fontSize = '0.32rem';
    style1.wordWrap = 'break-word';
    style1.padding = '0 0 0.72rem 0';
    style1.color = '#07111B';
    style1.margin = '0px';

    const style2: any = {
      position: 'absolute',
      fontSize: '0.32rem',
      display: 'inline-block',
      left: '0',
      bottom: '0',
      color: mingSpanC,
      width: '46%',
      height: '0.62rem',
      borderRadius: '0.08rem',
      background: mingSpanB,
      lineHeight: '0.62rem',
      textAlign: 'center',
    };

    let i = 0;
    if (DianJi === 1 || DianJi === 'yes') {
      i = 1;
      style2.color = '#000000';
      style2.background = '#f5f4f9';
    }
    const agrees = () => {
      //添加好友同意事件
      var timeHour = new Date().getTime();
      var dateYes = 'no';
      if (timeHour - dateTimes > 100000) {
        // console.log(timeHour - dateTimes);
        dateYes = 'yes';
      }
      if (i === 1) {
        return;
      }
      i++;
      // console.log(i);
      if (type === 'no') {
        var name = localStorage.getItem('name'),
          addName = localStorage.getItem('toChatName'),
          nickName = localStorage.getItem('toNames');
        //再次添加好友；
        addFriend({
          addName: nickName,
          fromNumber: name,
          addNumber: addName,
          addFriend: 2,
        }).then((data) => {
          // console.log(data);
          if (data.code === 200) {
            if (agreess) {
              agreess.current.classList.add('active');
              // agreess.current.style.color = "#000000";
              // agreess.current.style.background = "#f5f4f9";
            }
            //再次向对方发送添加好友验证消息
            window.socket.emit('clientmessage', {
              fromName: name,
              toName: addName,
              text: { friend: 'no', addName: nickName, addFriend: 2 },
              dateTimes: dateYes,
            });
            Toast.show({
              icon: 'success',
              content: data.msg,
            });
          } else {
            Toast.show({
              content: data.msg,
              position: 'top',
            });
          }
        });
      } else {
        //同意添加好友请求
        requestResponse({
          fromName: locFromName,
          myName: myName,
          friends: 'yes',
        }).then((data) => {
          // console.log(data);
          if (data.code === 200) {
            Toast.show({
              icon: 'success',
              content: data.msg,
            });
            if (agreess) {
              agreess.current.classList.add('active');
              // agreess.current.style.color = "#000000";
              // agreess.current.style.background = "#f5f4f9";
            }
            setShuruShow(true);
            //向对方发送同意好友消息
            window.socket.emit('clientmessage', {
              fromName: myName,
              toName: locFromName,
              text: {
                from: myName,
                text: '我通过了你的好友验证请求，我们现在可以聊天啦！😄',
                friends: 'yes',
              },
              dateTimes: dateYes,
            });
          }
        });
      }
    };

    const style3: any = {};
    style3.position = 'absolute';
    style3.fontSize = '0.32rem';
    style3.right = '0';
    style3.bottom = '0';
    style3.width = '46%';
    style3.height = '0.62rem';
    style3.borderRadius = '0.08rem';
    style3.background = '#f5f4f9';
    style3.lineHeight = '0.62rem';
    style3.textAlign = 'center';

    const refuses = () => {
      //绑定好友拒绝事件
      if (type === 'no') {
        return;
      }
      if (i === 1) {
        return;
      }
      var timeHour = new Date().getTime();
      var dateYes = 'no';
      if (timeHour - dateTimes > 100000) {
        // console.log(timeHour - dateTimes);
        dateYes = 'yes';
      }
      if (DianJi === 1) {
        return;
      }
      i++;
      //好友拒绝请求
      requestResponse({
        fromName: locFromName,
        myName: myName,
        friends: 'no',
      }).then((data) => {
        // console.log(data);
        if (data.code === 200) {
          if (agreess) {
            agreess.current.classList.add('active');
            // agreess.current.style.color = "#000000";
            // agreess.current.style.background = "#f5f4f9";
          }
          //向对方发送添加好友拒绝消息
          window.socket.emit('clientmessage', {
            fromName: myName,
            toName: locFromName,
            text: {
              from: myName,
              text: '您拒绝了对方的好友验证请求！',
              friends: 'no',
            },
            dateTimes: dateYes,
          });
        }
      });
    };
    return (
      <div key={domKeys} style={style}>
        <div style={style1}>{cont}</div>
        <span ref={agreess} style={style2} onClick={agrees}>
          {type === 'no' ? '是' : '同意'}
        </span>
        <span style={style3} onClick={refuses}>
          {type === 'no' ? '否' : '拒绝'}
        </span>
      </div>
    );
  };

  const styleLength = (file: any) => {
    let styleLength: any = {};
    if (file?.styleLength) {
      let imgList = file?.styleLength.split('_');
      if (imgList[0] === 'width') {
        styleLength.width = `130px`;
        imgList[1] &&
          (styleLength.height = `${130 / (imgList[1] / imgList[2])}px`);
      } else {
        imgList[1] &&
          (styleLength.width = `${190 * (imgList[1] / imgList[2])}px`);
        styleLength.height = '190px';
      }
    }
    return styleLength;
  };
  const onIsUrl = ({ cont, type, data }: any) => {
    let newCont: any = [];
    if (cont) {
      const { startIsUrl, textList, urlList } = textIsURL(cont);
      if (startIsUrl && urlList.length) {
        newCont = urlList.map((item: any, index: number) => {
          return (
            <div key={index}>
              <div
                onClick={() => fileDownload({ e: item, url: true })}
                style={{ color: type ? type : '#1b24ff' }}
              >
                {item}
              </div>
              {index <= textList.length - 1 ? <div>{textList[index]}</div> : ''}
            </div>
          );
        });
      } else if (urlList.length) {
        newCont = textList.map((item: any, index: number) => {
          return (
            <div key={index}>
              <div>{item}</div>
              {index <= urlList.length - 1 ? (
                <div
                  onClick={() => fileDownload({ e: urlList[index], url: true })}
                  style={{ color: type ? type : '#1b24ff' }}
                >
                  {urlList[index]}
                </div>
              ) : (
                ''
              )}
            </div>
          );
        });
      } else {
        newCont = <span>{cont}</span>;
      }
    }
    return newCont;
  };
  const onEditSOutline = (id: any, data?: any) => {
    let dom: any = document.getElementById(`%${id}`);
    // console.log(id, startIsUrl, textList, urlList, contentListChange);
    let AreaValue = '';
    Dialog.confirm({
      content: (
        <TextArea
          onChange={(e) => {
            AreaValue = e;
          }}
          defaultValue={dom.innerText}
          autoSize={{ minRows: 5 }}
        />
      ),
      onConfirm: async () => {
        // console.log(AreaValue);
        operationChange();
        if (!AreaValue) return;
        const textName =
          data.groupName ||
          `${data.fromTo || data.fromName * 1 + data.toName * 1}.txt`;
        setOverallLoadings(true);
        setOperationLoadings(true);
        recordDeletionOrChange({
          dateTime: id,
          groupName: textName,
          text: AreaValue,
        }).then((res: any) => {
          setOverallLoadings(false);
          if (res.code === 200) {
            if (AreaValue) {
              deleteOutlineList = contentListChange.map((item: any) => {
                if (item?.props?.id === `@${id}`) {
                  return My({
                    cont: AreaValue,
                    data: data,
                    domKeyId: item.key,
                  });
                }
                return item;
              });
              setContentList(deleteOutlineList);
            }
            // dom.innerHTML = urlList.length ? newCont : AreaValue;
            // Toast.show({
            //   icon: 'success',
            //   content: '更改成功',
            //   position: 'top',
            // });
          } else {
            Toast.show(`请稍后再试！`);
          }
        });
      },
    });
  };
  const onDeleteOutline = async (id: any, data?: any) => {
    // console.log(id, contentListChange, data);
    deleteOutlineList = contentListChange.filter((item: any) => {
      if (item?.props?.id === `@${id}` || item?.props?.id === `&${id}`) {
        return false;
      } else {
        return true;
      }
    });
    const result = await Dialog.confirm({
      content: '删除将无法恢复！',
    });
    const textName =
      data.groupName ||
      `${data.fromTo || data.fromName * 1 + data.toName * 1}.txt`;
    if (result) {
      setOverallLoadings(true);
      setOperationLoadings(true);
      recordDeletionOrChange({
        dateTime: id,
        groupName: textName,
        delet: true,
      }).then((res: any) => {
        setOverallLoadings(false);
        if (res.code === 200) {
          // console.log(res);
          onSetContentList();
        } else {
          Toast.show(`请稍后再试！`);
        }
      });
    }
  };
  const onSetContentList = () => {
    setContentList(deleteOutlineList);
  };
  const operation = (type?: any, cont?: any, data?: any) => {
    // console.log(type, cont, data);
    const style: any = {
      position: 'absolute',
      top: '0',
      [type]: `${cont ? '-1.06rem' : '-0.56rem'}`,
      height: '0.75rem',
      lineHeight: '0.75rem',
      textAlign: 'center',
      display: 'none',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '0.41rem',
    };
    return (
      <div style={style} id={data.dateTime}>
        {type === 'right' && cont && (
          <div
            style={{
              color: '#4f83ff',
              width: '0.48rem',
            }}
            onClick={() => onEditSOutline(data.dateTime, data)}
          >
            <EditSOutline />
          </div>
        )}
        <div
          style={{
            color: 'red',
            width: '0.5rem',
          }}
          onClick={() => onDeleteOutline(data.dateTime, data)}
        >
          <DeleteOutline />
        </div>
        {type === 'left' && cont && (
          <div
            style={{
              color: '#4f83ff',
              width: '0.48rem',
            }}
            onClick={() => onEditSOutline(data.dateTime, data)}
          >
            <EditSOutline />
          </div>
        )}
      </div>
    );
  };
  const operationChange = () => {
    if (operationId) {
      let dom: any = document.getElementById(operationId);
      if (dom) {
        dom.style.display = 'none';
      }
    }
  };
  const onOperation = useCallback((node: any, data?: any) => {
    if (data.fromName !== myLocName) {
      return;
    }
    let times = new Date().getTime();
    const ondown = () => {
      if (times - data.dateTime >= 1000 * 60 * 10000000) {
        Toast.show(`超过10分钟不可修改或删除！`);
        return false;
      } else {
        return true;
      }
    };

    if (node) {
      let CTimeout: any = null,
        startTime: any = null,
        stopTime: any = null,
        timeouts = false;
      let id = (node.id || '').replace('#', '');
      const onChange = () => {
        if (operationId !== id) {
          operationChange();
        }
        operationId = id;
        timeouts = false;
        startTime = new Date().getTime();
        CTimeout = setTimeout(() => {
          let dom: any = document.getElementById(id);
          if (dom && !timeouts && ondown()) {
            // console.log(id, dom);
            dom.style.display = 'flex';
          }
          clearTimeout(CTimeout);
        }, 500);
      };
      const stopChange = () => {
        stopTime = new Date().getTime();
        if (stopTime - startTime < 500 && !timeouts) {
          timeouts = true;
        } else {
          timeouts = false;
        }
      };
      if (window.modelName === 'pc') {
        node.onmousedown = (e: any) => {
          //当鼠标按下
          onChange();
        };
        node.onmouseup = (e: any) => {
          stopChange();
        };
      } else {
        node.ontouchstart = (e: any) => {
          //当鼠标按下
          onChange();
        };
        node.ontouchend = (e: any) => {
          stopChange();
        };
      }
    }
  }, []);

  const My = ({ type, cont, file, data, domKeyId }: any) => {
    // console.log(type, cont, file, data, domKeyId);
    domKeys += 1;
    if (domKeyId) {
      domKeys = domKeyId;
    }
    const style: any = {
      position: 'absolute',
      top: '0.1rem',
      right: '0',
      width: '14%',
      overflow: 'hidden',
    };

    const style1: any = {
      width: '0.78rem',
      height: '0.78rem',
      boxSizing: 'border-box',
      float: 'right',
      overflow: 'hidden',
      borderRadius: '0.08rem',
    };

    const style2: any = {
      background: '#EAEAEA',
      float: 'right',
      borderRadius: '0.08rem',
      width: '100%',
    };

    const imgStyle: any = { borderRadius: '0.08rem' };
    if (file?.length) {
      let imgList = file?.length.split('_');
      if (imgList[0] === 'width') {
        imgStyle.width = `130px`;
        imgList[1] &&
          (imgStyle.height = `${130 / (imgList[1] / imgList[2])}px`);
      } else {
        imgList[1] && (imgStyle.width = `${190 * (imgList[1] / imgList[2])}px`);
        imgStyle.height = '190px';
      }
    }
    const newStyleLength = styleLength(file);

    return (
      <div
        key={domKeys}
        className="fankiu-you"
        style={{
          width: '92%',
          margin: '0 auto',
          lineHeight: '0.4rem',
          overflow: 'hidden',
          padding: '0.1rem 0',
          position: 'relative',
        }}
        id={`@${data?.dateTime}`}
      >
        <div
          className="fankiu-text clearbox"
          style={{
            width: '72%',
            margin: '0 auto',
            position: 'relative',
          }}
          id={`#${data?.dateTime}`}
          ref={(e: any) => onOperation(e, data)}
        >
          <span
            style={{
              display: 'inline-block',
              background: `${file ? '' : '#ff7a59'}`,
              color: '#fff',
              borderRadius: '0.08rem',
              fontSize: '0.32rem',
              border: '0.01rem solid #e7e6e9',
              wordWrap: 'break-word',
              lineHeight: `${file ? '0' : '0.4rem'}`,
              maxWidth: '100%',
              float: 'right',
              position: 'relative',
            }}
          >
            {operation('left', cont, data)}
            {file && !file?.file ? (
              <span
                onLoad={imgsOnLoad}
                style={{
                  color: 'rgba(255, 122, 89)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100px',
                  height: '100px',
                  fontSize: '0.41rem',
                  background: 'url(/images/tuPianJiaZaiZhong.png)',
                  backgroundSize: '100% 100%',
                  borderRadius: '0.08rem',
                }}
              >
                <>
                  <Loading color="currentColor" />
                  <span
                    id={file.index}
                    style={{
                      fontSize: '13px',
                      lineHeight: '12px',
                    }}
                  >
                    发送中...
                  </span>
                </>
              </span>
            ) : file?.file ? (
              <span
                onLoad={imgsOnLoad}
                style={{
                  color: 'rgba(255, 122, 89)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '0.08rem',
                  width: `${
                    file?.fileType === 'video'
                      ? `${file?.styleLength ? newStyleLength.width : '100px'}`
                      : file?.fileType !== 'image'
                      ? 'auto'
                      : '100%'
                  }`,
                  height: `${
                    file?.fileType === 'video'
                      ? `${file?.styleLength ? newStyleLength.height : '100px'}`
                      : 'auto'
                  }`,
                  minHeight: `${file?.fileType !== 'image' && '42px'}`,
                  fontSize: '0.41rem',
                  background: `${
                    file?.fileType === 'image'
                      ? 'url(/images/tuPianJiaZaiZhong.png)'
                      : file?.fileType === 'video'
                      ? `url(${file?.apathZoom})`
                      : '#FFF'
                  }`,
                  backgroundSize: '100% 100%',
                }}
              >
                {file?.fileType === 'video' ? (
                  <div
                    style={{
                      padding: '6px',
                      borderRadius: '100%',
                      border: '0.03rem solid rgb(255, 122, 89)',
                    }}
                    onClick={() => onPlay(file.url)}
                  >
                    <PlayOutline />
                  </div>
                ) : file?.fileType === 'image' ? (
                  <img
                    onLoad={imgsOnLoad}
                    style={imgStyle}
                    src={file.apathZoom}
                    alt=""
                    onClick={() => setVisibles(file.url)}
                  />
                ) : (
                  <>
                    {file?.voice ? (
                      <div
                        style={{
                          padding: '0.16rem 0.2rem',
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        onClick={(e: any) => {
                          // console.log(file);
                          setAudioUrl(file.url);
                          onPause(file.url);
                        }}
                      >
                        <span
                          style={{
                            padding: '0 0.2rem 0 0.1rem',
                            fontSize: '0.32rem',
                            verticalAlign: '0.125em',
                          }}
                        >
                          {`${file.voice.number}"`}
                        </span>
                        <SoundOutline
                          id={`${file.url}`}
                          style={{
                            transform: 'rotate(180deg)',
                          }}
                        />
                        <span
                          id={`${file.url}Play`}
                          style={{
                            display: 'none',
                            width: '0.35rem',
                            height: '0.31rem',
                            background: 'url(/images/voice.gif)',
                            backgroundSize: '100% 100%',
                            margin: '0 0.04rem 0 0.02rem',
                          }}
                        ></span>
                      </div>
                    ) : (
                      <>
                        <div
                          style={{
                            fontSize: '0.32rem',
                            lineHeight: '0.4rem',
                            padding: '0.16rem 0.2rem',
                            flex: '1',
                            width: '3.31rem',
                          }}
                          onClick={() =>
                            fileDownload({
                              e: file.url,
                              url: file.url.split('/')[
                                file.url.split('/').length - 1
                              ],
                            })
                          }
                        >
                          {file.url.split('/')[file.url.split('/').length - 1]}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            width: '60px',
                            overflowWrap: 'break-word',
                            padding: '10px 8px 10px 0',
                          }}
                        >
                          <FileOutline
                            style={{
                              width: '30px',
                              height: '30px',
                            }}
                          />
                          <span
                            style={{
                              fontSize: '13px',
                              lineHeight: '14px',
                              display: 'inline-block',
                              width: '100%',
                              textAlign: 'center',
                            }}
                          >
                            {file.size}
                          </span>
                        </div>
                      </>
                    )}
                  </>
                )}
              </span>
            ) : (
              <div
                style={{ padding: '0.16rem 0.2rem' }}
                id={`%${data?.dateTime}`}
              >
                {onIsUrl({ cont, data })}
              </div>
            )}
          </span>
          <div
            style={{
              backgroundSize: '100% 100%',
              position: 'absolute',
              width: '0.16rem',
              height: '0.22rem',
              top: '0.26rem',
              right: '-0.13rem',
            }}
          ></div>
        </div>
        <div className="fankiu-img" style={style}>
          <div style={style1}>
            <img src={Myimg} alt="" style={style2} />
          </div>
        </div>
      </div>
    );
  };

  const You = ({
    yes,
    type,
    cont,
    DianJi,
    myIconName,
    imgs,
    file,
    data,
  }: any) => {
    let newYouimg = Youimg;
    if (imgs) {
      newYouimg = imgs;
    }
    // console.log(file);
    domKeys += 1;
    const style: any = {
      width: '92%', //样式4
      margin: '0 auto',
      lineHeight: '0.4rem',
      padding: '0.1rem 0',
      position: 'relative',
      overflow: 'hidden',
    };

    const style3: any = {
      width: '72%',
      position: 'relative',
      margin: '0 auto',
    };

    const style4: any = {
      display: 'inline-block',
      background: `${file ? '' : '#fff'}`,
      lineHeight: `${file ? '0' : '0.4rem'}`,
      borderRadius: '0.08rem',
      fontSize: '0.32rem',
      border: '0.01rem solid #e7e6e9',
      wordWrap: 'break-word',
      maxWidth: '100%',
      position: 'relative',
    };

    const style1: any = {
      position: 'absolute',
      top: '0.1rem',
      left: '0',
      width: '14%',
      height: '0.76rem',
    };

    const style2: any = {
      width: '0.78rem',
      height: '0.78rem',
      boxSizing: 'border-box',
      overflow: 'hidden',
      borderRadius: '0.08rem',
    };

    const onImaF = () => {
      //				对方个人资料
      // console.log(yes, DianJi);
      // if (yes) {
      if (DianJi) {
        // console.log(DianJi);
        const imglist = JSON.parse(localStorage.getItem('imgIdLoc') || '[]');
        for (var i = 0; i < imglist.length; i++) {
          if (imglist[i].name === DianJi) {
            localStorage.setItem(
              'headPortrait_groupChat',
              imglist[i].classIcon
            );
            newYouimg = imglist[i].classIcon;
            localStorage.setItem('toChatName_groupChat', DianJi);
            break;
          }
        }
      }
      localStorage.setItem('personalInformation', '1');
      localStorage.setItem('fromChatRoom', '1');
      // history.push('/personalInformation?personal=1');
      history.push(
        `/personalInformation?personal=1&my-${new Date().getTime()}=${JSON.stringify(
          {
            name:
              DianJi && DianJi !== 1
                ? DianJi
                : localStorage.getItem('toChatName'),
          }
        )}`
      );
      // }
      // history.push('/personalInformation');
    };

    const style6: any = {};
    style6.background = '#EAEAEA';
    style6.borderRadius = '0.08rem';
    style6.float = 'left';
    style6.width = '100%';

    const style5: any = {};
    style5.backgroundSize = '100% 100%';
    style5.position = 'absolute';
    style5.width = '0.16rem';
    style5.height = '0.22rem';
    style5.top = '0.26rem';
    style5.left = '-0.13rem';
    style5.zIndex = '100';

    const style7: any = {};
    style7.fontSize = '0.26rem';
    style7.color = '#07111B';
    style7.lineHeight = '0.2rem';
    style7.padding = '0 0 0.1rem 0.1rem';
    style7.color = 'rgb(180, 180, 180)';

    const imgStyle: any = { borderRadius: '0.08rem' };
    if (file?.length) {
      let imgList = file?.length.split('_');
      if (imgList[0] === 'width') {
        imgStyle.width = `130px`;
        imgList[1] &&
          (imgStyle.height = `${130 / (imgList[1] / imgList[2])}px`);
      } else {
        imgList[1] && (imgStyle.width = `${190 * (imgList[1] / imgList[2])}px`);
        imgStyle.height = '190px';
      }
    }
    const newStyleLength = styleLength(file);
    // console.log(newStyleLength);
    let newCont = cont;
    if (file) {
      newCont = (
        <span>
          {file && !file?.file ? (
            <span
              style={{
                color: 'rgba(255, 122, 89)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'url(/images/tuPianJiaZaiZhong.png)',
                backgroundSize: 'cover',
                width: '100px',
                height: '100px',
                fontSize: '0.41rem',
              }}
            >
              <Loading color="currentColor" />
            </span>
          ) : file?.file ? (
            <span
              onLoad={imgsOnLoad}
              style={{
                color: 'rgba(255, 122, 89)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0.08rem',
                width: `${
                  file?.fileType === 'video'
                    ? `${file?.styleLength ? newStyleLength.width : '100px'}`
                    : file?.fileType !== 'image'
                    ? 'auto'
                    : '100%'
                }`,
                height: `${
                  file?.fileType === 'video'
                    ? `${file?.styleLength ? newStyleLength.height : '100px'}`
                    : 'auto'
                }`,
                minHeight: `${file?.fileType !== 'image' && '42px'}`,
                fontSize: '0.41rem',
                background: `${
                  file?.fileType === 'image'
                    ? 'url(/images/tuPianJiaZaiZhong.png)'
                    : file?.fileType === 'video'
                    ? `url(${file?.apathZoom})`
                    : '#FFF'
                }`,
                backgroundSize: '100% 100%',
              }}
            >
              {file?.fileType === 'video' ? (
                <div
                  style={{
                    padding: '6px',
                    borderRadius: '100%',
                    border: '0.03rem solid rgb(255, 122, 89)',
                  }}
                  onClick={() => onPlay(file.url)}
                >
                  <PlayOutline />
                </div>
              ) : file?.fileType === 'image' ? (
                <img
                  onLoad={imgsOnLoad}
                  style={imgStyle}
                  src={file.apathZoom}
                  alt=""
                  onClick={
                    // () => setMulti(file.url)
                    // () => {
                    //   console.log(imagesList);
                    //   ImageViewer.Multi.show({ images: file.url });
                    // }
                    () => setVisibles(file.url)
                  }
                />
              ) : (
                <>
                  {file?.voice ? (
                    <div
                      style={{
                        padding: '0.16rem 0.2rem',
                        position: 'relative',
                      }}
                      onClick={(e: any) => {
                        setAudioUrl(file.url);
                        onPause(file.url);
                        if (file.voice.voice) {
                          onRead(file.url, file.index);
                        }
                      }}
                    >
                      <SoundOutline id={`${file.url}`} />
                      <span
                        id={`${file.url}Play`}
                        style={{
                          transform: 'rotate(180deg)',
                          display: 'none',
                          width: '0.35rem',
                          height: '0.31rem',
                          background: 'url(/images/voice.gif)',
                          backgroundSize: '100% 100%',
                          margin: '0 0.02rem 0 0.04rem',
                        }}
                      ></span>
                      <span
                        style={{
                          padding: '0 0.1rem 0 0.2rem',
                          fontSize: '0.32rem',
                          verticalAlign: '0.125em',
                        }}
                      >
                        {`${file.voice.number}"`}
                      </span>
                      {file.voice.voice && (
                        <div
                          id={file.index}
                          style={{
                            position: 'absolute',
                            top: '0',
                            bottom: '0',
                            right: '-0.5rem',
                            margin: 'auto',
                            width: '0.13rem',
                            height: '0.13rem',
                            background: '#ff7a59',
                            borderRadius: '0.13rem',
                          }}
                        >
                          {/* <Badge color="#ff7a59" content={Badge.dot}></Badge> */}
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          fontSize: '0.32rem',
                          lineHeight: '0.4rem',
                          padding: '0.16rem 0.2rem',
                          flex: '1',
                          width: '3.31rem',
                        }}
                        onClick={() =>
                          fileDownload({
                            e: file.url,
                            url: file.url.split('/')[
                              file.url.split('/').length - 1
                            ],
                          })
                        }
                      >
                        {file.url.split('/')[file.url.split('/').length - 1]}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          width: '60px',
                          overflowWrap: 'break-word',
                          padding: '10px 8px 10px 0',
                        }}
                      >
                        <FileOutline
                          style={{
                            width: '30px',
                            height: '30px',
                          }}
                        />
                        <span
                          style={{
                            fontSize: '13px',
                            lineHeight: '14px',
                            display: 'inline-block',
                            width: '100%',
                            textAlign: 'center',
                          }}
                        >
                          {file.size}
                        </span>
                      </div>
                    </>
                  )}
                </>
              )}
            </span>
          ) : (
            newCont
          )}
        </span>
      );
    } else {
      newCont = (
        <div style={{ padding: '0.16rem 0.2rem' }} id={`%${data?.dateTime}`}>
          {onIsUrl({ cont, type: '#1b24ff', data })}
        </div>
      );
    }

    return (
      <div
        key={domKeys}
        className="fankiu-my"
        style={style}
        id={`@${data?.dateTime}`}
      >
        <div className="fankiu-img" style={style1}>
          <div style={style2} onClick={onImaF}>
            <img src={newYouimg} alt="" style={style6} />
          </div>
        </div>
        <div
          className="fankiu-text"
          style={style3}
          id={`#${data?.dateTime}`}
          ref={(e: any) => onOperation(e, data)}
        >
          {type === 'yes' && DianJi ? (
            <>
              <div style={style7}>{myIconName}</div>
              <span style={style4}>
                {newCont}
                {operation('right', cont, data)}
              </span>
            </>
          ) : type === 'yes' ? (
            <>
              <span style={style4}>
                {newCont}
                {operation('right', cont, data)}
              </span>
              <div style={style5}></div>
            </>
          ) : (
            <span style={style4}>{HuanquSenqing(newCont, DianJi, type)}</span>
          )}
        </div>
      </div>
    );
  };

  const getList = (types: any) => {
    // if( toChatName !== myLocName && toChatNameLength===0){
    //   setGetListL([])
    // }
    // if (getListL && getListL.length > 0) {
    //   dataCollation(getListL, types);
    // }
    if (page === 1) {
      setImagesList([]);
      imagelistId = {};
      imagelistIndex = 0;
    }
    if ((Loadings || total) && scrollSize !== 0) {
      if (total) {
        setLoadings(false);
      }
      return;
    }
    requestMessage({
      type: chatType,
      page: page,
      pageSize: pageSize,
      friendName: localStorage.getItem('toChatName'),
      myName: myLocName,
      nickName: nickNameTop,
      groupName,
    }).then((data) => {
      // console.log(data);
      setDataListL(false);
      if (data.code && data.code === 200 && data.body.length > 0) {
        if (data.total) {
          setTotal(true);
        }
        setLoadings(false);
        dataCollation(data.body, types);
        // setGetListL(data.body);
        // localStorage.setItem('getListL', JSON.stringify(data.body));
      } else {
        setShuruShow(true);
      }
      // page += 1;
    });
  };

  const dataCollation = (data: any, types: any) => {
    let domList: any = [];
    // const lengths = data.body.length;
    let yes = '';
    let setShuruShowL = false;
    dateTimes = data[data.length - 1].dateTime;
    // console.log("111", data);
    data.map((item: any) => {
      if (!data[data.length - 1].friend) {
        yes = 'yes';
      }
      if (item.fromName === myLocName) {
        if (item.type === 'chat') {
          domList.push(
            tousuoGo(moment(item.dateTime), item.dateTimes, item.dateTime)
          );
          if (item.text.friends === 'yes') {
            setShuruShowL = true;
            domList.push(
              TishiNeirong('你已通过对方的好友验证请求，现在可以开始聊天啦😄')
            );
          } else if (item.text.friend === 'no') {
            domList.push(
              TishiNeirong('您向对方发送了好友验证请求，请耐心等待！')
            );
          } else if (item.text.friends === 'no') {
            domList.push(TishiNeirong('您拒绝了对方的好友验证请求！'));
          } else {
            domList.push(My({ cont: item.text, file: item.file, data: item }));
            setShuruShowL = true;
          }
        } else if (chatType === 'groupChat') {
          domList.push(
            tousuoGo(moment(item.dateTime), item.dateTimes, item.dateTime)
          );
          if (item.text_first) {
            domList.push(TishiNeirong(item.text));
          } else {
            domList.push(My({ cont: item.text, file: item.file, data: item }));
          }
          setShuruShowL = true;
        }
      } else if (
        item.fromName === myLocName &&
        item.toName !== '' &&
        item.text.toName !== myLocName
      ) {
        // console.log("222", item.text);
        domList.push(My({ cont: item.text, file: item.file, data: item }));
        setShuruShowL = true;
      } else if (item.toName === '' && item.fromName === myLocName) {
      } else if (item.toName === '' && item.fromName !== myLocName) {
        //
      } else if (item.toName === myLocName) {
        // console.log('333',data.body[i]);
        domList.push(
          tousuoGo(moment(item.dateTime), item.dateTimes, item.dateTime)
        );
        if (item.text.friend === 'no') {
          if (item.friend === 'yes') {
            domList.push(
              You({
                yes: yes,
                type: '',
                cont: '😄来自' + item.fromName + '的好友验证请求，是否同意！',
                DianJi: 1,
                data: item,
              })
            );
          } else {
            domList.push(
              You({
                yes: yes,
                type: '',
                cont: '😄来自' + item.fromName + '的好友验证请求，是否同意！',
                data: item,
              })
            );
          }
        } else {
          if (item.text.friends === 'yes') {
            setShuruShowL = true;
            domList.push(
              You({
                yes: yes,
                type: 'yes',
                cont: item.text.text,
                DianJi: false,
                myIconName: false,
                imgs: false,
                file: item.file,
                data: item,
              })
            );
          } else if (item.text.friends === 'no') {
            domList.push(
              You({
                yes: yes,
                type: 'no',
                cont: '🙁对方拒绝了您的好友验证请求！是否再次添加好友...',
                DianJi: item.friend,
                data: item,
              })
            );
          } else {
            domList.push(
              You({
                yes: yes,
                type: 'yes',
                cont: item.text,
                DianJi: false,
                myIconName: false,
                imgs: false,
                file: item.file,
                data: item,
              })
            );
            setShuruShowL = true;
          }
        }
      } else if (item.type === 'groupChat') {
        if (item.text_first) {
          domList.push(
            tousuoGo(moment(item.dateTime), item.dateTimes, item.dateTime)
          );
          domList.push(TishiNeirong(item.text));
        } else {
          const imglist = JSON.parse(localStorage.getItem('imgIdLoc') || '[]');
          let imgs = '';
          for (var i = 0; i < imglist.length; i++) {
            if (imglist[i].name === item.fromName) {
              imgs = imglist[i].classIcon;
              break;
            }
          }
          if (!imgs) return item;
          domList.push(
            tousuoGo(moment(item.dateTime), item.dateTimes, item.dateTime)
          );
          domList.push(
            You({
              yes: yes,
              type: 'yes',
              cont: item.text,
              DianJi: item.fromName,
              myIconName: item.myIconName,
              imgs: imgs,
              file: item.file,
              data: item,
            })
          );
        }
        setShuruShowL = true;
      }
      if (item.file?.fileType === 'image') {
        setImagesList((imagesList: any) => [...imagesList, ...[item.file.url]]);
        imagelistId[item.file.url] = imagelistIndex;
        imagelistIndex++;
      }
      return item;
    });
    if (types) {
      // dom1.scrollTop(0);
    } else {
    }
    setShuruShow(setShuruShowL);
    if (page === 1) {
      setContentList(domList);
    } else {
      setContentList([...domList, ...contentList]);
    }
    page += 1;
    // setContentList(domList);
  };
  const onTimes = () => {
    const times = setTimeout(() => {
      scrollHeights(); //滚动底部
      clearTimeout(times);
    }, 210);
  };

  const goBackS = () => {
    if (localStorage.getItem('personalInformation')) {
      localStorage.removeItem('type');
      localStorage.removeItem('imgIdLoc');
      history.push('/');
    } else {
      localStorage.removeItem('type');
      localStorage.removeItem('imgIdLoc');
      // history.goBack();
      history.push('/');
    }
  };
  const voices = () => {
    Flength += 1;
    scrollSize = 0;
    setVoiceSotten(!voiceSotten);
    setExpressionShow(false);
    ontimeout();
  };
  const expressions = () => {
    scrollSize = 0;
    setVoiceSotten(false);
    if (texts && expressionShow) {
      moveCursor();
    }
    setExpressionShow(!expressionShow);
    setAddAnothers(false);
    onTimes();
    ontimeout();
  };
  const ontimeout = () => {
    const timeout = setTimeout(() => {
      scrollHeights(); //滚动底部
      clearTimeout(timeout);
    }, 130);
  };
  const moveCursor = () => {
    if (!texts.current) {
      return;
    }
    texts.current?.focus();
    // 光标移动到最后
    let range = document.createRange();
    range.selectNodeContents(texts.current);
    range.collapse(false);
    let sel: any = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    onTimes();
  };

  const expressionD = () => {
    var textList = [];
    var spans = [];
    for (var i = 1; i < expressionList.length; i++) {
      spans.push(
        <span onClick={(e) => addEmoticons(e)} key={i}>
          {expressionList[i]}
        </span>
      );
      if (i % 8 === 0 || i === expressionList.length - 1) {
        textList.push(
          <div key={i} className="expression_box">
            {spans}
          </div>
        );
        spans = [];
      }
    }
    return textList;
  };
  const contenteditable = (e: any) => {
    // console.log(e.target.innerText);
    setInputContent(e.target.innerText);
  };
  const addEmoticons = (e: any) => {
    texts.current.innerText += e.target.innerText;
    setInputContent(texts.current.innerText);
  };
  const onchange = () => {
    scrollSize = 0;
    setExpressionShow(false);
    setAddAnothers(false);
    ontimeout();
    // moveCursor();
  };
  const tabs = () => {
    setTabShow(!tabShow);
  };
  const tabsHid = () => {
    if (tabShow) {
      setTabShow(false);
    }
  };

  const send = async (text?: any) => {
    // console.log(inputContent, text);
    //发送消息
    var timeHour = new Date().getTime();
    var dateYes = 'no';
    const chatNames: any = localStorage.getItem('toChatName');
    if (timeHour - dateTimes > 100000) {
      // console.log(timeHour - dateTimes);
      dateYes = 'yes';
    }
    const Trim = (str: string) => {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    };

    if (text || Trim(inputContent) !== '') {
      // console.log(inputContent, text);
      if (chatType === 'chat') {
        await window.socket.emit('clientmessage', {
          fromName: myLocName,
          // toName: $('#texts0')[0].value,
          toName: chatNames,
          text: text ? '' : inputContent,
          fromTo: (chatNames * 1 + myLocName * 1).toString(),
          dateTimes: dateYes,
          Own: chatNames === myLocName ? true : false,
          file: text,
        });
      } else {
        //群聊
        let toChatNames = JSON.parse(chatNames),
          fromChat: any = null;
        for (var i = 0; i < toChatNames.length; i++) {
          fromChat += toChatNames[i].name * 1;
        }
        fromChat = nickNameTop + fromChat.toString();
        await window.socket.emit('clientmessage', {
          fromName: myLocName,
          // toName: $('#texts0')[0].value,
          toName: JSON.parse(chatNames),
          text: text ? '' : inputContent,
          fromTo: fromChat,
          nickName: nickNameTop,
          dateTimes: dateYes,
          myIconName: locMyName,
          groupName,
          imgId: [],
          file: text,
        });
      }
    }
    if (texts.current) {
      texts.current.innerText = '';
    }
    setInputContent('');
    moveCursor();
    if (!text && !expressionShow) {
      texts.current?.focus();
    } else {
      texts.current?.blur();
    }
    return false;
  };

  const addsAnother = () => {
    scrollSize = 0;
    setAddAnothers(!addAnothers);
    setExpressionShow(false);
    if (addAnothers) {
      moveCursor();
    }
    onTimes();
    ontimeout();
  };

  const options = (type: number) => {
    // console.log("123", type);
    if (type === 1) {
      history.push('/allMembers');
      return;
    }
    if (type === 2) {
      history.push('/addBuildingGroup');
      return;
    }
    if (type === 3) {
      for (var i = 0; i < imgIdLoc.length; i++) {
        if (imgIdLoc[i].name !== myLocName) {
          textName += imgIdLoc[i].name * 1;
        }
        textName_1 += imgIdLoc[i].name * 1;
      }
      let list: any = {
        nickName: [locMyName],
        name: [{ name: myLocName, newsNumber: 0 }],
        imgId: [imgId],
        text: '【' + locMyName + '】已退出本群',
        buildingGroupName: nickNameTop,
        moveName: 'yes',
        textName: textName.toString(),
      };
      list = JSON.stringify(list);
      // console.log(list, nickNameTop + textName, nickNameTop + textName_1);
      //退出本群
      addBuildingGroup({ data: list }).then((data) => {
        // console.log(data);
        if (data.code === 200) {
          Toast.show({
            icon: 'success',
            content: data.msg,
          });
          window.socket.emit('clientmessage', {
            fromName: myLocName,
            toName: [{ name: myLocName, newsNumber: 0 }],
            text_first: 'yes',
            text: '【' + locMyName + '】已退出本群',
            nickName: nickNameTop,
            textName: nickNameTop + textName,
            textName_1: nickNameTop + textNameOld,
          });
          history.push('/');
        }
      });
      return;
    }
    if (type === 4) {
      setTanCengShow(true);
      return;
    }
    if (type === 5) {
      //移除本群;
      buildingGroupMove({ nickName: nickNameTop }).then((data) => {
        // console.log(data);
        if (data.code === 200) {
          Toast.show({
            icon: 'success',
            content: data.msg,
          });
          window.socket.emit('clientmessage', {
            fromName: myLocName,
            toName: [],
            text_last: 'yes',
            text: nickNameTop + '已将本群移除...',
            type: 'groupChat',
          });
          history.push('/');
        }
      });
      return;
    }
  };

  const Sure = () => {
    if (!checkListvalue[0]) {
      Toast.show({
        content: '请选择要转让者！',
        position: 'top',
      });
      return;
    }
    // console.log("确定");
    for (var i = 0; i < imgIdLoc.length; i++) {
      if (imgIdLoc[i].name !== myLocName) {
        textName += imgIdLoc[i].name * 1;
      }
      if (checkListvalue[0] === imgIdLoc[i].name) {
        nickNames = imgIdLoc[i].nickName;
      }
      // textName_1 += imgIdLoc[i].name * 1;
    }
    let list: any = {
      nickName: [locMyName],
      name: [{ name: myLocName, newsNumber: 0 }],
      imgId: [imgId],
      text:
        '【' +
        locMyName +
        '】已退出将本群转让给' +
        '【' +
        nickNames +
        '】为本群群主',
      buildingGroupName: nickNameTop,
      moveName: 'yes',
      Transfer: checkListvalue[0],
      textName: textName.toString(),
    };
    list = JSON.stringify(list);
    // console.log(list, textName, textName_1, nickNameTop);
    //转让本群
    addBuildingGroup({ data: list }).then((data) => {
      // console.log(data);
      if (data.code === 200) {
        Toast.show({
          icon: 'success',
          content: data.msg,
        });
        window.socket.emit('clientmessage', {
          fromName: myLocName,
          toName: [{ name: myLocName, newsNumber: 0 }],
          text_first: 'yes',
          text:
            '【' +
            locMyName +
            '】已退出将本群转让给' +
            '【' +
            nickNames +
            '】为本群群主',
          nickName: nickNameTop,
          textName: nickNameTop + textName,
          textName_1: nickNameTop + textNameOld,
          Transfer: checkListvalue[0],
        });
        history.push('/');
      }
    });
  };
  const Cancel = () => {
    setTanCengShow(false);
  };
  const onChange = (e: any) => {
    // console.log(e);
    setCheckListvalue(e);
  };

  const setFileList = async (list: any, voice?: any) => {
    // console.log(list);
    if (!list[0]) return;
    setAddAnothers(false);
    !voice && texts.current?.blur();
    const dateTime: any = new Date().getTime();
    let itemId = 1;
    let overload = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].size < 31000000) {
        overload++;
      }
    }
    for (let i = 0; i < list.length; i++) {
      const newList = list[i];
      if (i > list.length - 1) return;
      if (newList.size === 0) {
        Toast.show({
          icon: 'fail',
          content: '此文件为空文件！',
        });
        return;
      } else if (newList.size >= 190000000000) {
        Toast.show({
          icon: 'fail',
          content: '暂不支持190G以上文件发送！',
        });
        return;
      }
      const fileType = newList.type.split('/')[0];
      let nameList = newList.name?.split('.') || [];
      let type: any = nameList[nameList.length - 1] || 'mp3';
      const listName = newList.name?.split(`.${type}`) || '';

      nameList = listName ? listName : [new Date().getTime(), 'mp3'];
      // console.log(type, fileType, nameList, listName);
      let clientmessage = {};
      if (chatType === 'chat') {
        clientmessage = {
          fromName: myLocName,
          toName: chatNames,
          type: chatType,
        };
      } else {
        //群聊
        let toChatNames = JSON.parse(chatNames),
          fromChat: any = null;
        for (let i = 0; i < toChatNames.length; i++) {
          fromChat += toChatNames[i].name * 1;
        }
        fromChat = nickNameTop + fromChat.toString();
        clientmessage = {
          groupName: groupName,
          type: chatType,
        };
      }
      await send({
        file: false,
        fileName: '',
        fileType: fileType,
        fileClass: type,
        size: '',
        index: dateTime + i,
        url: '',
        voice: voice ? voice : null,
      });
      if (
        fileType === 'application' ||
        fileType === 'text' ||
        fileType === 'video' ||
        fileType === 'audio' ||
        fileType === ''
      ) {
        if (newList.size >= 31000000) {
          // 超过31M文件走流，存入node接口根目录；
          let id = 0;
          let size = newList.size, //总大小shardSize = 2 * 1024 * 1024,
            shardSize = 10 * 1024 * 1024, //以10MB为一个分片,每个分片的大小
            shardCount = Math.ceil(size / shardSize); //总片数
          // eslint-disable-next-line no-loop-func
          let toFileUpload: any = async () => {
            var start = id * shardSize;
            var end = start + shardSize;
            let packet = newList.slice(start, end); //将文件进行切片
            let typeF = '';
            if (id < shardCount) {
              typeF = '分片上传';
            } else {
              typeF = type;
            }
            // console.log(id, shardCount);
            const datas: any = await FileUpload(
              packet,
              id + 1,
              shardCount,
              typeF,
              fileType,
              clientmessage,
              nameList,
              type,
              newList,
              dateTime + i
            );
            if (datas.code === 200) {
              id += 1;
              const dom: any = document.getElementById(`${dateTime + i}`);
              // console.log(datas, id, shardCount);
              if (dom) {
                let complete = (((id / shardCount) * 100) | 0) + '%';
                dom.innerHTML = complete;
              }
              if (id < shardCount - 1) {
                toFileUpload();
              }

              if (id === shardCount - 1) {
                console.log('分片上传最后');
                start = id * shardSize;
                end = start + shardSize;
                id += 1;
                let packet = newList.slice(start, end); //将文件进行切片
                const datas: any = await FileUpload(
                  packet,
                  dateTime + i,
                  nameList,
                  type,
                  fileType,
                  clientmessage,
                  '分片上传最后',
                  newList.size,
                  id,
                  shardCount
                );
                if (datas.code === 200) {
                  page = 1;
                  scrollSize = 0;
                  imagelistIndex = 0;
                  if (itemId >= list.length) {
                    setDeleteFl(!deleteFl);
                    // toFileUpload = null;
                    smallFile = 0;
                  }
                  itemId++;
                  window.socket.emit('clientmessage', {
                    //只作为文件上传完成使用
                    uploadCompleted: true,
                    toName: chatNames,
                  });
                  const dom: any = document.getElementById(`${dateTime + i}`);
                  if (dom) {
                    let complete = (((id / shardCount) * 100) | 0) + '%';
                    dom.innerHTML = complete;
                  }
                }
              }
              // console.log(datas);
            }
          };
          toFileUpload();
        } else {
          upload(dateTime, i, itemId, list.length, overload);
          const datas: any = await FileUpload(
            newList,
            dateTime + i,
            nameList,
            type,
            fileType,
            clientmessage,
            1,
            '不分片'
          );
          if (datas.code === 200) {
            page = 1;
            imagelistIndex = 0;
            scrollSize = 0;
            itemId++;
            window.socket.emit('clientmessage', {
              //只作为图片上传完成使用
              uploadCompleted: true,
              toName: chatNames,
            });
            //   //只作为文件上传完成使用
          }
        }
      } else {
        upload(dateTime, i, itemId, list.length, overload);
        const datas: any = await UploadImg(
          newList,
          dateTime + i,
          type,
          clientmessage,
          fileType
        );
        // console.log(datas);
        if (datas.code === 200) {
          page = 1;
          imagelistIndex = 0;
          scrollSize = 0;
          itemId++;
          window.socket.emit('clientmessage', {
            //只作为图片上传完成使用
            uploadCompleted: true,
            toName: chatNames,
          });
          //   //只作为图片上传完成使用
        }
      }
    }
  };
  const upload = (
    dateTime: any,
    i: number,
    itemId: number,
    length: number,
    overload: number
  ) => {
    onUploadProgress.onUploadProgress = (progressEvent: any) => {
      let complete =
        (((progressEvent.loaded / progressEvent.total) * 100) | 0) + '%';
      // console.log('上传=====>>>>', complete);
      if (complete === '100%') {
        complete = '99%';
        smallFile++;
        if (dateTime && smallFile < overload && overload >= 1) {
          // setDeleteFl(!deleteFl);
          page = 1;
          imagelistIndex = 0;
          scrollSize = 0;
        }
        if (itemId >= length) {
          page = 1;
          imagelistIndex = 0;
          scrollSize = 0;
          smallFile = 0;
          setDeleteFl(!deleteFl);
          // window.socket.emit('clientmessage', {
          //   //只作为图片上传完成使用
          //   uploadCompleted: true,
          // });
        }
      }
      const dom: any = document.getElementById(`${dateTime + i}`);
      if (dom && dom.innerText !== '99%') {
        dom.innerHTML = complete;
      }
      // setProgress(complete);
    };
  };

  const onScroll = (e: any) => {
    // console.log(
    //   e.target.clientHeight,
    //   e.target.scrollTop,
    //   e.target.scrollHeight
    // );
    operationChange();
    if (e.target.scrollTop === 0) {
      scrollSize = e.target.scrollHeight;
      setLoadings(true);
      getList('');
    } else {
      setLoadings(false);
    }
  };

  const recOpen = () => {
    rec.open(
      function () {
        console.log('开始录音');
        //开始录音
        rec.start();
      },
      (msg: any, isUserNotAllow: any) => {
        //用户拒绝了权限或浏览器不支持
        // alert(
        //   (isUserNotAllow ? '用户拒绝了权限，' : '') + '无法录音:' + msg
        // );
        Toast.show({
          icon: 'fail',
          content: `${
            !isUserNotAllow ? '用户拒绝了权限，' : ''
          }无法录音：${msg}`,
        });
      }
    );
  };

  const voiceBotten = useCallback(
    (node) => {
      if (node !== null) {
        // console.log(node);
        //打开麦克风授权获得相关资源
        let timeouts = false;
        let CTimeout: any = null;
        let startTime: any = 0;
        let stopTime: any = 0;
        if (window.modelName === 'pc') {
          node.onmousedown = (e: any) => {
            node.style.backgroundImage = 'url(/images/voice-1.png)';
            timeouts = false;
            startTime = new Date().getTime();
            CTimeout = setTimeout(() => {
              timeouts = true;
              clearTimeout(CTimeout);
            }, 1000);
            // mediaRecorder?.state === 'inactive' && mediaRecorder.start(); //当鼠标按下的时候进行录制
            recOpen();
          };
          node.onmouseup = (e: any) => {
            node.style.backgroundImage = 'url(/images/voice.png)';
            stopTime = new Date().getTime();
            if (!timeouts) {
              clearTimeout(CTimeout);
              Toast.show({
                icon: 'fail',
                content: '时间太短！',
              });
            }
            // mediaRecorder?.state === 'recording' && mediaRecorder.stop(); //当鼠标松开的时候关闭录制
            recStop();
          };
        } else {
          node.ontouchstart = (e: any) => {
            node.style.backgroundImage = 'url(/images/voice-1.png)';
            timeouts = false;
            startTime = new Date().getTime();
            CTimeout = setTimeout(() => {
              timeouts = true;
              clearTimeout(CTimeout);
            }, 1000);
            // console.log(mediaRecorder);
            // mediaRecorder?.state === 'inactive' && mediaRecorder.start(); //当鼠标按下的时候进行录制
            recOpen();
          };
          node.ontouchend = (e: any) => {
            node.style.backgroundImage = 'url(/images/voice.png)';
            stopTime = new Date().getTime();
            if (!timeouts) {
              clearTimeout(CTimeout);
              Toast.show({
                icon: 'fail',
                content: '时间太短！',
              });
            }
            // console.log(mediaRecorder);
            // mediaRecorder?.state === 'recording' && mediaRecorder.stop(); //当鼠标松开的时候关闭录制
            recStop();
          };
        }
        const recStop = () => {
          rec.stop((blob: any, duration: any) => {
            console.log(blob, duration);
            if (timeouts) {
              let blobs = new Blob([blob], {
                type: 'audio/ogg; codecs=opus',
              });
              timeouts = false;
              const number = ((stopTime - startTime) / 1000).toFixed(1);
              // console.log(number);
              setFileList([blobs], { voice: true, number });
            }
          });
        };
        // if (navigator?.mediaDevices?.getUserMedia) {
        //   //navigator.mediaDevices.getUserMedia()会提示用户给予使用媒体输入的许可，媒体输入会产生一个MediaStream，里面包含了请求的媒体类型的轨道//
        //   let chunks: any = [];
        //   const constraints = {
        //     audio: true, //这里打开我么的音频
        //   };
        //   let timeouts = false;
        //   let CTimeout: any = null;
        //   let startTime: any = 0;
        //   let stopTime: any = 0;
        //   navigator.mediaDevices.getUserMedia(constraints).then(
        //     (MediaStream) => {
        //       const mediaRecorder: any = new MediaRecorder(MediaStream); //构造函数会创建一个对指定的 MediaStream 进行录制的 MediaRecorder 对象
        //       if (window.modelName === 'pc') {
        //         node.onmousedown = (e: any) => {
        //           node.style.backgroundImage = 'url(/images/voice-1.png)';
        //           timeouts = false;
        //           startTime = new Date().getTime();
        //           CTimeout = setTimeout(() => {
        //             timeouts = true;
        //             clearTimeout(CTimeout);
        //           }, 1000);
        //           mediaRecorder?.state === 'inactive' && mediaRecorder.start(); //当鼠标按下的时候进行录制
        //         };
        //         node.onmouseup = (e: any) => {
        //           node.style.backgroundImage = 'url(/images/voice.png)';
        //           stopTime = new Date().getTime();
        //           if (!timeouts) {
        //             clearTimeout(CTimeout);
        //             Toast.show({
        //               icon: 'fail',
        //               content: '时间太短！',
        //             });
        //           }
        //           mediaRecorder?.state === 'recording' && mediaRecorder.stop(); //当鼠标松开的时候关闭录制
        //         };
        //       } else {
        //         node.ontouchstart = (e: any) => {
        //           node.style.backgroundImage = 'url(/images/voice-1.png)';
        //           timeouts = false;
        //           startTime = new Date().getTime();
        //           CTimeout = setTimeout(() => {
        //             timeouts = true;
        //             clearTimeout(CTimeout);
        //           }, 1000);
        //           // console.log(mediaRecorder);
        //           mediaRecorder?.state === 'inactive' && mediaRecorder.start(); //当鼠标按下的时候进行录制
        //         };
        //         node.ontouchend = (e: any) => {
        //           node.style.backgroundImage = 'url(/images/voice.png)';
        //           stopTime = new Date().getTime();
        //           if (!timeouts) {
        //             clearTimeout(CTimeout);
        //             Toast.show({
        //               icon: 'fail',
        //               content: '时间太短！',
        //             });
        //           }
        //           // console.log(mediaRecorder);
        //           mediaRecorder?.state === 'recording' && mediaRecorder.stop(); //当鼠标松开的时候关闭录制
        //         };
        //       }
        //       mediaRecorder.ondataavailable = (e: any) => {
        //         //响应运行代码Blob数据被提供使用
        //         chunks = [];
        //         chunks.push(e.data);
        //       };
        //       mediaRecorder.onstop = (e: any) => {
        //         //将收集好的音频数据创建成Blob 对象，然后 通过 URL.createObjectURL 创建成 HTML 中 <audio> 标签可使用的资源链接。
        //         if (timeouts) {
        //           let blob = new Blob(chunks, {
        //             type: 'audio/ogg; codecs=opus',
        //           });
        //           timeouts = false;
        //           const number = ((stopTime - startTime) / 1000).toFixed(1);
        //           // console.log(number);
        //           setFileList([blob], { voice: true, number });
        //         }

        //         // chunks = []; //其中，在使用完收到的音频数据后
        //         // var audioURL = window.URL.createObjectURL(blob);
        //         // const chatArr = [];

        //         // chatArr.push(audioURL); //这里将收到的音频数据放到一个数组中,为了在下面循环出来
        //         // console.log(blob, chatArr);
        //         // updata(chatArr)         //执行这个方法将我们的audio循环添加出来
        //       };
        //     },
        //     () => {
        //       console.error('授权失败！');
        //       Toast.show({
        //         icon: 'fail',
        //         content: '授权失败！',
        //       });
        //     }
        //   );
        // } else {
        //   console.error('浏览器不支持 getUserMedia');
        //   Toast.show({
        //     icon: 'fail',
        //     content: '浏览器不支持 getUserMedia！',
        //   });
        // }
      }
    },
    [voiceSotten]
  );

  return (
    <>
      <div className="yijian" onClick={tabsHid}>
        <div
          className="searchBox"
          style={{ paddingTop: `${window.userAgents}px` }}
        >
          <div style={{ position: 'relative' }}>
            <div className="home-search">
              <img
                className="xiangmu-left"
                src="/images/fanhui.png"
                alt=""
                onClick={goBackS}
              />
              <span className="toNames">
                {nickNameTop ? nickNameTop : localStorage.getItem('toNames')}
              </span>
              {chatType === 'groupChat' ? (
                <img
                  className="xiangmu-rigth"
                  src="/images/dashujukeshihuaico.png"
                  alt=""
                  onClick={tabs}
                />
              ) : (
                ''
              )}
              <ul
                className={`${
                  tabShow && chatType === 'groupChat' ? 'show' : ''
                }`}
              >
                <li onClick={() => options(1)}>查看所有成员</li>
                <li onClick={() => options(2)}>添加成员</li>
                {myLocName !== groupOwner ? (
                  <li className="groupOwner_log" onClick={() => options(3)}>
                    退出本群
                  </li>
                ) : (
                  <>
                    <li className="groupOwner" onClick={() => options(4)}>
                      转让退出本群
                    </li>
                    <li className="groupOwner" onClick={() => options(5)}>
                      移除本群
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div
          className="content-text"
          id="contentTexte"
          ref={contentScroll}
          onScroll={(e) => onScroll(e)}
        >
          <div
            className={`box boxTexte ${total && 'boxTop'} ${
              expressionShow || addAnothers ? 'boxTexteB' : ''
            }`}
            id="box"
            ref={boxTextes}
            style={{
              marginTop: `${window.userAgents}px`,
            }}
          >
            {Loadings && (
              <div className="boxLoading">
                <Loading color="currentColor" />
              </div>
            )}
            {contentList}
          </div>
        </div>
        {shuruShow || chatNames === myLocName ? (
          <div className="shuru border-top" id="shuru">
            <ul>
              <li>
                <img
                  className="voice"
                  src={`/images${
                    voiceSotten ? '/shoufeijianpan.png' : '/shurufayuyin.png'
                  }`}
                  alt=""
                  onClick={voices}
                />
                {voiceSotten ? (
                  <div className="voice_botten">
                    <div
                      className="voice_botten_text"
                      ref={voiceBotten}
                      style={{ backgroundImage: 'url(/images/voice.png)' }}
                    ></div>
                  </div>
                ) : (
                  <p
                    ref={texts}
                    placeholder="请详输入内容..."
                    id="texts"
                    className="mint-field-core"
                    onClick={onchange}
                    onInput={contenteditable}
                  ></p>
                )}
                <img
                  className="expressions"
                  src={`/images/${
                    expressionShow
                      ? 'shoufeijianpan.png'
                      : 'shurufaxiaolian.png'
                  }`}
                  alt=""
                  onClick={expressions}
                />
                <div
                  className="fasong"
                  style={{ background: `${inputContent ? '#ff7a59' : ''}` }}
                >
                  {inputContent ? (
                    <span onClick={() => send()}>发送</span>
                  ) : (
                    <img
                      onClick={addsAnother}
                      src="/images/tianjiaqunchengyuan.png"
                      alt=""
                    />
                  )}
                </div>
              </li>
            </ul>
            <div
              className={`expression ${
                expressionShow
                  ? 'expressionB'
                  : addAnothers
                  ? 'addsAnotherShow'
                  : ''
              }`}
            >
              <div className="expressionList">
                {expressionShow ? (
                  expressionD()
                ) : (
                  <OtherItems
                    setFileList={setFileList}
                    deleteFl={deleteFl}
                    boxDom={contentScroll}
                    onSetVideoCalls={onSetVideoCalls}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        <div className={`tanCeng ${tanCengShow ? 'tanCengShow' : ''}`}>
          <div className="tanCeng_cont">
            <div className="tanCeng_cont_top">请选择转让群主</div>
            <div className="tanCeng_cont_box">
              <div className="tanCeng_cont_box_tex">
                <CheckList defaultValue={checkListvalue} onChange={onChange}>
                  {imgIdLoc.map((item: any, index: number) => {
                    if (item.name === myLocName) {
                      return null;
                    }
                    return (
                      <CheckList.Item key={index} value={item.name}>
                        <div className="content-food border-bottom">
                          <div>
                            <div className="imgas">
                              <p>
                                <img
                                  className="border"
                                  src={item.classIcon}
                                  alt=""
                                />
                              </p>
                            </div>
                            <span className="first">{item.nickName}</span>
                          </div>
                        </div>
                      </CheckList.Item>
                    );
                  })}
                </CheckList>
              </div>
            </div>
            <div className="tanCeng_cont_bottom">
              <span onClick={Sure}>确定</span>
              <span onClick={Cancel}>取消</span>
            </div>
          </div>
        </div>
        {/* <ImageViewer
          image={fileUrl}
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
        /> */}
        {visible && (
          <ImageViewer.Multi
            images={imagesList}
            visible={visible}
            defaultIndex={defaultIndex}
            onClose={() => {
              setVisible(false);
              history.goBack();
            }}
          />
        )}
        {dataListL && (
          <Spins styleSize={[65, 33]} color={'#ff7a59'} fontSize={'33px'} />
        )}
        {onPlayUrl && (
          <div className="video-style">
            <video
              id="vdo"
              className="videos"
              controls={true}
              autoPlay={true}
              // name="media"
              // muted="muted"
              onClick={videoPlays}
            >
              <source src={`${onPlayUrl}`} type="" />
            </video>
            <div
              onClick={() => {
                history.goBack();
                videoPlays();
              }}
              className="video-closure"
            >
              <CloseCircleOutline className="video-closure-icon" />
            </div>
          </div>
        )}
      </div>
      {videoCalls && (
        <VideoCallPlay
          call={call}
          onStartQuery={videoCalls}
          videoCallCancel={videoCallCancel}
          actionName={actionName}
          onFinish={onFinish}
          chatNames={chatNames}
          locMyName={locMyName}
          myLocName={myLocName}
        />
      )}
      <NestingIframe
        title={iframeTitle}
        display={display}
        url={iframeUrl}
        goBackS={iframeGoBackS}
        connectUrl={connectUrl}
        downloadName={downloadName}
      />
      {overallLoadings && (
        <div className="overall">
          <Loading color="currentColor" />
        </div>
      )}
    </>
  );
};

export default ChatList;
