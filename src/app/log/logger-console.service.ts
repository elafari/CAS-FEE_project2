
declare var console: any;

import { ConfigService } from "../shared/config.service";
import { LoggerInterface } from "./logger.interface";

export class LoggerConsoleService implements LoggerInterface {

    public assert( ...args: any[] ) : void {
        ( console && console.assert ) && console.assert( ...args );
    }
    public error( ...args: any[] ) : void {
      if (args.length == 1) {
        args[0] = "%c" + args[0];
        args[1] = ConfigService.colorList.error;
      }
        ( console && console.error ) && console.error( ...args );
    }
    public group( ...args: any[] ) : void {
        ( console && console.group ) && console.group( ...args );
    }
    public groupEnd( ...args: any[] ) : void {
        ( console && console.groupEnd ) && console.groupEnd( ...args );
    }
    public groupCollapsed( ...args: any[] ) : void {
      ( console && console.groupCollapsed() ) && console.groupCollapsed( ...args );
    }
    public info( ...args: any[] ) : void {
      if (args.length == 1) {
        args[0] = "%c" + args[0];
        args[1] = ConfigService.colorList.info;
      }
        ( console && console.info ) && console.info( ...args );
    }
    public log( ...args: any[] ) : void {
        ( console && console.log ) && console.log( ...args );
    }
    public warn( ...args: any[] ) : void {
        if (args.length == 1) {
          args[0] = "%c" + args[0];
          args[1] = ConfigService.colorList.warn;
        }
        ( console && console.warn ) && console.warn( ...args );
    }
}
