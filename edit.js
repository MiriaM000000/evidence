"use strict"

// cesta od odkazu k form
let editID = parseFloat(location.hash.substring(1))
let edit = JSON.parse(localStorage.getItem("member"))

        let editName = edit.find(function(oneObject){
            return oneObject.id === editID
         })

if(editName === undefined){
    location.assign("/index.html")
}

// vznik nadpisu s jménem pojištěnce
class Heading{
    Header(){
        let headingSpace= document.querySelector(".heading")
        let heading= document.createElement("h")
        heading.textContent= `Upravit osobní údaje ${editName.firstName} ${editName.lastName}`
        headingSpace.appendChild(heading)
    }
}
let header= new Heading();
header.Header();


// editace os.údajů
let editForm= document.querySelector("#editMember")

class Editdata{
 // vkládaní údajů do inputu dle ID
        setData(){
            document.querySelector("#firstName").value= editName.firstName;
            document.querySelector("#lastName").value= editName.lastName;
            document.querySelector("#email").value= editName.email;
            document.querySelector("#phone").value= editName.phone;
            document.querySelector("#street").value= editName.street;
            document.querySelector("#city").value= editName.city;
            document.querySelector("#psc").value= editName.psc;
            document.querySelector("#birthYear").value= editName.birthYear;
            document.querySelector("#gender").value= editName.gender
            
        }
        //    zpráva o úšpěšném/neúspěšném editováni os.údajů
        succesUnsucces(){
            let editLS= localStorage.setItem("member", JSON.stringify(edit))


            if(editName.firstName !== '' && editName.lastName !== '' && editName.email !== ''
            && editName.phone !== '' && editName.street !== '' && editName.city !== '' && editName.psc !== '' 
            && editName.birthYear !== '' && editName.gender !== ''){

                let buttonToggle= document.querySelector("#btnEdit")
                buttonToggle.style.cssText= `background-color: #198754; color: white; border: none; font-family: 'Open Sans', sans-serif;`
                buttonToggle.innerHTML= `Povedlo se editovat údaje`

                setTimeout(() => {
                    window.location.reload();
                }, 1500);

    } else {

        let button= document.querySelector("#btnEdit")
        button.setAttribute("type", "submit")
        button.style.cssText= `background-color: #F83839; color: white; border: none; font-family: 'Open Sans', sans-serif;`
        button.innerHTML= `Chyba, skontrolujte zda jste vyplnili všechny políčka`


        // po 3s mi zpráva o nevyplněných údajich zmizí a následný refresh stránky pro následní činnost
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }

        }

}
// instance

let editedData= new Editdata();
editedData.setData();

// úkony na submit form

class Submit{

    editFormSubmit(){
        editForm.addEventListener("submit", function(e){
            e.preventDefault();
        
                // ukládaní editovaných údajů
                editName.firstName = e.target.elements.firstName.value
                editName.lastName = e.target.elements.lastName.value
                editName.email = e.target.elements.email.value
                editName.phone = e.target.elements.phone.value
                editName.street = e.target.elements.street.value
                editName.city = e.target.elements.city.value
                editName.psc = e.target.elements.psc.value
                editName.birthYear=e.target.elements.birthYear.value
                editName.gender= e.target.elements.gender.value
        

            // volání zprávy o editovaných položkách na submit
                 editedData.succesUnsucces();

        })
    }

}

        // instance
        let form= new Submit();
        form.editFormSubmit();
