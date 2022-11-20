export default function validateTrackingEvents(events) {
  Object.keys(events).forEach((key) => {
    const event = events[key];
    if (
      typeof event.description !== 'string' ||
      typeof event.category !== 'string' ||
      !event.clients ||
      !(Array.isArray(event.clients) || typeof event.clients === 'string')
    ) {
      throw new Error(
        `Invalid event formatting for event with name "${key}": category, description, type, clients required.`
      );
    }
  });
  return events;
}
