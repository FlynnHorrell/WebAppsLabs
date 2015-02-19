/*
 * collection.spec.js
 *
 * Test file for your collection class
 */
var expect, Task, TaskCollection;

expect = require("./chai.js").expect;

Task = require("./task.js");
TaskCollection = require("./collection.js");

// ADD YOUR TESTS HERE
describe("makeNewCollection", function(){
	"use strict";
    var collection;
    it("creates an empty array with no arguments given", function(){
       collection = TaskCollection.new();
       expect(Array.isArray(collection.values));
       expect(collection.values.length === 0).to.equal(true);
    });
    it("initializes values with elements if given an array", function(){
       var task = Task.new(), task2 = Task.new(), arr = [ task, task2 ];
       collection = TaskCollection.new(arr);
       expect(collection.values.length).to.equal(2);
    });
});

describe("protoMethods", function(){
	"use strict";
    var collection, task, task2;
    beforeEach(function() {
        // This ensures every test sees a fresh task
        collection = TaskCollection.new();
        task = Task.new();
        task2 = Task.new();
    });
    it("length returns the correct number of tasks stored", function(){
       expect(collection.length()).to.equal(0);
       collection = TaskCollection.new([ task, task2 ]);
       expect(collection.length()).to.equal(2);
    });
    it("isEmpty is true when empty", function(){
       expect(collection.isEmpty()).to.equal(true);
    });
    it("isEmpty is false when not empty and add adds one task", function(){
       collection.add(task);
       expect(!collection.isEmpty()).to.equal(true);
    });
    it("add will add an array of task objects", function(){
       collection.add([ task, task2 ]);
       // console.log(collection.length())
       expect(collection.length()).to.equal(2);
    });
    it("new adds a new task to the collection", function(){
       collection.new();
       expect(collection.length()).to.equal(1);
    });
    it("new returns the created task", function(){
       collection.new().setTitle("hello");
       expect(collection.has("hello")).to.equal(true);
    });
    it("remove removes a single task", function(){
       var id = task.id;
       collection.add(task);
       expect(collection.length()).to.equal(1);
       collection.remove(id);
       expect(collection.length()).to.equal(0);
    });
    it("removes an array of tasks", function(){
       var id = task.id, id2 = task2.id;
       collection.add([ task, task2 ]);
       // console.log(collection.length());
       collection.remove([ id, id2 ]);
      // console.log(collection.length());
       expect(collection.length()).to.equal(0);
    });

   it("get returns a task matching the function given", function(){
        var fun = function(t){
           return t.isCompleted();
        };
        task.toggleCompleted();
        collection.add(task, task2);
        expect(collection.get(fun)).to.equal(task);
    });

    it("get returns a task matching the id given", function(){
        expect(collection.get(1) === null);
        var id = task.id;
        collection.add(task);
        expect(collection.get(id)).to.equal(task);
    });
    it("get returns a task matching the string given", function(){
      expect(collection.get("hello") === null).to.equal(true);
	    task.setTitle("hello");
	    collection.add(task);
	    expect(collection.get("hello")).to.equal(task);
    });

    it("get returns a task matching the regExp given", function(){
       var r = /\w+/;
       task.setTitle("title");
       collection.add(task2);
       collection.add(task);
       expect(collection.get(r)).to.equal(task);
    });
    it("has finds a task matching the function given", function(){
        var fun = function(t){
           return t.isCompleted();
        };
        expect(!collection.get(fun)).to.equal(true);
        task.toggleCompleted();
        collection.add(task, task2);
        expect(collection.has(fun)).to.equal(true);
    });
    it("has finds a task matching the id given", function(){
        expect(!collection.has(1)).to.equal(true);
        var id = task.id;
        collection.add(task);
        expect(collection.has(id)).to.equal(true);
    });

    it("has finds a task matching the string given", function(){
		expect(!collection.get("hello")).to.equal(true);
	    task.setTitle("hello");
	    collection.add(task);
	    expect(collection.has("hello")).to.equal(true);
    });

	 it("has finds a task matching the regExp given", function(){
	   var r = /\w+/;
	   expect(!collection.get(r)).to.equal(true);
       task.setTitle("title");
       collection.add(task);
       expect(collection.has(r)).to.equal(true);
    });

    it("filter returns a collection with tasks matching the function given", function(){
        var collection2, fun;
        fun = function(t){
           return task.isCompleted();
        };
        task.toggleCompleted();
        collection.add(task, task2);
        collection2 = collection.filter(fun);
        expect(collection2.has(fun)).to.equal(true);
        expect(collection2.length()).to.equal(1);
    });
    it("filter returns a collection with tasks matching the ids given", function(){
       var id, id2, collection2, task3;
       id = task.id;
       id2 = task2.id;
       task3 = Task.new();
       collection.add(task3);
       collection.add([ task, task2 ]);
       collection2 = collection.filter([ id, id2 ]);
       expect(collection2.has(id)).to.equal(true);
       expect(collection2.has(id2)).to.equal(true);
    });
    it("filter returns a collection with tasks matching the string given", function(){
       var collection2;
       task.setTitle("hello");
       task2.setTitle("bye");
       collection.add([ task, task2 ]);
       collection2 = collection.filter("hello");
       expect(collection2.has("hello")).to.equal(true);
       expect(!collection2.has("bye")).to.equal(true);
    });
    it("filter returns a collection with tasks matching the regExp given", function(){
       var r = /\w+/, collection2;
       task.setTitle("title");
       task2.setTitle("");
       collection.add([ task, task2 ]);
       collection2 = collection.filter(r);
       expect(collection2.has("title")).to.equal(true);
       expect(collection2.length()).to.equal(1);
    });
	it("forEach successfully calls a function on each task in the collection", function(){
		 var fun = function(t){
           t.toggleCompleted();
        };
        collection.add([ task, task2 ]);
        collection.forEach(fun);
        expect(collection.values[ 0 ].isCompleted()).to.equal(true);
        expect(collection.values[ 1 ].isCompleted()).to.equal(true);
    });
  it("groupByTag returns an object whose keys are TaskCollections with appropriate tags", function(){
      var task3, myObj;
      task3 = Task.new();
      task.setTitle("hello");
      task.addTags([ "hi", "123" ]);
      task2.addTags([ "hi2", "hi" ]);
      task3.addTag("hi");
      collection.add([ task, task2, task3 ]);
      myObj = collection.groupByTag();
      expect(myObj.hi.length()).to.equal(3);
      expect(myObj.hi.get("hello")).to.equal(task);
      expect(myObj.hi2.length()).to.equal(1);
      expect(myObj[ "123" ].length()).to.equal(1);
  });
  it("print returns an empty string for an empty collection ", function(){
      expect(collection.print()).to.equal("");
  });
  it("print returns an appropriate string for an collection with one task ", function(){
      task.setTitle("theTask");
      collection.add(task);
      expect(collection.print()).to.equal("theTask\n");
      collection.remove(task.id);
      task.toggleCompleted();
      // Date.getFullYear() Date.getMonth(), and Date.getDay()?
      task.addTags([ 1, "hi" ]);
      collection.add(task);
      console.log(collection.print());
      // expect(collection.print()).to.equal("");
  });
  it("print returns an appropriate string for an collection with multiple tasks ", function(){
      task.setTitle("Task1");
      task2.setTitle("Task2");
      task.toggleCompleted();
      task2.addTags([ 1, 2 ]);
      collection.add([ task, task2 ]);
      console.log(collection.print());
      // expect(collection.print()).to.equal("");
  });
  it("concat adds other TaskCollections elements to this TaskCollection", function(){
      var task3, task4, collection2, collection3;

      collection2 = TaskCollection.new();
      collection3 = TaskCollection.new();

      task.setTitle("hi");
      task2.setTitle("hi2");
      task3 = Task.new();
      task4 = Task.new();
      task3.setTitle("bye");
      task4.setTitle("bye2");

      collection2.add([ task, task2 ]);
      collection3.add([ task3, task4 ]);

      collection.concat(collection2, collection3);
      expect(collection.get("hi")).to.equal(task);
      expect(collection.get("hi2")).to.equal(task2);
      expect(collection.get("bye")).to.equal(task3);
      expect(collection.get("bye2")).to.equal(task4);
  });
});
