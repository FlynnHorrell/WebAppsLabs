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
      //  console.log(collection);
      // console.log(collection.values);
       expect(Array.isArray(collection.values));
       expect(collection.values.length === 0);
    });
    it("initializes values with elements if given an array", function(){
       var task = Task.new(), task2 = Task.new(), arr = [ task, task2 ];
       collection = TaskCollection.new(arr);
       expect(collection.values.length === 2);
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
       expect(collection.length() === 0);
       collection = TaskCollection.new([ task, task2 ]);
       expect(collection.length() === 2);
    });
    it("isEmpty is true when empty", function(){
       expect(collection.isEmpty());
    });
    it("isEmpty is false when not empty and add adds one task", function(){
       collection.add(task);
       expect(!collection.isEmpty());
    });
    it("add will add an array of task objects", function(){
       collection.add([ task, task2 ]);
       expect(collection.length() === 2);
    });
    it("new adds a new task to the collection", function(){
       collection.new();
       expect(collection.length === 1);
    });
    it("new returns the created task", function(){
       collection.new().setTitle("hello");
       expect(collection.has("hello"));
    });
    it("remove removes a single task", function(){
       var id = task.id;
       collection.add(task);
       collection.removes(id);
       expect(collection.length() === 0);
    });
    it("removes an array of tasks", function(){
       var id = task.id, id2 = task2.id;
       collection.add([ task, task2 ]);
       collection.removes([ id, id2 ]);
       expect(collection.length() === 0);
    });
    
    it("get returns a task matching the function given" , function(){
        var fun = function(task){
           return task.completedTime == null;
        };
        task.toggleCompleted();
        collection.add(task,task2);
        expect(collection.get(fun)===task2);
    });

    it("get returns a task matching the id given", function(){
        expect(collection.get(1) == null);
        var id = task.id;
        collection.add(task);
        expect(collection.get(id).id === id);
    });
    it("get returns a task matching the string given", function(){
        expect(collection.get("hello") == null);
	    task.setTitle("hello");
	    collection.add(task);
	    expect(collection.get("hello").title === "hello");
    });
    
    it("get returns a task matching the regExp given", function(){
       var r = /\w+/;
       task.setTitle("title");
       collection.add(task);
       expect(collection.get(r)===task);
    });
    it("has finds a task matching the function given", function(){
        var fun = function(task){
           return task.completedTime == null;
        };
        expect(!collection.get(fun));
        task.toggleCompleted();
        collection.add(task,task2);
        expect(collection.get(fun);
    });
    it("has finds a task matching the id given", function(){
    	expect(!collection.has(1));
        var id = task.id;
        collection.add(task);
        expect(collection.has(id));
    });
    it("has finds a task matching the string given", function(){
    	expect(!collection.get("hello"));
	    task.setTitle("hello");
	    collection.add(task);
	    expect(collection.get("hello"));

    });
	it("has finds a task matching the regExp given", function(){
	   var r = /\w+/;
	   expect(!collection.get(r))
       task.setTitle("title");
       collection.add(task);
       expect(collection.get(r));
    });
    it("filter returns a collection with tasks matching the function given", function(){
        var collection2;
        var fun = function(task){
           return task.completedTime == null;
        };
        task.toggleCompleted();
        collection.add(task,task2);
        collection2 = collection.filter(fun);
        expect(collection2.has(fun));
    });
    it("filter returns a collection with tasks matching the ids given", function(){
       var id, id2, collection2;
       id = task.id;
       id2 = task2.id;
       collection.add([task,task2]);
       collection2 = collection.filter([ id,id2 ]);
       expect(collection2.has(id));
       expect(collection2.has(id2));
    });
    it("filter returns a collection with tasks matching the string given", function(){
       var collection2;
       task.setTitle("hello");
       task2.setTitle("bye");
       collection.add([task,task2]);
       collection2 = collection.filter("hello");
       expect(collection2.has("hello"));
       expect(!collection2.has("bye"));
    });
    it("filter returns a collection with tasks matching the regExp given", function(){
       var r = /\w+/;
       task.setTitle("title");
       task2.setTitle("_ _");
       collection.add([task,task2]);
       collection2 = collection.filter(r);
       expect(collection2.has("title"));
       expect(!collection2.has("_ _"));
    });
	it("forEach successfully calls a function on each task in the collection", function(){
		 var fun = function(task){
           task.toggleCompleted();
        };
        collection.add([ task, task2 ]);
        collection.forEach(fun);
        expect(collection.values[1].isCompleted());
        expect(collection.values[2].isCompleted());
    });
});
