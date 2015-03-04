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
       // uses an accumulator and temp node to get length
       var i = 0; // accs the length
       var temp = sentinel;

       while (temp.next != sentinel){
         i += 1;
         temp = temp.next;
       }
       return i;
   },
   first:  function first(){
      // if the list is not empty, return sentinel's next
      if (isEmpty()){
          throw "Error: empty list";
      }
      return sentinel.next; 
   },
   last:  function last(){
      // works same as first(), but uses prev
      if (isEmpty()){
         throw "Error: empty list";
      }
      return sentinel.prev
   }
   insertAt:  function insertAt(val, prev){
      /*
        creates 2 temp vars, the val to be inserted and the one it will be inserted after
        re-arranges the nexts and prevs so that the pointers are correct, and old ones are overwritten
      */
       var temp = val;
       var temp2 = prev;

       temp.next = temp2.next;
       temp.prev = temp2;
       temp2.next.prev = temp;
       temp2.next = temp;
       return temp;
   },
   unshift:  function unshift(val){
      // inserts at beginning of list (after sentinel)
       insertAt(val, sentinel);
       return val;
   },
   push:  function push(val){
      // inserts at end of list (before sentinel)
       insertAt(val, sentiel.prev);
       return val;
   },
   endAt:  function endAt(item){
      // finds the item, and ends the list at it
       var temp = sentinel.next;

       while (sentinel.next != item){
         temp = temp.next;
         if (temp === item){
            item.next = sentinel;
            sentinel.prev = item;
         }
       }
       return this;
   },
   remove:  function remove(item){
       // removes an item from the list and re-arranges it
       var temp = item;
       var temp2 = sentinel.next;

       while (temp2.next != temp){
         temp2 = temp2.next;
         if (temp2 === temp){
             temp2.next = temp.next;
             temp.next.prev = temp2;
         }
       }
       return item.val;
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
