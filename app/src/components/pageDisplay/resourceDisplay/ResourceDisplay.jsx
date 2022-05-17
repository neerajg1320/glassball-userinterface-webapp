import React from 'react'
import "./resourceDisplay.css"


import {connect} from 'react-redux'
import ResourceList from './ResourceList';

function ResourceDisplay({resName, files, documents}) {
    return (
        <div className="resourceDisplay">
            {resName == "files" &&
                <div>
                <span className="widgetSmallTitle">Files</span>
                <ResourceList rList={files}/>
                </div>
            }
            {resName == "documents" &&
                <div>
                <span className="widgetSmallTitle">Documents</span>
                <ResourceList rList={documents}/>
                </div>
            }
        </div>
    )
}


const mapStateToProps = state => {
    return {
        files: state.resourceReducer.files,
        documents: state.resourceReducer.documents
    }
}

export default connect(mapStateToProps)(ResourceDisplay)
