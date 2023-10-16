import {Fragment, useEffect, useState} from "react";
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        agent.Activities.list().then(response => {
            setActivities(response.map(a => {
                a.date = a.date.split('T')[0];
                return a;
            }));
            setLoading(false);
        })
    }, []);
    function handleSelectActivity(id: string) {
        setSelectedActivity(activities.find(act => act.id === id));
    }
    function handleCancelSelectActivity() {
        setSelectedActivity(undefined);
    }
    function handleFormOpen(id?: string) {
        id ? handleSelectActivity(id) : handleCancelSelectActivity();
        setEditMode(true);
    }
    function handleFormClose() {
        setEditMode(false);
    }
    function handleCreateOrEditActivity(activity: Activity) {
        setSubmitting(true);
        if(activity.id) {
            agent.Activities.update(activity).then(() => {
                setActivities([...activities.filter(a => a.id !== activity.id), activity]);
                setSelectedActivity(activity);
                setSubmitting(false);
                setEditMode(false);
            });
        } else {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity]);
                setSelectedActivity(activity);
                setSubmitting(false);
                setEditMode(false);
            });
        }
    }
    function handleDeleteActivity(id: string) {
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(a => a.id !== id)]);
            setSubmitting(false);
        });
    }

    if (loading) return <LoadingComponent content='Loading App'/>
    return (
        <Fragment>
            <NavBar openForm={handleFormOpen}/>
            <Container style={{marginTop: "7em"}}>
                <ActivityDashboard
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                    submitting={submitting}
                />
            </Container>
        </Fragment>
    )
}
export default App
