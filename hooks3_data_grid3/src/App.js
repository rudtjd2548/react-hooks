import React, { Component } from 'react';
import './App.css';

import DataArray from './DataArray';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <DataArray
          suggestions={[
            { product: 'Yumyum Apple', purchasePrice: '100' },
            { product: 'Avocado', purchasePrice: '300' },
            { product: 'Banana', purchasePrice: '200' },
            { product: 'Beans', purchasePrice: '50' },
            { product: 'Beet', purchasePrice: '400' },
            { product: 'Carrot', purchasePrice: '150' }
          ]}
        />
      </div>
    );
  }
}

export default App;
