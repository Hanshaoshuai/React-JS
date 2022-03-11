import '../personalInformation/index.scss';
import './index.scss';
import { ImageViewer } from 'antd-mobile';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CameraOutList from './cameraOutList';
import { getCircleFriends } from '../../api';
import {
  PlayOutline,
  CloseCircleOutline,
  KoubeiOutline,
  HeartFill,
  CameraOutline,
} from 'antd-mobile-icons';
import { moment } from '../../helpers';
let imgIndex: any = [];
let indexId: any = null;
const Dynamic = ({ name, onBack, display, indexId }: any) => {
  const history = useHistory();
  const videosRef: any = useRef(null);
  const [headPortrait] = useState<any>(localStorage.getItem('headPortrait'));
  const [myLocName] = useState<any>(localStorage.getItem('name'));
  const [displayBlock, setDisplayBlock] = useState(false);
  const [cameraOut, setCameraOut] = useState(false);
  const [imgIdLoc] = useState<any>(
    JSON.parse(window.localStorage.getItem('imgIdLoc') || '[]')
  );
  const [circleFriendList, setCircleFriendList] = useState<any>([]);
  const [plays, setplays] = useState(false);
  const [commentBlock, setCommentBlock] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [defaultIndex, setDefaultIndex] = useState(1);
  const [demoImagesList, setDemoImagesList] = useState<any>([]);

  useEffect(() => {
    if (!display && indexId) {
      let timeout = setTimeout(() => {
        setDisplayBlock(false);
        // goBackS(false);
        clearTimeout(timeout);
      }, 230);
    } else if (display) {
      setDisplayBlock(true);
    }
  }, [display]);

  useEffect(() => {
    getCircleFriendList();
  }, []);

  const getCircleFriendList = () => {
    imgIndex = [];
    let demoImages: any = [];
    getCircleFriends({
      name: myLocName,
      personal: name ? true : false,
    }).then((res: any) => {
      console.log(res);
      let index = 0;
      if (res.code === 200) {
        setCircleFriendList(res.data);
        res.data.map((item: any) => {
          item?.imgList.map((item: any) => {
            index += 1;
            imgIndex.push({
              url: item.apath,
              index: index,
            });
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
    if (cameraOut) {
      setCameraOut(false);
      return;
    }
    if (name) {
      onBack(false);
    } else {
      history.goBack();
    }
  };

  const toChat = (classIcon: string, name: string, nickName: any) => {
    // console.log(classIcon, name);
    localStorage.setItem('headPortrait_groupChat', classIcon);
    localStorage.setItem('headPortrait', classIcon);
    localStorage.setItem('nickName', nickName);
    localStorage.setItem('toNames', nickName);
    localStorage.setItem('toChatName', name);
    localStorage.setItem('fromName', name);
    localStorage.setItem('personalInformation', '1');

    localStorage.setItem('type', 'chat');

    history.push('/personalInformation');
  };
  const onCameraOutline = () => {
    setCameraOut(true);
  };
  const onetCameraOut = () => {
    getCircleFriendList();
    setCameraOut(false);
  };
  const videoPlays = (videoPlays: any, index: number) => {
    // 视频开关
    if (videosRef) {
      const videoList: any = videosRef.current.getElementsByClassName('videos');
      const videoClose: any =
        videosRef.current.getElementsByClassName('videoPlays');
      [...videoList].map((item: any, index: number) => {
        item.style.display = 'none';
        videoClose[index].style.display = 'none';
        return item;
      });
      if (videoPlays === null) return;
      if (videoPlays === 'no') {
        videoClose[index].style.display = 'none';
        videoList[index].style.display = 'none';
        // setplays(!plays);
      } else {
        videoClose[index].style.display = 'block';
        videoList[index].style.display = 'block';
        videoList[index].play();
      }
    }

    // if (videoPlays === 'no' || videoPlays === 'play') {
    //   setplays(!plays);
    // }
  };
  const onComment = (e: any) => {
    console.log(e);
  };
  const onSetVisible = (url: number) => {
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
      [...comment].map((item: any, index: number) => {
        item.style.padding = '0';
        item.style.width = '0';
        giveThumbsButton[index].style.opacity = '0';
        commentButton[index].style.opacity = '0';
        return item;
      });
      // console.log(comment[index].style.width);
      if (index === null) return;
      if (indexId !== index) {
        indexId = index;
        comment[index].style.padding = '0 0.4rem';
        comment[index].style.width = '2.3rem';
        giveThumbsButton[index].style.opacity = '1';
        commentButton[index].style.opacity = '1';
      } else {
        indexId = null;
        comment[index].style.padding = '0';
        comment[index].style.width = '0';
        giveThumbsButton[index].style.opacity = '0';
        commentButton[index].style.opacity = '0';
      }
    }
  };
  const onScroll = () => {
    indexId = null;
    onSetCommentBlock(null);
    videoPlays(null, 0);
  };
  return (
    <div
      style={{ display: `${displayBlock || !name ? 'block' : 'none'}` }}
      className={`personalInformation ${
        display ? 'right-in-enter' : name ? 'right-in-leave' : ''
      } personalInformationDynamic`}
    >
      <div className="searchBox">
        <div className="home-search">
          <img
            src="/images/fanhui.png"
            className="xiangmu-left"
            alt=""
            onClick={goBackS}
          />
          <span>{name ? name : '朋友圈'}</span>
        </div>
      </div>
      <div
        onScroll={onScroll}
        ref={videosRef}
        className="contents contents_search_leng"
      >
        <div className="dynamic-box">
          <div className="dynamic-img">
            {/* {imgIdLoc.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="font_list"
                  onClick={() =>
                    toChat(item.classIcon, item.name, item.nickName)
                  }
                >
                  <img className="border" src={item.classIcon} alt="" />
                  <span className={'names'}>{item.nickName}</span>
                </div>
              );
            })} */}
            <img className="dynamic-img-cont" src="" alt="" />
            <div className="dynamic-img-box">
              <img src={headPortrait} alt="" />
              <div className="dynamic-img-box-test">老大哥黑经典服饰</div>
            </div>
          </div>

          {name && (
            <div className="dynamic-const-box">
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
              <div className="border-bottom"></div>
            </div>
          )}
          {circleFriendList.map((item: any, index: number) => {
            return (
              <div
                key={`${item?.title}_${index}`}
                className="dynamic-const-box"
              >
                <div className="dynamic-const-box-img">
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
                    {item?.imgList.map((item: any, id: number) => {
                      return (
                        <img
                          onClick={() => onSetVisible(item.apath)}
                          key={`${item?.title}_${id + index}`}
                          src={item.apathZoom}
                          alt=""
                        />
                      );
                    })}
                  </div>
                  {item.video && (
                    <div className="otherItemsListVideos">
                      <span
                        className="PlayOutline"
                        style={{ display: 'block' }}
                      >
                        <PlayOutline
                          onClick={(e: any) => {
                            // console.log(e, e.target.id, );
                            videoPlays('play', index);
                          }}
                        />
                      </span>
                      <span
                        style={{ display: 'none' }}
                        className="videoPlays"
                        onClick={(e: any) => videoPlays('no', index)}
                      >
                        <CloseCircleOutline className="video-closure-icon" />
                      </span>
                      <img
                        className="imgIndex"
                        style={{ display: 'block' }}
                        src={item.video.apathZoom}
                        alt=""
                        onClick={(e: any) => {
                          console.log(e.id);
                          videoPlays('play', index);
                        }}
                      />
                      <video
                        style={{ display: 'none' }}
                        className="videos"
                        controls={true}
                        autoPlay={true}
                        // name="media"
                        // muted="muted"
                        // onClick={videoPlays}
                      >
                        <source src={`${item.video.apath}`} type="" />
                      </video>
                    </div>
                  )}
                  <div className="dynamic-const-box-text-bottom">
                    <div className="dynamic-const-box-text-bottom-left">
                      {moment(parseInt(item.time))}
                    </div>
                    <div className="dynamic-const-box-text-bottom-right">
                      <i>{item.comment?.quantity}</i>
                      {item.comment?.quantity && '条'}
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
                          className="give-thumbs-up-button"
                          style={{
                            opacity: '0',
                          }}
                        >
                          <HeartFill
                            style={{
                              fontSize: '0.29rem',
                              verticalAlign: 'top',
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
                            onComment({ item: item.time, name: item.name })
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
        </div>
      </div>
      {cameraOut && (
        <div
          style={{
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
      )}
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
    </div>
  );
};

export default Dynamic;
