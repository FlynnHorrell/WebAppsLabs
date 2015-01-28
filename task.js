/*
 * task.js
 *
 * Contains implementation for a "task" "class"
 */

var Task, proto, count;
count = counter();
// Helper method. You should not need to change it.
// Use it in makeTaskFromString
function processString(s) {
   "use strict";
   var tags, title;

   tags = [];
   title = s.replace(/\s*#([a-zA-Z]+)/g, function(m, tag) {
      tags.push(tag);
      return "";
   });

   return { title: title, tags: tags };
}

function counter() {
   "use strict";
   var c = 0;
   return function count() {
      c += 1;
      return c;
   };
}

/*
 *       Constructors
 */

function makeNewTask() {
    "use strict";
   var o = Object.create(null);
      o.title = "";
      o.completedTime = null;
      Object.defineProperty(o, "id", {
          value: count(),
          enumerable: true,
          configurable: false,
          writable: false
      });
      Object.defineProperty(o, "tags", {
          value: [],
          enumerable: false,
          configurable: false,
          writable: false
      });
   Object.preventExtensions(o);
   return o;
}

function makeTaskFromObject(o){
    "use strict";
}


function makeTaskFromString(str){
    "use strict";
    return processString(str);
}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here
};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
Task = {
   new: makeNewTask,
   fromObject: makeTaskFromObject,
   fromString: makeTaskFromString
};

Object.defineProperty(Task, proto, {
   value: proto,
   writable: false
});

module.exports = Task;
