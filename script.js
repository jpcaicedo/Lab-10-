class Tarea {
    constructor(nombre, estado) {
        this.nombre = nombre;
        this.estado = estado; // "Pendiente", "Haciendo", "Completada"
    }
}

const tareas = [];
const tareaInput = document.getElementById('tareaInput');
const agregarTareaBtn = document.getElementById('agregarTareaBtn');

agregarTareaBtn.onclick = function() {
    const nombreTarea = tareaInput.value.trim();
    if (nombreTarea) {
        const nuevaTarea = new Tarea(nombreTarea, 'Pendiente');
        tareas.push(nuevaTarea);
        tareaInput.value = ''; // Limpiar el input
        actualizarInterfaz();
    }
};

function actualizarInterfaz() {
    console.log(tareas)
    const listaPendientes = document.getElementById('listaPendientes');
    const listaHaciendo = document.getElementById('listaHaciendo');
    const listaCompletadas = document.getElementById('listaCompletadas');

    listaPendientes.innerHTML = '';
    listaHaciendo.innerHTML = '';
    listaCompletadas.innerHTML = '';

    tareas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.textContent = tarea.nombre;

        if (tarea.estado === 'Pendiente') {
            const moverADerechaBtn = document.createElement('button');
            moverADerechaBtn.textContent = '➡️';
            moverADerechaBtn.onclick = () => moverATarea(index, 'Haciendo');
            li.appendChild(moverADerechaBtn);
            listaPendientes.appendChild(li);
        } else if (tarea.estado === 'Haciendo') {
            const moverAPendienteBtn = document.createElement('button');
            moverAPendienteBtn.textContent = '⬅️';
            moverAPendienteBtn.onclick = () => moverATarea(index, 'Pendiente');
            const moverACompletadaBtn = document.createElement('button');
            moverACompletadaBtn.textContent = '➡️';
            moverACompletadaBtn.onclick = () => moverATarea(index, 'Completada');
            li.appendChild(moverAPendienteBtn);
            li.appendChild(moverACompletadaBtn);
            listaHaciendo.appendChild(li);
        } else if (tarea.estado === 'Completada') {
            listaCompletadas.appendChild(li);
        }
    });
}

function moverATarea(index, nuevoEstado) {
    const tarea = tareas[index];

    if (nuevoEstado === 'Haciendo' && tarea.estado === 'Pendiente') {
        tarea.estado = 'Haciendo';
    } else if (nuevoEstado === 'Completada' && tarea.estado === 'Haciendo') {
        tarea.estado = 'Completada';
    } else if (nuevoEstado === 'Pendiente' && tarea.estado === 'Haciendo') {
        tarea.estado = 'Pendiente';
    }
    
    actualizarInterfaz();
}
