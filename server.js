import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';  // Importa CORS

// Para poder usar el path relativo, ya que estamos usando ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Usa CORS para permitir solicitudes desde otros orígenes
app.use(cors());

// Configurar middleware para que el servidor pueda recibir JSON
app.use(express.json());

// Ruta para leer todos los pokémon
app.get('/pokemon', (req, res) => {
    fs.readFile(path.join(__dirname, 'pokemon.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo.');
        } else {
            const pokemon = JSON.parse(data);
            res.json(pokemon);   
        }
    });
});

// Ruta para obtener un pokémon por número
app.get('/pokemon/:numero', (req, res) => {
    const { numero } = req.params;

    fs.readFile(path.join(__dirname, 'pokemon.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo.');
        } else {
            const pokemonList = JSON.parse(data);
            const pokemon = pokemonList.find((pk) => pk.numero === parseInt(numero));

            if (pokemon) {
                res.json(pokemon);
            } else {
                res.status(404).send('Pokémon no encontrado');
            }
        }
    });
});

// Ruta para crear un nuevo pokémon
app.post('/pokemon', (req, res) => {
    const nuevoPokemon = req.body;

    fs.readFile(path.join(__dirname, 'pokemon.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo.');
        } else {
            const pokemon = JSON.parse(data);  // Parseamos el archivo JSON

            pokemon.push(nuevoPokemon);  // Añadimos el nuevo alumno a la lista

            // Guardamos el archivo con el nuevo alumno
            fs.writeFile(path.join(__dirname, 'pokemon.json'), JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Error al guardar el nuevo pokémon.');
                } else {
                    res.status(201).json(nuevoPokemon);  // Respondemos con el alumno creado
                }
            });
        }
    });
});

// Ruta para actualizar un pokémon
app.put('/pokemon/:numero', (req, res) => {
    const { numero } = req.params;
    const pokemonActualizado = req.body;

    fs.readFile(path.join(__dirname, 'pokemon.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo.');
        } else {
            let pokemon = JSON.parse(data);
            let pokemonIndex = pokemon.findIndex((pk) => pk.numero === parseInt(numero));

            if (pokemonIndex === -1) {
                res.status(404).send('Alumno no encontrado');
            } else {
                pokemon[pokemonIndex] = { ...pokemon[pokemonIndex], ...pokemonActualizado };

                fs.writeFile(path.join(__dirname, 'pokemon.json'), JSON.stringify(pokemon, null, 2), (err) => {
                    if (err) {
                        res.status(500).send('Error al actualizar el pokémon.');
                    } else {
                        res.json(pokemon[pokemonIndex]);
                    }
                });
            }
        }
    });
});

// Ruta para eliminar un pokémon
app.delete('/pokemon/:numero', (req, res) => {
    const { numero } = req.params;

    fs.readFile(path.join(__dirname, 'pokemon.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo.');
        } else {
            let jsonData = JSON.parse(data);
            let pokemonIndex = jsonData.pokemon.findIndex((pk) => pk.numero === parseInt(numero));

            if (pokemonIndex === -1) {
                res.status(404).send('Pokémon no encontrado');
            } else {
                jsonData.alumnos.splice(pokemonIndex, 1);

                fs.writeFile(path.join(__dirname, 'pokemon.json'), JSON.stringify(jsonData, null, 2), (err) => {
                    if (err) {
                        res.status(500).send('Error al eliminar el pokémon.');
                    } else {
                        res.status(204).send();
                    }
                });
            }
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});