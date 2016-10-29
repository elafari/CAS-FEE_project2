import {Injectable} from '@angular/core';
import {AuthProviders, AuthMethods} from 'angularfire2';

@Injectable()
export class ConfigService {
  constructor() {
  }

  public static logFlag = true;

  public static mainAdmin = "admin@p2.ch";

  public static firebaseConfig = {
    // fbe5
    apiKey: "AIzaSyAMQA61KfzbKBSxVRYJtch1LPzcC-VFblk",
    authDomain: "fbe5-17455.firebaseapp.com",
    databaseURL: "https://fbe5-17455.firebaseio.com",
    storageBucket: "fbe5-17455.appspot.com",
    messagingSenderId: "811840885015"
  };

  public static firebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
  };

  public static firebaseDbConfig = {
    db: "/_db4",
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
