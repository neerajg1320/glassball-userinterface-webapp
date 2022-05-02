import React from 'react'
import "./topbar.css"

import { NotificationsNone, Language, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <Link to="/files/grid">
                    <div className="topLeft">
                        <span className="logo">Files Dashboard</span>
                    </div>
                </Link>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language/>
                        <span className="topIconBadge">3</span>
                    </div>
                    <Link to="/settings/server">
                        <div className="topbarIconContainer">
                            <Settings/>
                        </div>
                    </Link>
                    <img src="https://i.picsum.photos/id/1027/2848/4272.jpg?hmac=EAR-f6uEqI1iZJjB6-NzoZTnmaX0oI0th3z8Y78UpKM" alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}
