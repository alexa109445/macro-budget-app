import { useState } from 'react';

export default function ListaSpesa({ prodotti, impostaProdotti }) {
  const [ricerca, setRicerca] = useState('');
  const [form, setForm] = useState({
    nome: '',
    prezzo: '',
    proteine: '',
    carboidrati: '',
    grassi: '',
  });
  const cercaAPI = async (e) => {
    e.preventDefault();
    if (!ricerca.trim()) return;
    try {
      const risposta = await fetch(
        `https://it.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          ricerca
        )}&search_simple=1&action=process&json=1`
      );
      const dati = await risposta.json();
      if (dati.products?.[0]) {
        const prodottoTrovato = dati.products[0];
        const valoriNutrizionali = prodottoTrovato.nutriments || {};
        setForm({
          ...form,
          nome: prodottoTrovato.product_name || ricerca,
          proteine: Math.round(valoriNutrizionali.proteins_100g || 0),
          carboidrati: Math.round(valoriNutrizionali.carbohydrates_100g || 0),
          grassi: Math.round(valoriNutrizionali.fat_100g || 0),
        });
      }
    } catch (errore) {
      console.error('Errore API:', errore);
    }
  };

  const aggiungi = (e) => {
    e.preventDefault();

    if (!form.nome || !form.prezzo) return;

    const nuovoProdotto = {
      id: Date.now().toString(),
      nome: form.nome,
      prezzo: Number(form.prezzo),
      proteine: Number(form.proteine) || 0,
      carboidrati: Number(form.carboidrati) || 0,
      grassi: Number(form.grassi) || 0,
    };

    impostaProdotti([...prodotti, nuovoProdotto]);
    setForm({
      nome: '',
      prezzo: '',
      proteine: '',
      carboidrati: '',
      grassi: '',
    });
    setRicerca('');
  };
  const rimuovi = (idRimuovere) => {
    const nuovaLista = prodotti.filter((prodotto) => prodotto.id !== idRimuovere);
    impostaProdotti(nuovaLista);
  };}