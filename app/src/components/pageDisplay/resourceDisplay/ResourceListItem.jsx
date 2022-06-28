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

    const onResourcePreviewClick = (rItem) => {
        const useSingleFileBinder = true;

        var link = rItem.file;
        console.log(rItem, link)
        if (useSingleFileBinder) {
            if (link == null && rItem.members.length > 0) {
                link = rItem.members[0].file;
            }
        }
        setCurrentResourceAsync(resType, link)
    }

    // TBD: This is duplicated code. The other definition is in FilesGridPage.jsx
    const onFilePathClick = (rItem) => {
      const fileurl = rItem.file;
      console.log("onFilePathClick(): fileurl=", fileurl);
      window.open(fileurl)
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
                <div className="widgetSmallIcon" onClick={() => onResourcePreviewClick(rItem)}>
                    <PreviewTwoTone />
                </div>
                <div className="widgetSmallIcon" onClick={() => onFilePathClick(rItem)}>
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
