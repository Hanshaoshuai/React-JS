import { onUploadProgress } from '../../../services/request';
import { Toast } from 'antd-mobile';
import { FileUploadCircle } from './fileUploadCircle';
export const FriendsCircleUpload = async ({ list, videoImgZoom }: any) => {
  return new Promise(async (resolve, reject) => {
    let imgUrlList = [];
    const dateTime: any = new Date().getTime();
    let uploadItemLength = 1;
    for (let i = 0; i < list.length; i++) {
      const newList = list[i];
      if (i > list.length - 1) return;
      if (newList.size === 0) {
        Toast.show({
          icon: 'fail',
          content: '此文件为空文件！',
        });
        return;
      } else if (newList.size >= 190000000000) {
        Toast.show({
          icon: 'fail',
          content: '暂不支持190G以上文件发送！',
        });
        return;
      }
      const fileType = newList.type.split('/')[0];
      let nameList = newList.name?.split('.') || [];
      let type: any = nameList[nameList.length - 1] || 'mp3';
      const listName = newList.name?.split(`.${type}`) || '';

      nameList = listName ? listName : [new Date().getTime(), 'mp3'];
      // console.log(type, fileType, nameList, listName);
      if (
        fileType === 'application' ||
        fileType === 'text' ||
        fileType === 'video' ||
        fileType === 'audio' ||
        fileType === ''
      ) {
        if (newList.size >= 31000000) {
          // 超过31M文件走流，存入node接口根目录；
          let id = 0;
          let size = newList.size, //总大小shardSize = 2 * 1024 * 1024,
            shardSize = 10 * 1024 * 1024, //以10MB为一个分片,每个分片的大小
            shardCount = Math.ceil(size / shardSize); //总片数
          // eslint-disable-next-line no-loop-func
          let toFileUpload: any = async () => {
            var start = id * shardSize;
            var end = start + shardSize;
            let packet = newList.slice(start, end); //将文件进行切片
            let typeF = '';
            if (id < shardCount) {
              typeF = '分片上传';
            } else {
              typeF = type;
            }
            // console.log(id, shardCount);
            const datas: any = await FileUploadCircle({
              fileList: packet, // 分片的内容
              typeF: typeF, // 分片上传是否到最后
              name: nameList, // 文件名字
              type: type, // 文件名后缀
              fileType, // 文件类型
              dateTime, // 时间戳
              videoImgZoom, // video缩略图
              index: id,
            });
            if (datas.code === 200) {
              id += 1;
              const dom: any = document.getElementById(`${dateTime + i}`);
              // console.log(datas, id, shardCount);
              if (dom) {
                let complete = (((id / shardCount) * 100) | 0) + '%';
                dom.innerHTML = complete;
              }
              if (id < shardCount - 1) {
                toFileUpload();
              }
              console.log(id);
              if (id === shardCount - 1) {
                // console.log('分片上传最后');
                typeF = '分片上传最后';
                start = id * shardSize;
                end = start + shardSize;
                id += 1;
                console.log('分片上传最后', id);
                let packet = newList.slice(start, end); //将文件进行切片
                const datas: any = await FileUploadCircle({
                  fileList: packet,
                  typeF: typeF,
                  name: nameList,
                  type: type,
                  fileType,
                  dateTime,
                  index: id,
                });
                if (datas.code === 200) {
                  resolve(datas);
                  const dom: any = document.getElementById(`${dateTime + i}`);
                  if (dom) {
                    let complete = (((id / shardCount) * 100) | 0) + '%';
                    dom.innerHTML = complete;
                  }
                } else {
                  reject({ err: 'err' });
                }
              }
              // console.log(datas);
            }
          };
          toFileUpload();
        } else {
          // upload({
          //   dateTime,
          //   i,
          //   itemId,
          //   length: list.length,
          //   overload,
          //   setpercent,
          // });
          const datas: any = await FileUploadCircle({
            fileList: newList, // 上传的内容
            typeF: 'no', // 分片上传是否到最后
            name: nameList, // 文件名字
            type: type, // 文件名后缀
            fileType, // 文件类型
            dateTime, // 时间戳
            videoImgZoom, // video缩略图
          });
          if (datas.code === 200) {
            resolve(datas);
            //   //只作为文件上传完成使用
            // setDeleteFl(!deleteFl);
          }
        }
      } else {
        // upload({
        //   dateTime,
        //   i,
        //   itemId,
        //   length: list.length,
        //   overload,
        //   setpercent,
        // });
        const datas: any = await FileUploadCircle({
          fileList: newList, // 上传的内容
          typeF: 'no', // 分片上传是否到最后
          name: nameList, // 文件名字
          type: type, // 文件名后缀
          fileType, // 文件类型
          dateTime: dateTime + i, // 时间戳
          index: 0,
        });
        // console.log(datas);
        if (datas.code === 200) {
          //   //只作为图片上传完成使用
          if (uploadItemLength === list.length) {
            imgUrlList.push(datas);
            resolve(imgUrlList);
          } else {
            imgUrlList.push(datas);
          }
          uploadItemLength += 1;
        } else {
          reject({ err: 'err' });
        }
      }
    }
  });
};

// export const upload = ({
//   dateTime,
//   i,
//   itemId,
//   length,
//   overload,
//   setpercent,
// }: any) => {
//   onUploadProgress.onUploadProgress = (progressEvent: any) => {
//     let complete =
//       (((progressEvent.loaded / progressEvent.total) * 100) | 0) + '%';
//     // console.log('上传=====>>>>', complete);
//     setpercent(complete);
//     if (complete === '100%') {
//       complete = '99%';
//     }
//     const dom: any = document.getElementById(`${dateTime + i}`);
//     if (dom && dom.innerText !== '99%') {
//       dom.innerHTML = complete;
//     }
//     // setProgress(complete);
//   };
// };
