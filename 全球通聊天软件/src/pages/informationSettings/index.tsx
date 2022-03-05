import '../personalInformation/index.scss';
import './index.scss';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SideBar, Tag, Divider, Selector } from 'antd-mobile';
import classNames from 'classnames';
import {
  options,
  options1,
  options2,
  options3,
  options4,
  options5,
  options6,
  options7,
  options8,
  options9,
} from './options';

const InformationSettings = ({ display, goBackS, callback }: any) => {
  const history = useHistory();
  const [imgIdLoc] = useState<any>(
    JSON.parse(window.localStorage.getItem('imgIdLoc') || '[]')
  );
  const [displayBlock, setDisplayBlock] = useState(false);
  const [activeKey, setActiveKey] = useState('key1');
  const [information, setInformation] = useState<any>({});

  useEffect(() => {
    if (!display) {
      let timeout = setTimeout(() => {
        setDisplayBlock(false);
        clearTimeout(timeout);
      }, 300);
    } else {
      setDisplayBlock(true);
    }
  }, [display]);

  // const goBackS = () => {
  //   if (!localStorage.getItem('type')) {
  //     history.push('/');
  //   } else {
  //     history.goBack();
  //   }
  //   localStorage.removeItem('personalInformation');
  // };
  const determine = () => {
    callback(information);
  };

  const selectorKey = (list: any, name: string) => {
    setInformation(Object.assign({}, information, { [name]: list }));
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

  const tabs = [
    {
      key: 'key1',
      title: '基本资料',
      badge: '',
    },
    {
      key: 'key2',
      title: '个人标签',
      badge: '',
    },
  ];

  return (
    <div
      style={{ display: `${displayBlock ? 'block' : 'none'}` }}
      className={`personalInformation ${
        display ? 'right-in-enter' : 'right-in-leave'
      } InformationSettings`}
    >
      <div className="searchBox">
        <div className="home-search">
          <img
            src="/images/fanhui.png"
            className="xiangmu-left"
            alt=""
            onClick={() => goBackS(false)}
          />
          <span>个人资料</span>
        </div>
      </div>
      <div className="contents contents_search_leng">
        <div className="denglu-text ziZhu">
          <div className="xiangCe">
            <div className={'container'}>
              <div className={'side'}>
                <SideBar activeKey={activeKey} onChange={setActiveKey}>
                  {tabs.map((item) => (
                    <SideBar.Item key={item.key} title={item.title} />
                  ))}
                </SideBar>
              </div>
              <div className={'main'}>
                <div
                  className={classNames(
                    'content',
                    activeKey === 'key1' && 'active'
                  )}
                >
                  <div className={'main-key1'}>
                    <Tag round color="#ff7a59">
                      昵称：
                    </Tag>
                    <Tag round color="#ff7a59">
                      户籍：
                    </Tag>
                    <Tag round color="#ff7a59">
                      学历：
                    </Tag>
                    <Tag round color="#ff7a59">
                      工作所在地：
                    </Tag>
                    <Tag round color="#ff7a59">
                      星座：
                    </Tag>
                  </div>
                </div>
                <div
                  className={classNames(
                    'content',
                    activeKey === 'key2' && 'active'
                  )}
                >
                  <div className={'main-key1 main-key2'}>
                    <Divider contentPosition="left">状态</Divider>
                    <div className={'main-Selector'}>
                      <Selector
                        options={options}
                        defaultValue={[]}
                        multiple={true}
                        onChange={(arr, extend) => {
                          // console.log(arr, extend.items);
                          selectorKey(arr, 'ZHUANG_TAI');
                        }}
                      />
                    </div>
                    <Divider contentPosition="left">性格</Divider>
                    <div className={'main-Selector'}>
                      <Selector
                        options={options1}
                        defaultValue={[]}
                        multiple={true}
                        onChange={(arr, extend) => {
                          // console.log(arr, extend.items);
                          selectorKey(arr, 'XING_GE');
                        }}
                      />
                    </div>
                    <Divider contentPosition="left">价值观</Divider>
                    <div className={'main-Selector'}>
                      <Selector
                        options={options3}
                        defaultValue={[]}
                        multiple={true}
                        onChange={(arr, extend) => {
                          // console.log(arr, extend.items);
                          selectorKey(arr, 'JIA_ZHI_GUAN');
                        }}
                      />
                    </div>
                    <Divider contentPosition="left">爱好</Divider>
                    <div className={'main-Selector'}>
                      <Selector
                        options={options4}
                        defaultValue={[]}
                        multiple={true}
                        onChange={(arr, extend) => {
                          // console.log(arr, extend.items);
                          selectorKey(arr, 'AI_HAO');
                        }}
                      />
                    </div>
                    <Divider contentPosition="left">书籍</Divider>
                    <div className={'main-Selector'}>
                      <Selector
                        options={options5}
                        defaultValue={[]}
                        multiple={true}
                        onChange={(arr, extend) => {
                          // console.log(arr, extend.items);
                          selectorKey(arr, 'SHU_JI');
                        }}
                      />
                    </div>
                    <Divider contentPosition="left">美食</Divider>
                    <div className={'main-Selector'}>
                      <Selector
                        options={options6}
                        defaultValue={[]}
                        multiple={true}
                        onChange={(arr, extend) => {
                          // console.log(arr, extend.items);
                          selectorKey(arr, 'MEI_SHI');
                        }}
                      />
                    </div>
                    <Divider contentPosition="left">运动</Divider>
                    <div className={'main-Selector'}>
                      <Selector
                        options={options7}
                        defaultValue={[]}
                        multiple={true}
                        onChange={(arr, extend) => {
                          // console.log(arr, extend.items);
                          selectorKey(arr, 'YUN_DONG');
                        }}
                      />
                    </div>
                    <Divider contentPosition="left">电影</Divider>
                    <div className={'main-Selector'}>
                      <Selector
                        options={options8}
                        defaultValue={[]}
                        multiple={true}
                        onChange={(arr, extend) => {
                          // console.log(arr, extend.items);
                          selectorKey(arr, 'DIAN_YING');
                        }}
                      />
                    </div>
                    <Divider contentPosition="left">游戏</Divider>
                    <div className={'main-Selector'}>
                      <Selector
                        options={options9}
                        defaultValue={[]}
                        multiple={true}
                        onChange={(arr, extend) => {
                          // console.log(arr, extend.items);
                          selectorKey(arr, 'YOU_XI');
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-top"></div>
          <div className="denglu-food" onClick={determine}>
            <span>确定</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationSettings;
