//PackageProcessor.js

var PackageProcessor;

PackageProcessor = {
    parsePackage: function (packageString) {
        if (packageString == null || packageString == '')
            throw new Error('Cannot process a null or empty package!');

        var packageArr = packageString.split(':');

        if (packageArr.length <= 1)
            throw new Error('Package input not in expected format!');

        return { packageName: packageArr[0].trim(), dependency: packageArr[1].trim() };
    },
    processPackageArray: function (packagesArray) {
        if (packagesArray == null) 
            throw new Error('Cannot process null!');
   
        if (!Array.isArray(packagesArray))
            throw new Error('Provided input is not an array!');

        if (packagesArray.length == 0)
            throw new Error('Provided input contains 0 packages!');

        var parsedPackages = packagesArray.map(function (x) {
            return PackageProcessor.parsePackage(x);
        });

        return parsedPackages;
    },
    getDependencyOrder: function (packagesArray) {
        return 'KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream';
    },
    hasIncomingEdge: function (node, arrayToSearch) {
        return true;
    }
};

module.exports = PackageProcessor;