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
	var arg;

	if (typeof a === "number"){
		return function(task){
            return task.id === a;
		};
  }else if(typeof a === "string"){
    return function(task){
            return task.title === a;
    };
  }else if(a instanceof RegExp){
    return function(task){
            return task.title.match(a);
    }
  }
  return a;	
}
/*	}else if (typeof a === "string"){
		return function(task){
			if (this.values[ n ].title === a){
				return this.values[ n ];
			}
		}
	}
	return function(task){
	if (this.values[ n ].title.match(a)){
		return this.values[ n ];
	    }
    }
	}*/

/*
 *       Prototype / Instance methods
 */
 function addOneTask(task, that){
  "use strict";
  console.log("addOneTask called");
   if (!that.has(task.id)){
   that.values.push(task);
   }
  }

/* function help(a, that){
  "use strict";
   var i, id;
   id = -1;
   console.log("inside help", that);
   console.log("inside help", typeof a)
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
    console.log(a);
    console.log(that);
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
   console.log("inside help", id);
   return id;
}*/

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
	   
	   arg = turnArgIntoFunc(arg);

	   for(var i = 0; i < this.length(); i += 1){
	       if (arg(this.values[ i ])){
	           return this.values[ i ];
	       }
	   }
	   return null;
   },

  has: function has(arg){
  "use strict";
 /* var i;
  for(i = 0;i<this.values.length;i+=1){
    if(arg === this.values[i]){
      return true;
    }
   }
   return false;*/
   //return help(arg,this) !== -1;
   console.log("arg is", arg);
    var i;
    for(i = 0; i < this.length(); i += 1){
      if(turnArgIntoFunc(arg)(this.values[i])){
        console.log("has is", true);
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
    if(Array.isArray(task)){
      console.log("it is an array");
      for (i = 0; i < task.length; i += 1){
        console.log(task[i]);
          addOneTask(task[i],this);
     }
    }else{
      addOneTask(task,this);
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
  //console.log(arg);
  if (Array.isArray(arg)){
    for (i = 0; i < arg.length; i += 1){
      for(j = 0; j< this.length(); j+=1){
        if(turnArgIntoFunc(arg)){
           this.values.splice(j, 1);
        }
      }    
    }
  }else{
    for(j = 0; j< this.length(); j+=1){
        if(turnArgIntoFunc(arg)){
           this.values.splice(j, 1);
        }
     }
  }
  return this;
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
