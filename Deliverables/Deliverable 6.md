# Deliverable 6 - Group 7

## Instructions
This deliverable should describe the second release of your project. A release is a fully functional software that delivers a set of features (it doesn’t need to be the complete set, but the software needs to be usable). Structure your deliverable into the following sections. See the “Team Project Instructions” for details about formatting.

## 1. Introduction
StudySphere is an intuitive platform that empowers students to create and manage accounts, connect with peers, and form study groups with ease. Upon account creation, users provide essential information such as their name, email, college, and groups they are affiliated with. Students are encouraged to join or create study groups, fostering a collaborative environment where they can interact, exchange ideas, and prepare for academic success. Each group features real-time messaging, allowing seamless communication for scheduling study sessions, planning meetings, or simply making new friends within their academic community.

The platform enables students to take ownership of their groups by managing attributes like group names, descriptions, pictures, members, and administrators. Group owners and administrators have enhanced privileges to ensure smooth group functionality. All group messages are stored in dedicated threads, ensuring easy access and continuity. By combining user-friendly design with robust features, StudySphere provides an innovative way for students to "study smarter together" and build meaningful connections, both virtually and in person. The current project can be found at the following link: [StudySphere GitHub Repository](https://github.com/jadynlaila/Study_Group_Platform)

## 2. Implemented requirements
List in this section the requirements and associated pull request that you implemented for this release, following the example below---include the description of the requirement, a link to the issue,  a link to the pull request(s) that implement the requirement, who implemented the requirement, who approved it, and a print screen that depicts the implemented feature (if applicable). Order the requirements by the name of the student who implemented them. Everyone in the group is expected to have code contributions documented by means of pull requests. Every pull request should be reviewed and approved before the merge. 

At this point, we expect that you implement/prototype the features you specified in your MVP (c.f. D.2 Requirements). Pivots and changes are allowed as soon as you justify them.

See the example:
```
Example of Requirement Description
Requirement: As a Student, I want to add a homework assignment so that I can organize my ToDo list.

Issue: <link to your GitHub issue>

Pull request: https://github.com/user/project/pull/426 Links to an external site.

Implemented by: Martin Fowler

Approved by: Ada Lovelace

Print screen: A print screen that depicts the implemented feature (if applicable)
```

**Rudra Amin:** 

Issue: https://github.com/jadynlaila/Study_Group_Platform/issues/115

Pull request: https://github.com/jadynlaila/Study_Group_Platform/pull/170

Implemented By: Rudra Amin (backend) and Jadyn Calhoun (frontend)

Approved by: Rudra Amin

Print screen: ![message in group chat](Deliverables/res/sending_message.png)

Remember that all code contributions should be submitted via pull requests and the reviewer should review and approve each pull request. 

Grading criteria (20 points): This section will be evaluated in terms of correctness, completeness, thoroughness, consistency, coherence, adequate use of language, and amount of work put into the implementation. Students can receive different grades depending on their involvement. It is expected that all members contribute with non-trivial implementation. All pull requests should be approved and integrated by the scrum master. You should follow an adequate workflow (description of the requirement on the issue tracker, submission of the implemented requirement as a pull request, and review of the pull request by another developer). 

[ insert content here ]

## 3. Tests

### 3.1 Unit tests

A unit test is an automated test that aims to verify the behavior of a component isolated from the rest of the system. For this deliverable, show an example of a unit test that uses mock objects to isolate the class from the rest of the system. 

Test framework you used to develop your tests (e.g., JUnit, unittest, pytest, etc.)
Link to your GitHub folder where your automated unit tests are located
An example of a test case that makes use of mock objects. Include in your answer a GitHub link to the class being tested and to the test
A print screen showing the result of the unit test execution
Grading criteria (2 points): adequate choice of a test framework, coverage of the tests, quality of the tests, adequate use of Mock objects, and a print screen showing successful test execution.

[ insert content here ]

### 3.2 Acceptance tests

An acceptance test is a test that verifies the correct implementation of a feature from the user interface perspective. An acceptance test is a black box test (the system is tested without knowledge about its internal implementation). Provide the following information:

Test framework you used to develop your tests (e.g., Selenium, Katalon Studio, Espresso2, Cucumber, etc.)
Link to your GitHub folder where your automated acceptance tests are located
An example of an acceptance test. Include a GitHub link to the test and an explanation about the tested feature in your answer.
A print screen/video showing the acceptance test execution
Grading criteria (2 points): adequate choice of a test framework, coverage of the tests, quality of the tests, adequate example of an acceptance test, print screen/video showing successful test execution.

[ insert content here ]

## 4. Demo
Include a link to a video showing the system working.

Grading criteria (10 points): This section will be graded based on the quality of the video and on the evidence that the features are running as expected. Additional criteria are the relevance of the demonstrated functionalities, the correctness of the functionalities, and the quality of the developed system from the external point of view (user interface).

[ insert content here ]

## 5. Code quality

**Backend:** To ensure high-quality code, our team implemented several practices and adhered to specific conventions and policies. First, we adopted a consistent coding style, this ensured uniformity and made our code easier to read and maintain. We also emphasized descriptive naming conventions for variables, functions, and classes to enhance clarity. Our team ensured high-quality code by also following SOLID principles, including the Single Responsibility, Open-Closed, and Liskov Substitution Principles, while acknowledging that our current implementation does not fully adhere to the Interface Segregation Principle. We also used the Service Layer Design Pattern to separate business logic from controllers, ensuring modularity and scalability. To validate functionality, we implemented unit testing for individual components and acceptance testing to ensure the system met user requirements.

## 6. Lessons learned

**Alexander Anthis:**: During the second release of StudySphere, I learned write Unit Tests as well as acceptance test for our website. I also learned how to link backend functions to frontend and make the webitse functional.

**Daira Santacruz:** Through the second release I learned how to make and search for groups. I also learned how to link backend functions to the front UI, more specifically searching and joining groups. One thing I would maybe change is have a seperate page for what users see once they login instead of the current home/groups page.

**Rudra Amin:** I had no previous expirience with building a website so this was all very new to me.Through our second release I learened how to write backend function as well as work with routes for the functions. I also learend how to implement desgin patterns in our code. I learned different design patterns and then implemented them into our code. 

**Jack Lealos:** During the second release I learned different design patterns as well as implemented them in our code. I also learned how to link the backend code with the frontend, More specifically I linked the groups and user settings functions. 

**Jadyn Calhoun:** Throught the second release I learned how to link backend funcitons with the UI. More specifically I learned how to link the login and user registration page as well as the navigation panel. I also learned how to input mock data into out server to test functions.

**Valentino Valero:** Over the duration of this project, I have learned the importance of having a gameplan. Specifically frontend, having built a figma prototype for each and every page proved very beneficial. Without this figma prototype, frontend wouldve been very lost and it would be harder to communicate and understand what needs to be built.



