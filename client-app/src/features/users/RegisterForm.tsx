import {ErrorMessage, Form, Formik} from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import {Button, Header} from "semantic-ui-react";
import {useStore} from "../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {object, string} from "yup";
import ValidationErrors from "../errors/ValidationErrors.tsx";

export default observer(function RegisterForm() {
    const {userStore} = useStore();
    return(
        <Formik
            initialValues={{displayName: '', username: '',  email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => 
                userStore.register(values).catch(error => setErrors({error})
            )}
            validationSchema={object({
                displayName: string().required(),
                username: string().required(),
                email: string().required(),
                password: string().required(),
                
            })}
        >
            
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Reactivities' color='teal' textAlign='center' />
                    <MyTextInput placeholder='Display Name' name='displayName' />
                    <MyTextInput placeholder='User Name' name='username' />
                    <MyTextInput placeholder='Email' name='email' />
                    <MyTextInput placeholder='Password' name='password' type='password' />
                    <ErrorMessage
                        name='error'
                        render={() =>
                            <ValidationErrors errors={errors.error as unknown as string[]} />}
                    />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}    
                        loading={isSubmitting} 
                        positive content='Register' 
                        type='submit' fluid 
                    />
                </Form>
            )}
        </Formik>
    )
})