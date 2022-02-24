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
  const isDebug: any =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  return new Promise((resolve, reject) => {
    if (fileList) {
      const reader = new FileReader();
      reader.readAsDataURL(fileList);
      let dataUrl: any = '';
      reader.onload = async (e: any) => {
        const formDate = new FormData();
        dataUrl = e.target.result;
        // console.log(dataUrl);
        if (type === '分片上传') {
          // if (dateTime === 0) {
          dataUrl = dataUrl.split('base64,')[1];
          // }
          // console.log(dataUrl);
          formDate.append('type', '分片上传');
          formDate.append('classIcon', dataUrl);
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

          formDate.append('classIcon', dataUrl);
          formDate.append('imgId', dateTime);
          formDate.append('fileName', nameList[0]);
          formDate.append('type', type);
          formDate.append('size', size);
          formDate.append('fileType', fileType);
          formDate.append('clientmessage', JSON.stringify(clientmessage));
        }
        formDate.append('file', 'true');
        formDate.append('lengthId', id || dateTime);
        formDate.append('shardCount', nameList || shardCount);
        if (isDebug) {
          formDate.append('isDebug', isDebug);
        }
        if (length) {
          formDate.append('length', length);
        }
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
