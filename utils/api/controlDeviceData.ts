import axios from 'axios';
import { DEVICE_TOKEN } from '@env';

const API_URL = `http://demo.thingsboard.io/api/v1/${DEVICE_TOKEN}/telemetry`;

export const controlPump = async (state: 'on' | 'off'): Promise<boolean> => {
    try {
      const response = await axios.post<{ success: boolean }>(API_URL, { state });
      
      if (response.status === 200) {
        return true;
      } else {
        throw new Error('Failed to control the pump');
      }
    } catch (error) {
      console.error('Error controlling pump:', error);
      throw error;
    }
};
