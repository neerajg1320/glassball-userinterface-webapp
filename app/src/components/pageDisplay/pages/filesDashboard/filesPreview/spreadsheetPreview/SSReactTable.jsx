import React, { useEffect, useState} from 'react'
import "./ssReactTable.css"
import { useTable } from 'react-table';
import {excelToJSDate} from '../../../../../../helpers/date';


function SSReactTable({data, title}) {
    const [columns, setColumns] = useState([])

    const generateReactTableColumns = row => {
        const colArray = [];
        Object.keys(row).forEach(key => {
            colArray.push({
                Header: key,
                accessor: key
            })
        })
        // console.log('colArray:', colArray);
        return colArray
    }

    useEffect(() => {
        if (data.length > 0) {
            const firstRow = data[0]
            if ('transactionDate' in firstRow) {
                data = data.map(item => {
                    if (typeof(item['transactionDate']) === 'number') {
                        const dateStr = excelToJSDate(item['transactionDate']).toISOString().split('T')[0]
                        item['transactionDate'] = dateStr;
                    }
                    return item
                });
            }

            setColumns(generateReactTableColumns(firstRow));
        }

        return () => {
            // console.log('SSReactTable: Clean up called')
        }
    }, [data]);
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })
    
    return (
        <div className="ssReactTableContainer">
            <div className="ssReactTableTitle">{title}</div>
            <table {...getTableProps()} className="ssReactTable" >
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} className="ssReactTableHeader">
                        {column.render('Header')}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return (
                        <td className="ssReactTableCell" {...cell.getCellProps()}>
                            {cell.render('Cell')}
                        </td>
                        )
                    })}
                    </tr>
                    )
                })}
            </tbody>
            </table>
        </div>
    )
}

export default SSReactTable

// Kept for Refernce:
//
//   const columns = useMemo(
//     () => [
//       {
//         Header: 'Column 1',
//         accessor: 'col1', // accessor is the "key" in the data
//       },
//       {
//         Header: 'Column 2',
//         accessor: 'col2',
//       },
//     ],
//     []
//   )
//
// const data = useMemo(
//     () => [
//       {
//         col1: 'Hello',
//         col2: 'World',
//       },
//       {
//         col1: 'react-table',
//         col2: 'rocks',
//       },
//       {
//         col1: 'whatever',
//         col2: 'you want',
//       },
//     ],
//     []
//   )