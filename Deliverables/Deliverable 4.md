D.4 Implementation 1
Grading: 35 points

Instructions
For this deliverable, you should have a fully functional software prototype that delivers a set of features (don’t need to be the complete set you specified, but it needs to be a working piece of software).

Structure your deliverable according to the following sections. See the Team Project Instructions for details about formatting. 

1. Introduction

StudySphere is an application designed to provide students with a simple, straightforward approach to creating, joining, and managing study groups. Our site makes it easier than ever to find other like-minded individuals looking to ‘study smarter together’! Groups are equipped with real-time messaging and optimized scheduling technology to service users who want to connect both virtually and in person! The current project can be found at the following link: [StudySphere GitHub Repository](https://github.com/jadynlaila/Study_Group_Platform)


2. Implemented requirements
List in this section each requirement and associated pull request each member implemented for this release. Follow the example below---include the description of the requirement, a link to the issue, a link to the pull request(s) that implement the requirement, who implemented the requirement, who approved it, and a print screen that depicts the implemented feature (if applicable). I expect that you implement features you specified in your MVP (c.f. D.2 Requirements). All implemented features should have an automated test to verify their correct functioning. 

Create subsections for each group member. All group members should have worked on implementation activities and submitted pull requests. Only stable code should be included in the release. The code that is still under development should be in branches. See the example:

Example of Requirement Description
Requirement: As a Student, I want to add a homework assignment so that I can organize my ToDo list.

Issue: https://github.com/fake-user/project/issues/45Links to an external site.

Pull request: https://github.com/fake-user/project/pull/426Links to an external site.

Implemented by: Martin Fowler

Approved by: Ada Lovelace

Print screen: A print screen that depicts the implemented feature (if applicable)

Remember: All source code should be submitted by means of pull requests, and the Reviewer should review and approve each pull request. For more information about pull requests: https://help.github.com/articles/about-pull-requests/Links to an external site.  

Grading criteria (10 points): This section will be evaluated in terms of correctness, completeness, thoroughness, consistency, coherence, adequate use of language, and amount of work put into the implementation. Students can receive different grades depending on their involvement. It is expected that all members contribute with non-trivial implementation. All pull requests should be approved and integrated by the Reviewer. You should follow an adequate workflow (description of the requirement on the issue tracker, submission of the implemented requirement as a pull request, and review of the pull request by another developer). 

3. Tests
You should implement automated tests that aim to verify the correct behavior of your code. Provide the following information:

Test framework you used to develop your tests (e.g., JUnit, unittest, pytest, etc.)

Link to your GitHub folder where your automated unit tests are located

An example of a test case. Include in your answer a GitHub link to the class being tested and to the test

A print screen showing the result of the execution of the automated tests

Grading criteria (4 points): You should have an adequate number of automated tests. They should be well-written to exercise the main components of your system, covering the relevant inputs.
## Jadyn Calhoun
**Test Framework:** Jest and Supertest

**Automated Tests Location:** [Student Controller Tests](https://github.com/jadynlaila/Study_Group_Platform/pull/84/commits/e00beb0edbac8463df7b24761da9a762c42c6398#diff-ca0be02e24395e61b80efaf64d749fcd2dc48daa079b6fcb10114a5ba2c61a35)

**Test Case Example:** The following is a test that determines if a students information is being updated accurately ![Update Student Test](res/jadyn_d4/jadyn_update_student_test.png) The class being tested is located at [Student Controller Functions](https://github.com/jadynlaila/Study_Group_Platform/pull/84/commits/e00beb0edbac8463df7b24761da9a762c42c6398#diff-daf6cac8ddaf8706d604efcb5a394bb39b4635f70de2479aa57976690932c6a6) and the tests are located at [Student Controller Tests](https://github.com/jadynlaila/Study_Group_Platform/pull/84/commits/e00beb0edbac8463df7b24761da9a762c42c6398#diff-ca0be02e24395e61b80efaf64d749fcd2dc48daa079b6fcb10114a5ba2c61a35)

**Execution Result:** ![Student Controller Test Execution](res/jadyn_d4/jadyn_jest.png)

4. Adopted technologies
<<<<<<< HEAD
## JavaScript
JavaScript is a versatile, high-level programming language primarily used for adding interactivity to web pages. It enables dynamic content, user engagement, and complex functionalities on both the client and server sides. There is a large community of people who work with this technology, so it also has extensive resources, support, and libraries available.

## CSS
CSS is a stylesheet language that allows developers to apply styles, such as colors, fonts, and spacing to pages, creating visually appealing and responsive designs.

## Node.js
Node.js is a JavaScript runtime that allows for server-side development, providing a unified language across the stack. Its event-driven architecture is perfect for building scalable, real-time applications, making it a strong choice for connecting students on the StudySphere platform.

## Express
Express is a fast and minimalist web framework for Node.js. It provides simplified routing and middleware management, which is ideal for our organization.

## Express Async Handler
Express Async Handler is Express’s default error handler and assists in overall error management as well as the code’s readability.

## JSON Web Token (JWT)
JWT is essential for user authentication and session management. It creates tokens when a user logs in that will expire and sign them out after a defined amount of time passes.

## MongoDB
MongoDB is a NoSQL database that allows flexible, document-based data storage, making it easy to scale and adapt as the application grows.

## Mongoose
Mongoose is a library for MongoDB that makes working with the database data more structured and organized. Specifically, we use it to create models of the data and to verify that given IDs are valid MongoDB IDs.

## React
React is a JS library for building user interfaces that enables the creation of interactive, component-based UIs, perfect for the dynamic features of the platform.

## Dotenv
Dotenv is a module for managing environment variables that keeps sensitive configuration details secure and separate from the codebase.

## Nodemon
Nodemon is a utility that will automatically restart the server when changes are detected, helping assist in the development workflow.

## Jest
Jest is a JS testing framework that supports simple, effective, and (most importantly) readable testing.

## Supertest
Supertest is a library that helps with the testing of REST APIs, which the backend depends on.

=======

**JavaScript** is a versatile, high-level programming language primarily used for adding interactivity to web pages. It enables dynamic content, user engagement, and complex functionalities on both the client and server sides. There is a large community of people who work with this technology, so it also has extensive resources, support, and libraries available.

**CSS** is a stylesheet language that allows developers to apply styles, such as colors, fonts, and spacing to pages, creating visually appealing and responsive designs.

**Node.js** is a JavaScript runtime that allows for server-side development, providing a unified language across the stack. Its event-driven architecture is perfect for building scalable, real-time applications, making it a strong choice for connecting students on the StudySphere platform.

**Express** is a fast and minimalist web framework for Node.js. It provides simplified routing and middleware management, which is ideal for our organization.

**Express async Handler** is Express’s default error handler and assists in overall error management as well as the code’s readability.

**JSON Web Token (JWT)** is essential for user authentication and session management. It creates tokens when a user logs in that will expire and sign them out after a defined amount of time passes.

**MongoDB** is a NoSQL database that allows flexible, document-based data storage, making it easy to scale and adapt as the application grows.

**Mongoose**is a library for MongoDB that makes working with the database data more structured and organized. Specifically, we use it to create models of the data and to verify that given IDs are valid MongoDB IDs.

**React** is a JS library for building user interfaces that enables the creation of interactive, component-based UIs, perfect for the dynamic features of the platform.

**Dotenv** is a module for managing environment variables that keeps sensitive configuration details secure and separate from the codebase.

**Nodemon** is a utility that will automatically restart the server when changes are detected, helping assist in the development workflow.

**Jest** is a JS testing framework that supports simple, effective, and (most importantly) readable testing.

**Supertest** is a library that helps with the testing of REST APIs, which the backend depends on.

>>>>>>> deliverable_4_jadyn

5. Learning/training
Describe the strategies employed by the team to learn the adopted technologies. 

Grading criteria (1 point): This section will be evaluated in terms of correctness, completeness, thoroughness, consistency, coherence, and adequate use of language.

6. Deployment
Provide a link for the system in production and describe how you are deploying your system. 

Some alternatives for deploying your system in the cloud: 

AWS. AWS Educate offers free credits for students. See the tutorial at https://docker-curriculum.com/Links to an external site. on how to create a container and deploy it on AWS. 
Digital Ocean or Azure. As part of the GitHub Education benefits, as a student, you can get $100 at Digital Ocean and $100 at Microsoft Azure cloud computing platforms (see more details at https://education.github.com/studentsLinks to an external site.).
Oracle Cloud. Oracle offers a free tier in its cloud environment that should be more than enough for your needs.
Firebase. Firebase can be a good choice if you are building a mobile phone app. 
 Grading criteria (3 points): This section will be graded based on the adequate use of the technology and its adequate description.

7. Licensing
Inform the license you adopted for your source code (remember to configure GitHub accordingly). Explain why you adopted this license. For more information, check https://choosealicense.com/Links to an external site..

Grading criteria (1 point): This section will be evaluated in terms of correctness, completeness, thoroughness, consistency, coherence, and adequate use of language.

8. README File
You should also prepare your repository to receive new developers. You should prepare a README.md file. See an example at https://gist.github.com/PurpleBooth/109311bb0361f32d87a2Links to an external site.. In the README file, the current version of the software should be stated. You should follow the Semantic VersioningLinks to an external site. schema. Tag the GitHub repository accordingly (see Git Basics TaggingLinks to an external site.). 

Your repository should contain a CONTRIBUTING.md file, a LICENSE file, and a CODE_OF_CONDUCT.md file. Search online for some examples of these files. In this section of the deliverable, put links to these files on GitHub.

Grading criteria (3 points): This section will be based on the presence and quality of the information presented in the files.

9. Look & feel
Describe the approach you adopted to design your user interface. Include some screenshots.

Grading criteria (3 points): This section will be graded based on the appearance (aesthetics) and usability (ease of use) of the system.

10. Lessons learned
In retrospective, describe what your team learned during this first release and what you are planning to change for the second release. 

Grading criteria (2 points): Adequate reflection about problems and solutions, clear description with adequate use of language. 

11. Demo
Include a link to a video showing the system working.

Grading criteria (6 points): This section will be graded based on the quality of the video and on the evidence that the features are running as expected. Additional criteria are the relevance of the demonstrated functionalities, the correctness of the functionalities, and the quality of the developed system from the external point of view (user interface).



ASSIGNMENTS: 
Intro (1pt) - Jadyn 
Implemented Requirements (10pts) - Everyone
Tests (4pts) - Everyone
Adopted Technologies (1pt) - Jadyn and Daira
Learning and training (1pt) - Jack , Everyone (for this one add 2-3 sentences each and one person can compile all together and add it) 
Deployment (3pts) - (still no one here, this one can be worked in 2-3 people)
Lincensing (1pt) - Alex 
README (3pts) - Daira (someone can also help in this one too)
Look and feel (3pts) - Valentino (someone can also help in this one too)
Lesson Learned (2pts) - Everyone
Demo (6pts) - Someone can help on this one too