import './index.scss';

import React, { useEffect, useRef, useState } from 'react';
import { ActionSheet, Toast } from 'antd-mobile';

const OtherItems = ({
  setFileList,
  deleteFl,
  boxDom,
  onSetVideoCalls,
}: any) => {
  const fs: any = useRef(null);
  const fs1: any = useRef(null);
  const [visible, setVisible] = useState(false);
  const [myLocName] = useState<any>(localStorage.getItem('name'));
  const [toChatName] = useState<any>(localStorage.getItem('toChatName'));
  const [friendSocketId] = useState(localStorage.getItem('friendSocketId'));

  useEffect(() => {
    if (fs && fs1) {
      fs.current.value = null;
      fs1.current.value = null;
    }
  }, [deleteFl]);

  const photoAlbum = () => {
    // console.log('e.target.value');
  };
  const documents = () => {
    // console.log('e.target.value');
  };
  const videoCall = () => {
    // console.log('e.target.value');
    setVisible(true);
  };

  const mockUpload = (file: any) => {
    const fileList = file.target.files;
    // console.log(fileList);
    setFileList(fileList);
  };

  const actions: any = [
    { text: '视频', key: 'startVideo' },
    { text: '语音', key: 'startVoice' },
    {
      text: '取消',
      key: 'delete',
      onClick: async () => {
        setVisible(false);
      },
    },
  ];

  const onAction = (action: any) => {
    setVisible(false);
    if (action.key === 'delete') return;
    if (!localStorage.getItem('friendSocketId')) {
      Toast.show({
        content: '对方不在线请稍后再试！',
        position: 'top',
      });
      let actionKey = '';
      if (action.key === 'startVideo') {
        actionKey = '视频';
      } else if (action.key === 'startVoice') {
        actionKey = '语音';
      }
      window.socket.emit('clientmessage', {
        fromName: myLocName,
        toName: toChatName,
        text: `${actionKey}失败`,
        VideoAndVoice: `${actionKey}失败`,
        conversation: true,
        startTime: '',
        endTime: '',
      });
      return;
    }
    let actionKey = '';
    if (action.key === 'startVideo') {
      actionKey = '视频';
      onSetVideoCalls('切换语音');
    } else if (action.key === 'startVoice') {
      actionKey = '语音';
      onSetVideoCalls('静音');
    }
    localStorage.setItem('startTime', new Date().getTime().toString());
    window.socket.emit('clientmessage', {
      fromName: myLocName,
      toName: toChatName,
      text: actionKey,
      VideoAndVoice: actionKey,
      conversation: true,
      startTime: new Date().getTime(),
      endTime: '',
      to: friendSocketId,
      sender: window.socket.id,
      headPortrait: localStorage.getItem('headPortrait'),
    });
  };

  return (
    <div className="otherItems">
      <div className="otherItemsList" onClick={photoAlbum}>
        <label>
          <p>
            <input
              onChange={(files: any) => mockUpload(files)}
              style={{ display: 'none' }}
              type="file"
              name=""
              multiple
              ref={fs}
              accept="image/*, video/*"
            />
            <img src="" alt="" />
          </p>

          <span>相册</span>
        </label>
      </div>
      <div className="otherItemsList" onClick={documents}>
        <label>
          <p>
            <input
              onChange={(files: any) => mockUpload(files)}
              style={{ display: 'none' }}
              type="file"
              name=""
              multiple
              ref={fs1}
              accept="text/*, application/*, audio/*,"
            />
            <img src="" alt="" />
          </p>
          <span>文件</span>
        </label>
      </div>
      <div className="otherItemsList" onClick={videoCall}>
        <label>
          <p>
            <img src="" alt="" />
          </p>
          <span>视频通话</span>
        </label>
      </div>
      <ActionSheet
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
        onAction={(action) => onAction(action)}
        // afterClose={() => {
        //   Toast.show('动作面板已关闭');
        // }}
      />
    </div>
  );
};

export default OtherItems;
