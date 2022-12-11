import axios from 'axios';
import { CONFIG } from '@config';

export async function createUser(data) {
  // POST /user
  // return {
  //   code: 200,
  //   result: data,
  //   error: null,
  // };
  return {
    code: 400,
    result: null,
    error: 'Something went wrong.',
  };
}

export async function sendEvents(events) {
  console.log('sending events to API', CONFIG.apiUrl);
  axios.post(`${CONFIG.apiUrl}/events`, { events });
  return {
    code: 200,
    result: null,
    message: 'Events were successfully processed.'
  };
}
