## Application architecture and design

###Angular 2 Features
- router loadChildren `lazy loading` (e.g. app.routing.ts, patients.routing.ts)
- router events for creating breadcrumbs (e.g. breadcrumb.component.ts)
- observables and subscriptions (see also angularfire2)
- observable subjects (e.g. logged-in-user.service.ts with BehaviorSubject)
- use service in service: @Injectable decorator (e.g. data.service.ts)
- use own decorators (e.g. log decorator logWrap in data.service.ts)

###Database Firebase (see also doc sub directory firebase)
- angularfire2 library
- email authentication
- observables (FirebaseListObservable, FirebaseObjectObservable)

###Application
- modularization (e.g. error, log, auth, userAdmin, breadcrumb)
- router lazyloading (e.g. +users, +patients, +diseaseCases)
- sub-routing (e.g. app.routing.ts, patients.routing.ts)

###Error handling and logging
- error handler module: catch error and delegate to error display handler, error logging and optional route to home
- log module: custom console log service

###Source Documentation
- [typedoc](http://typedoc.org/)

    ```
    npm run createdoc
    open ./app-doc/globals.html
    ```
    
    Because of some open issues (see [typedoc issues](https://github.com/TypeStrong/typedoc/issues)) the version 0.5.1 and option --ignoreCompilerErrors is important (see typedoc.json)

###ToDo
##### "auth reload"
- in situation of non lazyloaded routes, reload ended up in intermittent re-routes to login page.
  - Workaround: we use angularfire auth object to check if user is logged in
  - but we should use our user$ behavior subject to check login and try to solve this with a resolver

##### "disabled user"
- disabled users didn't get an error message after trying to log in
  - current solution functions well to restrain disabled user to login, but unfortunately without an error in client dialog
  - we should also try to solve this with a resolver



## Project-Documentation

- [README.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/README.md)
- docs/project/01-Architecture.md
- [docs/project/02-Entities.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/02-Entities.md)
- [docs/project/03-Firebase-API.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/03-Firebase-API.md)
- [docs/project/04-Usage.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/04-Usage.md)
- [docs/diagrams/*](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/diagrams/)
- [docs/firebase/*](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/firebase/)
