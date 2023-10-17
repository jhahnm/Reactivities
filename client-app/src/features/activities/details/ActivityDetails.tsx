import {} from 'react';
import {Button, Card, Image} from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import {observer} from "mobx-react-lite";

export default observer(function ActivityDetails() {
    const {activityStore} = useStore();
    const {cancelSelectedActivity, openForm, selectedActivity: activity} = activityStore;
    
    if(!activity) return;
    
    return (
        <Card fluid>
            <Image src={`/assets/Images/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity!.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
});
