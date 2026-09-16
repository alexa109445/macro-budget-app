export default function Dashboard({ budget, targetMacro, prodotti }) {
  const spesaTotale = prodotti.reduce((somma, prodotto) => somma + Number(prodotto.prezzo), 0);

  const macroAttuali = prodotti.reduce(
    (accumulatore, prodotto) => ({
      proteine: accumulatore.proteine + Number(prodotto.proteine),
      carboidrati: accumulatore.carboidrati + Number(prodotto.carboidrati),
      grassi: accumulatore.grassi + Number(prodotto.grassi),
    }),
    { proteine: 0, carboidrati: 0, grassi: 0 }
  );

  const calcolaPercentuale = (attuale, obiettivo) => {
    if (!obiettivo || obiettivo === 0) return 0;
    return Math.min((attuale / obiettivo) * 100, 100);
  };

  return (
    <div className="card bg-dark text-white p-3 mb-4 shadow border-secondary">
      <h2 className="h5 text-info mb-3">Pannello Progressi</h2>
      <div className="mb-3">
        <div className="d-flex justify-content-between small mb-1">
          <span>Spesa Totale</span>
          <span className={spesaTotale > budget ? "text-danger fw-bold" : "text-success fw-bold"}>
            {spesaTotale.toFixed(2)}€ / {budget}€
          </span>
        </div>
        <div className="progress" style={{ height: '10px' }}>
          <div
            className={`progress-bar ${spesaTotale > budget ? 'bg-danger' : 'bg-success'}`}
            role="progressbar"
            style={{ width: `${calcolaPercentuale(spesaTotale, budget)}%` }}
          ></div>
        </div>
      </div>

      <hr className="border-secondary" />

      <div className="row g-3">
        <div className="col-4">
          <div className="d-flex justify-content-between small mb-1">
            <span className="text-muted">Proteine</span>
            <span>{macroAttuali.proteine}g / {targetMacro.proteine}g</span>
          </div>
          <div className="progress" style={{ height: '8px' }}>
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: `${calcolaPercentuale(macroAttuali.proteine, targetMacro.proteine)}%` }}
            ></div>
          </div>
        </div>

        <div className="col-4">
          <div className="d-flex justify-content-between small mb-1">
            <span className="text-muted">Carboidrati</span>
            <span>{macroAttuali.carboidrati}g / {targetMacro.carboidrati}g</span>
          </div>
          <div className="progress" style={{ height: '8px' }}>
            <div
              className="progress-bar bg-warning"
              role="progressbar"
              style={{ width: `${calcolaPercentuale(macroAttuali.carboidrati, targetMacro.carboidrati)}%` }}
            ></div>
          </div>
        </div>

        <div className="col-4">
          <div className="d-flex justify-content-between small mb-1">
            <span className="text-muted">Grassi</span>
            <span>{macroAttuali.grassi}g / {targetMacro.grassi}g</span>
          </div>
          <div className="progress" style={{ height: '8px' }}>
            <div
              className="progress-bar bg-info"
              role="progressbar"
              style={{ width: `${calcolaPercentuale(macroAttuali.grassi, targetMacro.grassi)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}