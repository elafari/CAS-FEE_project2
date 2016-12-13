export class UserClass {
    public key: string;
    public email: string;
    public name
?:
    string;
    public isAdmin
?:
    boolean;
    public error: string;
    public active: boolean;

    constructor(data) {
        this.key = data.key || '';
        this.email = data.email || '';
        this.name = data.name || '';
        this.isAdmin = data.isAdmin || null;
        this.error = data.error || '';
        this.active = data.active || null;
    }

    public isLoggedIn(): boolean {
        return !!this.key;
    }
}

export interface Login {
    email: string;
    password: string;
}

export interface Registration {
    email: string;
    password: string;
    confirmPassword: string;
}
