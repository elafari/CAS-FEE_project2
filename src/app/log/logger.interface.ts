
export interface LoggerInterface {
    assert( ...args: any[] ) : void;
    error( ...args: any[] ) : void;
    group( ...args: any[] ) : void;
    groupCollapsed( ...args: any[] ) : void;
    groupEnd( ...args: any[] ) : void;
    info( ...args: any[] ) : void;
    log( ...args: any[] ) : void;
    warn( ...args: any[] ) : void;
}
