import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Button, Text, ActivityIndicator, Card } from 'react-native-paper';


const PumpControl: React.FC<PumpControlProps> = ({ isPumpOn, loading, onControlPump }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>Pump Control</Text>
        {loading ? (
          <ActivityIndicator animating={true} size="large" color="#6200ee" />
        ) : (
          <Button
            mode="contained"
            onPress={() => onControlPump(isPumpOn ? 'off' : 'on')}
            color={isPumpOn ? "#ff1744" : "#4caf50"}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            {isPumpOn ? "Turn Off Pump" : "Turn On Pump"}
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default PumpControl;
