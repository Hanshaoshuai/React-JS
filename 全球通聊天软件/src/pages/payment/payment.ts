import { Toast } from 'antd-mobile';

export function StartPayment({ dcontent, value, onCallback }: any) {
  var pays: any = {};
  var w: any = null;
  var PAYSERVER = 'https://demo.dcloud.net.cn/payment/?payid=';
  const channelsList = (channels: any) => {
    console.log('支付通道信息', JSON.stringify(channels));
    dcontent.innerHTML = '';
    var content = dcontent;
    const startPay = (e: any) => {
      if (!value || value < 0) {
        Toast.show({
          content: '请输入金额！',
          position: 'top',
        });
        return;
      }
      // console.log('检查是否请求订单中', e.target.id);
      let index = e.target.id;
      if (w) {
        return;
      } //检查是否请求订单中
      if (index === 'appleiap') {
        Toast.show({
          content: '应用内支付',
          position: 'top',
        });
        return;
      }
      Toast.show({
        content: '请求支付',
        position: 'top',
      });
      var url = PAYSERVER;
      if (index === 'alipay' || index === 'wxpay') {
        url += index;
      } else {
        window.plus.nativeUI.alert(
          '当前环境不支持此支付通道！',
          null,
          '会员支付'
        );
        return;
      }
      var appid = window.plus.runtime.appid;
      if (navigator.userAgent.indexOf('StreamApp') >= 0) {
        appid = 'Stream';
      }
      url += '&appid=' + appid + '&total=';

      w = window.plus.nativeUI.showWaiting();
      // 请求支付订单
      var amount = value;
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        switch (xhr.readyState) {
          case 4:
            w.close();
            w = null;
            if (xhr.status === 200) {
              Toast.show({
                content: '请求订单成功',
                position: 'top',
              });
              var order = xhr.responseText;
              window.plus.payment.request(
                pays[index],
                order,
                (result: any) => {
                  onCallback();
                  Toast.show({
                    content: '支付成功',
                    position: 'top',
                  });
                  window.plus.nativeUI.alert(
                    '支付成功。',
                    () => {
                      window.back();
                    },
                    '会员支付'
                  );
                },
                (e: any) => {
                  if (e.code === -100) {
                    Toast.show({
                      content: `已取消支付`,
                      position: 'top',
                    });
                  } else {
                    Toast.show({
                      content: `支付失败[${e.code}]： ${e.message}`,
                      position: 'top',
                    });
                  }
                  //   window.plus.nativeUI.alert(
                  //     'http://www.html5plus.org/#specification#/specification/Payment.html',
                  //     null,
                  //     '支付失败：' + e.code
                  //   );
                }
              );
            } else {
              Toast.show({
                content: `请求订单失败，${xhr.status}`,
                position: 'top',
              });
              window.plus.nativeUI.alert(
                '获取订单信息失败！',
                null,
                '会员支付'
              );
            }
            break;
          default:
            break;
        }
      };
      console.log('请求支付订单：' + url + amount);
      xhr.open('GET', url + amount);
      xhr.send();
    };
    for (var i in channels) {
      var channel = channels[i];
      if (channel.id === 'qhpay' || channel.id === 'qihoo') {
        // 过滤掉不支持的支付通道：暂不支持360相关支付
        continue;
      }
      pays[channel.id] = channel;
      var de = document.createElement('div');
      de.setAttribute('class', 'button');
      de.id = channel.id;
      //   de.style.width = '60%';
      //   de.style.lineHeight = '0.8rem';
      //   de.style.fontSize = '0.32rem';
      //   de.style.textAlign = 'center';
      //   de.style.borderRadius = '0.1rem';
      //   de.style.background = '#ff7a59';
      //   de.style.color = '#ffffff';
      //   de.style.margin = '0 auto';
      //   de.style.marginTop = '0.6rem';
      de.onclick = startPay;
      de.innerText = channel.description + '支付';
      content.appendChild(de);
      checkServices(channel);
    }
  };
  const plusReady = () => {
    // console.log('开始执行');
    // 获取支付通道
    window.plus.payment.getChannels(
      (channels: any) => {
        if (!channels && !channels[0] && !channels[0].id) {
          channels = [
            { id: 'alipay', description: '支付宝', serviceReady: true },
            { id: 'wxpay', description: '微信', serviceReady: true },
          ];
        }
        channelsList(channels);
      },
      (e: any) => {
        const channels = [
          { id: 'alipay', description: '支付宝', serviceReady: true },
          { id: 'wxpay', description: '微信', serviceReady: true },
        ];
        channelsList(channels);
        Toast.show({
          content: `获取支付通道失败${e.message}`,
          position: 'top',
        });
      }
    );
  };
  if (window.plus || !window.plus) {
    plusReady();
  } else {
    document.addEventListener('plusready', plusReady, false);
  }
  // 检测是否安装支付服务
  const checkServices = (pc: any) => {
    if (!pc.serviceReady) {
      var txt = null;
      switch (pc.id) {
        case 'alipay':
          txt =
            '检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？';
          break;
        default:
          txt =
            '系统未安装“' +
            pc.description +
            '”服务，无法完成支付，是否立即安装？';
          break;
      }
      window.plus.nativeUI.confirm(
        txt,
        (e: any) => {
          if (e.index === 0) {
            pc.installService();
          }
        },
        pc.description
      );
    }
  };
}
