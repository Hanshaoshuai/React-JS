import './index.scss';

import { Toast, Radio, Switch } from 'antd-mobile';
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { registers } from '../../api';
import { Upload } from '../A-components/upload';
import InformationSettings from '../informationSettings';
import HooksCropperModal from '../HooksCropperModal/HooksCropperModal';

const Register = () => {
  const history = useHistory();
  const fs: any = useRef(null);
  const [name, setNames] = useState<any>('');
  const [telephone, setTelephone] = useState<any>();
  const [verify, setVerify] = useState<any>();
  const [password, setPassword] = useState<any>('');
  const [value, setValue] = useState<any>(false);
  const [percentBlock] = useState<any>(false);
  const [imgSrc, setImgSrc] = useState<any>('/images/touxiang.jpg');
  const [imgApathZoom, setImgApathZoom] = useState<any>('');
  const [hooksModalFile, setHooksModalFile] = useState<any>('');
  const [hooksModalVisible, setHooksModalVisible] = useState<any>(false);
  const [type, setType] = useState<any>('');
  const [settings, setSettings] = useState<any>(false);

  const yijianHind = () => {
    // history.goBack();
  };
  const quxiao = () => {};
  const huoquMima = () => {};
  const mima = () => {};
  const toIogin = () => {
    history.push('/login');
  };

  const mockUpload = (file: any) => {
    const fileN = file.target.files[0];
    let typeName = fileN.name.split('.');
    setType(typeName[typeName.length - 1]);
    setHooksModalFile(fileN);
    setHooksModalVisible(true);
    // console.log(fileN, typeName[typeName.length - 1]);
  };

  const handleGetResultImgUrl = async (blob: any) => {
    // const str = URL.createObjectURL(blob);
    const { icon, apathZoom }: any = await Upload(blob, type);
    setImgSrc(icon);
    setImgApathZoom(apathZoom);
    // console.log(icon, apathZoom);
  };

  const setHooksModalVisibles = () => {
    setHooksModalVisible(false);
    if (fs) {
      fs.current.value = null;
    }
  };

  const radioChange = (e: any) => {
    // console.log('radio checked', e);
    setValue(e);
  };
  const onChange = (e: any, text: string) => {
    if (text === '0') {
      setNames(e.target.value);
    }
    if (text === '1') {
      setTelephone(e.target.value);
    }
    if (text === '2') {
      setVerify(e.target.value);
    }
    if (text === '3') {
      setPassword(e.target.value);
    }
  };
  const registersQ = () => {
    const imgId = localStorage.getItem('imgId');
    if (!name) {
      Toast.show({
        content: '为自己起个名字吧！',
        position: 'top',
      });
      return;
    }
    if (!telephone) {
      Toast.show({
        content: '你的电话是什么呢！',
        position: 'top',
      });
      return;
    } else {
      if (
        !/(16[0-9]|17[0-9]|18[0-9]|15[0-9]|13[0-9]|14[0-9]|19[0-9])[0-9]{8}$/.test(
          telephone
        )
      ) {
        Toast.show({
          content: '请输入正确的11位号码！',
          position: 'top',
        });
        return;
      }
    }
    if (!password) {
      Toast.show({
        content: '请输入你的密码！',
        position: 'top',
      });
      return;
    }
    if (!imgId) {
      Toast.show({
        content: '请输上传你的头像！',
        position: 'top',
      });
      return;
    }
    setSettings(true);
  };
  const goBackS = (e: boolean) => {
    setSettings(e);
  };
  const callback = (e: any) => {
    const imgId = localStorage.getItem('imgId');
    // console.log(e);
    // const {information,newOptions0}=e
    if (!name) {
      Toast.show({
        content: '为自己起个名字吧！',
        position: 'top',
      });
      return;
    }
    const obj = {
      nickName: name,
      name: telephone,
      password,
      sex: value ? 'Sir' : 'sex',
      imgId,
      headPortrait: imgSrc,
      apathZoom: imgApathZoom,
      information: e,
    };
    // console.log(obj);
    registers(obj).then((res) => {
      // console.log("123456", res);
      if (res.code === 200) {
        Toast.show({
          icon: 'success',
          content: '注册成功',
        });
        history.push('/login');
      }
      if (res.code === 2002) {
        Toast.show({
          content: res.msg,
          position: 'top',
        });
      }
    });
  };
  const setName = (e: string) => {
    setNames(e);
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
  return (
    <div className="denglu" ref={denglu}>
      <InformationSettings
        display={settings}
        goBackS={goBackS}
        callback={callback}
        setName={setName}
        name={name}
        labelData={{}}
        indexId={true}
        register={true}
      />
      <div
        className="xiangmu-header"
        style={{ paddingTop: `${window.userAgents}px` }}
        onClick={yijianHind}
      >
        <span className="xiangmu-left"></span>
        <span>注册</span>
      </div>
      <div
        className="contents"
        style={{ paddingTop: `${window.userAgents + 90}px` }}
      >
        <div className="logo">
          <label>
            <ul>
              <li>
                {percentBlock ? '123' : ''}
                <img src={imgSrc} alt="" id="img" />
                <input
                  onChange={(files: any) => mockUpload(files)}
                  style={{ display: 'none' }}
                  type="file"
                  name=""
                  ref={fs}
                  accept="image/jpeg,image/jpg,image/png"
                />
                <span style={{ display: 'none' }} id="button1">
                  更换头像
                </span>
              </li>
            </ul>
          </label>
          <div className="half-area"></div>
          {hooksModalVisible && (
            <HooksCropperModal
              uploadedImageFile={hooksModalFile}
              onClose={setHooksModalVisibles}
              onSubmit={handleGetResultImgUrl}
            />
          )}
        </div>
        <div className="denglu-text">
          <ul>
            <li>
              <span>
                <img src="/images/6nichengzhao.png" alt="" />
              </span>
              <input
                value={name}
                placeholder="请输入昵称"
                type="text"
                className="nickName mint-field-core"
                onChange={(e) => onChange(e, '0')}
              />
              <a onClick={quxiao}></a>
            </li>
            <li>
              <span className="shouJi">
                <img src="/images/yonghu.png" alt="" />
              </span>
              <input
                onFocus={onFocus}
                placeholder="请输入手机号"
                type="number"
                onChange={(e) => onChange(e, '1')}
                className="ferst mint-field-core"
              />
              <a onClick={quxiao}></a>
            </li>
            <li onClick={onFocus}>
              <span>
                <img src="/images/yanzhengma2.png" alt="" />
              </span>
              <input
                onFocus={onFocus}
                placeholder="请输验证码（暂不需要）"
                onChange={(e) => onChange(e, '2')}
                className="last mint-field-core"
              />
              <a className="yanzhengMa" onClick={huoquMima}>
                获取验证码
              </a>
            </li>
            <li onClick={onFocus}>
              <span>
                <img src="/images/mima.png" alt="" />
              </span>
              <input
                onFocus={onFocus}
                placeholder="请输入密码"
                type="password"
                onChange={(e) => onChange(e, '3')}
                className="last1 mint-field-core"
              />
              <a v-show="mimas" onClick={mima}></a>
            </li>
          </ul>
        </div>
        <div className="sir_madam">
          <div id="sir_madam_box">
            {/* <Radio.Group onChange={radioChange} value={value}>
              <Radio style={{ marginRight: '6px' }} value={'Sir'}>
                男
              </Radio>
              <Radio value={'sex'}>女</Radio>
            </Radio.Group> */}

            <div
              style={{
                fontSize: '0.37rem',
                padding: '0 0.22rem',
                color: `${value ? '#1677ff' : '#ff7a59'}`,
                fontWeight: '600',
              }}
            >
              {value ? '男' : '女'}
            </div>
            <Switch
              checked={value}
              onChange={(checked) => {
                setValue(checked);
              }}
            />
          </div>
        </div>
        <div className="denglu-food" onClick={registersQ}>
          <span>注&nbsp;&nbsp;册</span>
        </div>
        <div className="denglu-to">
          <ul>
            <li className="denglu-wangji">忘记密码</li>&nbsp;&nbsp;|&nbsp;&nbsp;
            <li onClick={toIogin} className="denglu-zhuce">
              <span>登录已有账号</span>
            </li>
          </ul>
        </div>
        <div className="denglu-list denglu-bottom">合作热线：18310998379</div>
      </div>
    </div>
  );
};

export default Register;
