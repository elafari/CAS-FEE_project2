# DiseaseDiary
A Web Application to track disease related events like fever and medication.

## About
When babies or infants contract a disease, they can quickly develop very high temperature. I case of emergency it's important to be able to provide the attending doctor with precise information about the development of the fever and the type and amount of possibliy dispensed medicine. This app lets you track this kind of disease related informations.

## Installation
### Prerequisits
- Node.js v6.x (http://nodejs.org/)
- npm v3.x (https://www.npmjs.com/)

### Install and run
- `git clone https://github.com/elafari/CAS-FEE_project2.git`
- move into project folder
- `npm install`
- `ng serve` the server is up and running on localhost:4200
- Open a browser and navigate to `http://localhost:4200`

### Run tests
- `npm test`

## Technology stack
### Frontend
- [**Angular2**](https://angular.io/ "https://angular.io/")
- [**Typescript**](https://www.typescriptlang.org/ "https://www.typescriptlang.org/")
- [**Bootstrap 4 alpha**](https://v4-alpha.getbootstrap.com/ "https://v4-alpha.getbootstrap.com/") responsive grid layout, navigation, cards
- [**flexbox**](http://v4-alpha.getbootstrap.com/layout/flexbox-grid/ "http://v4-alpha.getbootstrap.com/layout/flexbox-grid/")
- [**font awesome**](http://fortawesome.github.io/Font-Awesome/ "http://fortawesome.github.io/Font-Awesome/") as icon font.
- [**SASS**](http://sass-lang.com/ "http://sass-lang.com/") CSS preprocessor
- [**moment.js**](http://momentjs.com/ "http://momentjs.com/docs/") date manipulation
- [**primeNG**](http://www.primefaces.org/primeng "http://www.primefaces.org/primeng/#/") datepicker component
- and some others...

### Backend
- [**Firebase**](https://www.firebase.com/ "https://www.firebase.com/") Realtime database (backend as a service)

### Tools
- [**npm**](https://www.npmjs.org/ "https://www.npmjs.org/") as taskrunner.
- [**angular-cli**](https://cli.angular.io/ "https://cli.angular.io/") command line interface for Angular 2
- [**typedoc**](http://typedoc.org/ "http://typedoc.org/") generates code documentation

## Known Issues / To Do
### Frontend
- datepicker gets cropped when screen height is to low
- disabled users can still login but have no permissions (because firebase SDK won't let you deactivate a user)
  - extend auth.guard to check user parameter 'active'
- error should not be part of the user object
- see [user tests](https://github.com/elafari/CAS-FEE_project2/blob/master/docs/04-Usertests.md)

### Backend
- Activate E-Mail confirmation
- Implement password reset workflow
- Generate Firebase DB structure automatically for fresh installations
- Automated Tests for Firebase Security Rules

## Authors
Rafael Bamert - [GitHub](https://github.com/elafari)

Toni Kammermeier - [GitHub](https://github.com/tonikam)

## Project Management
See separate files:
- [docs/01-Architecture.md](https://github.com/elafari/CAS-FEE_project2/blob/master/docs/01-Architecture.md)
- [docs/02-Entities.md](https://github.com/elafari/CAS-FEE_project2/blob/master/docs/02-Entities.md)
- [docs/03-Usage.md](https://github.com/elafari/CAS-FEE_project2/blob/master/docs/03-Usage.md)
- [docs/04-Usertests.md](https://github.com/elafari/CAS-FEE_project2/blob/master/docs/04-Usertests.md)
- [docs/diagrams/*](https://github.com/elafari/CAS-FEE_project2/blob/master/docs/diagrams/)
