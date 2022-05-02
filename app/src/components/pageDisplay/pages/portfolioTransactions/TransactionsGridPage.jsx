import React, {useEffect} from 'react'
import "./transactionsGridPage.css"
import { DeleteOutline } from '@mui/icons-material';

import { connect } from 'react-redux';
import { removeResourceAsync, fetchResourcesAsync } from '../../../../redux';
import TransactionInput from './TransactionInput';

import ResourceGrid from "../resource/ResourceGrid";
import SecurityCell from "../../../common/security/SecurityCell"
import { jsDateToString, dateFormatter } from "../../../../helpers/date"

function TransactionsGridPage({transactions, removeResourceAsync, fetchResourcesAsync}) {
    const resType = 'transactions';

    const deleteFileById = id => {
        const res = transactions.filter(file => file.id === id)[0]
        removeResourceAsync(resType, res);
    }

    const refreshTransactions = () => {
        fetchResourcesAsync(resType)
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
            field: 'transactionDate',
            headerName: 'Date',
            type: 'date',
            width: 120,
            valueFormatter: (params) => {
                // first converts to JS Date, then to locale option through date-fns
                return dateFormatter(params.row.transactionDate)
            },
            // valueGetter for filtering
            valueGetter: (params) => {
                return dateFormatter(params.row.transactionDate)
            }
        },
        {
            field: 'securityName',
            headerName: 'Security Name',
            width: 200,
            renderCell: (params) => {
                return <SecurityCell params={params}/>
            }
        },
        {
            field: 'securityType',
            headerName: 'Security Type',
            hide: true,
            width: 50,
        },
        {
            field: 'expiryDate',
            headerName: 'Expiry Date',
            type: 'date',
            hide: true,
            width: 100,
        },
        {
            field: 'optionStrike',
            headerName: 'Option Strike',
            hide: true,
            width: 100,
        },
        {
            field: 'optionType',
            headerName: 'Option Type',
            hide: true,
            width: 70,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            width: 100,
            align: "right"
        },
        {
            field: 'tradeType',
            headerName: 'Trade Type',
            width: 70,
        },
        {
            field: 'grossAmount',
            headerName: 'Gross Amount',
            type: 'number',
            width: 120,
            align: "right"
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
        refreshTransactions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const closeAddFilesModal = () => {

    }

    return (
        <div className="filesPage">
            <div className="filesResGridContainer">
                <ResourceGrid
                    title='Transactions'
                    resType={resType}
                    data={transactions}
                    columns={columns}>
                    <TransactionInput onClose={closeAddFilesModal}/>
                </ResourceGrid>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        transactions: state.resourceReducer.transactions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeResourceAsync: (resType, file) => {dispatch(removeResourceAsync(resType, file))},
        fetchResourcesAsync: (resType) => {dispatch(fetchResourcesAsync(resType))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsGridPage);
