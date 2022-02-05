const { expect } = require('chai');
const session = require('supertest-session');
const {sumArray, plug} = require('../utils');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).to.be.equal('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).to.be.equal('hola');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).to.be.equal(5);
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).to.be.equal(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.post('/sumArray').send({array: [2,5,7,10,11,15,20], num: 13}).expect(200));
    
    it('responds with true if the sum of two numbers of the array is equal to the last argument', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).to.be.equal(true);
      }));
  });

  ////////////////// EXTENSION SUM ARRAY //////////////////////

  describe('Function sumArray', () => {

    const array = [1,2,3,4];
    
    it('should return true if the sum of two numbers is equal to the second argument', () =>{
      expect(sumArray(array, 7)).equal(true)
    })

    it('should return false if the sum of two numbers is not equal to the second argument', () =>{
      expect(sumArray(array, 99)).equal(false)
    })

    it('should return Error if the first argument is a Number', () =>{
      expect(() => sumArray(4, 7)).throw(TypeError)
    })

    it('should return false if we are looking 2', () =>{
      expect(sumArray(array, 2)).equal(false)
    })

  });

//////////////////////////EXTENSION SUM ARRAY FIN ////////////////////////////

//////  ///////////////// NUM STRING /////////////////////////////


  describe('POST /numString', () => {
    it('responds with 200', () => agent.post('/numString').expect(200));
    it('responds with 4 if the string is `hola`', () =>
      agent.post('/numString')
        .send({s: 'hola'})
        .then((res) => {
          expect(res.body.result).equal(4);
      }));
      it('responds with status 400 if the argument is a Number', () =>
      agent.post('/numString')
        .send({s: 99})
        .then((res) => {
          expect(400);
      }));
      it('responds with status 400 if the argument is Empty', () =>
      agent.post('/numString')
        .send({s: ''})
        .then((res) => {
          expect(400);
      }));
  });

});

/////////////////////// NUM STRING ////////////////////////////////////

describe('POST /plug', () => {
  it('responds with 200', () => agent.post('/plug').expect(200));
  it('responds with the propertie correct', () =>
    agent.post('/plug')
      .send({array: [{color: "red", animal:"bird"},{color: "green", animal:"iguana"}], prop: "color"})
      .then((res) => {
        expect(res.body.result.toString()).equal(['red', 'green'].toString());
    }));
    // it('responds with status 400 if the argument is a Number', () =>
    // agent.post('/numString')
    //   .send({s: 99})
    //   .then((res) => {
    //     expect(400);
    // }));
    // it('responds with status 400 if the argument is Empty', () =>
    // agent.post('/numString')
    //   .send({s: ''})
    //   .then((res) => {
    //     expect(400);
    // }));
// });

});