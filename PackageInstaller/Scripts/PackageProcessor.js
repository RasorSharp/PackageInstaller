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
        return [
            { packageName: 'KittenService', dependency: '' },
            { packageName: 'Leetmeme', dependency: 'Cyberportal' },
            { packageName: 'Cyberportal', dependency: 'Ice' },
            { packageName: 'CamelCaser', dependency: 'KittenService' },
            { packageName: 'Fraudstream', dependency: 'Leetmeme' },
            { packageName: 'Ice', dependency: '' }
        ];
    }
};

module.exports = PackageProcessor;