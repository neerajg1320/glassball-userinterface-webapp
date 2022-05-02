import React, {useRef, useState} from 'react'
import "./resourceGrid.css"

import { connect } from 'react-redux';
import {
    removeResourceAsync,
    fetchResourcesAsync,
    downloadResourcesAsync,
    actionResourcesAsync,
    uploadResourceAsync
} from '../../../../redux';

import BulkDataGrid from '../../../common/bulkdatagrid/BulkDataGrid';
import SampleModal from '../../../common/modal/SampleModal';
import {createFileObj} from "../../../../helpers/files";
import {FileUpload, Refresh} from '@mui/icons-material';


function ResourceGrid({children, title, resType, columns, data,
                          removeResourceAsync, fetchResourcesAsync,
                          downloadResourcesAsync, uploadResourceAsync, actionResourcesAsync}) {
    const [showAddResourceModal, setShowAddResourceModal] = useState(false);
    const filesInputRef = useRef();

    const closeAddResourceModal = () => {
        setShowAddResourceModal(false)
    }

    // The following code puts props in multiple children.
    const childrenWithAddedProps = React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
            onResourceClose: closeAddResourceModal
        });
    });

    const deleteResourceById = id => {
      const resource = data.filter(res => res.id === id)[0]
      removeResourceAsync(resType, resource);
    }

    const refreshResources = () => {
      fetchResourcesAsync(resType)
    }

    const onResourcesBulkDelete = ids => {
      ids.forEach(id => {
        deleteResourceById(id);
      })
    }

    const downloadResourceFile = () => {
        const params = {filename: resType + '.xlsx'}
        downloadResourcesAsync(resType, params, "download")
    }

    const handleFileChange = (e) => {
        // console.log("Upload file for resource ", resType);

        // e.target.filesDashboard is not an array but a FileList
        const fileObjects = [...e.target.files].map((file) => {
            const fileObject = {
                ...createFileObj(file),
                completed: 0,
                uploaded: false
            }

            return fileObject;
        })

        fileObjects.forEach(file => {
            const formData = new FormData();
            formData.append('title', file.title);
            formData.append('file', file.selectedFile);
            formData.append('size', file.size);

            uploadResourceAsync(resType, file, formData, "upload")
        })

        filesInputRef.current.value = null;

        // console.log("handleUploadFileClick(): fileObjects =", fileObjects);
    }

    const handleUploadFileClick = () => {
        filesInputRef.current.click();
    }

    const handleAddResourceClick = () => {
        setShowAddResourceModal(true)
    }


    const handleComputeResourceClick = () => {
        actionResourcesAsync(resType, 'compute')
    }

    return (
        <div className="resPage">
            <h1 className="resGridTitle">{title}</h1>

            <div className="resTopbar">
              <button className="borderlessButton" onClick={handleComputeResourceClick}>Compute</button>
              <div className="resDataInput">
                  <div className="borderlessButton fileUpload" onClick={handleUploadFileClick}>
                      <span className="uploadTitle">Upload File</span>
                      <FileUpload className="uploadIcon" />
                  </div>
                  <input
                      className="filesSelectContainer"
                      type="file"
                      onChange={e => handleFileChange(e)}
                      ref={filesInputRef}
                      multiple
                      style={{display: 'none'}}
                  />
                  <button className="borderlessButton" onClick={handleAddResourceClick}>Add Resource</button>
              </div>
            </div>
            <div className="resAddModalContainer">
              <SampleModal isOpen={showAddResourceModal} onModalClose={closeAddResourceModal}>
                  {childrenWithAddedProps}
              </SampleModal>
            </div>

            <div className="resGridContainer">
              <BulkDataGrid 
                data={data}
                columns={columns} 
                onRefresh={refreshResources}
                onBulkDelete={onResourcesBulkDelete}
                onFileDownload={downloadResourceFile}
              />
            </div>
        </div>
    )
}


const mapDispatchToProps = dispatch => {
  return {
    removeResourceAsync: (resType, resource) => {dispatch(removeResourceAsync(resType, resource))},
    fetchResourcesAsync: (resType) => {dispatch(fetchResourcesAsync(resType))},
    downloadResourcesAsync: (resType, params, action) => {dispatch(downloadResourcesAsync(resType, params, action))},
    uploadResourceAsync: (resType, name, formData, action) => dispatch(uploadResourceAsync(resType, name, formData, action)),
    actionResourcesAsync: (resType, action, params) => {dispatch(actionResourcesAsync(resType, action, params))}
  }
}

export default connect(null, mapDispatchToProps)(ResourceGrid);
