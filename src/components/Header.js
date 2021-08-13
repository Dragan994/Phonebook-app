import React from 'react';
import '../styles/Header.css';



function Header({appData, setAppData}) {
    const selectedLanguage = appData.language.selected;
    const text = appData.language[selectedLanguage].header;




    return (
        <div className="header-wrapper">
            <header className="header">

                <h2>{text.title}</h2>
                
            </header>

            <nav className="header-nav">


            </nav>
        </div>
    )
}
export default Header;