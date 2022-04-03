import './index.scss';

import React, { useEffect, useState, useMemo } from 'react';
import { CloseCircleOutline } from 'antd-mobile-icons';
const { formatDate } = require('gettimesjs');
const CompassClock = ({ callback }: any) => {
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
  const [seasonS, setSeasonS] = useState(season);
  const [degs, setDegs] = useState(0); // 秒
  const [branchDegs, setBranchDegs] = useState(0); // 分
  const [timeDegs, setTimeDegs] = useState(0); // 时
  const [solarTermsDegs, SolarTermsDegs] = useState(0); // 节气
  const [numberSDegs, setNumberSDegs] = useState(0); // 号
  const [monthDegs, setMonthDegs] = useState(0); // 月
  const [timeSlotDegs] = useState(formatDate('AM')); // 中午或下午
  const [weekDegs] = useState(formatDate('EE')); // 周
  const [yyyy] = useState(formatDate('yyyy')); // 年
  const [ssOldNum, setSsOldNum] = useState(0);
  const [mymoveYear, setMymoveYear] = useState(false);
  const [Highlightmm, setHighlightmm] = useState(0);
  const [Highlighthh, setHighlighthh] = useState(0);
  const [DD] = useState(parseInt(formatDate('dd')));
  const [MM] = useState(parseInt(formatDate('MM')));

  useEffect(() => {
    // formatDate('yyyy-MM-dd EE AM hh:mm:ss S q');
    let mymoveYearLod = false;
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
    setHighlighthh(hhOld);
    setSeasonS(
      season.map((term: any, index: number) => {
        if (term.key === getjq(yyyy, MM, DD.toString())) {
          term.value = 1;
          SolarTermsDegs(-360 + 15 * index); // 节气
        }
        return term;
      })
    );
    let interVal = window.setInterval(() => {
      ss -= -6;
      ssOld += 1;
      if (ssOld % 6 === 0) {
        mymoveYearLod = !mymoveYearLod;
        setMymoveYear(mymoveYearLod);
      }
      setHighlightmm(mmOld);
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
    // console.log(interVal);
    return () => {
      window.clearInterval(interVal);
    };
  }, []);
  const onClockButton = () => {
    // clearInterval();
    callback();
  };
  const useMemoS = useMemo(() => {
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
              string = 'mymove1 2s infinite';
            }
            // if (ssOldNum !== index && ssOldNum !== index + 1) {
            //   string = `mymove0  1s infinite`;
            // }
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
                  <span
                    style={{
                      transform: `${
                        Highlightmm === index ? 'scale(1.2)' : 'scale(1)'
                      }`,
                    }}
                    className="clock-branch"
                  >{`${term.key}分`}</span>
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
                  <span
                    style={{
                      transform: `${
                        Highlighthh === index + 1 || Highlighthh === index + 13
                          ? 'scale(1.2)'
                          : 'scale(1)'
                      }`,
                    }}
                    className="clock-time"
                  >{`${term.key}时`}</span>
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
          {seasonS.map((term: any, index: number) => {
            return (
              <div
                key={`${index}`}
                className="clock-box-term"
                style={{
                  transform: `rotate(${15 * index}deg)`,
                }}
              >
                <div className="clock-box-term-text">
                  <span
                    style={{
                      transform: `${term.value ? 'scale(1.2)' : 'scale(1)'}`,
                    }}
                    className="clock-season"
                  >{`${term.key}`}</span>
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
                  <span
                    style={{
                      transform: `${
                        DD === index + 1 ? 'scale(1.2)' : 'scale(1)'
                      }`,
                    }}
                    className="clock-numberS"
                  >{`${term.key}号`}</span>
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
                  <span
                    style={{
                      transform: `${
                        MM === index + 1 ? 'scale(1.2)' : 'scale(1)'
                      }`,
                    }}
                    className="clock-month"
                  >{`${term.key}月`}</span>
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
          <CloseCircleOutline className="video-closure-icon" />
        </div>
        <div
          className={`clock-year ${
            mymoveYear
              ? 'mymove-year mymove-year1'
              : 'mymove-year-no mymove-year-no1'
          }`}
          style={{
            boxShadow: `${
              mymoveYear ? '0px 0px 1.9rem #ff7a59' : '0px 0px 1.9rem blue'
            }`,
          }}
        >
          {yyyy}年
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
  return <div className="denglu">{useMemoS}</div>;
};

export default CompassClock;
