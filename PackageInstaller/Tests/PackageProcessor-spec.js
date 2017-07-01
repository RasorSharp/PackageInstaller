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

        //tests for invalid inputs
        var invalidInput;
        var badFn = function () {
            PackageProcessor.parsePackage(invalidInput);
        }
        expect(badFn).to.throw();

        invalidInput = 'KittenService CamelCaser'
        expect(badFn).to.throw();

        invalidInput = 'KittenService';
        expect(badFn).to.throw();

        invalidInput = '';
        expect(badFn).to.throw();

        invalidInput = null;
        expect(badFn).to.throw();

        //end invalid inputs
    });
});

describe('processPackageArray', function () {
    it('Takes an array of strings and runs them through the parsePackage function to validate packages are in correct format', function () {
        var input = ['KittenService: ',
            'Leetmeme: Cyberportal',
            'Cyberportal: Ice',
            'CamelCaser: KittenService',
            'Fraudstream: Leetmeme',
            'Ice: '
        ];
        var expectedOutput = [
            { packageName: 'KittenService', dependency: '' },
            { packageName: 'Leetmeme', dependency: 'Cyberportal' },
            { packageName: 'Cyberportal', dependency: 'Ice' },
            { packageName: 'CamelCaser', dependency: 'KittenService' },
            { packageName: 'Fraudstream', dependency: 'Leetmeme' },
            { packageName: 'Ice', dependency: '' }
        ];
        var actual = PackageProcessor.processPackageArray(input);

        expect(actual).to.eql(expectedOutput);

        //tests for invalid inputs

        var invalidInput = null;
        var badFn = function () {
            PackageProcessor.processPackageArray(invalidInput);
        }
        expect(badFn).to.throw();

        invalidInput = new Array();
        expect(badFn).to.throw();

        invalidInput = 'Leetmeme: Cyberportal';
        expect(badFn).to.throw();

        //end invalid inputs
    });
});

describe('getDepedencyOrder', function () {
    it('Takes an array of strings representing packages and dependencies and determines what order they should be installed.', function () {
        var input = ['KittenService: ',
            'Leetmeme: Cyberportal',
            'Cyberportal: Ice',
            'CamelCaser: KittenService',
            'Fraudstream: Leetmeme',
            'Ice: '
        ];
        var expectedOutput = 'KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream';
        var actual = PackageProcessor.getDependencyOrder(input);

        expect(actual).to.equal(expectedOutput);
    });
});