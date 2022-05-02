import React, {useState, useRef, useEffect} from 'react'
import "./transactionInput.css"

import {connect} from 'react-redux'
import {addResourceAsync, uploadResourceAsync, removeResourceAsync} from '../../../../redux'
import { generateId } from '../../../../dummyData';

import { SingleSelectComponent } from '../../../common/reactselectsample/SingleSelectDropdown';


function TransactionInput({ onClose, onResourceClose, files, addFileAsync, uploadFileAsync, removeFileAsync }) {
    const [path, setPath] = useState('');
    const [selectedFiles, setSelectedFiles] = useState(undefined);

    const filesInputRef = useRef();
    const filesListRef = useRef();
    const resType = 'files';

    const createFileObj = (selectedFile) => {
        return {
            id: generateId(), 
            title: selectedFile.name, 
            path,
            size: selectedFile.size,
            selectedFile,
            completed: 0,
            uploaded: false
        };
    }

    const onFileSelectionChange = (e) => {
        setSelectedFiles(e.target.files)
    }

    const clearSelectedFiles = () => {
        setSelectedFiles(undefined)
        filesInputRef.current.value = null;
    }

    const clearFilesOnStore = (files) => {
        files.forEach(file => {
            removeFileAsync(resType, file)
        })
    }

    const onUploadClick = () => {        
        // e.target.filesDashboard is not an array but a FileList
        const fileObjects = [...selectedFiles].map((file) => {
            const fileObject = createFileObj(file)
        
            addFileAsync(resType, fileObject)
            
            return fileObject;
        })

        fileObjects.forEach(file => {
            uploadFileAsync(resType, file)
        })

        clearSelectedFiles();
    }

    const handleSelectedFilesModalClose = () => {
        clearSelectedFiles();

        // console.log("handleSelectedFilesModalClose(): onClose", onClose)
        if (onClose) {
            onClose()
        }

        // console.log("handleSelectedFilesModalClose(): onResourceClose", onResourceClose)
        if (onResourceClose) {
            onResourceClose()
        }
    }

    useEffect(() => {
        filesListRef.current = files;
    }, [files]);

    useEffect(() => {
        return () => {
            // console.log("return useEffect[]: filesListRef=", filesListRef.current);
            clearFilesOnStore(filesListRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const instOptions = [
        { value: 'axis', label: 'Axis' },
        { value: 'hdfc', label: 'HDFC' },
        { value: 'icici', label: 'ICICI' },
        { value: 'sbi', label: 'SBI' }
    ]

    const docTypeOptions = [
        { value: 'bank_statement', label: 'Bank Statement' },
        { value: 'broker_statement', label: 'Broker Statement' },
        { value: 'contract_note', label: 'Contract Note' },
        { value: 'creditcard_statement', label: 'CreditCard Statement' }
    ]

    return (
        <div className="inputContainer">
            <div className="inputOptionsContainer">
                <div className="selectContainer">
                    <label className="selectLabel">Bank/Broker</label>
                    <div className="optionsContainer">
                        <SingleSelectComponent options={instOptions}/>
                    </div>
                </div>
                <div className="selectContainer">
                    <label className="selectLabel">Document Type</label>
                    <div className="optionsContainer">
                        <SingleSelectComponent options={docTypeOptions}/>
                    </div>
                </div>
            </div>

            <div className="inputFilesContainer">
                <input 
                    className="filesSelectContainer"
                    type="file" 
                    onChange={e => onFileSelectionChange(e)} 
                    ref={filesInputRef}
                    multiple
                />
                <div className="filesPathContainer">
                    <label>Folder</label>
                    <input 
                        className="pathInput" 
                        type="text" 
                        placeholder="Path" 
                        onChange={e => setPath(e.target.value)} 
                    />
                </div>

            </div>

            <div className="inputFilesBottomBar">
                <div className="uploadButtonContainer">
                    <button 
                        className={"uploadButton" + (selectedFiles ? " active" : "")}
                        onClick={onUploadClick}>
                            Upload
                    </button>
                </div>
                <div className="closeButtonContainer">
                    <button 
                        className={"closeButton" + (selectedFiles ? " active" : "")}
                        onClick={handleSelectedFilesModalClose}>
                            Close
                    </button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        files: state.resourceReducer.files.filter(file => file.uploaded === false),
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        addFileAsync: (resType, name) => dispatch(addResourceAsync(resType, name)),
        uploadFileAsync: (resType, name) => dispatch(uploadResourceAsync(resType, name)),
        removeResourceAsync: (resType, name) => dispatch(removeResourceAsync(resType, name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionInput)
