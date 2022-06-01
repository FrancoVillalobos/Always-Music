const { Client } = require("pg");

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'alwaysmusic',
    password: 'admin',
    port: 5432,
};
const client = new Client(config);
// consulta para agregar un estudiante
const agregar = async (nombre, rut, curso, nivel) => {
    client.connect();
    try {
        const res = await client.query(`INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ('${nombre}', '${rut}', '${curso}', '${nivel}') RETURNING *`);
        client.end();
        return `Estudiante ${nombre} agregado con éxito`;
    } catch (error) {
        client.end();
        return `Error al crear estudiante. codigo: ${error.code}`;
    }
}

// consulta un estudiante con su rut
const buscar = async (rut) => {
    client.connect();
    try {
        const res = await client.query(`SELECT * FROM estudiantes WHERE rut = '${rut}'`);
        client.end();
        return res.rows[0] ? res.rows[0] : 'Rut no existe';
    } catch (error) {
        client.end();
        return `Error en la consulta: ${error.code}`;
    }
}

// Consultar toda la tabla estudiantes
const consultar = async () => {
    client.connect();
    try {
        const res = await client.query(`SELECT * FROM estudiantes`);
        client.end();
        return res.rows;
    } catch (error) {
        client.end();
        return `Error en la consulta. Código: ${error.code}`;
    }
}

// Editar estudiante por su rut
const editar = async (nombre, rut, curso, nivel) => {
    client.connect();
    try {
        const res = await client.query(`UPDATE estudiantes SET nombre = '${nombre}', curso = '${curso}', nivel = '${nivel}' WHERE rut = '${rut}' RETURNING *;`);
        client.end();
        if (!res.rowCount){
            return `El rut ${rut} no se encuentra registrado`;
        }
        return `Estudiante ${nombre} editado con éxito`;
    } catch (error) {
        client.end();
        return `No se pudo editar. Error: ${error.code}`;
    }
}

// Eliminar estudiante por rut
const eliminar = async (rut) => {
    client.connect();
    try {
        const res = await client.query(`DELETE FROM estudiantes WHERE rut = '${rut}'`);
        client.end();
        if (!res.rowCount) {
            return `El rut ${rut} no se encuentra registrado`;
        }            
        return `Estudiante con Rut: ${rut} eliminado con éxito`;
    } catch (error) {
        client.end();
        return `No se pudo eliminar. Error codigo: ${error.code}`;
    }
}

module.exports = { agregar, buscar, consultar, editar, eliminar }