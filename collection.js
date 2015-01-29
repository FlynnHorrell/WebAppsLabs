/*
 * collection.js
 *
 * Contains implementation for a "TaskCollection" "class"
 */

var TaskCollection, Task, proto;

Task = require("./task");

/*
 *       Constructors
 */

function makeNewCollection(arr) {
	collection = Object.create(proto);
	this.defineProperty(collection, "values", {
		values: [],
		writable: false
	}
	if Array.isArray(arr){
		forEach(add);
	}
	Object.preventExtensions(collection);

};


/*
 *       Prototype / Instance methods
 */

proto={
   length: function length(){
   	"use strict";
   	return collection.values.length;
   }
   isEmpty: function isEmpty(){
   	"use strict";
   	return collection.values.isEmpty();
   }
   
}



// DO NOT MODIFY ANYTHING BELOW THIS LINE
TaskCollection = {
   new: makeNewCollection
};

Object.defineProperty(TaskCollection, proto, {
   value: proto,
   writable: false
});

module.exports = Task;
