export const translations = {
  weekly: {
    1: "Segunda",
    2: "Terça",
    3: "Quarta",
    4: "Quinta",
    5: "Sexta",
    6: "Sábado",
    7: "Domingo",
  },

  formType: {
    cp: 'comprimido',
    cap: 'capsula',
    gout: globalThis,
    aplication: 'aplicação',
    inhalation: 'inalação',
    sachet: 'sachê'
  },

  frequencyUnit: {
    daily: 'por dia',
    biweekly: 'A cada 15 dias',
    monthly: '1 vez por mês'
  }
};

export function translate(category, key) {
  const dict = translations[category]
  if (!dict) return key
  return dict[key] ?? key
}
