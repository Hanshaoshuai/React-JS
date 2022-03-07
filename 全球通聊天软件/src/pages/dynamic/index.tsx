import '../personalInformation/index.scss';
import './index.scss';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Dynamic = () => {
  const history = useHistory();
  const [imgIdLoc] = useState<any>(
    JSON.parse(window.localStorage.getItem('imgIdLoc') || '[]')
  );

  useEffect(() => {}, []);

  const goBackS = () => {
    // if (!localStorage.getItem('type')) {
    //   history.push('/');
    // } else {
    history.goBack();
    // }
    // localStorage.removeItem('personalInformation');
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

  return (
    <div className="personalInformation">
      <div className="searchBox">
        <div className="home-search">
          <img
            src="/images/fanhui.png"
            className="xiangmu-left"
            alt=""
            onClick={goBackS}
          />
          <span>朋友圈</span>
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
    </div>
  );
};

export default Dynamic;
