import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, ImageViewer } from 'antd-mobile';
import { UnorderedListOutline, CloseCircleOutline } from 'antd-mobile-icons';
import '../chatroom/index.scss';

const ProjectInstance = () => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [onPlayUrl, setOnPlayUrl] = useState<any>('');
  const [plays, setplays] = useState(true);
  const goBackS = () => {
    history.push('/');
  };
  const videoPlays = () => {
    // 视频开关
    setplays(!plays);
    setOnPlayUrl('');
  };
  return (
    <div className="yijian">
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
            <span className="toNames">项目列表</span>
          </div>
        </div>
      </div>
      <div
        className="xiangmu-box"
        style={{ paddingTop: `calc(0.9rem + ${window.userAgents}px)` }}
      >
        <List>
          <List.Item
            prefix={<UnorderedListOutline />}
            onClick={() => {
              setVisible(true);
            }}
          >
            网商银行后台系统
          </List.Item>
          <List.Item
            prefix={<UnorderedListOutline />}
            onClick={() => {
              setOnPlayUrl('./projectImages/2022-02-14_06-55-39.mp4');
            }}
          >
            工程数字资产
          </List.Item>
          <List.Item
            prefix={<UnorderedListOutline />}
            onClick={() => {
              setOnPlayUrl('./projectImages/2022-02-14_06-13-05.mp4');
            }}
          >
            三峡升船机数字化平台
          </List.Item>
          <List.Item
            prefix={<UnorderedListOutline />}
            onClick={() => {
              setOnPlayUrl('./projectImages/2022-02-14_07-00-39.mp4');
            }}
          >
            物联网
          </List.Item>
        </List>
      </div>
      <ImageViewer.Multi
        images={[
          './projectImages/微信截图_20200413113226.png',
          './projectImages/微信截图_20200413113354.png',
          './projectImages/微信截图_20200413113506.png',
          './projectImages/微信截图_20200413113549.png',
          './projectImages/微信截图_20200413113708.png',
          './projectImages/微信截图_20200413113745.png',
          './projectImages/微信截图_20200413113814.png',
          './projectImages/微信截图_20200413113902.png',
          './projectImages/微信截图_20200413113928.png',
          './projectImages/微信截图_20200413113951.png',
          './projectImages/微信截图_20200413114339.png',
          './projectImages/微信截图_20200413114418.png',
          './projectImages/微信截图_20200413114442.png',
          './projectImages/微信截图_20200413114458.png',
          './projectImages/微信截图_20200413114554.png',
          './projectImages/微信截图_20200413114609.png',
          './projectImages/微信截图_20200413114633.png',
          './projectImages/微信截图_20200413114654.png',
          './projectImages/微信截图_20200413114750.png',
          './projectImages/微信截图_20200413114819.png',
          './projectImages/微信截图_20200413114835.png',
          './projectImages/微信截图_20200413114923.png',
          './projectImages/微信截图_20200413114957.png',
          './projectImages/微信截图_20200413115031.png',
          './projectImages/微信截图_20200413115104.png',
          './projectImages/微信截图_20200413115127.png',
          './projectImages/微信截图_20200413115155.png',
          './projectImages/微信截图_20200413115243.png',
          './projectImages/微信截图_20200413115300.png',
          './projectImages/微信截图_20200413115503.png',
          './projectImages/微信截图_20200413115724.png',
          './projectImages/微信截图_20200413115759.png',
          './projectImages/微信截图_20200413115913.png',
          './projectImages/微信截图_20200413115955.png',
          './projectImages/微信截图_20200413120114.png',
          './projectImages/微信截图_20200413120151.png',
          './projectImages/微信截图_20200413120403.png',
          './projectImages/微信截图_20200413120501.png',
          './projectImages/微信截图_20200413120543.png',
          './projectImages/微信截图_20200413120604.png',
          './projectImages/微信截图_20200413120814.png',
          './projectImages/微信截图_20200413121004.png',
          './projectImages/微信截图_20200413121127.png',
          './projectImages/微信截图_20200413121231.png',
        ]}
        visible={visible}
        defaultIndex={0}
        onClose={() => {
          setVisible(false);
        }}
      />
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
          <div onClick={videoPlays} className="video-closure">
            <CloseCircleOutline className="video-closure-icon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectInstance;
