import React from 'react'
import "./resourceList.css"

import ResourceListItem from './ResourceListItem';

function ResourceList({rList}) {
    return (    
        <ul className="resourceList">
            {rList && 
                rList.map(rItem => 
                    <ResourceListItem key={rItem.id} rItem={rItem}/>
                ) 
            }
        </ul>           
    )
}

export default ResourceList
