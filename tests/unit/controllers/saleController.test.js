const chai = require('chai');
const sinon = require('sinon');
const httpStatus = require('../../../helpers/http.status.codes');


const controller = require('../../../controllers/salesController');
const service = require('../../../services/salesServices');

const mocks = require('../mocks');

describe('Testing salesController', async () => {
  beforeEach(sinon.restore);

  describe('Funtion: getAllSales()', async () => {
    before(async () => {
      sinon.stub(service, 'getAllSales').resolves();
    });
    after(async () => {
      sinon.stub(service, 'getAllSales').restore();
    });
    it('should return STATUS 200 when solved', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }

      await controller.getAllSales({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(httpStatus.HTTP_STATUS_OK);
    });

    it('should return all sales', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };

      await controller.getAllSales({}, res);
      chai.expect(JSON.stringify(res.json.getCall(0).args[0])).to.equal(JSON.stringify(mocks.GET_ALL_SALES));
    });
  });
  describe('Function: getSaleById(id)', async () => {
    before(async () => {
      sinon.stub(service, 'getSaleById').resolves();
    });
    after(async () => {
      sinon.stub(service, 'getSaleById').restore();
    });
    it('should return STATUS 200 when solved', async () => {
      const req = {
        params: {
          id: 1,
        },
        query: {
          q: null,
        }
      }

      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns()
      };

      await controller.getSaleById(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(httpStatus.HTTP_STATUS_OK);
    });

    it('should return the correct sale', async () => {
      const req = {
        params: {
          id: 1,
        },
        query: {
          q: null,
        }
      }

      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns()
      };

      await controller.getSaleById(req, res);
      chai.expect(JSON.stringify(res.json.getCall(0).args[0])).to.deep.equal(JSON.stringify(mocks.GET_SALE_1));
    });
  });
})