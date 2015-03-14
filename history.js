/*
 * history.js
 *
 * Contains implementation for a CmdHistory "class"
 */

var DLList, CmdHistory, proto;

DLList = require("./dllist");

/*
 *       Constructors
 */

function makeNewHistory() {
   var hist = Object.create(proto);
   hist.list = DLList.new();
   hist.current = null;
   return hist;
}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here
	add: function add(item){
		//adds an item to the history to follow current, removing all elements after current
		hist.endAt(current);
		hist.insertAt(current);
		item.execute();
	},
	canRedo: function canRedo(){
		// returns true if there is an element after current
		return hist.current.next !== null;
	},
	canUndo: function canUndo(){
		// returns true if the hist is not empty, ie: if a command can be undone
		return !hist.isEmpty();
	},
	redo: function redo(){
		// advances current to the next item and re-executes it
		// throws an error if the hist is empty
		if hist.current.next === null{
			throw Error("cannot redo: current is last command in hist")
		}
		current = current.next;
		current.execute();
		}
	},
	undo: function undo(){
		// unexecutes current and goes back a step in hist
		// throws an error if there is no current
		if hist.current === null{
			throw Error("cannot undo: current does not exist")
		}
		current.unexecute();
		current = current.prev;
	},
	undoableIterator: function undoableIterator(){
	    var c = this.current;
	    return Iterator.new(
	    	function next() { c = c.prev; return c;},
	    	function hasNext() {return c.prev !== null;}
	    	);
	},
	redoableIterator: function redoableIterator(){
	    var c = this.current;
	    return Iterator.new(
	    	function next() { c = c.next; return c;},
	    	function hasNext() {return c.next !== null;}
	    	);
	}
};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
CmdHistory = {
   new: makeNewHistory
};

Object.defineProperty(CmdHistory, "prototype", {
   value: proto,
   writable: false
});

module.exports = CmdHistory;
