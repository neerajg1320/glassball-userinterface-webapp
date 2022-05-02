import React, {useState, useEffect} from 'react'
import "./invoicesInput.css"

import { SingleSelectComponent } from '../../../common/reactselectsample/SingleSelectDropdown';


function InvoicesInput({ onSave, onClose, onResourceClose }) {
    const [saveEnabled, setSaveEnabled] = useState(false);

    const [inst, setInst] = useState("");
    const [docType, setDocType] = useState("");



    const handleInstChange = (option) => {
        setInst(option.value)
    }

    const handleDocTypeChange = (option) => {
        setDocType(option.value)
    }

    const handleSaveClick = () => {
        if (onSave) {
            const res = {
                inst,
                docType
            };

            onSave(res);
        }
    }

    const handleCloseClick = () => {
        if (onClose) {
            onClose()
        }

        if (onResourceClose) {
            onResourceClose()
        }
    }

    useEffect(() => {
        setSaveEnabled(docType !== "" && inst !== "")
    }, [inst, docType])

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
                        <SingleSelectComponent options={instOptions} onChange={handleInstChange}/>
                    </div>
                </div>
                <div className="selectContainer">
                    <label className="selectLabel">Document Type</label>
                    <div className="optionsContainer">
                        <SingleSelectComponent options={docTypeOptions} onChange={handleDocTypeChange}/>
                    </div>
                </div>
            </div>


            <div className="inputFilesBottomBar">
                <div className="uploadButtonContainer">
                    <button 
                        className={"uploadButton" + (saveEnabled ? " active" : "")}
                        onClick={handleSaveClick}>
                            Save
                    </button>
                </div>
                <div className="closeButtonContainer">
                    <button 
                        className={"closeButton" + (saveEnabled ? " active" : "")}
                        onClick={handleCloseClick}>
                            Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InvoicesInput;
