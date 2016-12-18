## Usage
### Login and Register
- On the very right on the navigation bar you have the two options to login or register a new user account.
  - The `Register` form requires a unique user email address and will also ask you to do so in case you entered a email address which is already in use.
- To check logged in user data click user email address in nav bar
- After you have successfully logged in, you will be automatically forwarded to screen `Patients`

### Prepared user
- As registered user you have no administrative privileges
- With administration privileges you're able to:
   - set administrativ rights to registered users
   - manage all users and their patients

### Handle Patients
- Navigate back to patients screen and use the tab `Patients` to edit or create patients.
- On screen `My Patients` add new patients by clicking the appropriate card
- On screen `Add Patient` fill in name, date of birth and gender and submit with `Add Patient`
- After adding a patient you're back on screen `Patients`
- On patients cards you can `Edit` previously entered data

### Handle Cases of Patients
- You you can open new cases by clicking `Cases`
- On screen `Cases` it's the same logic as that on `Patients`
- You can add cases, case will be immediately active
- After adding a case you can edit the case properties
  - case name, e.g. Grippe
  - case start date
- End date will be set automatically by deactivating case

### Handle Events of Cases
- You can open new events for a case by clicking `Events`
- On screen `Events` you can add events and after adding an event
- You can edit the event properties
  - select event type, e.g. Temperature
  - event value, e.g. 39 Grad
- Event date will be set automatically

### Advanced usage
- As user with administration privileges you can
  - Edit user privileges to grant and retract administration rights
  - List CAS FEE Project data, like github and presentation link
  - List all registered users with their patients (you can delete patients)

### Note for users
- On all edit forms you can delete objects
  - but default is deletion simulation
    - objects will not be deleted
    - deletion information are only logged to console
  - if you uncheck simulation, objects will be deleted in database
    
    ```
    Please note that all depending objects will also be deleted!
    ```

## Project-Documentation

- [README.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/README.md)
- [docs/project/01-Architecture.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/01-Architecture.md)
- [docs/project/02-Entities.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/02-Entities.md)
- docs/project/03-Usage.md
- [docs/project/04-Usertests.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/04-Usertests.md)
- [docs/diagrams/*](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/diagrams/)
