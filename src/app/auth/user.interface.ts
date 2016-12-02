export interface User {
    key: string;
    email: string;
    name?: string;
    isAdmin?: boolean;
    error: string;
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
