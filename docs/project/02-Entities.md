## Entities / resource types ##
### The following entities are used:
* user
* patient
* disease case
* disease event

### User
* id: Generated ID of the firebase user
* name:
* admin: user type

### Patient
* id: Generated ID of the firebase patients table item
* name: user email address
* gender: f(emale)/m(ale)
* birthdate: date of birth

### Disease Case
* id: Generated ID of the firebase cases table item
* patient: patient id
* name:
* type:
* active: true/false

### Disease Event
* id: Generated ID of the firebase events table item
* case: case id
* name:
* value:

### Admins
* id: user id
* admin-role: true

## Project-Documentation

- [README.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/README.md)
- [docs/project/01-Architecture.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/01-Architecture.md)
- docs/project/02-Entities.md
- [docs/project/03-Firebase-API.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/03-Firebase-API.md)
- [docs/project/04-Usage.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/04-Usage.md)
- [docs/diagrams/*](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/diagrams/)
- [docs/firebase/*](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/firebase/)
