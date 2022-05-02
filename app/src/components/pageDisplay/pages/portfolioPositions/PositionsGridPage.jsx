import React, {useEffect} from 'react'
import "./positionsGridPage.css"
import { DeleteOutline } from '@mui/icons-material';

import { connect } from 'react-redux';
import { addResourceAsync, removeResourceAsync, fetchResourcesAsync } from '../../../../redux';
import PositionInput from './PositionInput';

import ResourceGrid from "../resource/ResourceGrid";
import {generateId} from "../../../../dummyData";
import SecurityCell from "../../../common/security/SecurityCell"
import DualTrades from "../../../common/security/DualTrades"
import {dateFormatter} from "../../../../helpers/date";


function PositionsGridPage({positions, addResourceAsync, removeResourceAsync, fetchResourcesAsync}) {
    const resType = 'positions';

    const deleteFileById = id => {
        const res = positions.filter(file => file.id === id)[0]
        removeResourceAsync(resType, res);
    }

    const refreshPositions = () => {
        fetchResourcesAsync(resType, {consolidated: true})
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
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
            field: 'trades',
            headerName: 'Trades',
            width: 200,
            renderCell: (params) => {
                return <DualTrades params={params}/>
            }
        },
        {
            field: 'proceeds',
            headerName: 'Proceeds',
            hide: true,
            type: 'number',
            width: 120,
            align: "right"
        },
        {
            field: 'costBasis',
            headerName: 'Cost Basis',
            hide: true,
            type: 'number',
            width: 120,
            align: "right"
        },
        {
            field: 'netGain',
            headerName: 'Gain/Loss',
            type: 'number',
            width: 120,
            align: "right"
        },
        {
            field: 'openTradeType',
            headerName: 'Open Trade Type',
            hide: true,
            width: 100,
            align: "center"
        },
        {
            field: 'openTradeDate',
            headerName: 'Open Trade Date',
            type: 'date',
            hide: true,
            width: 100,
            align: "center",
            valueFormatter: (params) => {
                // first converts to JS Date, then to locale option through date-fns
                return dateFormatter(params.row.openTradeDate)
            },
            // valueGetter for filtering
            valueGetter: (params) => {
                return dateFormatter(params.row.openTradeDate)
            }
        },
        {
            field: 'closeTradeType',
            headerName: 'Close Trade Type',
            hide: true,
            width: 100,
            align: "center"
        },
        {
            field: 'closeTradeDate',
            headerName: 'Close Trade Date',
            type: 'date',
            hide: true,
            width: 100,
            align: "center",
            valueFormatter: (params) => {
                // first converts to JS Date, then to locale option through date-fns
                return dateFormatter(params.row.closeTradeDate)
            },
            // valueGetter for filtering
            valueGetter: (params) => {
                return dateFormatter(params.row.closeTradeDate)
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
        refreshPositions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputClose = () => {
        console.log("PositionsGridPage: handleInputClose()")

    }

    const handleInputSave = (res) => {
        console.log('PositionsGridPage: handleInputSave(): res=', res)
        res.id = generateId()
        addResourceAsync(resType, res)
    }

    return (
        <div className="filesPage">
            <div className="filesResGridContainer">
                <ResourceGrid
                    title='Profit & Loss'
                    resType={resType}
                    data={positions}
                    columns={columns}>
                    <PositionInput onClose={handleInputClose} onSave={handleInputSave}/>
                </ResourceGrid>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        positions: state.resourceReducer.positions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addResourceAsync: (resType, file) => {dispatch(addResourceAsync(resType, file))},
        removeResourceAsync: (resType, file) => {dispatch(removeResourceAsync(resType, file))},
        fetchResourcesAsync: (resType, params) => {dispatch(fetchResourcesAsync(resType, params))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PositionsGridPage);
