const GET_ALL_PRODUCTS = [{
  "id": 1,
  "name": "Martelo de Thor",
},
{
  "id": 2,
  "name": "Traje de encolhimento",

}, {
  id: 3,
  name: 'Escudo do Capitão América',
},
];

const GET_ALL_SALES = [
  {
    "saleId": 1,
    "date": "2022-08-01T18:19:31.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-08-01T18:19:31.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-08-01T18:19:31.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const GET_SALE_1 = [
  {
    "date": "2022-08-01T18:19:31.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-08-01T18:19:31.000Z",
    "productId": 2,
    "quantity": 10
  }
];

module.exports = { GET_ALL_PRODUCTS, GET_ALL_SALES, GET_SALE_1 };