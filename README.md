![IMAGE](https://github.com/jadynlaila/Study_Group_Platform/blob/main/S%20%2B%20study%20COPY.svg)
# StudySphere
StudySphere is an application designed to provide students with a simple, straightforward approach to creating, joining, and managing study groups. Our site makes it easier than ever to find other like-minded individuals looking to ‘study smarter together’! Groups are equipped with real-time messaging and optimized scheduling technology to service users who want to connect both virtually and in person! The current project can be found at the following link: [StudySphere GitHub Repository](https://github.com/jadynlaila/Study_Group_Platform)

## Getting Started

These instructions will guide you on setting up the StudySphere project on your local machine for development and testing purposes. See the deployment section for guidance on setting it up in a live environment.

### Prerequisites

You’ll need the following installed on your machine to run StudySphere:

- **Node.js** (v14 or later) and npm for dependency management.

  - Install Node.js and npm if not already installed:

```
# for ubuntu / Debian
sudo apt update
sudo apt install nodejs npm

# for MacOS with Homebrew
brew install node
```

- **MongoDB** for the database
  - Follow the [MongoDB installation guide](https://www.mongodb.com/docs/manual/installation/) for your system, or use:

```
# for ubuntu 
sudo apt update
sudo apt install -y mongodb

# for MacOS with Homebrew
brew tap mongodb/brew
brew install mongodb-community
```  

- **Git** to clone the repository:

```
# For Ubuntu/Debian
sudo apt install git

# For MacOS with Homebrew
brew install git
```
Additional Packages (will be installed with npm)
Once you've cloned the repository, npm will install the following packages:

- **Express** - Web framework for building the server.
- **Express Async Handler** - For handling asynchronous routes and error management.
- **JWT (JSON Web Token)** - For authentication and session management.
- **Mongoose** - To create data models and interact with MongoDB.
- **React** - For building dynamic user interfaces.
- **Dotenv** - For managing environment variables.
- **Nodemon** - For automatic server restarts during development.
- **Jest** - For running tests on the JavaScript codebase.
- **Supertest** - For testing RESTful APIs.

## Running the tests


### Break down into end to end tests

To maintain quality and ensure reliability, StudySphere includes automated tests.

First, the server needs to be running in the background:
```
npm start
```
In a different terminal run the tests

```
npm test
```


## Deployment

Our software will be deployed as a web server on a remote server hosted by Hostwinds which we have previously set up. We additionally obtained the domain `study-sphere.me` so anyone can easily navigate to the website and set that up appropriately.
Here is a link to our site: [Study Sphere](http://study-sphere.me/)

## Built With


**JavaScript** is a versatile, high-level programming language primarily used for adding interactivity to web pages. It enables dynamic content, user engagement, and complex functionalities on both the client and server sides. There is a large community of people who work with this technology, so it also has extensive resources, support, and libraries available.

**CSS** is a stylesheet language that allows developers to apply styles, such as colors, fonts, and spacing to pages, creating visually appealing and responsive designs.

**Node.js** is a JavaScript runtime that allows for server-side development, providing a unified language across the stack. Its event-driven architecture is perfect for building scalable, real-time applications, making it a strong choice for connecting students on the StudySphere platform.

**Express** is a fast and minimalist web framework for Node.js. It provides simplified routing and middleware management, which is ideal for our organization.

**Express async Handler** is Express’s default error handler and assists in overall error management as well as the code’s readability.

**JSON Web Token (JWT)** is essential for user authentication and session management. It creates tokens when a user logs in that will expire and sign them out after a defined amount of time passes.

**MongoDB** is a NoSQL database that allows flexible, document-based data storage, making it easy to scale and adapt as the application grows.

**Mongoose** is a library for MongoDB that makes working with the database data more structured and organized. Specifically, we use it to create models of the data and to verify that given IDs are valid MongoDB IDs.

**React** is a JS library for building user interfaces that enables the creation of interactive, component-based UIs, perfect for the dynamic features of the platform.

**Dotenv** is a module for managing environment variables that keeps sensitive configuration details secure and separate from the codebase.

**Nodemon** is a utility that will automatically restart the server when changes are detected, helping assist in the development workflow.

**Jest** is a JS testing framework that supports simple, effective, and (most importantly) readable testing.

**Supertest** is a library that helps with the testing of REST APIs, which the backend depends on.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/jadynlaila/Study_Group_Platform) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use Semantic Versioning ([SemVer](http://semver.org/)) to manage and track versions. Semantic Versioning uses the format MAJOR.MINOR.PATCH:

MAJOR version when we make incompatible API changes,
MINOR version when we add functionality in a backward-compatible manner, and
PATCH version when we make backward-compatible bug fixes.

The current version of StudySphere is 0.1.0. 
 


## About The Authors
### Alexander Anthis
Hello! I'm a Computer Science student at NAU, and I'm focusing my efforts towards backend software development. I am familiar with C, Python, Rust, and SQL, and I am currently working for NAU as a system administrator  for the university supercomputer.

### Rudra Amin
Hi, I am a computer engineering student at NAY. I am familiar with Python, C, Swift, and machine learning with TensorFlow. I am currently a student tech for the NAU IT. I like sports. I hope to live in New York City one day.

### Jack Lealos
Hi, I am an IGP student studying Software Engineering and German at NAU. I hope to work in formula one later in my career. I love to travel and play games. A few programming languages I am familiar with are C, Java, Python.

### Valentino Valero
Saludos! I'm a Multi-Disciplinary Engineer ( UI/UX Emphasis ) here at NAU. My main specialty is Frontend development so I'll be helping out with UI/UX based things. I'm familiar with C, Python, HTML, Figma, Assembly (Ew), and React. Outside of this project, you can find me working on cars and working with 3D printers for other projects.

### Jadyn Calhoun
Hi! I'm a junior Computer Science student at NAU. I love web development and thinking through complex problems. I enjoy hanging out with friends and making music!

### Daira Santacruz
Hello! Hola and Bonjour tout le monde! I’m a junior double majoring in Computer Science and Modern Languages in French at NAU. I’m currently enrolled in an IGP program at NAU. I am currently a tutor at NAU for Computer Science, Calculus, Statistics and French, I am also a tutor online for the same subjects at Pear Deck Tutor where I tutor students from 1st grade up to college level. I love helping and volunteering. I am hoping to go into research in Computer Science and hopefully go internationally about it. 