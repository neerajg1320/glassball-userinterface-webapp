import React from 'react'
import "./settingsSidebar.css"
import { ChromeReaderMode } from '@mui/icons-material';
import {Link} from 'react-router-dom';

function SettingsSidebar() {
    return (
        <div className="settingsSidebar">
            <div className="others">
                <div className="sidebarWrapper">
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Settings</h3>
                        <ul className="sidebarList">                     
                            <Link to="/settings/server">    
                                <li className="sidebarListItem">
                                    <ChromeReaderMode className="sidebarIcon"/>
                                    Server
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsSidebar
