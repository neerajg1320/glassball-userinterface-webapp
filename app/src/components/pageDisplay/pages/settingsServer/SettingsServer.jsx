import React, {useEffect, useState} from 'react'
import "./settingsServer.css"
import { updateConfigAsync, setTokenAsync, createTokenAsync } from '../../../../redux'
import { connect } from 'react-redux'
import ToggleSwitch from "../../../common/toggleswitch/ToggleSwitch";


function SettingsServer({token, updateConfigAsync, setTokenAsync, createTokenAsync}) {
    const [tokenVal, setTokenVal] = useState(token)
    const [backgroundProcessing, setBackgroundProcessing] = useState(true)

    const onTokenChange = e => {
        setTokenVal(e.target.value)
    }

    const onTokenUpdateClick = () => {
        console.log('onTokenUpdateClick')
        setTokenAsync(tokenVal)
    }

    const onAdminAuthClick = () => {
        console.log("Need to get token");
        createTokenAsync('admin@abc.com', 'Super123');
    }

    const onStaffAuthClick = () => {
        console.log("Need to get token");
        createTokenAsync('staff@abc.com', 'Super123');
    }

    const onUserAuthClick = () => {
        console.log("Need to get token");
        createTokenAsync('neeraj76@yahoo.com', 'Local123');
    }
    const handleDebugComponent = (checked) => {
        setBackgroundProcessing(checked);
    };

    useEffect(() => {
        console.log("Token Updated: ", token)
    }, [token]);

    return (
        <div className="settingsServer">
            <h1>Server</h1>
            <div className="serverSettingsContainer">

                <div className="authTokenContainer">
                    <span>Token</span>
                    <input className="authInput" type="text" value={tokenVal} onChange={onTokenChange} />
                    <button className="authButton" onClick={onTokenUpdateClick}>Update</button>
                </div>

            </div>

            <div className="serverSettingsContainer">
                <button  className="authButton" onClick={onAdminAuthClick}>Admin Auth</button>
                <button  className="authButton" onClick={onStaffAuthClick}>Staff Auth</button>
                <button  className="authButton" onClick={onUserAuthClick}>User Auth</button>
            </div>

            <div className="serverSettingsContainer">
                <ToggleSwitch onChange={handleDebugComponent} checked={backgroundProcessing}>
                  Console Debug
                </ToggleSwitch>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.authReducer.token
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        updateConfigAsync: (k, v) => {dispatch(updateConfigAsync(k, v))},
        setTokenAsync: (token) => {dispatch(setTokenAsync(token))},
        createTokenAsync: (email, password) => {dispatch(createTokenAsync(email, password))},
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SettingsServer);
