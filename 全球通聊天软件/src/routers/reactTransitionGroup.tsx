import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

let index: any = 0; // 当前的  用于记录上一次的路由  如果是返回条件要 赋值给previous的
let newDom: any = null; // 当前dom；
let indexId = 0;
const ReactTransitionGroup = ({ path, component }: any): ReactElement => {
  const [pathNameList, setPathNameList] = useState<any>([]); // 上一个
  const [states, setStates] = useState<any>(null); // 判断返回还是下一个
  const [switchs, setSwitchs] = useState<any>(false);

  const [odDom, setOdDom] = useState<any>(null); // 之前的dom；
  const [stata, setStata] = useState<any>(false);

  useEffect(() => {
    if (path) {
      setStata(!stata);
      if (!odDom) {
        setOdDom(<Route component={component} />);
      }
      if (index === 0) {
        setPathNameList([path]);
      } else {
        const odList = [...pathNameList];
        odList.push(path);
        const listName = [];
        for (let i = 0; i < odList.length; i++) {
          if (odList[i] === path) {
            indexId += 1;
            listName.push(path);
            break;
          } else {
            listName.push(odList[i]);
          }
        }
        if (listName.length > pathNameList.length) {
          setStates('上一次操作路由向下');
        } else {
          setStates('上一次操作路由返回');
        }
        setSwitchs(true);
        setPathNameList(listName);
      }
      index += 1;
      newDom = <Route component={component} />;
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        setSwitchs(false);
        setOdDom(newDom);
      }, 10280);
    }
    console.log(indexId);
  }, [path]);
  const onChenge = useCallback(() => {
    if (path) {
      return (
        <>
          {switchs && states === '上一次操作路由向下' && (
            <div
              style={{
                position: 'relative',
                width: '50%',
                height: '100%',
                float: 'left',
              }}
            >
              {odDom}
            </div>
          )}
          <div
            style={{
              position: 'relative',
              width: `${switchs ? '50%' : '100%'}`,
              height: '100%',
              float: 'left',
            }}
          >
            <Route path={path} exact={true} component={component} />
          </div>
          {switchs && states === '上一次操作路由返回' && (
            <div
              style={{
                position: 'relative',
                width: '50%',
                height: '100%',
                float: 'left',
              }}
            >
              {odDom}
            </div>
          )}
        </>
      );
    }
  }, [stata, switchs]);
  useEffect(() => {
    insert();
  }, []);
  const insert = () => {
    const box: any = document.getElementById('transitionGroup');
    const dom: any = document.createElement('div');
    dom.setAttribute('class', 'left-in-enter');
    dom.style.width = '100%';
    dom.style.height = '30px';
    dom.style.background = '#f666';
    // dom.innerHTML = '添加';
    dom.onclick = remove;
    console.log(dom);
    box.appendChild(dom);
  };
  const remove = (e: any) => {
    let timeout = setTimeout(() => {
      clearTimeout(timeout);
      box.removeChild(e.target);
    }, 10280);
    e.target.setAttribute('class', 'left-in-leave');
    const box: any = document.getElementById('transitionGroup');

    console.log(e.target);
  };
  if (path) {
    return (
      <div
        id="transitionGroup"
        // className={`${
        //   switchs && states === '上一次操作路由返回'
        //     ? 'zoomLeft'
        //     : switchs && states === '上一次操作路由向下'
        //     ? 'zoomRight'
        //     : ''
        // }`}
        style={{
          position: 'absolute',
          left: '0',
          top: '0',
          // left: `${switchs && states === '上一次操作路由返回' ? '-100%' : '0'}`,
          // width: `${switchs ? '200%' : '100%'}`,
          width: '100%',
          height: '100%',
        }}
      >
        {/* <div onClick={insert}>插入</div>
        <div onClick={(e) => remove(e)}>移除</div> */}
        {/* {onChenge()} */}
        {(switchs || states === '上一次操作路由向下') && (
          <div
            className={`${
              states === '上一次操作路由返回'
                ? 'left-in-enter'
                : states === '上一次操作路由向下'
                ? 'left-in-leave'
                : ''
            }`}
            style={
              {
                // position: 'relative',
                // width: '100%',
                // height: '100%',
                // float: 'left',
                // display: `${
                //   switchs && states === '上一次操作路由向下' ? 'block' : 'none'
                // }`,
              }
            }
          >
            {states === '上一次操作路由向下' ? (
              <Route path={path} exact={true} component={component} />
            ) : (
              odDom
            )}
          </div>
        )}
        {indexId === 0 && (
          <div
            // className={`${
            //   switchs && states === '上一次操作路由返回'
            //     ? 'left-in-leave'
            //     : switchs && states === '上一次操作路由向下'
            //     ? 'left-in-leave'
            //     : 'left-in-leave'
            // }`}
            style={{
              position: 'relative',
              width: `${switchs ? '100%' : '100%'}`,
              height: '100%',
              float: 'left',
            }}
          >
            <Route path={path} exact={true} component={component} />
          </div>
        )}
        {(switchs || states === '上一次操作路由返回') && (
          <div
            className={`${
              states === '上一次操作路由返回'
                ? 'right-in-leave'
                : states === '上一次操作路由向下'
                ? 'right-in-enter'
                : ''
            }`}
            style={
              {
                // position: 'relative',
                // width: '100%',
                // height: '100%',
                // float: 'left',
                // display: `${
                //   switchs && states === '上一次操作路由返回' ? 'block' : 'none'
                // }`,
              }
            }
          >
            {states === '上一次操作路由返回' || indexId > 0 ? (
              <Route path={path} exact={true} component={component} />
            ) : (
              odDom
            )}
          </div>
        )}
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default ReactTransitionGroup;
