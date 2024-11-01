import React, { Alert, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import PumpControl from '@/components/control/PumpControl';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '@/utils/redux/store';
import { fetchDeviceDataAPI } from '@/utils/api/fetchDeviceData';
import { setPumpState } from '@/utils/redux/pump/actions';
import { ActivityIndicator, MD2Colors, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { controlPump } from '@/utils/api/controlDeviceData';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const pumpState = useSelector((state: RootState) => state.pump.state);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    handleRefresh();
  }, [dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await fetchDeviceDataAPI();
      dispatch(setPumpState({ state: data.state })); 
    } catch (error) {
      console.error("Error refreshing pump state:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handlePumpControl = async (state: 'on' | 'off') => {
    setLoading(true);
    try {
      const success = await controlPump(state);
      if (success) {
        handleRefresh();
        setMessage(`Successfully turned ${state} the Pump`);
      } else {
        setMessage(`Failed turned ${state} the Pump`);
      }
    } catch (error) {
      setMessage(`Failed turned ${state} the Pump`);
    } finally {
      setLoading(false);
      setVisible(true);
    }
  };

  if (!pumpState) {
    return <ActivityIndicator animating={true} color={MD2Colors.red800} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        style={styles.scrollViewStyle}
      >
        <PumpControl
          isPumpOn={pumpState === 'on'}
          loading={loading}
          onControlPump={handlePumpControl}
        />
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        action={{
          label: 'Close',
          onPress: () => {},
        }}
        style={{ position: 'absolute', bottom: 10 }}
      >
          {message}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewStyle:{
    minHeight: '80%',
  }
});