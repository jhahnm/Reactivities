import {Fragment, useEffect, useState} from "react";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    useEffect(() => {
       axios.get<Activity[]>('http://localhost:5000/api/Activities')
           .then(response => {
               setActivities(response.data);
           })
    }, []);
    
  return (
    <Fragment>
        <NavBar />
        <Container style={{marginTop: "7em"}}>
            <ActivityDashboard activities={activities}/>
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
