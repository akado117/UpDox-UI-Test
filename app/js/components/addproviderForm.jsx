import React from 'react'
import PropTypes from 'prop-types'

class AddProviderForm extends React.Component {
  constructor(){
    super()

    this.state = {
      successMessage: ''
    }
  }
  render(){
    const {formFields} = this.props;

    const fieldComponents = [];
    const fields = Object.keys(formFields);
    fields.forEach((fieldArrKey,idx)=>{
      const fieldArr = formFields[fieldArrKey];
      if(fieldArr.label && typeof fieldArr.required !== 'undefined' && fieldArr.type){

        fieldComponents.push(<div key={`Form Fields-${idx}`} className="input-field col s12">
          <input ref={fieldArrKey} placeholder={fieldArr.label} id={fieldArrKey} type={fieldArr.type} required={fieldArr.required} className="validate"/>
          <label htmlFor={fieldArr.label}>{fieldArr.label}</label>
        </div>)
      }
    });

    const successMessage = this.state.successMessage? <div className="success-message">
      {this.state.successMessage}
    </div> : '';

    return (
      <div className={`add-provider-form-container ${this.props.className? this.props.className: ''}`}>
        <form onSubmit={this.handleOnSubmit} className='form'>
          <div className={`row remove-side-margin ${this.props.formFieldsClass? this.props.formFieldsClass : ''}`}>
            <div className="row secondary-title">
              <h2>{this.props.title? this.props.title : ''}</h2>
            </div>
            {successMessage}
            {fieldComponents}
          </div>
          <div className="add-provider-btn-container">
            <button className="waves-effect waves-light btn add-provider-btn" type="submit">Add Provider</button>
          </div>
        </form>
      </div>
    )
  }
  handleOnSubmit = (e) => {
    e.preventDefault();

    const fieldsRefs = Object.keys(this.props.formFields);
    const formData = {};

    fieldsRefs.forEach((formRefKey)=>{
      formData[formRefKey] = this.refs[formRefKey].value
    });

    if(this.props.onSubmit){
      this.setState({successMessage: 'Provider added successfully'})
      this.props.onSubmit(formData)
    }
  }
}

AddProviderForm.propTypes ={
  title: PropTypes.string,
  formFieldsClass: PropTypes.string,
  className: PropTypes.string,
  formFields: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
};

export default AddProviderForm
