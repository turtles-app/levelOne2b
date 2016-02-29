var app = angular.module('homepage', []);
var dragData = {
	type: '',
	name: '',
	index: null
};


var dragoverTable = function(ev){
	if(dragData.type === 'operator' || dragData.name === 'setForm') {
		ev.preventDefault();
	}

};



var dragoverUSet = function(ev){
	console.log("dragging over something");
	if(dragData.type === 'set') {
		ev.preventDefault();
	}
};

var dragoverISet = function(ev){
	if(dragData.type ==='set') {
		ev.preventDefault();
	}
};

var dragoverSetForm = function(ev) {
	if(dragData.type === 'element') {
		ev.preventDefault();
	}
};

var dragoverElementFact = function(ev) {
	if(dragData.type === 'element') {
		ev.preventDefault();
	}
};

var dragoverSetFact = function(ev) {
	if(dragData.type === 'set' || dragData.type === 'fact') {
		ev.preventDefault();
	}
};

var dragoverTree = function(ev) {
	if(dragData.type === 'factPocket') {
		ev.preventDefault();
	}
};

var dragoverSetDetails = function(ev) {
	if (dragData.type === 'set') {
		ev.preventDefault();
	}
};

var dragSet = function(ev) {
	dragData.type = 'set';
	dragData.index = ev.target.getAttribute('index');
	dragData.name = '';
};

var dragUnion = function(ev) {
	dragData.type = 'operator';
	dragData.name = 'union';
	dragData.index = null;
};

var dragIntersection = function(ev) {
	dragData.type = 'operator';
	dragData.name = 'intersection';
	dragData.index= null;
};

var dragSetForm = function(ev) {
	dragData.type = 'form';
	dragData.name = 'setForm';
	dragData.index = null;
};

var dragElement = function(ev) {
	var index = ev.target.getAttribute('index');
	dragData.type = 'element';
	dragData.name = null;
	dragData.index = index;
};

var dragFactPocket = function(ev) {
	dragData.type = 'factPocket';
	dragData.name = null;
	dragData.index = null;

};

var dragFact = function(ev) {
	dragData.type = 'fact';
	dragData.index = ev.target.getAttribute('index');
	dragData.name = null;
};


// Checks if this fact is the goal fact
var winCheck = function(fact) {
	console.log(fact.str);
	if (fact.str === 'x is in BnCnA') return true;
}
//Comparison function used to sort a group of sets/elements
var sortGroup = function (a, b) {
	return a.groupIndex - b.groupIndex;
};
 
app.controller('lvl1Controller', function($scope){


	this.sets=[]
	this.elements=[];
	this.operations=[];
	this.table=[];
	this.facts=[];
	this.tree=[];
	this.setName='';
	this.elementsGoingIn = [];
	this.selectedSet;
	this.factSet;
	this.factElement;
	this.factIsIn;
	this.justifications = [];
	this.tabMode = "intersect";

	////////////////////
	// Game Instances //
	////////////////////
	A= new Set('set','A');
	B= new Set('set', 'B');
	C= new Set('set', 'C');
	x = new Element('x', A);
	y = new Element('y', B);
	z = new Element('z', C);
	p = new Element('p', C);
	q = new Element('q', B);
	
	A.groupIndex = 0;
	B.groupIndex = 1;
	C.groupIndex = 2;
	x.groupIndex = 0;
	y.groupIndex = 1;
	z.groupIndex = 2;
	p.groupIndex = 3;
	q.groupIndex = 4;

	C.elements.push(x);
	B.elements.push(x);
	B.elements.push(z);
	C.elements.push(p);
	C.elements.push(q);
	C.elements.push(x);

	this.sets.push(A, B, C);
	this.elements.push(x, y, z, p, q);

	var xInA = new Fact('x', true, 'A'),
	xInB = new Fact('x', true, 'B'),
	yInB = new Fact('y', true, 'B'),
	zInB = new Fact('z', true, 'B'),
	zInC = new Fact('z', true, 'C'),
	pInC = new Fact('p', true, 'C'),
	qInC = new Fact('q', true, 'C'),
	xInC = new Fact('x', true, 'C');
	zInB = new Fact('z', true, 'B');
	qInB = new Fact('q', true, 'B');

	xInA.groupIndex = 0;
	xInB.groupIndex = 1;
	yInB.groupIndex = 2;
	zInC.groupIndex = 3;
	pInC.groupIndex = 4;
	qInC.groupIndex = 5;
	xInC.groupIndex = 6;
	zInB.groupIndex = 7;
	qInB.groupIndex = 8;

	this.facts.push(xInA, xInB, yInB, zInC, pInC, qInC, xInC, zInB, qInB);

	this.selectedSet = A;

	$scope.lvl1.sets.forEach(function(set) {
		set.setKnownElements($scope.lvl1.facts);
	});

    ////////////////////     //Toolbox Methods //     ////////////////////    
	this.unionL = new Set('unionGap','Slot_1');     
	this.unionR = new Set('unionGap', 'Slot_2');
	this.intersectionL = new Set('intersectionGap', 'Slot_1');
	this.intersectionR = new Set('intersectionGap', 'Slot_2');

	this.union1 = this.unionL;
	this.union2 = this.unionR;
	this.intersection1 = this.intersectionL;
	this.intersection2 = this.intersectionR;

	this.modeChange = function(str) {
		this.tabMode = str;
	};
	//Fires when a draggable element is dropped into #left
	//If dropping a set, remove it from the list of sets,
	//  and display it in #left
	this.unionDrop1 = function (ev) {
		var index = dragData.index;
		console.log("index: " + index);
		var set = $scope.lvl1.sets.splice(index, 1)[0];

		union1 = null;
		union1 = set;
		console.log("union1: "+ union1.equivalents[0]);
		//Return the old Set 1, if there is one
		if ($scope.lvl1.union1.isSet) {
			if ($scope.lvl1.union1.equivalents[0] === "Slot_1") {

					 }
				else {
			  		$scope.lvl1.sets.push($scope.lvl1.union1);
				}
			}
		$scope.lvl1.union1 = set;
		$scope.$apply();
		// console.log("Union Set 1: ");
		console.log($scope.lvl1.union1.equivalents[0]);
	};	

	this.intersectionDrop1 = function(ev){
		var index = dragData.index;
		console.log("index: " + index);
		var set = $scope.lvl1.sets.splice(index, 1)[0];
		intersection1 = null;
		intersection1 = set;
		console.log("intersection1: "+ intersection1.equivalents[0]);
		//Return the old Set 1, if there is one
		if ($scope.lvl1.intersection1.isSet) {
			if ($scope.lvl1.intersection1.equivalents[0] === "Slot_1") {

					 }
				else {

			  		$scope.lvl1.sets.push($scope.lvl1.intersection1);
				}
			}
		$scope.lvl1.intersection1 = set;
		$scope.$apply();
		// console.log("Union Set 1: ");
		console.log($scope.lvl1.intersection1.equivalents[0]);	
	};

	//Fires when a draggable element is dropped into #right
	//If dropping a set, remove it from the list of sets,
	//  and display it in #right 
	this.unionDrop2 = function (ev) {
		var index = dragData.index;
		var set = $scope.lvl1.sets.splice(index, 1)[0];
		
		union2 = null;
		union2 = set;
		console.log("union2: ");
		console.log(union2);
		//Return the old Set 2, if there is one
		if ($scope.lvl1.union2.equivalents[0] === "Slot_2") {

		}
		else {
		  		$scope.lvl1.sets.push($scope.lvl1.union2);
			}
		
		$scope.lvl1.union2 = set;
		$scope.$apply();
		// console.log("Union Set 2:");
		console.log($scope.lvl1.union2.equivalents[0]);
	};

	this.intersectionDrop2 = function(ev){
		var index = dragData.index;
		console.log("index: " + index);
		var set = $scope.lvl1.sets.splice(index, 1)[0];
		intersection2 = null;
		intersection2 = set;
		console.log("intersection2: "+ intersection2.equivalents[0]);
		//Return the old Set 1, if there is one
		if ($scope.lvl1.intersection2.isSet) {
			if ($scope.lvl1.intersection2.equivalents[0] === "Slot_2") {
					 }
				else {
			  		$scope.lvl1.sets.push($scope.lvl1.intersection2);
				}
			}
		$scope.lvl1.intersection2 = set;
		$scope.$apply();
		// console.log("Union Set 1: ");
		console.log($scope.lvl1.intersection2.equivalents[0]);	
	};
	
	this.drop = function(ev){
		var index = dragData.index;		
		if(dragData.name === 'intersection'){
			console.log("intersection");

			//Perform the operation iff both set slots are filled
			if (!($scope.lvl1.intersection1.groupName === "intersectionGap" || $scope.lvl1.intersection2.groupName === "intersectionGap")){
				var intersectionRes = intersection($scope.lvl1.intersection1.equivalents[0]+"n"+$scope.lvl1.intersection2.equivalents[0],$scope.lvl1.intersection1, $scope.lvl1.intersection2);

				console.log("IntRes: ");
				console.log(intersectionRes);

				$scope.lvl1.sets.push($scope.lvl1.intersection1);
				$scope.lvl1.sets.push($scope.lvl1.intersection2);
				intersectionRes.groupIndex = $scope.lvl1.sets.length;
				$scope.lvl1.sets.push(intersectionRes);
				$scope.lvl1.intersection1 = $scope.lvl1.intersectionL;
				$scope.lvl1.intersection2 = $scope.lvl1.intersectionR;
			//If one or more slots were empty, reset contents of sets and slots
			} else {
				if ($scope.lvl1.intersection1.groupName != "intersectionGap") {
					$scope.lvl1.sets.push($scope.lvl1.intersection1);
					$scope.lvl1.intersection1 = $scope.lvl1.intersectionL;

				}
				if ($scope.lvl1.intersection2.groupName != "intersectionGap") {
					$scope.lvl1.sets.push($scope.lvl1.intersection2);
					$scope.lvl1.intersection2 = $scope.lvl1.intersectionR;
				}
			}
		}

		else if(dragData.name === 'union'){
			console.log("union");
			//Perform the operation iff both set slots are filled
			if (!($scope.lvl1.union1.groupName === "unionGap" || $scope.lvl1.union2.groupName === "unionGap")) {
				console.log("full slots");
				var unionRes = union($scope.lvl1.union1.equivalents[0]+"U"+$scope.lvl1.union2.equivalents[0], $scope.lvl1.union1, $scope.lvl1.union2);
				console.log("unionRes: " );
				console.log(unionRes);
				$scope.lvl1.sets.push($scope.lvl1.union1);
				$scope.lvl1.sets.push($scope.lvl1.union2);
				unionRes.groupIndex = $scope.lvl1.sets.length;
				$scope.lvl1.sets.push(unionRes);
				$scope.lvl1.union1 = $scope.lvl1.unionL;
				$scope.lvl1.union2 = $scope.lvl1.unionR;

			//If one or more slots were empty, reset contents of sets and slots
			} else {
				if ($scope.lvl1.union1.groupName != "unionGap") {
					$scope.lvl1.sets.push($scope.lvl1.union1);
					$scope.lvl1.union1 = $scope.lvl1.unionL
				}
				if ($scope.lvl1.union2.groupName != "unionGap") {
					$scope.lvl1.sets.push($scope.lvl1.union2);
					$scope.lvl1.union2 = $scope.lvl1.unionR;
				}
			}

		} else if (dragData.name === 'setForm') {
			console.log('setForm');
			var newSet = new Set("set", $scope.lvl1.setName);
			newSet.groupIndex = $scope.lvl1.sets.length;
			newSet.elements = newSet.elements.concat($scope.lvl1.elementsGoingIn);
			$scope.lvl1.elements = $scope.lvl1.elements.concat($scope.lvl1.elementsGoingIn.splice(0, $scope.lvl1.elementsGoingIn.length));

			//Generate correpsonding facts
			newSet.elements.forEach(function(el) {
				var newFact = new Fact(el.name, true, newSet.equivalents[newSet.eqActiveIndex]);
				$scope.lvl1.facts.push(newFact);
			});
			newSet.setKnownElements($scope.lvl1.facts);
			$scope.lvl1.sets.push(newSet);
			console.log(newSet);
		}		
			$scope.lvl1.sets.sort(sortGroup);	
			$scope.lvl1.setName = '';
			$scope.lvl1.elements.sort(sortGroup);
			$scope.$apply();


			
	};

	this.elementDrop = function(ev) {
		var index = dragData.index;
		console.log("Dropping element: " + index);
		$scope.lvl1.elementsGoingIn.push($scope.lvl1.elements.splice(index, 1)[0]);
		$scope.$apply();
	};

	this.dropElementFactIn = function(ev) {
		var type = dragData.type;
		if(type==="element"){
			var index = dragData.index;
			if ($scope.lvl1.factElement) {
				$scope.lvl1.elements.push($scope.lvl1.factElement);
			}		
			$scope.lvl1.factElement = $scope.lvl1.elements.splice(index, 1)[0];
			$scope.lvl1.factIsIn = true;
			$scope.lvl1.elements.sort(sortGroup);
			$scope.$apply();
		}
	};

	this.dropElementFactOut = function(ev) {
		var index = dragData.index;
		if ($scope.lvl1.factElement) {
			$scope.lvl1.elements.push($scope.lvl1.factElement);
		}
		$scope.lvl1.factElement = $scope.lvl1.elements.splice(index, 1)[0];
		$scope.lvl1.factIsIn = false;
		$scope.lvl1.elements.sort(sortGroup);
		$scope.$apply();
	};
	
	this.dropSetFact = function(ev) {
		var index = dragData.index;
		if (dragData.type === 'set') {
			console.log("set dropped in fact");
			if ($scope.lvl1.factSet) {
				$scope.lvl1.sets.push($scope.lvl1.factSet);
			}
			console.log($scope.lvl1.sets);
			$scope.lvl1.factSet = $scope.lvl1.sets.splice(index, 1)[0];
			console.log($scope.lvl1.factSet);
			$scope.lvl1.sets.sort(sortGroup);
			$scope.$apply();
		} else if (dragData.type === 'fact') {
			console.log("justification dropped");
			var fact = $scope.lvl1.facts[index];
			$scope.lvl1.justifications.push($scope.lvl1.facts.splice(index, 1)[0]);
			console.log(index + " : index");
			$scope.$apply();
			var className = $scope.lvl1.justifications.length - 1;

			var modClassName = className%3
			className = "v" + modClassName;		
			console.log(className);
			document.getElementById("fact" + fact.groupIndex).classList.add(className);

		}

	};

	this.dropSetDetails = function(ev) {
		var index = dragData.index;
		$scope.lvl1.selectedSet = $scope.lvl1.sets[index];
		console.log("\nSelecting Set:");
		console.log($scope.lvl1.selectedSet);
	};

	this.newFact = function(ev) {
		console.log("newFact");
		//Assumes all facts are of "isIn" form
		// console.log($scope.lvl1.factSet.equivalents[$scope.lvl1.factSet.equivalents.length - 1]);
		var sound = contains($scope.lvl1.factElement.name, $scope.lvl1.factSet.equivalents[$scope.lvl1.factSet.equivalents.length - 1], $scope.lvl1.justifications);
		console.log(sound);
		if (sound) {
			var proven = new Fact($scope.lvl1.factElement.name, true, $scope.lvl1.factSet.equivalents[0]);
			proven.justifications = proven.justifications.concat($scope.lvl1.justifications);
			$scope.lvl1.facts = $scope.lvl1.facts.concat($scope.lvl1.justifications);
			$scope.lvl1.justifications = [];
			proven.groupIndex = $scope.lvl1.facts.length;
			$scope.lvl1.facts.push(proven);
			$scope.lvl1.facts.sort(sortGroup);

			$scope.lvl1.factSet.setKnownElements($scope.lvl1.facts);

			$scope.lvl1.sets.push($scope.lvl1.factSet);
			$scope.lvl1.elements.push($scope.lvl1.factElement);
			$scope.lvl1.factSet = null;
			$scope.lvl1.factElement = null;
			$scope.lvl1.sets.sort(sortGroup);
			$scope.lvl1.elements.sort(sortGroup);


			var winner = winCheck(proven);
			if (winner) alert("Sweet Victory");

		} //end if(sound) 
		//if argument unsound
		else {
			// Clear out selected element, set, and justifications
			$scope.lvl1.facts = $scope.lvl1.facts.concat($scope.lvl1.justifications);
			$scope.lvl1.facts.sort(sortGroup);
			$scope.lvl1.justifications = [];
			$scope.lvl1.sets.push($scope.lvl1.factSet);
			$scope.lvl1.sets.sort(sortGroup);
			$scope.lvl1.elements.push($scope.lvl1.factElement);
			$scope.lvl1.elements.sort(sortGroup);
			$scope.lvl1.factSet = null;
			$scope.lvl1.factElement = null; 

			alert("You can't justify that assertion with those facts. Try again =)");


		}
		$scope.$apply();
	};


});
///////////////
//CSS METHODS//
///////////////

var clickedClass = function(element,clr){
	// console.log(clr);
	var name = element.id;
	// console.log("name: "+ name);
	var clickedClassName = name + "Clicked";
	var unclickedClassName = name + "UnClicked"
	// console.log( "clickedClassName: " + clickedClassName + "\nunclickedClassName: " + unclickedClassName );
	// console.log(element.classList.contains(unclickedClassName) + "      :::: that was the test");
	if(element.classList.contains(clickedClassName) ){
		if(name==="operations"){

		}
		else{

		// console.log("if");
	// console.log("Element ID: " + element.id + "\nElement class: " +element.classList);
		element.classList.add(unclickedClassName);
		element.classList.remove(clickedClassName);
		}
	}
	else{	
		// console.log("else");
		element.classList.add(clickedClassName);
		element.classList.remove(unclickedClassName);
	}

	console.log("element.classList: " + element.classList);
	
	// console.log("inside clickedClass");
	// console.log(element.class);
};