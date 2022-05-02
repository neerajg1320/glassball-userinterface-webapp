import React from 'react';
import "./sidebar.css";
import SettingsSidebar from './settings/SettingsSidebar';
import DashboardSidebar from './dashboard/DashboardSidebar';
import {Switch, Route} from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar">
            <Switch>
                <Route path="/settings">
                    <SettingsSidebar />
                </Route>
                <Route path="*">
                    <DashboardSidebar />
                </Route>
            </Switch>
        </div>
    )
}

export default Sidebar
