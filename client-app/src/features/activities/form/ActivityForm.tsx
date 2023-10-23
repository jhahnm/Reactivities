import {ChangeEvent, useEffect, useState} from 'react';
import {Button, FormField, Label, Segment} from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import {observer} from "mobx-react-lite";
import {Link, useNavigate, useParams} from "react-router-dom";
import { Activity } from '../../../app/models/activity';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import {v4 as uuid} from 'uuid';
import {Formik, Form, Field, ErrorMessage} from "formik";
import {object, string} from "yup";
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';

export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {createActivity, updateActivity, 
        loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });
    const validationSchema = object({
        title: string().required('The activity message is required'),
        description: string().required('The activity description is required'),
        category: string().required(),
        date: string().required(),
        venue: string().required(),
        city: string().required()
    })
    useEffect(() => {
        if(id) {
            loadActivity(id).then(a => setActivity(a!))
        }
    }, [id, loadActivity]);
    // function handleSubmit() {
    //     if(!activity.id) {
    //         activity.id = uuid();
    //         createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    //     } else {
    //         updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    //     }
    // }
    //
    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const {name, value} = event.target;
    //     setActivity({...activity, [name]: value})
    // }
    
    if(loadingInitial) return <LoadingComponent content='Loading activity...'/>
    
    return(
        <Segment clearing>
            <Formik
                validationSchema={validationSchema}    
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => console.log(values)}>
                {({handleSubmit}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea placeholder='Description' name='description' rows={3} />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category'/>
                        <MyTextInput placeholder='Date' type='date' name='date'/>
                        <MyTextInput placeholder='City' name='city'/>
                        <MyTextInput placeholder='Venue' name='venue'/>
                        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/activities' floated='right' type="button" content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
});