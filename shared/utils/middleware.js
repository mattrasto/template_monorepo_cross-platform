// Express middleware functions

import { logError } from '@logging';
import { Readable } from 'stream';
import multer from 'multer';

// Uses multer to store a single uploaded file in memory within req.file
// Buffer can be accessed via req.file.buffer
export const storeFileBuffer = multer({ storage: multer.memoryStorage() }).single('file');

// Uses multer to store multiple uploaded files in memory within req.files
// Each file's buffer can be accessed via req.files[x].buffer
export const storeFileBuffers = multer({ storage: multer.memoryStorage() }).array('files');

// Converts a buffer in req.file.buffer to a readable stream
// Requires req.file.buffer to be defined (eg. from storeFileBuffer() middleware)
// Source: https://stackoverflow.com/a/44091532/3748574
export function fileBufferToStream(req, res, next) {
  if (!req.file || !req.file.buffer) {
    logError('Failed to convert file buffer to stream: req.file.buffer is not defined');
    next();
    return;
  }
  const fileStream = new Readable();
  fileStream._read = () => {};
  fileStream.push(req.file.buffer);
  fileStream.push(null);
  req.file.stream = fileStream;
  next();
}

// Converts all buffers in req.files[x].buffer to a readable stream
// Requires req.files[x].buffer to be defined (eg. from storeFileBuffer() middleware) for each file
// Source: https://stackoverflow.com/a/44091532/3748574
export function fileBuffersToStreams(req, res, next) {
  req.files.forEach((f) => {
    if (!f.buffer) {
      logError('Failed to convert file buffer to stream: req.file.buffer is not defined');
      return;
    }
    const fileStream = new Readable();
    fileStream._read = () => {};
    fileStream.push(f.buffer);
    fileStream.push(null);
    f.stream = fileStream; // eslint-disable-line no-param-reassign
  });
  next();
}

export function reportMiddleware(req, res, next) {
  res.report = (report) => {
    res.status(report.code).json(report.result);
  };
  next();
}
