export function formatDate(date) {
    const data = new Date(date);
  
    const formato = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  
    return formato.format(data);
  }