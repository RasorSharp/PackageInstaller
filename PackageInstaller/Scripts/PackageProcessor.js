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
        if (packagesArray == null)
            throw new Error('Cannot process null array!');

        if (packagesArray.length == 0)
            throw new Error('Cannot process an empty array!');

        if (!Array.isArray(packagesArray))
            throw new Error('Provided input is not an array!');

        var processedPackages = PackageProcessor.processPackageArray(packagesArray);
        var L = new Array();
        var S = processedPackages.filter(x => PackageProcessor.hasIncomingEdge(x, processedPackages) == false);
        var n = null;

        while (S.length) {
            n = S.pop();
            L.push(n.packageName);

            var m = processedPackages.filter(x => x.packageName == n.dependency)[0];
            if (m != undefined) {
                n.dependency = '';
                if (!PackageProcessor.hasIncomingEdge(m, processedPackages)) {
                    S.unshift(m);
                }
            }
        }

        for (var i = 0; i < processedPackages.length; i++) {
            if (PackageProcessor.hasIncomingEdge(processedPackages[i], processedPackages))
                throw new Error('Cycle detected!');
        }

        return L.reverse().join(', ');
    },
    hasIncomingEdge: function (node, arrayToSearch) {
        for (var i = 0; i < arrayToSearch.length; i++) {
            if (node.packageName == arrayToSearch[i].dependency)
                return true;
        }
        return false;
    }
};

module.exports = PackageProcessor;