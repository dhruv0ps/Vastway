import { makeAutoObservable } from 'mobx';

interface User {
    _id: string;
    username: string;
    email: string;
    role: {
        _id: string;
        name: string;
    };
    permissions: string[],
    firstname?: string;
    lastname?: string;
}

class AuthStore {
    loading: boolean = false;
    user: User | null = null;
    token: string | null = null;
    isAuthenticated: boolean = false;


    setUser = (user: User) => this.user = user
    setLoading = (load: boolean) => this.loading = load

    constructor() {
        makeAutoObservable(this);
        this.token = localStorage.getItem('token');
        this.isAuthenticated = !!this.token;
    }

    setToken(token: string | null) {
        this.token = token;
        this.isAuthenticated = !!token;
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }


}

export const authStore = new AuthStore();