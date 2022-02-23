import { Button } from 'antd-mobile';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CloseCircleOutline } from 'antd-mobile-icons';
import { Drag } from '../../helpers';
// import banner from "../../../public/images/playground.glb"; // 引入全景图
import './index.scss';

declare global {
  interface Window {
    Cesium?: any;
    viewer?: any;
    ActiveXObject?: any;
    URL_CONFIG?: any;
  }
}
let cameraChangedListener: any = null;
let viewer: any = null;
const SuperMap = () => {
  var ua: any = navigator.userAgent.toLowerCase();
  let urls = '';
  let destination = null;
  const history = useHistory();
  const infoBoxContainer = useRef<HTMLDivElement>(null);
  const [visibility, setVisibility] = useState(true);
  const [switchsVisibility, setSwitchsVisibility] = useState(false);
  const [switchsX, setSwitchsX] = useState(0);
  const [switchsY, setSwitchsY] = useState(0);
  const [titles, setTitles] = useState<any>({});
  const [fullScreen, setFullScreen] = useState<any>(true);
  let iconWidth = 19;
  let iconHeight = 19;
  let itemHeight = 914130;
  if (ua.indexOf('windows') >= 0) {
    iconWidth = 61;
    iconHeight = 61;
    itemHeight = 541319;
  }
  const [markerList] = useState<any>([
    { id: 0, name: '标点', longitude: 910, latitude: 170, height: itemHeight },
    { id: 1, name: '标点1', longitude: 920, latitude: 180, height: itemHeight },
    { id: 2, name: '标点2', longitude: 900, latitude: 180, height: itemHeight },
  ]);

  useEffect(() => {
    const renderer = document.getElementById('cesiumContainer');
    if (window.Cesium) {
      if (window.viewer?.imageryLayers.length > 1) {
        window.viewer.imageryLayers.removeAll();
      }
      viewer = new window.Cesium.Viewer('cesiumContainer', {
        //初始化
        // 关闭有上角图标
        navigation: false,
        infoBox: false,
        terrainProvider: new window.Cesium.CesiumTerrainProvider({
          url: 'http://{s}/realspace/services/3D-dixingyingxiang/rest/realspace/datas/DatasetDEM',
          isSct: true,
          subdomains: ['www.supermapol.com'],
          invisibility: true,
        }),
        selectionIndicator: false, //关闭默认高亮
      });
      window.viewer = viewer;
      // console.log(viewer);
      markerList[0] &&
        markerList.forEach((item: any) => {
          viewer.entities.removeById(item.id);
          viewer.entities.add({
            // 添加自定义坐标点
            id: item.id,
            show: true,
            position: window.Cesium.Cartesian3.fromDegrees(
              item.longitude,
              item.latitude,
              item.height
            ),
            billboard: {
              image:
                item.state === 'operation'
                  ? '/images/user__easyico.png'
                  : '/images/user__easyico.png',
              width: iconWidth,
              height: iconHeight,
              pixelOffset: new window.Cesium.Cartesian2(0, 0),
            },
            name: item.name,
            label: new window.Cesium.LabelGraphics({
              text: item.name,
              font: '14px sans-serif bold',
              // pixelOffset: new Cesium.Cartesian2(0, 30),
              distanceDisplayCondition: {
                near: 100,
                far: 1900000,
              },
            }),
            description: '',
          });
        });
      if (viewer.scene) {
        // console.log(viewer.scene);
        setClickEvent(viewer.scene);
        if (ua.indexOf('windows') >= 0) {
          const scene = viewer.scene;
          scene.globe.enableLighting = true;
          scene.sun = new window.Cesium.Sun();
          scene.sun.glowFactor = 5; // 太阳光大小
        }
      }
      //视角变更监控
      cameraChangedListener =
        viewer.camera.changed.addEventListener(cameraChangeListener);

      // //以下是直接打开模型；及配置；
      // const widget = viewer.cesiumWidget;
      // try {
      //   const promise = scene.open(
      //     // open是直接打开没有动画 Cesium.when()配合使用；
      //     'http://{s}/realspace/services/3D-NewCBD/rest/realspace',
      //     undefined,
      //     {
      //       subdomains: ['www.supermapol.com'],
      //     }
      //   );
      //   window.Cesium.when(
      //     promise,
      //     // // 设置角度位置高度 添加自动定义图标按钮
      //     // function (layer: any) {
      //     //   viewer.camera.setView({
      //     //     destination: window.Cesium.Cartesian3.fromDegrees(
      //     //       111.51802557938487,
      //     //       31.010624342873738,
      //     //       2500
      //     //     ),
      //     //     orientation: {
      //     //       heading: 141.7005863248055,
      //     //       pitch: window.Cesium.Math.toRadians(-70),
      //     //       roll: window.Cesium.Math.toRadians(-15),
      //     //     },
      //     //   });
      //     //   viewer.entities.add({
      //     //     id: 'sx',
      //     //     show: true,
      //     //     position: window.Cesium.Cartesian3.fromDegrees(
      //     //       111.51502557938487,
      //     //       31.001224342873738,
      //     //       500
      //     //     ),
      //     //     billboard: {
      //     //       image: '/images/user__easyico.png',
      //     //       width: 32,
      //     //       height: 34.8,
      //     //       pixelOffset: new window.Cesium.Cartesian2(0, -30),
      //     //     },
      //     //     name: '三峡大坝',
      //     //     label: new window.Cesium.LabelGraphics({
      //     //       text: '三峡大坝',
      //     //       font: '14px sans-serif bold',
      //     //       // pixelOffset: new Cesium.Cartesian2(0, 30),
      //     //       distanceDisplayCondition: {
      //     //         near: 100,
      //     //         far: 1500000,
      //     //       },
      //     //     }),
      //     //     description: '',
      //     //   });
      //     //   setClickEvent(scene);
      //     // },
      //     function (e: any) {
      //       if (widget._showRenderLoopErrors) {
      //         const title =
      //           '加载SCP失败，请检查网络连接状态或者url地址是否正确？';
      //         widget.showErrorPanel(title, undefined, e);
      //       }
      //     }
      //   );
      // } catch (e) {
      //   if (widget._showRenderLoopErrors) {
      //     const title = '渲染时发生错误，已停止渲染。';
      //     widget.showErrorPanel(title, undefined, e);
      //   }
      // }
    }

    if (renderer) {
      renderer.ondblclick = (e: any) => {
        if (e && !history?.location) {
          setVisibility(false);
        }
      };
    }

    const timeout = setTimeout(() => {
      selfRotate();
      clearTimeout(timeout);
    }, 4100);
    return () => {
      cameraChangedListener && cameraChangedListener();
    };
  }, []);

  useEffect(() => {
    initialization();
    if (infoBoxContainer) {
      Drag(infoBoxContainer.current);
    }
  }, []);
  const reset = () => {
    initialization();
    switchs();
  };
  const initialization = () => {
    // 初始化视角
    if (window.viewer?.imageryLayers.length >= 1) {
      // window.viewer.imageryLayers.removeAll();
      window.viewer.camera.flyTo({
        destination: window.Cesium.Cartesian3.fromDegrees(
          954390.6508635766,
          3330000.765306049,
          20010000 // 视角深度
        ),
        orientation: {
          // 地球相对窗口方向位置
          heading: 5,
          pitch: -1.58,
          roll: 2.708944180085382e-13,
        },
        duration: 4,
      });
      const timeout = setTimeout(() => {
        viewer.clock.shouldAnimate = true;
        clearTimeout(timeout);
      }, 4100);
    }
  };
  const setClickEvent = (scene: any) => {
    const handler = new window.Cesium.ScreenSpaceEventHandler(scene.canvas); // 监听点击事件
    if (handler.setInputAction) {
      handler.setInputAction((evt: any) => {
        const pick = scene.pick(evt.position); // 自定义坐标点数据
        var position = scene.pickPosition(evt.position); // 地图坐标
        // console.log(
        //   '地图坐标',
        //   evt,
        //   pick,
        //   position,
        //   { ...pick, position }
        //   // window.Cesium.Cartesian3.fromDegrees(
        //   //   // 转换真正地图坐标
        //   //   position.x,
        //   //   position.y,
        //   //   position.z
        //   // )
        // );
        if (pick?.id) {
          if (infoBoxContainer && infoBoxContainer.current) {
            infoBoxContainer.current.id = pick.id.id;
          }
          setSwitchsX(evt.position.x); // 自定义坐标点相对屏幕像素x
          setSwitchsY(evt.position.y); // 自定义坐标点相对屏幕像素y
          setTitles({ ...pick, position });
          viewer.clock.shouldAnimate = false;
          setSwitchsVisibility(true);
        }
      }, window.Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
  };
  const cameraChangeListener = () => {
    // console.log(infoBoxContainer?.current?.style.display);
    if (
      infoBoxContainer &&
      infoBoxContainer.current &&
      infoBoxContainer.current.style.display === 'block'
    ) {
      const scene = window.viewer.scene;
      const entity = window.viewer.entities.getById(
        infoBoxContainer.current.id
      );
      // console.log(entity);
      if (!entity) {
        return;
      }
      const Cartesian3 = entity.position._value;
      const position = window.Cesium.SceneTransforms.wgs84ToWindowCoordinates(
        scene,
        Cartesian3
      );
      // console.log(position);
      setSwitchsX(position.x - 19); // 自定义坐标点相对屏幕像素x
      setSwitchsY(position.y - 19); // 自定义坐标点相对屏幕像素y
    }
  };
  const realspace = () => {
    // setResets(!resets);
    setSwitchsVisibility(false);
    viewer.clock.shouldAnimate = false;
    if (ua.indexOf('windows') >= 0) {
      urls = 'http://{s}/realspace/services/3D-NewCBD/rest/realspace';
      destination = {
        x: -2177536.8298188746, // 不带负号，数字减小往上移动
        y: 4381226.303062158, // 加大往左移动
        z: 4093133.2575022844, // 镜头的高度
      };
    } else if (navigator.userAgent.indexOf('iPad') >= 0) {
      urls =
        'http://www.supermapol.com/realspace/services/3D-jinjiang/rest/realspace';
      destination = {
        x: -2766646.8109041643,
        y: 5086139.242121006,
        z: 2675753.0881470772,
      };
    } else {
      urls =
        'http://www.supermapol.com/realspace/services/3D-jinjiang/rest/realspace';
      destination = {
        x: -2766646.8109041643,
        y: 5086139.242121006,
        z: 2675753.0881470772,
      };
    }

    const promise: any = window.viewer.scene.open(urls, undefined, {
      subdomains: ['www.supermapol.com'],
    });
    window.Cesium.when(promise);
    const scene = viewer.scene;
    viewer.camera.flyTo({
      // 角度动画；不同模型需要调整角度
      destination: destination,
      // window.Cesium.Cartesian3.fromDegrees( // 转换真正地图坐标
      //   -2179495.606468646,
      //   4380208.518509638,
      //   2500
      // ),
      orientation: {
        heading: 1.7005863248055, // 旋转度数
        pitch: window.Cesium.Math.toRadians(-20),
        roll: window.Cesium.Math.toRadians(0),
      },
    });
    setClickEvent(scene);
  };

  const selfRotate = () => {
    viewer.clock.multiplier = 300;
    // viewer.clock.shouldAnimate = true; // 地球自转设置
    let previousTime = viewer.clock.currentTime.secondsOfDay;
    const onTickCallback = () => {
      const spinRate = 0.5;
      const currentTime = viewer.clock.currentTime.secondsOfDay;
      const delta = (currentTime - previousTime) / 1000;
      previousTime = currentTime;
      viewer.scene.camera.rotate(
        window.Cesium.Cartesian3.UNIT_Z,
        -spinRate * delta
      );
    };
    viewer.clock.onTick.addEventListener(onTickCallback);
  };

  const switchs = () => {
    setSwitchsVisibility(false);
    if (titles.id?.name) {
      viewer.clock.shouldAnimate = true;
    }
  };
  const onFullScreen = () => {
    if (fullScreen) {
      fullScreens();
    } else {
      exitScreen();
    }
    setFullScreen(!fullScreen);
  };
  //全屏
  const fullScreens = () => {
    var el: any = document.documentElement;
    var rfs =
      el.requestFullScreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullScreen;

    //typeof rfs != "undefined" && rfs
    if (rfs) {
      rfs.call(el);
    } else if (typeof window.ActiveXObject !== 'undefined') {
      //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
      var wscript = new window.ActiveXObject('WScript.Shell');
      if (wscript != null) {
        wscript.SendKeys('{F11}');
      }
    }
  };
  //退出全屏
  const exitScreen = () => {
    var el: any = document;
    var cfs =
      el.cancelFullScreen ||
      el.webkitCancelFullScreen ||
      el.mozCancelFullScreen ||
      el.exitFullScreen;

    //typeof cfs != "undefined" && cfs
    if (cfs) {
      cfs.call(el);
    } else if (typeof window.ActiveXObject !== 'undefined') {
      //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
      var wscript = new window.ActiveXObject('WScript.Shell');
      if (wscript != null) {
        wscript.SendKeys('{F11}');
      }
    }
  };
  const cesiumContainerNone = () => {
    setVisibility(false);
  };
  return (
    <>
      {visibility && (
        <div
          className="cesiumContainer-box"
          style={{ display: `${visibility ? 'block' : 'none'}` }}
        >
          <div className="switch switch-box" onClick={cesiumContainerNone}>
            <CloseCircleOutline className="video-closure-icon" />
          </div>
          <div id="cesiumContainer" className="cesiumContainer"></div>
          <div className="cesiumContainer-button">
            <Button className="button" color="primary" onClick={realspace}>
              添加S3M图层
            </Button>
            <Button className="button" color="primary" onClick={reset}>
              重置
            </Button>
            <Button className="button" color="primary" onClick={onFullScreen}>
              {fullScreen ? '全屏' : '小屏'}
            </Button>
          </div>
          <div
            ref={infoBoxContainer}
            className="pop-ups"
            style={{
              display: `${switchsVisibility ? 'block' : 'none'}`,
              width: '41%',
              height: 'auto',
              top: `${switchsY + 19}px`,
              left: `${switchsX + 19}px`,
            }}
          >
            <div className="pop-ups-title">
              {`_id:${titles.id?.name || titles?.id}`}
              <div className="switch" onClick={switchs}>
                <CloseCircleOutline className="video-closure-icon" />
              </div>
            </div>
            {titles.position && (
              <div>
                {`x：${titles.position?.x}`}
                <br />
                {`y：${titles.position?.y}`}
                <br />
                {`z：${titles.position?.y}`}
              </div>
            )}

            <div className="button-box">
              <Button className="button" color="primary" onClick={realspace}>
                进入设备
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuperMap;
