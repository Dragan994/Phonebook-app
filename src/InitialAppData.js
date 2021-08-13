function InitialAppData() {
    
    const getContactList = () => {
        const localStorageData = localStorage.getItem("contactListData");
        if(!localStorageData) return []
        
        return JSON.parse(localStorageData)
    }




    return {

        contactList: getContactList(),  // Fetch from Local Storage - all possible contacts
        

        contactForm: {
            isVisible: false,
            isEditing: false,
            formData: {                 // Contains Contact data (used for creating and editing Contact)
                uid:"",                 // Unique ID 
                name: "",
                number: "",
                email: "",
                imgColor:"",
                dateOfCreation: 0
            },
            colors: ["blue", "indigo", "purple", "pink", "red", "orange", "yellow", "green", "teal", "cyan", "gray", "gray-dark"]
        },

        language: {

            selected: "english",

            options: ["english", "serbian"],

            english: {
                title: "Phonebook",
                form: {
                    add: "Add new contact",
                    edit: "Edit contact",
                    contactName: "Name",
                    contactNamePlaceholder: "Enter name",
                    contactNumber: "Number",
                    contactNumberPlaceholder: "Enter number",
                    contactEmail: "Email",
                    contactEmailPlaceholder: "Enter email"
                },
                header: {
                    title: "Contacts",
                    searchbarPlaceholder: "Find contacts",
                    nav: {
                        all: "ALL"
                    }
                }
            }
            
        }

    }
}

export default InitialAppData;