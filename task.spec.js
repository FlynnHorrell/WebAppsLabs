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
    "use strict";
    var task;
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
    	var task2 = Task.new();
    	expect(task.id===task2.id).to.equal(false);
    });
});

describe("ProtoMethods", function(){
    "use strict";
    var task;
    beforeEach(function() {
        // This ensures every test sees a fresh task
        task = Task.new();
    });
    it("setTitle changes the title", function(){
        task.setTitle("testTitle");
        expect(task.title).to.equal("testTitle");
    });
    it("isCompleted is false when it is not completed", function(){
        expect(task.isCompleted()).to.equal(false);
    });
    it("Toggle Completed adds a date and isCompleted is true when it is completed", function(){
        task.toggleCompleted();
        expect(task.isCompleted()).to.equal(true);
    });
    it("Toggle Completed removes a date if there is already one", function(){
        task.toggleCompleted();
        task.toggleCompleted();
        expect(task.isCompleted()).to.equal(false);
    });
    it("hasTag is false when it doesnt have the tag", function(){
       expect(task.hasTag("sldfkj")).to.equal(false);
    });
    it("addTag adds a tag and hasTag finds it", function(){
      //  console.log(task.tags);
      //  console.log(task.addTag);
        task.addTag("sdf");
       // console.log(task.tags);
        expect(task.hasTag("sdf")).to.equal(true);
    });
    it("remove Tag removes a tag if it is there", function(){
        task.addTag("eh");
        task.removeTag("eh");
        expect(task.hasTag("eh")).to.equal(false);
    });
    it("toggleTag succesfully toggles a tag", function(){
         task.toggleTag("hi");
         expect(task.hasTag("hi")).to.equal(true);
         task.toggleTag("hi");
         expect(task.hasTag("hi")).to.equal(false);
    });
    it("addTags adds an array of strings", function(){
        task.addTags([ "Multiple", "tags", "at", "once" ]);
        expect(task.hasTag("Multiple")).to.equal(true);
        expect(task.hasTag("tags")).to.equal(true);
        expect(task.hasTag("at")).to.equal(true);
        expect(task.hasTag("once")).to.equal(true);
    });
    it("removeTags removes an array of string", function(){
        task.addTags([ "Multiple", "tags", "at", "once" ]);
        task.removeTags([ "Multiple", "tags", "at", "once" ]);
        expect(task.hasTag("Multiple")).to.equal(false);
        expect(task.hasTag("tags")).to.equal(false);
        expect(task.hasTag("at")).to.equal(false);
        expect(task.hasTag("once")).to.equal(false);
    });
    it("toggleTags toggles tags", function(){
         task.addTag("at");
         task.toggleTags([ "Multiple", "tags", "at", "once" ]);
         expect(task.hasTag("Multiple")).to.equal(true);
         expect(task.hasTag("tags")).to.equal(true);
         expect(task.hasTag("at")).to.equal(false);
         expect(task.hasTag("once")).to.equal(true);
         task.toggleTags([ "Multiple", "tags", "at", "once" ]);
         expect(task.hasTag("Multiple")).to.equal(false);
         expect(task.hasTag("tags")).to.equal(false);
         expect(task.hasTag("at")).to.equal(true);
         expect(task.hasTag("once")).to.equal(false);
    });
    it("clone creates a clone", function() {
        task.addTag("qwe");
        task.setTitle("titled");
        task.toggleCompleted();
        var task2 = task.clone();
        expect(task2.hasTag("qwe"));
        expect(task2.title === task.title).to.equal(true);
        expect(task2.completedTime === task.completedTime).to.equal(true);
    });
});
