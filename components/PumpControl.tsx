import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface PumpControlState {
  isPumpOn: boolean;
  loading: boolean;
}

class PumpControl extends Component<{}, PumpControlState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isPumpOn: false,
      loading: false,
    };
  }

  handlePumpControl = async (state: 'on' | 'off') => {
    this.setState({ loading: true });

    const url = `http://demo.thingsboard.io/api/v1/fJJzSlsKjfqnFD69qUyB/telemetry`;
    const data = {
      state: state,
    };

    try {
      const response = await axios.post<{ success: boolean }>(url, data);
      // Check if the response indicates success
      if (response.status === 200) { // Ensure successful response
        this.setState({ isPumpOn: state === 'on' });
        Alert.alert("Pump Status", `Pump turned ${state.toUpperCase()}`);
      } else {
        Alert.alert("Error", "Failed to control the pump.");
      }
    } catch (error) {
      console.error('Error controlling pump:', error);
      Alert.alert("Error", "Failed to control the pump. Please try again.");
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { isPumpOn, loading } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pump Control</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button
            title={isPumpOn ? "Turn Off Pump" : "Turn On Pump"}
            onPress={() => this.handlePumpControl(isPumpOn ? 'off' : 'on')}
            color={isPumpOn ? "red" : "blue"}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default PumpControl;
