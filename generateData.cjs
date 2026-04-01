const fs = require('fs');

const file = 'c:/Users/Marko/Desktop/EIB WEBAPP - Copy/src/data/gameData.ts';
let code = `

// ─────────────────────────────────────────────
// COST ANALYSIS SCENARIOS
// ─────────────────────────────────────────────
export const financeCostAnalysis: CostAnalysisScenario[] = [
`;

for (let i = 1; i <= 30; i++) {
  code += `  {
    scenario: { en: "Financial Scenario ${i}: Choosing between a cheap printer with expensive toner vs. an expensive printer with cheap toner.", sr: "Finansijski scenario ${i}: Izbor između jeftinog štampača sa skupim tonerom i skupog štampača sa jeftinim tonerom." },
    options: {
      en: ["Option A (Cheap printer)", "Option B (Expensive printer)", "Option C (Rent a printer)"],
      sr: ["Opcija A (Jeftin štampač)", "Opcija B (Skup štampač)", "Opcija C (Iznajmljivanje štampača)"]
    },
    correct: 1,
    explanation: { en: "The expensive printer with cheap toner is more cost-effective in the long run.", sr: "Skup štampač sa jeftinim tonerom je isplativiji dugoročno." },
    mode: 'finance',
    reward: 40000,
    penalty: 15000
  },\n`;
}

code += `];

export const sustainabilityCostAnalysis: CostAnalysisScenario[] = [
`;

for (let i = 1; i <= 30; i++) {
  code += `  {
    scenario: { en: "Eco Scenario ${i}: Investing in solar panels for the office vs. continuing with coal-based grid electricity.", sr: "Eko scenario ${i}: Investiranje u solarne panele za kancelariju vs nastavak korišćenja struje iz mreže na bazi uglja." },
    options: {
      en: ["Option A (Coal-based)", "Option B (Solar panels)", "Option C (Wind energy)"],
      sr: ["Opcija A (Ugalj)", "Opcija B (Solarni paneli)", "Opcija C (Energija vetra)"]
    },
    correct: 1,
    explanation: { en: "Solar panels significantly reduce long-term costs and carbon footprint.", sr: "Solarni paneli značajno smanjuju dugoročne troškove i karbonski otisak." },
    mode: 'sustainability',
    reward: 40000,
    penalty: 15000
  },\n`;
}

code += `];\n`;

fs.appendFileSync(file, code);

console.log("Appended to gameData.ts");
