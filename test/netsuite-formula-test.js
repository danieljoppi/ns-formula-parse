'use strict';

var should = require('should'),
    formula = require('..');

var data = {
    'firstname': 'Daniel',
    'middlename': 'Henrique',
    'lastname': 'Joppi'
};
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Formula Parse>', function () {
    describe('validate formula', function () {
        it('resolve concat formula', function (done) {
            let text = '{firstname}||\' \'||{middlename}|| \' \' || {lastname}',
                result = formula.parse(text, data);

            should(result).be.equal('Daniel Henrique Joppi');
            return done();
        });
    });
});
