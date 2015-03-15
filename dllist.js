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
   sentinel = { value: null };
   sentinel.next = sentinel;
   sentinel.prev = sentinel;
   lst.sentinel = sentinel;
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
       var temp = { value: val, next: null, prev: null };

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
       this.insertAt(val, this.sentinel.prev);
       return val;
   },
   endAt: function endAt(item){
      // finds the item, and ends the list at it
       var temp = this.sentinel;

       while (temp !== item){
         temp = temp.next;
       }
        if (temp === item){
            temp.next = this.sentinel;
            this.sentinel.prev = temp;
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
       return this.remove(this.last());
   },
   shift: function shift(){
       // call remove on the first element, first() will throw it's own exception
       return this.remove(this.first());
   },
   isFirst: function isFirst(item){
       return this.first() === item;
   },
   isLast: function isLast(item){
       return this.last() === item;
   },
   iterator: function iterator(){
       var i = this.sentinel, that = this;
       return Iterator.new(
           function next() {
            i = i.next;
            return i.value;
          },
           function hasNext() {
          //  console.log(i);
          //  console.log("This" + this);
            return i.next !== that.sentinel;
          }
           );
   },
   forEach: function forEach(f){
    // applies a function f to each VALUE in the list
    // returns the list
    return  this.iterator().forEach(f);
   },
   toArray: function toArray(){
   return this.iterator().toArray();
   },
   iterateFrom: function iterateFrom(li){
       var that = this;
       li = li.prev;
       return Iterator.new(
           function next() {
            li = li.next;
            return li.value;
          },
           function hasNext() {
            return li.next !== that.sentinel;
          }
           );
   },
   reverseIterateFrom: function reverseIterateFrom(li){
       var that = this;
       li = li.next;
       return Iterator.new(
           function next() {
            li = li.prev;
            return li.value;
          },
           function hasNext() {
            return li.prev !== that.sentinel;
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
