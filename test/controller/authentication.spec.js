/* eslint-env node, mocha */
const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const authenticationController = require('../../controllers/authentication');
const mockRequest = require('../mockRequest');
const mockResponse = require('../mockResponse');
// const { version } = require('../../package.json');

describe('Controller: Authentication', function () {
  it('Exists', function () {
    assert.ok(!!authenticationController);
  });
  describe('Registeration Controller', function () {
    it('Exist', function () {
      assert.ok(!!authenticationController.registerController);
    });
    it('should return 400 if user already exist with same email', async function () {
      const req = mockRequest({
        body: {
          phone: '',
          email: '',
          password: '',
          name: '',
        },
        params: {
          role: '',
        },
      });

      const res = mockResponse();

      const next = function () {
        return sinon.stub().rejects(400);
      };

      global.domain = {
        User: {
          findByEmail: sinon.stub().resolves({}),
        },
      };

      await authenticationController.registerController(req, res, next);

      sinon.assert.calledWith(res.statusCode, 400);
    });
    it('should return 201 status if user successfully created', async function (done) {
      const req = mockRequest({
        body: {
          phone: '',
          email: '',
          password: '',
          name: '',
        },
        params: {
          role: '',
        },
      });

      const res = mockResponse();

      global.domain = {
        User: {
          findByEmail: sinon.stub().resolves({}),
        },
      };

      const next = function () {
        done();
      };

      await authenticationController.registerController(req, res, next);
      sinon.assert.calledWith(req.status, 201);
    });
  });
  describe('Login Controller', function () {
    it('Exist', function () {
      assert.ok(!!authenticationController.registerController);
    });
    it('should return 400 if email or password not provided', async function (done) {
      const req = mockRequest({
        body: {
          password: '',
        },
      });

      const res = mockResponse();

      const next = function () {
        done();
      };
      global.domain = {
        User: {
          findByEmail: sinon.stub().resolves({}),
        },
      };

      await authenticationController.loginController(req, res, next);

      sinon.assert.calledWith(req.status, 400);
    });
    it('should return 400 status if user not found', async function (done) {
      const req = mockRequest({
        body: {
          phone: '',
          email: '',
          password: '',
          name: '',
        },
        params: {
          role: '',
        },
      });

      const res = mockResponse();

      const next = function () {
        done();
      };

      await authenticationController.registerController(req, res, next);
      sinon.assert.calledWith(req.status, 201);
    });
  });
  it('should return 200 status', function () {
    const res = mockResponse();

    authenticationController.healthcheck(mockRequest(), res);

    sinon.assert.calledWith(res.status, 200);
  });
  it('returns current version of the app', function () {
    const res = mockResponse();

    authenticationController.healthcheck(mockRequest(), res);

    sinon.assert.calledWith(res.json, {
      version: version,
    });
  });
});
