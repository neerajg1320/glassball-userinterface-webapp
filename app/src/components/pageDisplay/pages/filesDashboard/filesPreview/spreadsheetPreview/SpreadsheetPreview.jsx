import React, {useState, useEffect} from 'react'
import "./spreadsheetPreview.css"
import { readExcelUrlAsync } from '../../../../../../helpers/spreadsheet'
import SSReactTable from './SSReactTable'


function SpreadsheetPreview({url}) {
    const [sheets, setSheets] = useState([])
    
    useEffect(() => {
        readExcelUrlAsync(url)
        .then(response => {
            const sheetsArray = []
            for (const key of Object.keys(response)) {
                // console.log(key, response[key])
                sheetsArray.push({name: key, rows: response[key]})
            }
            // console.log(sheetsArray)
            setSheets(sheetsArray)
        })
        .catch(error => {
            console.log(error)
        })
    }, [url]);

    return (        
        <div className="spreadSheetPreview">
            {sheets.map((sheet, index) =>
                <div key={sheet.name} className="spreadSheets">
                    <SSReactTable title={sheet.name} data={sheet.rows} />
                    {/* <SSTable title={sheet.name} rows={sheet.rows}/> */}
                </div>
            )}
            
            {/* <TextAreaCustom className="textArea" disabled rows="20" cols="80" value={text} />   */}
        </div>
    )
}

export default SpreadsheetPreview
