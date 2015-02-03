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

function makeNewCollection(arr){
	"use strict";
	var collection = Object.create(proto);
	Object.defineProperty(collection, "values", {
		value: [],
		writable: false
	});
	if (Array.isArray(arr)){
		this.values.forEach(this.add());
	}
	Object.preventExtensions(collection);
}


/*
 *       Prototype / Instance methods
 */
 function addOneTask(task){
  "use strict";
   if (!this.has(task)){
   this.values.push(task);
   }
  }

 function help(a){
  "use strict";
   var i, id;
   id = -1;
   if (typeof a === "function"){
     for (i = 0; i < this.values.length; i += 1){
       if (a(this.values[ i ])){
        id = i;
        break;
       }
     }
   }else if (typeof a === "number"){
     for (i = 0; i < this.values.length; i += 1){
       if (a === this.values[ i ].id){
         id = i;
         break;
       }
      }
   }else if (typeof a === "string"){
     for (i = 0; i < this.values.length; i += 1){
       if (a === this.values[ i ].title){
         id = i;
         break;
       }
      }
   }else {
     for (i = 0; i < this.values.length; i += 1){
       if (this.values[ i ].title.match(a)){
        id = i;
        break;
        }
     }
   }
   return id;
}

proto = {
   length: function length(){
   "use strict";
   return this.values.length;
   },
   isEmpty: function isEmpty(){
   "use strict";
   return this.values.isEmpty();
   },
   get: function get(arg){
   "use strict";
   var a = help(arg);
      if (a !== -1){
        return this.values[ a ];
      }
      return null;
    },
  has: function has(arg){
  "use strict";
  return help(arg) !== -1;
   },
  add: function add(task){              //  adds multiple tasks from an array
     "use strict";
  task.forEach(addOneTask);
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
  var i;
  if (Array.isArray(arg)){
    for (i = 0; i < arg.length; i += 1){
        this.values.splice(help(arg), 1);
    }
    return this;
  }
  },
  filter: function filter(arg){
    "use strict";
  },
  forEach: function forEach(f){   // f is a function
    "use strict";
    this.values.forEach(f);
  return this;
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
