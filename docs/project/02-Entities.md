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

