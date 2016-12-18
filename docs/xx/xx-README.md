# DiseaseDiary

A Web Application to track disease related events like fever and medication.

Project prezi presentation: [DiseaseDiary](https://prezi.com/hnrfd-o1veb3/disease-diary/).

## About
When babies or infants contract a disease, they can quickly develop very high temperature. I case of emergency it's important to be able to provide the attending doctor with precise information about the development of the fever and the type and amount of possibliy dispensed medicine. This app lets you track this kind of disease related informations.

## Installation
### Prerequisits
- Node.js v6.6.0 (http://nodejs.org/)
- npm v3.10.7 (https://www.npmjs.com/)

### Checkout from GitHub
- `git clone https://github.com/elafari/DiseaseDiary.git`
- move into project folder `cd ./DiseaseDiary`
- (`git checkout [branchName]` where the current stable branch is **milestone0??**.)

### Install and run

- `npm install`
- `ng serve` the server is up and running on localhost:4200
- Open a browser and navigate to `http://localhost:4200`

#### Troubleshooting
- Port already in use?
- Clear npm cache

## Change log
- version 0.1

## License and author info

Rafael Bamert - [GitHub](https://github.com/elafari)

Toni Kammermeier - [GitHub](https://github.com/tonikam)

## Project Management
See separate files:

- [docs/project/01-Architecture.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/01-Architecture.md)
- [docs/project/02-Entities.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/02-Entities.md)
- [docs/project/03-Firebase-API.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/03-Firebase-API.md)
- [docs/project/04-Usage.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/Usage.md)
- [docs/diagrams/*](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/diagrams/)
- [docs/firebase/*](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/firebase/)


===========
===========

end

===========
===========


- The secound tab `Add` is used to post new articles to .lnk. New articles can only be posted once you have successfully logged in. If you access the `Add` tab without a previous authenification you will be kindly asked to login. 
- To add a new article (i.e. to share a .lnk you love) do the following:
    - go to the tab "Add"
    - fill in the fields
    - If the main lnks does not point to an image, you can put a link to an image into the "image" field. 
    - With the ".lnk it" button, the new entry gets stored.
- Every article can have several comments. The comments can be accessed through the `Show comments`link.
- To write a new comment you have to be authorized. In all other cases you will not see the textfield to write comments.
- Every `Tag` or `Author` is accessible and reduce the search result to articles of the accessed tag or username. The filter will be displayed under the search field and can be removed again by clicking the `cross` next to it.
- Every article can be voted up or down. To use the vote functionallity you have to be logged in (authenificated). Eeach user can only vote once on an article. This is reflected in the UI and also checked on the backend.

## Known limitations
none

## Technology stack

### Backend (has to be revised)
* RESTful HATEOAS driven node.js web-server using web-sockets for price-change propagation
* Event-Sourcing (MongoDB) and CQRS-designed domain-model
* role-based user-model using basic-authentication middleware
* supports http & https protocol-schemes (switch protocols in config.js in the backend, however certs are self-signed, 
so it's just a show-case)

* [**nodejs**](http://www.nodejs.org/) runtime
* [**expressjs**](http://expressjs.com/) server (including some modules) 
* [**socket.io**](http://socket.io/) websocket server
* persistence: own implementation with persistence on the file system (plain json style) 
* security:
    * [**express-jwt**](https://github.com/auth0/express-jwt) for json web token
    * [**bcryptjs**](https://github.com/dcodeIO/bcrypt.js) for encrypting passwords
* [**halson**](https://github.com/seznam/halson) hateoas
* [**log4js**](https://github.com/nomiddlename/log4js-node) logging



###Frontend (has to be revised)
* AngularJS / Bootstrap 4 alpha
* flexbox
* Typescript

- [**boostrap**](https://v4-alpha.getbootstrap.com/ "https://v4-alpha.getbootstrap.com/") for layout and parts of grid functionality
- [**jQuery**](http://jquery.com "http://jquery.com/") for dom manipulations
- [**toaster**](https://github.com/jirikavi/AngularJS-Toaster "https://github.com/jirikavi/AngularJS-Toaster") for notifications.
- [**ngAnimate**](https://docs.angularjs.org/api/ngAnimate "https://docs.angularjs.org/api/ngAnimate") for animations.
- [**font awesome**](http://fortawesome.github.io/Font-Awesome/ "http://fortawesome.github.io/Font-Awesome/") as icon font.
- [**less**](http://lesscss.org/ "http://lesscss.org/") for styling.
- and some others...

### Tools (has to be revised)
* [**npm**](https://www.npmjs.org/ "https://www.npmjs.org/") as taskrunner.
* [**angular-cli**](https://cli.angular.io/ "https://cli.angular.io/") command line interface for Angular
* unit tests:
    * [**mocha**](http://mochajs.org/ "http://mochajs.org/") testrunner
    * [**chai**](http://chaijs.com/) with bdd style [expect](http://chaijs.com/api/bdd/) assertion library
    * [**sinon**](http://sinonjs.org/) mocking / spies
    * [**istanbul**](https://github.com/gotwarlost/istanbul) coverage reporting

##How to set up the dev environment (has to be revised)

###Install dependencies & build:
* `npm install` (this will install and build the system )

###Start server
* `ng serve` to start the server
* open localhost:4200

#### Build server
* `npm start-build` to start the server
* `npm run start-build-dev` to start the server with a default set of data
* open localhost:3000 

### Run tests
#### all
* `npm test`

#### server
* `npm run test-server` 

this will run all integration tests based on mocha

#### front-end unit
* `npm run test-unit` 

this will run all unit tests for the front-end based on mocha and karma as test runner

#### front-end midway
* `npm run test-midway`

this will run all midway tests for the front-end based on mocha and karma as test runner

#### e2e
* `npm run test-e2e`

end-to-end testing with protractor

### ...gulp (has to be revised)

*   dev.appOpen        --> open the browser with the start page of the app
*   dev.inject.index   --> inject the dependencies into the index.html
*   dev.fe.less        --> compile all less files into the tb.css  
*   start.server       --> start the server (npm start)
*   start.server.dev   --> start the server in dev mode (npm run start-dev)
*   start.server.build --> start the server in dev mode (npm run start-dev)
*   test.e2e           --> start e2e test with protractor
*   test.unit          --> start unit test with karma
*   test.midway        --> start midway test with karma
*   build.all          --> inject/minify/uglify and copy the file into the build folder
*   build.fe           --> build the front-end
*   build.server       --> build the server
*   default            --> start.server/dev.appOpen

##Change log
- version 0.1

##Known Issues
###Backend
  * only "core" functionality is automatically tested
  * server-side validation (pre-condition/business rule testing) is only implemented for drink creation and user creation 

###Frontend
* no table-sorting features
* error handling, i.e. messages are not really top-notch
* some code duplication in db-items
* focus-handling not perfect, e.g. no focus transferal to fomrs when clicking "edit"
* only tested with chrome (FF works OK, but focus handling is not done the same way)
* currently credentials are stored in LocalStore und are not timedout -> should switch to cookies or something similar

##License and author info

Rafael Bamert - [GitHub](https://github.com/elafari)

Toni Kammermeier - [GitHub](https://github.com/tonikam)

## Project Management
See separate files:

- docs/project/Architecture.md
- docs/project/Entities.md
- docs/project/API.md
- docs/project/Features.md
- docs/project/ToDo.md
- docs/diagrams/*
- docs/mockups/*
