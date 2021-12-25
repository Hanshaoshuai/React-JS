import React, { PureComponent } from '@alipay/bigfish/react';
import { Chart, Geom, Axis, Legend, Label, Guide, Tooltip } from 'bizcharts';

const { DataMarker } = Guide;
const { Line } = Guide;

const data = [
  { category: 'Sports', sold: 275 },
  { category: 'Strategy', sold: -255 },
  { category: 'Action', sold: 120 },
  { category: 'Shooter', sold: 650 },
  { category: 'Other', sold: 150 },
];

const scale = {
  sold: {
    type: 'linear',
    min: -600,
    max: 1000,
    alias: 'sold（自定义名称）',
  },
  category: {
    alias: 'category（自定义名称）',
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
  y: {
    alias: 'Daily sugar intake',
    tickInterval: 50,
    nice: false,
    max: 165,
    min: 0,
  },
  z: {
    formatter(val) {
      return `${val} 。C`;
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
          width={600}
          height={600}
          padding={[100, 100, 100, 100]}
          data={data}
          scale={scale}
          onGetG2Instance={handleAlwaysShowTooltip}
        >
          <span className="main-title" style={styles.mainTitle}>
            复杂Canvas图表
          </span>
          <span className="sub-title" style={styles.subTitle}>
            ____ _ _ _ _ _设置刻度范围 [-600,
            1000]，去除0轴线黑线，增加数据标注点，显示Legend，显示Tooltip
          </span>
          <Axis name="sold" title={{ offset: 64 }} label={scale.x_L} grid={grid} />
          <Axis name="category" title={{ offset: 80 }} label={scale.z} />
          <Tooltip />
          <Legend
            name="category"
            title={{
              textAlign: 'center', // 文本对齐方向，可取值为： start middle end
              fill: '#404040', // 文本的颜色
              fontSize: '12', // 文本大小
              fontWeight: 'bold', // 文本粗细
              rotate: -30, // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
              textBaseline: 'top', // 文本基准线，可取 top middle bottom，默认为middle
            }}
            position="top"
          />
          <Guide>
            <DataMarker
              position={['Action', 110]}
              content={'特殊数据标注点\n可描述自定义的标注'}
              lineLength={80}
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
          </Guide>
          <Guide>
            <Line
              start={['min', 800]}
              end={['max', 800]}
              text={{
                content: 'Safe sugar intake 800g/day',
                position: 'end',
                style: {
                  textAlign: 'end',
                },
              }}
            />
            <Line
              start={['Strategy', 'min']}
              end={['Strategy', 'max']}
              text={{
                content: 'Safe fat intake Strategy65g/day',
                position: 'end',
                autoRotate: false,
                style: {
                  textAlign: 'start',
                },
              }}
            />
          </Guide>
          <Geom type="interval" position="category*sold" color="category">
            <Label
              labelLine={{
                lineWidth: 10, // 线的粗细
                stroke: '#ff8800', // 线的颜色
                lineDash: [2, 1], // 虚线样式
              }}
            />
          </Geom>
          <Geom type="line" position="category*sold" color="#4FAAEB" size={2} />
          <Geom
            type="line"
            position="category*sold"
            color="#fff"
            size={3}
            style={{
              lineDash: [4, 4],
            }}
          />
        </Chart>
      </div>
    );
  }
}

// CDN END
export default XAxisZeroAlign;