
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

// onValue function -> fetching database item 

import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shoppingapp-8ca6f-default-rtdb.asia-southeast1.firebasedatabase.app/"

}

const app = initializeApp(appSettings)
const database = getDatabase(app)
// ref(database, naming the database)
const shoppingListInDB = ref(database, "shoppingCart")

const cartBtn = document.getElementById("add-button")
const inputEl = document.getElementById("input-field")
const shoppingCart = document.getElementById("shopping-cart")

cartBtn.addEventListener("click", function(){
    let inputValue = inputEl.value
    push(shoppingListInDB, inputValue)

   // inputEl.value = ""
   clearInputField()

   // shoppingCart.innerHTML += `<li>${inputValue}</li>`
// showing duplication in onValue function
 //   addingItems(inputValue) 

})

//onValue(reference, )
onValue(shoppingListInDB, function(snapshot){   
    // snapshot -> sending new data to all clients

    if(snapshot.exists()){

        // converting objects to array
     let itemsInDB = Object.entries(snapshot.val())
     clearShoppingList()

     for (let i = 0; i < itemsInDB.length; i++){
        let currentItem = itemsInDB[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        
        addingItems(currentItem)
     }
    } else{
        shoppingCart.innerHTML = "No items here...yet!"
    }

        
})

 function clearShoppingList(){
     shoppingCart.innerHTML = ""
}

function clearInputField(){
    inputEl.value = ""   
}

function addingItems(item){
    //shoppingCart.innerHTML += `<li>${items}</li>`

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li") //<li></li>
    newEl.textContent = itemValue      //<li>text</li>
    shoppingCart.append(newEl)  //displaying text

    newEl.addEventListener("dblclick", function() {
        let removeItemFromDB = ref(database, `shoppingCart/${itemID}`)
        remove(removeItemFromDB)
    })
}
 

