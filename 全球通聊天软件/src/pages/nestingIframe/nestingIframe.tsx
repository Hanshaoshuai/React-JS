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
  const [viewable, setViewable] = useState(false);
  useEffect(() => {
    if (!display) {
      let timeout = setTimeout(() => {
        setDisplayBlock(false);
        clearTimeout(timeout);
      }, 310);
    } else if (display) {
      setDisplayBlock(true);
    }
    if (url && !downloadName) {
      const list = url.split('.');
      const name = list[list.length - 1];
      if (name === 'txt' || name === 'html' || name === 'html') {
        setViewable(true);
      } else {
        setViewable(false);
      }
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
        {(url && connectUrl) || viewable ? (
          <iframe ref={onRef} title={title} src={url}></iframe>
        ) : (
          <div className="nestingDownload">
            <span>暂不支持查看请点击下载</span>
            <a download={downloadName} href={url}>
              下载
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NestingIframe;
