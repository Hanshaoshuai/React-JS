import './index.scss';

import React, { useEffect, useState, useRef, useContext, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Toast, ImageViewer, Collapse, Divider, Selector } from 'antd-mobile';
import HooksCropperModal from '../HooksCropperModal/HooksCropperModal';
import InformationSettings from '../informationSettings';
import { RightOutline } from 'antd-mobile-icons';
import Dynamic from '../dynamic';

import { clearAll } from '../../helpers';
import { MyContext } from '../../models/context';
import {
  myRemarks,
  informationDetails,
  addNotes,
  addFriend,
  removeFriend,
  logout,
  getCircleFriends,
} from '../../api';
import { Upload } from '../A-components/upload';
import { urlObj } from './urlObj';
let indexId: any = false;
const localNames = window.localStorage.getItem('name');
let urlName = '';
let urlValue = '';
let urlAlbum = '';
const ChatRecord = () => {
  const { state } = useContext(MyContext);
  const { settings, urlPathname } = state;
  const history = useHistory();
  const fs: any = useRef(null);
  const [localName, setLocalName] = useState<any>('');
  const [tabTex, setTabTex] = useState<any>('我的');
  const [LLNumber, setLLNumber] = useState<any>(
    localStorage.getItem('LLNumber') || ''
  );
  const [sexImage, setsexImage] = useState<any>(
    localStorage.getItem('mySex') || ''
  );
  const [myHead, setMyHead] = useState<any>(
    localStorage.getItem('myHeadPortrait') || ''
  );
  const [myHeadZoom, setMyHeadZoom] = useState<any>(
    localStorage.getItem('myapathZoom') || ''
  );
  const [headPortrait, setHeadPortrait] = useState<any>(
    localStorage.getItem('headPortrait') || ''
  );
  const [headPortraitB, setHeadPortraitB] = useState<any>('');
  const [toNames, setToNames] = useState<any>(
    localStorage.getItem('myName') || ''
  );
  const [toChatName, setToChatName] = useState<any>(
    localStorage.getItem('toChatName') || ''
  );
  const [myName] = useState<any>(localStorage.getItem('name') || '');
  const [myRegion, setMyRegion] = useState<any>(
    localStorage.getItem('myRegion') || ''
  );
  const [imgId] = useState<any>(localStorage.getItem('imgId') || '');
  const [setUps, setSetUp] = useState(false);
  const [nickName, setNickName] = useState<any>('');
  const [setRegion, setSetRegion] = useState<any>('');
  const [remarksNuber, setRemarksNuber] = useState<any>('');
  const [fromType] = useState<any>(localStorage.getItem('fromType'));
  const [addSearchFriends, setAddSearchFriends] = useState<any>(
    localStorage.getItem('addSearchFriends')
  );
  const [friend, setFriend] = useState(true);
  const [remove, setRemove] = useState(false);
  const [tabShow, setTabShow] = useState<any>(false);
  const [onInputText, setInputText] = useState<any>('');
  const [searchResults, setSearchResults] = useState(false);
  const [hooksModalFile, setHooksModalFile] = useState<any>('');
  const [hooksModalVisible, setHooksModalVisible] = useState<any>(false);
  const [type, setType] = useState<any>('');
  const [visible, setVisible] = useState(false);
  const [settingsName, setSettingsName] = useState<any>(false);
  const [name, setNames] = useState<any>('');
  const [labelData, setLabelData] = useState<any>({});
  const [labelOption, setLabelOption] = useState<any>([]);
  const [myLocName] = useState<any>(localStorage.getItem('name'));
  const [circleFriendData, setCircleFriendData] = useState<any>([]);
  const [toDynamic, setToDynamic] = useState(false);
  const [circleFriendsBackground, setCircleFriendsBackground] = useState('');
  const [determineWait, setDetermineWait] = useState(false);

  useEffect(() => {
    const { _name, _value, _valueObj } = urlObj(urlPathname);
    urlName = _name;
    urlValue = _value;
    urlAlbum = _valueObj?.album || '';
    // console.log(window.location.search.split('&')[0]);
    if (window.location.search === '?personal=1&setSettings=1') {
      indexId = true;
    }
    if (urlValue && !_valueObj.remarksName) {
      informations();
      getCircleFriendList();
      informationDetailsQ(urlValue);
      setSettingsName(false);
    }
    if (
      urlAlbum ||
      _valueObj.comment ||
      _valueObj.videoPlay ||
      _valueObj.cameraOutline ||
      _valueObj.dynamicInside ||
      _valueObj.dynamicVideoPlay ||
      _valueObj.dynamicDynamic
    ) {
      setToDynamic(true);
    } else {
      setToDynamic(false);
    }
    if (
      window.location.search.split('&')[0] &&
      window.location.search.split('&')[0] === '?addSearchFriends=1'
    ) {
      setAddSearchFriends('1');
    } else {
      // setAddSearchFriends('');
    }
    if (!_valueObj.remarksName && tabTex === '添加备注') {
      setSetUp(false);
    }
  }, [urlPathname]);

  const informations = () => {
    if (
      localStorage.getItem('myInformation') &&
      !localStorage.getItem('personalInformation')
    ) {
      const { information, newOptions0 } = JSON.parse(
        localStorage.getItem('myInformation') || '{}'
      );
      setLabelData(information || {});
      setLabelOption(newOptions0 || []);
      setMyRegion(newOptions0 ? newOptions0[4].value : '');
      setToNames(newOptions0 ? newOptions0[0].value : '');
    }
  };
  const getCircleFriendList = (name?: string) => {
    getCircleFriends({
      page: 1,
      pageSize: 13,
      name: name ? name : urlValue,
      personal: true,
    }).then((res: any) => {
      if (res.code === 200) {
        // console.log(res?.data);
        setCircleFriendData(res?.data || []);
      }
    });
  };
  const informationDetailsQ = (text?: any, key?: any) => {
    // 好友资料详情
    const types = localStorage.getItem('type');
    if (types === 'groupChat') {
      setHeadPortrait(localStorage.getItem('headPortrait_groupChat'));
    }
    if (urlValue !== myLocName) {
      setTabTex('详细资料');
      setSearchResults(true);
    } else {
      setSearchResults(false);
      setTabTex('我的');
      setRemove(true);
    }
    informationDetails({
      toChatName:
        types === 'groupChat'
          ? localStorage.getItem('toChatName_groupChat')
          : text
          ? text
          : toChatName,
      myName: myName,
      type: text ? '' : 'chat',
    }).then((data) => {
      // console.log(data);
      if (data.code === 200) {
        if (key) {
          setSearchResults(true);
          getCircleFriendList(data.name);
        }
        setLLNumber(data.LLNumber);
        setsexImage(data.sex);
        setLocalName(data.name);
        setHeadPortrait(data.apathZoom);
        setHeadPortraitB(data.imges);
        setMyHead(data.imges);
        setMyHeadZoom(data.apathZoom);
        localStorage.setItem('toChatName', data.name);
        localStorage.setItem('headPortrait', data.apathZoom);
        localStorage.setItem(
          'circleFriendsBackgroundFriend',
          data.circleFriendsBackground || ''
        );
        const { information, newOptions0 } = data?.information || {};
        setLabelData(information || false);
        setLabelOption(newOptions0 || []);
        setMyRegion(newOptions0 ? newOptions0[4].value : '');
        setCircleFriendsBackground(
          data.circleFriendsBackground || '/images/202203120130501.jpg'
        );
        setToChatName(data.name);
        if (data.remarksNameNo === 'no' || data.friend === 'no') {
          setToNames(data.remarksName);
          setNickName(data.remarksName);
          localStorage.setItem('nickName', data.remarksName);
          localStorage.setItem('toNames', data.remarksName);
        } else {
          setToNames(data.remarksName);
          setNickName(data.remarksNameNick);
          localStorage.setItem('nickName', data.remarksName);
          localStorage.setItem('toNames', data.remarksNameNick);
        }
        if (data.remarksNuber && urlValue !== myLocName) {
          setRemarksNuber(data.remarksNuber);
          localStorage.setItem('remarksNuber', data.remarksNuber);
        } else {
          setRemarksNuber('');
          localStorage.setItem('remarksNuber', '');
        }
        if (data.friend === 'no' && data.name !== localNames) {
          setFriend(false);
        }
        if (data.name === localNames) {
          setRemove(true);
        }
      } else if (data.code === 2001) {
        //用户不存在请先注册
        Toast.show({
          content: data.msg,
          position: 'top',
        });
      } else if (data.code === 1001) {
        setSearchResults(false);
        Toast.show({
          content: data.msg,
          position: 'top',
        });
      }
    });
  };

  const setUp = () => {
    if (tabTex === '添加备注') {
      history.goBack();
      setSetUp(!setUps);
      return;
    }
    if (!setUps) {
      if (localStorage.getItem('personalInformation')) {
        setTabTex('添加备注');
        history.push(
          `/personalInformation${
            window.location.search
          }&${urlName}-${new Date().getTime()}=${JSON.stringify({
            name: urlValue || '',
            remarksName: 'yes',
          })}`
        );
      } else {
        setTabTex('资料设置');
        setNickName(localStorage.getItem('myName') || '');
        setSetRegion(localStorage.getItem('myRegion') || '');
      }
    } else {
      if (searchResults) {
        setToNames(localStorage.getItem('nickName'));
        setRemarksNuber(localStorage.getItem('remarksNuber'));
        setNickName(localStorage.getItem('toNames'));
        setSetUp(!setUps);
        return;
      }
      if (localStorage.getItem('personalInformation')) {
        setTabTex('详细资料');
        setToNames(localStorage.getItem('toNames'));
        setRemarksNuber(localStorage.getItem('remarksNuber'));
      } else {
        setTabTex('我的');
        setNickName('');
        setSetRegion('');
      }
    }
    setSetUp(!setUps);
  };
  const goBackS = () => {
    if (localStorage.getItem('fromChatRoom')) {
      history.goBack();
      return;
    }
    if (setUps) {
      setTabTex('详细资料');
      setSetUp(!setUps);
      return;
    }
    localStorage.removeItem('personalInformation');
    localStorage.removeItem('remarksNuber');
    localStorage.removeItem('fromType');
    localStorage.removeItem('type');
    setAddSearchFriends('');
    localStorage.removeItem('addSearchFriends');
    history.goBack();
  };
  const save = () => {
    if (localStorage.getItem('personalInformation') || searchResults) {
      if (!toNames && !remarksNuber) {
        Toast.show({
          content: '没有要保存的信息！请填写...',
          position: 'top',
        });
        return;
      }
      const types = localStorage.getItem('type');
      addNotes({
        toChatName:
          types === 'groupChat'
            ? localStorage.getItem('toChatName_groupChat')
            : onInputText
            ? onInputText
            : toChatName,
        remarksName: toNames,
        remarksNuber: remarksNuber,
        myName: myName,
      }).then((data) => {
        // console.log(data);
        if (data.code === 1001) {
          //"用户名或密码错误"
          Toast.show({
            content: data.msg,
            position: 'top',
          });
        } else if (data.code === 200) {
          informationDetailsQ(searchResults ? onInputText : '');
          setTabTex('详细资料');
          setSetUp(!setUps);
          if (data.remarksName) {
            localStorage.setItem('toNames', data.remarksName);
          }
          Toast.show({
            icon: 'success',
            content: data.msg,
          });
        } else if (data.code === 2001) {
          //用户不存在请先注册
          Toast.show({
            content: data.msg,
            position: 'top',
          });
        }
      });
    } else {
      if (!nickName && !setRegion) {
        Toast.show({
          content: '没有要保存的信息！请填写...',
          position: 'top',
        });
        return;
      }
      myRemarks({
        nickName: nickName,
        myRegion: setRegion,
        myName: myName,
      }).then((data) => {
        // console.log(data);
        if (data.code === 1001) {
          Toast.show({
            content: data.msg,
            position: 'top',
          });
        } else if (data.code === 200) {
          setNickName('');
          setSetRegion('');
          setUp();
          if (data.nickName) {
            setToNames(data.nickName);
            localStorage.setItem('myName', data.nickName);
            localStorage.setItem('toNames', data.nickName);
          }
          if (data.myRegion) {
            setMyRegion(data.myRegion);
            localStorage.setItem('myRegion', data.myRegion);
          }
          Toast.show({
            icon: 'success',
            content: data.msg,
          });
        } else if (data.code === 2001) {
        }
      });
    }
  };
  const onChange = (e: any, type: any) => {
    if (e) {
      if (type === 1) {
        if (localStorage.getItem('personalInformation') || searchResults) {
          setToNames(e.target.value);
        } else {
          setNickName(e.target.value);
        }
      }
      if (type === 2) {
        if (localStorage.getItem('personalInformation') || searchResults) {
          setRemarksNuber(e.target.value);
        } else {
          setSetRegion(e.target.value);
        }
      }
    }
  };

  const mockUpload = async (file: any) => {
    const fileN = file.target.files[0];
    let typeName = fileN.name.split('.');
    setType(typeName[typeName.length - 1]);
    // const datas = await Upload(file, imgId, myName);
    // setMyHead(datas);
    setHooksModalFile(fileN);
    setHooksModalVisible(true);
  };

  const handleGetResultImgUrl = async (blob: any) => {
    // const str = URL.createObjectURL(blob);
    // console.log(blob);
    const { icon, apathZoom }: any = await Upload(blob, type, imgId, myName);
    if (icon) {
      setMyHead(icon);
      setMyHeadZoom(apathZoom);
    }
    // console.log(icon);
  };

  const setHooksModalVisibles = () => {
    setHooksModalVisible(false);
    if (fs) {
      fs.current.value = null;
    }
  };

  const chatroom = () => {
    localStorage.setItem('nickName', toNames);
    if (localStorage.getItem('personalInformation') || searchResults) {
      localStorage.setItem('toChatName', localName);
      localStorage.setItem('headPortrait', headPortrait);
    } else {
      localStorage.setItem('toChatName', myName);
    }

    localStorage.setItem('type', 'chat');
    history.push('/chatroom');
  };

  const addFriends = () => {
    addFriend({
      addName: toNames,
      fromNumber: myName,
      addNumber: toChatName,
    }).then((data) => {
      // console.log(data);
      if (data.code === 200) {
        //向对方发送添加好友验证消息
        window.socket.emit('clientmessage', {
          fromName: myName,
          toName: toChatName,
          text: { friend: 'no', addName: toNames },
        });
        history.push('/');
        Toast.show({
          icon: 'success',
          content: data.msg,
        });
      } else {
        Toast.show({
          content: data.msg,
          position: 'top',
        });
      }
    });
  };
  const options = () => {
    //移除好友；
    removeFriend({
      removeName: toNames,
      fromNumber: myName,
      removeNumber: toChatName,
    }).then((data) => {
      // console.log(data);
      if (data.code === 200) {
        //向对方发送添加好友验证消息
        window.socket.emit('clientmessage', {
          fromName: myName,
          toName: toChatName,
          text: '移除好友',
        });
        Toast.show({
          icon: 'success',
          content: data.msg,
        });
        history.push('/');
      } else {
        Toast.show({
          content: data.msg,
          position: 'top',
        });
      }
    });
  };
  const logouts = () => {
    logout({ name: localNames }).then((data) => {
      // console.log(data);
      if (data.code === 200) {
        Toast.show({
          icon: 'success',
          content: data.msg,
        });
        clearAll();
        history.push('/register');
      } else {
        Toast.show({
          content: data.msg,
          position: 'top',
        });
      }
    });
  };
  const viewAvatar = () => {
    setVisible(true);
  };
  const signOuts = () => {
    clearAll();
    Toast.show({
      content: '已退出登录',
      position: 'top',
    });
    history.push('/login');
  };
  const tabs = () => {
    setTabShow(!tabShow);
  };
  const tabsHid = () => {
    if (tabShow) {
      setTabShow(false);
    }
  };
  const onSearch = () => {
    // console.log(onInputText);
    if (!onInputText) {
      Toast.show({
        position: 'top',
        content: '没有搜索内容！',
      });
      return;
    }
    history.replace(
      `/personalInformation?addSearchFriends=1&my-${new Date().getTime()}=${JSON.stringify(
        {
          name: onInputText,
        }
      )}`
    );
    informationDetailsQ(onInputText, 'yes');
  };
  const callback = (e: any) => {
    // console.log(e);
    setDetermineWait(true);
    myRemarks({
      myName: myName,
      information: e,
    }).then((res: any) => {
      // console.log(res);
      setDetermineWait(false);
      if (res.code === 200) {
        Toast.show({
          icon: 'success',
          content: '修改成功',
        });
        const { information, newOptions0 } = res.information;
        localStorage.setItem(
          'myInformation',
          JSON.stringify(res.information || '{}')
        );
        setNickName(newOptions0[0].value || nickName);
        setToNames(newOptions0[0].value || nickName);
        setMyRegion(newOptions0[3].value || '');
        setLabelData(information || {});
        setLabelOption(newOptions0 || []);
        goBackSettings();
      } else {
        Toast.show({
          content: res.msg,
          position: 'top',
        });
      }
    });
  };
  const goBackSettings = () => {
    informations();
    informationDetailsQ();
    history.goBack();
    // history.push('/personalInformation?personal=1');
    // setSettingsName(false);
  };
  const setName = (e: string) => {
    setNames(e);
  };
  const dataSetting = () => {
    setSettingsName(true);
    history.push('/personalInformation?personal=1&setSettings=1');
  };
  useEffect(() => {
    // console.log(settings);
    if (window.location.search === '?personal=1') {
      setSettingsName(false);
      indexId = true;
      setToDynamic(false);
      // console.log('111', settings, window.location.search);
    } else if (window.location.search === '?personal=1&setSettings=1') {
      setSettingsName(true);
      // console.log('222', settings, window.location.search);
    } else if (window.location.search === '?dynamic=1') {
      setToDynamic(true);
    }
  }, [settings]);
  const onDynamic = () => {
    // setToDynamic(true);
    // getCircleFriendList();
    let obj: any = {
      name: urlValue || '',
      album: 'yes',
    };
    if (urlName === 'dynamic') {
      obj = {
        name: urlValue || '',
        dynamicInside: 'yes',
      };
    }
    history.push(
      `/personalInformation${
        window.location.search
      }&${urlName}-${new Date().getTime()}=${JSON.stringify(obj)}`
    );
  };
  const onCallback = (comment?: string) => {
    getCircleFriendList();
  };
  let listIndexId = 0;

  const listValues = useMemo(() => {
    const list: any = [];
    for (let key in labelData) {
      const options = labelData[key].map((item: any) => ({
        label: item,
        value: item,
      }));
      if (key === 'ZHUANG_TAI') {
        list.push(
          <div key={key} className="first items">
            <Divider contentPosition="left">状态</Divider>
            <div className={'main-Selector'}>
              <Selector
                options={options}
                value={labelData[key] || []}
                multiple={true}
              />
            </div>
          </div>
        );
      }
      if (key === 'XING_GE') {
        list.push(
          <div key={key} className="items">
            <Divider contentPosition="left">性格</Divider>
            <div className={'main-Selector'}>
              <Selector
                options={options}
                value={labelData[key] || []}
                multiple={true}
              />
            </div>
          </div>
        );
      }
      if (key === 'ZHI_YE') {
        list.push(
          <div key={key} className="items">
            <Divider contentPosition="left">职业</Divider>
            <div className={'main-Selector'}>
              <Selector
                options={options}
                value={labelData[key] || []}
                multiple={true}
              />
            </div>
          </div>
        );
      }
      if (key === 'SHENG_HUO_FANG_SHI') {
        list.push(
          <div key={key} className="items">
            <Divider contentPosition="left">生活方式</Divider>
            <div className={'main-Selector'}>
              <Selector
                options={options}
                value={labelData[key] || []}
                multiple={true}
              />
            </div>
          </div>
        );
      }
      if (key === 'JIA_ZHI_GUAN') {
        list.push(
          <div key={key} className="items">
            <Divider contentPosition="left">价值观</Divider>
            <div className={'main-Selector'}>
              <Selector
                options={options}
                value={labelData[key] || []}
                multiple={true}
              />
            </div>
          </div>
        );
      }
      if (key === 'AI_HAO') {
        list.push(
          <div key={key} className="items">
            <Divider contentPosition="left">爱好</Divider>
            <div className={'main-Selector'}>
              <Selector
                options={options}
                value={labelData[key] || []}
                multiple={true}
              />
            </div>
          </div>
        );
      }
      if (key === 'LV_XING') {
        list.push(
          <div key={key} className="items">
            <Divider contentPosition="left">旅行</Divider>
            <div className={'main-Selector'}>
              <Selector
                options={options}
                value={labelData[key] || []}
                multiple={true}
              />
            </div>
          </div>
        );
      }
      if (key === 'SHU_JI') {
        list.push(
          <div key={key} className="items">
            <Divider contentPosition="left">书籍</Divider>
            <div className={'main-Selector'}>
              <Selector
                options={options}
                value={labelData[key] || []}
                multiple={true}
              />
            </div>
          </div>
        );
      }
      if (key === 'MEI_SHI') {
        list.push(
          <div key={key} className="items">
            <Divider contentPosition="left">美食</Divider>
            <div className={'main-Selector'}>
              <Selector
                options={options}
                value={labelData[key] || []}
                multiple={true}
              />
            </div>
          </div>
        );
      }
      if (key === 'YUN_DONG') {
        list.push(
          <div key={key} className="items">
            <Divider contentPosition="left">运动</Divider>
            <div className={'main-Selector'}>
              <Selector
                options={options}
                value={labelData[key] || []}
                multiple={true}
              />
            </div>
          </div>
        );
      }
      if (key === 'DIAN_YING') {
        list.push(
          <div key={key} className="items">
            <Divider contentPosition="left">电影</Divider>
            <div className={'main-Selector'}>
              <Selector
                options={options}
                value={labelData[key] || []}
                multiple={true}
              />
            </div>
          </div>
        );
      }
      if (key === 'YIN_YUE') {
        list.push(
          <div key={key} className="items">
            <Divider contentPosition="left">音乐</Divider>
            <div className={'main-Selector'}>
              <Selector
                options={options}
                value={labelData[key] || []}
                multiple={true}
              />
            </div>
          </div>
        );
      }
      if (key === 'YOU_XI') {
        list.push(
          <div key={key} className="last items">
            <Divider contentPosition="left">游戏</Divider>
            <div className={'main-Selector'}>
              <Selector
                options={options}
                value={labelData[key] || []}
                multiple={true}
              />
            </div>
          </div>
        );
      }
    }
    return list;
  }, [labelData]);
  return (
    <div className="personalInformation" onClick={tabsHid}>
      <InformationSettings
        display={settingsName}
        goBackS={goBackSettings}
        callback={callback}
        setName={setName}
        name={name}
        labelData={labelData}
        indexId={indexId}
        labelOption={labelOption}
        determineWait={determineWait}
      />
      {addSearchFriends ? (
        <>
          <div className="searchBox home-search-go">
            <img
              src="/images/fanhui.png"
              className="xiangmu-left"
              alt=""
              onClick={goBackS}
            />
            <div className="home-search">
              <input
                placeholder="请输入昵称、聊聊号或手机号"
                type="text"
                className="mint-field-core sousuo"
                onChange={(e: any) => setInputText(e.target.value)}
              />
            </div>
            <span className="sousuoGo" onClick={onSearch}>
              搜索
            </span>
          </div>
          {!searchResults ? (
            <div className="contents_search_no">快来搜一搜聊一聊...</div>
          ) : (
            ''
          )}
        </>
      ) : (
        <div className="searchBox">
          <div className="home-search">
            {(tabTex === '详细资料' || tabTex === '添加备注') && (
              <img
                src="/images/fanhui.png"
                className="xiangmu-left"
                alt=""
                onClick={goBackS}
              />
            )}
            <span>{tabTex}</span>
            {friend && !remove && urlName !== 'my' ? (
              <>
                <img
                  src="/images/dashujukeshihuaico.png"
                  alt=""
                  className="xiangmu-rigth"
                  onClick={tabs}
                ></img>
                <ul className={`${tabShow ? 'show' : ''}`}>
                  <li onClick={options}>移除好友</li>
                </ul>
              </>
            ) : remove ? (
              <>
                <img
                  src="/images/dashujukeshihuaico.png"
                  alt=""
                  className="xiangmu-rigth"
                  onClick={tabs}
                ></img>
                <ul className={`${tabShow ? 'show' : ''}`}>
                  <li onClick={signOuts}>退出登录</li>
                  <li onClick={logouts}>注销账号</li>
                  <label>
                    <li>
                      <input
                        onChange={(files: any) => mockUpload(files)}
                        style={{ display: 'none' }}
                        type={`${
                          localStorage.getItem('personalInformation') ||
                          searchResults
                            ? ''
                            : 'file'
                        }`}
                        name=""
                        accept="image/jpeg,image/jpg,image/png"
                        ref={fs}
                      />
                      更换头像
                    </li>
                  </label>
                </ul>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      )}
      {!addSearchFriends || searchResults ? (
        <div style={{ overflowY: 'auto', height: '100%' }}>
          <div className="contents">
            <div className="logo">
              <div className="fankiu">
                <div className="content-food">
                  <div className="imgas">
                    <label>
                      <p onClick={viewAvatar}>
                        <img
                          className="border"
                          src={
                            localStorage.getItem('personalInformation')
                              ? headPortrait
                              : myHeadZoom
                          }
                          alt=""
                          id="imges"
                        />
                      </p>
                    </label>
                  </div>
                  {hooksModalVisible && (
                    <HooksCropperModal
                      uploadedImageFile={hooksModalFile}
                      onClose={setHooksModalVisibles}
                      onSubmit={handleGetResultImgUrl}
                    />
                  )}
                  <div className="texts">
                    <span className="first">
                      <i>{toNames}</i>
                      <img
                        className="sexImages"
                        src={`${
                          sexImage === 'Sir'
                            ? '/images/user__easyico.png'
                            : '/images/user__easyico_1.png'
                        }`}
                        alt=""
                      />
                    </span>
                    <span className="lalst">
                      聊聊号：<a>{LLNumber}</a>
                    </span>
                    {localStorage.getItem('personalInformation') ||
                    searchResults ? (
                      <span className="lalst lalst_name">
                        昵称：<a>{nickName}</a>
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
              <ImageViewer
                image={
                  localStorage.getItem('personalInformation')
                    ? headPortraitB
                    : myHead
                }
                visible={visible}
                onClose={() => {
                  setVisible(false);
                }}
              />
            </div>
            <div className="denglu-text">
              {!localStorage.getItem('personalInformation') &&
              !searchResults ? (
                <div
                  className="sheZhi denglu_sheZhi"
                  // onClick={setUp}
                  onClick={dataSetting}
                >
                  资料设置
                  <span
                    style={{
                      float: 'right',
                      textAlign: 'right',
                      color: '#d0d0d0',
                    }}
                  >
                    <RightOutline />
                  </span>
                </div>
              ) : friend &&
                (searchResults ||
                  !localStorage.getItem('personalInformation') ||
                  !fromType) ? (
                <div className="sheZhi denglu_sheZhi" onClick={setUp}>
                  设置备注
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="denglu-text ziZhu">
              {remarksNuber ? (
                <div className="beiZhu">
                  <span>电话号码：</span>
                  <span>{remarksNuber}</span>
                </div>
              ) : (
                ''
              )}
              <div className="diQu">基本信息</div>
              <div className="diQu">
                {labelOption.map((item: any, index: number) => {
                  if (index === 0) return null;
                  return (
                    <div className="optionTerm" key={item.label}>
                      <div className="optionTermLabel">{item.label}</div>
                      <div className="optionTermValue">{item.value}</div>
                    </div>
                  );
                })}
                <div className="border-bottom"></div>
                {/* <span>地区：</span>
              <span>{myRegion ? myRegion : '未设置'}</span> */}
              </div>
              <div className="sheZhi denglu_sheZhi other otherQT">
                <Collapse>
                  <Collapse.Panel key="1" title="个人标签">
                    <div className="otherQTCollapse">{listValues}</div>
                  </Collapse.Panel>
                </Collapse>
              </div>
              <div className="xiangCe-box">
                <div className="xiangCe-box-box">
                  <div className="xiangCe" onClick={onDynamic}>
                    <span className="xiangCeTite">个人相册</span>
                    <div className="xiangCeImg">
                      {circleFriendData.map((item: any, index: number) => {
                        return (
                          <>
                            {item.imgList &&
                              item.imgList.map((items: any, id: number) => {
                                listIndexId += 1;
                                let styles = null;
                                const list = items?.styleLength.split('_');
                                const type = list[0];
                                if (type === 'width') {
                                  styles = {
                                    height: '100%',
                                  };
                                } else {
                                  styles = {
                                    width: '100%',
                                  };
                                }
                                if (listIndexId > 3) {
                                  return null;
                                }
                                return (
                                  <div
                                    key={`${items?.title}_${id + index}`}
                                    className="xiangCeImgItem"
                                  >
                                    <img
                                      style={styles}
                                      src={items.apathZoom}
                                      alt=""
                                    />
                                  </div>
                                );
                              })}
                          </>
                        );
                      })}
                      <span style={{ flex: '1' }}>
                        <RightOutline />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {friend &&
            urlValue !== myLocName &&
            (searchResults ||
              !localStorage.getItem('personalInformation') ||
              !fromType) ? (
              <div className="denglu-food" onClick={chatroom}>
                <span>发送消息</span>
              </div>
            ) : (
              ''
            )}
            <div
              className="denglu-food friends"
              style={{ display: `${!friend && searchResults ? '' : 'none'}` }}
            >
              <span onClick={addFriends}>添加好友</span>
            </div>
            <div className={`tanChuang ${setUps ? 'tanChuangB' : ''}`}>
              <div id="tanChuang_top"></div>
              <div className="tanChuang_cont">
                <div className="sheZhi sheZhiFirst">
                  {localStorage.getItem('personalInformation') ||
                  searchResults ? (
                    <span>备注名：</span>
                  ) : (
                    <span>昵称：</span>
                  )}
                  <input
                    value={
                      localStorage.getItem('personalInformation') ||
                      searchResults
                        ? toNames
                        : nickName
                    }
                    placeholder={`${
                      localStorage.getItem('personalInformation')
                        ? '请输入备注'
                        : '请输入昵称'
                    }`}
                    type="text"
                    className="ferst mint-field-core"
                    onChange={(e) => onChange(e, 1)}
                  />
                </div>
                <div className="sheZhi sheZhiLste">
                  {localStorage.getItem('personalInformation') ||
                  searchResults ? (
                    <span>电话号码：</span>
                  ) : (
                    <span>地区：</span>
                  )}
                  <input
                    value={
                      localStorage.getItem('personalInformation') ||
                      searchResults
                        ? remarksNuber
                        : setRegion
                    }
                    placeholder={`${
                      localStorage.getItem('personalInformation')
                        ? '请输入电话'
                        : '请输入地区'
                    }`}
                    type="text"
                    className="last mint-field-core"
                    onChange={(e) => onChange(e, 2)}
                  />
                </div>
              </div>
              <div className="tanChuang_food tanChuang_first" onClick={save}>
                <span>保&nbsp;&nbsp;存</span>
              </div>
              <div className="tanChuang_food tanChuang_last" onClick={setUp}>
                <span>取&nbsp;&nbsp;消</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      <Dynamic
        name={'个人相册'}
        onBack={() => {
          indexId = true;
          // if (urlPathname.secondary) {
          //   localStorage.removeItem('secondary');
          //   history.goBack();
          //   setToDynamic(false);
          //   return;
          // }
          // localStorage.getItem('getInto') !== '/dynamic' &&
          // informationDetailsQ(myName);
          // history.push('/personalInformation?personal=1');
          setToDynamic(false);
        }}
        display={toDynamic}
        indexId={indexId}
        circleFriendData={circleFriendData}
        callback={onCallback}
        toCircleFriendsBackground={circleFriendsBackground}
        headPortraitB={headPortraitB}
        toNames={toNames}
        labelData={labelData}
      />
    </div>
  );
};

export default ChatRecord;
