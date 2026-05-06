import { useState } from 'react'
// Importando as imagens locais
import pikachuImg from './assets/pikachu.png'
import charizardImg from './assets/charizard.png'

function App() {
  const [resultado, setResultado] = useState("A Arena está pronta!")

  // Agora usamos as imagens importadas
  const p1Img = pikachuImg
  const p2Img = charizardImg

  const iniciarBatalha = async () => {
    try {
      const resposta = await fetch('http://localhost:8080/api/batalha')
      const texto = await resposta.text()
      setResultado(texto)
    } catch (erro) {
      setResultado("Erro ao conectar com o servidor!")
    }
  }

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', color: 'white', padding: '40px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', color: '#ffcc00', fontSize: '3rem', textShadow: '3px 3px #3b4cca', marginBottom: '40px' }}>
        POKÉMON BATTLE ARENA 
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '50px' }}>
        
        {/* Card do Pikachu */}
        <div style={cardStyle}>
          <img src={p1Img} width="200" alt="Pikachu" />
          <h2 style={{color: '#ffcb05'}}>Pikachu</h2>
          <p>Tipo: Elétrico</p>
        </div>

        <h1 style={{ fontSize: '4rem', color: '#cc0000', fontStyle: 'italic' }}>VS</h1>

        {/* Card do Charizard */}
        <div style={cardStyle}>
          <img src={p2Img} width="200" alt="Charizard" />
          <h2 style={{color: '#ff0000'}}>Charizard</h2>
          <p>Tipo: Fogo</p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <div style={{ background: '#ffffff', padding: '25px', borderRadius: '15px', border: '2px solid #ffcb05', display: 'inline-block', minWidth: '400px' }}>
          <p style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#000000' }}>{resultado}</p>
        </div>
        
        <br />
        
        <button onClick={iniciarBatalha} style={botaoStyle}>
          LANÇAR ATAQUE!
        </button>
      </div>
    </div>
  )
}

// Estilos para deixar bonito
const cardStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '30px',
  borderRadius: '25px',
  border: '4px solid #ffcb05',
  textAlign: 'center',
  boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
  transition: 'transform 0.3s'
}

const botaoStyle = {
  marginTop: '30px',
  padding: '20px 50px',
  fontSize: '1.5rem',
  backgroundColor: '#cc0000',
  color: 'white',
  border: 'none',
  borderRadius: '50px',
  cursor: 'pointer',
  fontWeight: 'bold',
  boxShadow: '0 6px #880000',
  textTransform: 'uppercase'
}

export default App
