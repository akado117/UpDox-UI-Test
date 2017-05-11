import React from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default function App() {
  return (
    <div className="app">
      Hello world
    </div>
  );
}
