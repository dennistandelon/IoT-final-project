import React, { useEffect, useState } from 'react';
import { Text, Button, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPumpStateApi } from '@/utils/api/fetchPumpData';
import { RootState } from '@/utils/redux/store';
import { setPumpState } from '@/utils/redux/pump/actions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const pumpState = useSelector((state: RootState) => state.pump.state);
  
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    handleRefresh();
  }, [dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const value = await fetchPumpStateApi();
      dispatch(setPumpState({ state: value })); 
    } catch (error) {
      console.error("Error refreshing pump state:", error);
    } finally {
      setRefreshing(false);
    }
  };

  if (!pumpState) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.item}>Pump State: {pumpState}</Text>
      <Button title="Refresh" onPress={handleRefresh} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
