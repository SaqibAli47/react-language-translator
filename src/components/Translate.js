import React, { useEffect } from 'react'
import { isCompositeComponent } from 'react-dom/test-utils';
import countries from '../data'

const Translate = () => {
    useEffect(() => {
        const fromText = document.querySelector(".from-text");
        const toText = document.querySelector(".to-text");
        const exchangeIcon = document.querySelector(".exchange");
        const selectTag = document.querySelectorAll("select");
        const Icon = document.querySelector(".row i");
        const translateBtn = document.querySelector("Button");
        selectTag.forEach((tag, id) => {
            // console.log(tag)
            for (let country_code in countries) {
                // console.log(country_code);
                let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "hi-IN" ? "selected" : "";
                let option = `<option ${selected} value ="${country_code}">${countries[country_code]}</option>`;
                // tag.insertAdjacentElement("beforeend", option);
                tag.insertAdjacentHTML("beforeend", option);

            }
        });
        exchangeIcon.addEventListener("click", () =>{
            let tempText = fromText.value;
            // console.log(tempText)
            let tempLang = selectTag[0].value;
            // console.log(tempLang);
            fromText.value = toText.value;
            toText.value = tempText;
            // console.log(tempText);
            selectTag[0].value = selectTag[1].value;
            selectTag[1].value = tempLang;
        });

        fromText.addEventListener("keyup", () => {
            if(!toText.value){
                toText.value = "";
            }
        });
        translateBtn.addEventListener("click", ()=>{
            let text = fromText.value.trim();
            let translateFrom = selectTag[0].value;
            let translateTo = selectTag[1].value;
            console.log(translateTo);
            if(!text) return;
            toText.setAttribute("placeholder", 'translating...');
            let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
            fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                toText.value = data.responseData.translatedText;
            });
            toText.setAttribute("placeholder", "Translation");
            // isCompositeComponent.
        });

    }, []);
    return <>
        <div className="container">
            <div className="wrapper">
                <div className="text-input">
                    <textarea spellCheck="false" className="from-text" placeholder="Enter text"></textarea>
                    <textarea spellCheck="false" readOnly className="to-text" placeholder="Translation"></textarea>
                </div>
                <ul className="controls new-controls">
                    <li className="row from">
                        <div className="icons">
                            <i id="from" className="fas fa-volume-up"></i>
                            <i id="from" className="fas fa-copy"></i>
                        </div>
                        <select></select>
                    </li>
                    <li className="exchange"><i className="fas fa-exchange-alt"></i></li>
                    <li className="row to">
                        <select></select>
                        <div className="icons">
                            <i id="to" className="fas fa-volume-up"></i>
                            <i id="to" className="fas fa-copy"></i>
                        </div>
                    </li>
                </ul>
            </div>
            <button>Translate Text</button>
        </div>
    </>
}

export default Translate