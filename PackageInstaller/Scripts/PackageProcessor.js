//PackageProcessor.js

var PackageProcessor;

PackageProcessor = {
    parsePackage: function (packageString) {
        var packageArr = packageString.split(':');
        return { packageName: packageArr[0].trim(), dependency: packageArr[1].trim() };
    }
};

module.exports = PackageProcessor;