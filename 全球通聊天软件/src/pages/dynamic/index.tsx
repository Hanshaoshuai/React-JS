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
let toIndexId: any = null;
let scrollIndex = 0;
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
      // console.log(res);
      let index = 0;
      if (res.code === 200) {
        setCircleFriendList(res.data);
        res.data.map((item: any) => {
          item?.imgList.map((item: any) => {
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

  const onCameraOutline = () => {
    setCameraOut(true);
  };
  const onetCameraOut = () => {
    getCircleFriendList();
    setCameraOut(false);
  };
  const videoPlays = (videoPlays: any, index: number) => {
    // 视频开关
    // console.log('9999');
    if (videosRef) {
      const videoList: any = videosRef.current.getElementsByClassName('videos');
      const imgIndex: any =
        videosRef.current.getElementsByClassName('imgIndex');
      const videoClose: any =
        videosRef.current.getElementsByClassName('videoPlays');
      const PlayOutline: any =
        videosRef.current.getElementsByClassName('PlayOutline');
      for (let i = 0; i < videoList.length; i++) {
        videoList[i].style.display = 'none';
        videoClose[i].style.display = 'none';
        imgIndex[i].style.display = 'block';
        PlayOutline[i].style.display = 'block';
        videoList[index].pause(); //暂停控制
      }
      if (videoPlays === 'null') {
        return;
      }
      if (videoPlays === 'no') {
        PlayOutline[index].style.display = 'block';
        videoClose[index].style.display = 'none';
        videoList[index].style.display = 'none';
        imgIndex[index].style.display = 'block';
        videoList[index].pause(); //暂停控制
      } else {
        PlayOutline[index].style.display = 'none';
        imgIndex[index].style.display = 'none';
        videoClose[index].style.display = 'block';
        videoList[index].style.display = 'block';
        videoList[index].play();
      }
    }
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
      for (let i = 0; i < comment.length; i++) {
        comment[i].style.padding = '0';
        comment[i].style.width = '0';
        giveThumbsButton[i].style.opacity = '0';
        commentButton[i].style.opacity = '0';
      }

      if (index === null) return;
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
  const onScroll = (e: any) => {
    // console.log(
    //   e.target.clientHeight,
    //   e.target.scrollTop,
    //   e.target.scrollHeight
    // );
    // console.log(e.target.scrollTop - scrollIndex);
    if (
      e.target.scrollTop - scrollIndex > 130 ||
      e.target.scrollTop - scrollIndex < -130
    ) {
      onSetCommentBlock(null);
      videoPlays('null', 0);
      scrollIndex = e.target.scrollTop;
    }
    toIndexId = null;
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
                        <div className="dynamic-const-box-text-img-list">
                          <img
                            onClick={() => onSetVisible(item.apath)}
                            key={`${item?.title}_${id + index}`}
                            src={item.apathZoom}
                            alt=""
                          />
                        </div>
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
                          onClick={() => {
                            videoPlays('play', index);
                          }}
                        />
                      </span>
                      <span
                        style={{ display: 'none' }}
                        className="videoPlays"
                        onClick={() => videoPlays('no', index)}
                      >
                        <CloseCircleOutline className="video-closure-icon" />
                      </span>
                      <img
                        className="imgIndex"
                        style={{ display: 'block' }}
                        src={item.video.apathZoom}
                        alt=""
                        onClick={() => {
                          videoPlays('play', index);
                        }}
                      />
                      <video
                        style={{ display: 'none' }}
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
