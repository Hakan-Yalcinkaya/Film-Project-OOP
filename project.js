const form=document.querySelector("#film-form");
const titleElement=document.querySelector("#title");
const directorElement=document.querySelector("#director");
const urlElement=document.querySelector("#url");
const cardbody=document.querySelectorAll(".card-body")[1];
const clear=document.querySelector("#clear-films");


//Start UI
const ui=new UI();
//Storage Object
const storage=new Storage();

//Load All Events
eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films=storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    cardbody.addEventListener("click",deleteFilm);
    });
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title=titleElement.value;
    const director=directorElement.value;
    const url=urlElement.value;
    if(title===""||director==""||url==""){
        ui.disPlayMessages("Tüm Alanları Doldurun","danger");
    }
    else{
        //New film
        const newFilm=new Film(title,director,url);
        ui.addFilmToUI(newFilm);
        storage.addFilmToStorage(newFilm); //Add film to storage
        ui.disPlayMessages("Film Başarı ile Eklendi..","success");
        
    }
    ui.clearInputs(titleElement,urlElement,directorElement);
    e.preventDefault();
}

function deleteFilm(e){
    if(e.target.id==="delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        ui.disPlayMessages("Silme işlemi Başarılı..","success");

    }
}
function clearAllFilms(){
    if(confirm("Tüm Filmleri Silmek İstediğinize Emin Misiniz?")){
        ui.clearAllFromUI();
        storage.clearAllFromStorage();
        ui.disPlayMessages("Tüm Filmler silindi","warning");
    }
  
}