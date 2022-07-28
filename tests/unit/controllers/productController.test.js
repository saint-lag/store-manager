const chai = require('chai');
const sinon = require('sinon');
const httpStatus = require('../../../helpers/http.status.codes');


const controller = require('../../../controllers/productsController');
const service = require('../../../services/productsServices');

const mocks = require('../mocks');

describe('Testing productsController', async () => {
  beforeEach(sinon.restore);

  describe('Function: getAll()', () => {
    before(async () => {
      sinon.stub(service, 'getAll').resolves();
    });
    after(async () => {
      sinon.stub(service, 'getAll').restore();
    });
    it('Should return STATUS 200 when solved', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await controller.getAll({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(httpStatus.HTTP_STATUS_OK)
    });

    it('Should return all products', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(mocks.GET_ALL_PRODUCTS)
      }

      await controller.getAll({}, res);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal(mocks.GET_ALL_PRODUCTS);
    })
  });
  describe('Function: getById(3)', () => {
    it('Should return STATUS 200 when solved', async () => {
      const req = {
        params: {
          id: 3,
        },
        query: {
          q: null,
        }
      }

      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns()
      };

      await controller.getById(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(httpStatus.HTTP_STATUS_OK);
    })
  });
});