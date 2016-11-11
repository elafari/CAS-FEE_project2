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
    {linkDisplay: "Github", linkURL: "https://github.com/elafari/CAS-FEE_project2", linkDescription: "Github repository of this project"},
    {linkDisplay: "Prezi", linkURL: "https://prezi.com/hnrfd-o1veb3/disease-diary/", linkDescription: "Project presentation"}
  ];

  public static firebaseConfig = {
    // database: diseaseDiary
    apiKey: "AIzaSyCL6uu79mCavxxu7LlJMUDat5L9e1VcloM",
    authDomain: "diseasediary-99d4e.firebaseapp.com",
    databaseURL: "https://diseasediary-99d4e.firebaseio.com",
    storageBucket: "diseasediary-99d4e.appspot.com",
    messagingSenderId: "413669303856"
    /* fb5
    apiKey: "AIzaSyAMQA61KfzbKBSxVRYJtch1LPzcC-VFblk",
    authDomain: "fbe5-17455.firebaseapp.com",
    databaseURL: "https://fbe5-17455.firebaseio.com",
    storageBucket: "fbe5-17455.appspot.com",
    messagingSenderId: "811840885015"
    */
  };

  public static firebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
  };

  public static firebaseDbConfig = {
    db: "",
    //db: "/_db4",
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
