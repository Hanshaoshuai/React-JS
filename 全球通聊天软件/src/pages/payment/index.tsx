import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd-mobile';
import { UnorderedListOutline, CloseCircleOutline } from 'antd-mobile-icons';
import '../chatroom/index.scss';
import { StartPayment } from './payment';

const Payment = () => {
  const history = useHistory();
  const dom: any = useRef(null);
  const [value, setValue] = useState<any>();
  const [onPlayUrl, setOnPlayUrl] = useState<any>('');
  const goBackS = () => {
    history.goBack();
  };
  useEffect(() => {
    if (dom && value && value * 1 > 0) {
      StartPayment({ dcontent: dom.current, info: '', value: value * 1 });
    }
  }, [value]);
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
            <span className="toNames">充值中心</span>
          </div>
        </div>
      </div>
      <div
        className="xiangmu-box payment-box"
        style={{ paddingTop: `calc(0.9rem + ${window.userAgents}px)` }}
      >
        <div
          style={{
            background: '#FFF',
            width: '85%',
            margin: '0 auto',
            padding: '0.2rem 0.2rem',
            marginTop: '0.3rem',
            marginBottom: '0.3rem',
          }}
        >
          <Input
            placeholder="请输入金额"
            value={value}
            type={'number'}
            onChange={(val) => {
              setValue(val);
            }}
            clearable
          />
        </div>
        <div ref={dom}></div>
      </div>
    </div>
  );
};

export default Payment;
