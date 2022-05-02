import React from 'react'
import "./resourceDisplay.css"


import {connect} from 'react-redux'
import ResourceList from './ResourceList';

function ResourceDisplay({files}) {
    return (
        <div className="resourceDisplay">
            <span className="widgetSmallTitle">Files</span>
            <ResourceList rList={files}/>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        files: state.resourceReducer.files
    }
}

export default connect(mapStateToProps)(ResourceDisplay)
