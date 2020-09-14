import { Avatar } from '@material-ui/core'
import React from 'react'
import './SidebarChat.css'

function SidebarChat() {
    return (
        <div className="sidebar-chat">
            <Avatar />
            <div className="sidebar-chat-content">
                <h2>Name</h2>
                <p>This is the last message</p>
            </div>
        </div>
    )
}

export default SidebarChat
