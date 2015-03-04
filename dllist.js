/*
 * dllist.js
 *
 * Contains implementation for a double-linked list "class"
 */

var Iterator, DLList, proto;

Iterator = require("./iterator");

/*
 *       Constructors
 */

function makeNewList() {
   var lst, sentinel;

   lst = Object.create(proto);
   sentinel = {
      value: null,
      next: sentinel,
      prev: sentinel
   };
   lst.sentinel = sentinel;
   return lst;
}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here
   isEmpty:  function isEmpty(){
       return (sentinel.next === sentinel && sentinel.prev === sentinel);
   },
   length:  function length(){

   },
   first:  function first(){

   },
   insertAt:  function insertAt(){

   },
   unshift:  function unshift(){

   },
   push:  function push(){

   },
   endAt:  function endAt(){

   },
   remove:  function remove(){

   },
   pop:  function pop(){

   },
   shift:  function shift(){

   },
   isFirst:  function isFirst(){

   },
   isLast:  function isLast(){

   },
   iterator:  function iterator(){

   },
   forEach:  function forEach(){

   },
   toArray:  function toArray(){

   },
   iterateFrom:  function iterateFrom(){

   },
   reverseIterateFrom:  function reverseIterateFrom(){
      
   }

};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
DLList = {
   new: makeNewList
};

Object.defineProperty(DLList, "prototype", {
   value: proto,
   writable: false
});

module.exports = DLList;
