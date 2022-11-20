// Analytics tracking middleware
import { useUserStore } from '@stores/user.js';
import { waitUntilTrue } from '@utils/async.js';
import { logWarning } from '@logging';
import * as trackingClients from './clients/index.js';
import events from './events.js';

const PRERENDER_USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/61.0.3159.5 Safari/537.36 Prerender (+https://github.com/prerender/prerender)';
const ANALYTICS_DISABLED =
  window.navigator.userAgent === PRERENDER_USER_AGENT ||
  window.navigator.userAgent.toLowerCase().includes('prerender');

// Initializes all analytics clients
export function init() {
  if (ANALYTICS_DISABLED) return;
  Object.values(trackingClients).forEach((client) => {
    if (client.init) client.init();
  });
}

// Identifies the user across all analytics clients
export function identify(userId) {
  if (ANALYTICS_DISABLED) return;
  if (!userId) return; // TODO: Log error
  Object.values(trackingClients).forEach((client) => {
    if (client.identify) client.identify(userId);
  });
}

// Identifies the user across all analytics clients
export function updateUserData(userProperties) {
  if (ANALYTICS_DISABLED) return;
  if (!userProperties) return; // TODO: Log error
  const userStore = useUserStore();
  if (!userProperties.userId)
    userProperties.userId = userStore.authUserDetails.userId;
  Object.values(trackingClients).forEach((client) => {
    if (client.updateUserData) client.updateUserData(userProperties);
  });
}

// Tracks an event across all specified clients. If no clients specified, defaults to all available.
export async function track({ eventName, data }) {
  if (ANALYTICS_DISABLED) return;
  if (!Object.keys(events).includes(eventName)) {
    logWarning(
      `Warning: Tracking event with name ${eventName} cannot be found`
    );
    return;
  }

  const userStore = useUserStore();

  // Attach global event data attributes
  if (data) {
    if (!data.currentPath) data.currentPath = window.location.pathname;
    if (!data.queryParams) data.queryParams = window.location.search;
    if (!data.collaborationRole)
      data.collaborationRole = userStore.authUserCollaborationRole;
    await waitUntilTrue(() => userStore.isOptimizeLoaded, 1000);
    // Add user-specific analytics metadata
    // TODO: When guest users are implemented, ungate
    const analyticsMetadata = userStore.authUserMetadata?.analytics;
    if (analyticsMetadata) {
      const curTime = new Date();
      const oldSessions = analyticsMetadata.sessions.slice(
        0,
        analyticsMetadata.sessions.length - 1
      );
      const latestSession =
        analyticsMetadata.sessions[analyticsMetadata.sessions.length - 1];
      const latestSessionDuration = Math.round(
        (curTime - new Date(latestSession.sessionStartTime)) / 1000
      );
      data.totalTimeOnSite =
        latestSessionDuration +
        oldSessions
          .map((session) => session.sessionTimeOnSite)
          .reduce((a, b) => a + b, 0);
      data.totalNumEvents = analyticsMetadata.totalEvents;
      data.currentSessionNum = latestSession.sessionNumber;
      data.sessionTimeOnSite = latestSessionDuration;
      data.sessionNumEvents = latestSession.sessionEvents;
    }
    /* eslint no-param-reassign: 1 */
  }
  const { category, description } = events[eventName]; // eslint-disable-line
  let { clients } = events[eventName];
  // If clients === 'all', use all available tracking clients
  if (clients === 'all') clients = Object.keys(trackingClients);
  clients.forEach((client) => {
    if (client in trackingClients) {
      // Initialize client if not already
      // NOTE: If a client defines init() it should return immediately if already initialized
      if (trackingClients[client].init) trackingClients[client].init();
      if (trackingClients[client].track)
        trackingClients[client].track({
          data: data || {},
          eventName,
          category,
          description
        });
    } else
      logWarning(
        `Warning: Specified tracking client with name ${client} cannot be found.`
      );
  });
}

export default {
  init, identify, updateUserData, track
};
