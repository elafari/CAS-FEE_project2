
declare var console: any;

import { LoggerInterface } from "./logger.interface";

export class LoggerConsoleService implements LoggerInterface {

    public assert( ...args: any[] ) : void {
        ( console && console.assert ) && console.assert( ...args );
    }
    public error( ...args: any[] ) : void {
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
        ( console && console.info ) && console.info( ...args );
    }
    public log( ...args: any[] ) : void {
        ( console && console.log ) && console.log( ...args );
    }
    public warn( ...args: any[] ) : void {
        ( console && console.warn ) && console.warn( ...args );
    }
}
