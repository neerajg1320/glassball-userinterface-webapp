import React, {useState} from 'react'
import './cell.css'
import Typography from "@material-ui/core/Typography/Typography";

function OpenTrade({params}) {

    return (
        <div className="cellSecurityContainer">
            <Typography className="cellSecContainerUpper">
                <span className="cellSmall cellSecurityName">{params.row.openTradeType}</span>
                <span className="cellSmall cellSecurityType cellMarginLeft">{params.row.openTradeDate}</span>
                {
                    params.row.openTradeType == 'BUY' &&
                    <span className="cellSmall cellSecurityType cellMarginLeft">{params.row.costBasis}</span>
                }
                {
                    params.row.openTradeType == 'SELL' &&
                    <span className="cellSmall cellSecurityType cellMarginLeft">{params.row.proceeds}</span>
                }
            </Typography>

            {/*<Typography className="cellSecContainerLower">*/}
                {/*<span className="cellSmall cellSecurityName">{params.row.closeTradeType}</span>*/}
                {/*<span className="cellSmall cellSecurityType cellMarginLeft">{params.row.closeTradeDate}</span>*/}
                {/*{*/}
                    {/*params.row.closeTradeType == 'BUY' &&*/}
                    {/*<span className="cellSmall cellSecurityType cellMarginLeft">{params.row.costBasis}</span>*/}
                {/*}*/}
                {/*{*/}
                    {/*params.row.closeTradeType == 'SELL' &&*/}
                    {/*<span className="cellSmall cellSecurityType cellMarginLeft">{params.row.proceeds}</span>*/}
                {/*}*/}
            {/*</Typography>*/}
        </div>
    )

}

export default OpenTrade

