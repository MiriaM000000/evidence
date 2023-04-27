"use strict"

// POLE PRO ZOBRAZENÍ DÁT V HTML
let listArray= JSON.parse(localStorage.getItem("member"))

// zachycení tabulky pro zobrazení dát
let tableData= document.querySelector("#table-body")

class ListOfMembers{

    displayData(){

        if (!Array.isArray(listArray)) {
            // v případe, že seznam není pole
            return;
        }
       let displayData = listArray.map((one) => {
           return `
           <table class="table">
           <tbody id="table-body border">
             <tr>
              <td scope="col"><a href='detail.html#${one.id}' class='link'>${one.firstName} ${one.lastName}</a></td>
              <td scope="col">${one.street}, ${one.city}</td>
             </tr>
           </tbody>
         </table>

               ` 
       });
       tableData.innerHTML = (displayData).join(" ");      
}

}
    // instance
        let membersList= new ListOfMembers();
        membersList.displayData();
