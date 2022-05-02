import React, {useEffect} from 'react'
import "./invoicesGridPage.css"
import { DeleteOutline } from '@mui/icons-material';

import { connect } from 'react-redux';
import { addResourceAsync, removeResourceAsync, fetchResourcesAsync } from '../../../../redux';
import InvoicesInput from './InvoicesInput';

import ResourceGrid from "../resource/ResourceGrid";
import {generateId} from "../../../../dummyData";


function InvoicesGridPage({invoices, addResourceAsync, removeResourceAsync, fetchResourcesAsync}) {
    const resType = 'invoices';

    const deleteFileById = id => {
        const res = invoices.filter(file => file.id === id)[0]
        removeResourceAsync(resType, res);
    }

    const refreshPositions = () => {
        fetchResourcesAsync(resType)
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },

        {
            field: 'expiryDate',
            headerName: 'Expiry Date',
            hide: true,
            width: 100,
        },
        {
            field: 'optionStrike',
            headerName: 'Option Strike',
            hide: true,
            width: 100,
        },

    ];

    useEffect(() => {
        refreshPositions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputClose = () => {
        console.log("OpenPositionsGridPage: handleInputClose()")

    }

    const handleInputSave = (res) => {
        console.log('OpenPositionsGridPage: handleInputSave(): res=', res)
        res.id = generateId()
        addResourceAsync(resType, res)
    }

    return (
        <div className="filesPage">
            <div className="filesResGridContainer">
                <ResourceGrid
                    title='Invoices'
                    resType={resType}
                    data={invoices}
                    columns={columns}>
                    <InvoicesInput onClose={handleInputClose} onSave={handleInputSave}/>
                </ResourceGrid>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        invoices: state.resourceReducer.invoices,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addResourceAsync: (resType, file) => {dispatch(addResourceAsync(resType, file))},
        removeResourceAsync: (resType, file) => {dispatch(removeResourceAsync(resType, file))},
        fetchResourcesAsync: (resType, params) => {dispatch(fetchResourcesAsync(resType, params))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesGridPage);
