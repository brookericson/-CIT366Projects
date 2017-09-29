function Set() {
	
	//finds the intersection of two list
	this.intersection = function(listA, listB) {
    
	   var resultList = [];
       
	  if (listA === null || listB === null) { //check for invalid inputs
          return null; // exit and return null to indicate an error
      }

      for (var i = 0; i < listA.length; i++) { // for every element in listA
		  var nextValue = listA[i]; // get next value in the list

		  // for every element in listB
		  for (var j = 0; j < listB.length; j++){
		  	if (listB[j] === nextValue) { // if this listB element equals nextValue
				resultList.push(listB[j]); // add listB element to end of resultList
				break; // break out of (exit) the listB inner loop
			}
		  } // end listB inner loop
	  } // end listA outer loop

	   return resultList;
	};
    
	this.union = function(listA, listB) {

	   var resultList = [];

        if (listA === null || listB === null) { //check for invalid inputs
            return null; // exit and return null to indicate an error
        }

        //get relative compliment of setA and setB
        for (var i = 0; i < listA.length; i++) { // for every element in ListA
            var nextValue = listA[i]; // get next value in the list
            resultList.push(nextValue); // add listA element to end of resultList
        }

        for (var i = 0; i < listB.length; i++) { // for every element in ListB
            var nextValue = listB[i]; // get next value in the list
            resultList.push(nextValue); // add listB element to end of resultList


            for (var j = 0; j < listA.length; j++) { // for every element in listB
                if (listA[j] === nextValue) { // if listA element equals nextValue
                    resultList.pop(nextValue); // remove listB element to end of resultList
                    break; // break out of (exit) the listA inner loop
                } //end listA inner loop
            } // end listA inner loop
        } //end of listB outer loop

        return resultList;
    };



	this.relativeComplement = function(listA, listB) {

        var resultList = [];

        if (listA === null || listB === null) { //check for invalid inputs
            return null; // exit and return null to indicate an error
        }

        for (var i = 0; i < listA.length; i++) { // for every element in ListA
            var nextValue = listA[i]; // get next value in the list
            resultList.push(nextValue); // add listA element to end of resultList

            for (var j = 0; j < listB.length; j++) { // for every element in listB
                if (listB[j] === nextValue) { // if listB element equals nextValue
                    resultList.pop(nextValue); // remove listA element from result List
                    break; // break out of (exit) the listB inner loop
                }
            } // end listB inner loop
        } // end listA outer loop

	   return resultList;
	};


	this.symmetricDifference = function(listA, listB) {

        var resultList = [];

        if (listA === null || listB === null) { //check for invalid inputs
            return null; // exit and return null to indicate an error
        }

        //get relative compliment of setA and setB
        for (var i = 0; i < listA.length; i++) { // for every element in ListA
            var nextValue = listA[i]; // get next value in the list
            resultList.push(nextValue); // add listA element to end of resultList

            for (var j = 0; j < listB.length; j++) { // for every element in listB
                if (listB[j] === nextValue) { // if listB element equals nextValue
                    resultList.pop(nextValue); // remove listA element from result List
                    break; // break out of (exit) the listB inner loop
                }
            } // end listB inner loop
        }

        for (var i = 0; i < listB.length; i++) { // for every element in ListA
            var nextValue = listB[i]; // get next value in the list
            resultList.push(nextValue); // add listB element to end of resultList


            for (var j = 0; j < listA.length; j++) { // for every element in listA
                if (listA[j] === nextValue) { // if listA element equals nextValue
                    resultList.pop(nextValue); // remove listB element from result List
                    break; // break out of (exit) the listB inner loop
                }
            } // end listB inner loop
        }

        return resultList;
    };
}
