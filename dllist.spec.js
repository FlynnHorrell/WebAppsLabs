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
      list.push(item);
      expect(list.isEmpty()).to.equal(false);
  });
  it("length returns correct number", function(){
      expect(list.length()).to.equal(0);
      list.push(item);
      expect(list.length()).to.equal(1);
      list.push(item2);
      expect(list.length()).to.equal(2);
  });
  it("first return the first item", function(){
      list.push(item);
      list.push(item2);
      expect(list.first()).to.equal(item);
  });
  it("last returns the last item", function(){
      list.push(item);
      list.push(item2);
      expect(list.lst()).to.equal(item2);
  });
  it("insertAt correctly inserts items", function(){
      list.push(item);
      list.insertAt(3, item);
      expect(list.last().value).to.equal(3);
  });
  it("unshift adds a new element at the beginning of the list", function(){
      list.push(item);
      list.push(item2);
      list.unshift(0);
      expect(list.first().value).to.equal(0);
  });
  it("push adds a new element at the end of the list", function(){
      list.push(item);
      expect(list.isLast(item)).to.equal(true);
      list.push(item2);
      expect(list.isLast(item2)).to.equal(true);
  });
  it("endAt returns the correct list", function(){
      list.push(item);
      list.push(item2);
      expect(list.endAt(item).length()).to.equal(1);
  });
  it("remove removes an item", function(){
      list.push(item);
      list.remove(item);
      expect(list.length()).to.equal(0);
      list.push(item);
      list.push(item2);
      list.remove(item);
      expect(list.sentinel.next).to.equal(item2);
      expect(list.sentinel.prev).to.equal(item2);
  });
  it("pop removes the last item and throws error if empty", function(){
      var q = item2.value;
      expect(list.pop()).to.throw(Error);
      list.push(item);
      list.push(item2);
      expect(list.pop()).to.equal(q);
  });
  it("shift removes first item and throws error if empty", function(){
      var q = item.value;
      expect(list.shift()).to.throw(Error);
      list.push(item);
      list.push(item2);
      expect(list.shift()).to.equal(q);
  });
  it("isFirst is true when argument is the first item", function(){
      list.push(item);
      list.push(item2);
      expect(list.isFirst(item)).to.equal(true);
  });
  it("isLast is true when argument is the last item", function(){
      list.push(item);
      list.push(item2);
      expect(list.isLast(item2)).to.equal(true);
  });
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
  });
});
