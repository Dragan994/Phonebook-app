import React, {useState} from 'react';
import './styles/App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import InitialAppData from './InitialAppData';
import Header from './components/Header'
function App() {

  const [appData, setAppData] = useState(InitialAppData());

  return (
    <div className="app-wrapper">
      <div className="app-container">


      <Header appData={appData} setAppData={setAppData}/>

      <ContactList appData={appData} setAppData={setAppData}/>
      </div>

      <ContactForm appData={appData} setAppData={setAppData}/>

    </div>
  );
}

export default App;
