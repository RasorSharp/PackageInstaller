//PackageProcessor.js

var PackageProcessor;

PackageProcessor = {
    parsePackage: function (packageString) {
        if (!packageString)
            throw new Error('Cannot process input.  Input is not in a defined state.');

        var packageArr = packageString.split(':');

        if (packageArr.length <= 1)
            throw new Error('Package input not in expected format!');

        return { packageName: packageArr[0].trim(), dependency: packageArr[1].trim() };
    },
    processPackageArray: function (packagesArray) {
        if (!packagesArray)
            throw new Error('Cannot process input.  Input is not in a defined state.');

        if (!Array.isArray(packagesArray))
            throw new Error('Provided input is not an array!');

        if (packagesArray.length === 0)
            throw new Error('Provided input contains 0 packages!');

        var parsedPackages = packagesArray.map(function (x) {
            return PackageProcessor.parsePackage(x);
        });

        return parsedPackages;
    },
    getDependencyOrder: function (packagesArray) {
        if (!packagesArray)
            throw new Error('Cannot process input.  Input is not in a defined state.');

        if (packagesArray.length === 0)
            throw new Error('Cannot process an empty array!');

        if (!Array.isArray(packagesArray))
            throw new Error('Provided input is not an array!');

        var processedPackages = PackageProcessor.processPackageArray(packagesArray);

        //used the explanation of Kahn's algorithm from https://en.wikipedia.org/wiki/Topological_sorting as a basis for my solution
        var L = new Array();  //empty array that will contain the correct order for package installation
        var S = processedPackages.filter(x => PackageProcessor.hasIncomingEdge(x, processedPackages) === false); //array that will contain all packages that have no incoming edge (leafs)
        var n = null;
        var x = new Array(); //array that will contains packages that have no dependencies.  These will be added after the packages that do have dependencies are correctly ordered.
        while (S.length) {
            n = S.pop(); //remove the last package from S

            var m = processedPackages.filter(x => x.packageName === n.dependency)[0];  //find the package that the current node (n) depends on.
            if (m) {  //this will only be undefined if the current node has no dependencies
                L.push(n.packageName); //add the package name to the order
                n.dependency = '';  //remove the edge reference
                if (!PackageProcessor.hasIncomingEdge(m, processedPackages)) { //if m no longer has incoming edges, add it to the first position in S
                    S.unshift(m);
                }
            }
            else
                x.unshift(n.packageName); //add the package's name to the array of packages that have no dependencies
        }
        L = L.concat(x);  //add the names of packages that had no dependencies to L

        //At this point, if the graph was acyclical, all packages should no longer have incoming edges.  If there are any packages with remaining dependencies, we encountered a cycle, and need to reject.
        for (var i = 0; i < processedPackages.length; i++) {
            if (PackageProcessor.hasIncomingEdge(processedPackages[i], processedPackages))
                throw new Error('Cycle detected!');
        }

        return L.reverse().join(', '); //put the array in correct order and seperate elements by a comma.
    },
    hasIncomingEdge: function (node, arrayToSearch) {
        for (var i = 0; i < arrayToSearch.length; i++) {
            if (node.packageName === arrayToSearch[i].dependency)
                return true;
        }
        return false;
    }
};

module.exports = PackageProcessor;