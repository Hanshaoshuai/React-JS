import '../personalInformation/index.scss';
import './index.scss';

import { CameraOutline } from 'antd-mobile-icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CameraOutList from './cameraOutList';
import {
  PlayOutline,
  CloseCircleOutline,
  FileOutline,
  SoundOutline,
} from 'antd-mobile-icons';

const Dynamic = ({ name, onBack, display, indexId }: any) => {
  const history = useHistory();
  const [displayBlock, setDisplayBlock] = useState(false);
  const [cameraOut, setCameraOut] = useState(false);
  const [imgIdLoc] = useState<any>(
    JSON.parse(window.localStorage.getItem('imgIdLoc') || '[]')
  );
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
      <div className="contents contents_search_leng">
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
              <img src="" alt="" />
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
          <div className="dynamic-const-box">
            <div className="dynamic-const-box-img">
              <img src="" alt="" />
            </div>
            <div className="dynamic-const-box-text">
              <div className="dynamic-const-box-text-name">的刚结束了</div>
              <div className="dynamic-const-box-text-test">
                古典风格都看过了电视机分厘卡时间古典风格都看过了电视机分厘卡时间古典风格都看过了电视机分厘卡时间古典风格都看过了电视机分厘卡时间古典风格都看过了电视机分厘卡时间
              </div>
              <div className="dynamic-const-box-text-img">
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
              </div>
              <div className="dynamic-const-box-text-bottom">
                <div className="dynamic-const-box-text-bottom-left">1小时</div>
                <div className="dynamic-const-box-text-bottom-right">评论</div>
              </div>
            </div>
            <div className="border-bottom"></div>
          </div>
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
          <CameraOutList />
        </div>
      )}
    </div>
  );
};

export default Dynamic;
