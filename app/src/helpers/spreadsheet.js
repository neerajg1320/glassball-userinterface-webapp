import * as XLSX from 'xlsx'; 
import axios from 'axios'

const converExcelWbToJson = (wb) => {
    const sheetMap = {}

    wb.SheetNames.forEach(ws => {
            const rows = XLSX.utils.sheet_to_row_object_array(wb.Sheets[ws]);
            // console.log(ws)
            sheetMap[ws] = rows
    });

    return sheetMap;
}

// When we want to read a file selected from input tag
export const readExcelFile = file => {
    return new Promise( (resolve, reject) => {
        const fileReader = new FileReader();
        
        fileReader.onload = (e) => {
        const data = e.target.result;
        const wb = XLSX.read(data, {type: 'array'})

        const sheetMap = converExcelWbToJson(wb)
        resolve(sheetMap)
        };

        fileReader.onerror = (error => {
        reject(error);
        });

        fileReader.readAsArrayBuffer(file)
    })

}

// When we want to read a file from its url
export const readExcelUrlAsync = fileUrl => {
    // console.log("readExcelUrlAsync: ", fileUrl);

    return new Promise((resolve, reject) => {
        axios.request({
            url: fileUrl,
            method: 'GET',
            responseType:'blob' // This is important part
          })
          .then(response => {
            readExcelFile(response.data)
            .then(inner => {
                resolve(inner)
            })
            .catch(error => {
                console.log(error)
            })
          })
          .catch(error => {
            console.log(error)
            reject(error);
          })
    
    })
}


export const downloadExcel = (downloadUrl, authToken, fileName) => {

    axios.request({
        url:downloadUrl,
        method: 'GET',
        headers: {
            'Accept': 'application/xlsx',
            'Authorization': `token ${authToken}`,
        },
        responseType:'blob'
    })
    .then((response) => {
        console.log("downloadExcel():", response.data)
        return response.data;
    })
    .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        
        // Append to html page
        document.body.appendChild(link);
        // Force download
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);
    })

}