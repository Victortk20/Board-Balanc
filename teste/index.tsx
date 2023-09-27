import React from 'react';
import { View } from 'react-native';
import { Svg, Line } from 'react-native-svg';

interface AxisChartProps {
  width: number;
  height: number;
}

const AxisChart: React.FC<AxisChartProps> = ({ width, height }) => {
  return (
    <View>
      <Svg width={width} height={height}>
        
        <Line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="black" strokeWidth="2" />

        
        <Line x1={width / 2} y1="0" x2={width / 2} y2={height} stroke="black" strokeWidth="2" />
      </Svg>
    </View>
  );
};

export default AxisChart;
