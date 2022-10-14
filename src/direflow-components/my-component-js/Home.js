import React, { useEffect, useContext } from 'react'
import { withOktaAuth } from '@okta/okta-react';
import { EventContext } from 'direflow-component';
import { Styled } from 'direflow-component';
import styles from './App.css';

const Home = (props) => {
    const { authState, oktaAuth } = props
    const dispatch = useContext(EventContext);
    useEffect(() => {
        // const checkLogin = async()=>{
        //     if(!oktaAuth) return
        //     const tokenManager = oktaAuth.tokenManager;
        //     const accessToken = await tokenManager.get('accessToken');
        //     const idToken = await tokenManager.get('idToken');
        //     // const userInfo = await oktaAuth.token.getUserInfo()
        //     if(!accessToken || !idToken){
        //         console.log('run rurnun')
        //         await oktaAuth.signInWithRedirect()
        //     }
        // }
        // checkLogin().then(()=>{

        // }).catch((e)=>{console.log(e)})
        
    }, [])
    useEffect(() => {
        if (authState?.isAuthenticated) {
            const responseValue = {
                accessToken: authState?.accessToken,
                refreshToken: authState?.refreshToken
            }
            const onAcquireToken = new CustomEvent('OnAcquireToken', { detail: responseValue })
            dispatch(onAcquireToken)
        }
    }, [authState])
    const handleClick = async () => {
        if (authState?.isAuthenticated) {
            await oktaAuth.signOut()
        }
        else {
            await oktaAuth.signInWithRedirect()
        }
    };

    return (
        <Styled styles={styles}>
                <div className='row'>
                    <div className='header-title'>{`Hello ${authState?.users?.name || ''}`}</div>
                    <button className='button' onClick={handleClick}>
                        {authState?.isAuthenticated ? 'Logout' : 'Login'}
                    </button>
                </div>
        </Styled>
    )
}

export default withOktaAuth(Home)