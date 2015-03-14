/*
 * history.spec.js
 *
 * Test file for your history class
 */
var expect, DLList, CmdHistory;

expect = require('./chai.js').expect;

DLList = require('./dllist.js');
CmdHistory = require('./history.js');

// ADD YOUR TESTS HERE
describe("dllist", function(){
  "use strict";

  var list, item, item2, value;
  value = 0;
  beforeEach(function() {
    list = DLList.new();
    value += 1;
    item = { val: value, next: null, prev: null };
    item = { val: value + 1, next: null, prev: null };
  });

  it("isEmpty is true when empty", function(){
      expect(list.isEmpty()).to.equal(true);
  });
  it("isEmpty is false when not empty", function(){
      list.push(0);
      expect(list.isEmpty()).to.equal(false);
  });
  it("length returns correct number", function(){
      expect(list.length()).to.equal(0);
      list.push(0);
      expect(list.length()).to.equal(1);
      list.push(1);
      expect(list.length()).to.equal(2);
  });
  it("first return the first item", function(){
      list.push(0);
      list.push(1);
      expect(list.first().value).to.equal(0);
  });
  it("last returns the last item", function(){
      list.push(0);
      list.push(1);
      expect(list.last().value).to.equal(1);
  });
  it("insertAt correctly inserts items", function(){
      list.push(0);
      list.insertAt(3, list.first());
      expect(list.last().value).to.equal(3);
  });
  it("unshift adds a new element at the beginning of the list", function(){
      list.push(2);
      list.push(1);
      list.unshift(0);
      expect(list.first().value).to.equal(0);
  });
  it("push adds a new element at the end of the list", function(){
      list.push(1);
      expect(list.last().value).to.equal(1);
      list.push(2);
      expect(list.last().value).to.equal(2);
  });
  it("endAt returns the correct list", function(){
      list.push(1);
      list.push(2);
      expect(list.endAt(list.sentinel.next).length()).to.equal(1);
      list.push(2);
      list.push(3);
      list.push(4);
      list.push(5);
      expect(list.endAt(list.sentinel.next.next.next).length()).to.equal(3);
  });
  it("remove removes an item", function(){
      list.push(1);
      list.remove(list.sentinel.next);
      expect(list.length()).to.equal(0);
      list.push(5);
      list.push(6);
      list.remove(list.sentinel.next);
      expect(list.sentinel.next.value).to.equal(6);
      expect(list.sentinel.prev.value).to.equal(6);
  });
  it("pop removes the last item and throws error if empty", function(){
     // expect(list.pop()).to.throw(String);
      list.push(2);
      list.push(3);
      expect(list.pop()).to.equal(3);
  });
  it("shift removes first item and throws error if empty", function(){
      //expect(list.shift()).to.throw(Error);
      list.push(8);
      list.push(9);
      expect(list.shift()).to.equal(8);
  });
  it("isFirst is true when argument is the first item", function(){
      list.push(7);
      list.push(9);
      expect(list.isFirst(list.sentinel.next)).to.equal(true);
      expect(list.isFirst(list.sentinel.prev)).to.equal(false);
  });
  it("isLast is true when argument is the last item", function(){
      list.push(5);
      list.push(6);
      expect(list.isLast(list.sentinel.next)).to.equal(false);
      expect(list.isLast(list.sentinel.prev)).to.equal(true);
  });/*
  it("iterator returns an iterator for the dllist", function(){
      var it = list.iterator();
      expect(it.hasOwnProperty(next)).to.equal(true);
      expect(it.hasOwnProperty(hasNext)).to.equal(true);
  });
  it("forEach applies a function to each value in the list", function(){
      var fun = function(){
        this.value = 0;
      };
      list.push(item);
      list.push(item2);
      list.forEach(fun);
      expect(list.first().value).to.equal(0);
      expect(list.last().value).to.equal(0);
  });
  it("toArray returns an array of the list's values", function(){
      var arr = [ item.value, item2.value ];
      list.push(item);
      list.push(item2);
      expect(list.toArray()).to.equal(arr);
  });
  it("iterateFrom returns an iterator starting from a specific item", function(){
      var it;
      list.push(item);
      list.push(item2);
      it = list.iterateFrom();
      expect(it.next()).to.equal(item);
      expect(it.next()).to.equal(item2);
  });
  it("reverseIterateFrom  returns an iterator that starts at the end", function(){
      var it;
      list.push(item);
      list.push(item2);
      it = list.reverseIterateFrom();
      expect(it.next()).to.equal(item2);
      expect(it.next()).to.equal(item);
  });*/
});
