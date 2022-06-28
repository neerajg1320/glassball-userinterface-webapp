import React, {useEffect, useState} from 'react';
import "./previewDisplay.css";
import { connect } from 'react-redux';

import ImagePreview from './imagePreview/ImagePreview';
import { isImage, isPdf, isSpreadsheet, isText } from '../../../../../helpers/files';
import PdfPreview from './pdfPreview/PdfPreview';
import TextPreview from './textPreview/TextPreview';
import SpreadsheetPreview from './spreadsheetPreview/SpreadsheetPreview';
import ImageReel from "./carouselPreview/ImageReel";
import ImageCarousel from "./carouselPreview/ImageCarousel";


function FilePreviewDisplay({fileUrl}) {
    const onPdfLoad = () => {
        console.log("PDF Loaded")
    };

    return (
        <div className="previewDisplay">
            <h2 className="previewTitle">File Preview</h2>
            {isImage(fileUrl) && <ImagePreview src={fileUrl}/> }
            {isPdf(fileUrl) && <PdfPreview url={fileUrl} onLoad={onPdfLoad}/> }
            {isText(fileUrl) && <TextPreview url={fileUrl} /> }
            {isSpreadsheet(fileUrl) && <SpreadsheetPreview url={fileUrl} /> }
        </div>
    )
}

function PreviewDisplay({ currentLink, url}) {
    const [fileUrl, setFileUrl] = useState();
    const [images, setImages] = useState([]);

    useEffect(() => {
        console.log("PreviewDisplay: fileUrl:", fileUrl)
    }, [fileUrl]);

    useEffect(() => {
        console.log("PreviewDisplay:useEffect() currentLink:", currentLink)

        if (currentLink && currentLink != "") {
            if (currentLink.file) {
                setFileUrl(currentLink.file);
            } else if (currentLink.members.length > 0) {
                const file_images = currentLink.members.map(elm => {
                        return {id: elm.pkid, src: elm.file, alt: elm.part_num}
                    }
                );
                // console.log("images=", file_images);
                setImages(file_images)
            }
        }
    }, [currentLink])

    return (
        <div className="previewDisplay">

            {currentLink.file && <FilePreviewDisplay fileUrl={currentLink.file} />}
            {/*{!currentLink.file && <ImageReel images={images} />}*/}
            {!currentLink.file && <ImageCarousel images={images} />}
        </div>
    )
}



const mapsStateToProps = state => {
    return {
        currentLink: state.resourceReducer.currentLink
    }
}

export default connect(mapsStateToProps)(PreviewDisplay)
