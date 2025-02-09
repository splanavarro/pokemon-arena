import { useState, useEffect } from "react";

const ListaPokemon = () => {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/pokemon")
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setPokemon(data);
                } else {
                    console.error("Los datos no son un array:", data);
                }
            })
            .catch((error) => {
                console.error("Error al obtener los pokémon:", error);
            });
    }, []);

    // const borrarAlumno = (id) => {
    //     fetch(`http://localhost:3000/alumnos/${id}`, { method: "DELETE" })
    //         .then(() => setAlumnos(alumnos.filter(alumno => alumno.id !== id)))
    //         .catch(error => console.error("Error al borrar:", error));
    // };

    return (
        <div>
            <h1>Lista de Pokémon</h1>
            <table>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Número</th>
                        <th>Nombre</th>
                        <th>Tipo 1</th>
                        <th>Tipo 2</th>
                    </tr>
                </thead>
                <tbody>
                    {pokemon.map(pokemon => (
                        <tr key={pokemon.numero}>
                            <td><img src={pokemon.imagen} alt={`Imagen de ${pokemon.nombre}`}></img></td>
                            <td>{pokemon.numero}</td>
                            <td>{pokemon.nombre}</td>
                            <td>{pokemon.tipo1}</td>
                            <td>{pokemon.tipo2}</td>
                            {/* <td>
                                <Link to={`/editar/${alumno.id}`}><button>Editar</button></Link>
                                <button onClick={() => borrarAlumno(alumno.id)}>Borrar</button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <Link to="/crear"><button>Crear Alumno</button></Link> */}
        </div>
    );
};

export default ListaPokemon;