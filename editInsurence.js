"use strict"

        let getLS= location.hash.substring(1,9);
        let database= JSON.parse(localStorage.getItem(getLS))
        let editID= parseFloat(location.hash.substring(9));

        // porovnáni ID pro extrakci dat
        let editInsurence = database.find(function(oneObject){
            return oneObject.idInsurence === editID
        })


        // ošetření chyby
        if(editInsurence === undefined){
            location.assign("/list.html")
        }

        let editForm= document.querySelector("#editInsurence")
        let message= document.querySelector(".unsuccess")
        let success= document.querySelector(".success")



        class EditInsurence{

    // vkládaní údajů do inputu 

           setData(){
            document.querySelector("[data-insurence]").value = editInsurence.type;
            document.querySelector("[data-sum]").value = editInsurence.price;
            document.querySelector("[data-subject]").value = editInsurence.item;
            document.querySelector("[data-dateFrom]").value = editInsurence.dateFrom;
            document.querySelector("[data-dateTo]").value = editInsurence.dateTo;
               
           }
        //    zpráva o úšpěšném/neúspěšném editováni pojištění
           succesUnsucces(){

               if(editInsurence.type !== '' && editInsurence.price !== '' && editInsurence.item !== ''
               && editInsurence.dateFrom !== '' && editInsurence.dateTo !== ''){

                let buttonToggle= document.querySelector("#editInsurenceBtn")
                buttonToggle.style.cssText= `background-color: #198754; color: white; border: none; font-family: 'Open Sans', sans-serif;`
                buttonToggle.innerHTML= `Povedlo se editovat pojištění`

                setTimeout(() => {
                    window.location.reload();
                }, 1500);

    } else {

        let button= document.querySelector("#editInsurenceBtn")
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
            let changedInsurence= new EditInsurence()    
            changedInsurence.setData();

            // úkony na submit

            class Submit{

                editFormSubmit(){
                    editForm.addEventListener("submit", function(e){
                        e.preventDefault();
                    
                    // ukládaní editovaných údajů
                    editInsurence.type = e.target.elements.type.value
                    editInsurence.price = e.target.elements.price.value
                    editInsurence.item = e.target.elements.subject.value
                    editInsurence.dateFrom = e.target.elements.dateFrom.value
                    editInsurence.dateTo = e.target.elements.dateTo.value


                    // uložení editovaných údajů do LS
                    let editLS= localStorage.setItem(getLS, JSON.stringify(database))
                    

                    // volání zprávy o editovaných položkách na submit
                    changedInsurence.succesUnsucces();

                    })
                }

            }

            // instance 
            let formInsurence= new Submit();
            formInsurence.editFormSubmit();
   