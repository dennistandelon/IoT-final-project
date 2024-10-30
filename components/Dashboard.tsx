import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

interface TelemetryData {
  state: { value: string }[];
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<TelemetryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const DEVICE_ID = 'ba7fb690-9665-11ef-b5a8-ed1aed9a651f'; // Your device ID
  const JWT_TOKEN = ''; 

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://demo.thingsboard.io/api/plugins/telemetry/DEVICE/${DEVICE_ID}/values/timeseries?keys=state`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': JWT_TOKEN,
        },
      });
      setData(response.data);
    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    Alert.alert('Error', error);
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Telemetry Data</Text>
      <Text style={styles.item}>State: {data?.state[0]?.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Dashboard;
