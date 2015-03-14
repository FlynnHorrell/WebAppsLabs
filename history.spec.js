/*
 * history.spec.js
 *
 * Test file for your history class
 */
var expect, DLList, CmdHistory;

expect = require('./chai.js').expect;

DLList = require('./dllist.js');
CmdHistory = require('./history.js');

var LogEntries = [];
var Log = {
   add: function(s) { LogEntries.push(s); return this; },
   get: function() { return LogEntries; },
   clear: function() { LogEntries = []; return this; }
};
var id = 0;
function mockExecute() { Log.add(this.toString + " executed"); }
function mockUnexecute() { Log.add(this.toString + " unexecuted"); }
function mockCommand() {
   id += 1;
   return {
      execute: mockExecute,
      unexecute: mockUnexecute,
      toString: "command " + id
   };
}

// ADD YOUR TESTS HERE
describe("history", function(){

	beforeEach(function() {
    hist = CmdHistory.new()
   	cmd1 = mockCommand();
   	cmd2 = mockCommand();
  });

	it("Adds a new command to history", function(){
		hist.add(cmd1);
		expect(hist.current.value).to.equal(cmd1);
		hist.add(cmd2);
		expect(hist.current.value).to.equal(cmd2);
	});
	it("canUndo returns true if an item can be undone", function(){
		expect(hist.canUndo()).to.equal(false);
		hist.add(cmd1);
		expect(hist.canUndo()).to.equal(true);
	});
	it("undo unexecutes current command and moves back one step.  throws error if no current item", function(){
		//expect(hist.undo()).to.throw(Error);
		hist.add(cmd1);
		hist.undo();
		expect(hist.current.value).to.equal(null);
	});
	it("canRedo returns true if an item following current can be redone", function(){
		expect(hist.canRedo()).to.equal(false);
		hist.add(cmd1);
		expect(hist.canRedo()).to.equal(false);
		hist.undo();
		expect(hist.canRedo()).to.equal(true);
	});
	it("redo Advances current to the next item and executes it. throws error if no next item", function(){
		//expect(hist.redo()).to.throw(Error);
		hist.add(cmd1);
		hist.undo();
		hist.redo()
		expect(hist.current.value).to.equal(cmd1);
	});/*
	it("undoableIterator returns iterator that visits all undoable commands from current and moves backwards", function(){

	});
	it("redoableIterator returns an iterator that visits all redoable commands, starting and current and moving forwards", function(){

	});*/
});
