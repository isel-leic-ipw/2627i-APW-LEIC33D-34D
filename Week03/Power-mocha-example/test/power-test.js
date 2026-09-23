import assert from 'assert';

/**
 * Mocha test suite for the JavaScript exponentiation operator (**).
 * This suite verifies the correctness of the operator under various conditions
 * using the built-in 'assert' module.
 *
 * To run this test:
 * 1. Ensure you have Node.js installed.
 * 2. Initialize a new Node.js project: `npm init -y`
 * 3. Install Mocha: `npm install mocha --save-dev`
 * 4. Add `"type": "module"` to your package.json file to enable ESM.
 * 5. Modify `"test": "mocha" to enable the mocha testing.
 * 6. Run the tests from the terminal: `npm test`
 */

describe('The exponentiation operator (**)', () => {
    describe('should correctly calculate the power of a positive integer', () => {
        it('2 to the power of 3 should be 8', () => {
            assert.strictEqual(2 ** 3, 8);
        });
        it('5 to the power of 2 should be 25', () => {
            assert.strictEqual(5 ** 2, 25);
        });
    });

    describe('should return 1 for any base raised to the power of 0', () => {
        it('10 to the power of 0 should be 1', () => {
            assert.strictEqual(10 ** 0, 1, '10 to the power of 0 should be 1');
        });
        it('0 to the power of 0 should be 1', () => {
            assert.strictEqual(0 ** 0, 1, '0 to the power of 0 should be 1');
        });
        it('negative 5 to the power of 0 should be 1', () => {
            assert.strictEqual((-5) ** 0, 1, 'negative 5 to the power of 0 should be 1');
        });
    });

    describe('should correctly handle negative exponents', () => {
        it('2 to the power of -2 should be 0.25', () => {
            assert.strictEqual(2 ** -2, 0.25);
        });
        it('10 to the power of -1 should be 0.1', () => {
            assert.strictEqual(10 ** -1, 0.1);
        });
    });

    describe('should correctly calculate with fractional bases', () => {
        it('0.5 to the power of 2 should be 0.25', () => {
            assert.strictEqual(0.5 ** 2, 0.25);
        });
       // Floating-point representation error causes residual error in the result.
       // To correct this, needs to use an arbitrary floating-point representation: 
       // https://github.com/MikeMcl/decimal.js
        it('0.1 to the power of 2 should be 0.01', () => {
            assert.strictEqual(Math.pow(0.1, 2), 0.01);
        });
       // Floating-point representation error causes residual error in the result.
        it('0.1 to the power of 2 should be 0.04', () => {
            assert.strictEqual(0.2 ** 2, 0.04);
        });
    });

    describe('should correctly handle a negative base with an even exponent', () => {
        it('(-2) to the power of 2 should be 4', () => {
            assert.strictEqual((-2) ** 2, 4);
        });
        it('(-3) to the power of 4 should be 81', () => {
            assert.strictEqual((-3) ** 4, 81);
        });
    });

    describe('should correctly handle a negative base with an odd exponent', () => {
        it('(-2) to the power of 3 should be -8', () => {
            assert.strictEqual((-2) ** 3, -8);
        });
        it('(-3) to the power of 5 should be -243', () => {
            assert.strictEqual((-3) ** 5, -243);
        });
    });

    describe('should return NaN for a negative base with a fractional exponent', () => {
        it('(-4) to the power of 0.5 should be NaN', () => {
            assert.strictEqual((-4) ** 0.5, NaN);
        });
    });

    describe('should return NaN for a base or exponent as String', () => {
        it('("two") to the power of 2 should be NaN', () => {
            assert.strictEqual("two" ** 2, NaN);
        });
        it('2 to the power of ("two") should be NaN', () => {
            assert.strictEqual(2 ** "two", NaN);
        });
    });

    describe('should handle special numeric values like Infinity and NaN', () => {
        it('Infinity to the power of 2 should be Infinity', () => {
            assert.strictEqual(Infinity ** 2, Infinity);
        });
        it('Infinity to the power of -1 should be 0', () => {
            assert.strictEqual(Infinity ** -1, 0);
        });
        it('1 to the power of Infinity should be NaN', () => {
            assert.strictEqual(1 ** Infinity, NaN);
        });
        it('0 to the power of Infinity should be 0', () => {
            assert.strictEqual(0 ** Infinity, 0);
        });
        it('NaN to the power of 2 should be NaN', () => {
            assert.strictEqual(NaN ** 2, NaN);
        });
    });
});