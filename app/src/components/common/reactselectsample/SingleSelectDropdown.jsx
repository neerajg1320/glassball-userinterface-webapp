import React  from 'react'
import Select from 'react-select'


export const SingleSelectComponent = (props) => {

  return (
    <Select {...props}/>
  )
}

export const MultiSelectComponent = (props) => {

  return (
    <Select {...props} isMulti/>
  )
}
