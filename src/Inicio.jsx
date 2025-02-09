import { useState, useEffect } from "react";
import "./Inicio.css";

const Inicio = () => {
    const [NFE, setNFE] = useState(false);
    const [legendario, setLegendario] = useState(false);
    const [mítico, setMítico] = useState(false);
    const [generación, setGeneración] = useState(1);
    const [pokemonList, setPokemonList] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [equipo, setEquipo] = useState([]);

    // Cargar datos desde la API
    useEffect(() => {
        fetch("http://localhost:3000/pokemon")
            .then(response => response.json())
            .then(data => setPokemonList(data))
            .catch(error => console.error("Error al obtener los Pokémon:", error));
    }, []);

    const seleccionarPokemon = (nombre, imagen) => {
        setEquipo(prevEquipo => {
            const nuevoEquipo = [...prevEquipo, { nombre, imagen }];
    
            // Llamamos a comenzar() pasando el equipo actualizado
            if (nuevoEquipo.length < 6) {
                setTimeout(() => comenzar(nuevoEquipo), 0); // Evita problemas con el estado desactualizado
            }
    
            return nuevoEquipo;
        });
    };
    
    const comenzar = (equipoActualizado = []) => {
        // Asegurar que equipoActualizado es un array
        if (!Array.isArray(equipoActualizado)) {
            equipoActualizado = [];
        }
    
        const filtrados = pokemonList.filter(pokemon => 
            !equipoActualizado.some(e => e.nombre === pokemon.nombre) &&
            pokemon.NFE === NFE &&
            pokemon.legendario === legendario &&
            pokemon.mítico === mítico &&
            pokemon.generación === Number(generación)
        );
    
        if (filtrados.length < 3) {
            alert("No hay suficientes Pokémon que cumplan los criterios.");
            return;
        }
    
        const aleatorios = filtrados.sort(() => 0.5 - Math.random()).slice(0, 3);
        setSeleccionados(aleatorios);
    };

    return (
        <div>
            <h1>Configuración de Arena</h1>
            <label>
                <input type="checkbox" checked={NFE} onChange={e => setNFE(e.target.checked)} />
                ¿NFE?
            </label>
            <label>
                <input type="checkbox" checked={legendario} onChange={e => setLegendario(e.target.checked)} />
                ¿Legendarios?
            </label>
            <label>
                <input type="checkbox" checked={mítico} onChange={e => setMítico(e.target.checked)} />
                ¿Míticos?
            </label>
            <label>
                ¿Generación?
                <input type="number" value={generación} onChange={e => setGeneración(e.target.value)} />
            </label>
            <button onClick={comenzar}>Comenzar</button>

            {/* Mostrar los Pokémon seleccionados */}
            {seleccionados.length > 0 && equipo.length < 6 && (
                <div>
                    <h2>Pokémon Seleccionados:</h2>
                    <div className="tres-cartas">
                        {seleccionados.map(pokemon => (
                            <div key={pokemon.numero} className="carta-pokemon" onClick={() => seleccionarPokemon(pokemon.nombre, pokemon.imagen)}>
                                <h2>{pokemon.nombre}</h2>
                                <img src={pokemon.imagen} alt={pokemon.nombre}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Mostrar el equipo */}
            {equipo.length > 0 && (
                <div>
                    <h2>Equipo:</h2>
                    <div className="seis-cartas">
                        {equipo.map(pokemon => (
                            <div className="carta-pokemon">
                                <h2>{pokemon.nombre}</h2>
                                <img src={pokemon.imagen} alt={pokemon.nombre} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inicio;
