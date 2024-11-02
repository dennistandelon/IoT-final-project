import axios from 'axios';
import { DEVICE_ID, JWT_TOKEN } from '@env';

const API_URL = `http://demo.thingsboard.io/api/plugins/telemetry/DEVICE/${DEVICE_ID}/values/timeseries?keys=state,soil_moisture_value,ldr_value,water_level`;

export const fetchDeviceDataAPI = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': JWT_TOKEN,
    },
  });
  
  return {
    state: response.data.state[0].value,
    // ldr: response.data.ldr_value[0].value,
    soil_moisture: response.data.soil_moisture_value[0].value,
    water_level: response.data.water_level[0].value
  };
};
