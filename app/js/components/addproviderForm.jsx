import React from 'react'

const AddProviderForm = ({formFields={}}) => {

  const fieldComponents = [];
  const fields = Object.keys(formFields);
  fields.forEach((fieldArrKey,idx)=>{
    const fieldArr = formFields[fieldArrKey];
    if(fieldArr.label && typeof fieldArr.required !== 'undefined' && fieldArr.type){

      fieldComponents.push(<div key={`Form Fields-${idx}`} className="input-field col s12">
        <input placeholder={fieldArr.label} id={fieldArr.label} type={fieldArr.type} required={fieldArr.required} className="validate"/>
        <label htmlFor={fieldArr.label}>{fieldArr.label}</label>
      </div>)
    }
  });

  return (
    <form onSubmit={(e)=>{e.preventDefault()}} className="add-provider-form-container">
      {fieldComponents}
      <div className="add-provider-btn-container">
        <button className="waves-effect waves-light btn add-provider-btn" type="submit">Add Provider</button>
      </div>
    </form>
  )
}


export default AddProviderForm
