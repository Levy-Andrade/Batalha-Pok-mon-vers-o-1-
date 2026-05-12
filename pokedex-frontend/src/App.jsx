import React, { useState } from 'react';
import pikachuGif from './assets/pikachu-animated.gif';
import charizardGif from './assets/charizard-animated.gif';
import arenaBackground from './assets/arena.jpg';
import './index.css'; 

const App = () => {
  const [hpPikachu, setHpPikachu] = useState(100);
  const [hpCharizard, setHpCharizard] = useState(100);
  const [logs, setLogs] = useState([]);
  const [turno, setTurno] = useState(1);
  const [resultado, setResultado] = useState("A Arena está pronta!");
  const [erroConexao, setErroConexao] = useState(false);
  
  const [shakePikachu, setShakePikachu] = useState(false);
  const [shakeCharizard, setShakeCharizard] = useState(false);

  const botaoStyle = {
    padding: '12px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    transition: '0.3s',
    textTransform: 'uppercase'
  };

  const iniciarBatalha = async (nomeAtaque, dano) => {
    if (hpPikachu <= 0 || hpCharizard <= 0) return;

    try {
      setErroConexao(false); 
      const response = await fetch('https://batalha-pok-mon-vers-o-1-production.up.railway.app/api/batalha');
      if (!response.ok) throw new Error();

      setShakePikachu(true);
      setTimeout(() => setShakePikachu(false), 500); 

      const venceuAgora = hpPikachu - dano <= 0;
      const mensagemAtaque = venceuAgora 
        ? `Charizard VENCEU usando ${nomeAtaque}!` 
        : `Charizard usou ${nomeAtaque}!`;

      setResultado(mensagemAtaque);
      setHpPikachu(prev => Math.max(0, prev - dano));
      setLogs(prev => [{ id: Date.now(), numeroTurno: turno, texto: mensagemAtaque, venceu: venceuAgora }, ...prev]);

      if (!venceuAgora) {
        setTimeout(() => {
          const danoPikachu = 15;
          const charizardMorreu = hpCharizard - danoPikachu <= 0;
          
          setHpCharizard(prev => Math.max(0, prev - danoPikachu));
          
          setShakeCharizard(true);
          setTimeout(() => setShakeCharizard(false), 500);

          if (charizardMorreu) {
            const msgDerrota = "PIKACHU VENCEU usando CHOQUE DO TROVÃO!";
            setResultado(msgDerrota);
            setLogs(prev => [{ id: Date.now() + 1, numeroTurno: turno, texto: msgDerrota, isEnemy: true, venceu: true }, ...prev]);
          } else {
            setResultado(" Pikachu reagiu com Choque do Trovão!");
            setLogs(prev => [{ id: Date.now() + 1, numeroTurno: turno, texto: " Pikachu contra-atacou!", isEnemy: true }, ...prev]);
          }
        }, 1000);
      }
      setTurno(prev => prev + 1);
    } catch (error) {
      setErroConexao(true); 
      setResultado("❌ Erro na Arena!");
    }
  };

  const resetarBatalha = () => {
    setHpPikachu(100);
    setHpCharizard(100);
    setLogs([]);
    setTurno(1);
    setResultado("A Arena está pronta!");
    setErroConexao(false);
  };

  return (
    <div style={{ 
  
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${arenaBackground})`,
      backgroundSize: 'cover',        
      backgroundPosition: 'center',    
      backgroundAttachment: 'fixed', 
      minHeight: '100vh',         
      width: '100%',               
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',         
      justifyContent: 'center',      
      color: 'white', 
      padding: '20px',               
      textAlign: 'center', 
      fontFamily: 'Arial, sans-serif',
      boxSizing: 'border-box',
      margin: 0,
      position: 'relative'
    }}>
      <h1 style={{ color: '#ffcc00', textShadow: '3px 3px #3b4cca', marginBottom: '40px' }}>POKÉMON BATTLE ARENA</h1>
      
      {erroConexao && (
        <div style={{ backgroundColor: '#ff4444', color: 'white', padding: '15px', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold', border: '2px solid white' }}>
          Back-end offline! Rode a API Java na porta 8080.
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '20px', marginBottom: '30px' }}>
        
        {/* Card Charizard */}
        <div style={{ padding: '20px', background: 'rgba(26, 26, 26, 0.9)', borderRadius: '15px', border: '2px solid #ff4444', minWidth: '220px' }}>
          <h3 style={{ color: '#ff4444' }}>Charizard</h3>
          <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <img 
               src={charizardGif} 
               alt="Charizard" 
               className={shakeCharizard ? 'apply-shake' : ''} 
               style={{ 
                 width: '160px', 
                 objectFit: 'contain',
                 filter: hpCharizard === 0 ? 'grayscale(100%)' : 'none',
                 transition: '0.5s'
               }} 
             />
          </div>
          <div style={{ width: '100%', background: '#333', height: '15px', borderRadius: '10px', marginTop: '15px', overflow: 'hidden' }}>
            <div style={{ width: `${hpCharizard}%`, background: hpCharizard > 30 ? '#4caf50' : '#f44336', height: '100%', transition: '0.5s' }}></div>
          </div>
          <p>HP: {hpCharizard}/100</p>
        </div>

        <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#ffcc00', paddingBottom: '60px', textShadow: '3px 3px #000' }}>VS</div>

        {/* Card Pikachu */}
        <div style={{ padding: '20px', background: 'rgba(26, 26, 26, 0.9)', borderRadius: '15px', border: '2px solid #ffcc00', minWidth: '220px' }}>
          <h3 style={{ color: '#ffcc00' }}>Pikachu</h3>
          <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={pikachuGif} 
              alt="Pikachu" 
              className={shakePikachu ? 'apply-shake' : ''}
              style={{ 
                width: '120px', 
                objectFit: 'contain',
                filter: hpPikachu === 0 ? 'grayscale(100%)' : 'none',
                transition: '0.5s'
              }} 
            />
          </div>
          <div style={{ width: '100%', background: '#333', height: '15px', borderRadius: '10px', marginTop: '15px', overflow: 'hidden' }}>
            <div style={{ width: `${hpPikachu}%`, background: hpPikachu > 30 ? '#4caf50' : '#f44336', height: '100%', transition: '0.5s' }}></div>
          </div>
          <p>HP: {hpPikachu}/100</p>
        </div>
      </div>

      <h2 style={{ color: '#ffcc00', height: '40px', marginBottom: '20px', textShadow: '1px 1px #000' }}>{resultado}</h2>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '40px' }}>
        {hpPikachu <= 0 || hpCharizard <= 0 ? (
          <button onClick={resetarBatalha} style={{ ...botaoStyle, backgroundColor: '#28a745', padding: '15px 40px' }}>REINICIAR BATALHA</button>
        ) : (
          <>
            <button onClick={() => iniciarBatalha("Lança-Chamas", 25)} style={{ ...botaoStyle, backgroundColor: '#e67e22' }}>Lança-Chamas (25 DMG)</button>
            <button onClick={() => iniciarBatalha("Brasas", 12)} style={{ ...botaoStyle, backgroundColor: '#c0392b' }}>Brasas (12 DMG)</button>
          </>
        )}
      </div>

      <div style={{ background: 'rgba(17, 17, 17, 0.9)', padding: '20px', borderRadius: '12px', border: '1px solid #333', display: 'inline-block', minWidth: '450px', textAlign: 'left' }}>
        <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #444', paddingBottom: '5px' }}>Turnos:</h4>
        <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
          {logs.map((log) => (
            <p key={log.id} style={{ fontSize: '0.9rem', margin: '5px 0', color: log.venceu ? '#00ff00' : (log.isEnemy ? '#ffcc00' : '#fff') }}>
              <strong>[Turno {log.numeroTurno}]</strong> {log.texto}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;