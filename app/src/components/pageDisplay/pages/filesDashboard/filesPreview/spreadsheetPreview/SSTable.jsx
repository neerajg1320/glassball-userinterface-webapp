import React from 'react'
import "./ssTable.css"

function SSTable({rows, title}) {
    return (
        <div className="ssTable">
            <div className="ssTableTitle">{title}</div>
            { rows.length > 0 ?
            <table className="table">
                <thead>
                    <tr>
                    { Object.keys(rows[0]).map( (k, i) => 
                        <th  key={i} scope="col">{k}</th>
                    )}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, ri) => 
                    <tr key={ri}>
                    { Object.keys(row).map( (k, ci) => 
                        <td key={ci} scope="col">{row[k]}</td>
                    )}
                    </tr>
                    )}
                </tbody>
            </table> :
            <p>"[Empty]"</p>
            }
        </div>
    )
}

export default SSTable
