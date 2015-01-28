/*
 * task.spec.js
 *
 * Test file for your task class
 */
var expect, Task;

expect = require("./chai.js").expect;

Task = require("./task.js");

// ADD YOUR TESTS HERE
describe("makeNewTask", function(){
    var task;
    var hasOwnProperty = Object.hasOwnProperty.call.bind(Object.hasOwnProperty);
    beforeEach(function() {
        // This ensures every test sees a fresh task
        task = Task.new();
    });
    it("creates a title as an empty String", function(){
       expect(task.title).to.equal("");
    });
    it("creates an completedTime that is null", function(){
       expect(task.completedTime).to.equal(null);
    });
    it("creates an array of tags", function(){
       expect(Array.isArray(task.tags)).to.equal(true);
    });
    it("creates an id for each task that is unique", function(){
    	task2 = Task.new();
    	expect(task.id===task2.id).to.equal(false);
    });
});
