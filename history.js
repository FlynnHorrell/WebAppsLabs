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
		//  adds an item to the history to follow this.current, removing all elements after this.current
		if (this.current === null){
			this.list.unshift(item);
			this.current = this.list.first();
		}else {
			this.list.insertAt(item, this.current);
			this.current = this.current.next;
		}
		this.list.endAt(this.current);
		item.execute();
	},
	canRedo: function canRedo(){
		// returns true if there is an element after this.current
		if (this.list.isEmpty()){
			return false;
		}
		return this.current.next.value !== null;
	},
	canUndo: function canUndo(){
		// returns true if the this is not empty, ie: if a command can be undone
		return !this.list.isEmpty();
	},
	redo: function redo(){
		// advances this.current to the next item and re-executes it
		// throws an error if the this is empty
		if (this.canRedo()){
			this.current = this.current.next;
			this.current.value.execute();
		} else {
			throw "Cannot Redo";
		}
	},
	undo: function undo(){
		// unexecutes this.current and goes back a step in hist
		// throws an error if there is no this.current
		if (this.current === null){
			throw "Error: this.current does not exits";
		}
		this.current.value.unexecute();
		this.current = this.current.prev;
	},
	undoableIterator: function undoableIterator(){
	    return this.list.reverseIterateFrom(this.current);
	    /*var c = this.current;
	    return Iterator.new(
	        function next() {
	        c = c.prev;
	        return c;
	        },
	        function hasNext() {
	            return c.prev !== null;
	        });*/
	},
	redoableIterator: function redoableIterator(){
	   return this.list.iterateFrom(this.current.next);
	    /*var c = this.current;
	    return Iterator.new(
	        function next() {
	            c = c.next;
	            return c;
	        },
	        function hasNext() {
	            return c.next !== null;
	        });*/
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
