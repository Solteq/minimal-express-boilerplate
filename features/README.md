# BDD in Javascript with CucumberJS

CucumberJS is a JavaScript port of the popular BDD tool Cucumber (which itself was a rewrite of RSpec) which allows you to define Feature Specs in a Domain-Specific-Language (DSL) - called Gherkin - and run your specs!

Cucumber itself does not provide a default assertion library and therefore I used "Should.js" like we did in the hackday.

## Installation

Install CucumberJS and add it to dev dependencies:

```
npm install cucumber --save-dev
```

After installation you can run cucumber tests manually with the following command:

```
node_modules/.bin/cucumber-js
```

## Features and steps

Cucumber tests are separated to features (specs) and steps (actual implementation of tests). Default location for vanilla CucumberJS features is *features* directory and for steps *stepDefinitions* directory.

## Automation with Grunt

Install grunt-cucumber module and save it to dev dependencies:

```
npm install grunt-cucumber --save-dev
```

For project configuration add cucumberjs configuration to Gruntfile.js. I used same paths as vanilla CucumberJS so we are also here in sync with the defaults:

```
grunt.initConfig({
	cucumberjs: {
		src: 'features',
		options: {
			steps: 'features/stepDefinitions',
			format: 'pretty'
		}
	}
});
```

I added jshint validation for steps files by adding all JavaScript files under features to jshint files configuration:

```
'features/**/*.js'
```

I also added watcher for all 'features/*.feature'.

## Can I Give My Dog Cucumbers?
Lets have a look at Cucumber testing via our beloved dog example.

### dog.features
Lets create a dog.feature file for defining the very first scenario and save it under features directory:

```
Feature: This is an example dog feature
	In order to learn Cucumber
	As a developer
	I want to make this dog feature pass

	Scenario: Dog says Wuh
		Given a dog is alive
		When I call for a dog
		Then dog should answer "Wuh"
```

Grunt watcher should now kick in:

```
Feature: This is an example dog feature
  In order to learn Cucumber
  As a developer
  I want to make this dog feature pass


  Scenario: Dog says Wuh         # features/dog.feature:6
    Given a dog is alive         # features/dog.feature:7
    When I call for a dog        # features/dog.feature:8
    Then dog should answer "Wuh" # features/dog.feature:9


1 scenario (1 undefined)
3 steps (3 undefined)

You can implement step definitions for undefined steps with these snippets:

this.Given(/^a dog is alive$/, function (callback) {
  // Write code here that turns the phrase above into concrete actions
  callback.pending();
});

this.When(/^I call for a dog$/, function (callback) {
  // Write code here that turns the phrase above into concrete actions
  callback.pending();
});

this.Then(/^dog should answer "([^"]*)"$/, function (arg1, callback) {
  // Write code here that turns the phrase above into concrete actions
  callback.pending();
});
```

Nice! One scenario with three steps recognized and there is also skeleton functions provided!

### dog.steps.js

Lets now create dog.steps.js file under stepDefinitions, add some boilerplate plus these skeletons.

```
"use strict";

module.exports = function() {
	
const app = require('../../app');

	this.Given(/^a dog is alive$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.When(/^I call for a dog$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Then(/^dog should answer "([^"]*)"$/, function (arg1, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

};
```

Again Grunt Watcher kicks in now stating:

```
1 scenario (1 pending)
3 steps (1 pending, 2 skipped)
```

#### Given

The scene of the scenario. When Cucumber executes a Given step it will configure the system to be in a well-defined state, such as creating and configuring objects or adding data to the test database.

With stateless web services this is could be sometimes useless. I still wanted to violate this principle in this example by implementing given step that calls for a alive service.

```
this.Given(/^a dog is alive$/, function (callback) {
	supertest(app)
		.get("/imalive")
		.expect("Content-Type",/json/)
		.expect(200)
		.end(function(err,res){
			res.status.should.equal(200);
			callback();
	});
});
```

#### When

When steps are used to describe an event, or an action. This can be a person interacting with the system, or it can be an event triggered by another system.

It's strongly recommended you only have a single When step per scenario. If you feel compelled to add more it's usually a sign that you should split the scenario up in multiple scenarios.

```
var answer;

this.When(/^I call for a dog$/, function (callback) {
	supertest(app)
		.get("/dog")
		.expect("Content-Type",/json/)
		.expect(200)
		.end(function(err,res){
			answer = res.body;
			callback();
	});
});
```
#### Then

Then steps are used to describe an expected outcome, or result.

Then step should use an assertion to compare the actual outcome (what the system actually does) to the expected outcome (what the step says the system is supposed to do).

```
this.Then(/^dog should answer "([^"]*)"$/, function (arg1, callback) {
	answer.should.equal(arg1);
	callback();
});
```

#### Background

Occasionally you'll find yourself repeating the same Given steps in all of the scenarios in a feature file. Since it is repeated in every scenario it is an indication that those steps are not essential to describe the scenarios, they are incidental details.

For example for all our dog services it could be essential that the dog is alive!

## Misc

I noticed that vanilla cucumber.js and grunt-cucumber js does use slight difference in steps syntax for pending test implementations:


cucumber:
```
callback(null, 'pending');
```
grunt-cucumber:
```
callback.pending();
```

I noticed this when I tried to run my tests first time with "grunt cucumber" command and skeletons were copy-pasted from cucumber-js output.

For full Cucumber reference take a look at https://cucumber.io/docs/reference. My absolute favorite with Cucumber is scenario outlines. Then even the test data will be decoupled from the test implementation and can be provided by the actual end users!



