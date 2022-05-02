import React, {useState} from 'react'
import "./bulkDataGrid.css"
import { DataGrid } from '@mui/x-data-grid';
import { Refresh, FileDownload } from '@mui/icons-material';

function BulkDataGrid({data, columns, onRefresh, onBulkDelete, onFileDownload }) {
    const [selectedRows, setSelectedRows] = useState([])
    const [bulkClass, setBulkClass] = useState("inactive")

    // console.log("BulkDataGrid: data:", data);

    const handleRowsSelection = (ids) => {        
        setSelectedRows(ids);
 
        if (ids.length > 0) {
          setBulkClass("active")
        } else {
          setBulkClass("inactive")
        }
     }
 
     const handleBulkDelete = () => {
        if(onBulkDelete) {
          onBulkDelete(selectedRows)
        } else {
          console.log('BulkDataGrid:onBulkDelete not defined')
        }
     }
 
     const handleFileDownloadClick = () => {
       if (onFileDownload) {
           onFileDownload()
       } else {
        console.log('BulkDataGrid:onFileDownload not defined')
       }
     }

    const handleRefreshClick = () => {
        if (onRefresh) {
            onRefresh()
        } else {
            console.log('BulkDataGrid:onRefresh not defined')
        }
    }

    return (
        <div className="bulkDataGrid">
            { ( onRefresh || onBulkDelete) &&
            <div className="gridTopbar">
              <div className="gridBulkActions">
                <button 
                  className={"gridBulkActionDelete " + bulkClass}
                  onClick={handleBulkDelete}
                >
                  Bulk Delete
                </button>
              </div>
              <div className="gridReadActions">
                <FileDownload className="fileDownload" onClick={handleFileDownloadClick}/>
                <Refresh className="refreshResource" onClick={handleRefreshClick}/>
              </div>
            </div>
            }

            <div className="gridTable">
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10 ]}
                    checkboxSelection={onBulkDelete ? true : false}
                    disableSelectionOnClick
                    onSelectionModelChange = {handleRowsSelection}
                />
            </div>            
        </div>
    )
}

export default BulkDataGrid
