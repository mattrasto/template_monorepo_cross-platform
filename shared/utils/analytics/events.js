// Defines all tracked analytics events and maps to tracking clients
// NOTE: This should be synced with the data dictionary: https://docs.google.com/spreadsheets/d/1DCn2BMU7Ox0rwvbYeSsB52Mp8vWaAMld9yf1pMDyNFo

import validateTrackingEvents from './validateEvents.js';

const events = {
  // General User Events
  ViewPage: {
    category: 'Core',
    clients: 'all',
    description: 'User navigated to a new page'
  },
};

export default validateTrackingEvents(events);
