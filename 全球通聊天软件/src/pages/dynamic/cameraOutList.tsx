import './index.scss';
import React, { useState, useRef, useEffect } from 'react';
import {
  ImageUploader,
  Toast,
  ProgressBar,
  Form,
  Input,
  TextArea,
} from 'antd-mobile';
import {
  MovieOutline,
  CloseCircleOutline,
  PlayOutline,
} from 'antd-mobile-icons';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
import { FriendsCircleUpload } from './friendsCircleUpload';
import { SetVideoImg } from './friendsCircleUpload/fileUploadCircle';
import { onUploadProgress } from '../../services/request';
import { startFriendsCircleFileUpload } from '../../api';
import { IsURL, textIsURL } from '../../helpers';

const CameraOutList = ({ callback }: any) => {
  const formDate: any = useRef(null);
  const [myLocName] = useState<any>(localStorage.getItem('name'));
  const [headPortrait] = useState<any>(localStorage.getItem('myapathZoom'));
  const [nickname] = useState<any>(localStorage.getItem('myName'));
  const fs1: any = useRef(null);
  const [percent, setpercent] = useState(0);
  const [cameraOut, setCameraOut] = useState(false);
  const [inputContent] = useState('');
  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);
  const [videoList, setVideoList] = useState<any>([]);
  const [videoImgUrl, setVideoImgUrl] = useState<any>('');
  const [imgFileList, setImgFileList] = useState<any>([]);
  const [plays, setplays] = useState(false);
  const [onPlayUrl, setOnPlayUrl] = useState<any>('');
  const [value, setValue] = useState<any>('');
  const [textValue, setTextValue] = useState<any>('');
  const [connectValue, setConnectValue] = useState<any>('');
  const [imageNumber, setImageNumber] = useState(0);
  const [videoNumber, setVideoNumber] = useState(0);
  const [shardCount, setShardCount] = useState(0);

  const onDelete = (item: ImageUploadItem) => {
    // console.log(item);
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
  const onChange = (e: any) => {
    // console.log(e);
    const { image, video, number, shardCount } = e;
    if (image) {
      setImageNumber(number);
    } else {
      if (shardCount) {
        setShardCount(shardCount);
      } else {
        setShardCount(1);
      }
      setVideoNumber(number);
    }
  };
  const release = async () => {
    if (cameraOut) return;
    upload();
    let resultsImg = null;
    let resultsVideo = null;
    if (!textValue && !videoImgUrl && !fileList.length && !connectValue) {
      Toast.show(`没有要发布的内容！`);
      return;
    }
    if (connectValue) {
      const { urlList } = textIsURL(connectValue);
      if (!urlList.length) {
        Toast.show(`输入内容必须包含有效链接！`);
        return;
      }
    }
    setCameraOut(true);
    if (imgFileList.length > 0) {
      //   console.log(imgFileList);
      resultsImg = await FriendsCircleUpload({
        list: imgFileList,
        onChange: onChange,
      });
    }
    if (videoList.length > 0) {
      resultsVideo = await FriendsCircleUpload({
        list: videoList,
        videoImgZoom: videoImgUrl,
        onChange: onChange,
      });
    }

    if (textValue || resultsImg || resultsVideo || connectValue) {
      // console.log(myLocName, inputContent, resultsImg, resultsVideo);
      const data: any = {
        headPortrait: headPortrait,
        title: value,
        content: textValue,
        connectValue: connectValue,
        name: myLocName,
        nickname: nickname,
        inputContent,
        imgList: JSON.stringify(resultsImg || []),
        video: resultsVideo || '',
        comment: null,
      };
      startFriendsCircleFileUpload(data).then((res: any) => {
        if (res.code === 200) {
          fs1.current.value = null;
          setFileList([]);
          setVideoImgUrl('');
          setCameraOut(false);
          callback(false);
          setTextValue('');
          setValue('');
          if (formDate) {
            formDate.current.resetFields();
          }
          Toast.show(`发布成功`);
        }
      });
    }
  };
  const upload = () => {
    onUploadProgress.onUploadProgress = (progressEvent: any) => {
      let complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
      // console.log('上传=====>>>>', complete);
      setpercent(complete);
    };
  };
  return (
    <div className="cameraOutList">
      <Form layout="vertical" ref={formDate}>
        <Form.Item label="标题" name="username">
          <Input
            placeholder="请输入一个标题吧"
            clearable
            onChange={(val) => {
              setValue(val);
            }}
          />
        </Form.Item>
        <Form.Item label="内容" name="userText">
          <TextArea
            placeholder="请详输入你此时此刻的心情..."
            // value={value}
            rows={3}
            onChange={(val: any) => {
              setTextValue(val);
            }}
          />
        </Form.Item>
        <Form.Item label="链接" name="connect">
          <TextArea
            placeholder="必须包含有效链接,如果填写标题,链接将以标题名展示否为链接展示"
            // value={value}
            rows={2}
            onChange={(val: any) => {
              setConnectValue(val);
            }}
          />
        </Form.Item>
      </Form>
      <div className="cameraOutListFileList">
        <ImageUploader
          beforeUpload={beforeUploadImg}
          value={fileList}
          onChange={setFileList}
          upload={mockUpload}
          multiple
          onDelete={onDelete}
          //   capture
          //   maxCount={3}
          //   showUpload={fileList.length < maxCount}
          //   onCountExceed={exceed => {
          //     Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`)
          //   }}
        />
        <div className="otherItemsList otherItemsListVideosCamera">
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
        <>
          {imgFileList.length > 0 && (
            <div className="PlaysToSpeed">
              <div className="PlaysToSpeedTepe">
                <div style={{ width: '0.8rem' }}>
                  <div>图片</div>
                </div>
                <div style={{ flex: 1, marginBottom: '-0.2rem' }}>
                  <ProgressBar
                    percent={
                      imgFileList.length === 1
                        ? percent
                        : imgFileList.length >= 1
                        ? (imageNumber / imgFileList.length) * 100
                        : 0
                    }
                  />
                </div>
                <div style={{ width: '0.8rem', textAlign: 'right' }}>
                  {((imageNumber / imgFileList.length) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          )}
          {videoList.length >= 1 && (
            <div className="PlaysToSpeed">
              <div className="PlaysToSpeedTepe">
                <div style={{ width: '0.8rem' }}>
                  <div>视频 </div>
                </div>
                <div style={{ flex: 1, marginBottom: '-0.2rem' }}>
                  <ProgressBar
                    percent={
                      !shardCount
                        ? percent
                        : shardCount > 1 && videoNumber >= 1
                        ? (videoNumber / shardCount) * 100
                        : 0
                    }
                  />
                </div>
                <div style={{ width: '0.8rem', textAlign: 'right' }}>
                  {!shardCount
                    ? percent
                    : videoNumber >= 1
                    ? ((videoNumber / shardCount) * 100).toFixed(1)
                    : 0}
                  %
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div
        className="PlaysTo"
        style={{ opacity: `${cameraOut ? 0.8 : 1}` }}
        onClick={release}
      >
        <span>确定发布</span>
      </div>
    </div>
  );
};
export default CameraOutList;
