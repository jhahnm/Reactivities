import {useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import {observer} from "mobx-react-lite";
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistery} = activityStore;

    useEffect(() => {
        /**
         * Temporary work around as having only one element could mean that user navigated
         * directly to the component, so when the user clicks cancel or return it loads the whole set
         * of activities.
         */
        
        if(activityRegistery.size <= 1) {
            loadActivities();
        }
    }, [loadActivities, activityRegistery.size]);

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading App'/>
    
    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
});
