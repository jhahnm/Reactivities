import {makeAutoObservable, runInAction} from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from "uuid";

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    
    constructor() {
        makeAutoObservable(this)
    }
    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
          const activities = await agent.Activities.list();
          runInAction(() => {
              this.activities = activities.map(a => {
                  a.date = a.date.split('T')[0];
                  return a;
              });
          });
          this.setLoadingInitial(false);
        } catch (e) {
            console.error(e);
            this.setLoadingInitial(false);
        }
    }
    
    setLoadingInitial(state: boolean) {
        this.loadingInitial = state;
    }
    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
    }
    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }
    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }
    closeForm = () => {
        this.editMode = false;
    }
    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activities = [...this.activities, activity];
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
                this.activities = this.activities.map(a => a.id === activity.id ? activity : a);
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
                this.activities = this.activities.filter(a => a.id !== id);
                this.loading = false;
                if(this.selectedActivity?.id === id) {
                    this.cancelSelectedActivity();
                }
            })
        } catch (e) {
            console.error(e);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}