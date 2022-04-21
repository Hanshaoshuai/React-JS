import './index.scss';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Toast, CheckList } from 'antd-mobile';

import { buildGroup, getBuddyList } from '../../api';

// 通用元素对象
var _dout_: any = null;
var gentry: any = null;
const outSet = (s: any) => {
  console.log(s);
  _dout_.innerText = s + '\n';
  0 === _dout_.scrollTop && (_dout_.scrollTop = 1); //在iOS8存在不滚动的现象
};
// 输出行内容
const outLine = (s: any) => {
  console.log(s);
  _dout_.innerText += s + '\n';
  0 === _dout_.scrollTop && (_dout_.scrollTop = 1); //在iOS8存在不滚动的现象
};

// H5 plus事件处理
const plusReady = () => {
  // 获取音频目录对象
  window.plus.io.resolveLocalFileSystemURL(
    '_doc/',
    function (entry: any) {
      entry.getDirectory(
        'audio',
        { create: true },
        function (dir: any) {
          gentry = dir;
        },
        function (e: any) {
          outSet('Get directory "audio" failed: ' + e.message);
        }
      );
    },
    function (e: any) {
      outSet('Resolve "_doc/" failed: ' + e.message);
    }
  );
};
if (window.plus) {
  plusReady();
} else {
  document.addEventListener('plusready', plusReady, false);
}

// 开始录音
let r: any = null,
  t = 0,
  ri = null,
  rt: any = null;
export const startRecord = () => {
  //   outSet('开始录音：');
  console.log('开始录音：');
  r = window.plus.audio.getRecorder();
  if (r == null) {
    // outLine('录音对象未获取');
    return;
  }
  r.record(
    { filename: '_doc/audio/' },
    (p: any) => {
      //   outLine('录音完成：' + p);
      window.plus.io.resolveLocalFileSystemURL(
        p,
        (entry: any) => {
          console.log(entry);
          //   createItem(entry); // 添加播放项
        },
        (e: any) => {
          //   outLine('读取录音文件错误：' + e.message);
        }
      );
    },
    (e: any) => {
      //   outLine('录音失败：' + e.message);
    }
  );
  //   er.style.display = 'block';
  t = 0;
  ri = setInterval(() => {
    t++;
    // rt.innerText = timeToStr(t); // 格式化时长字符串，格式为"HH:MM:SS"
  }, 1000);
};
// 停止录音
export const stopRecord = () => {
  console.log('关闭录音：');
  // er.style.display = 'none';
  // rt.innerText = '00:00:00';
  // clearInterval(ri);
  // ri = null;
  r.stop();
  // w = null;
  r = null;
  t = 0;
};
// 播放文件相关对象
var p: any = null,
  pt: any = null,
  pp: any = null,
  ps: any = null,
  pi: any = null;
// 开始播放
export const startPlay = (url: any) => {
  //   ep.style.display = 'block';  // 播放标志显示
  var L = pp.clientWidth;
  p = window.plus.audio.createPlayer(url);
  p.play(
    function () {
      outLine('播放完成！');
      // 播放完成
      //   pt.innerText = timeToStr(d) + '/' + timeToStr(d);
      ps.style.webkitTransition = 'all 0.3s linear';
      ps.style.width = L + 'px';
      stopPlay();
    },
    function (e: any) {
      outLine('播放音频文件"' + url + '"失败：' + e.message);
    }
  );
  // 获取总时长
  var d = p.getDuration();
  if (!d) {
    // pt.innerText = '00:00:00/' + timeToStr(d);
  }
  pi = setInterval(function () {
    if (!d) {
      // 兼容无法及时获取总时长的情况
      d = p.getDuration();
    }
    var c = p.getPosition();
    if (!c) {
      // 兼容无法及时获取当前播放位置的情况
      return;
    }
    // pt.innerText = timeToStr(c) + '/' + timeToStr(d);
    var pct = Math.round((L * c) / d);
    if (pct < 8) {
      pct = 8;
    }
    ps.style.width = pct + 'px';
  }, 1000);
};
// 停止播放
export const stopPlay = () => {
  clearInterval(pi);
  pi = null;
  // setTimeout(resetPlay, 500); // 重置播放页面内容
  // 操作播放对象
  if (p) {
    p.stop();
    p = null;
  }
};
export const Audios = () => {};
