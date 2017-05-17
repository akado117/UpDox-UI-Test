import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Autosuggest from 'react-autosuggest';


class ProviderSearch extends React.Component {
  constructor(props) {
    super(props);

    const defaultSearchBy = (Object.keys(props.searchFields).length)? Object.keys(props.searchFields)[0] : '';
    this.state= {searchBy: defaultSearchBy, value:'',currentSuggestions: []}
  }

  render() {

    const searchFields = [];
  Object.keys(this.props.searchFields).forEach((field,idx)=>{
      const fieldObj = this.props.searchFields[field];
      searchFields.push(<MenuItem key={`search-${idx}`} value={field} primaryText={fieldObj? fieldObj.label : 'invalid field'}/>)
    });

    const { value, currentSuggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Search For',
      value,
      onChange: this.onInputChange
    };

    return(
      <div className="row provider-search-container">
        <div className="col s6 m8 l6">
          <Autosuggest
            suggestions={currentSuggestions}
            onSuggestionSelected={this.searchSelectedHandler}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
          />
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
  searchSelectedHandler = () => {
    if(this.props.onSearchSelected){
      this.props.onSearchSelected(this.state.value,this.state.searchBy)
    }
  };
  onSelectFieldChange = (e,key,value) => {
    if(value){
      this.setState({searchBy: value})
    }
  };
  onInputChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      currentSuggestions: this.getSuggestions(value)
    });
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      currentSuggestions: []
    });
  };
  getSuggestions = value => {
    const providers = this.props.providers || [];
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const suggestions = [];
    if(inputLength) {
      providers.forEach((provider) => {
        if (provider[this.state.searchBy].toLowerCase().slice(0, inputLength) === inputValue)
          suggestions.push(provider[this.state.searchBy])
      });
    }
    return returnUnique(suggestions);
  };
  getSuggestionValue = suggestion => suggestion;
  renderSuggestion = suggestion => (//can make them pretty/have pictures/ect
    <div>
      {suggestion}
    </div>
  );
}

const returnUnique = (arr)=> {
  const seen = {};
  return arr.filter(function(item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
};


ProviderSearch.propTypes = {
  searchFields: PropTypes.object.isRequired,
  providers: PropTypes.array.isRequired,
  onSearchSelected: PropTypes.func.isRequired
};

export default ProviderSearch
