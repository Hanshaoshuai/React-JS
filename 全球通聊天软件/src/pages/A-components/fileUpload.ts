import { Toast } from 'antd-mobile';
import { fileUpload } from '../../api';
export const FileUpload = (
  fileList: any,
  dateTime: any,
  nameList: any,
  type: any,
  fileType: string,
  clientmessage: any,
  length?: any,
  Nsize?: any,
  id?: any,
  shardCount?: any
) => {
  let ids: any = id;
  const isDebug: any =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  return new Promise(async (resolve, reject) => {
    if (fileList) {
      let dataurlZoom: any = null;
      const formDate = new FormData();
      let dataUrl: any = '';
      if ((dateTime === 1 || length === 1) && fileType === 'video') {
        dataurlZoom = await new Promise((resolve, reject) => {
          let getUrl = window.URL.createObjectURL(ids || fileList);
          ids = 1;
          // length = '分片上传最后';
          var videos = document.createElement('video');
          videos.src = getUrl;
          videos.setAttribute('preload', 'auto');
          // console.log(getUrl);
          videos.addEventListener('loadeddata', function () {
            // console.log('videos');
            var canvasZoom = document.createElement('canvas');
            canvasZoom.width = 100;
            canvasZoom.height = (100 / videos.videoWidth) * videos.videoHeight;
            var imageCanvasZoom = canvasZoom.getContext('2d');
            if (imageCanvasZoom) {
              imageCanvasZoom.drawImage(
                videos,
                0,
                0,
                100,
                (100 / videos.videoWidth) * videos.videoHeight
              );
              dataurlZoom = canvasZoom.toDataURL('image/jpeg', 1);
              let img = document.createElement('img');
              img.src = dataurlZoom;
              // document.body.appendChild(img);
              img.onload = () => {
                if (img.width > img.height || img.width === img.height) {
                  formDate.append(
                    'styleLength',
                    `width_${img.width}_${img.height}`
                  );
                } else {
                  formDate.append(
                    'styleLength',
                    `height_${img.width}_${img.height}`
                  );
                }
                // console.log(clientmessage);
                shardCount && formDate.append('imgId', shardCount);
                clientmessage &&
                  formDate.append(
                    'clientmessage',
                    JSON.stringify(clientmessage)
                  );
                formDate.append('classIconZoom', dataurlZoom);
                resolve(dataurlZoom);
              };
            }
          });
        });
      }
      // if (dataurlZoom) {
      // console.log(dataurlZoom);
      // }
      // return;
      const reader = new FileReader();
      reader.readAsDataURL(fileList);
      reader.onload = async (e: any) => {
        dataUrl = e.target.result;
        dataUrl = dataUrl.split('base64,')[1];
        // console.log(length[0], Nsize);
        if (type === '分片上传') {
          ids = null;
          // if (dateTime === 0) {
          // dataUrl = dataUrl.split('base64,')[1];
          // }
          // console.log(dataUrl);
          formDate.append('fileName', length[0]);
          formDate.append('type', '分片上传');
          formDate.append('classIcon', dataUrl);
          formDate.append('typeName', Nsize);
        } else {
          let size: any = 0;
          if ((Nsize || fileList.size) <= 1024) {
            size = `${Nsize || fileList.size}B`;
          } else {
            size = (Nsize || fileList.size) / 1024;
            if (size <= 1024) {
              size = `${size.toFixed(2)}K`;
            } else {
              size = size / 1024;
              if (size <= 1024) {
                size = `${size.toFixed(2)}M`;
              } else {
                size = size / 1024;
                if (size <= 1024) {
                  size = `${size.toFixed(2)}G`;
                } else {
                  size = `${(size / 1024).toFixed(2)}T`;
                }
              }
            }
          }
          // console.log(text);
          formDate.append('fileName', nameList[0]);
          formDate.append('classIcon', dataUrl);
          formDate.append('imgId', dateTime);
          formDate.append('type', type);
          formDate.append('size', size);
          formDate.append('fileType', fileType);
          formDate.append('clientmessage', JSON.stringify(clientmessage));
        }
        formDate.append('file', 'true');
        formDate.append('lengthId', ids || dateTime);
        formDate.append('shardCount', nameList || shardCount);
        if (isDebug) {
          formDate.append('isDebug', isDebug);
        }
        if (length === '分片上传最后') {
          formDate.append('length', length);
        }
        if (Nsize === '不分片') {
          formDate.append('length', Nsize);
        }
        // resolve({ code: 200 });
        fileUpload(formDate)
          .then((data) => {
            //   console.log(data);
            if (data.code === 200) {
              resolve(data);
            } else {
              Toast.show({
                content: '上传失败，请稍后再试！',
                position: 'top',
              });
            }
          })
          .catch((err) => {
            console.log('error');
          });
      };
    }
  });
};
