import '../personalInformation/index.scss';
import './index.scss';
import {
  Divider,
  ImageViewer,
  Popup,
  TextArea,
  NoticeBar,
  ActionSheet,
  Dialog,
} from 'antd-mobile';
import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';
import CameraOutList from './cameraOutList';
import HooksCropperModal from '../HooksCropperModal/HooksCropperModal';
import {
  getCircleFriends,
  friendsCircleFileUpload,
  addComments,
  dynamicDeletion,
} from '../../api';
import {
  PlayOutline,
  CloseCircleOutline,
  MessageOutline,
  HeartFill,
  CameraOutline,
  CloseOutline,
  ArrowDownCircleOutline,
  LeftOutline,
  LinkOutline,
  MoreOutline,
} from 'antd-mobile-icons';
import { MyContext } from '../../models/context';
import { moment } from '../../helpers';
import { urlObj } from '../personalInformation/urlObj';
import NestingIframe from '../nestingIframe/nestingIframe';

let imgIndex: any = [];
let demoImages: any = [];
let toIndexId: any = null;
let scrollIndex = 0;
let videoPlaysBlock = false;
let urlName = '';
let urlValue = '';
let urlValueObj: any = {};
let deleteImageL: any = [];
const Dynamic = ({
  name,
  onBack,
  display,
  indexId,
  circleFriendData,
  callback,
  toCircleFriendsBackground,
  headPortraitB,
  toNames,
  labelData,
}: any) => {
  const history = useHistory();
  const videosRef: any = useRef(null);
  const { state } = useContext(MyContext);
  const { urlPathname } = state;
  const [nickname] = useState<any>(localStorage.getItem('myName'));
  const [myapathZoom] = useState<any>(localStorage.getItem('myapathZoom'));
  const [myLocName] = useState<any>(localStorage.getItem('name'));
  const [cameraOut, setCameraOut] = useState(false);
  const [circleFriendList, setCircleFriendList] = useState<any>([]);
  const [visible, setVisible] = useState(false);
  const [defaultIndex, setDefaultIndex] = useState(1);
  const [demoImagesList, setDemoImagesList] = useState<any>([]);
  const [circleFriendsBackground, setCircleFriendsBackground] = useState<any>(
    localStorage.getItem('circleFriendsBackground')
  );
  const [commentParameter, setCommentParameter] = useState<any>({});
  const [commentParameterV, setCommentParameterV] = useState<any>(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [ReplyMessage, setReplyMessage] = useState('');
  const [playbackRecord, setPlaybackRecord] = useState<any>({});
  const [personalInformation] = useState<any>(
    localStorage.getItem('personalInformation')
  );
  const [pageS, setPageS] = useState(1);
  const [dataTips, setDataTips] = useState(false);
  const [nameString, setNameString] = useState('');
  const [dividerBottom, setDividerBottom] = useState(false);
  const [switchName, setSwitchName] = useState(false);
  const [indexKey, setIndexKey] = useState(0);
  const { _name, _value, _valueObj } = urlObj(urlPathname);
  const [displayBlock, setDisplayBlock] = useState(false);
  const [displayListImg, setDisplayListImg] = useState([]);

  const [iframeTitle, setIframeTitle] = useState('');
  const [iframeDisplay, setIframeDisplay] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const [visibleSheet, setVisibleSheet] = useState(false);
  const [dynamicDeletionTime, setDynamicDeletionTime] = useState<any>({});
  const [dynamicEdit, setDynamicEdit] = useState(false);
  const [textValue, setTextValue] = useState<any>('');
  const [deleteVideo, setDeleteVideo] = useState<any>('');
  const [deleteImage, setDeleteImage] = useState<any>([]);

  useEffect(() => {
    if (!display && name) {
      videoPlays('null', '', 'no');
      let timeout = setTimeout(() => {
        clearTimeout(timeout);
        setDisplayBlock(false);
      }, 310);
    } else if (display) {
      if (name) {
        setPageS(2);
        imgIndex = [];
        demoImages = [];
      }
      setDisplayBlock(true);
    }
    let timeout = setTimeout(() => {
      setIndexKey(indexKey + 1);
      clearTimeout(timeout);
    }, 310);
    if (!name) {
      setDisplayBlock(true);
    }
  }, [display]);
  useEffect(() => {
    if (toCircleFriendsBackground) {
      setCircleFriendsBackground(toCircleFriendsBackground);
    } else if (!circleFriendsBackground) {
      setCircleFriendsBackground('/images/202203120130501.jpg');
    }
  }, [toCircleFriendsBackground, display]);
  useEffect(() => {
    urlName = _name;
    urlValue = _value;
    urlValueObj = _valueObj;
    if (!videoPlaysBlock && history.location.search !== '?comment=1') {
      videoPlays('null', 'no', 'no');
    }
    if (
      !_valueObj?.comment &&
      !_valueObj?.dynamic &&
      !_valueObj?.dynamicDynamic &&
      !_valueObj?.dynamicDynamicComment
    ) {
      setCommentParameterV(false);
    }
    if (!_valueObj?.cameraOutline) {
      setCameraOut(false);
    }
    // console.log(_name, _value, _valueObj);
    if (!labelData) {
      if (localStorage.getItem('myInformation')) {
        const { information } = JSON.parse(
          localStorage.getItem('myInformation') || '{information:""}'
        );
        labelData = information || {};
      }
    }
    if (labelData) {
      let nameString = '';
      for (let key in labelData) {
        if (key === 'ZHUANG_TAI') {
          nameString += ` 状态:【${labelData[key]?.join('、') || ''}】`;
        }
        if (key === 'XING_GE') {
          nameString += ` 性格:【${labelData[key]?.join('、') || ''}】`;
        }
        if (key === 'JIA_ZHI_GUAN') {
          nameString += ` 价值观:【${labelData[key]?.join('、') || ''}】`;
        }
        if (key === 'AI_HAO') {
          nameString += ` 爱好:【${labelData[key]?.join('、') || ''}】`;
        }
        if (key === 'SHU_JI') {
          nameString += ` 书籍:【${labelData[key]?.join('、') || ''}】`;
        }
        if (key === 'MEI_SHI') {
          nameString += ` 美食:【${labelData[key]?.join('、') || ''}】`;
        }
        if (key === 'YUN_DONG') {
          nameString += ` 运动:【${labelData[key]?.join('、') || ''}】`;
        }
        if (key === 'DIAN_YING') {
          nameString += ` 电影:【${labelData[key]?.join('、') || ''}】`;
        }
        if (key === 'YOU_XI') {
          nameString += ` 游戏:【${labelData[key]?.join('、') || ''}】`;
        }
      }
      setNameString(nameString);
    }
    if (!_valueObj.ImageViewer) {
      setVisible(false);
    }
    if (!_valueObj.iframe) {
      setIframeUrl('');
    }
    if (!_valueObj.DynamicDeletion) {
      setVisibleSheet(false);
    }
  }, [urlPathname]);
  useEffect(() => {
    if (iframeUrl) {
      setIframeDisplay(true);
    } else {
      setIframeDisplay(false);
    }
  }, [iframeUrl]);
  useEffect(() => {
    imgIndex = [];
    demoImages = [];
    setCircleFriendList([]);
    return componentWillUnmount;
  }, []);
  const componentWillUnmount = () => {
    setPageS(1);
    imgIndex = [];
    demoImages = [];
    setCircleFriendList([]);
  };
  useEffect(() => {
    if (
      !commentParameterV &&
      (commentParameter.thumbsUp || commentParameter.comments)
    ) {
      setCommentParameterV(true);
    }
  }, [commentParameter]);
  useEffect(() => {
    if (!circleFriendData) {
      const circle = localStorage.getItem('circleFriendsBackgroundLoc');
      // console.log(circle);
      if (circle) {
        // setCircleFriendList(JSON.parse(circle) || []);
      }
      getCircleFriendList();
    } else {
      setCircleFriendList(circleFriendData || []);
      circleFriendData.map((term: any) => {
        term.imgList &&
          term.imgList.map((item: any, index: number) => {
            imgIndex.push({
              url: item.apath,
              index: index,
              time: term.time,
            });
            demoImages.push(item.apath);
            return item;
          });

        return term;
      });
      setDemoImagesList(demoImages);
    }
    return () => {
      imgIndex = [];
      demoImages = [];
      setCircleFriendList([]);
    };
  }, [circleFriendData]);

  const onDynamicDeletion = () => {
    dynamicDeletion({
      name: myLocName,
      time: dynamicDeletionTime.time,
    }).then((res: any) => {
      if (res.code === 200) {
        console.log(res.data);
        setDynamicDeletionTime({});
        history.goBack();
      }
    });
  };

  const getCircleFriendList = async (key?: string, nameId?: any) => {
    if (urlValueObj.videoPlay) return;
    if (key) {
      setSwitchName(true);
      setDividerBottom(false);
      imgIndex = [];
      demoImages = [];
    }
    await getCircleFriends({
      page: key ? 1 : pageS,
      pageSize: 13,
      name: urlValue,
      personal:
        (urlName === 'my' || urlValueObj.dynamicInside) &&
        history.location.pathname === '/personalInformation'
          ? true
          : false,
    }).then((res: any) => {
      // console.log(res);
      setSwitchName(false);
      if (res.code === 200) {
        if (key) {
          setPageS(2);
          setDataTips(false);
        } else {
          setPageS(pageS + 1);
        }
        if (!res.data.length) {
          setDataTips(true);
        }
        localStorage.setItem(
          'circleFriendsBackgroundLoc',
          JSON.stringify(res.data || [])
        );
        // setCircleFriendList(res?.data || []);
        if (key) {
          setCircleFriendList(res.data || []);
        } else {
          setCircleFriendList((val: any) => [...val, ...(res.data || [])]);
        }

        res.data.map((term: any) => {
          term.imgList &&
            term.imgList.map((item: any, index: number) => {
              imgIndex.push({
                url: item.apath,
                index: index,
                time: term.time,
              });
              demoImages.push(item.apath);
              return item;
            });

          return term;
        });
        setDemoImagesList(demoImages);
      }
    });
  };

  const goBackS = () => {
    setTabShow(false);
    setCameraOut(false);
    if (name && !cameraOut) {
      onBack(false);
    }
    history.goBack();
  };

  const onCameraOutline = () => {
    // history.push('/personalInformation?dynamic=2');
    history.push(
      `/personalInformation${
        window.location.search
      }&${urlName}-${new Date().getTime()}=${JSON.stringify({
        name: urlValue || '',
        cameraOutline: 'yes',
      })}`
    );
    setCameraOut(true);
  };
  const onetCameraOut = () => {
    history.goBack();
    setPageS(1);
    setDataTips(false);
    getCircleFriendList();
    setCameraOut(false);
    callback();
  };
  const videoPlays = (videoPlays: any, index: any, id?: any) => {
    // 视频开关
    let timeout = setTimeout(() => {
      videoPlaysBlock = false;
      clearTimeout(timeout);
    }, 100);
    videoPlaysBlock = true;
    // console.log('====', videoPlays, index, id);
    if (videoPlays === 'null') {
      index = playbackRecord;
      videoPlays = 'no';
    }
    const { videos_s, videosBox_s, videoPlays_s }: any = index;
    onSetCommentBlock(null);
    if (videosRef) {
      const videoList: any = document.getElementById(videos_s);
      const videosBox: any = document.getElementById(videosBox_s);
      const videoClose: any = document.getElementById(videoPlays_s);
      setPlaybackRecord({ videos_s, videosBox_s, videoPlays_s });
      if (videoPlays === 'no') {
        if (!videoList?.index || videoList.index === 'false') return;
        // console.log('====>>>>>', history.location.search);
        videoList.index = 'false';
        videoList.pause(); //暂停控制
        videoClose.style.display = 'none';
        videosBox.style.display = 'none';
        setPlaybackRecord({});
        if (!id) {
          history.goBack();
        }
      } else {
        videoList.index = 'true';
        videoClose.style.display = 'block';
        videosBox.style.display = 'block';
        videoList.play();
        if (urlName === 'dynamic') {
          if (urlValueObj.dynamicDynamic) {
            history.push(
              `/personalInformation${
                window.location.search
              }&${urlName}-${new Date().getTime()}=${JSON.stringify({
                name: urlValue || '',
                dynamicDynamic: 'yes',
                dynamicDynamicVideoPlay: 'yes',
              })}`
            );
          } else {
            if (urlValueObj.dynamicInside) {
              history.push(
                `/personalInformation${
                  window.location.search
                }&${urlName}-${new Date().getTime()}=${JSON.stringify({
                  name: urlValue || '',
                  dynamicVideoPlay: 'yes',
                })}`
              );
            } else {
              history.push(
                `/dynamic${
                  window.location.search
                }&${urlName}-${new Date().getTime()}=${JSON.stringify({
                  name: urlValue || '',
                  videoPlay: 'yes',
                })}`
              );
            }
          }
        } else {
          history.push(
            `/personalInformation${
              window.location.search
            }&${urlName}-${new Date().getTime()}=${JSON.stringify({
              name: urlValue || '',
              videoPlay: 'yes',
            })}`
          );
        }
      }
    }
  };
  const onComment = ({
    time,
    name,
    nickname,
    commentsLength,
    commentsList,
    thumbsUp,
    comments,
  }: any) => {
    // console.log(name, nickname, myLocName);
    if (urlName === 'dynamic') {
      if (urlValueObj.dynamicDynamic) {
        history.push(
          `/personalInformation${
            window.location.search
          }&${urlName}-${new Date().getTime()}=${JSON.stringify({
            name: urlValue || '',
            dynamicDynamic: 'yes',
            dynamicDynamicComment: 'yes',
          })}`
        );
      } else {
        if (urlValueObj.dynamicInside) {
          history.push(
            `/personalInformation${
              window.location.search
            }&${urlName}-${new Date().getTime()}=${JSON.stringify({
              name: urlValue || '',
              dynamicDynamic: 'yes',
            })}`
          );
        } else {
          history.push(
            `/dynamic${
              window.location.search
            }&${urlName}-${new Date().getTime()}=${JSON.stringify({
              name: urlValue || '',
              dynamic: 'yes',
            })}`
          );
        }
      }
    } else {
      history.push(
        `/personalInformation${
          window.location.search
        }&${urlName}-${new Date().getTime()}=${JSON.stringify({
          name: urlValue || '',
          comment: 'yes',
        })}`
      );
    }
    setCommentParameter({
      time,
      name,
      nickname,
      commentsLength,
      commentsList,
      thumbsUp,
      comments,
    });
  };
  const giveThumbs = ({ time, name, nickname, likeIt, thumbsTime }: any) => {
    // console.log(name, nickname, myLocName);
    addComments({
      time,
      name, // 给谁点赞的 对方的电话
      friendName: nickname, // 点赞者的中文名
      friendNameId: myLocName, // 点赞者的电话
      friendHeadPortrait: myapathZoom, // 点赞者的头像
      thumbsUp: !likeIt ? true : false, // 设为true
      thumbsTime: thumbsTime || new Date().getTime(), // 点赞时间
    }).then((res: any) => {
      if (res.code === 200) {
        // console.log(res);
        const termObj = {
          time,
          name, // 给谁点赞的 对方的电话
          friendName: nickname, // 点赞者的中文名
          friendNameId: myLocName, // 点赞者的电话
          friendHeadPortrait: myapathZoom, // 点赞者的头像
          thumbsUp: !likeIt ? true : false, // 设为true
          thumbsTime: thumbsTime || new Date().getTime(), // 点赞时间
        };
        const list = [...circleFriendList].map((item: any) => {
          if (item.time === time) {
            let existence = false;
            if (item.commentsList) {
              item.commentsList = item.commentsList.map((term: any) => {
                if (term.friendNameId === myLocName) {
                  existence = true;
                  term.thumbsUp = !likeIt ? true : false;
                }
                return term;
              });
            } else {
              existence = true;
              item.commentsList = [termObj];
            }
            if (!existence) {
              item.commentsList.push(termObj);
            }
            if (item.thumbsUpLength) {
              item.thumbsUpLength = !likeIt
                ? item.thumbsUpLength * 1 + 1
                : item.thumbsUpLength * 1 - 1;
            } else {
              item.thumbsUpLength = !likeIt ? 1 : 0;
            }
          }
          return item;
        });
        setCircleFriendList(list);
        // getCircleFriendList('true', name);
      }
    });
  };
  const onSetVisible = (url: number, time: any) => {
    onSetCommentBlock(null);
    imgIndex.map((item: any) => {
      if (item.url === url) {
        setDefaultIndex(item.index);
      }
      return item;
    });
    const list = imgIndex.filter((item: any) => {
      if (item.time === time) {
        return true;
      } else {
        return false;
      }
    });
    setDisplayListImg(list.map((item: any) => item.url));
    setVisible(true);
    history.push(
      `${window.location.pathname}${
        window.location.search
      }&${urlName}-${new Date().getTime()}=${JSON.stringify({
        name: urlValue || '',
        album: 'yes',
        ImageViewer: 1,
      })}`
    );
  };

  const onSetCommentBlock = (index: any) => {
    if (videosRef) {
      const giveThumbsButton: any = videosRef.current.getElementsByClassName(
        'give-thumbs-up-button'
      );
      if (!giveThumbsButton) return;
      const commentButton: any =
        videosRef.current.getElementsByClassName('comment-button');
      const comment: any = videosRef.current.getElementsByClassName(
        'dynamic-const-box-text-bottom-comment'
      );
      for (let i = 0; i < comment.length; i++) {
        comment[i].style.padding = '0';
        comment[i].style.width = '0';
        giveThumbsButton[i].style.opacity = '0';
        commentButton[i].style.opacity = '0';
      }

      if (index === null) {
        toIndexId = null;
        return;
      }
      if (toIndexId !== index) {
        toIndexId = index;
        comment[index].style.padding = '0 0.4rem';
        comment[index].style.width = '2.3rem';
        giveThumbsButton[index].style.opacity = '1';
        commentButton[index].style.opacity = '1';
      } else {
        toIndexId = null;
        comment[index].style.padding = '0';
        comment[index].style.width = '0';
        giveThumbsButton[index].style.opacity = '0';
        commentButton[index].style.opacity = '0';
      }
    }
  };
  const [transparency, setTransparency] = useState(0);
  const onScroll = (e: any) => {
    setTabShow(false);
    setDividerBottom(true);
    // console.log(
    //   e.target.clientHeight,
    //   e.target.scrollTop,
    //   e.target.scrollHeight
    // );
    // console.log(e.target.scrollTop - scrollIndex);
    if (
      e.target.scrollTop - scrollIndex > 190 ||
      e.target.scrollTop - scrollIndex < -190
    ) {
      // onSetCommentBlock(null);
      videoPlays('null', '', 'Scroll');
      scrollIndex = e.target.scrollTop;
    }
    onSetCommentBlock(null);
    toIndexId = null;
    if (e.target.scrollTop / 100 - 1 >= 1) {
      setTransparency(1);
    } else {
      setTransparency(e.target.scrollTop / 100 - 1);
    }
    let height = e.target.scrollHeight - e.target.scrollTop;
    if (
      Math.ceil(height) === e.target.clientHeight ||
      Math.floor(height) === e.target.clientHeight ||
      Math.floor(height) - e.target.clientHeight < 3
    ) {
      if (dataTips || switchName) return;
      // console.log(1);
      getCircleFriendList();
    }
  };
  const [tabShow, setTabShow] = useState<any>(false);
  const tabs = () => {
    setTabShow(!tabShow);
  };

  const fs: any = useRef(null);
  const [hooksModalFile, setHooksModalFile] = useState<any>('');
  const [hooksModalVisible, setHooksModalVisible] = useState<any>(false);

  const mockUpload = async (file: any) => {
    tabs();
    const fileN = file.target.files[0];
    let typeName = fileN.name.split('.');
    // const datas = await Upload(file, imgId, myName);
    // setMyHead(datas);
    setHooksModalFile(fileN);
    setHooksModalVisible(true);
  };
  const setHooksModalVisibles = () => {
    setHooksModalVisible(false);
    if (fs) {
      fs.current.value = null;
    }
  };
  const handleGetResultImgUrl = async (blob: any) => {
    // const str = URL.createObjectURL(blob);
    // console.log(blob);
    const isDebug: any =
      !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    const formDate = new FormData();
    formDate.append(
      'name',
      `${myLocName}_${(Math.random() * 3435).toFixed(0)}`
    );
    formDate.append('myLocName', myLocName);
    formDate.append('type', 'jpg');
    formDate.append('typeF', 'no');
    formDate.append('Zoom', 'no');
    formDate.append('base64', blob.split('base64,')[1]);
    if (isDebug) {
      formDate.append('isDebug', isDebug);
    }
    const { apath }: any = await friendsCircleFileUpload(formDate);
    if (apath) {
      localStorage.setItem('circleFriendsBackground', apath);
      setCircleFriendsBackground(apath);
      // setMyHead(icon);
      // setMyHeadZoom(apathZoom);
    }
    // console.log(data);
  };
  const goFriends = (name: string, key?: boolean) => {
    if (name === myLocName) {
      return;
    }
    if (name !== myLocName) {
      localStorage.setItem('fromType', 'All');
      localStorage.setItem('type', 'chat');
      localStorage.setItem('toNames', name.toString());
      localStorage.setItem('toChatName', name.toString());
      localStorage.setItem('personalInformation', '1');
    }
    const { pathname, search } = history.location;
    localStorage.setItem('comeFrom', `${pathname}${search}`);
    setCommentParameterV(false);

    // if (urlName === 'dynamic') {
    history.push(
      `/personalInformation${
        window.location.search
      }&${urlName}-${new Date().getTime()}=${JSON.stringify({
        name: name || '',
      })}`
    );
    // }
  };
  const onReply = ({ friendName }: any) => {
    setReplyMessage(friendName);
  };
  const releaseSpeech = ({}: any) => {
    const { time, name, nickname } = commentParameter;
    addComments({
      time,
      name, // 给谁评论的 对方的电话
      friendName: nickname, // 评论者的中文名
      friendNameId: myLocName, // 评论者的电话
      friendHeadPortrait: myapathZoom, // 评论者的头像
      comments: textAreaValue, // 评论内容
      commentTime: new Date().getTime(), // 评论时间
    }).then((res: any) => {
      if (res.code === 200) {
        // console.log(res);
        onSetCommentBlock(null);
        setTextAreaValue('');
        if (!urlValueObj.dynamicDynamic) {
          const list = [...circleFriendList].map((item: any) => {
            if (item.time === time) {
              if (item.commentsList) {
                item.commentsList.push({
                  time,
                  name, // 给谁评论的 对方的电话
                  friendName: nickname, // 评论者的中文名
                  friendNameId: myLocName, // 评论者的电话
                  friendHeadPortrait: myapathZoom, // 评论者的头像
                  comments: textAreaValue, // 评论内容
                  commentTime: new Date().getTime(), // 评论时间
                });
              } else {
                item.commentsList = [
                  {
                    time,
                    name, // 给谁评论的 对方的电话
                    friendName: nickname, // 评论者的中文名
                    friendNameId: myLocName, // 评论者的电话
                    friendHeadPortrait: myapathZoom, // 评论者的头像
                    comments: textAreaValue, // 评论内容
                    commentTime: new Date().getTime(), // 评论时间
                  },
                ];
              }
              if (item.commentsLength) {
                item.commentsLength = item.commentsLength * 1 + 1;
              } else {
                item.commentsLength = 1;
              }
            }
            return item;
          });
          setCircleFriendList(list);
          // getCircleFriendList('true', name);
        }
        history.goBack();
      }
    });
  };
  const onConnectValue = (url: string, title: string) => {
    setIframeUrl(url);
    setIframeTitle(title || url);
    if (urlName === 'dynamic') {
      if (urlValueObj.dynamicDynamic) {
        history.push(
          `/personalInformation${
            window.location.search
          }&${urlName}-${new Date().getTime()}=${JSON.stringify({
            name: urlValue || '',
            dynamicDynamic: 'yes',
            iframe: 'yes',
          })}`
        );
      } else {
        if (urlValueObj.dynamicInside) {
          history.push(
            `/personalInformation${
              window.location.search
            }&${urlName}-${new Date().getTime()}=${JSON.stringify({
              name: urlValue || '',
              dynamicInside: 'yes',
              iframe: 'yes',
            })}`
          );
        } else {
          history.push(
            `/dynamic${
              window.location.search
            }&${urlName}-${new Date().getTime()}=${JSON.stringify({
              name: urlValue || '',
              dynamicInside: 'yes',
              iframe: 'yes',
            })}`
          );
        }
      }
    } else {
      history.push(
        `/personalInformation${
          window.location.search
        }&${urlName}-${new Date().getTime()}=${JSON.stringify({
          name: urlValue || '',
          album: 'yes',
          iframe: 'yes',
        })}`
      );
    }
  };
  const iframeGoBackS = (e?: any) => {
    // console.log('111111');
    // if (!e) {
    history.goBack();
    // }
    setIframeUrl('');
    let timeout = setTimeout(() => {
      localStorage.removeItem('NestingIframe');
      clearTimeout(timeout);
    }, 310);
    // back();
  };
  const onTextArea = useCallback(
    (node: any) => {
      if (node) {
        node.focus();
      }
    },
    [dynamicEdit]
  );
  const onCancel = () => {
    localStorage.removeItem('NestingIframe');
    setDynamicEdit(false);
    setDeleteVideo('');
    setDeleteImage([]);
    setTextValue('');
  };
  const onDetermine = () => {
    localStorage.removeItem('NestingIframe');
    setDynamicEdit(false);
    setDeleteVideo('');
    setDeleteImage([]);
    setTextValue('');
    dynamicDeletion({
      name: myLocName,
      time: dynamicDeletionTime.time,
      textValue,
      deleteVideo,
      deleteImage,
    }).then((res: any) => {
      if (res.code === 200) {
        console.log(res.data);
        setDynamicDeletionTime({});
        history.goBack();
      }
    });
  };
  return (
    <div
      style={{ display: `${displayBlock ? 'block' : 'none'}` }}
      className={`personalInformation ${
        display
          ? 'right-in-enter right-in-enter-enter'
          : name
          ? 'right-in-leave right-in-leave-leave'
          : ''
      } personalInformationDynamic ${
        indexKey === 0 &&
        history.location.pathname !== '/dynamic' &&
        'personalInformationLeft'
      }`}
    >
      <div
        className="searchBox"
        style={{
          paddingTop: `${window.userAgents}px`,
          backgroundColor: `rgba(255, 122, 89, ${
            cameraOut ? 0 : transparency
          })`,
        }}
      >
        <div
          // className="searchBox"
          style={{
            position: 'relative',
          }}
        >
          <div className="home-search">
            {cameraOut ? (
              <span onClick={goBackS} className="home-search-img">
                <LeftOutline />
              </span>
            ) : (
              <img
                src="/images/fanhui.png"
                className="xiangmu-left"
                alt=""
                onClick={goBackS}
              />
            )}
            {transparency > 0 && !cameraOut && (
              <span>
                {personalInformation ||
                localStorage.getItem('secondary') ||
                urlValue !== myLocName
                  ? `${toNames ? toNames + '的相册' : '朋友圈'}`
                  : name
                  ? name
                  : '朋友圈'}
              </span>
            )}
            {name && urlValue === myLocName && !cameraOut && (
              <>
                <img
                  src="/images/dashujukeshihuaico.png"
                  alt=""
                  className="xiangmu-rigth"
                  onClick={tabs}
                ></img>
                <ul
                  className={`${tabShow ? 'show' : ''}`}
                  onChange={() => setTabShow(!tabShow)}
                >
                  {/* <li onClick={options}>更换背景</li> */}
                  <label>
                    <li>
                      <input
                        onChange={(files: any) => mockUpload(files)}
                        style={{ display: 'none' }}
                        type={`${
                          personalInformation ||
                          localStorage.getItem('secondary')
                            ? ''
                            : 'file'
                        }`}
                        name=""
                        accept="image/jpeg,image/jpg,image/png"
                        ref={fs}
                      />
                      更换背景
                    </li>
                  </label>
                </ul>
              </>
            )}
            {hooksModalVisible && (
              <HooksCropperModal
                uploadedImageFile={hooksModalFile}
                onClose={setHooksModalVisibles}
                onSubmit={handleGetResultImgUrl}
                aspectRatio={1.1}
              />
            )}
          </div>
        </div>
      </div>
      <div
        onScroll={onScroll}
        ref={videosRef}
        className="contents contents_search_leng contentsTransparency"
      >
        <div className="dynamic-box">
          <div className="dynamic-img">
            <div className="dynamic-img-cont-box">
              <img
                className="dynamic-img-cont"
                src={circleFriendsBackground}
                alt=""
              />
            </div>

            <div className="dynamic-img-box">
              <img
                src={
                  personalInformation ||
                  localStorage.getItem('secondary') ||
                  localStorage.getItem('addSearchFriends') ||
                  urlValue !== myLocName
                    ? headPortraitB || myapathZoom
                    : myapathZoom
                }
                alt=""
              />
              <div className="dynamic-img-box-test">
                {personalInformation ||
                localStorage.getItem('secondary') ||
                urlValue !== myLocName
                  ? toNames || nickname
                  : nickname}
              </div>
            </div>
            <div
              className={`NoticeBarName ${
                nameString.length < 15 && 'flex-end'
              }`}
            >
              <div className="NoticeBarNameLeft"></div>
              <div className="NoticeBarNameRight"></div>
              <NoticeBar content={nameString} color="alert" />
            </div>
            <div className="Masking"></div>
          </div>

          {name && _value === myLocName && (
            <div className="dynamic-const-box dynamic-const-box-first">
              <div className="dynamic-const-box-img">
                <span>今天</span>
              </div>
              <div className="dynamic-const-box-text">
                <div className="dynamic-const-box-text-name">
                  上传你的照片
                  <br />
                  开始记录你的生活
                </div>
                <div className="dynamic-const-box-text-test">
                  <span onClick={onCameraOutline}>
                    <CameraOutline />
                  </span>
                </div>
              </div>
              {circleFriendList.length ? (
                <div className="border-bottom"></div>
              ) : null}
            </div>
          )}
          {circleFriendList.map((item: any, index: number) => {
            let likeIt = false;
            let thumbsTime = 0;
            item.commentsList &&
              item.commentsList.map((term: any) => {
                if (term.friendNameId === myLocName && term.thumbsUp) {
                  likeIt = true;
                  thumbsTime = term.thumbsTime;
                }
                return term;
              });
            return (
              <div
                key={`${item?.title}_${index}`}
                className={`dynamic-const-box ${
                  ((!name && index === 0) ||
                    (_value !== myLocName && index === 0)) &&
                  'dynamic-const-box-first'
                }`}
              >
                <div
                  className="dynamic-const-box-img"
                  onClick={() => goFriends(item.name, true)}
                >
                  <img src={item?.headPortrait} alt="" />
                </div>
                <div className="dynamic-const-box-text">
                  <div className="dynamic-const-box-text-name">
                    {item.nickname || item.title}
                    {name && _value === myLocName && (
                      <MoreOutline
                        onClick={() => {
                          setVisibleSheet(true);
                          setDynamicDeletionTime(item);
                          history.push(
                            `/personalInformation${
                              window.location.search
                            }&${urlName}-${new Date().getTime()}=${JSON.stringify(
                              {
                                name: urlValue || '',
                                album: 'yes',
                                DynamicDeletion: 'yes',
                              }
                            )}`
                          );
                        }}
                        style={{
                          color: '#ff7a59',
                          fontSize: '0.5rem',
                          verticalAlign: 'bottom',
                          position: 'absolute',
                          right: '0',
                          top: '0',
                          bottom: '0',
                          margin: 'auto',
                        }}
                      />
                    )}
                  </div>
                  <div className="dynamic-const-box-text-test">
                    {item?.content}
                  </div>
                  {item.imgList && item.imgList.length > 0 && (
                    <div
                      className="dynamic-const-box-text-img"
                      style={{
                        padding: `${
                          item.video ? '0.13rem 0 0 0' : '0.13rem 0'
                        }`,
                      }}
                    >
                      {item.imgList.map((items: any, id: number) => {
                        let styles = null;
                        const len = item?.imgList?.length;
                        const list = items?.styleLength.split('_');
                        const type = list[0];
                        let styleObj: any = null;
                        if (len === 2 || len === 4) {
                          styleObj = {
                            width: '2.9rem',
                            height: '2.9rem',
                          };
                        } else if (len === 1) {
                          if (type === 'width') {
                            styleObj = {
                              width: '5.2rem',
                              height: `${((list[2] / list[1]) * 5.2).toFixed(
                                2
                              )}rem`,
                            };
                          } else {
                            styleObj = {
                              width: `${((list[1] / list[2]) * 5.2).toFixed(
                                2
                              )}rem`,
                              height: '5.2rem',
                            };
                          }
                        }
                        if (type === 'width') {
                          styles = {
                            height: '100%',
                          };
                        } else {
                          styles = {
                            width: '100%',
                          };
                        }
                        if (id > 8) {
                          return null;
                        }
                        return (
                          <div
                            style={styleObj}
                            key={`${items?.title}_${id + index}`}
                            className="dynamic-const-box-text-img-list"
                          >
                            <img
                              style={styles}
                              onClick={() =>
                                onSetVisible(items.apath, item.time)
                              }
                              src={items.apathZoom}
                              alt=""
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {item.video && (
                    <div
                      style={{
                        padding: `${
                          item.imgList && item.imgList.length
                            ? '0 0 0.13rem 0'
                            : '0.13rem 0'
                        }`,
                      }}
                    >
                      <div className="otherItemsListVideos">
                        <span className="PlayOutline">
                          <PlayOutline
                            onClick={() => {
                              videoPlays('play', {
                                videos_s: `videos${index}`,
                                videosBox_s: `videosBox${index}`,
                                videoPlays_s: `videoPlays${index}`,
                              });
                            }}
                          />
                        </span>
                        <img
                          className="imgIndex"
                          src={item.video.apathZoom}
                          alt=""
                          onClick={() => {
                            videoPlays('play', {
                              videos_s: `videos${index}`,
                              videosBox_s: `videosBox${index}`,
                              videoPlays_s: `videoPlays${index}`,
                            });
                          }}
                        />
                        <div
                          id={`videosBox${index}`}
                          className="videosBox document-classification-box"
                        >
                          <span
                            id={`videoPlays${index}`}
                            className="videoPlays"
                            onClick={() =>
                              videoPlays('no', {
                                videos_s: `videos${index}`,
                                videosBox_s: `videosBox${index}`,
                                videoPlays_s: `videoPlays${index}`,
                              })
                            }
                          >
                            <CloseCircleOutline className="video-closure-icon" />
                          </span>
                          <video
                            id={`videos${index}`}
                            className="videos"
                            controls={true}
                            // autoPlay={true}
                            // name="media"
                            // muted="muted"
                            // onClick={videoPlays}
                          >
                            <source src={`${item.video.apath}`} type="" />
                          </video>
                        </div>
                      </div>
                    </div>
                  )}
                  {item?.connectValue && (
                    <div
                      className="dynamic-connectValue"
                      onClick={() =>
                        onConnectValue(item.connectValue, item.title)
                      }
                    >
                      <LinkOutline
                        style={{
                          color: '#ff7a59',
                          fontSize: '0.3rem',
                          verticalAlign: 'bottom',
                          marginRight: '0.08rem',
                        }}
                      />
                      {item?.title || item?.connectValue}
                    </div>
                  )}
                  <div className="dynamic-const-box-text-bottom">
                    <div className="dynamic-const-box-text-bottom-left">
                      {moment(parseInt(item.time))}
                    </div>
                    <div className="dynamic-const-box-text-bottom-right">
                      <i style={{ cursor: 'pointer' }}>
                        <i
                          onClick={() =>
                            onComment({
                              time: item.time,
                              name: item.name,
                              nickname: nickname,
                              commentsLength: item.thumbsUpLength,
                              commentsList: item.commentsList,
                              thumbsUp: true,
                            })
                          }
                        >
                          {item.thumbsUpLength || 0} 赞{' '}
                        </i>
                        <i
                          className="dynamic-const-box-commentsList-bottom"
                          onClick={() =>
                            onComment({
                              time: item.time,
                              name: item.name,
                              nickname: nickname,
                              commentsLength: item.commentsLength,
                              commentsList: item.commentsList,
                              comments: true,
                            })
                          }
                        >
                          {item.commentsLength || 0} 评论
                        </i>
                      </i>
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => onSetCommentBlock(index)}
                      >
                        <MessageOutline />
                      </span>
                      <div
                        className="dynamic-const-box-text-bottom-comment"
                        style={{
                          padding: '0',
                          width: '0rem',
                        }}
                      >
                        <div
                          onClick={() =>
                            giveThumbs({
                              time: item.time,
                              name: item.name,
                              nickname: nickname,
                              likeIt,
                              thumbsTime: thumbsTime,
                            })
                          }
                          className="give-thumbs-up-button"
                          style={{
                            lineHeight: '0.39rem',
                            opacity: '0',
                            cursor: 'pointer',
                          }}
                        >
                          <HeartFill
                            style={{
                              color: likeIt ? '#ff0000' : '#fff',
                              fontSize: '0.41rem',
                              verticalAlign: 'bottom',
                              marginRight: '0.08rem',
                            }}
                          />
                          点赞
                        </div>
                        <div
                          className="comment-button"
                          style={{
                            opacity: '0',
                            cursor: 'pointer',
                          }}
                          onClick={() =>
                            onComment({
                              time: item.time,
                              name: item.name,
                              nickname: nickname,
                              commentsLength: item.commentsLength,
                              commentsList: item.commentsList,
                              comments: true,
                            })
                          }
                        >
                          评论
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {index !== circleFriendList.length - 1 && (
                  <div className="border-bottom"></div>
                )}
              </div>
            );
          })}
          {!circleFriendList.length && (
            <div
              style={{
                position: 'relative',
                padding: `${
                  name &&
                  !personalInformation &&
                  !localStorage.getItem('addSearchFriends')
                    ? '0 0.9rem'
                    : '2rem 0.9rem'
                }`,
                color: '#eeeeee',
              }}
            >
              <Divider>暂无</Divider>
            </div>
          )}
          {circleFriendList.length > 0 && (
            <div
              style={{
                padding: '0 0.9rem',
                color: '#eeeeee',
              }}
            >
              {dividerBottom && (
                <Divider>{dataTips ? '没有更多了' : '加载更多'}</Divider>
              )}
            </div>
          )}
        </div>
      </div>
      <div
        className={`${cameraOut && 'document-classification-box'}`}
        style={{
          display: `${cameraOut ? 'block' : 'none'}`,
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: '0',
          left: '0',
          overflowY: 'auto',
          background: '#fff',
          zIndex: 10,
        }}
      >
        {cameraOut && <CameraOutList callback={onetCameraOut} />}
      </div>
      {visible && (
        <ImageViewer.Multi
          images={displayListImg}
          visible={visible}
          defaultIndex={defaultIndex}
          onClose={() => {
            setVisible(false);
            history.goBack();
          }}
        />
      )}
      <Popup
        className="PopupBox"
        visible={commentParameterV}
        onMaskClick={() => {
          setCommentParameter({});
          history.goBack();
          setCommentParameterV(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          height: '55vh',
        }}
      >
        <div className="PopupTop">
          <CloseOutline
            onClick={() => {
              setCommentParameter({});
              setCommentParameterV(false);
              history.goBack();
            }}
            className="PopupTopOutline"
          />
          {commentParameter.commentsLength || 0}{' '}
          {commentParameter.thumbsUp ? '个赞' : '条评论'}
        </div>
        <div className="PopupContent">
          <div className="PopupContentList">
            {commentParameter.commentsList &&
              commentParameter.thumbsUp &&
              commentParameter.commentsList.map((term: any, index: number) => {
                if (!term.thumbsUp) {
                  return null;
                }
                return (
                  <div key={`${index}`} className="PopupContentListTerm">
                    <div className="PopupContentListTermImg">
                      <img
                        onClick={() => goFriends(term.friendNameId)}
                        src={term.friendHeadPortrait}
                        alt=""
                      />
                    </div>
                    <div
                      className="PopupContentListTermText"
                      onClick={() => onReply({ friendName: term.friendName })}
                    >
                      <span className="PopupContentListTermTextBottomThumbsUp">
                        {term.friendName}
                      </span>
                      <div className="PopupContentListTermTextBottom">
                        {/* <div className="PopupContentListTermTextBottomTex">
                          {term.comments}
                        </div> */}
                        <div className="PopupContentListTermTextBottomBottom">
                          <span>{moment(parseInt(term.thumbsTime))}</span>
                        </div>
                      </div>
                      <div className="thumbsUpListLove">
                        <HeartFill
                          style={{
                            position: 'absolute',
                            right: '0',
                            top: '0',
                            bottom: '0',
                            margin: 'auto',
                            color: '#ff0000',
                            fontSize: '0.41rem',
                            verticalAlign: 'bottom',
                            marginRight: '0.08rem',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            {commentParameter.commentsList &&
              commentParameter.comments &&
              commentParameter.commentsList.map((term: any, index: number) => {
                if (!term.comments) {
                  return null;
                }
                return (
                  <div key={`${index}`} className="PopupContentListTerm">
                    <div className="PopupContentListTermImg">
                      <img
                        onClick={() => goFriends(term.friendNameId)}
                        src={term.friendHeadPortrait}
                        alt=""
                      />
                    </div>
                    <div
                      className="PopupContentListTermText"
                      onClick={() => onReply({ friendName: term.friendName })}
                    >
                      <span>{term.friendName}</span>
                      <div className="PopupContentListTermTextBottom">
                        <div className="PopupContentListTermTextBottomTex">
                          {term.comments}
                        </div>
                        <div className="PopupContentListTermTextBottomBottom">
                          <span>{moment(parseInt(term.commentTime))}</span>
                          <span>回复</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {commentParameter.comments && (
          <div className="PopupBottom">
            <div className="border-top"></div>
            <div
              className={`PopupBottomTextArea ${
                textAreaValue && 'PopupBottomTextAreaRight'
              }`}
            >
              <TextArea
                placeholder={
                  ReplyMessage ? `回复 @${ReplyMessage}` : '留下你的评论吧'
                }
                value={textAreaValue}
                rows={1}
                autoSize={{ minRows: 1, maxRows: 3 }}
                onChange={(val) => {
                  setTextAreaValue(val);
                }}
              />
              {textAreaValue && (
                <div
                  className="PopupBottomIconBox"
                  onClick={() => releaseSpeech({})}
                >
                  <ArrowDownCircleOutline className="PopupBottomIcon" />
                </div>
              )}
            </div>
          </div>
        )}
        {!commentParameter.commentsLength && (
          <div
            style={{
              height: '1rem',
              width: '70%',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              margin: 'auto',
              color: '#eeeeee',
            }}
          >
            <Divider>暂无</Divider>
          </div>
        )}
      </Popup>
      <NestingIframe
        title={iframeTitle}
        display={iframeDisplay}
        url={iframeUrl}
        goBackS={iframeGoBackS}
        connectUrl={true}
        downloadName={''}
      />
      <ActionSheet
        visible={visibleSheet}
        cancelText="取消"
        actions={[
          {
            text: '编辑',
            key: 'edit',
            onClick: async () => {
              setVisibleSheet(false);
              setDynamicEdit(true);
              localStorage.setItem('NestingIframe', 'true');
              // const result = await Dialog.confirm({
              //   content: (
              //     <>
              //       {dynamicDeletionTime.content && (
              //         <TextArea
              //           ref={onTextArea}
              //           // placeholder="请详输入你此时此刻的心情..."
              //           value={dynamicDeletionTime.content}
              //           rows={3}
              //           onChange={(val: any) => {
              //             setTextValue(val);
              //           }}
              //         />
              //       )}
              //       {dynamicDeletionTime.imgList ? (
              //         <div
              //           style={{
              //             overflow: 'hidden',
              //             margin: '0 auto',
              //             width: '5.05rem',
              //             paddingLeft: '0.21rem',
              //           }}
              //         >
              //           {dynamicDeletionTime?.imgList.map((item: any) => {
              //             for (let i = 0; i < deleteImageL.length; i++) {
              //               if (deleteImageL[i] === item.apathZoom) {
              //                 return null;
              //               }
              //             }
              //             return (
              //               <div
              //                 key={item.apathZoom}
              //                 style={{
              //                   position: 'relative',
              //                   width: '1.1rem',
              //                   height: '1.1rem',
              //                   display: 'flex',
              //                   justifyContent: 'center',
              //                   alignItems: 'center',
              //                   overflow: 'hidden',
              //                   margin: '0 0.13rem 0.13rem 0',
              //                   float: 'left',
              //                 }}
              //               >
              //                 <img
              //                   className="imgIndex"
              //                   src={item.apathZoom}
              //                   alt=""
              //                 />
              //                 <div
              //                   style={{
              //                     position: 'absolute',
              //                     top: '0',
              //                     left: '0',
              //                     width: '1.1rem',
              //                     height: '1.1rem',
              //                     display: 'flex',
              //                     justifyContent: 'center',
              //                     alignItems: 'center',
              //                     background: 'rgba(0, 0, 0, 0.5)',
              //                     color: '#ff7a59',
              //                   }}
              //                   onClick={() => {
              //                     deleteImageL = [
              //                       ...deleteImageL,
              //                       item.apathZoom,
              //                     ];
              //                     console.log(deleteImageL);
              //                     setDeleteImage(deleteImageL);
              //                   }}
              //                 >
              //                   删除
              //                 </div>
              //               </div>
              //             );
              //           })}
              //         </div>
              //       ) : (
              //         ''
              //       )}
              //       {dynamicDeletionTime.video && !deleteVideo ? (
              //         <div
              //           style={{
              //             width: '100%',
              //           }}
              //         >
              //           <img
              //             style={{
              //               position: 'relative',
              //               width: '100%',
              //             }}
              //             className="imgIndex"
              //             src={dynamicDeletionTime.video.apathZoom}
              //             alt=""
              //             // onClick={() => {
              //             //   videoPlays('play', {
              //             //     videos_s: `videos${index}`,
              //             //     videosBox_s: `videosBox${index}`,
              //             //     videoPlays_s: `videoPlays${index}`,
              //             //   });
              //             // }}
              //           />
              //           <div
              //             style={{
              //               position: 'absolute',
              //               top: '0',
              //               left: '0',
              //               width: '1.1rem',
              //               height: '1.1rem',
              //               display: 'flex',
              //               justifyContent: 'center',
              //               alignItems: 'center',
              //               background: 'rgba(0, 0, 0, 0.5)',
              //               color: '#ff7a59',
              //             }}
              //             onClick={() => {
              //               setDeleteVideo(dynamicDeletionTime.video.apathZoom);
              //             }}
              //           >
              //             删除
              //           </div>
              //         </div>
              //       ) : (
              //         ''
              //       )}
              //     </>
              //   ),
              // });
              // if (result) {
              //   // onDynamicDeletion();
              //   localStorage.removeItem('NestingIframe');
              //   console.log('执行了编辑操作');
              // }
            },
          },
          {
            text: '删除',
            key: 'delete',
            onClick: async () => {
              localStorage.setItem('NestingIframe', 'true');
              const result = await Dialog.confirm({
                content: '删除将无法恢复！',
              });
              if (result) {
                onDynamicDeletion();
                localStorage.removeItem('NestingIframe');
                console.log('执行了删除操作');
              }
            },
          },
        ]}
        onClose={() => {
          localStorage.removeItem('NestingIframe');
          history.goBack();
        }}
        onAction={(action) => {
          if (action.key === 'edit' || action.key === 'copy') {
            // Toast.show(`点击了${action.text}`)
          }
        }}
        afterClose={() => {
          // Toast.show('动作面板已关闭')
        }}
      />
      {dynamicEdit && (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            top: '0',
            left: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000000,
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '75vw',
              height: '60%',
              paddingTop: '12px',
              background: '#fff',
              borderRadius: '0.2rem',
            }}
          >
            <div
              style={{
                overflowY: 'auto',
                margin: '0 auto',
                width: '100%',
                height: 'calc( 100% - 39px)',
              }}
            >
              <div
                style={{
                  padding: '0 12px 12px 12px',
                }}
              >
                {dynamicDeletionTime.content && (
                  <TextArea
                    ref={onTextArea}
                    // placeholder="请详输入你此时此刻的心情..."
                    value={textValue || dynamicDeletionTime.content}
                    rows={3}
                    onChange={(val: any) => {
                      setTextValue(val);
                    }}
                  />
                )}
                {dynamicDeletionTime.imgList ? (
                  <div
                    style={{
                      overflow: 'hidden',
                      margin: '0 auto',
                      width: '5.05rem',
                      paddingLeft: '0.21rem',
                    }}
                  >
                    {dynamicDeletionTime?.imgList.map((item: any) => {
                      for (let i = 0; i < deleteImage.length; i++) {
                        if (deleteImage[i] === item.apathZoom) {
                          return null;
                        }
                      }
                      return (
                        <div
                          key={item.apathZoom}
                          style={{
                            position: 'relative',
                            width: '1.1rem',
                            height: '1.1rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            margin: '0 0.13rem 0.13rem 0',
                            float: 'left',
                          }}
                        >
                          <img
                            className="imgIndex"
                            src={item.apathZoom}
                            alt=""
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: '0',
                              left: '0',
                              width: '1.1rem',
                              height: '1.1rem',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              background: 'rgba(0, 0, 0, 0.5)',
                              color: '#ff7a59',
                            }}
                            onClick={() => {
                              setDeleteImage([...deleteImage, item.apathZoom]);
                            }}
                          >
                            删除
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ''
                )}
                {dynamicDeletionTime.video && !deleteVideo ? (
                  <div
                    style={{
                      width: '100%',
                      position: 'relative',
                    }}
                  >
                    <img
                      style={{
                        width: '100%',
                      }}
                      className="imgIndex"
                      src={dynamicDeletionTime.video.apathZoom}
                      alt=""
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: '#ff7a59',
                      }}
                      onClick={() => {
                        setDeleteVideo(dynamicDeletionTime.video.apathZoom);
                      }}
                    >
                      删除
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="adm-dialog-footer">
              <div className="adm-dialog-action-row">
                <button
                  onClick={onCancel}
                  type="button"
                  className="adm-button adm-button-primary adm-button-block adm-button-fill-none adm-button-shape-rectangular adm-dialog-button"
                >
                  取消
                </button>
                <button
                  onClick={onDetermine}
                  type="button"
                  className="adm-button adm-button-primary adm-button-block adm-button-fill-none adm-button-shape-rectangular adm-dialog-button adm-dialog-button-bold"
                >
                  确认
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dynamic;
