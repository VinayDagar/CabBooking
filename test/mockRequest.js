/**
 * Default mocks for testing
 */

const winston = require('winston');

const mockRequest = (overrides = {}) => {
  return {
    Logger: winston.createLogger({
      transports: [
        new winston.transports.Console({
          handleExceptions: true,
          json: true,
        }),
      ],
    }),
    params: overrides.params || {},
    query: overrides.query || {},
    body: overrides.body || {},
    baseUrl: overrides.baseUrl || '/643528',
    ...overrides,
  };
};

module.exports = mockRequest;
