import {Button, Container, Header, Image, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Fragment} from "react";
import {useStore} from "../../app/stores/store.ts";

export default observer(function HomePage() {
    const {userStore} = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/Images/logo.png' alt='logo' style={{marginBottom: 12}} />
                    Reactivities
                </Header>
                {userStore.isLoggedIn ? (
                    <Fragment>
                        <Header as='h2' inverted content='Welcome to reactivities' />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to Activities!
                        </Button>
                    </Fragment>
                    
                ): (
                    <Button as={Link} to='/login' size='huge' inverted>
                        Login!
                    </Button>
                )}
            </Container>
        </Segment>
    )
})