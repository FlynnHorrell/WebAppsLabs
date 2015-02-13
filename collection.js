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
    proto.add.call(collection,arr);
	}
	Object.preventExtensions(collection);
  return collection;
}


/*
 *       Prototype / Instance methods
 */
 function addOneTask(task, that){
  "use strict";
   if (!that.has(task)){
   that.values.push(task);
   }
  }

 function help(a, that){
  "use strict";
   var i, id;
   id = -1;
   if (typeof a === "function"){
     for (i = 0; i < that.values.length; i += 1){
       if (a(that.values[ i ])){
        id = i;
        break;
       }
     }
   }else if (typeof a === "number"){
     for (i = 0; i < that.values.length; i += 1){
       if (a === that.values[ i ].id){
         id = i;
         break;
       }
      }
   }else if (typeof a === "string"){
     for (i = 0; i < that.values.length; i += 1){
       if (a === that.values[ i ].title){
         id = i;
         break;
       }
      }
   }else {
     for (i = 0; i < that.values.length; i += 1){
       if (that.values[ i ].title.match(a)){
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
   return this.values.length === 0;
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
  var i;
  for(i = 0;i<this.values.length;i+=1){
    if(arg === this.values[i]){
      return true;
    }
   }
   return false;
  },
  add: function add(task){              //  adds multiple tasks from an array
     "use strict";
     var i;
   //  console.log("Function: add:  this")
    // console.log(this);
  //task.forEach(addOneTask());
    for (i = 0; i < task.length; i += 1){
        addOneTask(task[i],this);
    }
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
  console.log(arg);
  if (Array.isArray(arg)){
    for (i = 0; i < arg.length; i += 1){
        this.values.splice(help(arg,this), 1);
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

module.exports = TaskCollection;
