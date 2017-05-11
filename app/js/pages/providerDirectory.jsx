import React from 'react'

import Provider from '../components/provider.jsx'
import _ from 'lodash'

import Data from '../lib/data'

class ProviderDirectory extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      providers: Data.initialData || []
    }
  }

  render() {
    const providers = [];
    this.state.providers.forEach((provider,idx)=>{
      providers.push(<Provider key={`provider-${idx}`} provider={provider}/>)
    });

    return (
      <div className="container">
        {providers}
      </div>
    )
  }
};

export default ProviderDirectory
