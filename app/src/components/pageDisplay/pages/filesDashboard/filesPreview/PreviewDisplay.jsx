import React, {useEffect}  from 'react';
import "./previewDisplay.css";
import { connect } from 'react-redux';

import ImagePreview from './imagePreview/ImagePreview';
import { isImage, isPdf, isSpreadsheet, isText } from '../../../../../helpers/files';
import PdfPreview from './pdfPreview/PdfPreview';
import TextPreview from './textPreview/TextPreview';
import SpreadsheetPreview from './spreadsheetPreview/SpreadsheetPreview';


function PreviewDisplay({ currentLink, url}) {
    const fileurl = url ? url :
        (currentLink ? currentLink : undefined)

    // console.log("PreviewDisplay: fileurl:", fileurl)

    const onPdfLoad = () => {
        // console.log("PDF Loaded")
    }

    useEffect(() => {
        console.log("PreviewDisplay:useEffect fileurl:", fileurl)
    }, [currentLink])

    return (
        <div className="previewDisplay">
            <h2 className="previewTitle">File Preview</h2>
            {isImage(fileurl) && <ImagePreview src={fileurl}/> }
            {isPdf(fileurl) && <PdfPreview url={fileurl} onLoad={onPdfLoad}/> }
            {isText(fileurl) && <TextPreview url={fileurl} /> }
            {isSpreadsheet(fileurl) && <SpreadsheetPreview url={fileurl} /> }
        </div>
    )
}

const mapsStateToProps = state => {
    return {
        currentLink: state.resourceReducer.currentLink
    }
}

export default connect(mapsStateToProps)(PreviewDisplay)
