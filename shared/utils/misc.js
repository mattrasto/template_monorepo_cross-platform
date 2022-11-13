// eslint-disable-next-line import/no-cycle
import { logError } from '@utils/logging.js';
import axios from 'axios';

// https://davidwalsh.name/javascript-debounce-function
export const debounce = (func, wait, immediate) => {
  let timeout;
  // eslint-disable-next-line func-names
  return function() {
    // eslint-disable-next-line prefer-rest-params
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    // eslint-disable-next-line func-names
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// Ensures data is JSON, if not parses
export const ensureJSON = (data) => {
  if (!data) return null;
  let parsedData = data;
  if (typeof data === 'string') {
    try {
      parsedData = JSON.parse(data);
    } catch (e) {
      const dataPreview = `${data.slice(0, 20)}${
        data.length > 20 ? '...' : ''
      }`;
      logError('Could not parse data as JSON', { dataPreview });
    }
  }
  return parsedData;
};

// Utility function to upload a file blob
export const uploadFileBlob = async (url, fileBlob, fn = 'default_fn') => {
  const fileData = new FormData();
  fileData.append('file', fileBlob, fn);
  return axios.post(url, fileData, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${fileData._boundary}`
    }
  });
};

// Parses hash parameters from the current URL
export const parseUrlHash = () => {
  const hash = window.location.hash.substr(1);
  const hashParams = hash.split('&').reduce((result, item) => {
    const parts = item.split('=');
    result[parts[0]] = parts[1]; // eslint-disable-line prefer-destructuring, no-param-reassign
    return result;
  }, {});
  return hashParams;
};

export const copyText = async (text) => {
  if (!navigator.clipboard) {
    logError('Failed to copy link due to navigator.clipboard not existing', {
      text
    });
    return;
  }
  try {
    // Copy Function
    await navigator.clipboard.writeText(text);
  } catch (e) {
    logError(e);
  }
};

// Send email from support
// Based off of https://medium.com/@imre_7961/nodemailer-with-g-suite-oauth2-4c86049f778a
// Only allowed in backend environments
export const sendSupportEmail = async (toAddress, subject, message) => {
  const privateKey = JSON.parse(process.env.GCP_SERVICE_ADMIN_KEY);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: SUPPORT_EMAIL,
      serviceClient: privateKey.client_id,
      privateKey: privateKey.private_key,
    },
  });

  const mailOptions = {
    from: SUPPORT_EMAIL,
    to: toAddress,
    subject,
    html: message,
  };

  return new Promise((resolve) => {
    transporter.sendMail(mailOptions, (error, _info) => {
      if (error) {
        logError(`Failed to send email: ${error}`);
        resolve(false);
      }
      resolve(true);
    });
  });
};
