import { friendsCircleFileUpload } from '../../../api';
import { Toast } from 'antd-mobile';

export const FileUploadCircle = ({
  fileList, // 分片的内容
  typeF, // 分片上传是否到最后\或不分片
  name, // 文件名字
  type, // 文件名后缀
  fileType, // 文件类型
  dateTime, // 时间戳
  videoImgZoom, // video缩略图
  index, // 第几片上传
}: any) => {
  const isDebug: any =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  return new Promise(async (resolve, reject) => {
    if (fileList) {
      const formDate = new FormData();
      let dataUrl: any = '';
      let style = '';
      if (!videoImgZoom && index === 0) {
        const { Zoom, styleLength }: any = await UploadImg({ fileList });
        videoImgZoom = Zoom;
        style = styleLength;
      }
      // return;
      const reader = new FileReader();
      reader.readAsDataURL(fileList);
      reader.onload = async (e: any) => {
        dataUrl = e.target.result;
        dataUrl = dataUrl.split('base64,')[1];
        // console.log(videoImgZoom);
        formDate.append('name', name[0]);
        formDate.append('type', type);
        formDate.append('fileType', fileType);
        formDate.append('dateTime', dateTime);
        formDate.append('base64', dataUrl);
        formDate.append('typeF', typeF);
        formDate.append('styleLength', style);
        if (index === 0 || typeF === 'no') {
          formDate.append('videoImgZoom', videoImgZoom);
        }
        formDate.append('index', index);
        if (isDebug) {
          formDate.append('isDebug', isDebug);
        }
        // resolve({ code: 200 });
        // return;
        friendsCircleFileUpload(formDate)
          .then((data) => {
            // console.log(data);
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
export const UploadImg = ({ fileList }: any) => {
  return new Promise(async (resolve, reject) => {
    var image = new Image();
    image.src = URL.createObjectURL(fileList);
    image.onload = function () {
      var canvasZoom = document.createElement('canvas');
      canvasZoom.width = 190;
      canvasZoom.height = (190 / image.width) * image.height;
      var imageCanvasZoom = canvasZoom.getContext('2d');
      if (imageCanvasZoom) {
        imageCanvasZoom.drawImage(
          image,
          0,
          0,
          190,
          (190 / image.width) * image.height
        );
        let dataurlZoom = '';
        // for (let i = 0; i < 10; i++) { // 开启循环压缩
        dataurlZoom = canvasZoom.toDataURL('image/jpeg', 1);
        let styleLength = '';
        if (image.width > image.height || image.width === image.height) {
          styleLength = `width_${image.width}_${image.height}`;
        } else {
          styleLength = `height_${image.width}_${image.height}`;
        }
        resolve({ Zoom: dataurlZoom, styleLength: styleLength });
      }
    };
  });
};
export const SetVideoImg = ({ fileList }: any) => {
  return new Promise((resolve, reject) => {
    let dataurlZoom: any = null;
    let getUrl = window.URL.createObjectURL(fileList[0]);
    // length = '分片上传最后';
    var videos = document.createElement('video');
    videos.src = getUrl;
    videos.setAttribute('preload', 'auto');
    // console.log(getUrl);
    videos.addEventListener('loadeddata', function () {
      // console.log('videos');
      var canvasZoom = document.createElement('canvas');
      canvasZoom.width = 190;
      canvasZoom.height = (190 / videos.videoWidth) * videos.videoHeight;
      var imageCanvasZoom = canvasZoom.getContext('2d');
      if (imageCanvasZoom) {
        imageCanvasZoom.drawImage(
          videos,
          0,
          0,
          190,
          (190 / videos.videoWidth) * videos.videoHeight
        );
        dataurlZoom = canvasZoom.toDataURL('image/jpeg', 1);
        resolve(dataurlZoom);
      }
    });
  });
};
