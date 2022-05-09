
const noteForm = document.querySelector('#noteForm');

/**
 * @description - Evento que se ejecuta cuando el formulario se envía
 */
noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var formData = new FormData(document.forms.noteForm);

    if(noteID){
        updateNote(noteID, formData.get('title'), formData.get('description'));
    }else{
        saveNote(formData.get('title'), formData.get('description'));
    }

    noteForm.reset(); //* Limpiar el formulario
    document.querySelector("#title").focus(); //* Focus en el campo de titulo
    noteID = ''; //* Limpiar el ID en caso de que se haya dado editar
});