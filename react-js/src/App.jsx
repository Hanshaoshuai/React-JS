import './App.css';
import { useState, useRef } from 'react';
// import TabSwitch, { TabSwitchTabs } from 'tabswitch';
// import { name } from 'react-jsx';

import { TabSwitch, TabSwitchPage } from 'tab-switch-react';
import { CombinationDrawer } from 'combination-drawer-react';

function App() {
  const [setSelectedKey, setSetSelectedKey] = useState(2);
  const dataList1 = [
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
  const dataList = [
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

  const selectedKey = (state) => {
    const { e, key, value } = state;
    console.log(state, e, key, value);
    setSetSelectedKey(key);
  };
  const list = [
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
        <div style={{ width: '260px', height: '20px' }}>
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
          style={{ width: '330px', height: '20px' }}
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
          style={{ width: '400px', height: '20px' }}
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
  const list1 = [
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

  const drawers = useRef(null);
  const [drawerShow, setDrawerShow] = useState(false);
  const [filters, setFilters] = useState({});
  const indexFilter = (index, title) => {
    // 进入下一层抽屉
    setFilters({ index, title });
  };
  const submitClose = (index) => {
    // 提交事件后关闭该层抽屉
    if (drawers) {
      drawers.current.getInfo(index);
    }
  };
  const [newList, setNewList] = useState(list);
  const onSetDrawerShows = (index) => {
    if (index === 1) {
      setNewList(list);
    }
    if (index === 2) {
      setNewList(list1);
    }
    setDrawerShow(true);
  };
  return (
    <div className="App">
      <div onClick={() => onSetDrawerShows(1)} style={{ cursor: 'pointer' }}>
        点击1
      </div>
      <div onClick={() => onSetDrawerShows(2)} style={{ cursor: 'pointer' }}>
        点击2
      </div>
      <div>
        <CombinationDrawer
          ref={drawers}
          list={newList} // 数据
          drawerShow={drawerShow} // 抽屉开关true/false
          setDrawerShow={setDrawerShow} // 关闭抽屉事件
          filters={filters} // 进入下一层抽屉参数（index，和 标题）
          titles={true} // 是否显示顶部标题层级关系：如（第一层/第二次/第三层）并点击返回该层抽屉
          redundantWidth={35} // 每层抽屉露出的宽度
          initial={false} // 设置true，初始化最多展示1个抽屉；
        />
      </div>
      {/* 123{name()} */}
      <div
        style={{
          width: '100%',
          height: '100%',
          // position: 'fixed',
          // top: '0',
          // left: '0',
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
            defaults={2} // 设置默认高亮；如果与<SelectorTabs/>一起使用默认值要与<SelectorTabs/>的setSelectedKey值相等
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
      </div>
    </div>
  );
}

export default App;
