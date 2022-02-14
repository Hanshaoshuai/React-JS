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
      <div className="searchBox">
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
      <div className="xiangmu-box">
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
              setOnPlayUrl('./projectImages/head1.jpg');
            }}
          >
            工程数字资产
          </List.Item>
          <List.Item
            prefix={<UnorderedListOutline />}
            onClick={() => {
              setOnPlayUrl('./projectImages/head1.jpg');
            }}
          >
            三峡升船机数字化平台
          </List.Item>
          <List.Item
            prefix={<UnorderedListOutline />}
            onClick={() => {
              setOnPlayUrl('./projectImages/head1.jpg');
            }}
          >
            物联网
          </List.Item>
        </List>
      </div>
      <ImageViewer.Multi
        images={['./projectImages/head1.jpg', './projectImages/head2.jpg']}
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
