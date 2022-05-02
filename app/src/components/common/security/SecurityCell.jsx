import React, {useState} from 'react'
import './cell.css'
import Typography from "@material-ui/core/Typography/Typography";

function SecurityCell({params}) {
    // console.log(params);
    const consolidated = true;

    if (consolidated) {
        return (
            <div className="cellSecurityContainer">
                <Typography className="cellSecContainerUpper">
                    <span className="cellMedium cellSecurityName">{params.row.securityName}</span>
                    <span className="cellSmall cellSecurityType cellMarginLeft">{params.row.securityType}</span>
                </Typography>
                {params.row.securityType == "FUT" &&
                <Typography className="cellSecContainerLower">
                    <span className="cellSmall">{params.row.expiryDate}</span>
                </Typography>
                }
                {params.row.securityType == "OPT" &&
                <Typography className="cellSecContainerLower">
                    <span className="cellSmall">{params.row.expiryDate}</span>
                    <span className="cellSmall cellMarginLeft">{params.row.optionStrike}</span>
                    <span className="cellSmall cellMarginLeft">{params.row.optionType}</span>
                </Typography>
                }
            </div>
        )
    } else {
        // {
        //     field: 'securityType',
        //     headerName: 'Security Type',
        //     width: 50,
        // },
        // {
        //     field: 'expiryDate',
        //     headerName: 'Expiry Date',
        //     width: 100,
        // },
        // {
        //     field: 'optionStrike',
        //     headerName: 'Strike',
        //     width: 100,
        // },
        // {
        //     field: 'optionType',
        //     headerName: 'Type',
        //     width: 70,
        // },
    }
}

export default SecurityCell

