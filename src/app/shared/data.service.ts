import { Injectable } from "@angular/core";

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/map';

import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";
import { ConfigService } from "./config.service";
import logWrap from "../log/logWrap.decorator";
import Promise = firebase.Promise;
import * as moment from "moment";

@Injectable()
export class DataService {

    DbAdmins: string;
    DbUsers: string;
    DbPatients: string;
    DbCases: string;
    DbEvents: string;

    userSubscription: Subscription;

    subscriptionList: Array<any>;

    constructor(private af: AngularFire,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
        this.DbAdmins = ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.admins;
        this.DbUsers = ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users;
        this.DbPatients = ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.patients;
        this.DbCases = ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.diseaseCases;
        this.DbEvents = ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.diseaseEvents;

        this.subscriptionList = new Array;
    };

    // Users + + + + + + + + + + + + + + +

    setUserAdminRole(userKey: string) {
        try {
            this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.admins + '/' + userKey).set({adminRole: true});
        } catch (e) {
            this.errorHandler.traceError("[dataService] - setUserAdminRole - error", e, true);
        }
    };

    removeUserAdminRole(userKey: string) {
        try {
            let admins = this.af.database.list(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.admins);
            admins.remove(userKey);
        } catch (e) {
            this.errorHandler.traceError("[dataService] - removeUserAdminRole - error", e, true);
        }
    };

    createUser(uid: string, email: string) {
        try {
            this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + uid).set({
                name  : email,
                admin : false,
                active: true
            });
        } catch (e) {
            this.errorHandler.traceError("[dataService] - createUser - error", e, true);
        }
    };

    getUser(userKey: string): FirebaseObjectObservable<any> {
        try {
            return this.af.database.object(String(this.DbUsers) + '/' + userKey);
        } catch (e) {
            this.errorHandler.traceError("[dataService] - getUser - error", e, true);
        }
    };

    @logWrap
    updateUser(userKey: string, key_value: any) {
        try {
            let user = this.getUser(userKey);
            user.update(key_value);
        } catch (e) {
            this.errorHandler.traceError("[dataService] - updateUser - error", e, true);
        }
    };

    deleteUser(userKey: string, simulate: boolean = true) {
        try {
            // don't delete a user, only set active to false
            if (!simulate) {
                let key_value = {'admin': false, 'active': false};
                this.updateUser(userKey, key_value);
            }
            /* todo: this would delete the user in custom user table, but not the firebase auth user
             angularfire2 doesn't yet offer a method to delete or deactivate an firebase auth user
             let users = this.af.database.list(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users);
             this.logger.info("[dataService] - deleteUser - user: " + userKey + " - simulation: " + simulate);
             if (!simulate) {
             users.remove(userKey);
             }
             */

            let queryDefinitionPatients = {query: {orderByChild: 'user', equalTo: userKey}, preserveSnapshot: true};
            let allQueriedPatients = this.af.database.list(String(this.DbPatients), queryDefinitionPatients);
            allQueriedPatients
                .subscribe(dPatients => {
                    dPatients.forEach(dPatient => {
                        this.deletePatient(dPatient.key, simulate);
                    });
                });
        } catch (e) {
            this.errorHandler.traceError("[dataService] - deleteUser - error", e, true);
        }
    };

    getUserList(): FirebaseListObservable<any[]> {
        try {
            let queryDefinition = {query: {orderByChild: 'name'}};
            return this.af.database.list(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users, queryDefinition);
        } catch (e) {
            this.errorHandler.traceError("[dataService] - getUserList - error", e, true);
        }
    };

    getAllUsersAndPatients(): Observable<any[]> {
        try {
            let queryDefinitionUsers = {query: {orderByKey: true}};
            return this.af.database.list(String(this.DbUsers), queryDefinitionUsers)
                .map((allUsers) => {
                    return allUsers.map((user) => {
                        let queryDefinitionPatients = {};
                        queryDefinitionPatients = {query: {orderByChild: 'user', equalTo: user.$key}};
                        user.patients = this.af.database.list(String(this.DbPatients), queryDefinitionPatients)
                        return user;
                    });
                });
        } catch (e) {
            this.errorHandler.traceError("[dataService] - getAllUsersAndPatients - error", e, true);
        }
    };

    // Patients + + + + + + + + + + + + + + +

    getPatient(patientKey: string) {
        try {
            return this.af.database.object(String(this.DbPatients) + '/' + patientKey);
        } catch (e) {
            this.errorHandler.traceError("[dataService] - getPatient - error", e, true);
        }
    };

    @logWrap
    updatePatient(patientKey: string, key_value: any) {
        try {
            let patient = this.getPatient(patientKey);
            key_value.birthdate = this.toBackendDateStr(key_value.birthdate);
            patient.update(key_value);
        } catch (e) {
            this.errorHandler.traceError("[dataService] - updatePatient - error", e, true);
        }
    };

    createPatient(key_value: any) {
        try {
            key_value.birthdate = this.toBackendDateStr(key_value.birthdate);
            this.af.database.list(String(this.DbPatients)).push(key_value);
        } catch (e) {
            this.errorHandler.traceError("[dataService] - createPatient - error", e, true);
        }
    };

    deletePatient(patientKey: string, simulate: boolean = true) {
        try {
            let patients = this.af.database.list(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.patients);
            this.logger.info("[dataService] - deletePatient - patient: " + patientKey + " - simulation: " + simulate);
            if (!simulate) {
                patients.remove(patientKey);
            }
            let queryDefinitionCases = {query: {orderByChild: 'patient', equalTo: patientKey}, preserveSnapshot: true};
            let allQueriedDiseaseCases = this.af.database.list(String(this.DbCases), queryDefinitionCases);
            allQueriedDiseaseCases
                .subscribe(dCases => {
                    dCases.forEach(dCase => {
                        this.deleteDiseaseCase(dCase.key, simulate);
                    });
                });
        } catch (e) {
            this.errorHandler.traceError("[dataService] - deletePatient - error", e, true);
        }
    };

    getPatients(userKey: string): Observable<any[]> {
        try {
            let queryDefinition = {query: {orderByChild: 'user', equalTo: userKey}};
            return this.af.database.list(String(this.DbPatients), queryDefinition)
                .map((allPatients) => {
                    return allPatients;
                });
        } catch (e) {
            this.errorHandler.traceError("[dataService] - getPatients - error", e, true);
        }
    };

    // Disease Cases + + + + + + + + + + + + + + +

    getDiseaseCase(diseaseCaseKey: string): FirebaseObjectObservable<any> {
        try {
            return this.af.database.object(String(this.DbCases) + '/' + diseaseCaseKey);
        } catch (e) {
            this.errorHandler.traceError("[dataService] - getDiseaseCase - error", e, true);
        }
    };

    @logWrap
    updateDiseaseCase(diseaseCaseKey: string, key_value: any) {
        try {
            // an existing startDate is not part of key_value when the form control is disabled
            if (key_value.startDate) {
                key_value.startDate = this.toBackendDateStrFromStr(key_value.startDate);
            }

            key_value.endDate = key_value.active ? '' : this.getBackendDateStr();

            let diseaseCase = this.getDiseaseCase(diseaseCaseKey);
            diseaseCase.update(key_value);
        } catch (e) {
            this.errorHandler.traceError("[dataService] - updateDiseaseCase - error", e, true);
        }
    };

    createDiseaseCase(key_value: any): Promise<any> {
        try {
            key_value.startDate = this.toBackendDateStr(key_value.startDate);
            return this.af.database.list(String(this.DbCases)).push(key_value);
        } catch (e) {
            this.errorHandler.traceError("[dataService] - createDiseaseCase - error", e, true);
        }
    };

    deleteDiseaseCase(diseaseCaseKey: string, simulate: boolean = true) {
        try {
            let diseaseCases = this.af.database.list(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.diseaseCases);
            this.logger.info("[dataService] - deleteDiseaseCase - diseaseCase: " + diseaseCaseKey + " - simulation: " + simulate);
            if (!simulate) {
                diseaseCases.remove(diseaseCaseKey);
            }
            let queryDefinitionEvents = {
                query           : {orderByChild: 'case', equalTo: diseaseCaseKey},
                preserveSnapshot: true
            };
            let allQueriedDiseaseEvents = this.af.database.list(String(this.DbEvents), queryDefinitionEvents);
            allQueriedDiseaseEvents
                .subscribe(dEvents => {
                    dEvents.forEach(dEvent => {
                        this.deleteDiseaseEvent(dEvent.key, simulate);
                    });
                });
        } catch (e) {
            this.errorHandler.traceError("[dataService] - deleteDiseaseCase - error", e, true);
        }
    };

    getDiseaseCases(patientKey: string): Observable<any[]> {
        try {
            let queryDefinition = {query: {orderByChild: 'patient', equalTo: patientKey}};
            return this.af.database.list(String(this.DbCases), queryDefinition)
                .map((allCases) => {
                    return allCases;
                });
        } catch (e) {
            this.errorHandler.traceError("[dataService] - getDiseaseCases - error", e, true);
        }
    };

    // Disease Events + + + + + + + + + + + + + + +

    getDiseaseEvent(diseaseEventKey: string): FirebaseObjectObservable<any> {
        try {
            return this.af.database.object(String(this.DbEvents) + '/' + diseaseEventKey);
        } catch (e) {
            this.errorHandler.traceError("[dataService] - getDiseaseEvent - error", e, true);
        }
    };

    @logWrap
    updateDiseaseEvent(diseaseEventKey: string, key_value: any) {
        try {
            let diseaseEvent = this.getDiseaseEvent(diseaseEventKey);
            key_value.dateTime = this.toBackendDateStr(key_value.dateTime, true);
            diseaseEvent.update(key_value);
        } catch (e) {
            this.errorHandler.traceError("[dataService] - updateDiseaseEvent - error", e, true);
        }
    };

    createDiseaseEvent(key_value: any) {
        try {
            key_value.dateTime = this.toBackendDateStr(key_value.dateTime, true);
            this.af.database.list(String(this.DbEvents)).push(key_value);
        } catch (e) {
            this.errorHandler.traceError("[dataService] - createDiseaseEvent - error", e, true);
        }
    };

    deleteDiseaseEvent(diseaseEventKey: string, simulate: boolean = true) {
        try {
            let diseaseEvents = this.af.database.list(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.diseaseEvents);
            this.logger.info("[dataService] - deleteDiseaseEvent - diseaseEvent: " + diseaseEventKey + " - simulation: " + simulate);
            if (!simulate) {
                diseaseEvents.remove(diseaseEventKey);
            }
        } catch (e) {
            this.errorHandler.traceError("[dataService] - deleteDiseaseEvent - error", e, true);
        }
    };

    getDiseaseEvents(diseaseCaseKey: string): Observable<any[]> {
        try {
            let queryDefinition = {
                query: {
                    orderByChild: 'caseKey',
                    equalTo     : diseaseCaseKey
                }
            };
            return this.af.database.list(String(this.DbEvents), queryDefinition)
                .map((allEvents) => {
                    const key = 'dateTime';
                    allEvents.sort(
                        (a, b) => {
                            if (a[key] < b[key]) return -1;
                            if (a[key] > b[key]) return 1;
                            return 0;
                        }
                    );
                    return allEvents;
                });
        } catch (e) {
            this.errorHandler.traceError("[dataService] - getDiseaseEvents - error", e, true);
        }
    };

    // Subscriptions + + + + + + + + + + + + + + +

    addSubscripton(subscrObj: Subscription) {
        this.subscriptionList.push({"subObj": subscrObj});
    };

    removeSubscriptions() {
        if (this.subscriptionList) {
            for (let item of this.subscriptionList) {
                if (item.subObj) {
                    item.subObj.unsubscribe();
                }
            }
        }
    };

    // Helpers + + + + + + + + + + + + + + +

    toBackendDateStr(date: Date, getTime: boolean = false): string {
        return getTime ? moment(date).format('YYYY-MM-DD HH:mm') : moment(date).format('YYYY-MM-DD');
    };

    toBackendDateStrFromStr(date: string): string {
        return date ? date.substr(6, 4) + "-" + date.substr(3, 2) + "-" + date.substr(0, 2) : '';
    };

    toFrontendDateStr(dateStr: string): string {
        return (dateStr) ? dateStr.substr(8, 2) + "." + dateStr.substr(5, 2) + "." + dateStr.substr(0, 4) : '';
    };

    getBackendDateStr(): string {
        return new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    };
}
