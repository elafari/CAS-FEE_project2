import { Injectable } from "@angular/core";

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";
import logWrap from "../log/logWrap.decorator";

import { ConfigService } from "./config.service";

@Injectable()
export class DataService {

  DbAdmins: string;
  DbUsers: string;
  DbPatients: string;
  DbCases: string;
  DbEvents: string;

  diseaseCases: any;
  allCasesObj: Observable<any>;

  constructor(private af: AngularFire,
              private errorHandler: ErrorHandlerService,
              private logger: LoggerService
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

  @logWrap
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

  @logWrap
  updatePatient(patientKey,key_value) {
    let patient = this.getPatient(patientKey);
    patient.update(key_value);
  };

  createPatient(key_value) {
    this.af.database.list(String(this.DbPatients)).push(key_value);
  };

  deletePatient(patientKey) {
    let patients = this.af.database.list(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.patients);
    //patients.remove(patientKey);
    console.log("Lösche Patient: " + patientKey);

    let queryDefinition = {};
    queryDefinition = {query: {orderByChild: 'patient',equalTo: patientKey}};

    this.allCasesObj = this.af.database.list(String(this.DbCases), queryDefinition)
      .map((allCases) => {
        for (let item of allCases){
          console.log("item: " + item)
        }
        return allCases;
      });


    /*
    // delete patients diseaseCases and their diseaseEvents
    this.diseaseCases = this.getAllCasesAndEvents(patientKey);
    console.log("cases: " +  this.diseaseCases);
    for (let itemCase of this.diseaseCases) {
      console.log("case: " + itemCase.name);
      for (let itemEvent of itemCase.diseaseEvents) {
        console.log("event: " + itemEvent.name);
      }
    }

    */

    //this.diseaseCases.map((diseaseCase) => {

      //console.log("diseaseCase: " + diseaseCase);
      //let allDiseaseCases = this.af.database.list(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.diseaseCases);

      //console.log("remove diseaseCase: " + diseaseCase);
      //allDiseaseCases.remove(diseaseCase.$key);

      /*
        console.log("itemCase.name: " + itemCase.name + " - " + itemCase.$key);
        this.allDiseaseEvents = this.af.database.list(String(this.DbEvents));
        for (let itemEvent of itemCase.diseaseEvents) {
          console.log("itemEvent.name: " + itemEvent.name + " - " + itemEvent.$key);
          //allDiseaseEvents.remove(itemEvent.$key);
        }
        //allDiseaseCases.remove(itemCase.$key);
      */

    //});
  };

  getAllCasesAndEvents(patientKey) {
    let queryDefinitionCases = {};
    queryDefinitionCases = {query: {orderByChild: 'patient',equalTo: patientKey}};
    return this.af.database.list(String(this.DbCases), queryDefinitionCases)
      .map((allCases) => {
        return allCases.map((diseaseCase) => {
          let queryDefinitionEvents = {};
          queryDefinitionEvents = {query: {orderByChild: 'user',equalTo: diseaseCase.$key}};
          diseaseCase.diseaseEvents = this.af.database.list(String(this.DbPatients), queryDefinitionEvents)
          return diseaseCase;
        });
      });
  };

  getPatients(userKey) {

    let queryDefinition = {};
    queryDefinition = {query: {orderByChild: 'user',equalTo: userKey}};

    return this.af.database.list(String(this.DbPatients), queryDefinition)
        .map((allPatients) => {
          return allPatients;
        });
   };


  // Disease Cases + + + + + + + + + + + + + + +


  getDiseaseCase(diseaseCaseKey) {
    return this.af.database.object(String(this.DbCases) + '/' + diseaseCaseKey);
  };

  @logWrap
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

  @logWrap
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
