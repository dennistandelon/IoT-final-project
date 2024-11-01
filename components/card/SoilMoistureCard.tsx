import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Text } from 'react-native-paper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { SensorCardProps } from './interfaces/sensor.interface';

const SoilMoistureCard: React.FC<SensorCardProps> = ({ value }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>Soil Moisture</Title>
        <View style={styles.gaugeContainer}>
          <AnimatedCircularProgress
            size={100}
            width={10}
            fill={value}
            tintColor="#4CAF50"
            backgroundColor="#E0E0E0"
          />
          <Text style={styles.percentageText}>{value}%</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
  },
  gaugeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SoilMoistureCard;
