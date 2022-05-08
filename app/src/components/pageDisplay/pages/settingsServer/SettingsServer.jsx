import React, {useState} from 'react'
import "./settingsServer.css"
import { updateConfigAsync, setTokenAsync, createTokenAsync } from '../../../../redux'
import { connect } from 'react-redux'

function SettingsServer({token, updateConfigAsync, setTokenAsync, createTokenAsync}) {
    const [tokenVal, setTokenVal] = useState(token)

    const onTokenChange = e => {
        setTokenVal(e.target.value)
    }

    const onTokenUpdateClick = () => {
        console.log('onTokenUpdateClick')
        setTokenAsync(tokenVal)
    }

    const onForceAuthClick = () => {
        console.log("Need to get token");
        createTokenAsync('neeraj76@gmail.com', 'Local123');
    }

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
                <button  className="authButton" onClick={onForceAuthClick}>Force Auth</button>
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
