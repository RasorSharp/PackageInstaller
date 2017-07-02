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

        invalidInput = undefined;
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

        invalidInput = undefined;
        expect(badFn).to.throw();

        //end invalid inputs
    });
});

describe('getDepedencyOrder', function () {
    it('Takes an array of strings representing packages and dependencies and determines what order they should be installed.', function () {
        var input = ['KittenService: CamelCaser', 'CamelCaser: '];
        var expectedOutput = 'CamelCaser, KittenService';

        input = ['KittenService: ',
            'Leetmeme: Cyberportal',
            'Cyberportal: Ice',
            'CamelCaser: KittenService',
            'Fraudstream: Leetmeme',
            'Ice: '
        ];
        var expectedOutput = 'KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream';
        var actual = PackageProcessor.getDependencyOrder(input);

        expect(actual).to.equal(expectedOutput);

        input = ['1: ', '2: ', '3: 1', '4: 2'];
        expectedOutput = '2, 1, 3, 4';
        actual = PackageProcessor.getDependencyOrder(input);
        expect(actual).to.equal(expectedOutput);

        input = ['1: ']
        expectedOutput = '1';
        actual = PackageProcessor.getDependencyOrder(input);
        expect(actual).to.equal(expectedOutput);

        //tests for invalid inputs

        var invalidInput = null;
        var badFn = function () {
            PackageProcessor.getDependencyOrder(invalidInput);
        }
        expect(badFn).to.throw();

        invalidInput = new Array();
        expect(badFn).to.throw();

        invalidInput = 'Leetmeme: Cyberportal';
        expect(badFn).to.throw();

        invalidInput = [
            'KittenService: ',
            'Leetmeme: Cyberportal',
            'Cyberportal: Ice',
            'CamelCaser: KittenService',
            'Fraudstream: ',
            'Ice: Leetmeme'
        ]
        expect(badFn).to.throw();

        invalidInput = undefined;
        expect(badFn).to.throw();

        //end invalid inputs
    });
});

describe('hasIncomingEdge', function () {
    it('For an array of dependency objects, checks to see if a given node has any incoming edges', function () {
        var node = { packageName: 'CamelCaser', dependency: '' };
        var input = [{ packageName: 'KittenService', dependency: 'CamelCaser' }, { packageName: 'CamelCaser', dependency: '' }]
        var expectedOutput = true;
        var actual = PackageProcessor.hasIncomingEdge(node, input);
        expect(actual).to.equal(expectedOutput);

        node = { packageName: 'KittenService', dependency: 'CamelCaser' };
        expectedOutput = false;
        actual = PackageProcessor.hasIncomingEdge(node, input);
        expect(actual).to.equal(expectedOutput);
    });
});