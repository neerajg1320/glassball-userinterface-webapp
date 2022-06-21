import React from 'react'
import "./resourceListItem.css"
import { Attachment, PreviewTwoTone,  Delete,  TextFormat } from '@mui/icons-material';
import {connect} from 'react-redux';
import { removeResourceAsync, setCurrentResourceAsync } from '../../../redux';


function ResourceListItem({rItem, removeResourceAsync, setCurrentResourceAsync}) {
    const resType = 'files';

    const onResourceDelete = () => {
        // console.log("onResourceDelete: id=", rItem.id)
        removeResourceAsync(resType, rItem)
    }

    const onResourcePreviewClick = (link) => {
        // console.log(rItem, link)
        setCurrentResourceAsync(resType, link)
    }

    return (
        <li className="resourceListItem" id={rItem.id}>
            {/* <ChromeReaderMode  className="sidebarIcon"/> */}
            <div className="widgetSmallUserTop">
                <span className="widgetSmallUsername">{rItem.name}</span>
            </div>
            <div className="widgetSmallUserBottom">
                <div className="resourceInfo">
                {/*<span className="widgetSmallUserTitle">{rItem.size}</span>*/}
                <span className="widgetSmallId">{rItem.pkid}</span>
                </div>
                <div className="resourceButtonsGroup">

                </div>
                <div className="widgetSmallIcon" onClick={() => onResourcePreviewClick(rItem.file)}>
                    <PreviewTwoTone />
                </div>
                <div className="widgetSmallIcon" onClick={() => onResourcePreviewClick(rItem.file)}>
                    <Attachment />
                </div>
                <Delete className="resourceDeleteButton" onClick={onResourceDelete}/>
            </div>
        </li>            
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeResourceAsync: (resType, file) => dispatch(removeResourceAsync(resType, file)),
        setCurrentResourceAsync: (resType, file) => dispatch(setCurrentResourceAsync(resType, file))
    }
}

export default connect(null, mapDispatchToProps)(ResourceListItem)
