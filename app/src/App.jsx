import './App.css';

import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import PageDisplay from './components/pageDisplay/PageDisplay';

import {Provider} from 'react-redux'
import store from './redux/store'

import {
  BrowserRouter as Router
} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Provider store={store}>
        <div >
          <Topbar />
          <div className="container">
            <Sidebar />
            <PageDisplay />
          </div>
        </div>      
      </Provider>   
    </Router> 
  );
}

export default App;
