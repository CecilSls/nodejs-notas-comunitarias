const socket = io() //* Crear una instancia de socket.io | ahora puede escuchar y emitir eventos

/**
 * 
 * @param {String} title 
 * @param {String} description
 * @description - Función que envia al servidor los datos para guardar una nota
 */
const saveNote = (title, description) => {
    socket.emit('client:newnote', {
        title,
        description
    });
};

/**
 * 
 * @param {String} id
 * @description - Función que envia al servidor el id de la nota para eliminarla 
 */
const deleteNote = (id) => {
    socket.emit('client:deletenote', id);
};

/**
 * 
 * @param {String} id
 * @description - Función que envia al servidor el id de la nota para obtenerla 
 */
const getNote = (id) => {
    socket.emit('client:getnote', id);
}

/**
 * 
 * @param {String} id 
 * @param {String} title 
 * @param {String} description 
 * @description - Función que envia al servidor los datos para actualizar una nota
 */
const updateNote = (id, title, description) => {
    socket.emit('client:updatenote', {id, title, description});
}

/**
 * @description Recibe los datos de la notas para 'pintarlas
 */
socket.on('server:loadnotes', renderNotes );

/**
 * @description Recibe los datos de UNA nota para 'pintarla'
 */
socket.on('server:newnote', appendNote );

/**
 * @description Recibe los datos de la nota con tal de mostrarlos en el FORM
 */
socket.on('server:selectnote', data => {
    const title = document.querySelector('#title');
    const description = document.querySelector('#description');

    title.value = data.title;
    description.value = data.description;

    noteID = data.id;
});