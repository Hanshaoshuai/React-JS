import './index.scss';
import React, { useEffect, useState, useRef } from 'react';
import { ImageUploader, Toast } from 'antd-mobile';
import { MovieOutline } from 'antd-mobile-icons';

const CameraOutList = () => {
  const fs1: any = useRef(null);
  const [cameraOut, setCameraOut] = useState(false);
  const [inputContent, setInputContent] = useState('');
  const [fileList, setFileList] = useState<any[]>([
    {
      url: 'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
    },
  ]);
  useEffect(() => {
    console.log(fileList);
  }, [fileList]);

  const onchange = () => {};
  const contenteditable = (e: any) => {
    // console.log(e.target.innerText);
    setInputContent(e.target.innerText);
  };
  const mockUpload: any = (file: File) => {
    // console.log(file);
    return {
      url: URL.createObjectURL(file),
    };
  };

  const beforeUpload = async (e: any) => {
    console.log(e);
    throw new Error('Fail to upload');
  };
  return (
    <div className="cameraOutList">
      <p
        placeholder="请详输入此时此刻的心情..."
        id="texts"
        className="mint-field-core"
        onClick={onchange}
        onInput={contenteditable}
      ></p>
      <div className="cameraOutListFileList">
        <ImageUploader
          //   beforeUpload={beforeUpload}
          value={fileList}
          onChange={setFileList}
          upload={mockUpload}
          multiple
          capture
          maxCount={3}
          //   showUpload={fileList.length < maxCount}
          //   onCountExceed={exceed => {
          //     Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`)
          //   }}
        />
        <div className="otherItemsList">
          <label>
            <p>
              <MovieOutline />
              <input
                onChange={(files: any) => mockUpload(files.target.files[0])}
                style={{ display: 'none' }}
                type="file"
                name=""
                // multiple
                ref={fs1}
                accept="video/*"
              />
              <img src="" alt="" />
            </p>
            <span>点击这里记录视频</span>
          </label>
        </div>
      </div>
    </div>
  );
};
export default CameraOutList;
