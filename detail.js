"use strict"
// založení LS
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

// instance pro databázi
let database= new SetLocalStorage();
let listArray= database.getFromLS();




// zachycení HTML elementů
let nameID = parseFloat(location.hash.substring(1))
let detail= document.querySelector(".detail")
let alertDiv= document.querySelector(".alertDiv")
let createBtn= document.querySelector(".create")

// generacejména dle ID
let searchedName = listArray.find(function(oneObject){
    return oneObject.id === nameID })

// třída pro zobrazení detailu os.údajů
class Detail{

     displayData(){

                    this.setAge= function(){
                        const currentYear= new Date().getFullYear();
                        let age= currentYear - searchedName.birthYear
                        return age
                    }


// Div pro HTML struktúru
let div = document.createElement("div");

// obrázek ikona
let icone= document.querySelector(".iconeImg")
let image = document.createElement("img");
image.setAttribute("src", searchedName.gender === "female" ? "images/womanIcone.png" : "images/manIcone.png");
image.classList.add("imgIcone");
image.style.cssText=` width: 30%; height: 45%;`

// // tvorba paragrafu pro zobrazení dát o pojištěnci
let paragraph = document.createElement("p");

// // tvorba ikony na mazání údajů
let deleteBtn = document.createElement("img");

// // tvorba odkazu na přidávaní pojištění
let link = document.createElement("a");

// vzhled dat v divu
div.innerHTML= `
Jméno a příjmení: ${searchedName.firstName} ${searchedName.lastName} <br>
Věk: ${this.setAge()} <br>
Telefonní číslo: ${searchedName.phone}<br>
E-mail: ${searchedName.email} <br>
Adresa: ${searchedName.street}, ${searchedName.city}, ${searchedName.psc}
<img src='images/DELETE.png' data-id= '${searchedName.id}' class='deleteBtn' style= "width: 6%; cursor: pointer;">
<a href='edit.html#${searchedName.id}'><img src="images/EDIT.png" class="edit" style="width: 6%;"></a>
`
icone.appendChild(image)
detail.appendChild(div);
}

// odstránení jména ze seznamu
     removeName(){
        detail.addEventListener("click", function(e){
            if(e.target.classList.contains("deleteBtn")){
            e.target.parentElement.remove();

            // odtránení pojištění spolu s jménem
            let ID = location.hash.substring(1)
            localStorage.removeItem(ID)
            window.location.reload();

            // přesměrováni zpátky na seznam pojištěnců
            location.assign("/index.html")
            
        }
            // zachycení ID
            let btn= e.target.dataset.id;
            // odstránení jména z pole
            dataDetail.removeFromArray(btn);
});

}
        // odtránění z pole
    removeFromArray(id){
        listArray= listArray.filter((name) => name.id !== +id);
        database.addToLS(listArray);
}   

     checkAdult(){
        // ošetřní neplnoletého pojištěnce
        if(this.setAge() < 18){
        alert("Pojištenec je nezletilí, není možné uzavřít pojištění! Prosím vymažte údaje z databáze");
        }
}
}

// instance pro třídu Detail
let dataDetail= new Detail();

// přidáni ID pro tvotbu pojištění
createBtn.setAttribute(`href`,  `insurence.html#${searchedName.id}`)

// pojištění
const info= document.querySelector("[data-info]");
let dataForInsurence=localStorage.getItem(nameID) === null ? [] : JSON.parse(localStorage.getItem(nameID))


// zobrazení dát o pojištění
class DisplayInsurence{
    
    displayDataOfInsurence() {
        let displayData = dataForInsurence.map((data) => {
            return `
            <div class="insurence">
            <h3 style="font-weight: 600;">${data.type}</h3>
            <p>cena pojištění: ${data.price} kč, <br> druh pojištění: ${data.item}</p>
            <p> Pojištění sjednáno rok/měsíc/den: ${data.dateFrom} <br>
            <p> Pojištění bude ukončeno rok/měsíc/den: ${data.dateTo}
            <img src="images/DELETE.png" class="removeInsurence" data-id= ${data.idInsurence} style="width: 7%; cursor: pointer;">
            <a href="editInsurence.html#${searchedName.id}${data.idInsurence}" class="editLink"><img src="images/EDIT.png" class="editInsurence" style="width:7%"></a>
            </div>
                ` 
        });
        info.innerHTML = (displayData).join(" ");      
}


    // odstránení pojištění ze seznamu
     removeInsurence(){
        info.addEventListener("click", function(e){
            if(e.target.classList.contains("removeInsurence")){
            e.target.parentElement.remove();
        }
        // zachycení ID
        let btn=e.target.dataset.id;
        // odstránení pojištění z pole
        window.location.reload();
        insurence.removeFromArray(btn);

});
}
        // odstránění z pole
     removeFromArray(id){
        dataForInsurence= dataForInsurence.filter((one) => one.idInsurence !== +id);
        
        // uložení nových údajů 
        localStorage.setItem(`${searchedName.id}`, JSON.stringify(dataForInsurence))
}
}

let insurence= new DisplayInsurence();


//po refreshnutí stránky mi zůstanou data zobrazené
window.addEventListener("DOMContentLoaded", function() {
    dataDetail.displayData();
    dataDetail.checkAdult();
    insurence.displayDataOfInsurence();

    //odtránení z DOM
    dataDetail.removeName();
    insurence.removeInsurence();
}); 


