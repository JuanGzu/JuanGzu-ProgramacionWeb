let estudiantes = [];
let modal = document.getElementById("modal");
let form = document.getElementById("formEstudiante");
let modalTitle = document.getElementById("modal-title");
let currentIndex = null; // Para guardar el índice del estudiante que se está editando

// -------------------
// CARGA DESDE XML O LOCALSTORAGE
// -------------------
document.addEventListener("DOMContentLoaded", () => {
    const data = localStorage.getItem("estudiantes");
    if (data) {
        estudiantes = JSON.parse(data);
        renderTable();
    } else {
        cargarDesdeXML();
    }
});

// -------------------
// CARGA DEL XML LOCAL (por fetch)
// -------------------
function cargarDesdeXML() {
    fetch('estudiantes.xml')
        .then(response => response.text())
        .then(xmlText => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");
            const nodes = xmlDoc.getElementsByTagName("Estudiante");

            estudiantes = []; // Reiniciamos el array
            for (let i = 0; i < nodes.length; i++) {
                const est = nodes[i];
                estudiantes.push({
                    ncontrol: est.getElementsByTagName("NumeroControl")[0].textContent,
                    nombre: est.getElementsByTagName("Nombre")[0].textContent,
                    curp: est.getElementsByTagName("CURP")[0].textContent,
                    sexo: est.getElementsByTagName("Sexo")[0].textContent,
                    carrera: est.getElementsByTagName("Carrera")[0].textContent,
                    semestre: est.getElementsByTagName("Semestre")[0].textContent
                });
            }
            localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
            renderTable();
        });
}

// -------------------
// IMPORTACIÓN DESDE ARCHIVO XML (FileReader)
// -------------------
document.getElementById("fileInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const xmlText = event.target.result;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");
            const nodes = xmlDoc.getElementsByTagName("Estudiante");
            
            // Reiniciamos el array para cargar los nuevos registros
            estudiantes = [];
            for (let i = 0; i < nodes.length; i++) {
                const est = nodes[i];
                estudiantes.push({
                    ncontrol: est.getElementsByTagName("NumeroControl")[0].textContent,
                    nombre: est.getElementsByTagName("Nombre")[0].textContent,
                    curp: est.getElementsByTagName("CURP")[0].textContent,
                    sexo: est.getElementsByTagName("Sexo")[0].textContent,
                    carrera: est.getElementsByTagName("Carrera")[0].textContent,
                    semestre: est.getElementsByTagName("Semestre")[0].textContent
                });
            }
            
            localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
            renderTable();
        };
        reader.readAsText(file);
    }
});

// -------------------
// DIBUJAR LA TABLA
// -------------------
function renderTable() {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    estudiantes.forEach((est, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><img id="foto" src="imagenes/${est.sexo === 'M' ? 'foto-hombre.png' : 'foto_mujer.png'}"></td>
            <td>${est.ncontrol}</td>
            <td>${est.nombre}</td>
            <td>${est.curp}</td>
            <td>${est.sexo}</td>
            <td>${est.carrera}</td>
            <td>${est.semestre}</td>
            <td>
                <img src="imagenes/boton-editar.png" class="btnEdit" data-index="${index}">
                <img src="imagenes/basura.png" class="btnDel" data-index="${index}">
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById("counter").textContent = `${estudiantes.length} / ${estudiantes.length}`;
    bindActionButtons();
}

// -------------------
// EVENTOS PARA EDITAR Y ELIMINAR
// -------------------
function bindActionButtons() {
    document.querySelectorAll(".btnEdit").forEach(btn => {
        btn.addEventListener("click", e => {
            const index = e.target.getAttribute("data-index");
            abrirModalEditar(index);
        });
    });

    document.querySelectorAll(".btnDel").forEach(btn => {
        btn.addEventListener("click", e => {
            const index = e.target.getAttribute("data-index");
            eliminarEstudiante(index);
        });
    });
}

// -------------------
// ABRIR MODAL PARA CREAR O EDITAR
// -------------------
function abrirModalEditar(index = null) {
    currentIndex = index;
    if (index !== null) {
        const est = estudiantes[index];
        document.getElementById("ncontrol").value = est.ncontrol;
        document.getElementById("nombre").value = est.nombre;
        document.getElementById("curp").value = est.curp;
        document.getElementById("sexo").value = est.sexo;
        document.getElementById("carrera").value = est.carrera;
        document.getElementById("semestre").value = est.semestre;
        modalTitle.textContent = "Editar Estudiante";
    } else {
        form.reset();
        modalTitle.textContent = "Crear Estudiante";
    }
    modal.style.display = "flex";
}

// -------------------
// CERRAR MODAL
// -------------------
document.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
});

// -------------------
// GUARDAR ESTUDIANTE (CREAR O EDITAR)
// -------------------
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nuevo = {
        ncontrol: document.getElementById("ncontrol").value,
        nombre: document.getElementById("nombre").value,
        curp: document.getElementById("curp").value,
        sexo: document.getElementById("sexo").value,
        carrera: document.getElementById("carrera").value,
        semestre: document.getElementById("semestre").value
    };

    if (currentIndex !== null) {
        estudiantes[currentIndex] = nuevo;
    } else {
        estudiantes.push(nuevo);
    }

    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
    renderTable();
    modal.style.display = "none";
});

// -------------------
// ELIMINAR ESTUDIANTE
// -------------------
function eliminarEstudiante(index) {
    if (confirm("¿Seguro que quieres eliminar este estudiante?")) {
        estudiantes.splice(index, 1);
        localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
        renderTable();
    }
}

// -------------------
// BOTÓN CREAR
// -------------------
document.getElementById("addBtn").addEventListener("click", () => {
    abrirModalEditar();
});
