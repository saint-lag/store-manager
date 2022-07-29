const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../helpers/connection');
const mocks = require('../mocks');

const {
  getAll,
  getById,
  searchByName,
} = require('../../../models/productsModel');

describe('Testing productsModels', () => {
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
    });
    it('should have property "id"', async () => {
      const res = await getAll();
      expect(res).to.have.a.property('id');
    });
    it('should have a property "name"', async () => {
      const res = await getAll();
      expect(res).to.have.a.property('name');
    });
  });
})

/*
describe('Function getById()', async () => {
  it('should return an object', async () => {
    const res = await getById(1);
    expect(res).to.be.an('object');
  });
  it('should have property "id"', async () => {
    const res = await getById('2');
    expect(res).to.have.a.property('id');
  });
  it('should have a property "name"', async () => {
    const res = await getById('2');
    expect(res).to.have.a.property('name');
  });
});


});*/