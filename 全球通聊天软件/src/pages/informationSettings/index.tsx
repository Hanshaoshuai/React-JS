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
  options22,
  options3,
  options4,
  options44,
  options5,
  options6,
  options7,
  options8,
  options88,
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
  determineWait,
  register,
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
  const [value, setValue] = useState<(string | null)[]>([]);
  const [basicColumns, setBasicColumns] = useState<any>([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [valueInput, setValueInput] = useState<any>(name);
  const [changeName, setChangeName] = useState(true);
  const [indexKey, setIndexKey] = useState(0);

  useEffect(() => {
    if (!determineWait) {
      setChangeName(true);
    }
  }, [determineWait]);
  useEffect(() => {
    if (!display) {
      let timeout = setTimeout(() => {
        setDisplayBlock(false);
        clearTimeout(timeout);
      }, 310);
    } else if (display) {
      setDisplayBlock(true);
    }
    if (register) {
      setChangeName(false);
    }
    let timeout = setTimeout(() => {
      setIndexKey(indexKey + 1);
      clearTimeout(timeout);
    }, 310);
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
      setNewOptions0([...newList]);
    }
  }, [name]);
  useEffect(() => {
    if (labelOption?.length) {
      setNewOptions0([...labelOption]);
    }
  }, [labelOption]);
  const newList = (Z: any, B: any) => {
    const newB = [...B];
    Z.map((item: any) => {
      for (let i = 0; i < newB.length; i++) {
        if (item.label === newB[i]) {
          newB.splice(i, 1);
          break;
        }
      }
      return item;
    });
    if (newB.length) {
      newB.map((item) => {
        Z.push({
          label: item,
          value: item,
        });
        return item;
      });
    }
  };
  useEffect(() => {
    if (labelData) {
      if (labelData?.ZHUANG_TAI) {
        newList(options, labelData.ZHUANG_TAI);
      }
      if (labelData?.XING_GE) {
        newList(options1, labelData.XING_GE);
      }
      if (labelData?.JIA_ZHI_GUAN) {
        newList(options3, labelData.JIA_ZHI_GUAN);
      }
      if (labelData?.AI_HAO) {
        newList(options4, labelData.AI_HAO);
      }
      if (labelData?.SHU_JI) {
        newList(options5, labelData.SHU_JI);
      }
      if (labelData?.MEI_SHI) {
        newList(options6, labelData.MEI_SHI);
      }
      if (labelData?.YUN_DONG) {
        newList(options7, labelData.YUN_DONG);
      }
      if (labelData?.DIAN_YING) {
        newList(options8, labelData.DIAN_YING);
      }
      if (labelData?.YOU_XI) {
        newList(options9, labelData.YOU_XI);
      }
      setInformation(labelData);
    }
  }, [labelData]);

  const determine = () => {
    if (changeName) {
      setChangeName(!changeName);
      return;
    }
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
  }, [value]);

  const onSetBasicInformation = async (value: any, valueName: any) => {
    // console.log(value, valueName.split('-'));
    if (value === '昵称') {
      const result = await Dialog.confirm({
        content: (
          <Input
            className="adm-dialog-wrap-input"
            placeholder={`${valueName ? valueName : '请输入昵称'}`}
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
    } else {
      setValue(valueName.split('-'));
    }
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
  const onGoBackS = () => {
    setChangeName(!changeName);
    goBackS(false);
  };
  return (
    <div
      style={{ display: `${displayBlock ? 'block' : 'none'}` }}
      className={`personalInformation ${
        display
          ? 'right-in-enter right-in-enter-enter'
          : 'right-in-leave right-in-leave-leave'
      } InformationSettings`}
    >
      <div className="searchBox">
        <div className="home-search">
          <img
            src="/images/fanhui.png"
            className="xiangmu-left"
            alt=""
            onClick={onGoBackS}
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
                          onClick={() =>
                            onSetBasicInformation(item.label, item.value)
                          }
                          key={`${item.label}_${index}`}
                        >
                          {item.label}：{item.value}
                        </Tag>
                      </div>
                    ))}
                    {changeName && <div className={'mainMasking'}></div>}
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
                        {!changeName && (
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
                        )}
                        {changeName && <div className={'mainMasking'}></div>}
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
                        {!changeName && (
                          <div className="adm-space-item1">
                            <div
                              className="adm-selector-item1"
                              onClick={() =>
                                custom('XING_GE', options1, '性格')
                              }
                            >
                              添加自定义
                            </div>
                          </div>
                        )}
                        {changeName && <div className={'mainMasking'}></div>}
                      </div>
                      <Divider contentPosition="left">职业</Divider>
                      <div className={'main-Selector'}>
                        <Selector
                          options={options2}
                          value={information?.ZHI_YE || []}
                          multiple={true}
                          onChange={(arr, extend) => {
                            // console.log(arr, extend.items);
                            selectorKey(arr, 'ZHI_YE');
                          }}
                        />
                        {!changeName && (
                          <div className="adm-space-item1">
                            <div
                              className="adm-selector-item1"
                              onClick={() => custom('ZHI_YE', options1, '职业')}
                            >
                              添加自定义
                            </div>
                          </div>
                        )}
                        {changeName && <div className={'mainMasking'}></div>}
                      </div>
                      <Divider contentPosition="left">生活方式</Divider>
                      <div className={'main-Selector'}>
                        <Selector
                          options={options22}
                          value={information?.SHENG_HUO_FANG_SHI || []}
                          multiple={true}
                          onChange={(arr, extend) => {
                            // console.log(arr, extend.items);
                            selectorKey(arr, 'SHENG_HUO_FANG_SHI');
                          }}
                        />
                        {!changeName && (
                          <div className="adm-space-item1">
                            <div
                              className="adm-selector-item1"
                              onClick={() =>
                                custom(
                                  'SHENG_HUO_FANG_SHI',
                                  options1,
                                  '生活方式'
                                )
                              }
                            >
                              添加自定义
                            </div>
                          </div>
                        )}
                        {changeName && <div className={'mainMasking'}></div>}
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
                        {!changeName && (
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
                        )}
                        {changeName && <div className={'mainMasking'}></div>}
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
                        {!changeName && (
                          <div className="adm-space-item1">
                            <div
                              className="adm-selector-item1"
                              onClick={() => custom('AI_HAO', options4, '爱好')}
                            >
                              添加自定义
                            </div>
                          </div>
                        )}
                        {changeName && <div className={'mainMasking'}></div>}
                      </div>
                      <Divider contentPosition="left">旅行</Divider>
                      <div className={'main-Selector'}>
                        <Selector
                          options={options44}
                          value={information?.LV_XING || []}
                          multiple={true}
                          onChange={(arr, extend) => {
                            // console.log(arr, extend.items);
                            selectorKey(arr, 'LV_XING');
                          }}
                        />
                        {!changeName && (
                          <div className="adm-space-item1">
                            <div
                              className="adm-selector-item1"
                              onClick={() =>
                                custom('LV_XING', options4, '旅行')
                              }
                            >
                              添加自定义
                            </div>
                          </div>
                        )}
                        {changeName && <div className={'mainMasking'}></div>}
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
                        {!changeName && (
                          <div className="adm-space-item1">
                            <div
                              className="adm-selector-item1"
                              onClick={() => custom('SHU_JI', options5, '书籍')}
                            >
                              添加自定义
                            </div>
                          </div>
                        )}
                        {changeName && <div className={'mainMasking'}></div>}
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
                        {!changeName && (
                          <div className="adm-space-item1">
                            <div
                              className="adm-selector-item1"
                              onClick={() =>
                                custom('MEI_SHI', options6, '美食')
                              }
                            >
                              添加自定义
                            </div>
                          </div>
                        )}
                        {changeName && <div className={'mainMasking'}></div>}
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
                        {!changeName && (
                          <div className="adm-space-item1">
                            <div
                              className="adm-selector-item1"
                              onClick={() =>
                                custom('YUN_DONG', options7, '运动')
                              }
                            >
                              添加自定义
                            </div>
                          </div>
                        )}
                        {changeName && <div className={'mainMasking'}></div>}
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
                        {!changeName && (
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
                        )}
                        {changeName && <div className={'mainMasking'}></div>}
                      </div>
                      <Divider contentPosition="left">音乐</Divider>
                      <div className={'main-Selector'}>
                        <Selector
                          options={options88}
                          value={information?.YIN_YUE || []}
                          multiple={true}
                          onChange={(arr, extend) => {
                            // console.log(arr, extend.items);
                            selectorKey(arr, 'YIN_YUE');
                          }}
                        />
                        {!changeName && (
                          <div className="adm-space-item1">
                            <div
                              className="adm-selector-item1"
                              onClick={() =>
                                custom('YIN_YUE', options8, '音乐')
                              }
                            >
                              添加自定义
                            </div>
                          </div>
                        )}
                        {changeName && <div className={'mainMasking'}></div>}
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
                        {!changeName && (
                          <div className="adm-space-item1">
                            <div
                              className="adm-selector-item1"
                              onClick={() => custom('YOU_XI', options9, '游戏')}
                            >
                              添加自定义
                            </div>
                          </div>
                        )}
                        {changeName && <div className={'mainMasking'}></div>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border-top"></div>
          <div
            className="denglu-food"
            style={{ opacity: `${determineWait ? 0.8 : 1}` }}
            onClick={determine}
          >
            <span>{changeName ? '设置' : '确定'}</span>
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
          defaultValue={value}
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
          defaultValue={value}
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
