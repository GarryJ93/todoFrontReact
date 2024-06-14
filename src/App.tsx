
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { WcsGalactic, defineCustomElements } from 'wcs-react';
import routes from './RoutesConfig';



defineCustomElements();

const App: React.FC = () => {
  return (
    <>
      <WcsGalactic text="ToDo React"></WcsGalactic>
      <Router>{routes}</Router>
    </>
  ); };
      
export default App;