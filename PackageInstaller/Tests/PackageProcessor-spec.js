//PackageProcessor-spec.js

'use strict';
var expect = require('chai').expect;

describe('PackageProcessor', function () {
    it('Should Exist', function () {
        var PackageProcessor = require('../Scripts/PackageProcessor.js');
        expect(PackageProcessor).to.not.be.undefined;
    });
});