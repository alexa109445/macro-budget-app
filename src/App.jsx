import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  const [budget, impostaBudget] = useState(60);

  const [targetMacro, impostaTargetMacro] = useState({
    proteine: 140,
    carboidrati: 200,
    grassi: 60,
  });

  const [prodotti, impostaProdotti] = useState([
    {
      id: '1',
      nome: 'Petto di pollo',
      prezzo: 6.5,
      proteine: 30,
      carboidrati: 0,
      grassi: 2,
    },
  ]);

  return (
    <div className="container py-4" style={{ maxWidth: '700px' }}>
      <Header
        budget={budget}
        impostaBudget={impostaBudget}
        targetMacro={targetMacro}
        impostaTargetMacro={impostaTargetMacro}
      />

      <Dashboard
        budget={budget}
        targetMacro={targetMacro}
        prodotti={prodotti}
      />
    </div>
  );
}

export default App;