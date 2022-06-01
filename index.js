const argumentos = process.argv.slice(2);
const opcion = argumentos[0];
const { agregar, buscar, consultar, editar, eliminar } = require("./consultas")

// verificación de entrada de datos
function revisar(
    nombre = '',
    rut = '',
    curso = '',
    nivel = 0
) {
    if (!(nombre && rut && curso && nivel))return 'Debe ingresar todos los datos.';
    if (nombre.length > 50) return 'Nombre demasiado largo';
    if (rut.length > 12) return 'Rut invalido';
    if (curso.length > 50) return 'Nombre de curso demasiado largo';
    if (nivel < 1) return 'Nivel invalido';
    else return false;
}

//ejecuciones(nuevo, rut, consulta, editar, eliminar )
(async () => {
    // nuevo estudiante
    if (opcion == 'nuevo') {
        const [nombre, rut, curso, nivel] = argumentos.slice(1);
        const revisado = revisar(nombre, rut, curso, nivel);
        if (!revisado) {
            const request = await agregar(nombre, rut, curso, nivel);
            console.log(request);
        } else console.log(revisado);
    }

    // consulta por rut
    if (opcion == 'rut') {
        const [rut] = argumentos.slice(1);
        const request = await buscar(rut);
        console.log(request);
    }

    // CONSULTAR todos los estudiantes
    if (opcion == 'consulta') {
        const request = await consultar();
        console.log('Registro actual ', request);
    }

    // EDITAR a un estudiante
    if (opcion == 'editar') {
        const [nombre, rut, curso, nivel] = argumentos.slice(1);
        const revisado = revisar(nombre, rut, curso, nivel);
        if (!revisado) {
            const request = await editar(nombre, rut, curso, nivel);
            console.log(request);
        } else console.log(revisado);
    }

    // ELIMINAR estudiante por rut
    if (opcion == 'eliminar') {
        const [rut] = argumentos.slice(1);
        const revisado = revisar('nombre', rut, 'curso', 'nivel');
        if (!revisado) {
            const request = await eliminar(rut);
            console.log(request);
        } else console.log(revisado);
    }
})();