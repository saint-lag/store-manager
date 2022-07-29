const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../helpers/connection');
const mocks = require('../mocks');

const {
  getAll,
  getById,
  searchProduct
} = require('../../../services/productsServices');

describe('Testing productsServices', () => {
  describe('Function: getAll()', async () => {
    before(async () => {
      sinon.stub(connection, 'execute').returns(mocks.GET_ALL_PRODUCTS);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('should return an object', async () => {
      const res = await getAll();
      expect(res).to.be.an('object');
    })
  });

  describe('Function: searchProduct(searchTerm)', async () => {
    it('should find: { id: 3, name: Escudo do Capitão América }', async () => {
      const res = await searchProduct('Escudo');
      const QUERY_ID = mocks.GET_ALL_PRODUCTS[2].id;
      const QUERY_NAME = mocks.GET_ALL_PRODUCTS[2].name;

      expect(res[0]).to.be.an('object');
      expect(res[0]).to.have.a.property('name')
        .to.equal(QUERY_NAME);
      expect(res[0]).to.have.a.property('id')
        .to.equal(QUERY_ID);
    });

  /*describe('Function getById()', async () => {
    before(async () => {
      sinon.stub(connection, 'execute').returns(mocks.GET_ALL_PRODUCTS);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('should return an object', async () => {
      const res = await getById(2);
      expect(res).to.be.an('object');
    });
    it('should have property "id"', async () => {
      const res = await getById(2);
      expect(res).to.have.a.property('id');
    });
    it('should have a property "name"', async () => {
      const res = await getById(2);
      expect(res).to.have.a.property('name');
    });*/
});
});
