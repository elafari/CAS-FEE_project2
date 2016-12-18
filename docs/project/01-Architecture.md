## Application architecture and design

### Angular 2 Features
- router loadChildren `lazy loading` (-> see also Application)
- router events for creating breadcrumbs (e.g. breadcrumb.component.ts)
- router CanActivate (authentication test)
- observables and subscriptions (see also angularfire2)
- observable subjects (e.g. auth.service.ts with BehaviorSubject)
- using service in service: @Injectable decorator (e.g. data.service.ts)
- using own decorators (e.g. log decorator @logWrap in data.service.ts)
- using structure directives for modal dialogs (add and remove DOM elements, e.g. edit components)

### Database: Firebase
[firebase.google.com](https://firebase.google.com/)
- [angularfire2](https://angularfire2.com/api/) library
- realtime connection via observables (FirebaseListObservable, FirebaseObjectObservable)
- authentication via email/password (for test purposes: without email confirmation)
- users can register via disease diary application

### Application
- modularization (modules: error, log, auth, userAdmin, breadcrumb and lazy loaded modules)
- router lazyloading for every routing level (+users, +patients, +diseaseCases, +diseaseEvents)
- services (authentication-, config-, data- and breadcrumb services)

### Error handling and logging
- error handler module: catch error and delegate to error display handler, error logging and optional route to home
- log module: custom console log service (overriding console log colors with own configuration)

### Unit test
- unit tests (example app/test with async service provider tests)

### Source Documentation
- [typedoc](http://typedoc.org/)

    ```
    npm run createdoc
    open ./app-doc/globals.html
    ```
    
    Because of some open issues (see [typedoc issues](https://github.com/TypeStrong/typedoc/issues)) the version 0.5.1 and option --ignoreCompilerErrors is important (see typedoc.json)

## Project-Documentation

- [README.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/README.md)
- docs/project/01-Architecture.md
- [docs/project/02-Entities.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/02-Entities.md)
- [docs/project/03-Usage.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/03-Usage.md)
- [docs/diagrams/*](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/diagrams/)
