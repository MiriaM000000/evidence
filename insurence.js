"use strict"
// tahání jména z LS
let namesFromLS= JSON.parse(localStorage.getItem("member"))

// taháni čísla z URL adresy, která je zhodná z ID pojištěnce
let nameHash= parseFloat(location.hash.substring(1))

// třídění pojištěnce dle ID
let searched = namesFromLS.find(function(oneObject){
    return oneObject.id === nameHash
})

//  uložení do LS
 class SetStorage{

    addToLS(arrayOfInsurence){
       let insurenceToLS= localStorage.setItem(`${searched.id}`, JSON.stringify(arrayOfInsurence))
       return insurenceToLS;
   }

    getFromLS(){
       let insurenceFromLS= localStorage.getItem(`${searched.id}`) === null ? [] : JSON.parse(localStorage.getItem(`${searched.id}`));
       return insurenceFromLS;
   }
}
// instance pro LS
let data= new SetStorage();


let link= document.querySelector(".editLink")
// zachycení formulářu
const formInsurence= document.querySelector("[data-formInsurence]");
let type= document.querySelector("[data-type]")
let price= document.querySelector("[data-price]")
let item= document.querySelector("[data-item]")
let dateFrom= document.querySelector("[data-from]")
let dateTo= document.querySelector("[data-to]")

// generace ID
let idInsurence= Math.random()*5000
let id= searched.id

// pole pojištění
let arrayOfInsurence=data.getFromLS();

// Název stránky generovaný dle toho o jakého pojištěnce se jedná
class HeaderbyID{
     header(){
        let heading= document.querySelector(".headigForInsurence")
        let h= document.createElement("h1")
        h.style.cssText= `font-size: 1.5rem;`
        h.textContent= `Přidat pojištění k ${searched.firstName} ${searched.lastName}`

        heading.appendChild(h)
    }
}
// instance pro název
let header= new HeaderbyID();
header.header();


// třída pojištění
class Insurence{
    constructor(idInsurence, type, price, item, dateFrom, dateTo){
        this.idInsurence= idInsurence,
        this.type= type,
        this.price= price,
        this.item= item,
        this.dateFrom= dateFrom,
        this.dateTo= dateTo
    }
    
}

// po odesláni formuláře se mi vymažou zadané údaje z inputu
    class Input{
    clearInput(){
        type.value="";
        price.value="";
        item.value="";
}
    //    zpráva o tvorbe pojištění
    setInsurence(){
            let buttonToggle= document.querySelector("#btnInsurence")
            buttonToggle.style.cssText= `background-color: #0dcaf0; color: black; border: none; font-family: 'Open Sans', sans-serif;`
            buttonToggle.innerHTML= `Pojištění bylo vytvořeno`
}
}
// instance
let input= new Input();

// submit
formInsurence.addEventListener("submit", function(e){
    e.preventDefault()

    // refresh stránky po odesláni formuláře, potřebný pro tvorbu unikátniho ID .
    setTimeout(() => {
        window.location.reload();
    }, 1500);

    // instance pojištění
    const insurence= new Insurence(idInsurence, type.value, price.value, item.value, dateFrom.value, dateTo.value)
    arrayOfInsurence= [...arrayOfInsurence, insurence]
  
    // uložení do LS
    data.addToLS(arrayOfInsurence)
        
    // vyčištění inputu po odesláni form
    input.clearInput();
    input.setInsurence();
})


