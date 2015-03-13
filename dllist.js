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
       return (lst.sentinel.next === lst.sentinel && lst.sentinel.prev === lst.sentinel);
   },
   length:  function length(){
       // uses an accumulator and temp node to get length
       var i = 0; // accs the length
       var temp = lst.sentinel;

       while (temp.next != lst.sentinel){
         i += 1;
         temp = temp.next;
       }
       return i;
   },
   first:  function first(){
      // if the list is not empty, return sentinel's next
      if (lst.isEmpty()){
          throw "Error: empty list";
      }
      return lst.sentinel.next; 
   },
   last:  function last(){
      // works same as first(), but uses prev
      if (lst.isEmpty()){
         throw "Error: empty list";
      }
      return lst.sentinel.prev
   }
   insertAt:  function insertAt(val, node){
       // creates a temp var from the val given
       // inserts the new list item such that the lists structure is maintained
       var temp = {val: val, next: null, prev: null};

       temp.next = node.next;
       temp.prev = node;
       node.next.prev = temp;
       node.next = temp;
       return temp;
   },
   unshift:  function unshift(val){
      // inserts at beginning of list (after sentinel)
       insertAt(val, lst.sentinel);
       return val;
   },
   push:  function push(val){
      // inserts at end of list (before sentinel)
       insertAt(val, lst.sentiel.prev);
       return val;
   },
   endAt:  function endAt(item){
      // finds the item, and ends the list at it
       var temp = lst.sentinel.next;

       while (lst.sentinel.next != item){
         temp = temp.next;
         if (temp === item){
            item.next = lst.sentinel;
            lst.sentinel.prev = item;
         }
       }
       return lst;
   },
   remove:  function remove(item){
       // removes an item from the list and re-arranges it
       var temp = lst.first();
       var temp2 = sentinel.next;

       while (temp.next != item){
         temp = temp.next;
       }
      if (temp.next === item){
          temp.next = item.next;
          item.next.prev = temp;
         }
       }
       return item.val;
   },
   pop:  function pop(){
      // simply call remove on the last element, last() will throw it's own exception
       remove(this.last());
   },
   shift:  function shift(){
       // call remove on the first element, first() will throw it's own exception
       remove(this.first());
   },
   isFirst:  function isFirst(item){
       return (this.first() === item)
   },
   isLast:  function isLast(item){
       return (this.first() === item)
   },
   iterator:  function iterator(){
       var i = this.sentinel;
       var f = function next() { i = i.next; return i;};
       var g = function hasNext() { return i.next !== lst.sentinel;};
       return Iterator.new(f, g);
   },
   forEach:  function forEach(f){
    // applies a function f to each VALUE in the list
    // returns the list
    this.iterator().forEach(f);
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
