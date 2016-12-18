import { Injectable } from '@angular/core';
import { AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class ConfigService {
    constructor() {
    }

    public static devMode = true;

    public static mainAdmin = "admin@p2.ch";
    public static loginProcessMsg = "processing..";
    public static loginDeactivatedMsg = "Account deactivated, please contact Admin";

    public static linkList = [
        {
            linkDisplay    : "Github",
            linkURL        : "https://github.com/elafari/CAS-FEE_project2",
            linkDescription: "Github repository of this project"
        }
    ];

    public static firebaseConfig = {

        // database: diseaseDiary - production database
        /*
         apiKey: "AIzaSyCL6uu79mCavxxu7LlJMUDat5L9e1VcloM",
         authDomain: "diseasediary-99d4e.firebaseapp.com",
         databaseURL: "https://diseasediary-99d4e.firebaseio.com",
         storageBucket: "diseasediary-99d4e.appspot.com",
         messagingSenderId: "413669303856"
         */

        // database: dd01 - test database with new structure and deletion tests

        apiKey           : "AIzaSyB19VDJA7O6NNpOhKWvOP4cZ4xQ9o9L6cc",
        authDomain       : "dd01-8992e.firebaseapp.com",
        databaseURL      : "https://dd01-8992e.firebaseio.com",
        storageBucket    : "dd01-8992e.appspot.com",
        messagingSenderId: "144059495802"

    };

    public static firebaseAuthConfig = {
        provider: AuthProviders.Password,
        method  : AuthMethods.Password
    };

    public static firebaseDbConfig = {
        db           : "",
        admins       : "/admins",
        users        : "/users",
        patients     : "/patients",
        diseaseCases : "/cases",
        diseaseEvents: "/events"
    };

    public static getEmailRegex() {
        return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|bla|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    };

    // color list for console log information
    public static colorList = {
        "warn" : "color: green; background-color:yellow",
        "error": "color: white; background-color:red",
        "info" : "color: white; background-color:blue"
    };

    // message for dialogs
    public static msgList = {
        "user-admin-1"        : "Are you sure to disable this user?",
        "user-admin-2"        : "All patients, cases and events of this user will be deleted!",
        "patients-edit-1"     : "Are you sure to delete this patient?",
        "patients-edit-2"     : "All cases and events of this patient will also be deleted!",
        "diseaseCases-edit-1" : "Are you sure to delete this disease case?",
        "diseaseCases-edit-2" : "All events of this case will also be deleted!",
        "diseaseEvents-edit-1": "Are you sure to delete this event?",
        "simulation"          : "Simulation (no object deletion, only log delete information in console)"
    };

    private static _gender = [
        {
            key : 'm',
            text: 'Boy'
        },
        {
            key : 'f',
            text: 'Girl'
        }
    ];

    public static getGender() {
        return this._gender;
    };

    private static _eventType = [
        {
            key : 'Medication',
            text: 'Medication'
        },
        {
            key : 'Temperature',
            text: 'Temperature'
        }
    ];

    public static getEventType() {
        return this._eventType;
    };
}
