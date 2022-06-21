import React, { useEffect } from 'react'
import "./documentsGridPage.css"
import { PictureAsPdf, DeleteOutline, Done, Clear, TextFormat, CalendarViewMonth } from '@mui/icons-material';

import { connect } from 'react-redux';
import { removeResourceAsync, fetchResourcesAsync } from '../../../../redux';
import DocumentsInput from './DocumentsInput';
import ResourceGrid from "../resource/ResourceGrid";


function DocumentsGridPage({documents, removeResourceAsync, fetchResourcesAsync}) {
    const resType = 'documents';

    const deleteFileById = id => {
      const document = documents.filter(file => file.id === id)[0]
      removeResourceAsync(resType, document);
    }

    const refreshFiles = () => {
      fetchResourcesAsync(resType)
    }

    const onFilePathClick = (fileurl) => {
      window.open(fileurl)
    }

    const columns = [
      { field: 'pkid', headerName: 'ID', width: 90 },
      {
        field: 'title',
        headerName: 'Name',
        width: 250,
        // editable: true,
      },
      {
        field: 'uploaded',
        headerName: "Uploaded",
        width: 100,
        renderCell: (params) => {
          return (
            <div className="fileItemUploaded">
              {params.row.uploaded ? <Done/> : <Clear/>}
            </div>
          )
        }
      },
      {
        field: 'action',
        headerName: "Action",
        width: 50,
        renderCell: (params) => {
          return (
            <div className="fileItemActions">
              <DeleteOutline  className="fileItemDelete" onClick={() => {
                    deleteFileById(params.row.id)
                  }
                }
              />
            </div>
          )
        }
      }
    ];

    useEffect(() => {
        refreshFiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const closeAddFilesModal = () => {

    }

    return (
        <div className="filesPage">
            <div className="filesResGridContainer">
                <ResourceGrid
                    title='Documents'
                    resType={resType}
                    data={documents}
                    columns={columns}>
                    <DocumentsInput onClose={closeAddFilesModal}/>
                </ResourceGrid>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
  return {
      documents: state.resourceReducer.documents
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeResourceAsync: (resType, document) => {dispatch(removeResourceAsync(resType, document))},
    fetchResourcesAsync: (resType) => {dispatch(fetchResourcesAsync(resType))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsGridPage);
