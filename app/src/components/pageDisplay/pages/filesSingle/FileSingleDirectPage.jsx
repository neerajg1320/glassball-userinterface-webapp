import React from 'react'
import "./fileSingleDirectPage.css"
import { useParams } from 'react-router-dom';
import PreviewDisplay from '../filesDashboard/filesPreview/PreviewDisplay';
import { getMediaUrlFromName } from '../../../../helpers/server';

function FileSingleDirectPage() {
    const {filename} = useParams()
    const fileurl = getMediaUrlFromName(filename)


    return (
        <div className="filePreviewContainer">
            <div className="filePreviewContent">
            {filename && (
                <div>
                    <PreviewDisplay  url={fileurl}/>
                    <div className="fileName">{filename}</div>
                </div>
            )
            }
            </div>
        </div>
    )
}

export default FileSingleDirectPage
