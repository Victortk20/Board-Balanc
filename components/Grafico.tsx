import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Circle, Text } from 'react-native-svg';

//const { width, height } = Dimensions.get('window');

const width = 300;
const height = 450;

const Grafico = ({points}:{points:any}) => {
  // Defina os valores mínimos e máximos para os eixos X e Y
  const minX =  -10;
  const maxX = 10;
  const minY = -10;
  const maxY = 10;

  // Calcula a escala para que os pontos se encaixem no gráfico
  const scaleX = width / (maxX - minX);
  const scaleY = height / (maxY - minY);

  return (
    <View style={styles.container}>
      {/* Criação do componente SVG */}
      <Svg width={width} height={height}>
        {/* Desenha a malha quadriculada de fundo */}
        {Array.from({ length: maxX - minX + 1 }, (_, index) => (
          <Line
            key={`gridX${index}`}
            x1={index * scaleX}
            y1={0}
            x2={index * scaleX}
            y2={height}
            stroke="lightgray"
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: maxY - minY + 1 }, (_, index) => (
          <Line
            key={`gridY${index}`}
            x1={0}
            y1={index * scaleY}
            x2={width}
            y2={index * scaleY}
            stroke="lightgray"
            strokeWidth={1}
          />
        ))}

        {/* Eixo X */}
        <Line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="black" strokeWidth={2} />
        {/* Marcações no eixo X */}
        {Array.from({ length: maxX - minX + 1 }, (_, index) => (
          <Line
            key={`markX${index}`}
            x1={index * scaleX}
            y1={height / 2 - 5}
            x2={index * scaleX}
            y2={height / 2 + 5}
            stroke="black"
            strokeWidth={2}
          />
        ))}
        {/* Labels no eixo X */}
        {Array.from({ length: maxX - minX + 1 }, (_, index) => (
          <Text
            key={`labelX${index}`}
            x={index * scaleX}
            y={height / 2 + 20}
            textAnchor="middle"
            fontSize={14}
            fill="black"
          >
            {index + minX}
          </Text>
        ))}

        {/* Eixo Y */}
        <Line x1={width / 2} y1={0} x2={width / 2} y2={height} stroke="black" strokeWidth={2} />
        {/* Marcações no eixo Y */}
        {Array.from({ length: maxY - minY + 1 }, (_, index) => (
          <Line
            key={`markY${index}`}
            x1={width / 2 - 5}
            y1={index * scaleY}
            x2={width / 2 + 5}
            y2={index * scaleY}
            stroke="black"
            strokeWidth={2}
          />
        ))}
        {/* Labels no eixo Y */}
        {Array.from({ length: maxY - minY + 1 }, (_, index) => (
          <Text
            key={`labelY${index}`}
            x={width / 2 - 20}
            y={index * scaleY}
            textAnchor="end"
            fontSize={14}
            fill="black"
          >
            {maxY - index}
          </Text>
        ))}

        {/* Conectar os pontos com círculos e linhas */}
        {points.map((point, index) => (
          <Circle
            key={`point${index}`}
            cx={point.x * scaleX + width / 2}
            cy={height / 2 - point.y * scaleY}
            r="4"
            fill="blue"
          />
        ))}
        {points.map((point, index) => (
          points[index + 1] && (
            <Line
              key={`line${index}`}
              x1={point.x * scaleX + width / 2}
              y1={height / 2 - point.y * scaleY}
              x2={points[index + 1].x * scaleX + width / 2}
              y2={height / 2 - points[index + 1].y * scaleY}
              stroke="red"
              strokeWidth={2}
            />
          )
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: -18,
    borderRadius: 15,
  },
});

export default Grafico;

