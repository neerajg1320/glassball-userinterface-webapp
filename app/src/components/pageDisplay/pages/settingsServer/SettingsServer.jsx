import React, {useState} from 'react'
import "./settingsServer.css"
import { updateConfigAsync, setTokenAsync } from '../../../../redux'
import { connect } from 'react-redux'

function SettingsServer({token, updateConfigAsync, setTokenAsync}) {
    const [tokenVal, setTokenVal] = useState(token)

    const onTokenChange = e => {
        setTokenVal(e.target.value)
    }

    const onTokenUpdateClick = () => {
        console.log('onTokenUpdateClick')
        setTokenAsync(tokenVal)
    }

    return (
        <div className="settingsServer">
            <h1>Server</h1>
            <div className="serverSettingsContainer">

                <div className="authTokenContainer">
                    <span>Token</span>
                    <input className="authTokenInput" type="text" value={tokenVal} onChange={onTokenChange} />
                    <button className="authTokenButton" onClick={onTokenUpdateClick}>Update</button>
                </div>

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
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SettingsServer);
