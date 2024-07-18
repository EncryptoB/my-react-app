import React, { useState } from 'react';
import { Plus, RotateCcw, Download } from 'lucide-react';

const App = () => {
  const [clickCount, setClickCount] = useState(0);
  const [resetCount, setResetCount] = useState(0);
  const [clicksPerReset, setClicksPerReset] = useState([]);
  const [username, setUsername] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleIncrement = () => setClickCount(clickCount + 1);
  
  const handleReset = () => {
    setClicksPerReset([...clicksPerReset, clickCount]);
    setClickCount(0);
    setResetCount(resetCount + 1);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsRegistered(true);
    }
  };

  const averageClicksPerReset = clicksPerReset.length > 0
    ? (clicksPerReset.reduce((a, b) => a + b, 0) / clicksPerReset.length).toFixed(2)
    : 0;

  const handleDownload = () => {
    const csvContent = [
      ['Sesión', 'Número de Clics'],
      ...clicksPerReset.map((clicks, index) => [index + 1, clicks]),
      ['Promedio', averageClicksPerReset]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'historial_clics.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Mi Aplicación Web</h1>
      
      {!isRegistered ? (
        <form onSubmit={handleRegister} className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu nombre de usuario"
            className="px-4 py-2 border rounded mr-2"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Registrarse
          </button>
        </form>
      ) : (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Apartado de Cuenta</h2>
          <p className="text-lg mb-2">Nombre de usuario: <span className="font-semibold">{username}</span></p>
          <p className="text-lg mb-2">Sesiones jugadas: <span className="font-semibold">{resetCount}</span></p>
        </div>
      )}

      <p className="text-xl mb-2">Has hecho clic {clickCount} veces</p>
      <p className="text-xl mb-2">Has reiniciado {resetCount} veces</p>
      <p className="text-xl mb-4">Promedio de clics por sesión: {averageClicksPerReset}</p>
      <div className="flex flex-col items-center space-y-4 mb-4">
        <button
          className="w-20 h-20 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center justify-center shadow-lg transition-transform transform hover:scale-105"
          onClick={handleIncrement}
          title="Incrementar"
        >
          <Plus size={32} />
        </button>
        <div className="flex space-x-4">
          <button
            className="w-12 h-12 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center shadow-md transition-transform transform hover:scale-105"
            onClick={handleReset}
            title="Reiniciar"
          >
            <RotateCcw size={20} />
          </button>
          <button
            className="w-12 h-12 bg-green-500 text-white rounded-full hover:bg-green-600 flex items-center justify-center shadow-md transition-transform transform hover:scale-105"
            onClick={handleDownload}
            title="Descargar Historial"
          >
            <Download size={20} />
          </button>
        </div>
      </div>
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Historial de clics por sesión:</h2>
        <ul className="bg-white rounded shadow p-2">
          {clicksPerReset.map((clicks, index) => (
            <li key={index} className="mb-1">
              Sesión {index + 1}: {clicks} clic{clicks !== 1 ? 's' : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
