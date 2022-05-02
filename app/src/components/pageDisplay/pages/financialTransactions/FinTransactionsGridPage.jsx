import React, {useEffect} from 'react'
import "./finTransactionsGridPage.css"
import { DeleteOutline } from '@mui/icons-material';

import { connect } from 'react-redux';
import { addResourceAsync, removeResourceAsync, fetchResourcesAsync } from '../../../../redux';
import FinTransactionsInput from './FinTransactionsInput';

import ResourceGrid from "../resource/ResourceGrid";
import {generateId} from "../../../../dummyData";


function FinTransactionsGridPage({finTransactions, addResourceAsync, removeResourceAsync, fetchResourcesAsync}) {
    const resType = 'finTransactions';

    const deleteFileById = id => {
        const res = finTransactions.filter(file => file.id === id)[0]
        removeResourceAsync(resType, res);
    }

    const refreshPositions = () => {
        fetchResourcesAsync(resType)
    }

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            hide: true,
            width: 50
        },
        {
            field: 'date',
            type: 'date',
            headerName: 'Date',
            width: 100,
        },
        {
            field: 'account',
            headerName: 'Account',
            hide: true,
            width: 100,
        },

        {
            field: 'description',
            headerName: 'Description',
            width: 200,
        },
        {
            field: 'subAccount',
            headerName: 'Sub Account',
            width: 150,
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 150,
        },
        {
            field: 'debit',
            type: 'number',
            headerName: 'Debit',
            width: 100,
        },
        {
            field: 'credit',
            type: 'number',
            headerName: 'Credit',
            width: 100,
        },
        {
            field: 'balance',
            type: 'number',
            headerName: 'Balance',
            width: 100,
        }
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
                    title='Financial Transactions'
                    resType={resType}
                    data={finTransactions}
                    columns={columns}>
                    <FinTransactionsInput onClose={handleInputClose} onSave={handleInputSave}/>
                </ResourceGrid>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        finTransactions: state.resourceReducer.finTransactions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addResourceAsync: (resType, file) => {dispatch(addResourceAsync(resType, file))},
        removeResourceAsync: (resType, file) => {dispatch(removeResourceAsync(resType, file))},
        fetchResourcesAsync: (resType, params) => {dispatch(fetchResourcesAsync(resType, params))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinTransactionsGridPage);
