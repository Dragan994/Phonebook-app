import React from 'react'
import Contact from './Contact';
import '../styles/ContactList.css'


function ContactList({appData, setAppData}) {


    const contacts = appData.contactList;
    
    return (
        <div id="contact-list-wrapper">
        
            <div className="contact-list">
                {contacts.map( contactData => {
                    return  <Contact key={`${contactData.uid}`} contactData={contactData} appData={appData} setAppData={setAppData}/>
                    
                })}
            </div>
        
        </div>
    )
}
export default ContactList;