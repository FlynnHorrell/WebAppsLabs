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

function help(a){
	"use strict";
   return this.values.indexOf(a);
}


function makeNewCollection(arr){
	"use strict";
	var collection = Object.create(proto);
	this.defineProperty(collection, "values", {
		value: [],
		writable: false
	});
	if (Array.isArray(arr)){
		values.forEach(add());
	}
	Object.preventExtensions(collection);

}


/*
 *       Prototype / Instance methods
 */

proto = {
   length: function length(){
   "use strict";
   return this.values.length;
   },
   isEmpty: function isEmpty(){
   "use strict";
   return this.values.isEmpty();
   },
/*   get: function get(arg){
   "use strict";
   if (typeof arg === "function"){
   return arg(this.values);
   }else if (typeof arg === "number"){
   return this.values[ help(arg) ]
   }
    }*/
  /*
  has: function has(arg){
  "use strict";
  return help(arg) !== -1;
   },
   */
  add: function add(task){              //  adds multiple tasks from an array
     "use strict";
  tasks.forEach(addOneTask);
  return this;
  },
  new: function newTask(){
  "use strict";
  var task = Task.new();
  this.add(task);
  return task;
  },
  remove: function remove(arg){
  "use strict";
  if (Array.isArray(arg)){
    for (var i = 0;i < arg.length-1;i+=1){
        this.values.splice(help(arg), 1);
    }
    return this;
  }
  },
  filter: function filter(arg){
  },
  forEach: function forEach(f){   //f is a function
  values.forEach(f);
  return this;
  },
  function addOneTask(task){
  "use strict";
   if (!has(task)){
   this.values.push(task);
   }
  }

};




// DO NOT MODIFY ANYTHING BELOW THIS LINE
TaskCollection = {
   new: makeNewCollection
};

Object.defineProperty(TaskCollection, proto, {
   value: proto,
   writable: false
});

module.exports = Task;
