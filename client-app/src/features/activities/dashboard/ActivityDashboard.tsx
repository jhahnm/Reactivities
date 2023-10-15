import {} from 'react';
import {Grid} from "semantic-ui-react";
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';

interface Props {
    activities: Activity[];
}

export default function ActivityDashboard({activities}: Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} />
            </Grid.Column>
            <Grid.Column width='6'>
                {activities[0] &&
                <ActivityDetails activity={activities[0]} />}
            </Grid.Column>
        </Grid>
    )
}