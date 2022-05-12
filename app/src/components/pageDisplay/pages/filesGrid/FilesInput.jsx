import React, {useState, useRef, useEffect} from 'react'
import "./filesInput.css"

import {connect} from 'react-redux'
import {addResourceAsync, uploadResourceAsync, removeResourceAsync, fetchResourcesAsync} from '../../../../redux'
import { generateId } from '../../../../dummyData';
import ProgressBarCustom from '../../../common/ProgressBarCustom';
import BulkDataGrid from '../../../common/bulkdatagrid/BulkDataGrid';

import { SingleSelectComponent } from '../../../common/reactselectsample/SingleSelectDropdown';
import { createFileObj } from "../../../../helpers/files";


const accountOptionsDefault = [
    { value: 'Zerodha Main', label: 'Zerodha Main' },
    { value: 'Axisdirect Main', label: 'Axisdirect Main'},
    { value: 'IndiaInfoline Main', label: 'IndiaInfoline Main'},
    { value: 'AxisDirect', label: 'Axis Direct' },
    { value: 'HDFCSec', label: 'HDFC Securities' },
    { value: 'ICICIDirect', label: 'ICICI Direct' },
    { value: 'IndiaInfoline', label: 'India Infoline' },
    { value: 'Zerodha', label: 'Zerodha' },
    { value: 'NSE', label: 'NSE' },
    { value: 'Etrade', label: 'E*Trade' },
]

const docTypeOptionsDefault = [
    { value: 'ContractNote', label: 'ContractNote' },
    { value: 'FinancialLedger', label: 'FinancialLedger' },
    { value: 'DematLedger', label: 'DematLedger' },
    { value: 'TradeLedger', label: 'TradeLedger' },
    { value: 'TradeConfirmation', label: 'TradeConfirmation' },
]

const getResourceOptions = (res) => {
    const options = res.map(o => {
        return {
            value: o.name,
            label: o.name,
        }
    });

    return options;
}

function FilesInput({ onClose, onResourceClose, files, docTypes, accounts,
                        addFileAsync, uploadFileAsync, removeFileAsync,
                        fetchDocTypesAsync, fetchAccountsAsync}) {
    const [accountsOptions, setAccountsOptions] = useState(accountOptionsDefault)
    const [selectedAccount, setSelectedAccount] = useState();
    const [documentTypesOptions, setDocumentTypeOptions] = useState(docTypeOptionsDefault)
    const [selectedDocumentType, setSelectedDocumentType] = useState();

    const [path, setPath] = useState('');
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [fileObjs, setFileObjs] = useState([]);
    const [password, setPassword] = useState("AEWPG4169E");
    const [saveEnabled, setSaveEnabled] = useState("false");
    const filesInputRef = useRef();
    const filesListRef = useRef([]);
    const resType = 'files';

    const columns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 90,
            renderHeader: (hparams) => {
                return hparams.name
            }
            
        },
        {
          field: 'name',
          headerName: 'Name',
          headerClassName: 'uploadFilesGridHeader',
          width: 150,
          // editable: true,
        },
        {
          field: 'size',
          headerName: 'File Size',
          headerClassName: 'uploadFilesGridHeader',
          width: 150,
          renderCell: (params) => {
            return (
              <div className="filesGridSize">
                  {params.row.size}
              </div>
            )
          }
        },
        {
          field: 'progress',
          headerName: "Progress",
          headerClassName: 'uploadFilesGridHeader',
          width: 150,
          renderCell: (params) => {
            return (
              <div className="fileItemProgress">
                <ProgressBarCustom bgcolor="lightblue" completed={params.row.completed}/>
              </div>
            )
          }
        }
    ];

    const onFileSelectionChange = (e) => {
        console.log("Selected Files:", e.target.files);
        setSelectedFiles(e.target.files)

        // e.target.filesDashboard is not an array but a FileList
        const fileObjects = [...e.target.files].map((file) => {
            const fileObject = {
                ...createFileObj(file),
                selectedAccount,
                selectedDocumentType,
                path,
                password,
                completed: 0,
                uploaded: false
            }

            addFileAsync(resType, fileObject)

            return fileObject;
        })

        setFileObjs(fileObjects);
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
        fileObjs.forEach(file => {
            const formData = new FormData();
            // console.log("formData: file:", file)
            formData.append('name', file.name);
            formData.append('account', selectedAccount);
            formData.append('document_type', selectedDocumentType);
            formData.append('file', file.selectedFile);
            formData.append('size', file.size);
            formData.append('password', file.password);
            formData.append('remark', 'No Remark');

            console.log("selectedAccount: ", selectedAccount);
            uploadFileAsync(resType, file, formData);
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
        const prevFiles = filesListRef.current;
        // console.log("prevFiles=", filesListRef.current, "files=",files);

        filesListRef.current = files;
        if (prevFiles.length > 0 && files.length === 0) {
            console.log("All files are uploaded");
        }
    }, [files]);

    useEffect(() => {
        const options = getResourceOptions(docTypes);

        // console.log("docTypesOptions:", options);
        setDocumentTypeOptions(options);
    }, [docTypes]);

    useEffect(() => {
        const options = getResourceOptions(accounts);

        // console.log("accountsOptions:", options);
        setAccountsOptions(options);
    }, [accounts]);

    useEffect(() => {
        // Disabled as we do not use it currently
        // fetchDocTypesAsync();
        // fetchAccountsAsync();

        return () => {
            // console.log("return useEffect[]: filesListRef=", filesListRef.current);
            clearFilesOnStore(filesListRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log("Selected Account:", selectedAccount);
        if (selectedFiles)
            console.log(selectedFiles);
        // setSaveEnabled(!!selectedFiles && selectedAccount && selectedDocumentType)
        setSaveEnabled(!!selectedFiles)
    }, [selectedFiles, selectedAccount, selectedDocumentType])

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleAccountChange = (option) => {
        console.log("Account: ", option.value);
        setSelectedAccount(option.value);
    }

    const handleDocTypeChange = (option) => {
        setSelectedDocumentType(option.value);
    }

    return (
        <div className="inputContainer">
            <div className="inputOptionsContainer">
                <div className="selectContainer">
                    <label className="selectLabel">Account</label>
                    <div className="optionsContainer">
                        <SingleSelectComponent
                            defaultValue={accountsOptions.filter(opt => opt.value === selectedAccount)}
                            options={accountsOptions}
                            onChange={handleAccountChange}/>
                    </div>
                </div>
                <div className="selectContainer">
                    <label className="selectLabel">Document Type</label>
                    <div className="optionsContainer">
                        <SingleSelectComponent
                            defaultValue={documentTypesOptions.filter(opt => opt.value === selectedDocumentType)}
                            options={documentTypesOptions}
                            onChange={handleDocTypeChange}/>
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
            <div className="selectedFilesGrid">
                <BulkDataGrid 
                    data={files}
                    columns={columns} />
            </div>
            <div className="inputFieldsContainer">
                <div className="selectContainer">
                    <label className="selectLabel">Password</label>
                    <div className="optionsContainer">
                        <input type="text" value={password} onChange={onPasswordChange}/>
                    </div>
                </div>
            </div>
            <div className="inputFilesBottomBar">
                <div className="uploadButtonContainer">
                    <button 
                        className={"uploadButton" + (saveEnabled ? " active" : "")}
                        onClick={onUploadClick}>
                            Upload
                    </button>
                </div>
                <div className="closeButtonContainer">
                    <button 
                        className="closeButton active"
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
        docTypes: state.resourceReducer.docTypes,
        accounts: state.resourceReducer.accounts,
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        addFileAsync: (resType, name) => dispatch(addResourceAsync(resType, name)),
        uploadFileAsync: (resType, name, formData) => dispatch(uploadResourceAsync(resType, name, formData)),
        removeResourceAsync: (resType, name) => dispatch(removeResourceAsync(resType, name)),
        fetchDocTypesAsync: () => {dispatch(fetchResourcesAsync("docTypes"))},
        fetchAccountsAsync: () => {dispatch(fetchResourcesAsync("accounts"))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesInput)
