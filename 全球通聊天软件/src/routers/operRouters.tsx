import React, { useCallback, useEffect } from 'react';

const OperationRoute = ({ style, id, data = [], onClick }: any) => {
  useEffect(() => {}, []);
  const imageTo = (canvasBox: any, imgs: any, item: any, line: any) => {
    const imgBox: any = document.createElement('div');
    imgBox.className = imgs.className;
    imgBox.style.position = 'absolute';
    imgBox.style.width = `${imgs.width}px`;
    imgBox.style.height = `${imgs.height}px`;
    imgBox.style.left = `${line?.moveTo?.x}px`;
    imgBox.style.top = `${line?.moveTo?.y}px`;
    imgBox.style.background = imgs.background;
    imgBox.style.border = imgs.border;
    imgBox.style.color = imgs.color;
    imgBox.style.fontSize = imgs.fontSize;
    imgBox.style.zIndex = 100;
    imgBox.style.borderRadius = `${imgs.borderRadius}px`;
    imgBox.style.lineHeight = `${imgs.lineHeight}px`;
    imgBox.style.textAlign = imgs.textAlign;
    imgBox.style.cursor = 'pointer';
    imgBox.innerHTML = `<img style="width:100%; vertical-align: initial" src =${imgs.src}/>`;
    imgBox.onclick = (e: any) => {
      onClick({ e, Range: item });
    };
    canvasBox?.appendChild(imgBox);
  };
  useEffect(() => {
    const canvasBox = document.getElementById(id);
    if (canvasBox && data.length) {
      if (canvasBox) {
        canvasBox.innerHTML = `<canvas id='canvas-${id}' width=${style.width} height=${style.height}></canvas>`;
      }
      const routes: any = document.getElementById(`canvas-${id}`);
      const canvas: any = routes.getContext('2d'); // （2）获取画布的上下文；

      const lines = (index: number, line: any, imgs: any) => {
        let Tox = 0;
        let Toy = 0;
        if (data[index + 1]) {
          const imgs = data[index + 1].lineSegment.img;
          if (imgs) {
            Tox = imgs.width / 2;
            Toy = imgs.height / 2;
          }
        }
        canvas.beginPath(); // （3）开始一条路径；
        canvas.moveTo(
          line.moveTo.x + imgs.width / 2,
          line.moveTo.y + imgs.height / 2
        ); // （4）确定起始点；
        canvas.lineTo(line.lineTo.x + Tox, line.lineTo.y + Toy); // （5）确定结束点；
        canvas.strokeStyle = line.background; // 在着色之前设置颜色
        canvas.lineWidth = line.width; // 在着色之前设置线宽
        canvas.stroke(); // （6）着色；
        canvas.closePath(); // （7）结束路径；
      };

      data.map((item: any, index: number) => {
        if (item.button) {
          // canvas.fillStyle = item.button.background; // 设置下一个图形的填充颜色
          // canvas.strokeStyle = item.button.border; // //将边框的颜色设置
          // canvas.fillRect(item.button.x, item.button.y, item.button.width, item.button.height); // :填充矩形
          // canvas.fillRect(50, 50, 60, 30); // :填充矩形

          // canvas.fillStyle = item.button?.color || '#000000';
          // canvas.font = `${item.button?.fontSize || 12}px`;
          // canvas.fillText(
          //   item.button.value,
          //   item.button.x +
          //     (item.button.width -
          //       (item.button.fontSize && item.button.value ? item.button.fontSize * item.button.value.length : 0)) /
          //       2 +
          //     item.button?.left,
          //   item.button.y + (item.button.y - item.button.fontSize || 0) / 2 + item.button?.top,
          // ); // 填充文本

          // 使用div
          if (item.button && item.button.length) {
            item.button.map((term: any) => {
              const box: any = document.createElement('div');
              const button = term;
              box.className = button.className;
              box.style.position = 'absolute';
              box.style.width = `${button.width}px`;
              box.style.height = `${button.height}px`;
              box.style.left = `${button.x}px`;
              box.style.top = `${button.y}px`;
              box.style.background = button.background;
              box.style.border = button.border;
              box.style.color = button.color;
              box.style.fontSize = button.fontSize;
              box.style.zIndex = 100;
              box.style.borderRadius = `${button.borderRadius}px`;
              box.innerHTML = button.value;
              box.style.lineHeight = `${button.lineHeight}px`;
              box.style.textAlign = button.textAlign;
              box.style.cursor = 'pointer';
              box.onclick = (e: any) => {
                onClick({ e, Range: item });
              };
              canvasBox?.appendChild(box);
              return term;
            });
          }
        }
        if (index === 0) {
          if (item.lineSegment.img) {
            const imgs = item.lineSegment?.img || null;
            const line = item.lineSegment;
            if (imgs) {
              // const img = new Image(); // canvas 2d 通过此函数创建一个图片对象
              // img.src = imgs.src || '';
              // img.onload = () => {
              //   canvas.drawImage(img, imgs.x, imgs.y, imgs.width, imgs.height);
              // };
              // 使用 标签
              imageTo(canvasBox, imgs, item, line);
            }
            lines(index, line, imgs);
          }
        } else if (item.lineSegment.img) {
          const imgs = item.lineSegment?.img || null;
          const line = item.lineSegment;
          if (imgs) {
            // const img = new Image(); // canvas 2d 通过此函数创建一个图片对象
            // img.src = imgs.src || '';
            // img.onload = () => {
            //   canvas.drawImage(img, imgs.x, imgs.y, imgs.width, imgs.height);
            // };
            // 使用 标签
            if (data.length === index + 1) {
              line.moveTo = {
                x: data[index - 1].lineSegment.lineTo.x,
                y: data[index - 1].lineSegment.lineTo.y,
              };
            }
            imageTo(canvasBox, imgs, item, line);
          }

          if (line.lineTo && line.moveTo) {
            lines(index, line, imgs);
          }
        }
        return item;
      });
    }
  }, [data]);

  return (
    <div id={id} style={style}>
      <canvas
        id={`canvas-${id}`}
        width={style.width}
        height={style.height}
      ></canvas>
    </div>
  );
};

export default OperationRoute;

// const data = [
//     {
//       button: [
//         {
//           className: 'name',
//           x: 30 + xChange,
//           y: 50 + yChange,
//           width: 60,
//           height: 30,
//           background: 'rgb(255, 171, 43)',
//           border: '1px soled red',
//           color: '#fff',
//           fontSize: 16,
//           borderRadius: 6,
//           key: 0,
//           value: '**故障1',
//           lineHeight: 30,
//           textAlign: 'center',
//         },
//         {
//           className: 'name',
//           x: 30 + xChange,
//           y: 100 + yChange,
//           width: 60,
//           height: 30,
//           background: 'rgb(255, 171, 43)',
//           border: '1px soled red',
//           color: '#fff',
//           fontSize: 16,
//           borderRadius: 6,
//           key: 0,
//           value: '**故障2',
//           lineHeight: 30,
//           textAlign: 'center',
//         },
//       ],
//       lineSegment: {
//         img: {
//           className: 'nameImg',
//           background: 'rgba(41, 194, 147, 0.5)',
//           src: './civilWorks.png',
//           width: 20,
//           height: 20,
//           borderRadius: 20,
//         },
//         moveTo: {
//           // 起始点
//           x: 0 + xChange,
//           y: 0 + yChange,
//         },
//         lineTo: {
//           // 终点
//           x: 100 + xChange,
//           y: 100 + yChange,
//         },
//         width: 5,
//         background: 'rgba(79, 131, 255,0.5)',
//         color: 'green',
//       },
//     },
//     {
//       button: [
//         {
//           className: 'name',
//           x: 150 + xChange,
//           y: 70 + yChange,
//           width: 60,
//           height: 30,
//           background: 'rgb(255, 171, 43)',
//           border: '1px soled red',
//           color: '#fff',
//           fontSize: 16,
//           borderRadius: 6,
//           key: 0,
//           value: '**故障3',
//           lineHeight: 30,
//           textAlign: 'center',
//         },
//       ],
//       lineSegment: {
//         img: {
//           className: 'nameImg',
//           background: 'rgba(41, 194, 147, 0.5)',
//           src: './civilWorks.png',
//           width: 20,
//           height: 20,
//           borderRadius: 20,
//         },
//         moveTo: {
//           // 起始点
//           x: 100 + xChange,
//           y: 100 + yChange,
//         },
//         lineTo: {
//           // 终点
//           x: 300 + xChange,
//           y: 60 + yChange,
//         },
//         width: 5,
//         background: 'rgba(79, 131, 255,0.5)',
//         color: 'green',
//       },
//     },
//     {
//       button: [
//         {
//           className: 'name',
//           x: 230 + xChange,
//           y: 250 + yChange,
//           width: 60,
//           height: 30,
//           background: 'rgb(255, 171, 43)',
//           border: '1px soled red',
//           color: '#fff',
//           fontSize: 16,
//           borderRadius: 6,
//           key: 0,
//           value: '**故障4',
//           lineHeight: 30,
//           textAlign: 'center',
//         },
//       ],
//       lineSegment: {
//         img: {
//           className: 'nameImg',
//           background: 'rgba(41, 194, 147, 0.5)',
//           src: './civilWorks.png',
//           width: 20,
//           height: 20,
//           borderRadius: 20,
//         },
//         moveTo: {
//           // 起始点
//           x: 300 + xChange,
//           y: 60 + yChange,
//         },
//         lineTo: {
//           // 终点
//           x: 300 + xChange,
//           y: 450 + yChange,
//         },
//         width: 5,
//         background: 'rgba(79, 131, 255,0.5)',
//         color: 'green',
//       },
//     },
//     {
//       lineSegment: {
//         img: {
//           className: 'nameImg',
//           background: 'rgba(41, 194, 147, 0.5)',
//           src: './civilWorks.png',
//           width: 20,
//           height: 20,
//           borderRadius: 20,
//         },
//       },
//     },
//   ];

//   // 路线
//   <OperationRoute
//   style={{
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     margin: 'auto',
//     zIndex: 100,
//     width: '500px',
//     height: '500px',
//   }}
//   id={'routes'}
//   data={dataChange}
//   onClick={onClick}
// />
