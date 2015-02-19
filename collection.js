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
    proto.add.call(collection, arr);
	}
	Object.preventExtensions(collection);
  return collection;
}

function turnArgIntoFunc(a){
	"use strict";

	if (typeof a === "number"){
		return function(task){
            return task.id === a;
		};
  }else if (typeof a === "string"){
    return function(task){
            return task.title === a;
    };
  }else if (a instanceof RegExp){
    return function(task){
            return task.title.match(a);
    };
  }
  return a;
}

 function addOneTask(task, that){
  "use strict";
   if (!that.has(task.id)){
   that.values.push(task);
   }
}

function printTask(task){
  "use strict";
  var taskString, mon, day, i;

  taskString = "" + task.title;
  if (task.isCompleted()){
    taskString += " " + task.completedTime.getFullYear();
    mon = (task.completedTime.getMonth() + 1).toString();
    day = task.completedTime.getDate().toString();
   taskString += "/" + (mon[ 1 ] ? mon : "0" + mon[ 0 ]) + "/" + (day[ 1 ] ? day : "0" + day[ 0 ]);
  }

  for (i = 0; i < task.tags.length; i += 1){
    taskString += " #" + task.tags[ i ];
  }


  taskString += "\n";
  return taskString;
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
     var i;
	 arg = turnArgIntoFunc(arg);

	   for (i = 0; i < this.length(); i += 1){
	       if (arg(this.values[ i ])){
	           return this.values[ i ];
	       }
	   }
	   return null;
   },

  has: function has(arg){
  "use strict";
    var i;
    for (i = 0; i < this.length(); i += 1){
      if (turnArgIntoFunc(arg)(this.values[ i ])){
        return true;
      }
    }
    return false;
  },

  add: function add(task){              //  adds multiple tasks from an array
     "use strict";
     var i;

    if (Array.isArray(task)){
      for (i = 0; i < task.length; i += 1){
          addOneTask(task[ i ], this);
     }
    }else {
      addOneTask(task, this);
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
  var i, j;

  if (Array.isArray(arg)){
    for (i = 0; i < arg.length; i += 1){
      for (j = 0; j < this.length(); j += 1){
        if (turnArgIntoFunc(arg[ i ])(this.values[ j ])){
           this.values.splice(j, 1);
        }
      }
    }
  }
  for (j = 0; j < this.length(); j += 1){
      if (turnArgIntoFunc(arg)){
        this.values.splice(j, 1);
      }
   }
  return this;
  },
  filter: function filter(arg){
    "use strict";
    var i, j, collection;
    collection = makeNewCollection();

    if (Array.isArray(arg)){
      for (i = 0; i < arg.length; i += 1){
       for (j = 0; j < this.length(); j += 1){
         if (turnArgIntoFunc(arg[ i ])(this.values[ j ])){
          collection.add(this.values[ j ]);
          }
       }
      }
    }else {
      for (i = 0; i < this.length(); i += 1){
        if (turnArgIntoFunc(arg)(this.values[ i ])){
          collection.add(this.values[ i ]);
        }
      }
    }

    return collection;
  },
  forEach: function forEach(f){   // f is a function
    "use strict";
    this.values.forEach(f);
  return this;
  },
  groupByTag: function groupByTag(){
    "use strict";
    var tagGroup, newKeys, i, j;
    tagGroup = Object.create(Object);
    for (i = 0; i < this.length(); i += 1){
      newKeys = this.values[ i ].tags;
      for (j = 0; j < newKeys.length; j += 1){
        if (tagGroup[ newKeys[ j ] ] != null){
          tagGroup[ newKeys[ j ] ].add(this.values[ i ]);
        }else {
        tagGroup[ newKeys[ j ] ] = TaskCollection.new();
        tagGroup[ newKeys[ j ] ].add(this.values[ i ]);
        }
      }
    }
    return tagGroup;
  },
  print: function print(){
    "use strict";
    var i, printStr;
    printStr = "";

    for (i = 0; i < this.length(); i += 1){
      printStr += printTask(this.values[ i ]);
    }

    return printStr;
  },
  concat: function concat(){
    "use strict";
    var i;

    for (i = 0; i < arguments.length; i += 1){
      this.add(arguments[ i ].values);
    }
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
