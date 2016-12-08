export class UserClass {
    public key: string;
    public email: string;
    public name?: string;
    public isAdmin?: boolean;
    public error: string;

    constructor(data) {
        this.key = data.key || '';
        this.email = data.email || '';
        this.error = data.error || '';
        this.name = data.name || '';
        this.isAdmin = data.isAdmin || '';
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
