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
   setTitle: function setTitle(s){
      "use strict";
      this.title = s.trim();
   },
   isCompleted: function isCompleted(){
      "use strict";
      return this.completedTime != null;
   },
   toggleCompleted: function toggleCompleted(){
      "use strict";
      if (this.isCompleted()){
            this.completedTime = null;
      }else {
            this.completedTime = new Date();
      }
   },
   hasTag: function hasTag(s){
      "use strict";
      return Object.hasOwnProperty(this.tags);
   },
   addTag: function addTag(s){
      "use strict";
      if (!this.hasTag(s)){
         this.tags.push(s);
      }
   },
   removeTag: function removeTag(s){
      "use strict";
      if (this.hasTag(s)){
         return this.tags.splice(this.tags.indexOf(s), 1);
      }
   },
   toggleTag: function toggleTag(s){
      "use strict";
      if (this.hasTag(s)){
         this.addTag(s);
      }else {
         return this.removeTag(s);
      }
   },
   addTags: function addTags(tags){
      "use strict";
      var i;
      for (i = 0;i < tags.length;i += 1){
         this.addTag(tags[ i ]);
      }
   },
   removeTags: function removeTags(tags){
      "use strict";
      var i;
      for (i = 0;i < tags.length;i += 1){
         this.removeTag(tags[ i ]);
      }
   },
   toggleTags: function toggleTags(tags){
      "use strict";
      var i;
      for (i = 0;i < tags.length;i += 1){
         this.toggleTag(tags[ i ]);
      }
   },
   clone: function clone(){
      "use strict";
      var copy = makeNewTask();
      copy.setTitle(this.title);
      copy.addTags(this.tags);
      copy.completedTime = this.CompletedTime;
      return copy;
   }
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
