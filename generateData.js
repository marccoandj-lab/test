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
    scenario: { en: "Financial Scenario ${i}", sr: "Finansijski scenario ${i}" },
    options: {
      en: ["Option A (Cheap)", "Option B (Balanced)", "Option C (Expensive)"],
      sr: ["Opcija A (Jeftino)", "Opcija B (Izbalansirano)", "Opcija C (Skupo)"]
    },
    correct: 1,
    explanation: { en: "The balanced option is best.", sr: "Izbalansirana opcija je najbolja." },
    mode: 'finance',
    reward: 40000,
    penalty: 15000
  },
`;
}

code += `];

export const sustainabilityCostAnalysis: CostAnalysisScenario[] = [
`;

for (let i = 1; i <= 30; i++) {
  code += `  {
    scenario: { en: "Eco Scenario ${i}", sr: "Eko scenario ${i}" },
    options: {
      en: ["Option A (Polluting)", "Option B (Eco-Friendly)", "Option C (Neutral)"],
      sr: ["Opcija A (Zagađujuće)", "Opcija B (Ekološko)", "Opcija C (Neutralno)"]
    },
    correct: 1,
    explanation: { en: "The eco-friendly option is best.", sr: "Ekološka opcija je najbolja." },
    mode: 'sustainability',
    reward: 40000,
    penalty: 15000
  },
`;
}

code += `];\n`;

fs.appendFileSync(file, code);

console.log("Appended to gameData.ts");
