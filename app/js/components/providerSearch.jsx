import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class ProviderSearch extends React.Component {
  constructor() {
    super();

    this.state= {searchBy: ''}
  }

  render() {

    const searchFields = [];
  Object.keys(this.props.searchFields).forEach((field,idx)=>{
      const fieldObj = this.props.searchFields[field];
      searchFields.push(<MenuItem key={`search-${idx}`} value={field} primaryText={fieldObj? fieldObj.label : 'invalid field'}/>)
    });

    return(
      <div className="row">
        <div className="col s6 m8 l6">

        </div>
        <div className="col s6 m4 l6">
          <div className="input-field remove-margin">
            <SelectField
              floatingLabelText="Search By"
              floatingLabelFixed={true}
              fullWidth={true}
              onChange={this.onSelectFieldChange}
              value={this.state.searchBy}>
              <MenuItem disabled={true} value="" primaryText="Please Chose a Field"/>
              {searchFields}
            </SelectField>
          </div>
        </div>
      </div>
    )
  }
  onSelectFieldChange = (e,key,value) => {
    if(value){
      this.setState({searchBy: value})
    }
  }
}

ProviderSearch.propTypes = {
  searchFields: PropTypes.object.isRequired
};

export default ProviderSearch
