import {Injectable} from '@angular/core';
import {AuthProviders, AuthMethods} from 'angularfire2';

@Injectable()
export class ConfigService {
  constructor() {
  }

  public static logFlag = true;

  public static mainAdmin = "admin@p2.ch";
  public static loginProcessMsg = "..login process";

  public static linkList = [
    {linkDisplay: "Github", linkURL: "https://github.com/tonikam/fbe14", linkDescription: "Github repository of this project"},
    {linkDisplay: "Prezi", linkURL: "https://prezi.com/hnrfd-o1veb3/disease-diary/", linkDescription: "Project presentation"}
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

    apiKey: "AIzaSyB19VDJA7O6NNpOhKWvOP4cZ4xQ9o9L6cc",
    authDomain: "dd01-8992e.firebaseapp.com",
    databaseURL: "https://dd01-8992e.firebaseio.com",
    storageBucket: "dd01-8992e.appspot.com",
    messagingSenderId: "144059495802"

  };

  public static firebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
  };

  public static firebaseDbConfig = {
    db: "",
    admins: "/admins",
    users: "/users",
    patients: "/patients",
    diseaseCases: "/cases",
    diseaseEvents: "/events"
  };

  public static getEmailRegex() {
    return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|bla|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  };
}
