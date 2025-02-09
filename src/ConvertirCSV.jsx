import { useState } from "react";

const ConvertirCSV = () => {
  const [csv, setCSV] = useState("");
  const [json, setJSON] = useState([]);

  const convertirACSV = () => {
    const lineas = csv.split("\n").filter((linea) => linea.trim() !== "");
    const objetos = lineas.map((linea, index) => {
      const valores = linea.split(",");

      if (valores.length < 9) {
        console.error(`Error en la línea ${index + 1}: Faltan valores`);
        return null;
      }

      return {
        numero: parseInt(valores[0].trim(), 10) || 0,
        nombre: valores[1]?.trim() || "",
        tipo1: valores[2]?.trim() || "",
        tipo2: valores[3]?.trim() || "",
        NFE: valores[4]?.trim().toLowerCase() === "true",
        legendario: valores[5]?.trim().toLowerCase() === "true",
        mítico: valores[6]?.trim().toLowerCase() === "true",
        generación: parseInt(valores[7]?.trim(), 10) || 0,
        imagen: valores[8]?.trim() || "",
      };
    }).filter((obj) => obj !== null);

    setJSON(objetos);
  };

  return (
    <div>
      <label htmlFor="csv">Introduce el CSV separado por comas y líneas:</label>
      <textarea
        id="csv"
        rows="6"
        value={csv}
        onChange={(e) => setCSV(e.target.value)}
        placeholder="4,Charmander,Fuego,,true,false,false,1,https://img.url..."
      />
      <button onClick={convertirACSV}>Convertir a JSON</button>

      {json.length > 0 && <pre>{JSON.stringify(json, null, 2)}</pre>}
    </div>
  );
};

export default ConvertirCSV;
