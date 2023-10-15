import {Fragment, useEffect, useState} from "react";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
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
    
  return (
    <Fragment>
        <NavBar />
        <Container style={{marginTop: "7em"}}>
            <ActivityDashboard 
                activities={activities}
                selectedActivity={selectedActivity}
                selectActivity={handleSelectActivity}
                cancelSelectActivity={handleCancelSelectActivity}
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
