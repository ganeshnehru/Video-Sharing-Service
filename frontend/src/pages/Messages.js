
import React, { Component, Fragment } from 'react';
import Talk from "talkjs";
import { LinearProgress } from '@mui/material';
// import './Messaging.css'

class Messages extends Component {

    constructor(props) {
        super(props);

        this.inbox = undefined;
        let currentUser;
        const currentTalkjsUser = sessionStorage.getItem("Subfluence-user");

        if (currentTalkjsUser) {
            currentUser = currentTalkjsUser
        }

        this.state = {
            currentUser
        }
    }

    componentDidMount() {
        Talk.ready
            .then(() => {
                const me = new Talk.User(this.state.currentUser);
                
                if (!window.talkSession) {
                    window.talkSession = new Talk.Session({
                        appId: "tBLL8gSA",
                        me: me
                    });
                }
            
                this.inbox = window.talkSession.createInbox();
                this.inbox.mount(this.container);

            })
            .catch(e => console.error(e));
    }

    render() {
        return (
            <Fragment>
{/* style={{position:'absolute', top:170, right:700}} */}
                <br/><br/><br/>
                <h1 className='my-messages'>My Messages</h1>
                <br/><br/>
                <div style={{height: '500px'}} className="inbox-container" ref={c => this.container = c}>
                    <LinearProgress/>
                </div>
            </Fragment>
        );
    }
  }
  
  export default Messages;