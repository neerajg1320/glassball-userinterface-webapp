import React, {useEffect, useState} from 'react';
import "./previewDisplay.css";
import { connect } from 'react-redux';

import FilePreviewDisplay from "./FilePreviewDisplay";
import ImageCarousel from "./carouselPreview/ImageCarousel";


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
            } else if (currentLink.member_fileparts.length > 0) {
                const file_images = currentLink.member_fileparts.map(elm => {
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
