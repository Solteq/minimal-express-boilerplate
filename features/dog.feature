Feature: This is an example dog feature
	In order to learn Cucumber
	As a developer
	I want to make this dog feature pass

	Scenario: Dog says Wuh
		Given a dog is alive
		When I call for a dog
		Then dog should answer "Wuh"