const sinon = require('sinon');
const {expect} = require('chai');
const connection = require('../../../helpers/connection');
const mocks = require('../mocks');

const { getAll } = require('../../../services/productsServices');

describe('Testing productsServices', () => {
  before(async () => {
    sinon.stub(connection, 'execute').returns(mocks.GET_ALL_PRODUCTS);
  });
  after(async () => {
    connection.execute.restore();
  });

  describe('Function: getAll()', async () => {
    it('should return an object', async () => {
      const res = await getAll();
      expect(res).to.be.an('object');
    })
  })
});
