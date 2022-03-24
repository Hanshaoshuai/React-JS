import './index.scss';

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { InfiniteScroll, List, Divider } from 'antd-mobile';

import {
  getList,
  getImage,
  getBuddyList,
  messageClear,
  informationDetails,
} from '../../api';
import { moment } from '../../helpers';
import Spins from '../A-Spin';

import VideoCallPlay from '../chatroom/videoCallPlay';
import { setBadge } from '../../actions';

import { MyContext } from '../../models/context';

let badge: number = 0;
let pageS = 1;
// let pageSId = false;
const ChatRecord = () => {
  const history = useHistory();
  const { state, messages, dispatch } = useContext(MyContext);
  const { pathname } = state;
  const [localName] = useState<any>(localStorage.getItem('name') || '');
  const [myNameL] = useState<any>(localStorage.getItem('myName') || '');
  const [tabShow, setTabShow] = useState<any>(false);
  const [dataList, setDataList] = useState<any>([]);
  const [dataListL, setDataListL] = useState<any>(true);
  const [hasMore, setHasMore] = useState(true);
  const [friendList, setFriendList] = useState<any>([]);
  const [imgeSrc, setImgeSrc] = useState<any>();
  const [myHeadPortrait] = useState<any>(
    localStorage.getItem('myHeadPortrait') || ''
  );
  const [myapathZoom] = useState<any>(
    localStorage.getItem('myapathZoom') || ''
  );
  const [getBuddyListsL, setGetBuddyListsL] = useState<any>(
    JSON.parse(localStorage.getItem('getBuddyLists') || '[]')
  );
  const [boxList, setBoxList] = useState<any>(false);
  const [videoCalls, setVideoCalls] = useState(false);
  const [actionName, setActionName] = useState('切换语音');
  const [onFinish, setOnFinish] = useState(false);
  const [toChatName, settoChatName] = useState('');
  const [introduce, setIntroduce] = useState(false);
  const [dividerBlock, setDividerBlock] = useState(false);

  useEffect(() => {
    localStorage.removeItem('addSearchFriends');
    localStorage.removeItem('personalInformation');
    localStorage.removeItem('groupName');
    localStorage.removeItem('fromType');

    if (myHeadPortrait && myapathZoom) {
      setImgeSrc(localStorage.getItem('myapathZoom'));
    } else if (localName && localName !== '') {
      // const list: any = { imgId: localStorage.getItem("imgId") };
      // list.id = localName;
      // getImage(list).then((data) => {
      //   // console.log(data);
      //   if (data.code === 200 && data.body.length > 0) {
      //     setImgeSrc(data.body[0].classIcon);
      //     localStorage.setItem("myHeadPortrait", data.body[0].classIcon);
      //   }
      // });
      informationDetails({
        toChatName: localName,
        myName: myNameL,
        type: 'chat',
      }).then((data) => {
        // console.log(data);
        if (data.code && data.imges) {
          setImgeSrc(data.apathZoom);
          localStorage.setItem('myHeadPortrait', data.imges);
          localStorage.setItem('myapathZoom', data.apathZoom);
        }
      });
    }
  }, [myHeadPortrait]);
  useEffect(() => {
    //消息监听
    getBuddyLists();
    // if (messages.icon && messages.name === localName) {
    //   localStorage.setItem("myHeadPortrait", messages.icon);
    //   setImgeSrc(messages.icon);
    // }
    // console.log(messages);
    if (
      messages?.text?.VideoAndVoice === '视频' &&
      messages?.text?.toName === localName
    ) {
      setVideoCalls(true);
      settoChatName(messages.text.toName);
    } else if (
      messages?.text?.VideoAndVoice === '语音' &&
      messages?.text?.toName === localName
    ) {
      setVideoCalls(true);
      setActionName('静音');
      settoChatName(messages.text.toName);
    } else if (
      messages?.text?.VideoAndVoice === '通话结束' &&
      messages?.text?.toName === localName
    ) {
      setOnFinish(true);
    }
  }, [messages]);
  useEffect(() => {
    if (window.location.search === '?list') {
      options(2);
    } else {
      options(1);
    }
  }, [pathname]);

  useEffect(() => {
    setDataList([]);
    setHasMore(true);
    pageS = 1;
    loadMore();
    // console.log('00000');
  }, [history.location.search]);

  const onGetList = async () => {
    const data_1 = await getList({
      type: 'chat',
      page: pageS,
      pageSize: 13,
      buildingGroup: 'no',
    });
    // console.log(data);
    if (data_1.code === 200) {
      pageS += 1;
      localStorage.setItem('getDataList', JSON.stringify(data_1.body));
      // setDataList(data.body);
      setDataListL(false);
      setDataList((val: any) => [...val, ...data_1.body]);
      setHasMore(data_1.body.length > 0);
    }
  };

  const loadMore: any = async () => {
    await onGetList();
  };

  const videoCallCancel = () => {
    setVideoCalls(false);
    setOnFinish(false);
    if (onFinish) return;
    window.socket.emit('clientmessage', {
      fromName: localName,
      toName: localStorage.getItem('toChatName') || '',
      text: `${'通话'}结束`,
      VideoAndVoice: '通话结束',
    });
  };

  const getBuddyLists = (location?: string) => {
    if (getBuddyListsL && getBuddyListsL.length > 0) {
      setFriendList(getBuddyListsL);
    }
    getBuddyList({ name: localName }).then((data) => {
      // console.log(data);
      if (data.code === 200) {
        if (data.body?.length > 0) {
          badge = 0;
          setFriendList(data.body);
          setGetBuddyListsL(data.body);
          localStorage.setItem('getBuddyLists', JSON.stringify(data.body));
          if (location) {
            history.push('/chatroom');
          }
        }
      }
    });
  };

  const goBackS = () => {
    // history.push('/personalInformation?personal=1');
    history.push(
      `/personalInformation?personal=1&my-${new Date().getTime()}=${JSON.stringify(
        {
          name: localName || '',
        }
      )}`
    );
  };

  const linkFriends = (
    nickName: string,
    name: { toString: () => string },
    headPortrait: string
  ) => {
    // console.log("添加好友验证消息", nickName, name);
    // console.log(history);
    const { pathname, search } = history.location;
    localStorage.setItem('comeFrom', `${pathname}${search}`);
    if (name !== localName) {
      localStorage.setItem('fromType', 'All');
      localStorage.setItem('type', 'chat');
      localStorage.setItem('headPortrait', headPortrait);
      localStorage.setItem('toNames', name.toString());
      localStorage.setItem('nickName', nickName);
      localStorage.setItem('toChatName', name.toString());
      localStorage.setItem('personalInformation', '1');
    }
    // history.push('/personalInformation?personal=1');
    history.push(
      `/personalInformation?personal=1&my-${new Date().getTime()}=${JSON.stringify(
        {
          name: name || '',
        }
      )}`
    );
  };

  const claerNumeber = (
    remarksNuber: string,
    textName: string,
    groupOwner: string,
    localNumber: string | number,
    nickNameGrou: string,
    nickName1: string,
    text: string,
    fromName: string | null,
    toName: string,
    friendName: string,
    toNames: string,
    headPortrait: string,
    sex: string,
    toFriends: string,
    show?: any
  ) => {
    // 消息清零
    window.localStorage.setItem('type', 'chat');
    window.localStorage.setItem('toChatName', friendName);
    window.localStorage.setItem('toNames', toNames);
    window.localStorage.setItem('nickName', nickName1);
    window.localStorage.setItem('fromName', toName);
    window.localStorage.setItem('headPortrait', headPortrait);
    window.localStorage.setItem('sex', sex);
    getBuddyLists('location');
    if (!show) {
      messageClear({
        fromName: friendName,
        myName: localName,
        clear: 'ok',
        friends: toFriends,
      })
        .then((data) => {
          if (data.code === 200) {
            // alert(data.msg);
          }
        })
        .catch((err) => {});
    }
  };

  const toChat = (
    remarksNuber: string,
    textName: string,
    groupOwner: string,
    localNumber: any,
    nickNameGrou: string,
    nickName1: string,
    text: string,
    fromName: string | null,
    toName: string,
    friendName: string,
    toNames: string,
    headPortrait: string,
    sex: string,
    toFriends: string,
    groupName: string,
    imgIdLocs: any,
    groupNameLocs: any
  ) => {
    //			console.log(remarksNuber,textName,groupOwner,localNumber,nickNameGrou,nickName1,text,fromName,toName,friendName,toNames,headPortrait,sex,toFriends);
    localStorage.setItem('textName', textName);
    localStorage.setItem('remarksNuber', remarksNuber);
    if (groupName) {
      localStorage.setItem('groupName', groupName);
    }
    if (text === 'yes') {
      // console.log(toName);
      claerNumeber(
        remarksNuber,
        textName,
        groupOwner,
        localNumber,
        nickNameGrou,
        nickName1,
        text,
        fromName,
        toName,
        friendName,
        toNames,
        headPortrait,
        sex,
        toFriends
      );
    } else {
      if (text === 'no' && fromName !== localName) {
        if (textName === 'no') {
          claerNumeber(
            remarksNuber,
            textName,
            groupOwner,
            localNumber,
            nickNameGrou,
            nickName1,
            text,
            fromName,
            toName,
            friendName,
            toNames,
            headPortrait,
            sex,
            toFriends
          );
          return;
        }
        // console.log(friendName,toNames);
        // for (var i = 0; i < imgIdLoc.length; i++) {
        //   if (imgIdLoc[i].length === localNumber) {
        localStorage.setItem('imgIdLoc', JSON.stringify(imgIdLocs));
        localStorage.setItem('toChatName', JSON.stringify(groupNameLocs));
        //   }
        // }
        localStorage.setItem('groupOwner', groupOwner);
        localStorage.setItem('localNumber', localNumber);
        localStorage.setItem('nickName', nickNameGrou);
        localStorage.setItem('type', 'groupChat');
        localStorage.setItem('toNames', toNames);
        localStorage.setItem('fromName', toName);
        localStorage.setItem('headPortrait', headPortrait);
        getBuddyLists('location');
        // 消息清零
        messageClear({
          fromName: localName,
          myName: localStorage.getItem('toChatName'),
          clear: 'ok',
          friends: toFriends,
          type: 'groupChat',
          nickName: nickNameGrou,
        })
          .then((data) => {
            if (data.code === 200) {
              // alert(data.msg);
            }
          })
          .catch((err) => {});
      } else if (fromName !== '' && fromName === localName) {
        // console.log(toNames);
        claerNumeber(
          remarksNuber,
          textName,
          groupOwner,
          localNumber,
          nickNameGrou,
          nickName1,
          text,
          fromName,
          toName,
          friendName,
          toNames,
          headPortrait,
          sex,
          toFriends,
          'no'
        );
      }
    }
  };

  const tabs = () => {
    setTabShow(!tabShow);
  };
  const tabsHid = () => {
    if (tabShow) {
      setTabShow(false);
      setIntroduce(false);
    }
  };

  const options = (type: number) => {
    if (type !== 6) {
      tabsHid();
    }
    if (type === 1) {
      setBoxList(false);
      history.push('/');
      return;
    }
    if (type === 2) {
      setBoxList(true);
      if (dataList.length) {
        return;
      }
      // onGetList();
      // getList({
      //   type: 'chat',
      //   page: 1,
      //   pageSize: 1000,
      //   buildingGroup: 'no',
      // }).then((data) => {
      //   // console.log(data);
      //   if (data.code === 200) {
      //     setDataList(data.body);
      //     setDataListL(false);
      //   }
      // });
      return;
    }
    if (type === 3) {
      history.push('/buildGroup');
      return;
    }
    if (type === 4) {
      history.push('/personalInformation');
      localStorage.setItem('addSearchFriends', '1');
      return;
    }
    if (type === 5) {
      return;
    }
    if (type === 6 && !introduce) {
      setIntroduce(true);
    }
    if (type === 7) {
      history.push('projectInstance');
    }
  };

  const boxRef = useCallback(
    (node: any) => {
      if (node) {
        if (node.offsetHeight + 51.9 >= document.documentElement.clientHeight) {
          node.style.paddingBottom = '0.9rem';
        }
      }
    },
    [dataList]
  );
  const boxRef1 = useCallback(
    (node: any) => {
      if (node) {
        if (node.offsetHeight + 51.9 >= document.documentElement.clientHeight) {
          node.style.paddingBottom = '0.9rem';
        }
      }
    },
    [friendList]
  );
  const constList = useMemo(() => {
    badge = 0;
    return friendList.map((item: any, index: any) => {
      var text = 'no',
        fromName = 'no',
        toName = 'no',
        newsNumber: any = '',
        friendName = '',
        toNames = '',
        headPortrait = '',
        chatRecord = '',
        toFriends = '',
        sex = '',
        remarksName = '',
        myRegion = '',
        remarksNuber = 'no';
      friendName = item.name;
      toNames = item.nickName;
      // headPortrait = item.headPortrait;
      headPortrait = item.apathZoom;

      if (item.name === localStorage.getItem('name')) {
        window.localStorage.setItem('mySex', item.sex);
        window.localStorage.setItem('LLNumber', item.LLNumber);
        if (item.myRegion) {
          window.localStorage.setItem('myRegion', item.myRegion);
        } else {
          window.localStorage.setItem('myRegion', '');
        }
        friendName = item.name;
        toNames = item.nickName;
        // headPortrait = item.headPortrait;
        headPortrait = item.apathZoom;
        sex = item.sex;
      }
      item.linkFriends.map((e: any) => {
        if (e.friendName === localName && e.adopt === 'yes') {
          text = 'yes';
          fromName = e.fromName;
          toName = e.toName;
          newsNumber = e.newsNumber;
          remarksNuber = e.remarksNuber;
          badge += newsNumber * 1;
          if (e.remarksName) {
            remarksName = e.remarksName;
          }
          if (e.chatRecord && e.chatRecord.addName) {
            if (e.chatRecord.addName === myNameL) {
              chatRecord = `来自 ${e.toName} 好友验证请求`;
            } else {
              chatRecord = '您向对方发送了好友验证请求！请耐心等待...';
            }
          } else {
            if (e.chatRecord.friends === 'yes') {
              if (e.chatRecord.from === localName) {
                chatRecord = '你通过了对方的好友验证请求，现在可以开始聊天啦😄';
              } else {
                chatRecord = e.chatRecord.text;
              }
            } else {
              if (e.chatRecord.friends === 'no') {
                chatRecord = '对方拒绝了您的好友验证请求！';
                toFriends = 'no';
              } else {
                chatRecord = e.chatRecord;
              }
            }
          }
        } else {
          if (e.friendName === localName) {
            fromName = e.fromName;
            toName = e.toName;
            newsNumber = e.newsNumber;
            badge += newsNumber * 1;
            if (e.remarksName) {
              remarksName = e.remarksName;
            }
            if (e.toName === '') {
              if (e.chatRecord && e.chatRecord.addName) {
                chatRecord = '您向对方发送了好友验证请求！请耐心等待...';
              } else {
                if (e.adopt === '') {
                  text = 'yes';
                  toFriends = 'no';
                  chatRecord = '对方拒绝了您的好友验证请求！';
                } else {
                  chatRecord = e.chatRecord;
                }
              }
            } else {
              if (e.chatRecord && e.chatRecord.addName) {
                chatRecord = `来自 ${e.toName} 的好友验证请求！`;
              } else {
                if (e.adopt === '') {
                  text = 'yes';
                  toFriends = 'no';
                  chatRecord = '您拒绝了对方的好友验证请求！';
                } else {
                  chatRecord = e.chatRecord;
                }
              }
            }
          }
        }
        return e;
      });
      let css_b = '',
        nickName = item.nickName,
        nickName1 = 'no',
        imga_first = 'block',
        imga_last = 'none',
        localNumber = 0,
        nickNameGrou = 'no',
        imgList = [],
        groupChatNumber = null,
        groupOwner = 'no',
        textName = 'no';
      if (newsNumber * 1 === 0) {
        css_b = 'fromumber';
      } else {
        css_b = '';
      }
      // console.log('lllll',toNames)
      if (remarksName !== '') {
        nickName = remarksName;
        nickName1 = remarksName;
      } else {
        nickName1 = nickName;
      }
      if (item.buildingGroupName) {
        groupOwner = item.groupOwner;
        // imgIdLoc = item.imgId;
        // groupNameLoc = item.name;
        // console.log('lllll',groupNameLoc)
        localNumber = item.imgId.length;
        nickName = item.buildingGroupName;
        toNames = item.buildingGroupName;
        nickNameGrou = nickName;
        textName = item.textName;
        for (var q = 0; q < localNumber; q++) {
          imgList.push(item.imgId[q].classIcon);
        }
        if (item.text === '') {
          chatRecord = '可以开始群聊啦！';
        } else {
          chatRecord = item.text;
        }
        imga_first = 'none';
        imga_last = 'block';
        groupChatNumber = item.linkFriends;
        for (var p = 0; p < item.name.length; p++) {
          // console.log(groupChatNumber[p].name,'----',groupChatNumber[p].newsNumber)
          if (
            item.name[p].name === localName &&
            item.name[p].newsNumber * 1 === 0
          ) {
            css_b = 'fromumber';
            break;
          } else if (item.name[p].name === localName) {
            css_b = '';
            newsNumber = item.name[p].newsNumber * 1;
            badge += newsNumber * 1;
          }
        }
      }
      return (
        <div
          className="content-food"
          key={index}
          onClick={() =>
            toChat(
              remarksNuber,
              textName,
              groupOwner,
              localNumber,
              nickNameGrou,
              nickName1,
              text,
              fromName,
              toName,
              friendName,
              toNames,
              headPortrait,
              sex,
              toFriends,
              item.groupName,
              item.imgId,
              item.name
            )
          }
        >
          <div className="imgas">
            <p style={{ display: `${imga_first}` }}>
              <img className="border" src={item.apathZoom} alt="" />
            </p>
            <p
              style={{
                display: `${imga_last}`,
                border: '1px #dddddd solid',
                background: '#f5f4f9',
              }}
            >
              {imgList.map((i: any, keys: any) => {
                return (
                  <a key={keys}>
                    <img className="border_s" src={i} alt="" />
                  </a>
                );
              })}
            </p>
            <span className={`hint ${css_b}`}>
              {newsNumber > 99 ? '99+' : newsNumber}
            </span>
          </div>
          <div className="texts">
            <span className="first">{nickName}</span>
            <span className="lalst">{chatRecord ? chatRecord : '图片...'}</span>
            <div className="texts-bottom border-bottom"></div>
          </div>
          <div className="times">{moment(parseInt(item.dateTime))}</div>
        </div>
      );
    });
  }, [friendList]);

  useEffect(() => {
    dispatch({ type: 'badge', badge: badge });
  }, [friendList]);

  const onScroll = (e: any) => {
    setTabShow(false);
    // console.log(
    //   e.target.clientHeight,
    //   e.target.scrollTop,
    //   e.target.scrollHeight
    // );
    // console.log(e.target.scrollTop - scrollIndex);
    let height = e.target.scrollHeight - e.target.scrollTop;
    if (
      Math.ceil(height) === e.target.clientHeight ||
      Math.floor(height) === e.target.clientHeight
    ) {
      if (!hasMore) return;
      // console.log(1);
      setDividerBlock(true);
      loadMore();
    }
  };
  return (
    <>
      <div className="yijian">
        {tabShow && <div className="auxiliary-box" onClick={tabsHid}></div>}
        <div className="xiangmu-header">
          {!boxList && (
            <span onClick={goBackS} className="xiangmu-left">
              <img src={imgeSrc} alt="" id="img" />
            </span>
          )}
          <span className="xiangmu-left-go"></span>
          <span>{boxList ? '人员列表' : '聊聊'}</span>
          <img
            src="/images/dashujukeshihuaico.png"
            alt=""
            className="xiangmu-rigth"
            onClick={tabs}
          />
          <ul className={`${tabShow ? 'show' : ''}`}>
            <li onClick={() => options(1)}>好友</li>
            {/* <li onClick={() => options(2)}>人员列表</li> */}
            <li onClick={() => options(3)}>发起群聊</li>
            <li onClick={() => options(4)}>添加好友</li>
            <Link
              style={{ color: 'inherit' }}
              target="_blank"
              to={{
                pathname: '/threejs',
                search: 'navigation=assetStatistics&state=project',
              }}
            >
              <li onClick={() => options(5)}>扫一扫</li>
            </Link>
            <li onClick={() => options(6)}>
              近期项目简介
              {introduce && (
                // <div className="introduce" onClick={() => options(7)}>
                //   访问韩少帅项目简介
                // </div>
                <ul className={`${tabShow ? 'show introduce' : ''}`}>
                  <li onClick={() => options(7)}>查看韩少帅所负责项目</li>
                  <li onClick={() => options(8)}>我的负责项目</li>
                </ul>
              )}
            </li>
          </ul>
        </div>
        {/* {boxList && ( */}
        <div
          className={`box ${!boxList ? 'box_list' : ''}`}
          onScroll={onScroll}
        >
          <div className="fankiu" ref={boxRef}>
            <div
              style={{
                width: '100%',
                height: '0.9rem',
                background: '#f5f4f9',
              }}
            ></div>
            {/* <List> */}
            {dataList.map((item: any) => {
              return (
                <div
                  key={`${item.name}`}
                  className="content-food "
                  onClick={() =>
                    linkFriends(item.nickName, item.name, item.apathZoom)
                  }
                >
                  <div className="imgas">
                    <p>
                      <img className="border" src={item.apathZoom} alt="" />
                    </p>
                    <span style={{ display: 'none' }}></span>
                  </div>
                  <span className="texts">
                    {item.nickName}
                    <div className="texts-bottom border-bottom"></div>
                  </span>
                </div>
              );
            })}
            {/* </List>
              <InfiniteScroll loadMore={loadMore} hasMore={hasMore} /> */}
            {dividerBlock && (
              <div className="box_Divider">
                <Divider>{!hasMore ? '没有更多了' : '加载更多'}</Divider>
              </div>
            )}
          </div>
        </div>
        {/* )} */}
        <div className="box box_friend">
          <div
            className="fankiu"
            style={{ paddingTop: '0.9rem' }}
            ref={boxRef1}
          >
            {/* {friendList.length > 0
            ? friendList.map((item: any) => {
                return item;
              })
            : ""} */}
            {friendList.length > 0 ? constList : ''}
          </div>
          {friendList.length === 0 ? (
            <div className="bottom">暂无好友</div>
          ) : (
            ''
          )}
        </div>
        {((!dataList.length && dataListL && boxList) ||
          (!friendList.length && !boxList)) && (
          <Spins styleSize={[65, 33]} color={'#ff7a59'} fontSize={'33px'} />
        )}
      </div>
      {videoCalls && (
        <VideoCallPlay
          call={false}
          onStartQuery={videoCalls}
          videoCallCancel={videoCallCancel}
          actionName={actionName}
          onFinish={onFinish}
          chatNames={localStorage.getItem('toChatName')}
          locMyName={myNameL}
        />
      )}
    </>
  );
};

export default ChatRecord;
