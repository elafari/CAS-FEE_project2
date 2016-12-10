## Usage
### Login and Register
- On the very right on the navigation bar you have the two options to login or register a new user account.
  - The `Register` form requires a unique user email address and will also ask you to do so in case you entered a email address which is already in use.
- To check logged in user data click user email address in nav bar
- After you have successfully logged in, you will be automatically forwarded to screen `Patients`

### Handle Patients
- Navigate back to patients screen and use the tab `Patients` to edit or create patients.
- On screen `My Patients` add new patients by clicking the appropriate card
- On screen `Add Patient` fill in name, date of birth and gender and submit with `Add Patient`
- After adding a patient you're back on screen `Patients`
- On patients cards you can `Edit` previously entered data

### Handle Cases of Patients
- You you can open new cases by clicking `Cases`
- On screen `Cases` it's the same logic as that on `Patients`
- You can add cases and after adding a case
- You can edit the case properties
  - case name, e.g. Grippe, Mittelohrentzündung
  - case type, e.g. Temperatur, Medikation

### Handle Events of Cases
- You can open new events for a case by clicking `Events`
- On screen `Events` you can add events and after adding an event
- You can edit the event properties
  - event name, e.g. Temperatur
  - event value, e.g. 39 Grad

### Advanced usage
- As user with administration privileges you can
  - Edit user privileges to grant and retract administration rights
  - List CAS FEE Project data, like github and presentation link
  - List all registered users with their patients list

### Note for users
- On all edit forms you can delete objects
  - but default is deletion simulation
  - deletion information are only logged in console
  - if you uncheck simulation, objects will be deleted in database
    
    ```
    Please note that all depending objects will also be deleted!
    ```

## Project-Documentation

- [README.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/README.md)
- [docs/project/01-Architecture.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/01-Architecture.md)
- [docs/project/02-Entities.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/02-Entities.md)
- [docs/project/03-Firebase-API.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/03-Firebase-API.md)
- docs/project/04-Usage.md
- [docs/diagrams/*](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/diagrams/)
- [docs/firebase/*](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/firebase/)
