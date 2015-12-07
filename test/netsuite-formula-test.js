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

        it('resolve join field', function (done) {
            let text = '{legal.firstname}||\' \'||{legal.middlename}|| \' \' || {legal.lastname}',
                person = {
                    'legal.firstname': data.firstname,
                    'legal.middlename': data.middlename,
                    'legal.lastname': data.lastname
                },
                result = formula.parse(text, person);

            should(result).be.equal('Daniel Henrique Joppi');
            return done();
        });

        it('resolve conditional formula', function (done) {
            let text = 'case{isperson}  when "T" then({firstname}||" "||{middlename}||" "|| {lastname})else({custentity_sp_razaosocial_ds}) end',
                person = JSON.parse(JSON.stringify(data));

            person.isperson = 'T';
            let result1 = formula.parse(text, person);

            should(result1).be.equal('Daniel Henrique Joppi');

            person.isperson = 'F';
            person.custentity_sp_razaosocial_ds = 'bacanaa veioo!!';
            let result2 = formula.parse(text, person);
            should(result2).be.equal('bacanaa veioo!!');
            return done();
        });
    });
});
