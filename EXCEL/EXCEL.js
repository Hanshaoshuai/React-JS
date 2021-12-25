import React, { PureComponent } from '@alipay/bigfish/react';
import {
  message,
  Upload, Button, Icon,
} from '@alipay/bigfish/antd';
    //  组件使用说明
    //  <Excel
    //      disabled={!  list.length  >  0}
    //      textName="分配计划列表"  //  Excel文件名
    //      text=""  //  文案
    //      bookType=""  //  按钮样式
    //      fileBlock  //  是否显示导入Excel的文件
    //      types="Import"  //  导入Excel('Import')/导出Excel('export')
    //      dataList={list}  //  导出Excel的数据  [{}]
    //      getExcelData={this.getExcelData}  //  获取上传的Excel的数据函数[{}]
    //  />  
    //  <Excel
    //      textName="分配计划列表"  //  Excel文件名
    //      text=""  //  文案
    //      bookType=""  //  按钮样式
    //      types="export"  //  导入Excel('Import')/导出Excel('export')
    //      dataList={list}  //  导出Excel的数据  [{}]
    //  />
let tmpDown; //  导出的二进制对象

class TableList extends PureComponent {
  state = {
    fileList: [],
    uploading: false,
    // list: [],
    types: '',
    disabled: false,
  };

  componentWillMount() {
    const  {
      fileBlock,  //  是否显示导入Excel的文件
      types,  //  导入Excel('Import')/导出Excel('export')
      dataList,  //  导出Excel的数据  [{}]
      getExcelData,  //  获取上传的Excel的数据函数[{}]
      text,  //  文案
      bookType,  //  按钮样式
      textName,  //  Excel文件名
      disabled,
    } = this.props;
    this.fileBlock = fileBlock;
    this.getExcelData = getExcelData;
    this.text = text;
    this.bookType = bookType;
    this.textName = textName;
    this.setState({
      //  list:  dataList.length  ==  0  ?  []  :  dataList,
      types,
      disabled,
    });
    console.log('props数据data====》》》', dataList);
    this.EXCEL = `EXCEL${this.appendRandom('EXCEL')}`;
    this.hf = `hf${this.appendRandom('hf')}`;
  }

  componentDidMount() {
    if(!document.getElementById('scriptEXCEL')){
      const dom = document.createElement('script');
      dom.id = 'scriptEXCEL'
      // dom.src = "https://gw-office.alipayobjects.com/basement_prod/0efb83da-6233-4e83-b2e6-2d491902518f.js";  // 公司内网使用
        dom.src = 'http://oss.sheetjs.com/js-xlsx/xlsx.full.min.js'; // 其他链接使用
      const body = document.getElementsByTagName('body')[0];
      body.appendChild(dom);
      //  console.log(body,dom);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('props==>>', nextProps);
    this.setState({
      disabled: nextProps.disabled,
    });
  }

  appendRandom = (text)  =>  {
    const CHARS = 'abcdefghigklmnopqrstuvwxyz';
    const NUMS = '0123456789';
    const ALL = CHARS + NUMS;

    //  最简单的 uid 生成器够用就好
    function uid(n) {
      n = n ? n : 6; // eslint-disable-line
      if (n < 2) {
        throw new RangeError('n  不能小于  2');
      }

      return ('xx' + 'z'.repeat(n - 2)).replace(/[xz]/g, function(c) { //  eslint-disable-line
        return c === 'x' ?
          CHARS[Math.random() * 26 | 0] : // eslint-disable-line
          ALL[Math.random() * 36 | 0]; // eslint-disable-line
      });
    }
    console.log('rrrrrrrrrr====>>>',uid('name19'));
    return uid(text);
  }

  importf = (that) => {  //  导入
    if(!that) {
      this.setState({ uploading: false });
      return;
    }
    const thats = this;
    const files = that;
    const fileReader = new FileReader();// 不支持IE
    const newList = [];
    let workbook = {};
    let values = []; // 存储获取到的数据
    fileReader.onload = (ev) => {
      try {
        const data = ev.target.result;
        workbook = XLSX.read(data, { type: 'binary' }); // eslint-disable-line
        // 以二进制流方式读取得到整份excel表格对象
      } catch (e) {
        message.warning('读取失败，请检查文件类型！');
        // alert('读取失败，请检查文件类型');
        return;
      }
      // 表格的表格范围，可用于判断表头是否数量是否正确
      let fromTo = '';
      // 遍历每张表读取
      Object.keys(workbook.Sheets).forEach((key) => {
        // console.log('每张表读取===>>',key,workbook.Sheets)
        if (workbook.Sheets.hasOwnProperty(key)) { // eslint-disable-line
          const newObj = {
            keyName: key,
            value: values.concat(XLSX.utils.sheet_to_json(workbook.Sheets[key])), // eslint-disable-line
          }
          newList.push(newObj);
          fromTo = workbook.Sheets[key]['!ref'];
          values = values.concat(XLSX.utils.sheet_to_json(workbook.Sheets[key])); // eslint-disable-line
          // break; // 只取第一张表，如果读取所有表就注释掉这一句
        }
      });
      this.setState({
        uploading: false,
        fileList: newList,
      });
      console.log('EXCEL数据整理==》》》》',this.state.fileList,
      fromTo,
      // value
      );
      if(thats.fileBlock){
        const dome = document.getElementById(this.EXCEL);
        const removeObj = dome.getElementsByClassName('ant-upload-list')[0]
        // console.log('removeObj==》》》》',dome,removeObj);
        dome.childNodes[0].removeChild(removeObj);
        
      }
      this.getExcelData(newList);
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files);
  }

  downloadList = () =>{ // 导出
    const {dataList} = this.props;
    console.log('导出数据==》》》》', dataList);
    if(dataList.length == 0){
      message.warning('导出数据不能为空！');
      return;
    }
    this.downloadExl(dataList);
  }

  downloadExl = (json, type) => {
    const dataObj = json[0];
    json.unshift({});
    const keyMap = []; // 获取keys
    Object.keys(dataObj).forEach((key) => {
      keyMap.push(key);
      json[0][key] = key;
    })
    const tmpdata = [];// 用来保存转换好的json 
    json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
      v: v[k],
      position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {v: v.v}); // eslint-disable-line
    const outputPos = Object.keys(tmpdata); // 设置区域,比如表格从A1到D10
    console.log('qqqqqqq===>>',outputPos,tmpdata)
    const tmpWB = {
      SheetNames: ['mySheet'], // 保存的表标题
      Sheets: {
        'mySheet': Object.assign({},
          tmpdata, // 内容
          {
            '!ref': `${outputPos[0]  }:${  outputPos[outputPos.length - 1]}` // 设置填充区域
          })
      }
    };
    tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB, // eslint-disable-line
      {bookType: (type == undefined ? 'xlsx':type),bookSST: false, type: 'binary'}// 这里的数据是用来定义导出的格式类型
      ))], {
      type: ""
    }); // 创建二进制对象写入转换好的字节流
    const href = URL.createObjectURL(tmpDown); // 创建对象超链接
    const dom = document.createElement('a');
    console.log('数据处理===》》',tmpWB,tmpDown);
    
    dom.target="blank";
    dom.download = this.textName ? `${this.textName}.xlsx` : '列表数据.xlsx';
    dom.href = href;
    dom.click();
    // document.getElementById(this.hf).href = href; // 绑定a标签
    // document.getElementById("hf").click(); // 模拟点击实现下载
    setTimeout(() => { // 延时释放
      URL.revokeObjectURL(tmpDown); // 用URL.revokeObjectURL()来释放这个object URL
    }, 100);
  }

  s2ab = (s) => { // 字符串转字符流
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF; // eslint-disable-line
    return buf;
  }

  getCharCol = (n) => {// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
    let s = '';
    let m = 0
    while (n > 0) {
      m = n % 26 + 1
      s = String.fromCharCode(m + 64) + s
      n = (n - m) / 26
    }
    return s
  }

  render() {
    const props = {
      onRemove: (file) => {
        console.log('file=====>>>>000',file)
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState({ uploading: true });
        console.log('file=====>>>>111',file)
        this.importf(file);
        return false;
      },
    };
    const { types, uploading, disabled } = this.state;
    return (
      <div id={this.EXCEL} style={{display: 'inline'}}>
        {types === 'Import' ?
          <Upload {...props}>
            <Button
              type={this.bookType ? this.bookType : ""}
              loading={uploading}
            >
              <Icon type="upload" />{this.text ? this.text : '上传 EXCEL'}
            </Button>
          </Upload> : ''
        }
        {types === 'export' ?
          // <a
          //   target="blank"
          //   href=""
          //   download={this.textName ? `${this.textName}.xlsx` : '列表数据.xlsx'}
          //   id={this.hf}
          // >
          <Button
            disabled={disabled}
            type={this.bookType ? this.bookType : ""}
            loading={uploading}
            // style={{marginTop:'10px'}}
            onClick={this.downloadList}
          >
            <Icon type="download" />{this.text ? this.text : '导出 EXCEL'}
          </Button>
          // </a>
          : ''
        }
      </div>
    );
  }
}
export default TableList; 