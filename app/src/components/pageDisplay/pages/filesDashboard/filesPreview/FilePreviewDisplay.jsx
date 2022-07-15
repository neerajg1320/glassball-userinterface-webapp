import { Attachment } from '@mui/icons-material';
import {isImage, isPdf, isSpreadsheet, isText} from "../../../../../helpers/files";
import ImagePreview from "./imagePreview/ImagePreview";
import PdfPreview from "./pdfPreview/PdfPreview";
import TextPreview from "./textPreview/TextPreview";
import SpreadsheetPreview from "./spreadsheetPreview/SpreadsheetPreview";
import React from "react";
import './filePreviewDisplay.css';


export default function FilePreviewDisplay({fileUrl}) {
    const onPdfLoad = () => {
        console.log("PDF Loaded")
    };

    return (
        <div className="previewDisplay">
            <Attachment/><a href={fileUrl}>Download</a>
            <h2 className="previewTitle">File Preview</h2>
            {isImage(fileUrl) && <ImagePreview src={fileUrl}/> }
            {isPdf(fileUrl) && <PdfPreview url={fileUrl} onLoad={onPdfLoad}/> }
            {isText(fileUrl) && <TextPreview url={fileUrl} /> }
            {isSpreadsheet(fileUrl) && <SpreadsheetPreview url={fileUrl} /> }
        </div>
    )
}
