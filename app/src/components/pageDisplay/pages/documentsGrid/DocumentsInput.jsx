import React, {useState, useRef, useEffect} from 'react'
import "./documentsInput.css"

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

const namespacesOptionsDefault = [

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

function DocumentsInput({ onClose, onResourceClose, files, docTypes, accounts, namespaces,
                        addDocumentAsync, uploadDocumentFilesAsync, removeDocumentAsync,
                        fetchDocTypesAsync, fetchAccountsAsync, fetchNamespacesAsync}) {
    const [accountsOptions, setAccountsOptions] = useState(accountOptionsDefault)
    const [selectedAccount, setSelectedAccount] = useState();
    const [documentTypesOptions, setDocumentTypeOptions] = useState(docTypeOptionsDefault)
    const [selectedDocumentType, setSelectedDocumentType] = useState();
    const [namespacesOptions, setNamespacesOptions] = useState(namespacesOptionsDefault)
    const [selectedNamespace, setSelectedNamespace] = useState();

    const [documentTitle, setDocumentTitle] = useState('');
    const [prefix_path, setPrefixPath] = useState('');
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [fileObjs, setFileObjs] = useState([]);
    const [password, setPassword] = useState("AEWPG4169E");
    const [saveEnabled, setSaveEnabled] = useState("false");
    const filesInputRef = useRef();
    const filesListRef = useRef([]);
    const resType = 'documents';

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
                documentTitle,
                selectedAccount,
                selectedDocumentType,
                prefix_path,
                password,
                completed: 0,
                uploaded: false
            }

            addDocumentAsync(resType, fileObject)

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
            removeDocumentAsync(resType, file)
        })
    }

    const onUploadClick = () => {
        const document = {
            title: documentTitle,
        }

        const formData = new FormData();
        // console.log("formData: file:", file)
        formData.append('title', documentTitle);
        // formData.append('name', file.name);
        formData.append('prefix_path', prefix_path);
        formData.append('account', selectedAccount);
        formData.append('document_type', selectedDocumentType);
        // formData.append('file', file.selectedFile);
        // formData.append('size', file.size);
        formData.append('password', password);
        formData.append('remark', 'No Remark');

        fileObjs.forEach(file => {
            formData.append('files[]', file.selectedFile)
        })

        uploadDocumentFilesAsync(resType, document, formData);

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
        const options = getResourceOptions(namespaces);

        // console.log("accountsOptions:", options);
        setNamespacesOptions(options);
    }, [namespaces]);

    useEffect(() => {
        // Disabled as we do not use it currently
        fetchDocTypesAsync();
        fetchAccountsAsync();
        fetchNamespacesAsync();

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

    const handleNameSpaceChange = (option) => {
        setSelectedDocumentType(option.value);
    }

    return (
        <div className="inputContainer">
            <div className="inputFieldsContainer">
                <label>Title</label>
                <input
                    className="pathInput"
                    type="text"
                    placeholder="Untitled"
                    onChange={e => setDocumentTitle(e.target.value)}
                />
                <div className="selectContainer">
                    <label className="selectLabel">NameSpace</label>
                    <div className="optionsContainer">
                        <SingleSelectComponent
                            defaultValue={documentTypesOptions.filter(opt => opt.value === "Zerodha Main")}
                            options={namespacesOptions}
                            // options={docTypeOptionsDefault}
                            onChange={handleNameSpaceChange}/>
                    </div>
                </div>
            </div>
            <div className="inputOptionsContainer">
                <div className="selectContainer">
                    <label className="selectLabel">Account</label>
                    <div className="optionsContainer">
                        <SingleSelectComponent
                            defaultValue={accountsOptions.filter(opt => opt.value === selectedAccount)}
                            options={accountsOptions}
                            // options={accountOptionsDefault}
                            onChange={handleAccountChange}/>
                    </div>
                </div>
                <div className="selectContainer">
                    <label className="selectLabel">Document Type</label>
                    <div className="optionsContainer">
                        <SingleSelectComponent
                            defaultValue={documentTypesOptions.filter(opt => opt.value === "Zerodha Main")}
                            options={documentTypesOptions}
                            // options={docTypeOptionsDefault}
                            onChange={handleDocTypeChange}/>
                    </div>
                </div>
            </div>
            <div className="inputOptionsContainer">

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
                        onChange={e => setPrefixPath(e.target.value)}
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
        namespaces: state.resourceReducer.namespaces,
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        addDocumentAsync: (resType, name) => dispatch(addResourceAsync(resType, name)),
        // uploadDocumentAsync: (resType, name, formData) => dispatch(uploadResourceAsync(resType, name, formData)),
        uploadDocumentFilesAsync: (resType, name, formData) => dispatch(uploadResourceAsync(resType, name, formData)),
        removeResourceAsync: (resType, name) => dispatch(removeResourceAsync(resType, name)),
        fetchDocTypesAsync: () => {dispatch(fetchResourcesAsync("docTypes"))},
        fetchAccountsAsync: () => {dispatch(fetchResourcesAsync("accounts"))},
        fetchNamespacesAsync: () => {dispatch(fetchResourcesAsync("namespaces"))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsInput)
