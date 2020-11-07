var list = document.getElementById("todo-item")



firebase.database().ref('todos').on('child_added',function(data){
    var li = document.createElement('li')
    li.setAttribute("class", "list_li")
    var liText = document.createTextNode(data.val().value)
    li.appendChild(liText)
    list.appendChild(li)




    // delete btn tag 
    var delbtn = document.createElement('button')
    var dettext = document.createTextNode("delete")

    delbtn.append(dettext)
    li.appendChild(delbtn)
    delbtn.setAttribute("class", "delete-btn")
    delbtn.setAttribute("id",data.val().key)
    delbtn.setAttribute("onclick", "deleteitem(this)")

    // edit btn tag  
    var delbtn = document.createElement('button')
    var dettext = document.createTextNode("Edit")
    delbtn.setAttribute("class", "Edit-btn")
    delbtn.setAttribute("id" ,data.val().key)
    delbtn.setAttribute("onclick", "Edititem(this)")

    delbtn.append(dettext)
    li.appendChild(delbtn)

    


})





function additem() {
    // create li tag
    var todo = document.getElementById("val")
    if (todo.value != "") {
// database
        var  database = firebase.database().ref('todos')
        var key = database.push().key
        var Todo = {
            value : todo.value,
            key: key
        }
database.child(key).set(Todo);
}
todo.value = ""
}






function deleteitem(e) {
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
}

function deleteall() {
    firebase.database().ref('todos').remove()
    list.innerHTML = ""
}

function Edititem(e) {
    console.log(e.id)
    var val = e.parentNode.firstChild.nodeValue
    var editvalue = prompt("Enter ", val)
    var editTodo ={
        value : editvalue,
        key: e.id
    }
    firebase.database().ref('todos').child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue = editvalue
}
