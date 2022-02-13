import './index.scss';

import { WaterMark } from 'antd-mobile';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Education = () => {
  const history = useHistory();
  const [name, setNames] = useState<any>(true);

  const switchs = (key: any) => {
    if (key === 1) {
      setNames(true);
    } else {
      setNames(false);
    }
  };
  const goBack = () => {
    history.goBack();
  };
  const list = [
    { key: '姓名', value: '韩少帅' },
    { key: '性别', value: '男' },
    { key: '名族', value: '汉' },
    { key: '出生日期', value: '1991年11月20日' },
    { key: '证件号码', value: '130435199111201510' },
    { key: '学校名称', value: '河北农业大学' },
    { key: '层次', value: '本科' },
    { key: '专业', value: '计算机科学与技术' },
    { key: '学制', value: '4' },
    { key: '学历类别', value: '普通' },
    { key: '学习形式', value: '普通全日制' },
    { key: '分院', value: '' },
    { key: '系所', value: '计算机科学与技术' },
    { key: '班级', value: '计算机1319' },
    { key: '学号', value: '20091131914' },
    { key: '入学日期', value: '2009年9月15日' },
    { key: '离校日期', value: '2013年7月1日' },
    { key: '学籍状态', value: '不在籍（毕业）' },
  ];
  const list1 = [
    { key: '姓名', value: '韩少帅' },
    { key: '性别', value: '男' },
    { key: '出生日期', value: '1991年11月20日' },
    { key: '入学日期', value: '2009年9月15日' },
    { key: '毕业（结）日期', value: '河北农业大学' },
    { key: '学校名称', value: '河北农业大学' },
    { key: '专业', value: '计算机科学与技术' },
    { key: '学历类别', value: '普通高等教育' },
    { key: '学制', value: '4' },
    { key: '学习形式', value: '普通全日制' },
    { key: '层次', value: '本科' },
    { key: '毕（结）业', value: '毕业' },
    { key: '校（院）长姓名', value: '王志刚' },
    { key: '证书编号', value: '100861201305000316' },
  ];
  return (
    <div className="education">
      {name ? (
        <img className="imge1" src={'./capture001.png'} alt="" id="img" />
      ) : (
        <img className="imge2" src={'./capture002.png'} alt="" id="img" />
      )}
      <div className="goBack" onClick={goBack}></div>
      <div className="tag">
        <div className="tagItem" onClick={() => switchs(1)}></div>
        <div className="tagItem" onClick={() => switchs(2)}></div>
      </div>

      <div className="titles">
        <WaterMark
          content={'学信网'}
          gapX={-24}
          gapY={24}
          fontWeight={500}
          fontSize={21}
          fullPage={false}
          rotate={30}
          fontColor={'rgba(0, 0, 0, .15)'}
        />
        本科-河北农业大学-计算机科学与技术
      </div>
      <div className="headPortrait1">
        <img
          className="imge1"
          src={`${name ? './head1.jpg' : './head2.jpg'}`}
          alt=""
          id="img"
        />
      </div>
      {name && (
        <div className="headPortrait2">
          <img className="imge1" src={'./head2.jpg'} alt="" id="img" />
        </div>
      )}
      <div className="information"></div>
      {name ? (
        <div className="information1">
          {list.map((item: any) => {
            return (
              <div className="informationItem" key={item.key}>
                <span className="keyStyle">{item.key}： </span>
                <span className="keyRight"> {item.value}</span>
              </div>
            );
          })}
          <WaterMark
            content={'学信网'}
            width={190}
            gapX={10}
            gapY={71}
            fontWeight={500}
            fontSize={24}
            fullPage={false}
            rotate={30}
            fontColor={'rgba(0, 0, 0, .07)'}
          />
        </div>
      ) : (
        <div className="information2">
          {list1.map((item: any) => {
            return (
              <div className="informationItem" key={item.key}>
                <span className="keyStyle">{item.key}： </span>
                <span className="keyRight"> {item.value}</span>
              </div>
            );
          })}
          <WaterMark
            content={'学信网'}
            width={190}
            gapX={10}
            gapY={71}
            fontWeight={500}
            fontSize={24}
            fullPage={false}
            rotate={30}
            fontColor={'rgba(0, 0, 0, .07)'}
          />
        </div>
      )}
    </div>
  );
};

export default Education;
