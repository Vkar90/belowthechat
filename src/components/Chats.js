import React, {useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
    const history = useHistory()
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    
    const handleLogout = async () => {
        await auth.signOut()

        history.push('/')
    }

    const getFile = async (url) => {
        const response = await fetch(url)
        const data = await response.blob()

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg'})
    }

    useEffect(() => {
        if(!user || user === null)  {
            history.push('/')

            return
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "8d2a6aae-a88b-48cd-a846-aa5534fdb3d2",
                "user-name": user.email , 
                "user-secret": user.uid,
            }
        })
        .then( () => {
            setLoading(false)
        })
        .catch(() => {
            let formdata = new FormData()
            formdata.append('email', user.email)
            formdata.append('username', user.email)
            formdata.append('secret', user.uid)

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name)

                    axios.post('https://api.chatengine.io/users/', 
                    formdata, 
                    {headers: { "private-key ": "17717319-122d-473d-9968-b216b4ecf55f"}})
                    .then(() => {
                        setLoading(false)
                    })
                    .catch((error) => console.log(error))
                })
        })
    }, [user, history])

    if(!user || loading ) return 'Loading...'

    return (
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    Below The Chat
                </div>
                <div onClick={handleLogout} className="logout-tab"> 
                    Logout
                </div>
            </div>
            <ChatEngine
                height="calc(100vh - 66px)"
                projectID='1974e293-8363-4899-ba99-581c2548db4d'
                userName= {user.email}
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats;