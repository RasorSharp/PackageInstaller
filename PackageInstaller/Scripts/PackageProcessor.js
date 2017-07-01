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

        //used the explanation of Kahn's algorithm from https://en.wikipedia.org/wiki/Topological_sorting as a basis for my solution
        var L = new Array();  //empty array that will contain the correct order for package installation
        var S = processedPackages.filter(x => PackageProcessor.hasIncomingEdge(x, processedPackages) == false); //array that will contain all packages that have no incoming edge (leafs)
        var n = null;

        while (S.length) {
            n = S.pop(); //remove the last package from S
            L.push(n.packageName); //add the package's name to the correct order.

            var m = processedPackages.filter(x => x.packageName == n.dependency)[0];  //find the package that the current node (n) depends on.
            if (m != undefined) {  //this will only be undefined if the current node has no dependencies
                n.dependency = '';  //remove the edge reference
                if (!PackageProcessor.hasIncomingEdge(m, processedPackages)) { //if m no longer has incoming edges, add it to the first position in S
                    S.unshift(m);
                }
            }
        }

        //At this point, if the graph was acyclical, all packages should no longer have incoming edges.  If there are any packages with remaining dependencies, we encountered a cycle, and need to reject.
        for (var i = 0; i < processedPackages.length; i++) {
            if (PackageProcessor.hasIncomingEdge(processedPackages[i], processedPackages))
                throw new Error('Cycle detected!');
        }

        return L.reverse().join(', '); //put the array in correct order and seperate elements by a comma.
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