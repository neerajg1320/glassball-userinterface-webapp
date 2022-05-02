import React from 'react'
import "./pdfIframePreview.css"

function PdfIframePreview({url}) {
    return (
        <div >
            <iframe className="main" src={url} />
        </div>
    )
}

export default PdfIframePreview
