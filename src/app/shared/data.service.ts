import { Injectable } from "@angular/core";

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { ConfigService } from "./config.service";
import { LogService } from "./log.service";

@Injectable()
export class DataService {

  DbAdmins: String;
  DbUsers: String;
  DbPatients: String;
  DbCases: String;
  DbEvents: String;

  constructor(private af: AngularFire,
              private logService: LogService
  ) {
    this.DbAdmins = ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.admins;
    this.DbUsers = ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users;
    this.DbPatients = ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.patients;
    this.DbCases = ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.diseaseCases;
    this.DbEvents = ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.diseaseEvents;
  };

  // Users + + + + + + + + + + + + + + +

  setUserAdminRole(userKey) {
    this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.admins + '/' + userKey).set({adminRole: true});
  };
  removeUserAdminRole(userKey) {
    try {
      let admins = this.af.database.list(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.admins);
      admins.remove(userKey);
    } catch(e) {
      // user not found
    }
  };

  getUser(userKey) {
    return this.af.database.object(String(this.DbUsers) + '/' + userKey);
  };

  updateUser(userKey, key_value) {
    let user = this.getUser(userKey);
    user.update(key_value);
  };

  deleteUser(userKey) {
    let users = this.af.database.list(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users);
    users.remove(userKey);
  };

  getUserList() {
    let queryDefinition = {};
    queryDefinition = {query: {orderByChild: 'name'}};
    return this.af.database.list(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users, queryDefinition);
  };

  getAllUsersAndPatients() {
    let queryDefinitionUsers = {};
    queryDefinitionUsers = {query: {orderByKey: true}};

    return this.af.database.list(String(this.DbUsers), queryDefinitionUsers)
      .map((allUsers) => {
        return allUsers.map((user) => {
          let queryDefinitionPatients = {};
          queryDefinitionPatients = {query: {orderByChild: 'user',equalTo: user.$key}};
          user.patients = this.af.database.list(String(this.DbPatients), queryDefinitionPatients)
          return user;
        });
      });
  };


  // Patients + + + + + + + + + + + + + + +


  getPatient(patientKey) {
    return this.af.database.object(String(this.DbPatients) + '/' + patientKey);
  };

  updatePatient(patientKey,key_value) {
    let patient = this.getPatient(patientKey);
    patient.update(key_value);
  };

  createPatient(key_value) {
    this.af.database.list(String(this.DbPatients)).push(key_value);
  };

  deletePatient(patientKey) {
    let patients = this.af.database.list(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.patients);
    patients.remove(patientKey);
  };

  getPatients(userKey) {

    let queryDefinition = {};
    queryDefinition = {query: {orderByChild: 'user',equalTo: userKey}};
    this.logService.logConsole("dataService", "getPatients - this.DbPatients", this.DbPatients);

    return this.af.database.list(String(this.DbPatients), queryDefinition)
        .map((allPatients) => {
          this.logService.logConsole("dataService", "getPatients - allPatients", allPatients);
          return allPatients;
        });
   };


  // Disease Cases + + + + + + + + + + + + + + +


  getDiseaseCase(diseaseCaseKey) {
    return this.af.database.object(String(this.DbCases) + '/' + diseaseCaseKey);
  };

  updateDiseaseCase(diseaseCaseKey,key_value) {
    let diseaseCase = this.getDiseaseCase(diseaseCaseKey);
    diseaseCase.update(key_value);
  };

  createDiseaseCase(key_value) {
    this.af.database.list(String(this.DbCases)).push(key_value);
  };

  deleteDiseaseCase(diseaseCaseKey) {
    let diseaseCases = this.af.database.list(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.diseaseCases);
    diseaseCases.remove(diseaseCaseKey);
  };

  getDiseaseCases(patientKey) {
    let queryDefinition = {};
    queryDefinition = {query: {orderByChild: 'patient',equalTo: patientKey}};

    return this.af.database.list(String(this.DbCases), queryDefinition)
      .map((allCases) => {
        return allCases;
      });
  };

  // Disease Events + + + + + + + + + + + + + + +

  getDiseaseEvent(diseaseEventKey) {
    return this.af.database.object(String(this.DbEvents) + '/' + diseaseEventKey);
  };

  updateDiseaseEvent(diseaseEventKey,key_value) {
    let diseaseEvent = this.getDiseaseEvent(diseaseEventKey);
    diseaseEvent.update(key_value);
  };

  createDiseaseEvent(key_value) {
    this.af.database.list(String(this.DbEvents)).push(key_value);
  };

  deleteDiseaseEvent(diseaseEventKey) {
    let diseaseEvents = this.af.database.list(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.diseaseEvents);
    diseaseEvents.remove(diseaseEventKey);
  };

  getDiseaseEvents(diseaseCaseKey) {
    let queryDefinition = {};
    queryDefinition = {query: {orderByChild: 'case',equalTo: diseaseCaseKey}};

    return this.af.database.list(String(this.DbEvents), queryDefinition)
      .map((allEvents) => {
        return allEvents;
      });
  };
}
