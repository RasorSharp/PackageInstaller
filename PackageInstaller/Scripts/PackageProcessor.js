//PackageProcessor.js

var PackageProcessor;

PackageProcessor = {
    parsePackage: function () {
        return { packageName: 'KittenService', dependency: 'CamelCaser' };
    }
};

module.exports = PackageProcessor;