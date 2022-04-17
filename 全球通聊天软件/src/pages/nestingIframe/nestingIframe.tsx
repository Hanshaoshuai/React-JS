import './index.scss';

import React, { useCallback, useEffect, useState } from 'react';

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
      let ws: any = null,
        embed = null;
      // 扩展API加载完毕，现在可以正常调用扩展API
      const plusReady = () => {
        ws = window.plus.webview.currentWebview();
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
            document.addEventListener('plusready', function () {
              const webview = window.plus.webview.currentWebview(); //获取这页
              window.plus.key.addEventListener('backbutton', function () {
                //监听这页的返回按钮
                webview.canBack(function (e: any) {
                  //看看这也是否可以返回
                  if (e.canBack) {
                    //如果可以返回
                    webview.back(); //回退；
                  } else {
                    // window.plus.webview.close('nestingIframe');
                    webview.close(); //关闭这页
                    //plus.runtime.quit();//退出app
                  }
                });
              });
            });
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
              onClick={goBackS}
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
