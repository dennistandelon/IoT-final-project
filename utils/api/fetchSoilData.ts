import axios from 'axios';
import { SOIL_DEVICE_ID, JWT_TOKEN } from '@env';

const API_URL = `http://demo.thingsboard.io/api/plugins/telemetry/DEVICE/${SOIL_DEVICE_ID}/values/timeseries?keys=state`;

export const fetchSoilStateApi = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': JWT_TOKEN,
    },
  });
  
  return response.data.state[0].value;
};
