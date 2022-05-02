import React, {useState} from 'react'
import { getUrlContentsAsync } from '../../../../../../helpers/urls'
import TextAreaCustom from '../../../../../common/textArea/TextAreaCustom'
import "./textPreview.css"


function TextPreview({url}) {
    const [text, setText] = useState('Blank')
    getUrlContentsAsync(url).then(contents => {
        setText(contents)
    })    

    return (
        <div className="textPreview">
            <TextAreaCustom className="textArea" disabled rows="600" cols="80" value={text} />  
        </div>
    )
}

export default TextPreview
