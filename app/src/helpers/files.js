import {generateId} from "../dummyData";

const image_extensions = ['jpeg', 'jpg', 'png']
const pdf_extensions = ['pdf']
const text_extensions = ['txt', 'text', 'sh', 'cmd', 'log', 'js', 'html', 'py', 'java']
const spreadsheet_extensions = ['xls', 'xlsx', 'csv']

const checkFileExtn = (filename, extensions) => {
    if (filename) {
        const parts = filename.split(".")
        
        return (parts 
            && (parts.length > 1) 
            && (extensions.includes(parts[parts.length - 1]))
        )
    }

    return false
}

export const isImage = filename => {
    return checkFileExtn(filename, image_extensions)
} 

export const isPdf = filename => {
    return checkFileExtn(filename, pdf_extensions)
} 

export const isText = filename => {
    return checkFileExtn(filename, text_extensions)
}

export const isSpreadsheet = filename => {
    return checkFileExtn(filename, spreadsheet_extensions)
}

export const createFileObj = (selectedFile) => {
    return {
        id: generateId(),
        name: selectedFile.name,
        size: selectedFile.size,
        selectedFile
    };
}