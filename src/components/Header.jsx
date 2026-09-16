import { useState } from 'react';

export default function Header({ budget, impostaBudget, targetMacro, impostaTargetMacro }) {
  const [inModifica, setInModifica] = useState(false);
  const [budgetTemporaneo, setBudgetTemporaneo] = useState(budget);
  const [macroTemporanei, setMacroTemporanei] = useState(targetMacro);

  const gestisciSalvataggio = (e) => {
    e.preventDefault();
    impostaBudget(Number(budgetTemporaneo));
    impostaTargetMacro({
      proteine: Number(macroTemporanei.proteine),
      carboidrati: Number(macroTemporanei.carboidrati),
      grassi: Number(macroTemporanei.grassi),
    });
    setInModifica(false); 
  };

  return (
    <header className="card bg-dark text-white p-3 mb-4 shadow border-secondary">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="h3 mb-0 text-success fw-bold">MacroBudget</h1>
        <button
          className="btn btn-outline-light btn-sm"
          onClick={() => setInModifica(!inModifica)}
        >
          {inModifica ? 'Chiudi' : 'Imposta Obiettivi'}
        </button>
      </div>

      {inModifica && (
        <form onSubmit={gestisciSalvataggio} className="mt-3 pt-3 border-top border-secondary">
          <div className="row g-2">
            
            {/* Campo Budget */}
            <div className="col-12 mb-2">
              <label className="form-label small text-muted">Budget Massimo (€)</label>
              <input
                type="number"
                className="form-control form-control-sm bg-secondary text-white border-0"
                value={budgetTemporaneo}
                onChange={(e) => setBudgetTemporaneo(e.target.value)}
                min="0"
                step="0.5"
              />
            </div>

            <div className="col-4">
              <label className="form-label small text-muted">Proteine (g)</label>
              <input
                type="number"
                className="form-control form-control-sm bg-secondary text-white border-0"
                value={macroTemporanei.proteine}
                onChange={(e) => setMacroTemporanei({ ...macroTemporanei, proteine: e.target.value })}
              />
            </div>

            <div className="col-4">
              <label className="form-label small text-muted">Carboidrati (g)</label>
              <input
                type="number"
                className="form-control form-control-sm bg-secondary text-white border-0"
                value={macroTemporanei.carboidrati}
                onChange={(e) => setMacroTemporanei({ ...macroTemporanei, carboidrati: e.target.value })}
              />
            </div>

            <div className="col-4">
              <label className="form-label small text-muted">Grassi (g)</label>
              <input
                type="number"
                className="form-control form-control-sm bg-secondary text-white border-0"
                value={macroTemporanei.grassi}
                onChange={(e) => setMacroTemporanei({ ...macroTemporanei, grassi: e.target.value })}
              />
            </div>

            <div className="col-12 mt-3">
              <button type="submit" className="btn btn-success btn-sm w-100 fw-bold">
                Salva Obiettivi
              </button>
            </div>

          </div>
        </form>
      )}
    </header>
  );
}