
/*
 * Import
 */
// assert de nodeJs
// import assert from 'assert';
import { should, expect, assert } from 'chai';

// Pour se servir de should, il faut l'exécuter au préalable
should();

/*
 * Code
 */
const sum = (a, b) => a + b;

const average = list => list.reduce(sum, 0) / list.length;

/*
 * Tests
 */

// skip, permet de passer un test ou une suite de tests en status d'attente
describe('sum', () => {
  it('should return sum of parameters', () => {
    // assert.equal(sum(1, 2), 3);
    expect(sum(1, 2)).to.be.equal(3);

    // assert.equal(sum(145, 23), 168);
    sum(145, 23).should.be.equal(168);

    assert.equal(sum(-10, 10), 0);
  });


  it.skip('should return sum of parameters', () => {
    assert.equal(sum(1, 2), 3);
    assert.equal(sum(145, 23), 168);
    assert.equal(sum(-10, 10), 0);
  });
  // it sans fonction = en attente
  it('sould have 2 parameters');
  it('sould return a number');
});


// Décrire une suite de tests
describe('average', () => {
  // Un test spécifique
  it('should return a number', () => {
    average([1, 2, 3]).should.be.a('number');
  });

  it('should return average of parameters', () => {
    assert.equal(average([12, 20]), 16);
    assert.equal(average([4, 8]), 6);
    assert.equal(average([5, 5, 5, 9]), 6);
  });
});


// Exemple de mochajs
// describe('Array', function() {
//   describe('#indexOf()', function() {
//
//     // Le test avec it()
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1,2,3].indexOf(4), -1);
//     });
//   });
// });
