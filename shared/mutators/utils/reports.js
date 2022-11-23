import { logWarning } from '@logging';

const STATUSES = {
  SUCCESS: 'success',
  FAILURE: 'failure',
  ERROR: 'error',
};

// Creates a report (controller response)
export function createReport(status, statusCode, data, message, metadata = {}) {
  if (!Object.values(STATUSES).includes(status))
    logWarning(
      `Report status should be one of { ${Object.values(STATUSES).join(', ')} }. Got: ${status}`,
    );
  return {
    code: statusCode,
    result: {
      status,
      data,
      message,
    },
    metadata,
  };
}

// Helper function for creating success (2xx) reports
export function createSuccessReport(data, message, metadata = {}) {
  return createReport('success', 200, data, message, metadata);
}

// Helper function for creating failure (4xx) reports
export function createFailureReport(statusCode, message, metadata = {}) {
  return createReport('failure', statusCode, null, message, metadata);
}

// Helper function for creating error (5xx) reports
export function createErrorReport(statusCode, message, metadata = {}) {
  return createReport('error', statusCode, null, message, metadata);
}

export function parseReport(report) {
  if (!report || !report.result) {
    console.warn(`Failed to parse report: ${JSON.stringify(report)}`); // eslint-disable-line no-console
    return report;
  }
  return {
    ...report.result,
    statusCode: report.code,
    metadata: report.metadata,
  };
}

export function createUpdateReport(updateResult, entityIdentifier) {
  if (updateResult === null) return createErrorReport(500, `Failed updating ${entityIdentifier}`);
  const [count, records] = updateResult;
  return count > 0
    ? createSuccessReport(records[0], `Successfully updated ${entityIdentifier}`)
    : createFailureReport(404, `Could not find ${entityIdentifier}`);
}
