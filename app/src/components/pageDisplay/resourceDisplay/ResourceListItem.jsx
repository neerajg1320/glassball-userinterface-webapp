import React from 'react'
import "./resourceListItem.css"
import { CalendarViewMonth, Delete, PictureAsPdfRounded, TextFormat, FileDownload } from '@mui/icons-material';
import {connect} from 'react-redux';
import { removeResourceAsync, setCurrentResourceAsync } from '../../../redux';
import { downloadExcel } from "../../../helpers/spreadsheet";

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

    const onResourceDownloadClick = (rItem) => {
        console.log("onItemClick(): Click", rItem.ssFile);

        downloadExcel(
            // 'http://localhost:8000/api/document/ingredients/',
            rItem.ssFile,
            'c716a72bcc515535eecec695f067fc5b591d1d27',
            'trades.xlsx'
        )
    }

    return (
        <li className="resourceListItem" id={rItem.id}>
            {/* <ChromeReaderMode  className="sidebarIcon"/> */}
            <div className="widgetSmallUserTop">
                <span className="widgetSmallUsername">{rItem.title}</span>
            </div>
            <div className="widgetSmallUserBottom">
                <div className="resourceInfo">
                <span className="widgetSmallUserTitle">{rItem.size}</span>
                <span className="widgetSmallId">{rItem.pkid}</span>
                </div>
                <div className="resourceButtonsGroup">
                    <div className="widgetSmallIcon" onClick={() => onResourcePreviewClick(rItem.file)}>
                        <PictureAsPdfRounded />
                    </div>
                    <div className="widgetSmallIcon" onClick={() => onResourcePreviewClick(rItem.textFile)}>
                        <TextFormat/>
                    </div>                    
                    <div className="widgetSmallIcon" onClick={() => onResourcePreviewClick(rItem.ssFile)}>
                        <CalendarViewMonth/>
                    </div>
                    <div className="widgetSmallIcon" onClick={() => onResourceDownloadClick(rItem)}>
                        <FileDownload/>
                    </div>
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
