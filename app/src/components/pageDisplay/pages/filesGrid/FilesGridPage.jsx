import React, { useEffect } from 'react'
import "./filesGridPage.css"
import { Attachment, DeleteOutline, Done, Clear } from '@mui/icons-material';

import { connect } from 'react-redux';
import { removeResourceAsync, fetchResourcesAsync } from '../../../../redux';
import FilesInput from './FilesInput';
import ResourceGrid from "../resource/ResourceGrid";


function FilesGridPage({files, removeFileAsync, fetchFilesAsync}) {
    const resType = 'files';

    const deleteFileById = id => {
      const file = files.filter(file => file.id === id)[0]
      removeFileAsync(resType, file);
    }

    const refreshFiles = () => {
      fetchFilesAsync(resType)
    }

    // TBD: This is duplicated code. The other definition is in ResourceListItem.jsx
    const onFilePathClick = (fileurl) => {
      console.log("onFilePathClick(): fileurl=", fileurl);
      window.open(fileurl)
    }

    const columns = [
      { field: 'pkid', headerName: 'ID', width: 90 },
      {
        field: 'name',
        headerName: 'Name',
        width: 350,
        // editable: true,
      },
      {
        field: 'type',
        headerName: 'Type',
        width: 100,
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
        field: 'file',
        headerName: 'Link',
        width: 150,
        // editable: true,
        renderCell: (params) => {
          return ( 
            <div className="fileLinksGroup">
              <div className="fileLink" onClick={() => {onFilePathClick(params.row.file)}}>
                <Attachment  className="fileItemLink" />
              </div>
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
                    title='FileBinders'
                    resType={resType}
                    data={files}
                    columns={columns}>
                    <FilesInput onClose={closeAddFilesModal}/>
                </ResourceGrid>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
  return {
      files: state.resourceReducer.files.filter(file => file.uploaded === true),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFileAsync: (resType, file) => {dispatch(removeResourceAsync(resType, file))},
    fetchFilesAsync: (resType) => {dispatch(fetchResourcesAsync(resType))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesGridPage);
