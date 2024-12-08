import { useState, useEffect } from "react";

function Reloj(): JSX.Element {
  const [instantesGuardados, setInstantesGuardados] = useState<string[]>([]);
  const [horaActual, setHoraActual] = useState<string>("");

  // Actualizar hora cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setHoraActual(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Cargar instantes guardados desde localStorage
  useEffect(() => {
    const instantesLocal = JSON.parse(localStorage.getItem('instantesGuardados') || '[]') as string[];
    setInstantesGuardados(instantesLocal);
  }, []);

  // Guardar el instante actual en el estado y en localStorage
  const guardarInstante = () => {
    const nuevasHoras = [...instantesGuardados, horaActual];
    setInstantesGuardados(nuevasHoras);
    localStorage.setItem('instantesGuardados', JSON.stringify(nuevasHoras));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div>
        <h2 style={{ marginBottom: '20px', fontSize: '150px', fontWeight: 'bold' }}>
          {horaActual}
        </h2>
      </div>

      <button onClick={guardarInstante} style={{ padding: "10px", marginTop: "20px" }}>
        Guardar instante actual
      </button>

      <div>
        <h3>Instantes guardados:</h3>
        <ul>
          {instantesGuardados.map((instante, index) => (
            <li key={index}>{instante}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Reloj;
