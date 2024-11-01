import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeviceDataAPI } from '@/utils/api/fetchDeviceData';
import { RootState } from '@/utils/redux/store';
import { setPumpState } from '@/utils/redux/pump/actions';
import { ActivityIndicator, Card, MD2Colors, Switch, Title } from 'react-native-paper';
import SoilMoistureCard from '@/components/card/SoilMoistureCard';
import LightLevelCard from '@/components/card/LightLevelCard';
import WaterLevelCard from '@/components/card/WaterLevelCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const Dashboard = () => {
  const dispatch = useDispatch();
  const pumpState = useSelector((state: RootState) => state.pump.state);
  
  const [ldr, setLdr] = useState(0);
  const [soilMois, setSoilMois] = useState(0);
  const [waterLevel, setWaterLevel] = useState(0);
  
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    handleRefresh();
  }, [dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await fetchDeviceDataAPI();
      dispatch(setPumpState({ state: data.state })); 
      
      setLdr(data.ldr);
      setSoilMois(data.soil_moisture);
      setWaterLevel(data.water_level);


    } catch (error) {
      console.error("Error refreshing pump state:", error);
    } finally {
      setRefreshing(false);
    }
  };

  if (!pumpState) {
    return <ActivityIndicator animating={true} color={MD2Colors.red800} />;
  }

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <SoilMoistureCard value={soilMois} />
        <LightLevelCard value={ldr} />
        <WaterLevelCard value={waterLevel} />
      </ScrollView>
    </SafeAreaView>
  );
};


export default Dashboard;
