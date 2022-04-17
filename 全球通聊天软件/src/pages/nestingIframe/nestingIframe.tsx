import './index.scss';

import React, { useCallback, useEffect, useState } from 'react';

let ws: any = null,
  embed: any = null;
const NestingIframe = ({
  title,
  display,
  url,
  goBackS,
  connectUrl,
  downloadName,
}: any) => {
  const [titleName, setTitleName] = useState('');
  const [displayBlock, setDisplayBlock] = useState(false);
  //   const [viewable, setViewable] = useState(false);
  useEffect(() => {
    if (!display) {
      let timeout = setTimeout(() => {
        setDisplayBlock(false);
        clearTimeout(timeout);
        ws = null;
        embed = null;
      }, 310);
    } else if (display) {
      setDisplayBlock(true);
    }
    let viewable = false;
    if (url && downloadName) {
      const list = url.split('.');
      const name = list[list.length - 1];
      if (name === 'txt' || name === 'html' || name === 'html') {
        viewable = true;
      } else {
        viewable = false;
      }
    }
    if ((url && connectUrl) || viewable) {
      // 扩展API加载完毕，现在可以正常调用扩展API
      const plusReady = () => {
        localStorage.setItem('NestingIframe', 'true');
        ws = window.plus.webview.currentWebview();
        window.plus.key.addEventListener(
          'backbutton',
          function () {
            if (!canBack()) {
              goBackS();
            }
          },
          false
        );
        setTimeout(() => createEmbed(url), 500); //延迟创建子窗口避免影响窗口动画
      };
      // 判断扩展API是否准备，否则监听plusready事件
      if (window.plus) {
        plusReady();
      } else {
        document.addEventListener('plusready', plusReady, false);
      }
      // 创建子Webview
      const createEmbed = (url: string) => {
        url = url || 'http://m.weibo.cn/u/3196963860';
        let topoffset = `${window.userAgents + 45}px`;
        window.plus.nativeUI.showWaiting('', {
          style: 'black',
          modal: false,
          background: 'rgba(0,0,0,0)',
        });
        embed = window.plus.webview.create(url, 'nestingIframe', {
          top: topoffset,
          bottom: '0px',
          position: 'dock',
          dock: 'bottom',
          bounce: 'vertical',
        });
        ws.append(embed);
        embed.addEventListener(
          'loaded',
          function () {
            window.plus.nativeUI.closeWaiting();
          },
          false
        );
        embed.addEventListener(
          'loading',
          function () {
            window.plus.nativeUI.showWaiting('', {
              style: 'black',
              modal: false,
              background: 'rgba(0,0,0,0)',
            });
          },
          false
        );
      };
    }
  }, [display]);

  // 当前窗口是否可后退
  const canBack = async () => {
    let back = false;
    await embed.canBack((e: any) => {
      console.log('是否可返回：', e.canBack);
      if (e.canBack) {
        back = true;
        embed.back();
      } else {
        back = false;
        localStorage.removeItem('NestingIframe');
        window.plus.webview.close('nestingIframe');
      }
    });
    return back;
  };
  const onRef = useCallback(
    (node) => {
      if (node) {
        console.log(
          node
          //   node.contentWindow.document.getElementsByTagName('title')[0]
          // .innerText()
        );
      }
    },
    [display]
  );
  const setGoBackS = () => {
    if (!canBack()) {
      goBackS();
    }
  };

  return (
    <div
      style={{ display: `${displayBlock ? 'block' : 'none'}` }}
      className={`nestingIframe ${
        display
          ? 'right-in-enter right-in-enter-enter'
          : 'right-in-leave right-in-leave-leave'
      } InformationSettings`}
    >
      <div
        className="searchBox"
        style={{ paddingTop: `${window.userAgents}px` }}
      >
        <div style={{ position: 'relative' }}>
          <div className="home-search">
            <img
              src="/images/fanhui.png"
              className="xiangmu-left"
              alt=""
              onClick={setGoBackS}
            />
            <span>{titleName}</span>
          </div>
        </div>
      </div>
      <div
        className="nestingIframeContents"
        style={{
          paddingTop: `calc(0.9rem + ${window.userAgents}px)`,
          height: `calc(100% - 0.9rem - ${window.userAgents}px)`,
        }}
      >
        {/* {(url && connectUrl) || viewable ? (
            <iframe ref={onRef} title={title} src={url}></iframe>
            ) : ( */}
        {url && !connectUrl && (
          <div className="nestingDownload">
            <span>暂不支持查看请点击下载</span>
            <a download={downloadName} href={url}>
              下载
            </a>
          </div>
        )}
        {/* )} */}
      </div>
    </div>
  );
};

export default NestingIframe;
