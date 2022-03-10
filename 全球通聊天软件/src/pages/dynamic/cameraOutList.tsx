import './index.scss';
import React, { useEffect, useState, useRef } from 'react';
import { ImageUploader, Toast, ProgressBar } from 'antd-mobile';
import {
  MovieOutline,
  CloseCircleOutline,
  PlayOutline,
} from 'antd-mobile-icons';
import { FriendsCircleUpload } from './friendsCircleUpload';
import { SetVideoImg } from './friendsCircleUpload/fileUploadCircle';
import { onUploadProgress } from '../../services/request';

const CameraOutList = () => {
  const fs1: any = useRef(null);
  const [percent, setpercent] = useState(90);
  const [cameraOut, setCameraOut] = useState(false);
  const [inputContent, setInputContent] = useState('');
  const [fileList, setFileList] = useState<any[]>([]);
  const [videoList, setVideoList] = useState<any>([]);
  const [videoImgUrl, setVideoImgUrl] = useState<any>('');
  const [imgFileList, setImgFileList] = useState<any>([]);
  const [plays, setplays] = useState(false);
  const [onPlayUrl, setOnPlayUrl] = useState<any>('');
  //   useEffect(() => {
  //     // console.log(fileList);
  //   }, [fileList]);

  const onchange = () => {};
  const contenteditable = (e: any) => {
    // console.log(e.target.innerText);
    setInputContent(e.target.innerText);
  };
  const mockUpload: any = (file: File) => {
    // console.log(file);
    return {
      url: URL.createObjectURL(file),
    };
  };
  const beforeUploadImg: any = (file: any) => {
    // console.log([...imgFileList, ...file]);
    setImgFileList(imgFileList.concat(file));
    return file;
  };
  const beforeUpload: any = async (e: any) => {
    // console.log(e);
    if (!e.length) return;
    var url = URL.createObjectURL(e[0]);
    const videoImgUrl = await SetVideoImg({ fileList: e });
    setVideoImgUrl(videoImgUrl);
    setOnPlayUrl(url);
    setVideoList(e);
  };
  const videoPlays = (videoPlays: any) => {
    // 视频开关
    if (videoPlays === 'no' || videoPlays === 'play') {
      setplays(!plays);
    } else if (videoPlays === 'deleteFl') {
      fs1.current.value = null;
      setVideoImgUrl('');
      setOnPlayUrl('');
    }
  };
  const release = async () => {
    // if(!inputContent){
    //     Toast.show(`添加发布内容`)
    // }
    if (cameraOut) return;
    // upload();
    setCameraOut(true);
    let resultsImg = null;
    let resultsVideo = null;
    if (!inputContent && !videoImgUrl && !fileList.length) {
      Toast.show(`没有要发布的内容！`);
      return;
    }
    if (imgFileList.length > 0) {
      //   console.log(imgFileList);
      resultsImg = await FriendsCircleUpload({
        list: imgFileList,
      });
    }
    if (videoList.length > 0) {
      resultsVideo = await FriendsCircleUpload({
        list: videoList,
        videoImgZoom: videoImgUrl,
      });
    }
    if (resultsImg || resultsVideo) {
      setpercent(100);
      fs1.current.value = null;
      setFileList([]);
      setVideoImgUrl('');
      setCameraOut(false);
      console.log(inputContent, resultsImg, resultsVideo);
    }
  };
  //   const upload = () => {
  //     onUploadProgress.onUploadProgress = (progressEvent: any) => {
  //       let complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
  //       console.log('上传=====>>>>', complete);
  //       if (complete === 100) {
  //         setpercent(0);
  //       } else {
  //         setpercent(complete);
  //       }
  //     };
  //   };
  return (
    <div className="cameraOutList">
      <p
        placeholder="请详输入此时此刻的心情..."
        id="texts"
        className="mint-field-core"
        onClick={onchange}
        onInput={contenteditable}
      ></p>
      <div className="cameraOutListFileList">
        <ImageUploader
          beforeUpload={beforeUploadImg}
          value={fileList}
          onChange={setFileList}
          upload={mockUpload}
          multiple
          //   capture
          //   maxCount={3}
          //   showUpload={fileList.length < maxCount}
          //   onCountExceed={exceed => {
          //     Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`)
          //   }}
        />
        <div className="otherItemsList">
          {videoImgUrl && (
            <div className="otherItemsListVideos">
              {!plays && (
                <span className="PlayOutline">
                  <PlayOutline onClick={() => videoPlays('play')} />
                </span>
              )}
              <span
                className="videoPlays"
                onClick={() => videoPlays(plays ? 'no' : 'deleteFl')}
              >
                <CloseCircleOutline className="video-closure-icon" />
              </span>
              {!plays && (
                <img
                  src={videoImgUrl}
                  alt=""
                  onClick={() => videoPlays('play')}
                />
              )}
              {plays && (
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
              )}
            </div>
          )}
          <label style={{ display: `${videoImgUrl ? 'none' : 'block'}` }}>
            <p>
              <MovieOutline />
              <input
                onChange={(files: any) => beforeUpload(files.target.files)}
                style={{ display: 'none' }}
                type="file"
                name=""
                // multiple
                ref={fs1}
                accept="video/*"
              />
            </p>
            <span>点击这里记录视频</span>
          </label>
        </div>
      </div>
      {cameraOut && (
        <div className="PlaysToSpeed">
          <ProgressBar percent={percent} />
        </div>
      )}
      <div className="PlaysTo" onClick={release}>
        <span>确定发布</span>
      </div>
    </div>
  );
};
export default CameraOutList;
