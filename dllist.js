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
   this.sentinel = sentinel;
   return lst;
}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here
   isEmpty: function isEmpty(){
       return this.sentinel.next === this.sentinel && this.sentinel.prev === this.sentinel;
   },
   length: function length(){
       // uses an accumulator and temp node to get length
       var i = 0, temp = this.sentinel; // accs the length
       while (temp.next !== this.sentinel){
         i += 1;
         temp = temp.next;
       }
       return i;
   },
   first: function first(){
      // if the list is not empty, return sentinel's next
      if (this.isEmpty()){
          throw "Error: empty list";
      }
      return this.sentinel.next;
   },
   last: function last(){
      // works same as first(), but uses prev
      if (this.isEmpty()){
         throw "Error: empty list";
      }
      return this.sentinel.prev;
   },
   insertAt: function insertAt(val, node){
       // creates a temp var from the val given
       // inserts the new list item such that the lists structure is maintained
       var temp = { val: val, next: null, prev: null };

       temp.next = node.next;
       temp.prev = node;
       node.next.prev = temp;
       node.next = temp;
       return temp;
   },
   unshift: function unshift(val){
      // inserts at beginning of list (after sentinel)
       this.insertAt(val, this.sentinel);
       return val;
   },
   push: function push(val){
      // inserts at end of list (before sentinel)
       this.insertAt(val, this.sentiel.prev);
       return val;
   },
   endAt: function endAt(item){
      // finds the item, and ends the list at it
       var temp = this.sentinel.next;

       while (this.sentinel.next !== item){
         temp = temp.next;
         if (temp === item){
            item.next = this.sentinel;
            this.sentinel.prev = item;
         }
       }
       return this;
   },
   remove: function remove(item){
       // removes an item from the list and re-arranges it
       var temp = this.first();

       while (temp.next !== item){
         temp = temp.next;
       }
      if (temp.next === item){
          temp.next = item.next;
          item.next.prev = temp;
         }
       return item.value;
   },
   pop: function pop(){
      // simply call remove on the last element, last() will throw it's own exception
       this.remove(this.last());
   },
   shift: function shift(){
       // call remove on the first element, first() will throw it's own exception
       this.remove(this.first());
   },
   isFirst: function isFirst(item){
       return this.first() === item;
   },
   isLast: function isLast(item){
       return this.first() === item;
   },
   iterator: function iterator(){
       var i = this.sentinel;
       return Iterator.new(
           function next() {
            i = i.next;
            return i.val;
          },
           function hasNext() {
            return i.next !== this.sentinel;
          }
           );
   },
   forEach: function forEach(f){
    // applies a function f to each VALUE in the list
    // returns the list
    this.iterator().forEach(f);
   },
   toArray: function toArray(){
   return this.iterator().toArray();
   },
   iterateFrom: function iterateFrom(li){
       Iterator.new(
           function next() {
            li = li.next;
            return li.val;
          },
           function hasNext() {
            return li.next !== this.sentinel;
          }
           );
   },
   reverseIterateFrom: function reverseIterateFrom(li){
       Iterator.new(
           function next() {
            li = li.prev;
            return li.val;
          },
           function hasNext() {
            return li.prev !== this.sentinel;
          }
           );
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
