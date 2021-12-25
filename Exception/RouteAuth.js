import React, { PureComponent } from '@alipay/bigfish/react';
import { Chart, Geom, Axis, Legend, Label, Guide, Tooltip } from 'bizcharts';

const { DataMarker } = Guide;
const { Line } = Guide;

// const data = [
// { category: 'Sports', sold: 275 },
// { category: 'Strategy', sold: -255 },
// { category: 'Action', sold: 120 },
// { category: 'Shooter', sold: 650 },
// { category: 'Other', sold: 150 }
// ]
const data = [
  { month: 'Jan', rainfall: 419.9, seaLevelPressure: 1016, temperature: 7 },
  { month: 'Feb', rainfall: 171.5, seaLevelPressure: 1016, temperature: 6.9 },
  { month: 'Mar', rainfall: 606.4, seaLevelPressure: 1015.9, temperature: 9.5 },
  { month: 'Apr', rainfall: 129.2, seaLevelPressure: 1015.5, temperature: 14.5 },
  { month: 'May', rainfall: -344, seaLevelPressure: 612.3, temperature: 18.2 },
  { month: 'Jun', rainfall: 576, seaLevelPressure: 809.5, temperature: 21.5 },
  { month: 'Jul', rainfall: 735.6, seaLevelPressure: 1009.6, temperature: 25.2 },
  { month: 'Aug', rainfall: 548.5, seaLevelPressure: 1010.2, temperature: 26.5 },
  { month: 'Sep', rainfall: 216.4, seaLevelPressure: 503.1, temperature: 23.3 },
  { month: 'Oct', rainfall: 694.1, seaLevelPressure: 1016.9, temperature: 18.3 },
  { month: 'Nov', rainfall: -195.6, seaLevelPressure: 1018.2, temperature: 13.9 },
  { month: 'Dec', rainfall: 54.4, seaLevelPressure: 1016.7, temperature: 9.6 },
];

const scale = {
  rainfall: {
    type: 'linear',
    min: -600,
    max: 1000,
    alias: 'rainfall（自定义名称）',
  },
  month: {
    alias: 'month（自定义名称）',
  },
  seaLevelPressure: {
    alias: 'seaLevelPressure（自定义名称）',
  },
  rainfall_1: {
    labelLine: {
      lineWidth: 1, // 线的粗细
      stroke: '#ff8800', // 线的颜色
      lineDash: [2, 2], // 虚线样式
    },
    content: ['month*rainfall', (month, rainfall) => `${rainfall}mm`],
  },
  x_L: {
    formatter(val) {
      if (val > 0 || val < 0) {
        return `${val} mm`;
      }
      return `${val} mm`;
    },
    textStyle: {
      // fill: 'red',
      // rotate : 60
    },
  },
  x_R: {
    formatter(val) {
      return `${val} -p`;
    },
    textStyle: {
      fill: 'red',
      // rotate : 60
    },
  },
  z: {
    formatter(val) {
      return `${val} -`;
    },
    textStyle: {
      // fill: 'red',
      // rotate : 60
    },
  },
};

// http://bizcharts.net/products/bizCharts/api/axis
const grid = {
  zeroLineStyle: {
    stroke: '#ddd',
    lineDash: [2, 4],
  },
};

const styles = {
  wrapper: {
    width: 700,
    textAlign: 'center',
    padding: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  mainTitle: {
    fontSize: 18,
    color: '#333',
    display: 'block',
    padding: 10,
  },
  subTitle: {
    fontSize: 14,
    color: '#bbb',
    display: 'block',
    padding: 10,
  },
};

// let chartIns

// 默认选中第三项的结果
const handleAlwaysShowTooltip = ev => {
  ev.showTooltip(ev.getXY(data[3]));
};

class XAxisZeroAlign extends PureComponent {
  state = {};

  render() {
    return (
      <div style={styles.wrapper}>
        <Chart
          renderer="canvas"
          width={800}
          height={700}
          padding={[100, 100, 200, 100]}
          data={data}
          scale={scale}
          onGetG2Instance={handleAlwaysShowTooltip}
        >
          <span className="main-title" style={styles.mainTitle}>
            复杂Canvas图表
          </span>
          <span className="sub-title" style={styles.subTitle}>
            设置刻度范围 [-600, 1000]，去除0轴线黑线，增加数据标注点，显示Legend，显示Tooltip
          </span>
          <Axis
            name="rainfall" // 左边列刻度显示的
            title={{ offset: 64 }}
            label={scale.x_L}
            grid={grid}
          />
          <Axis
            name="month" // 下边行刻度显示的
            title={{ offset: 100 }}
            label={scale.z}
          />
          <Axis
            name="seaLevelPressure" // 右边列刻度显示的
            title={{ offset: 50 }}
            label={scale.x_R}
          />
          <Tooltip />
          <Legend
            // name="month"
            title={{
              // 下边行刻度定义怎么显示
              textAlign: 'center', // 文本对齐方向，可取值为： start middle end
              fill: '#404040', // 文本的颜色
              fontSize: '12', // 文本大小
              fontWeight: 'bold', // 文本粗细
              rotate: -30, // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
              textBaseline: 'top', // 文本基准线，可取 top middle bottom，默认为middle
            }}
            position="top"
            // <Legend position="right" />
          />
          <Guide>
            <DataMarker // 自定义显示内容
              position={['Jun', 876]}
              content={'特殊数据标注点\n可描述自定义的标注'}
              lineLength={20}
              direction="upward"
              style={{
                text: {
                  textAlign: 'center',
                  fontSize: 14,
                },
                point: {
                  stroke: '#FF4D4F',
                },
              }}
            />
            <Line // 自定义虚线横坐标
              start={['min', 800]}
              end={['max', 800]}
              text={{
                content: '800mm',
                position: 'end',
                style: {
                  textAlign: 'end',
                },
              }}
            />
            <Line // 自定义虚线纵坐标
              start={['May', 'min']}
              end={['May', 'max']}
              text={{
                content: '144mm/May',
                position: 'end',
                autoRotate: false,
                style: {
                  textAlign: 'start',
                },
              }}
            />
          </Guide>
          <Geom // 图内容
            type="interval"
            position="month*rainfall"
            // color='category'
            color=""
          >
            <Label content={scale.rainfall_1.content} labelLine={scale.rainfall_1.labelLine} />
          </Geom>
          <Geom // 图内容
            type="line"
            position="month*seaLevelPressure"
            // color="#9AD681"
            color={`l (270) 0:rgba(255,0,0,1) ${1}:rgba(206,241,141,1) 1:rgba(47,194,91,1)`}
            size={2}
          />
          <Geom // 图内容
            type="line"
            position="month*seaLevelPressure"
            // color="#7f8da9"
            color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
            size={3}
            style={{ lineDash: [4, 4] }}
          />
          <Geom // 图内容
            type="point"
            position="month*seaLevelPressure"
            color="#f33274"
            shape="circle"
            size={4}
          />
        </Chart>
      </div>
    );
  }
}

// CDN END
export default XAxisZeroAlign;