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
