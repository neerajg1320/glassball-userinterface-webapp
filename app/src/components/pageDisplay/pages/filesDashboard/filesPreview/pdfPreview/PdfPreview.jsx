import React, { useState } from "react";
import "./pdfPreview.css"
import { Document, Page, pdfjs } from "react-pdf";

function PdfPreview({ url, onLoad }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  /*To Prevent right click on screen*/
  // document.addEventListener("contextmenu", (event) => {
  //   event.preventDefault();
  // });

  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
    onLoad();
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <div className="main">
        <div className="inner">
          <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
            <div style={{ display: "inline-block" }}>
              <Page pageNumber={pageNumber} />
            </div>
          </Document>
        </div>
        <div className="margin" style={{ marginBottom: "10px" }} />
        <div style={{ display: "inline-block" }}>
          <div className="pagec">
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </div>
          <div className="margin" style={{ marginBottom: "10px" }} />
          <div className="buttonc">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className="Pre"
            >
              Previous
            </button>
            <div
              className="margin"
              style={{ display: "inline-block", marginRight: "20px" }}
            />
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PdfPreview
