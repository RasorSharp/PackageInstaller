//PackageProcessor-spec.js

var expect = require('chai').expect;
var PackageProcessor = require('../Scripts/PackageProcessor.js');

describe('parsePackage', function () {
    it('Takes a properly formatted string and returns an object with package name and dependency.  Invalid inputs cause error.', function () {
        var input = 'KittenService: CamelCaser';
        var expectedOutput = { packageName: 'KittenService', dependency: 'CamelCaser' };
        var actual = PackageProcessor.parsePackage(input);

        expect(actual).to.eql(expectedOutput);

        input = 'Camel Caser: ';
        expectedOutput = { packageName: 'Camel Caser', dependency: '' };
        actual = PackageProcessor.parsePackage(input);

        expect(actual).to.eql(expectedOutput);

        //tests for unexpected inputs
        input = 'KittenService CamelCaser';
        expect(PackageProcessor.parsePackage(input)).to.throw(Error);

        input = 'KittenService';
        expect(PackageProcessor.parsePackage(input)).to.throw(Error);

        input = '';
        expect(PackageProcessor.parsePackage(input)).to.throw(Error);

        input = null;
        expect(PackageProcessor.parsePackage(input)).to.throw(Error);
        //end unexepected inputs

    });
});