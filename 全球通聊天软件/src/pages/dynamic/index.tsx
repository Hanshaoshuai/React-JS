import '../personalInformation/index.scss';
import './index.scss';
import {
  Divider,
  ImageViewer,
  Toast,
  Popup,
  TextArea,
  NoticeBar,
} from 'antd-mobile';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useHistory, Route } from 'react-router-dom';
import CameraOutList from './cameraOutList';
import HooksCropperModal from '../HooksCropperModal/HooksCropperModal';
import {
  getCircleFriends,
  friendsCircleFileUpload,
  addComments,
} from '../../api';
import {
  PlayOutline,
  CloseCircleOutline,
  KoubeiOutline,
  HeartFill,
  CameraOutline,
  CloseOutline,
  ArrowDownCircleOutline,
} from 'antd-mobile-icons';
import { MyContext } from '../../models/context';
import { moment } from '../../helpers';
let imgIndex: any = [];
let demoImages: any = [];
let toIndexId: any = null;
let scrollIndex = 0;
let videoPlaysBlock = false;
let firstEntry = false;
let firstComment = false;
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
  const { state, dispatch } = useContext(MyContext);
  const { urlPathname, recordUrl } = state;
  const [nickname] = useState<any>(localStorage.getItem('myName'));
  const [myapathZoom] = useState<any>(localStorage.getItem('myapathZoom'));
  const [headPortrait, setHeadPortrait] = useState<any>(
    localStorage.getItem('headPortrait') || ''
  );
  const [myLocName] = useState<any>(localStorage.getItem('name'));
  const [displayBlock, setDisplayBlock] = useState(false);
  const [cameraOut, setCameraOut] = useState(false);
  const [imgIdLoc] = useState<any>(
    JSON.parse(window.localStorage.getItem('imgIdLoc') || '[]')
  );
  const [circleFriendList, setCircleFriendList] = useState<any>([]);
  const [visible, setVisible] = useState(false);
  const [defaultIndex, setDefaultIndex] = useState(1);
  const [demoImagesList, setDemoImagesList] = useState<any>([]);
  const [circleFriendsBackground, setCircleFriendsBackground] = useState<any>(
    localStorage.getItem('circleFriendsBackground')
  );
  const [commentParameter, setCommentParameter] = useState<any>({});
  const [commentParameterV, setCommentParameterV] = useState<any>(false);
  const [visible5, setVisible5] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [ReplyMessage, setReplyMessage] = useState('');
  const [playbackRecord, setPlaybackRecord] = useState<any>({});
  const [personalInformation] = useState<any>(
    localStorage.getItem('personalInformation')
  );
  const [toChatName] = useState<any>(localStorage.getItem('toChatName'));
  const [pageS, setPageS] = useState(1);
  const [dataTips, setDataTips] = useState(false);
  const [nameString, setNameString] = useState('');
  const [dividerBottom, setDividerBottom] = useState(false);
  const [switchName, setSwitchName] = useState(false);

  // console.log(recordUrl);
  useEffect(() => {
    if (!display && indexId) {
      setCommentParameterV(false);
      videoPlays('null', '', 'no');
      let timeout = setTimeout(() => {
        setDisplayBlock(false);
        // goBackS(false);
        clearTimeout(timeout);
      }, 230);
    } else if (display) {
      if (name) {
        setPageS(2);
        imgIndex = [];
        demoImages = [];
      }
      setDisplayBlock(true);
      if (commentParameter.time) {
        setCommentParameterV(true);
      }
    }
    if (!labelData) {
      if (localStorage.getItem('myInformation')) {
        const { information } = JSON.parse(
          localStorage.getItem('myInformation') || '{}'
        );
        labelData = information || {};
      }
    }
    if (labelData) {
      // console.log(labelData);
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
  }, [display]);
  useEffect(() => {
    if (personalInformation) {
      if (!toNames) {
        setCircleFriendsBackground(
          circleFriendsBackground || '/images/202203120130501.jpg'
        );
      } else {
        setCircleFriendsBackground(
          toCircleFriendsBackground ||
            localStorage.getItem('circleFriendsBackgroundFriend') ||
            '/images/202203120130501.jpg'
        );
      }
    } else {
      setCircleFriendsBackground(
        circleFriendsBackground || '/images/202203120130501.jpg'
      );
    }
  }, [toCircleFriendsBackground, display]);
  useEffect(() => {
    if (urlPathname.dynamic === '2') {
      setCameraOut(true);
    } else {
      setCameraOut(false);
    }
  }, [urlPathname]);
  useEffect(() => {
    imgIndex = [];
    demoImages = [];
    setCircleFriendList([]);
    // localStorage.removeItem('personalInformation');
    return componentWillUnmount;
  }, []);
  const componentWillUnmount = () => {
    firstEntry = false;
    setPageS(1);
    imgIndex = [];
    demoImages = [];
    setCircleFriendList([]);
    firstComment = false;
  };
  useEffect(() => {
    if (!videoPlaysBlock && history.location.search !== '?comment=1') {
      videoPlays('null', 'no', 'no');
    }
    if (!history.location.search) {
      // history.push('/dynamic');
      if (commentParameterV) {
        history.replace('/dynamic');
      }
      setCommentParameterV(false);
      firstComment = false;
    }
  }, [history.location]);

  useEffect(() => {
    if (!circleFriendData) {
      const circle = localStorage.getItem('circleFriendsBackgroundLoc');
      // console.log(circle);
      if (circle) {
        // setCircleFriendList(JSON.parse(circle) || []);
      }
      getCircleFriendList();
    } else {
      let index = 0;
      setCircleFriendList(circleFriendData || []);
      circleFriendData.map((item: any) => {
        item.imgList &&
          item.imgList.map((item: any) => {
            imgIndex.push({
              url: item.apath,
              index: index,
            });
            index += 1;
            demoImages.push(item.apath);
            return item;
          });

        return item;
      });
      setDemoImagesList(demoImages);
    }
  }, [circleFriendData]);

  const getCircleFriendList = async (key?: string) => {
    if (key) {
      setSwitchName(true);
      setDividerBottom(false);
      firstEntry = false;
      imgIndex = [];
      demoImages = [];
      firstComment = false;
    }
    await getCircleFriends({
      page: key ? key : pageS,
      pageSize: 13,
      name: personalInformation ? toChatName : myLocName,
      personal: name ? true : false,
    }).then((res: any) => {
      // console.log(res);
      setSwitchName(false);
      let index = 0;
      if (res.code === 200) {
        setPageS(pageS + 1);
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

        res.data.map((item: any) => {
          item.imgList &&
            item.imgList.map((item: any) => {
              imgIndex.push({
                url: item.apath,
                index: index,
              });
              index += 1;
              demoImages.push(item.apath);
              return item;
            });

          return item;
        });
        setDemoImagesList(demoImages);
      }
    });
  };

  const goBackS = () => {
    setTabShow(false);
    if (cameraOut) {
      // history.push('/');
      // history.goBack();
      setCameraOut(false);
      return;
    }
    if (name) {
      onBack(false);
    }
    if (history.location.pathname === '/dynamic') {
      history.push(recordUrl.returnTarget);
    }
  };

  const onCameraOutline = () => {
    history.push('/personalInformation?dynamic=2');
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
    if (!index.videos_s) {
      // console.log('====', videoPlays, index, id);
      if (history.location.pathname !== '/personalInformation') {
        !firstComment &&
          firstEntry &&
          id &&
          history.replace(recordUrl.returnTarget);
      }
      if (history.location.search !== '?dynamic=8') {
        setCommentParameterV(false);
      }
      return;
    }
    const { videos_s, videosBox_s, videoPlays_s }: any = index;
    onSetCommentBlock(null);
    if (videosRef) {
      const videoList: any = document.getElementById(videos_s);
      const videosBox: any = document.getElementById(videosBox_s);
      const videoClose: any = document.getElementById(videoPlays_s);
      setPlaybackRecord({ videos_s, videosBox_s, videoPlays_s });
      if (videoPlays === 'no') {
        if (!id) {
          if (
            history.location.pathname === '/dynamic' &&
            history.location.search === '?videoPlay=1'
          ) {
            console.log(history);
            history.replace('/dynamic');
          }
          if (
            // 个人相册情况时
            history.location.pathname === '/personalInformation' &&
            history.location.search === '?personalVideo=1'
          ) {
            history.replace('/personalInformation?personalVideo=2');
          }
        } else {
          if (
            history.location.pathname === '/dynamic' &&
            history.location.search === '?videoPlay=1'
          ) {
            // console.log(history);
            history.replace('/dynamic');
          }
        }
        // console.log('====>>>>>', history.location.search);
        videoList.index = 'false';
        videoList.pause(); //暂停控制
        videoClose.style.display = 'none';
        videosBox.style.display = 'none';
        setPlaybackRecord({});
      } else {
        firstEntry = true;
        firstComment = false;
        videoList.index = 'true';
        videoClose.style.display = 'block';
        videosBox.style.display = 'block';
        videoList.play();
        if (!id) {
          if (history.location.pathname === '/dynamic') {
            history.push('/dynamic?videoPlay=1');
          }
          if (history.location.search === '?videoPlay=0') {
            // console.log(history);
            history.replace('/dynamic?videoPlay=1');
          }
          if (
            // 个人相册情况时
            history.location.pathname === '/personalInformation' &&
            history.location.search === '?personalVideo=0'
          ) {
            history.push('/personalInformation?personalVideo=1');
          }
          if (
            // 个人相册情况时
            history.location.pathname === '/personalInformation' &&
            history.location.search === '?personalVideo=2'
          ) {
            history.replace('/personalInformation?personalVideo=1');
          }
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
  }: any) => {
    // console.log(name, nickname, myLocName);
    setCommentParameterV(true);
    firstComment = true;
    if (history.location.pathname === '/personalInformation') {
      if (history.location.search === '?dynamic=1') {
        // 进入朋友朋友圈时
        history.push('/personalInformation?dynamic=8');
      } else if (history.location.search === '?dynamic=0') {
        history.replace('/personalInformation?dynamic=8');
      } else {
        if (history.location.search === '?personalVideo=0') {
          history.push('/personalInformation?comment=1');
        } else {
          history.replace('/personalInformation?comment=1');
        }
      }
    } else {
      history.push('/dynamic?comment=1');
    }

    setCommentParameter({ time, name, nickname, commentsLength, commentsList });
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
        setPageS(1);
        setDataTips(false);
        getCircleFriendList('true');
      }
    });
  };
  const onSetVisible = (url: number) => {
    onSetCommentBlock(null);
    imgIndex.map((item: any) => {
      if (item.url === url) {
        setDefaultIndex(item.index);
      }
      return item;
    });
    setVisible(true);
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
      videoPlays('null', '');
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
      Math.floor(height) === e.target.clientHeight
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
  const [searchResults, setSearchResults] = useState(false);
  const [type, setType] = useState<any>('');
  const [hooksModalFile, setHooksModalFile] = useState<any>('');
  const [hooksModalVisible, setHooksModalVisible] = useState<any>(false);

  const mockUpload = async (file: any) => {
    tabs();
    const fileN = file.target.files[0];
    let typeName = fileN.name.split('.');
    setType(typeName[typeName.length - 1]);
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
  const goFriends = (name: string) => {
    if (personalInformation && history.location.search) {
      Toast.show({
        content: '不可进入',
      });
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
    history.replace('/personalInformation?personal=1');
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
        setCommentParameterV(false);
        if (history.location.pathname === '/personalInformation') {
          if (history.location.search === '?dynamic=2') {
            // 进入朋友朋友圈时
            history.replace('/personalInformation?dynamic=0');
          } else {
            if (history.location.search === '?comment=1') {
              history.replace('/personalInformation?comment=0');
            }
          }
          // history.replace('/personalInformation?personalVideo=0');
        } else {
          history.replace('/dynamic');
        }
        onSetCommentBlock(null);
        setTextAreaValue('');
        setPageS(1);
        setDataTips(false);
        getCircleFriendList('true');
      }
    });
  };
  return (
    <div
      style={{ display: `${displayBlock || !name ? 'block' : 'none'}` }}
      className={`personalInformation ${
        display ? 'right-in-enter' : name ? 'right-in-leave' : ''
      } personalInformationDynamic`}
    >
      <div
        className="searchBox"
        style={{ backgroundColor: `rgba(255, 122, 89, ${transparency})` }}
      >
        <div className="home-search">
          <img
            src="/images/fanhui.png"
            className="xiangmu-left"
            alt=""
            onClick={goBackS}
          />
          {transparency > 0 && (
            <span>
              {personalInformation
                ? `${toNames ? toNames + '的相册' : '朋友圈'}`
                : name
                ? name
                : '朋友圈'}
            </span>
          )}
          {name && !personalInformation && !cameraOut && (
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
                        personalInformation || searchResults ? '' : 'file'
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
              aspectRatio={1.3}
            />
          )}
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
                  personalInformation
                    ? headPortraitB || myapathZoom
                    : myapathZoom
                }
                alt=""
              />
              <div className="dynamic-img-box-test">
                {personalInformation ? toNames || nickname : nickname}
              </div>
            </div>
            <div
              className={`NoticeBarName ${
                nameString.length < 15 && 'flex-end'
              }`}
            >
              <NoticeBar content={nameString} color="alert" />
            </div>
          </div>

          {name && !personalInformation && (
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
                    (personalInformation && index === 0)) &&
                  'dynamic-const-box-first'
                }`}
              >
                <div
                  className="dynamic-const-box-img"
                  onClick={() => goFriends(item.name)}
                >
                  <img src={item?.headPortrait} alt="" />
                </div>
                <div className="dynamic-const-box-text">
                  <div className="dynamic-const-box-text-name">
                    {item.nickname || item.title}
                  </div>
                  <div className="dynamic-const-box-text-test">
                    {item?.content}
                  </div>
                  <div className="dynamic-const-box-text-img">
                    {item.imgList &&
                      item.imgList.map((items: any, id: number) => {
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
                              onClick={() => onSetVisible(items.apath)}
                              src={items.apathZoom}
                              alt=""
                            />
                          </div>
                        );
                      })}
                  </div>
                  {item.video && (
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
                  )}
                  <div className="dynamic-const-box-text-bottom">
                    <div className="dynamic-const-box-text-bottom-left">
                      {moment(parseInt(item.time))}
                    </div>
                    <div className="dynamic-const-box-text-bottom-right">
                      <i
                        onClick={() =>
                          onComment({
                            time: item.time,
                            name: item.name,
                            nickname: nickname,
                            commentsLength: item.commentsLength,
                            commentsList: item.commentsList,
                          })
                        }
                      >
                        <i>{item.thumbsUpLength || 0} 赞 </i>
                        {item.commentsLength || 0} 评论
                      </i>
                      <span onClick={() => onSetCommentBlock(index)}>
                        <KoubeiOutline />
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
                            lineHeight: '0.3rem',
                            opacity: '0',
                          }}
                        >
                          <HeartFill
                            style={{
                              color: likeIt ? '#ff0000' : '#fff',
                              fontSize: '0.31rem',
                              verticalAlign: 'bottom',
                              marginRight: '0.04rem',
                            }}
                          />
                          点赞
                        </div>
                        <div
                          className="comment-button"
                          style={{
                            opacity: '0',
                          }}
                          onClick={() =>
                            onComment({
                              time: item.time,
                              name: item.name,
                              nickname: nickname,
                              commentsLength: item.commentsLength,
                              commentsList: item.commentsList,
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
                padding: `${
                  name && !personalInformation ? '0 0.9rem' : '2rem 0.9rem'
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
        }}
      >
        <CameraOutList callback={onetCameraOut} />
      </div>
      {visible && (
        <ImageViewer.Multi
          images={demoImagesList}
          visible={visible}
          defaultIndex={defaultIndex}
          onClose={() => {
            setVisible(false);
          }}
        />
      )}
      <Popup
        className="PopupBox"
        visible={commentParameterV}
        onMaskClick={() => {
          setCommentParameter({});

          if (history.location.pathname === '/personalInformation') {
            if (history.location.search === '?dynamic=8') {
              // 进入朋友朋友圈时
              history.replace('/personalInformation?dynamic=0');
            } else {
              history.push('/personalInformation?personalVideo=0');
            }
          } else {
            history.replace('/dynamic');
          }
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
              if (history.location.pathname === '/personalInformation') {
                // history.replace('/personalInformation?personalVideo=0');
                if (history.location.search === '?dynamic=8') {
                  // 进入朋友朋友圈时
                  history.replace('/personalInformation?dynamic=0');
                } else if (history.location.search === '?comment=1') {
                  history.replace('/personalInformation?comment=0');
                }
              } else {
                history.replace('/dynamic');
              }
            }}
            className="PopupTopOutline"
          />
          {commentParameter.commentsLength || 0} 条评论
        </div>
        <div className="PopupContent">
          <div className="PopupContentList">
            {commentParameter.commentsList &&
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
    </div>
  );
};

export default Dynamic;
