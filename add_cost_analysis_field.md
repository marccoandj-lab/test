# Implementation Plan: Add "Cost Analysis" Game Field

Add a new field type called "Cost Analysis" (Analiza troskova) where players must evaluate financial or sustainability scenarios and choose the best option from three choices.

## User Requirements
- **Mechanism**: Scenario-based decision making with 3 options.
- **Modes**: 
    - Finance (Blue): Financial scenarios.
    - Sustainability (Green): Eco/Sustainability scenarios.
- **Quantity**: 30 unique scenarios per mode (total 60).
- **Language**: Bilingual support (English and Serbian) for all content.
- **Visuals**: Distinct color (Indigo/Purple gradient).
- **Integration**: Added to map generation and game mechanics.

## Proposed Changes

### 1. Data Definitions (`src/data/gameData.ts`)
- Update `FieldType` to include `'cost_analysis'`.
- Define `CostAnalysisScenario` interface.
- Add `financeCostAnalysis` (30 items) and `sustainabilityCostAnalysis` (30 items).

### 2. Map Generation (`src/data/levelGenerator.ts`)
- Add `cost_analysis` to `getFieldMeta`:
  - Label: `Cost Analysis` / `Analiza troškova`
  - Icon: `🧐`
  - bgColor: `bg-gradient-to-br from-indigo-500 to-purple-700`
  - borderColor: `border-indigo-400`
  - glowColor: `shadow-indigo-500/50`
- Add to `getRandomFieldType` distribution.

### 3. UI Components (`src/components/GameModal.tsx`)
- Implement `CostAnalysisModal`:
  - 3 options layout.
  - 60s timer.
  - Correct/Wrong feedback with explanations.
  - Reward: 40,000 SC, Penalty: 15,000 SC.

### 4. Orchestration (`src/components/GameModalContainer.tsx`)
- Add case `'cost_analysis'` to the switch.
- Handle `onResult` to update balance and stats.

### 5. Stats Tracking (`src/App.tsx`)
- Track `cost_analysis_correct` and `cost_analysis_wrong` (optional but recommended for consistency).

## Verification Plan
1. Land on `cost_analysis` in Finance mode -> Verify financial scenario.
2. Land on `cost_analysis` in Eco mode -> Verify sustainability scenario.
3. Test all 3 options: Correct (reward), Wrong (penalty), Timeout (penalty).
4. Check translation toggle.

## Scenarios Snippet (Data will be added to gameData.ts)
Example Finance: "Choosing between a cheap printer with expensive toner vs. an expensive printer with cheap toner."
Example Eco: "Investing in solar panels for the office vs. continuing with coal-based grid electricity."
