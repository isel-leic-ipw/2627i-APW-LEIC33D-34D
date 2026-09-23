import { dayName, dayNumber } from '../dayname.mjs'

import assert from 'node:assert/strict'

describe('Test Suite for dayname module', function () {
  // Arrange
  describe('Tests mapping day numbers to names', function () {
    it('should return Monday', function () {
      // Arrange
      // ...

      // Act 
      const ret = dayName(1);

      // Assert
      assert.equal(ret, "Monday", "Should return Monday");
    });
    it('should return Tuesday', function () {
      const ret = dayName(2);
      assert.equal(ret, "Tuesday");
    });
  });

  describe('Tests mapping day names to numbers', function () {
    it('for Sunday should return 0', function () {
      const ret = dayNumber("Sunday");
      assert.equal(ret, 0, "Should return 0");
    });
    it('for Saturday should return 6', function () {
      const ret = dayNumber("Saturday");
      assert.equal(ret, 6, "Should return 6");
    });
    it('for saturday (first char is lower case) should return 6', function () {
      const ret = dayNumber("saturday");
      assert.equal(ret, 6, "Should return 6");
    });
  });

  describe('Tests mapping without day names or day numbers', function () {
    it('for "" should return -1', function () {
      const ret = dayNumber("");
      assert.equal(ret, -1, "Should return -1");
    });
    it('for "Moon" should return -1', function () {
      const ret = dayNumber("Moon");
      assert.equal(ret, -1, "Should return -1");
    });
    it('for number 7 should return undefined', function () {
      const ret = dayName(7);
      assert.equal(ret, undefined, "Should return undefined");
    });
    it('for number -1 should return undefined', function () {
      const ret = dayName(-1);
      assert.equal(ret, undefined, "Should return undefined");
    });
  });
});