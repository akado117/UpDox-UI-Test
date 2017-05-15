import React from 'react'

import Provider from '../components/provider.jsx'
import AddProviderForm from '../components/addproviderForm.jsx'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash'

import Data from '../lib/data'

class ProviderDirectory extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      providers: Data.initialData || [],
      activeProviders: [],
      sortByField: '',
      sortByOrder: 'asc'
    }
  }

  componentDidMount = () => {
    $(document).ready(function() {
      $('select').material_select();
    });
  }

  render() {
    const providers = [];
    this.state.providers.forEach((provider,idx)=>{
      const props = {}
      if (this.state.activeProviders.indexOf(idx) > -1){
        props.className = 'active'
      }
      providers.push(<Provider {...props}
                               key={`provider-${idx}`}
                               provider={provider}
                               onClick={()=>{this.toggleActiveProvider(idx)}}/>)
    });

    const dataKeys = Data.dataFields? Object.keys(Data.dataFields): []
    const sortOptions = []
    dataKeys.forEach((key, idx)=>{
      sortOptions.push(<MenuItem value={key} key={`sortItem-${idx}`} primaryText={Data.dataFields[key][0]} />)
    })

    return (
      <div className="container provider-directory-container">
        <div className="row">
          <div className="col s12 l6">
            <div className="row secondary-title">
              <h2>Create Provider</h2>
            </div>
            <AddProviderForm formFields={Data.dataFields} onSubmit={this.addProvider}/>
          </div>
          <div className="col s12 l6">
            <div className="row secondary-title">
              <h2>Provider List</h2>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <SelectField
                  floatingLabelText="Sort By"
                  floatingLabelFixed={true}
                  onChange={this.changeSortBy}
                  fullWidth={true}
                  value={this.state.sortByField}>
                  <MenuItem value="" primaryText="None"/>
                  {sortOptions}
                </SelectField>
              </div>
              <div className="input-field col s6">
                <SelectField
                  floatingLabelText="Sort Order"
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={this.changeSortByOrder}
                  value={this.state.sortByOrder}>
                  <MenuItem value="asc" primaryText="Ascending"/>
                  <MenuItem value="desc" primaryText="Descending"/>
                </SelectField>
              </div>
            </div>
            <div className="row">
              <div className="provider-list col s12">
                {providers}
              </div>
            </div>
            <div className="row">
              <div className="col s12 remove-btn-container">
                <button className="waves-effect waves-light btn remove-btn"
                        onClick={this.removeSelectedProviders}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  removeSelectedProviders = () => {
    const providersClone = _.cloneDeep(this.state.providers);
    const sortedActiveProviders =  this.state.activeProviders.sort((a, b)=>{return b-a});
    sortedActiveProviders.forEach((providerIdx)=>{
      providersClone.splice(providerIdx, 1)
    });
    this.setState({providers: providersClone, activeProviders: []})
  }

  toggleActiveProvider = (idx)=> {
    const activeProvidersClone = _.cloneDeep(this.state.activeProviders)
    const locationOfIdx = activeProvidersClone.indexOf(idx)
    if(locationOfIdx > -1){
      activeProvidersClone.splice(locationOfIdx,1)

    } else {
      activeProvidersClone.push(idx)
    }
    this.setState({activeProviders: activeProvidersClone})
  }

  sortProviders = (field, order) => {
    if(field && this.state.providers.length > -1 &&  typeof this.state.providers[0][field] !== 'undefined'){
      const providers = _.orderBy(this.state.providers, field, order)
      this.setState({providers})
    }
  }

  changeSortBy = (e, key, payload) => {
    if(payload){
      this.setState({sortByField: payload})
      this.sortProviders(payload, this.state.sortByOrder)
    }
  }
  changeSortByOrder = (e, key, payload) => {
    if(payload){
      this.setState({sortByOrder: payload});
      this.sortProviders(this.state.sortByField, payload)
    }
  }
  addProvider = (providerData) => {
    this.state.providers.push(providerData);//"bad practice" as its modifying state without calling setState
    this.setState({providers: this.state.providers});//since setState is called immediately after its not worth the performance hit to create a new object and clone it.
  }
}

export default ProviderDirectory
