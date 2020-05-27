var xhttp = new XMLHttpRequest();

function editNote(id){
  document.getElementsByTagName("body")[0].style.overflow = "hidden";
  document.getElementById("edit").style.display = "block";
  if(id == -1){
    document.getElementById("editTitle").value = "";
    document.getElementById("editContent").value = "";
    document.getElementById("doneEdit").onclick = function(){saveNote(-1);};
  } else{
    console.log(id);
    xhttp.open("GET", "get/"+id, false);
    xhttp.send();
    let note = JSON.parse(xhttp.responseText);
    document.getElementById("editTitle").value = note.name;
    document.getElementById("editContent").value = note.content;
    document.getElementById("doneEdit").onclick = function(){saveNote(id);};
    document.getElementById("delete").onclick = function(){deleteNote(id);};
  }
}

function closeEdit(){
  document.getElementsByTagName("body")[0].style.overflow = "scroll";
  document.getElementById("edit").style.display = "none";
}

function saveNote(id){
  closeEdit();
  xhttp.open("POST", "set/"+id, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  let name = document.getElementById("editTitle").value;
  let content = document.getElementById("editContent").value;
  xhttp.send("name="+name+"&content="+content);

  console.log("Saving note "+id);
  refreshNotes();
}

function deleteNote(id){
  if(confirm("This action will permenantly delete the note.")){
    xhttp.open("POST", "delete/"+id, true);
    xhttp.send();

    closeEdit();
    refreshNotes();
  }
}

function refreshNotes(){
  xhttp.open("GET", "/notes/", false);
  xhttp.send();
  console.log(xhttp.responseText);
  let regex = /<section id="notes">(.*?)<\/section>/gsu;
  let inner = regex.exec(xhttp.responseText)[1];
  console.log(inner);
  document.getElementById("notes").innerHTML = inner;
}
