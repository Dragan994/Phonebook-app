import "../styles/ContactForm.css";
import React from 'react';
import uuid from 'react-uuid';
import arrowLeftIcon from '../assets/icons/arrow-left-solid.svg';
import confirmIcon from '../assets/icons/check-solid.svg';
import newUserIcon from '../assets/icons/user-plus-solid.svg';
import {Form} from 'react-bootstrap'

function ContactForm({appData, setAppData}) {


    const {isEditing, isVisible, formData} = appData.contactForm;

    const selectedLanguage = appData.language.selected;
    const text = appData.language[selectedLanguage];

    const defaultFormData = {
        uid:"", 
        name: "",
        number: "",
        email: "",
        imgColor: "",
        interactionCount: 0,
        dateOfCreation: 0
    }
    const showForm = () => {
        setAppData( prevAppData => {
            const newAppData = {...prevAppData};
                newAppData.contactForm.isVisible = true;
                newAppData.contactForm.isEditing = false;
            return newAppData
        })
    }
    const leaveForm = () => {
        setAppData( prevAppData => {
            const newAppData = {...prevAppData};
                newAppData.contactForm.isVisible = false;
                newAppData.contactForm.formData = defaultFormData;
            return newAppData
        })
    }
    const updateContact = () => {
        const newAppData = {...appData};
        const {uid, name, number, email} = formData;
        newAppData.contactList.map( contact => {
            if(contact.uid === uid) {
                contact.name = name;
                contact.number = number;
                contact.email = email;

            }
        });

        setAppData(newAppData);
        console.log("updated")
        leaveForm();
        
    }





    const addContact = () => {
        const {name,number} = appData.contactForm.formData
        if(!name || !number){
            // Warns user about empty fields
            console.log("Empty input")
            return
        }
        const newAppData = {...appData};
        newAppData.contactForm.isEditing = false;
        newAppData.contactForm.formData.uid = uuid();
        newAppData.contactForm.formData.dateOfCreation = Date.now();
        newAppData.contactForm.formData.imgColor = getRandomColor();

        const newContact = {...newAppData.contactForm.formData}
        const newContactList = [...appData.contactList, newContact];
            
        newAppData.contactForm.formData = defaultFormData;
        
        newAppData.contactList = newContactList;

        localStorage.setItem("contactListData", JSON.stringify(newContactList))
            
            
        setAppData(newAppData)
        leaveForm();
    }

    const updateInput = input => {
        const inputValue = document.getElementById(`form-${input}`).value;
        const newAppData = {...appData};
        if(input === "name") {
            let nameValue = inputValue;
            let nameCapitalized = nameValue.charAt(0).toUpperCase() + nameValue.slice(1);
            
            newAppData.contactForm.formData[input] = nameCapitalized;
            setAppData(newAppData);
            return
        }
        newAppData.contactForm.formData[input] = inputValue;
        setAppData(newAppData);

    }

    const getRandomColor = () => {
        const colors =[...appData.contactForm.colors];
        const randomNum = Math.floor(Math.random()*colors.length);
        return `var(--${colors[randomNum]})`
    }

    return (
        <div className="contact-form-wrapper">
            <div className= { isVisible? "contact-form  go-up": " contact-form go-down" } >

            <header>

                <div className="icon-container"
                        onClick={leaveForm}>
                    <img src={arrowLeftIcon} alt="Arrow left icon"/>
                </div>

                <div className="header-title">
                    <h2>{ isEditing? text.form.edit: text.form.add }</h2>
                </div>

                <div className="icon-container"
                        onClick={ isEditing? updateContact: addContact }>
                    <img src={confirmIcon} alt="Confirm icon"/>
                </div>

            </header>

            <div>
                <Form>

                    <Form.Group controlId="form-name">
                        <Form.Label>{text.form.contactName}</Form.Label>
                        <Form.Control  type="text"
                            placeholder={text.form.contactNamePlaceholder}
                            value={formData.name}
                            onChange={()=>updateInput("name")}
                            />
                    </Form.Group>

                    <Form.Group controlId="form-number">
                        <Form.Label>{text.form.contactNumber}</Form.Label>
                        <Form.Control type="text"
                            placeholder={text.form.contactNumberPlaceholder}
                            value={formData.number}
                            onChange={()=>updateInput("number")}
                            />
                    </Form.Group>

                    <Form.Group controlId="form-email">
                        <Form.Label>{text.form.contactEmail}</Form.Label>
                        <Form.Control type="text"
                            placeholder={text.form.contactEmailPlaceholder}
                            value={formData.email}
                            onChange={()=>updateInput("email")}
                            />
                    </Form.Group>

                </Form>
            </div>


            </div>
            
            <div className={ !isVisible? "showForm-btn": "hidden" }
                onClick={showForm}>
                <img src={newUserIcon}/>
            </div>
        </div>
    )
}
export default ContactForm;