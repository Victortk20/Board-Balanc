export const TipoExame = (tipo) => {
    switch(tipo) {
      case 'aberto': return 'Olhos Abertos';
      case 'aberto_superficie': return 'Olhos Abertos sobre superfície instável';
      case 'fechado': return 'Olhos Fechados';
      case 'fechado_superficie': return 'Olhos Fechados sobre superfície instável';
    }
  }