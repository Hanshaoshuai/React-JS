import '../personalInformation/index.scss';
import './index.scss';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  SideBar,
  Tag,
  Divider,
  Selector,
  Picker,
  Dialog,
  Input,
  Toast,
  CascadePicker,
} from 'antd-mobile';
import classNames from 'classnames';
import {
  options0,
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
  basicColumnsObj,
} from './options';

const InformationSettings = ({
  display,
  goBackS,
  callback,
  setName,
  name,
  labelData,
  indexId,
  labelOption,
}: any) => {
  const [newOptions0, setNewOptions0] = useState<any>([...options0]);
  let valueInputText = '';
  const history = useHistory();
  const [imgIdLoc] = useState<any>(
    JSON.parse(window.localStorage.getItem('imgIdLoc') || '[]')
  );
  const [displayBlock, setDisplayBlock] = useState(false);
  const [activeKey, setActiveKey] = useState('key1');
  const [information, setInformation] = useState<any>({});
  const [basicInformation, setBasicInformation] = useState<any>({});
  const [basicList, setBasicList] = useState<any>('');

  const [visible, setVisible] = useState(false);
  const [visibleCascade, setVisibleCascade] = useState(false);
  const [value, setValue] = useState<(string | null)[]>(['50kg']);
  const [basicColumns, setBasicColumns] = useState<any>([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [valueInput, setValueInput] = useState<any>(name);
  const [changes, setChanges] = useState(false);

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

  useEffect(() => {
    if (name) {
      // setValueInput(name);
      let newList = options0.map((item: any) => {
        if (item.label === '昵称') {
          item.value = name;
        }
        return item;
      });
      setNewOptions0(newList);
    }
  }, [name]);
  useEffect(() => {
    if (labelOption?.length) {
      setNewOptions0(labelOption);
    }
  }, [labelOption]);

  useEffect(() => {
    // if(labelData.ZHUANG_TAI){
    //   options.push()
    // }
    setInformation(labelData);
  }, [labelData]);

  const determine = () => {
    // let res = false;
    // newOptions0.map((item:any)=>{
    //   if(item.value){
    //     res = true
    //   }
    //   return item;
    // })
    // if(res){
    //   Toast.show('基本资料填写完整');
    //   return;
    // }
    callback({ newOptions0, information });
  };

  const selectorKey = (list: any, name: string) => {
    setInformation(Object.assign({}, information, { [name]: list }));
  };

  useEffect(() => {
    if (basicList) {
      if (basicList === '户籍' || basicList === '工作所在地') {
        setVisibleCascade(true);
      } else {
        setVisible(true);
      }
    }
  }, [changes]);
  const onSetBasicInformation = async (value: any) => {
    // console.log(value);
    if (value === '昵称') {
      const result = await Dialog.confirm({
        content: (
          <Input
            className="adm-dialog-wrap-input"
            placeholder="请输入昵称"
            // value={valueInput}
            onChange={(val) => {
              valueInputText = val;
            }}
          />
        ),
      });
      // console.log(result);
      if (!result || valueInputText.length >= 13) {
        if (result && valueInputText.length >= 13) {
          Toast.show('昵称太长！请在13个字符内');
        }
        valueInputText = valueInput;
        setValueInput(valueInput);
      } else {
        setValueInput(valueInputText);
        setName(valueInputText);
        let newList = [...newOptions0].map((item: any) => {
          if (item.label === '昵称') {
            item.value = valueInputText;
          }
          return item;
        });
        setNewOptions0(newList);
      }
      return;
    }
    setChanges(!changes);
    setBasicList(value);
    setBasicColumns(basicColumnsObj[value]);
  };
  const onConfirm = (e: any) => {
    let newList = [...newOptions0].map((item: any) => {
      if (item.label === basicList) {
        if (basicList === '户籍' || basicList === '工作所在地') {
          item.value = e[1] ? `${e[0]}-${e[1]}` : e[0];
        } else {
          item.value = e[0];
        }
      }
      return item;
    });
    // console.log(e, basicList, newList);
    setNewOptions0(newList);
    setValue(e);
  };
  const onAction = (e: any) => {
    // console.log(e);
  };

  const custom = async (name: string, options: any, holder: string) => {
    let InputText = '';
    const result = await Dialog.confirm({
      content: (
        <Input
          className="adm-dialog-wrap-input"
          placeholder={`请输入自定义-${holder}`}
          // value={valueInput}
          onChange={(val) => {
            InputText = val;
          }}
        />
      ),
    });
    if (result) {
      const list = (information[name] && [...information[name]]) || [];
      if (!list.length) {
        Toast.show('添加自定义前，请先选一个！');
        return;
      }
      list.push(InputText);
      options.push({
        label: InputText,
        value: InputText,
      });
      setInformation(Object.assign({}, information, { [name]: list }));
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
  const onScroll = (e: any) => {
    // console.log(
    //   e,
    //   e.target.scrollTop,
    //   e.target.getElementsByClassName('adm-divider')[2].offsetTop,
    //   e.target.getElementsByClassName('adm-divider')[2].offsetTop -
    //     e.target.scrollTop
    // );
    const domList: any = e.target.getElementsByClassName('adm-divider') || [];
    [...domList].map((item: any, index: number) => {
      if (index > 1) {
        // console.log(item.offsetHeight);
        let numbers = item.offsetTop - e.target.scrollTop;
        if (numbers > 0 && numbers < item.offsetHeight) {
          // console.log(index, item.innerText, Math.floor(numbers));
        }
        if (Math.floor(numbers) > 0 && Math.floor(numbers) < 50) {
          domList[0].children[0].innerText = item.innerText;
        } else if (
          Math.floor(numbers) > 50 &&
          Math.floor(numbers) < 100 &&
          domList[index - 1]
        ) {
          domList[0].children[0].innerText = domList[index - 1].innerText;
        }
      }
      return item;
    });
  };
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
          <span>资料设置</span>
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
                  <div className={'main-key0 main-key1'}>
                    {newOptions0.map((item: any, index: number) => (
                      <div
                        style={{ padding: '0 0.15rem' }}
                        key={`${item.label}_${index}`}
                      >
                        <Tag
                          round
                          color="#ff7a59"
                          onClick={() => onSetBasicInformation(item.label)}
                          key={`${item.label}_${index}`}
                        >
                          {item.label}：{item.value}
                        </Tag>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className={classNames(
                    'content',
                    activeKey === 'key2' && 'active'
                  )}
                  onScroll={(e) => onScroll(e)}
                >
                  <Divider className={'main-Divider'} contentPosition="left">
                    状态
                  </Divider>
                  {display && (
                    <div className={'main-key1 main-key2'}>
                      <Divider contentPosition="left">状态</Divider>
                      <div className={'main-Selector'}>
                        <Selector
                          options={options}
                          value={information?.ZHUANG_TAI || []}
                          multiple={true}
                          onChange={(arr, extend) => {
                            // console.log(arr, extend.items);
                            selectorKey(arr, 'ZHUANG_TAI');
                          }}
                        />
                        <div className="adm-space-item1">
                          <div
                            className="adm-selector-item1"
                            onClick={() =>
                              custom('ZHUANG_TAI', options, '状态')
                            }
                          >
                            添加自定义
                          </div>
                        </div>
                      </div>
                      <Divider contentPosition="left">性格</Divider>
                      <div className={'main-Selector'}>
                        <Selector
                          options={options1}
                          value={information?.XING_GE || []}
                          multiple={true}
                          onChange={(arr, extend) => {
                            // console.log(arr, extend.items);
                            selectorKey(arr, 'XING_GE');
                          }}
                        />
                        <div className="adm-space-item1">
                          <div
                            className="adm-selector-item1"
                            onClick={() => custom('XING_GE', options1, '性格')}
                          >
                            添加自定义
                          </div>
                        </div>
                      </div>
                      <Divider contentPosition="left">价值观</Divider>
                      <div className={'main-Selector'}>
                        <Selector
                          options={options3}
                          value={information?.JIA_ZHI_GUAN || []}
                          multiple={true}
                          onChange={(arr, extend) => {
                            // console.log(arr, extend.items);
                            selectorKey(arr, 'JIA_ZHI_GUAN');
                          }}
                        />
                        <div className="adm-space-item1">
                          <div
                            className="adm-selector-item1"
                            onClick={() =>
                              custom('JIA_ZHI_GUAN', options3, '价值观')
                            }
                          >
                            添加自定义
                          </div>
                        </div>
                      </div>
                      <Divider contentPosition="left">爱好</Divider>
                      <div className={'main-Selector'}>
                        <Selector
                          options={options4}
                          value={information?.AI_HAO || []}
                          multiple={true}
                          onChange={(arr, extend) => {
                            // console.log(arr, extend.items);
                            selectorKey(arr, 'AI_HAO');
                          }}
                        />
                        <div className="adm-space-item1">
                          <div
                            className="adm-selector-item1"
                            onClick={() => custom('AI_HAO', options4, '爱好')}
                          >
                            添加自定义
                          </div>
                        </div>
                      </div>
                      <Divider contentPosition="left">书籍</Divider>
                      <div className={'main-Selector'}>
                        <Selector
                          options={options5}
                          value={information?.SHU_JI || []}
                          multiple={true}
                          onChange={(arr, extend) => {
                            // console.log(arr, extend.items);
                            selectorKey(arr, 'SHU_JI');
                          }}
                        />
                        <div className="adm-space-item1">
                          <div
                            className="adm-selector-item1"
                            onClick={() => custom('SHU_JI', options5, '书籍')}
                          >
                            添加自定义
                          </div>
                        </div>
                      </div>
                      <Divider contentPosition="left">美食</Divider>
                      <div className={'main-Selector'}>
                        <Selector
                          options={options6}
                          value={information?.MEI_SHI || []}
                          multiple={true}
                          onChange={(arr, extend) => {
                            // console.log(arr, extend.items);
                            selectorKey(arr, 'MEI_SHI');
                          }}
                        />
                        <div className="adm-space-item1">
                          <div
                            className="adm-selector-item1"
                            onClick={() => custom('MEI_SHI', options6, '美食')}
                          >
                            添加自定义
                          </div>
                        </div>
                      </div>
                      <Divider contentPosition="left">运动</Divider>
                      <div className={'main-Selector'}>
                        <Selector
                          options={options7}
                          value={information?.YUN_DONG || []}
                          multiple={true}
                          onChange={(arr, extend) => {
                            // console.log(arr, extend.items);
                            selectorKey(arr, 'YUN_DONG');
                          }}
                        />
                        <div className="adm-space-item1">
                          <div
                            className="adm-selector-item1"
                            onClick={() => custom('YUN_DONG', options7, '运动')}
                          >
                            添加自定义
                          </div>
                        </div>
                      </div>
                      <Divider contentPosition="left">电影</Divider>
                      <div className={'main-Selector'}>
                        <Selector
                          options={options8}
                          value={information?.DIAN_YING || []}
                          multiple={true}
                          onChange={(arr, extend) => {
                            // console.log(arr, extend.items);
                            selectorKey(arr, 'DIAN_YING');
                          }}
                        />
                        <div className="adm-space-item1">
                          <div
                            className="adm-selector-item1"
                            onClick={() =>
                              custom('DIAN_YING', options8, '电影')
                            }
                          >
                            添加自定义
                          </div>
                        </div>
                      </div>
                      <Divider contentPosition="left">游戏</Divider>
                      <div className={'main-Selector'}>
                        <Selector
                          options={options9}
                          value={information?.YOU_XI || []}
                          multiple={true}
                          onChange={(arr, extend) => {
                            // console.log(arr, extend.items);
                            selectorKey(arr, 'YOU_XI');
                          }}
                        />
                        <div className="adm-space-item1">
                          <div
                            className="adm-selector-item1"
                            onClick={() => custom('YOU_XI', options9, '游戏')}
                          >
                            添加自定义
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
      {visible && (
        <Picker
          columns={basicColumns}
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          value={value}
          onConfirm={onConfirm}
          // onSelect={(val, extend) => {
          //   console.log('onSelect', val, extend.items);
          // }}
        ></Picker>
      )}
      {visibleCascade && (
        <CascadePicker
          options={basicColumns}
          visible={visibleCascade}
          onClose={() => {
            setVisibleCascade(false);
          }}
          value={value}
          onConfirm={onConfirm}
          // onSelect={(val, extend) => {
          //   console.log('onSelect', val, extend.items);
          // }}
        ></CascadePicker>
      )}
      <Dialog
        className="Dialog-box"
        visible={visibleModal}
        content="人在天边月上明"
        closeOnAction
        onAction={(e) => onAction(e)}
        onClose={() => {
          setVisibleModal(false);
        }}
        // actions={[
        //   {
        //     key: 'confirm',
        //     text: '确定',
        //   },
        //   {
        //     key: 'confirm',
        //     text: '取消',
        //   },
        // ]}
      />
    </div>
  );
};

export default InformationSettings;
