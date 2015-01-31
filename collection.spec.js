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
    /*
    it("get returns a task matching the function given" , function(){

    });
	*/

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
    /*
    it("get returns a task matching the regExp given", function(){

    });
    it("has finds a task matching the function given", function(){

    });
    it("has finds a task matching the id given", function(){

    });
    it("has finds a task matching the string given", function(){

    });
	it("has finds a task matching the regExp given", function(){

    });
    it("filter returns a collection with tasks matching the function given", function(){

    });
    it("filter returns a collection with tasks matching the ids given", function(){

    });
    it("filter returns a collection with tasks matching the string given", function(){

    });
    it("filter returns a collection with tasks matching the regExp given", function(){

    });
	it("forEach successfully calls a function on each task in the collection", function(){

    });
	*/
});
