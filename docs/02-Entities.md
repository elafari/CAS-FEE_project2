## Entities / resource types ##
### The following entities are used:
* user
* patient
* disease case
* disease event

### User
* id: Generated ID of the firebase user
* name: user email address
* admin: true/false
* active: true/false

### Patient
* id: Generated ID of the firebase patients table item
* user: foreign key
* name: patient name
* gender: f(emale)/m(ale)
* birthdate: date of birth

### Disease Case
* id: Generated ID of the firebase cases table item
* patient: foreign key
* name: case title
* active: true/false
* startDate: YYYY-MM-DD
* endDate: YYYY-MM-DD 

### Disease Event
* id: Generated ID of the firebase events table item
* case: foreign key
* dateTime: YYYY-MM-DD HH:mm
* type: [Temperature, Medication]
* value

### Admins
* id: user id foreign key
* admin-role: true

## Project-Documentation
- [README.md](https://github.com/elafari/CAS-FEE_project2/blob/master/README.md)
- [docs/01-Architecture.md](https://github.com/elafari/CAS-FEE_project2/blob/master/docs/01-Architecture.md)
- docs/02-Entities.md
- [docs/03-Usage.md](https://github.com/elafari/CAS-FEE_project2/blob/master/docs/03-Usage.md)
- [docs/04-Usertests.md](https://github.com/elafari/CAS-FEE_project2/blob/master/docs/04-Usertests.md)
- [docs/diagrams/*](https://github.com/elafari/CAS-FEE_project2/blob/master/docs/diagrams/)