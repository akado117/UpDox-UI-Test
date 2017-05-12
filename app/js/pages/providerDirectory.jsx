import React from 'react'

import Provider from '../components/provider.jsx'
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
      sortOptions.push(<MenuItem value={key} key={`sortItem-${idx}`} primaryText={Data.dataFields[key]} />)
    })

    return (
      <div className="container provider-directory-container">
        <div className="row">
          <div className="col s12 l6">
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
          </div>
        </div>
      </div>
    )
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
      this.setState({sortByOrder: payload})
      this.sortProviders(this.state.sortByField, payload)
    }
  }
};

export default ProviderDirectory
