//PackageProcessor-spec.js

var expect = require('chai').expect;
var PackageProcessor = require('../Scripts/PackageProcessor.js');

describe('parsePackage', function () {
    it('Takes a properly formatted string and returns an object with package name and dependency', function () {
        var input = "KittenService: CamelCaser";
        var expectedOutput = { packageName: 'KittenService', dependency: 'CamelCaser' };
        var actual = PackageProcessor.parsePackage(input);

        expect(actual).to.eql(expectedOutput);
    });
});