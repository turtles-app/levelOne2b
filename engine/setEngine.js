

var Set = function (groupName, name, firstEquivalence) {
	// All sets exist within named array within the universe object 
	// (which is instantiated on the front end)
	this.groupName = groupName;

	//List of syntax (array) representations of the set
	this.equivalents = [name]; 
	this.elements = [];
	//List of all elements user has proven/been given to be in the set
	this.knownElements = [];
	
	// If the set is the product of an operation between other sets
	if (firstEquivalence) {
		//Add that operation's syntax (array) representation to the set's equivalents
		this.equivalents.push(firstEquivalence);
	}
	this.eqActiveIndex = 0;

	this.isSet = true;

};


//Puts an element in a Set's elements attribute
Set.prototype.putIn = function(element) {
	element.routes.push(new setRoute(this));
	this.elements.push(element);
}

//Assign all elements known to be in the set from a given list of facts
Set.prototype.setKnownElements = function(facts) {
	var that = this;
	var known = []; //temp list of known elements
	this.elements.forEach(function(element) {
		var elIsKnown = false;
		facts.forEach(function(fact) {
			if (fact.elementName === element.name){
				that.equivalents.forEach(function(eq) {
					if (fact.isIn && _.isEqual(eq, fact.setSyntax)) elIsKnown = true;
				});
			}
		});
		if (elIsKnown) known.push(element);
	});
	this.knownElements = known;
	console.log(this.knownElements);
}

//  Abstract class that relates an element to a set
//  that contains it
var setRoute = function (set) {
	this.groupName 		= set.groupName;
	this.setName		= set.equivalents[0];
	this.elementIndex 	= set.elements.length; //Index of particular element for which this eSet exists within set/eSet
}



//  Element objects are placed in the elements (array) attribute
//	of varius sets. Each element must be in at least one set.
//	
//	the routes (array) attrubute is a list of
//  representations of relationships to the sets
//	in which the Element resides.
var Element = function (name, set) {
	this.name = name;
	this.groupIndex;
	var firstRoute = new setRoute(set);
	this.routes = [];
	this.routes.push(firstRoute);
	set.elements.push(this);

	this.isSet=false;
};

//	Fact object represents a fact of the form
//		"x is contained in A, because [fact1, fact2, ...fact_n]", OR
//		"x is NOT contained in A, because [fact1, fact2, ...fact_n]"
var Fact = function (elementName, isIn, setSyntax) {
	this.subject = "containment"; //These objects are facts about containment, not inclusion, or equality
	this.simple = typeof(setSyntax) === 'string'; //boolean -- true if setSyntax is a string, false if it's a syntax
	this.elementName = elementName;
	this.isIn = isIn; //true if x is in A, false if x is NOT in A
	this.setSyntax = setSyntax; //Syntax of the referenced set
	this.justifications = []; //array of facts submited by user to justify this fact
	this.usedJustifications = []; //subset of justifications actually necessary for justification
	var tmpStr = ' is in ';
	if (!isIn) tmpStr = ' is not in ';
	this.str = elementName + tmpStr + setSyntax.toString();
	this.groupIndex;
};


