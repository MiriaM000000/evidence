"use strict";

// UCHYCENÍ ELEMENTŮ
const form= document.querySelector("[data-form]");


// uchycení inputu ve form
let firstName= document.querySelector("[data-input-firstName]");
let lastName= document.querySelector("[data-input-lastName]");
let email= document.querySelector("[data-input-email]");
let phone= document.querySelector("[data-input-phone]");
let street= document.querySelector("[data-input-street]");
let city= document.querySelector("[data-input-city]");
let psc= document.querySelector("[data-input-psc]");
let birthYear= document.querySelector("[data-input-birthYear]");
let gender= document.querySelector("[data-input-gender]");

const list= document.querySelector("[data-list]");


// třída pro LS--- pojištěněc
 class SetLocalStorage{
     addToLS(listArray){
        let nameToLS= localStorage.setItem("member", JSON.stringify(listArray))
        return nameToLS;

    }

     getFromLS(){
        let nameFromLS= localStorage.getItem("member") === null ? [] : JSON.parse(localStorage.getItem("member"));
        return nameFromLS;
    }
}

// instance
let database= new SetLocalStorage();


// POLE PRO ZOBRAZENÍ DÁT V HTML
let listArray= database.getFromLS();

// FORMULÁŘ

form.addEventListener("submit", function(e){
    e.preventDefault();

    // funkce pro generaci 8-místného ID 
    function GenerateUniqueID() {
    return (Math.random() * (78500000 - 78400101) + 78400101)|0;
    }

    // ID
    let id= GenerateUniqueID();

    // tvorba instance pro Members
    const person= new Members(id, firstName.value, lastName.value, email.value, phone.value, street.value, city.value, psc.value, birthYear.value, gender.value);
    // naplnění pole daty z inputu
     listArray= [...listArray, person]

    // po odesláni se mi vyčistí input
     data.clearInput();

    // uložení v LS
    // ošetření v případě že někdo submitne formulář bez údajů
    if(person.firstName !== ''){
        database.addToLS(listArray);
    } 
    else if(person.firstName === '')
    {
        let modal= document.querySelector("#memberModalLabel")
        modal.textContent=`Pojišteněc nebyl uložen`
        modal.style.cssText=`color: #F83839;`
       
        let modalBody= document.querySelector("#modalBody")
        modalBody.textContent=`vyplnte jméno a příjmení`

        let modalBtn= document.querySelector("#modalBtn")
        modalBtn.style.cssText=`display:none`

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
    
   
});

// TVORBA OBJEKTU PRO INPUTY
class Members{
    constructor(id, firstName, lastName, email, phone, street, city, psc, birthYear, gender){
        this.id= id;
        this.firstName= firstName;
        this.lastName= lastName;
        this.email= email;
        this.phone= phone;
        this.street= street;
        this.city= city;
        this.psc= psc;
        this.birthYear= birthYear;
        this.gender= gender;
    }
}

class Data{
    // po odesláni formuláře se mi vymažou zadané údaje z inputu
    clearInput(){
        firstName.value="";
        lastName.value="";
        email.value="";
        phone.value="";
        street.value="";
        city.value="";
        psc.value="";
        birthYear.value="";
     }
}

// instance
let data= new Data;
