/**
 * Default mocks for testing
 */
const sinon = require('sinon');

const mockResponse = () => {
  const res = {};
  res.sendStatus = sinon.stub().returns(res);
  res.redirect = sinon.stub().returns(res);
  res.status = sinon.stub().returns(res);
  res.statusCode = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  res.contentType = sinon.stub().returns(res);
  res.send = sinon.stub().returns(res);
  res.render = sinon.stub().returns(res);
  res.type = sinon.stub().returns(res);
  res.set = sinon.stub().returns(res);
  return res;
};

module.exports = mockResponse;
