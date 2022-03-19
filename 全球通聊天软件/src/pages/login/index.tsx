import './index.scss';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Toast } from 'antd-mobile';

import { getToken, setToken } from '../../helpers';

import { login, informationDetails } from '../../api';
import { setInterval } from 'timers';
import { Color } from 'three';
// import TabSwitch, { TabSwitchPage } from './tabSwitch';
// import { SwitchTs } from 'rollup-react-ts';
// const { SwitchTs } = require('rollup-react-ts');
// const { TabSwitch, TabSwitchPage } = require('rollup-react');
// const { CombinationDrawer } = require('rollup-react');

const {
  formatDate,
  pastTime,
  specificPastTime,
  countDown,
  realTimeCountDown,
  realTimeCountDownSeparate,
} = require('gettimesjs');

let times: any = null;
const ChatList = () => {
  const history = useHistory();
  const [telephone, setTelephone] = useState<any>();
  const [password, setPassword] = useState<any>('');
  const [setSelectedKey, setSetSelectedKey] = useState<any>(2);
  const [formatDates, setFormatDate] = useState<any>();

  useEffect(() => {
    return componentWillUnmount;
  }, []);
  useEffect(() => {
    times = setInterval(() => {
      setFormatDate(formatDate('yyyy-MM-dd EE AM hh:mm:ss S q'));
    }, 10);
    if (getToken() && localStorage.getItem('name')) {
      history.push('/');
    }
  }, []);

  const onChange = (e: any, text: string) => {
    // console.log(e.target.value);
    if (text === '1') {
      setTelephone(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  const logIn = () => {
    if (!telephone) {
      Toast.show({
        content: '请填写手机号！',
        position: 'top',
      });
      return;
    }
    if (!password) {
      Toast.show({
        content: '请输入密码！',
        position: 'top',
      });
      return;
    }
    login({ name: telephone, password })
      .then((data) => {
        // console.log('123456', data);
        if (data.code === 1001) {
          //"用户名或密码错误"
          Toast.show({
            icon: 'fail',
            content: data.msg,
          });
        } else if (data.code === 200) {
          setToken(telephone, true);
          localStorage.setItem('myName', data.nickName);
          localStorage.setItem('name', telephone);
          localStorage.setItem('imgId', data.imgId);
          localStorage.setItem(
            'circleFriendsBackground',
            data.circleFriendsBackground || ''
          );
          Toast.show({
            icon: 'success',
            content: data.msg,
          });
          informationDetails({
            toChatName: telephone,
            myName: data.nickName,
            type: 'chat',
          }).then((data) => {
            // console.log(data);
            if (data.code && data.imges) {
              localStorage.setItem('myHeadPortrait', data.imges);
              localStorage.setItem('myapathZoom', data.apathZoom);
              if (data.information) {
                localStorage.setItem(
                  'myInformation',
                  JSON.stringify(data.information)
                );
              }
            }
            history.push('/');
          });
        } else if (data.code === 2001) {
          //用户不存在请先注册
          Toast.show({
            icon: 'fail',
            content: data.msg,
          });
        }
      })
      .catch((err) => {
        Toast.show({
          icon: 'fail',
          content: err,
        });
      });
  };
  const register = () => {
    history.push('/register');
  };

  const dataList1: any = [
    {
      key: 0,
      content: <div>我们</div>,
    },
    {
      key: 1,
      content: (
        <div>
          <div>是否</div>
        </div>
      ),
    },
    {
      key: 2,
      content: '可以',
    },
    {
      key: 3,
      content: '携手',
    },
    {
      key: 4,
      content: '共进',
    },
  ];
  const dataList: any = [
    {
      key: 0,
      content: <div>我们一起</div>,
    },
    {
      key: 1,
      content: (
        <div>
          <div>看日出</div>
          <div>看日落</div>
        </div>
      ),
    },
    {
      key: 2,
      content: '每天睁开眼第一看到就是你',
    },
    {
      key: 3,
      content: '无论吃饭早与晚都有你陪伴',
    },
    {
      key: 4,
      content: '幸福生活',
    },
  ];
  const selectedKey = (state: any) => {
    const { e, key, value } = state;
    // console.log(state, e, key, value);
    setSetSelectedKey(key);
  };

  const list: any = [
    {
      key: '0',
      title: '',
      // width: 200,
      transition: 0,
      notExpanded: false,
      fatherSonConnection: '-1',
      value: (
        <div style={{ width: '100px', height: '20px' }}>
          <div onClick={() => indexFilter('0', '点击我1')}>点击我1</div>
          <div onClick={() => indexFilter('0', '点击我2')}>点击我2</div>
          <div onClick={() => indexFilter('0', '点击我3')}>点击我3</div>
        </div>
      ),
      state: true,
    },
    {
      key: '1',
      title: '',
      // width: 200,
      transition: 0,
      notExpanded: false,
      fatherSonConnection: '0',
      value: (
        <div style={{ width: '160px', height: '20px' }}>
          <div onClick={() => indexFilter('1', '一级点击我1')}>一级点击我1</div>
          <div onClick={() => indexFilter('1', '一级点击我2')}>一级点击我2</div>
        </div>
      ),
      state: false,
    },
    {
      key: '2',
      title: '',
      // width: 700,
      transition: 0,
      notExpanded: false,
      fatherSonConnection: '1',
      value: (
        <div
          style={{ width: '300px', height: '20px' }}
          onClick={() => indexFilter('2', '二级点击我')}
        >
          二级点击我
        </div>
      ),
      state: false,
    },
    {
      key: '3',
      title: '',
      // width: 400,
      transition: 0,
      notExpanded: false,
      fatherSonConnection: '2',
      value: (
        <div
          style={{ width: '300px', height: '20px' }}
          onClick={() => indexFilter('3', '三级点击我')}
        >
          三级点击我
        </div>
      ),
      state: false,
    },
    {
      key: '4',
      title: '',
      // width: 500,
      transition: 0,
      notExpanded: false,
      fatherSonConnection: '3',
      value: (
        <div
          style={{ width: '400px', height: '20px' }}
          onClick={() => submitClose(4)}
        >
          {'提交=>关闭'}
        </div>
      ),
      state: false,
    },
  ];
  const list1: any = [
    {
      key: '0',
      title: '',
      // width: 200,
      transition: 0,
      notExpanded: false,
      fatherSonConnection: '-1',
      value: (
        <div style={{ width: '200px', height: '20px' }}>
          <div onClick={() => indexFilter('0', '点击我1')}>2点击我1</div>
          <div onClick={() => indexFilter('0', '点击我2')}>2点击我2</div>
          <div onClick={() => indexFilter('0', '点击我3')}>2点击我3</div>
        </div>
      ),
      state: true,
    },
    {
      key: '1',
      title: '',
      // width: 200,
      transition: 0,
      notExpanded: false,
      fatherSonConnection: '0',
      value: (
        <div style={{ width: '360px', height: '20px' }}>
          <div onClick={() => indexFilter('1', '一级点击我1')}>
            2一级点击我1
          </div>
          <div onClick={() => indexFilter('1', '一级点击我2')}>
            2一级点击我2
          </div>
        </div>
      ),
      state: false,
    },
    {
      key: '2',
      title: '',
      // width: 200,
      transition: 0,
      notExpanded: false,
      fatherSonConnection: '1',
      value: (
        <div style={{ width: '400px', height: '20px' }}>
          <div onClick={() => indexFilter('2', '二级点击我1')}>
            3一级点击我1
          </div>
          <div onClick={() => indexFilter('2', '二级点击我2')}>
            3一级点击我2
          </div>
        </div>
      ),
      state: false,
    },
  ];
  const drawers = useRef<any>(null);
  const [drawerShow, setDrawerShow] = useState(false);
  const [filters, setFilters] = useState({});
  const indexFilter: any = (index?: string, title?: string) => {
    // 进入下一层抽屉
    setFilters({ index, title });
  };
  const submitClose = (index: number) => {
    // 提交事件后关闭该层抽屉
    if (drawers) {
      drawers.current.getInfo(index);
    }
  };
  const [newList, setNewList] = useState<any>(list);
  const onSetDrawerShows = (index: any) => {
    if (index === 1) {
      setNewList(list);
    }
    if (index === 2) {
      setNewList(list1);
    }
    setDrawerShow(true);
  };

  const toEducation = () => {
    history.push('/education');
  };

  const componentWillUnmount = () => {
    clearInterval(times);
  };

  const denglu: any = useRef(null);
  const onFocus = () => {
    const time = setTimeout(() => {
      clearTimeout(time);
      if (denglu) {
        denglu.current.scrollTop = denglu.current.clientHeight;
      }
    }, 230);
  };

  const second: any = [
    { key: '零' },
    { key: '一' },
    { key: '二' },
    { key: '三' },
    { key: '四' },
    { key: '五' },
    { key: '六' },
    { key: '七' },
    { key: '八' },
    { key: '九' },
    { key: '十' },
    { key: '十一' },
    { key: '十二' },
    { key: '十三' },
    { key: '十四' },
    { key: '十五' },
    { key: '十六' },
    { key: '十七' },
    { key: '十八' },
    { key: '十九' },
    { key: '二十' },
    { key: '二十一' },
    { key: '二十二' },
    { key: '二十三' },
    { key: '二十四' },
    { key: '二十五' },
    { key: '二十六' },
    { key: '二十七' },
    { key: '二十八' },
    { key: '二十九' },
    { key: '三十' },
    { key: '三十一' },
    { key: '三十二' },
    { key: '三十三' },
    { key: '三十四' },
    { key: '三十五' },
    { key: '三十六' },
    { key: '三十七' },
    { key: '三十八' },
    { key: '三十九' },
    { key: '四十' },
    { key: '四十一' },
    { key: '四十二' },
    { key: '四十三' },
    { key: '四十四' },
    { key: '四十五' },
    { key: '四十六' },
    { key: '四十七' },
    { key: '四十八' },
    { key: '四十九' },
    { key: '五十' },
    { key: '五十一' },
    { key: '五十二' },
    { key: '五十三' },
    { key: '五十四' },
    { key: '五十五' },
    { key: '五十六' },
    { key: '五十七' },
    { key: '五十八' },
    { key: '五十九' },
  ];
  const time: any = [
    { key: '一' },
    { key: '二' },
    { key: '三' },
    { key: '四' },
    { key: '五' },
    { key: '六' },
    { key: '七' },
    { key: '八' },
    { key: '九' },
    { key: '十' },
    { key: '十一' },
    { key: '十二' },
  ];
  const season: any = [
    { key: '立春' },
    { key: '雨水' },
    { key: '惊蛰' },
    { key: '春分' },
    { key: '清明' },
    { key: '谷雨' },
    { key: '立夏' },
    { key: '小满' },
    { key: '芒种' },
    { key: '夏至' },
    { key: '小暑' },
    { key: '大暑' },
    { key: '立秋' },
    { key: '处暑' },
    { key: '白露' },
    { key: '秋分' },
    { key: '寒露' },
    { key: '霜降' },
    { key: '立冬' },
    { key: '小雪' },
    { key: '大雪' },
    { key: '冬至' },
    { key: '小寒' },
    { key: '大寒' },
  ];
  const numberS = [
    { key: '一' },
    { key: '二' },
    { key: '三' },
    { key: '四' },
    { key: '五' },
    { key: '六' },
    { key: '七' },
    { key: '八' },
    { key: '九' },
    { key: '十' },
    { key: '十一' },
    { key: '十二' },
    { key: '十三' },
    { key: '十四' },
    { key: '十五' },
    { key: '十六' },
    { key: '十七' },
    { key: '十八' },
    { key: '十九' },
    { key: '二十' },
    { key: '二十一' },
    { key: '二十二' },
    { key: '二十三' },
    { key: '二十四' },
    { key: '二十五' },
    { key: '二十六' },
    { key: '二十七' },
    { key: '二十八' },
    { key: '二十九' },
    { key: '三十' },
    { key: '三十一' },
  ];

  const getjq = (yyyy: any, mm: any, dd: any) => {
    mm = mm - 1;
    var sTermInfo = new Array(
      0,
      21208,
      42467,
      63836,
      85337,
      107014,
      128867,
      150921,
      173149,
      195551,
      218072,
      240693,
      263343,
      285989,
      308563,
      331033,
      353350,
      375494,
      397447,
      419210,
      440795,
      462224,
      483532,
      504758
    );
    var solarTerm = new Array(
      '小寒',
      '大寒',
      '立春',
      '雨水',
      '惊蛰',
      '春分',
      '清明',
      '谷雨',
      '立夏',
      '小满',
      '芒种',
      '夏至',
      '小暑',
      '大暑',
      '立秋',
      '处暑',
      '白露',
      '秋分',
      '寒露',
      '霜降',
      '立冬',
      '小雪',
      '大雪',
      '冬至'
    );
    var solarTerms = '';
    //　　此方法可以获取该日期处于某节气
    while (solarTerms === '') {
      var tmp1 = new Date(
        31556925974.7 * (yyyy - 1900) +
          sTermInfo[mm * 2 + 1] * 60000 +
          Date.UTC(1900, 0, 6, 2, 5)
      );
      var tmp2 = tmp1.getUTCDate();
      if (tmp2 === dd) solarTerms = solarTerm[mm * 2 + 1];
      tmp1 = new Date(
        31556925974.7 * (yyyy - 1900) +
          sTermInfo[mm * 2] * 60000 +
          Date.UTC(1900, 0, 6, 2, 5)
      );
      tmp2 = tmp1.getUTCDate();
      if (tmp2 === dd) solarTerms = solarTerm[mm * 2];
      if (dd > 1) {
        dd = dd - 1;
      } else {
        mm = mm - 1;
        if (mm < 0) {
          yyyy = yyyy - 1;
          mm = 11;
        }
        dd = 31;
      }
    }
    return solarTerms;
  };
  const [clockShow, setClockShow] = useState(true);
  const [degs, setDegs] = useState(0); // 秒
  const [branchDegs, setBranchDegs] = useState(0); // 分
  const [timeDegs, setTimeDegs] = useState(0); // 时
  const [solarTermsDegs, SolarTermsDegs] = useState(0); // 节气
  const [numberSDegs, setNumberSDegs] = useState(0); // 号
  const [monthDegs, setMonthDegs] = useState(0); // 月
  const [timeSlotDegs, setTimeSlotDegs] = useState('上午');
  const [weekDegs, setWeekDegs] = useState('周一');
  const [yearDegs, setYearDegs] = useState('2022');
  const [ssOldNum, setSsOldNum] = useState(0);
  const [mymoveYear, setMymoveYear] = useState(false);
  useEffect(() => {
    // formatDate('yyyy-MM-dd EE AM hh:mm:ss S q');
    let mymoveYearLod = false;
    const MM = formatDate('MM');
    const DD = formatDate('dd');
    const yyyy = formatDate('yyyy');
    let ssOld = parseInt(formatDate('ss'));
    let mmOld = parseInt(formatDate('mm'));
    let hhOld = parseInt(formatDate('hh'));
    let ss = -360 + 6 * ssOld;
    let mm = -360 + 6 * mmOld;
    let hh = -360 + 30 * hhOld;
    setDegs(ss); // 秒
    setBranchDegs(mm); // 分
    setTimeDegs(hh); // 时
    setNumberSDegs(-360 + 11.629 * DD); // 号
    setMonthDegs(-360 + 30 * MM); // 月
    setTimeSlotDegs(formatDate('AM')); // 中午或下午
    setWeekDegs(formatDate('EE')); // 周
    setYearDegs(yyyy); // 年
    season.map((term: any, index: number) => {
      if (term.key === getjq(yyyy, MM, DD)) {
        SolarTermsDegs(-360 + 15 * index); // 节气
      }
      return term;
    });
    setInterval(() => {
      ss -= -6;
      ssOld += 1;
      if (ssOld % 6 === 0) {
        mymoveYearLod = !mymoveYearLod;
        setMymoveYear(mymoveYearLod);
      }
      if (ssOld === 59) {
        mm -= -6;
        mmOld += 1;
      }
      if (ssOld === 60) {
        ssOld = 0;
      }
      if (mmOld === 60) {
        mmOld = 0;
        hh -= -30;
      }
      setSsOldNum(ssOld);
      setDegs(ss); // 秒
      setBranchDegs(mm); // 分
      setTimeDegs(hh); // 时
    }, 1000);
  }, []);
  const onClockButton = () => {
    setClockShow(false);
  };
  const useMemoS = useMemo(() => {
    // <div className="clock-box">
    //       {second.map((term: any, index: number) => {
    //         return (
    //           <div
    //             key={`${index}`}
    //             className="clock-box-term second"
    //             style={{ transform: `rotate(${degs - 6 * index}deg)` }}
    //           >
    //             <div className="clock-box-term-text">
    //               <span className="clock-second">{`${term.key}秒`}</span>
    //             </div>
    //           </div>
    //         );
    //       })}
    //       {second.map((term: any, index: number) => {
    //         return (
    //           <div
    //             key={`${index}`}
    //             className="clock-box-term branch"
    //             style={{ transform: `rotate(${branchDegs - 6 * index}deg)` }}
    //           >
    //             <div className="clock-box-term-text">
    //               <span className="clock-branch">{`${term.key}分`}</span>
    //               <span className="clock-second"></span>
    //             </div>
    //           </div>
    //         );
    //       })}
    //       {time.map((term: any, index: number) => {
    //         return (
    //           <div
    //             key={`${index}`}
    //             className="clock-box-term time"
    //             style={{
    //               transform: `rotate(${timeDegs - 30 * (index + 1)}deg)`,
    //             }}
    //           >
    //             <div className="clock-box-term-text">
    //               <span className="clock-time">{`${term.key}时`}</span>
    //               <span className="clock-branch"></span>
    //               <span className="clock-second"></span>
    //             </div>
    //           </div>
    //         );
    //       })}
    //       {season.map((term: any, index: number) => {
    //         return (
    //           <div
    //             key={`${index}`}
    //             className="clock-box-term season"
    //             style={{
    //               transform: `rotate(${solarTermsDegs - 15 * index}deg)`,
    //             }}
    //           >
    //             <div className="clock-box-term-text">
    //               <span className="clock-season">{`${term.key}`}</span>
    //               <span className="clock-time"></span>
    //               <span className="clock-branch"></span>
    //               <span className="clock-second"></span>
    //             </div>
    //           </div>
    //         );
    //       })}
    //       {numberS.map((term: any, index: number) => {
    //         return (
    //           <div
    //             key={`${index}`}
    //             className="clock-box-term numberS"
    //             style={{
    //               transform: `rotate(${numberSDegs - 11.629 * (index + 1)}deg)`,
    //             }}
    //           >
    //             <div className="clock-box-term-text">
    //               <span className="clock-numberS">{`${term.key}号`}</span>
    //               <span className="clock-season"></span>
    //               <span className="clock-time"></span>
    //               <span className="clock-branch"></span>
    //               <span className="clock-second"></span>
    //             </div>
    //           </div>
    //         );
    //       })}
    //       {time.map((term: any, index: number) => {
    //         return (
    //           <div
    //             key={`${index}`}
    //             className="clock-box-term month"
    //             style={{
    //               transform: `rotate(${monthDegs - 30 * (index + 1)}deg)`,
    //             }}
    //           >
    //             <div className="clock-box-term-text">
    //               <span className="clock-month">{`${term.key}月`}</span>
    //               <span className="clock-numberS"></span>
    //               <span className="clock-season"></span>
    //               <span className="clock-time"></span>
    //               <span className="clock-branch"></span>
    //               <span className="clock-second"></span>
    //             </div>
    //           </div>
    //         );
    //       })}
    //       <div className="clock-year">
    //         {yearDegs}年
    //         <br />
    //         {`${weekDegs}/${timeSlotDegs}`}
    //       </div>
    //       <div className="clock-Pointer"></div>
    //       <div className="clock-button" onClick={onClockButton}>
    //         关闭
    //       </div>
    //     </div>
    return (
      <div className="clock">
        <div
          className="clock-box second"
          style={{ transform: `rotate(${-degs}deg)` }}
        >
          {second.map((term: any, index: number) => {
            let string = '';
            if (ssOldNum === index) {
              string = 'mymove 1s infinite';
            }
            if (ssOldNum === index + 1) {
              string = 'mymove1 1s infinite';
            }
            if (ssOldNum !== index && ssOldNum !== index + 1) {
              string = `mymove0  1s infinite`;
            }
            return (
              <div
                key={`${index}`}
                className="clock-box-term"
                style={{ transform: `rotate(${6 * index}deg)` }}
              >
                <div className="clock-box-term-text">
                  <span
                    style={{
                      animation: `${string}`,
                      // color: `${ssOldNum === index ? '#ff7a59' : ''}`,
                      transform: `${
                        ssOldNum === index
                          ? 'scale(1.25)'
                          : `${
                              mymoveYear ? 'skewY(25deg) scale(1)' : 'scale(1)'
                            }`
                      }`,
                    }}
                    className="clock-second"
                  >{`${term.key}秒`}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="clock-box branch"
          style={{ transform: `rotate(${-branchDegs}deg)` }}
        >
          {second.map((term: any, index: number) => {
            return (
              <div
                key={`${index}`}
                className="clock-box-term"
                style={{ transform: `rotate(${6 * index}deg)` }}
              >
                <div className="clock-box-term-text">
                  <span className="clock-branch">{`${term.key}分`}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="clock-box time"
          style={{
            transform: `rotate(${-timeDegs}deg)`,
          }}
        >
          {time.map((term: any, index: number) => {
            return (
              <div
                key={`${index}`}
                className="clock-box-term"
                style={{
                  transform: `rotate(${30 * (index + 1)}deg)`,
                }}
              >
                <div className="clock-box-term-text">
                  <span className="clock-time">{`${term.key}时`}</span>
                  <span className="clock-branch"></span>
                  <span className="clock-second"></span>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="clock-box season"
          style={{
            transform: `rotate(${-solarTermsDegs}deg)`,
          }}
        >
          {season.map((term: any, index: number) => {
            return (
              <div
                key={`${index}`}
                className="clock-box-term"
                style={{
                  transform: `rotate(${15 * index}deg)`,
                }}
              >
                <div className="clock-box-term-text">
                  <span className="clock-season">{`${term.key}`}</span>
                  <span className="clock-time"></span>
                  <span className="clock-branch"></span>
                  <span className="clock-second"></span>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="clock-box numberS"
          style={{
            transform: `rotate(${-numberSDegs}deg)`,
          }}
        >
          {numberS.map((term: any, index: number) => {
            return (
              <div
                key={`${index}`}
                className="clock-box-term"
                style={{
                  transform: `rotate(${11.629 * (index + 1)}deg)`,
                }}
              >
                <div className="clock-box-term-text">
                  <span className="clock-numberS">{`${term.key}号`}</span>
                  <span className="clock-season"></span>
                  <span className="clock-time"></span>
                  <span className="clock-branch"></span>
                  <span className="clock-second"></span>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="clock-box month"
          style={{
            transform: `rotate(${-monthDegs}deg)`,
          }}
        >
          {time.map((term: any, index: number) => {
            return (
              <div
                key={`${index}`}
                className="clock-box-term"
                style={{
                  transform: `rotate(${30 * (index + 1)}deg)`,
                }}
              >
                <div className="clock-box-term-text">
                  <span className="clock-month">{`${term.key}月`}</span>
                  <span className="clock-numberS"></span>
                  <span className="clock-season"></span>
                  <span className="clock-time"></span>
                  <span className="clock-branch"></span>
                  <span className="clock-second"></span>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`clock-button ${
            window.modelName === 'pc' && 'clock-button-pc'
          }`}
          onClick={onClockButton}
        >
          关闭
        </div>
        <div
          className={`clock-year ${
            mymoveYear
              ? 'mymove-year mymove-year1'
              : 'mymove-year-no mymove-year-no1'
          }`}
        >
          {yearDegs}年
          <br />
          {`${weekDegs}/${timeSlotDegs}`}
        </div>
        <div
          className={`clock-Pointer ${
            mymoveYear
              ? 'clock-Pointer-change clock-Pointer-change3'
              : 'clock-Pointer-change1 clock-Pointer-change4'
          }`}
        ></div>
      </div>
    );
  }, [degs]);
  return (
    <div className="denglu" ref={denglu}>
      {clockShow && useMemoS}
      <div className="searchBox">
        <div className="home-search">
          <span>登录</span>
          <div className="fanhui-right"></div>
        </div>
      </div>
      <div className="contents">
        <div
          style={{
            textAlign: 'center',
            color: '#ff7a59',
            fontSize: '16px',
            marginBottom: '10px',
            height: '21px',
          }}
        >
          {formatDates}
        </div>
        <div className="logo">
          <ul>
            <li>
              <img src="./logo512.png" alt="" />
            </li>
          </ul>
        </div>
        <div className="denglu-text">
          <ul>
            <li>
              <span>
                <img src="/images/yonghu.png" alt="" />
              </span>
              <input
                onChange={(e) => onChange(e, '1')}
                placeholder="请输入手机号"
                type="number"
                className="ferst mint-field-core"
              />
            </li>
            <li onClick={onFocus}>
              <span>
                <img src="/images/mima.png" alt="" />
              </span>
              <input
                onFocus={onFocus}
                onChange={(e) => onChange(e, '2')}
                placeholder="请输入密码"
                type="password"
                className="last mint-field-core"
              />
            </li>
          </ul>
        </div>
        <div className="denglu-food" onClick={logIn}>
          <span>登&nbsp;&nbsp;录</span>
        </div>
        <div className="denglu-to">
          <ul>
            <li className="denglu-wangji">忘记密码</li>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <li onClick={register} className="denglu-zhuce">
              立即注册
            </li>
          </ul>
        </div>
        <div
          className="denglu-list denglu-bottom"
          // onClick={toEducation}
        >
          合作热线：18310998379
        </div>
        {/* <div onClick={() => onSetDrawerShows(1)} style={{ cursor: 'pointer' }}>
          点击1
        </div>
        <div onClick={() => onSetDrawerShows(2)} style={{ cursor: 'pointer' }}>
          点击2
        </div> */}
      </div>
      {/* <div>
        <CombinationDrawer
          ref={drawers}
          list={newList}
          drawerShow={drawerShow}
          setDrawerShow={setDrawerShow}
          filters={filters}
          titles={true}
          redundantWidth={35}
          initial={true} // 设置true，初始化最多展示1个抽屉；
        />
      </div> */}
      {/* <div
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          top: '0',
          left: '0',
          background: '#fff',
          zIndex: 1000000000,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '50%',
            background: '#fff',
            zIndex: 1000000000,
          }}
        >
          <TabSwitch
            defaults={2} // 设置默认高亮；如果与<TabsPage/>一起使用默认值要与<TabsPage/>的setSelectedKey值相等
            dataList={dataList1} // 数据[]SwitchContent
            selectedKey={selectedKey} // 回调函数返回当前高亮数据；动态控制高亮回调无效：() => {}
            inclination={10} // 设置向右侧偏移度可更改 number 开启覆盖默认
            styles={{ overflow: '', color: '#ff7a59' }} // 溢出内容是否遮盖或其他样式设置，hidden
            itemHeight={20} // 设置高亮区域高度 开启覆盖默认
            borderColor={'1px solid #ff7a59'} // 设置高亮区域边框，动态控制高亮的时候不生效；
            blurLayer={false} // 未高亮的每项是否渐变模糊默认开启，false关闭；白色背景可以使用；blurLayer和transparency选一
            transparency={0.4} // 未高亮的每项是否渐变模糊默认开启，其他背景使用；blurLayer和transparency选一 范围(0.1-1)
          />
        </div>
        <div
          style={{
            width: '100%',
            height: '50%',
            background: '#fff',
            zIndex: 1000000000,
          }}
        >
          <TabSwitchPage
            dataList={dataList} // 数据[]SwitchContent
            inclination={0} // 设置向右侧偏移度可更改 number 开启覆盖默认
            styles={{ overflow: '' }} // 溢出内容是否遮盖或其他样式设置，hidden
            itemHeight={40} // 设置高亮区域高度 开启覆盖默认
            borderColor={'1px solid #ff7a59'} // 设置高亮区域边框，动态控制高亮的时候不生效；
            setSelectedKey={setSelectedKey} // 动态控制高亮
            gradientSpeed={0.03} // 控制渐变速度需要和动态控制高亮一起用生效；
            alignItems // flex属性内容默认左右居中,string: flex-start，flex-end
          />
        </div>
      </div> */}
    </div>
  );
};

export default ChatList;
