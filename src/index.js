import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Scorocode from './lib/Scorocode'


Scorocode.Init({
  ApplicationID: "3196b2e873234547ad8b06ed636d3538",
  JavaScriptKey: "5e85f685a23e44e6abad95accc1dd2ea",
  MasterKey: "659d718ff9664f6fafbdb79efc93cb34"
});

global.Scorocode = Scorocode;

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
