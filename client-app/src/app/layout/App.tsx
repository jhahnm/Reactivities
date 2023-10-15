import {Fragment, useEffect, useState} from "react";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
    const [editMode, setEditMode] = useState(false);
    
    useEffect(() => {
       axios.get<Activity[]>('http://localhost:5000/api/Activities')
           .then(response => {
               setActivities(response.data);
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
    function handleFormClose(){
        setEditMode(false);
    }
    
  return (
    <Fragment>
        <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop: "7em"}}>
            <ActivityDashboard 
                activities={activities}
                selectedActivity={selectedActivity}
                selectActivity={handleSelectActivity}
                cancelSelectActivity={handleCancelSelectActivity}
                editMode={editMode}
                openForm={handleFormOpen}
                closeForm={handleFormClose}
            />
        </Container>
    </Fragment>
  )
}

import axios from "axios";
import {Container} from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

export default App
