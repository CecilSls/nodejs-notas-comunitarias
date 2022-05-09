
const notesList = document.querySelector('#notes');

let noteID = '';

/**
 * 
 * @param {Object} note 
 * Objeto de tipo Nota
 * @returns Codigo HTML que contiene un div con la estructura de la nota
 */
const noteUi = note => {
    const div = document.createElement('div');
    div.innerHTML =
    `
        <div class="card border-dark mb-3 animate__animated animate__bounceIn">
            <div class="card-header">
                <h4>${ note.title }</h4>
            </div>
            <div class="card-body text-dark">
                <p class="card-text">${ note.description }</p>
            </div>
            <div class="card-footer bg-transparent border-success mx-auto">
                <button class="btn btn-danger delete" data-id="${ note.id }">Delete</button>
                <button class="btn btn-secondary update" data-id="${ note.id }">Update</button>
            </div>
        </div>
    `

    const btnDelete = div.querySelector('.delete');
    const btnUpdate = div.querySelector('.update');

    btnDelete.addEventListener('click', ()=>{
        deleteNote(btnDelete.dataset.id);
    });

    btnUpdate.addEventListener('click', ()=>{
        getNote(btnUpdate.dataset.id);
    });

    return div;
}
/**
 * 
 * @param {Object} notes 
 * Objeto de tipo Nota
 * @description - Función que sirve para 'pintar' las notas
 */
const renderNotes = notes => {
    notesList.innerHTML = '';
    notes.forEach(note => {
        notesList.append(noteUi(note));
    });
};

/**
 * 
 * @param {Object} notes 
 * Objeto de tipo Nota
 * @description - Función que sirve para 'pintar' solo UNA nota
 */
const appendNote = note => {
    notesList.append(noteUi(note));
};