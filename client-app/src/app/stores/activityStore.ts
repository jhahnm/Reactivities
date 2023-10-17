import {makeAutoObservable, runInAction} from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from "uuid";

export default class ActivityStore {
    activityRegistery = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    
    constructor() {
        makeAutoObservable(this)
    }
    
    get activitiesByDate() {
        return Array.from(this.activityRegistery.values()).sort((a, b) => 
            Date.parse(a.date) - Date.parse(b.date));
    }
    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
          const activities = await agent.Activities.list();
          runInAction(() => {
              activities.forEach(a => {
                  this.setActivity(a);
              });
          });
          this.setLoadingInitial(false);
        } catch (e) {
            console.error(e);
            this.setLoadingInitial(false);
        }
    }
    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if(activity) {
            this.selectedActivity = activity;
        } else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                runInAction(() => {
                    this.selectedActivity = activity;
                });
                this.setActivity(activity);
                this.setLoadingInitial(false);
            } catch (e) {
                console.error(e);
                this.loading = false;
            }
        }
    }
    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistery.set(activity.id, activity);
    }
    
    private getActivity = (id: string) => {
        return this.activityRegistery.get(id);
    }
    
    setLoadingInitial(state: boolean) {
        this.loadingInitial = state;
    }
    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistery.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (e) {
            console.error(e);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistery.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
            
        } catch (e) {
            console.error(e);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistery.delete(id);
                this.loading = false;
            })
        } catch (e) {
            console.error(e);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}