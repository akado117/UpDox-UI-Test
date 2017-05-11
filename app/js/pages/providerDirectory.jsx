import React from 'react'

import Provider from '../components/provider.jsx'
import _ from 'lodash'

import Data from '../lib/data'

class ProviderDirectory extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      providers: Data.initialData || [],
      activeProviders: []
    }
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

    return (
      <div className="container provider-directory-container">
        <div className="provider-list">
          {providers}
        </div>
      </div>
    )
  }
};

export default ProviderDirectory
