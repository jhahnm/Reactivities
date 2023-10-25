import {makeAutoObservable, runInAction} from "mobx";
import {User, UserFormValues} from "../models/user.ts";
import agent from "../api/agent.ts";
import {store} from "./store.ts";
import {router} from "../router/Routes.tsx";

export default class UserStore {
    user: User | null = null;
    constructor() {
        makeAutoObservable(this);
    }
    get isLoggedIn() {
        return !!this.user;
    }
    
    login = async (creds: UserFormValues) => {
        const user = await agent.Account.login(creds);
        store.commonStore.setToken(user.token);
        runInAction(() => {
            this.user = user;
            router.navigate('/activities');
        });
    }
    logout = () => {
        store.commonStore.setToken(null);
        localStorage.removeItem('jwt');
        this.user = null;
        router.navigate('/');
    }
}