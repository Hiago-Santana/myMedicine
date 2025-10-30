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
};

export function translate(category, key) {
  const dict = translations[category]
  if (!dict) return key
  return dict[key] ?? key
}
