## Application architecture and design

###Angular 2 Features
- router loadChildren (e.g. app.routing.ts, patients.routing.ts)
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

