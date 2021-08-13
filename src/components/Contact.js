import React from 'react';
import '../styles/Contact.css';
import phoneIcon from "../assets/icons/phone-solid.svg";
import trashIcon from "../assets/icons/trash-solid.svg"
import smsIcon from "../assets/icons/sms-solid.svg"
import mailIcon from "../assets/icons/mail-solid.svg"
import editIcon from "../assets/icons/user-edit-solid.svg"
import {Button} from "react-bootstrap";
function Contact({ contactData, appData, setAppData }) {

    const {uid, name, number, email, imgColor} = contactData;
    const randomImgColor = imgColor;
    

    const deleteContact = uidValue => {
        const newAppData = {...appData};
        let newContactList = []
        newAppData.contactList.forEach( contact => {
            if(contact.uid!==uidValue) {
                newContactList=[...newContactList,contact]
            }
        });
        newAppData.contactList = newContactList;
        localStorage.setItem("contactListData", JSON.stringify(newContactList));
        setAppData(newAppData);
    }

    const editContact = uidValue => {
        const newAppData = {...appData};
        const contactList = newAppData.contactList
        // SET FORM VALUES
        newAppData.contactForm.isVisible = true
        newAppData.contactForm.isEditing = true

        // FIND CONTACT WITH UID
        const selectedContact = contactList.find( contact => contact.uid === uidValue);
        const {uid, name, number, email} = selectedContact;

        // FILL FORM DATA 
        newAppData.contactForm.formData = {uid: uid, name: name, number: number, email: email};
        setAppData(newAppData)
    }

    
    return (
        <div className="contact-wrapper">
            <div className="contact-img" style={{backgroundColor: randomImgColor}}> <h2>{name[0]}</h2></div>
            <div className="contact-data">
                <div className="contact-info">
                    <h3>{name}</h3>
                </div>
                <div className="contact-buttons">
                    <Button className="contact-btn btn-light"
                        style={{backgroundImage: `url(${phoneIcon})`}}
                        href={`tel:${number}`}>
                    </Button>
                    <Button className="contact-btn btn-light"
                        style={{backgroundImage: `url(${smsIcon})`}}
                        href={`sms:${number}`}
                        >
                    </Button>
                    <Button className="contact-btn btn-light"
                        style={{backgroundImage: `url(${mailIcon})`}}
                        href={`mailto:${email}`}>                        
                    </Button>
                    <div className="contact-btn"
                    style={{backgroundImage: `url(${editIcon})`}}
                    onClick={()=>editContact(uid)}
                    >
                        
                    </div>
                    <div className="contact-btn delete-btn"
                    style={{backgroundImage: `url(${trashIcon})`}}
                    onClick={()=>deleteContact(uid)}
                    >
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Contact;