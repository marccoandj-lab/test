export type FieldType = 'start' | 'income' | 'expense' | 'quiz' | 'jail' | 'switch' | 'investment' | 'tax_small' | 'tax_large' | 'auction_insurance';
export type GameMode = 'finance' | 'sustainability';

export interface Level {
  id: number;
  type: FieldType;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
}

export interface QuizQuestion {
  question: { en: string; sr: string };
  options: { en: string[]; sr: string[] };
  correct: number; 
  explanation: { en: string; sr: string };
  mode: GameMode;
  reward: number;
  penalty: number;
}



export interface IncomeEvent {
  title: { en: string; sr: string };
  description: { en: string; sr: string };
  amount: number;
  icon: string;
}

export interface ExpenseEvent {
  title: { en: string; sr: string };
  description: { en: string; sr: string };
  amount: number;
  icon: string;
}

export const investmentOutcomes: { 
  diceRange: [number, number]; 
  result: 'lose' | 'even' | 'win'; 
  multiplier: number; 
  message: { en: string; sr: string } 
}[] = [
  { diceRange: [1, 1], result: 'lose', multiplier: 0.25, message: { en: '📉 Significant Loss. Market crashed!', sr: '📉 Značajan gubitak. Tržište se srušilo!' } },
  { diceRange: [2, 2], result: 'lose', multiplier: 0.5, message: { en: '📉 Small Loss. Market down.', sr: '📉 Manji gubitak. Tržište je u padu.' } },
  { diceRange: [3, 3], result: 'even', multiplier: 1.0, message: { en: '⚖️ Sideways Trend. You broke even.', sr: '⚖️ Bočni trend. Na nuli ste.' } },
  { diceRange: [4, 4], result: 'win', multiplier: 1.5, message: { en: '🚀 Growth! You made a profit.', sr: '🚀 Rast! Ostvarili ste profit.' } },
  { diceRange: [5, 5], result: 'win', multiplier: 2.0, message: { en: '🚀 Bull Market! Your investment grew 2x.', sr: '🚀 Bul market! Vaša investicija je porasla 2x.' } },
  { diceRange: [6, 6], result: 'win', multiplier: 2.5, message: { en: '✨ Jackpot! You grew your investment 2.5x!', sr: '✨ Džekpot! Vaša investicija je porasla 2,5x!' } },
];

export function getInvestmentResult(dice: number): { multiplier: number; message: { en: string; sr: string }; result: 'lose' | 'even' | 'win' } {
  const outcome = investmentOutcomes.find(o => dice >= o.diceRange[0] && dice <= o.diceRange[1]);
  return outcome || { multiplier: 1, message: { en: 'Break even.', sr: 'Na nuli.' }, result: 'even' };
}

// ─────────────────────────────────────────────
//  FINANCE QUIZZES — A/B/C/D multiple choice
// ─────────────────────────────────────────────
export const financeQuizzes: QuizQuestion[] = [
  {
    question: { en: "What does a personal budget represent?", sr: "Šta predstavlja lični budžet?" },
    options: {
      en: [
        "A) A plan for allocating income and expenses over a specific period.",
        "B) A list of all the loans a person has.",
        "C) A document for filing taxes.",
        "D) An employment contract.",
      ],
      sr: [
        "A) Plan za raspodelu prihoda i rashoda tokom određenog perioda.",
        "B) Lista svih kredita koje osoba ima.",
        "C) Dokument za podnošenje poreske prijave.",
        "D) Ugovor o radu.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What does it mean to make a profit?", sr: "Šta znači ostvariti profit?" },
    options: {
      en: [
        "A) When income is greater than costs.",
        "B) When a company increases the number of employees.",
        "C) When a loan is taken out.",
        "D) When the price of a product increases.",
      ],
      sr: [
        "A) Kada su prihodi veći od troškova.",
        "B) Kada kompanija poveća broj zaposlenih.",
        "C) Kada se uzme kredit.",
        "D) Kada cena proizvoda poraste.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is interest on a loan?", sr: "Šta je kamata na kredit?" },
    options: {
      en: [
        "A) Part of the principal that does not have to be repaid.",
        "B) A fee paid to the bank for using borrowed money.",
        "C) An administrative penalty.",
        "D) A tax paid to the state.",
      ],
      sr: [
        "A) Deo glavnice koji se ne mora vratiti.",
        "B) Naknada koja se plaća banci za korišćenje pozajmljenog novca.",
        "C) Administrativna kazna.",
        "D) Porez koji se plaća državi.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does inflation mean?", sr: "Šta znači inflacija?" },
    options: {
      en: [
        "A) A decrease in taxes.",
        "B) An increase in the exchange rate.",
        "C) Market stability.",
        "D) A general increase in prices over time.",
      ],
      sr: [
        "A) Smanjenje poreza.",
        "B) Povećanje kursa.",
        "C) Stabilnost tržišta.",
        "D) Opšti porast cena tokom vremena.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What does an investment represent?", sr: "Šta predstavlja investicija?" },
    options: {
      en: [
        "A) An unnecessary expense.",
        "B) Investing money for future gain.",
        "C) A debt to the bank.",
        "D) A mandatory payment to the state.",
      ],
      sr: [
        "A) Nepotreban trošak.",
        "B) Ulaganje novca radi buduće dobiti.",
        "C) Dug prema banci.",
        "D) Obavezna uplata državi.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is net salary?", sr: "Šta je neto plata?" },
    options: {
      en: [
        "A) Salary before taxes.",
        "B) A bonus.",
        "C) The amount an employee receives after deducting taxes and contributions.",
        "D) An addition to a loan.",
      ],
      sr: [
        "A) Plata pre oporezivanja.",
        "B) Bonus.",
        "C) Iznos koji zaposleni prima nakon odbitka poreza i doprinosa.",
        "D) Dodatak na kredit.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What is capital?", sr: "Šta je kapital?" },
    options: {
      en: [
        "A) Resources used in the production process to generate profit.",
        "B) Money that has no purpose.",
        "C) A tax.",
        "D) A fixed cost.",
      ],
      sr: [
        "A) Resursi koji se koriste u procesu proizvodnje za stvaranje profita.",
        "B) Novac koji nema svrhu.",
        "C) Porez.",
        "D) Fiksni trošak.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What is debt?", sr: "Šta je dug?" },
    options: {
      en: [
        "A) Company profit.",
        "B) An investment.",
        "C) A financial obligation towards another entity.",
        "D) Income.",
      ],
      sr: [
        "A) Profit kompanije.",
        "B) Investicija.",
        "C) Finansijska obaveza prema drugom subjektu.",
        "D) Prihod.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is a market?", sr: "Šta je tržište?" },
    options: {
      en: [
        "A) A bank.",
        "B) The government.",
        "C) The tax administration.",
        "D) A mechanism or space where supply and demand meet to determine price.",
      ],
      sr: [
        "A) Banka.",
        "B) Vlada.",
        "C) Poreska uprava.",
        "D) Mehanizam ili prostor gde se susreću ponuda i potražnja radi formiranja cene.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does saving mean?", sr: "Šta znači štednja?" },
    options: {
      en: [
        "A) Spending without a plan.",
        "B) Setting aside a portion of income for future use.",
        "C) Buying on credit.",
        "D) Paying taxes.",
      ],
      sr: [
        "A) Trošenje bez plana.",
        "B) Izdvajanje dela prihoda za buduću upotrebu.",
        "C) Kupovina na kredit.",
        "D) Plaćanje poreza.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What is a company's income (revenue)?", sr: "Šta je prihod kompanije?" },
    options: {
      en: [
        "A) The company's total debt.",
        "B) Cash inflow from the sale of products or services.",
        "C) Profit tax.",
        "D) An administrative fee.",
      ],
      sr: [
        "A) Ukupan dug kompanije.",
        "B) Priliv novca od prodaje proizvoda ili usluga.",
        "C) Porez na dobit.",
        "D) Administrativna taksa.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What are business costs (expenses)?", sr: "Šta su troškovi poslovanja?" },
    options: {
      en: [
        "A) Expenses and outlays incurred in the company's business operations.",
        "B) The company's total income.",
        "C) Profit.",
        "D) An investment fund.",
      ],
      sr: [
        "A) Izdaci i troškovi nastali u procesu poslovanja kompanije.",
        "B) Ukupan prihod kompanije.",
        "C) Profit.",
        "D) Investicioni fond.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does bankruptcy mean?", sr: "Šta znači bankrot?" },
    options: {
      en: [
        "A) Profit growth.",
        "B) Business expansion.",
        "C) Increase in capital.",
        "D) A state of permanent inability to settle financial obligations.",
      ],
      sr: [
        "A) Rast profita.",
        "B) Širenje poslovanja.",
        "C) Povećanje kapitala.",
        "D) Stanje trajne nesposobnosti za izmirenje finansijskih obaveza.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What is a tax?", sr: "Šta je porez?" },
    options: {
      en: [
        "A) A voluntary donation.",
        "B) A legally prescribed payment to the state.",
        "C) A private investment.",
        "D) Production costs.",
      ],
      sr: [
        "A) Dobrovoljna donacija.",
        "B) Zakonom propisano plaćanje državi.",
        "C) Privatna investicija.",
        "D) Troškovi proizvodnje.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is gross salary?", sr: "Šta je bruto plata?" },
    options: {
      en: [
        "A) The amount after tax deductions.",
        "B) An employee bonus.",
        "C) The total amount before tax and contribution deductions.",
        "D) Company net profit.",
      ],
      sr: [
        "A) Iznos nakon odbitka poreza.",
        "B) Bonus za zaposlene.",
        "C) Ukupan iznos pre odbitka poreza i doprinosa.",
        "D) Neto dobit kompanije.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does an individual's credit rating represent?", sr: "Šta predstavlja kreditni rejting pojedinca?" },
    options: {
      en: [
        "A) The total amount of money a person has in their account.",
        "B) The maximum loan amount a bank must approve.",
        "C) The tax rate applied to personal income.",
        "D) An assessment of a person's financial reliability based on their history of borrowing and debt repayment.",
      ],
      sr: [
        "A) Ukupan iznos novca koji osoba ima na računu.",
        "B) Maksimalni iznos kredita koji banka mora da odobri.",
        "C) Poreska stopa koja se primenjuje na lični dohodak.",
        "D) Procena finansijske pouzdanosti osobe na osnovu istorije zaduživanja i otplate dugova.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What is the Effective Interest Rate (EIR)?", sr: "Šta je Efektivna kamatna stopa (EKS)?" },
    options: {
      en: [
        "A) Only the nominal interest without additional costs.",
        "B) The total cost of the loan expressed as a percentage, including interest and all additional costs.",
        "C) A penalty interest for late payment.",
        "D) A temporary promotional interest rate.",
      ],
      sr: [
        "A) Samo nominalna kamata bez dodatnih troškova.",
        "B) Ukupna cena kredita izražena u procentima, uključujući kamatu i sve dodatne troškove.",
        "C) Kaznena kamata za kašnjenje u plaćanju.",
        "D) Privremena promotivna kamatna stopa.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What does opportunity cost represent?", sr: "Šta predstavlja oportunitetni trošak?" },
    options: {
      en: [
        "A) The administrative cost of processing a loan.",
        "B) A fixed monthly household expense.",
        "C) The legal obligation to pay taxes.",
        "D) The value of the best foregone alternative when making a financial decision.",
      ],
      sr: [
        "A) Administrativni trošak obrade kredita.",
        "B) Fiksni mesečni trošak domaćinstva.",
        "C) Zakonska obaveza plaćanja poreza.",
        "D) Vrednost najbolje propuštene alternative pri donošenju finansijske odluke.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does loan refinancing mean?", sr: "Šta znači refinansiranje kredita?" },
    options: {
      en: [
        "A) Extending the repayment period without changing the terms.",
        "B) Replacing an existing loan with a new one, under more favorable repayment conditions.",
        "C) Partial debt forgiveness by the bank.",
        "D) A temporary suspension of repayment without interest.",
      ],
      sr: [
        "A) Produženje perioda otplate bez promene uslova.",
        "B) Zamena postojećeg kredita novim, pod povoljnijim uslovima otplate.",
        "C) Delimičan otpis duga od strane banke.",
        "D) Privremena obustava otplate bez kamate.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What does a diversified investment portfolio represent?", sr: "Šta predstavlja diversifikovani investicioni portfolio?" },
    options: {
      en: [
        "A) A combination of different types of investments to reduce overall risk.",
        "B) Investing all capital in one safe investment.",
        "C) Holding money exclusively in cash.",
        "D) Investing exclusively in short-term loans.",
      ],
      sr: [
        "A) Kombinacija različitih vrsta investicija radi smanjenja ukupnog rizika.",
        "B) Ulaganje celokupnog kapitala u jednu sigurnu investiciju.",
        "C) Držanje novca isključivo u gotovini.",
        "D) Ulaganje isključivo u kratkoročne kredite.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What does liquid asset mean?", sr: "Šta znači likvidna imovina?" },
    options: {
      en: [
        "A) An asset that can be quickly converted into cash without significant loss of value.",
        "B) An asset that cannot be sold before the contract expires.",
        "C) A long-term investment with a fixed maturity date.",
        "D) Real estate with no market value.",
      ],
      sr: [
        "A) Imovina koja se može brzo pretvoriti u gotovinu bez značajnog gubitka vrednosti.",
        "B) Imovina koja se ne može prodati pre isteka ugovora.",
        "C) Dugoročna investicija sa fiksnim datumom dospeća.",
        "D) Nekretnina bez tržišne vrednosti.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "How does an increase in interest rates affect borrowing?", sr: "Kako povećanje kamatnih stopa utiče na zaduživanje?" },
    options: {
      en: [
        "A) It reduces the total cost of the loan.",
        "B) It increases the real value of existing debts.",
        "C) It makes loans more expensive and can reduce the demand for borrowing.",
        "D) It has no impact on borrowing decisions.",
      ],
      sr: [
        "A) Smanjuje ukupnu cenu kredita.",
        "B) Povećava realnu vrednost postojećih dugova.",
        "C) Čini kredite skupljim i može smanjiti potražnju za zaduživanjem.",
        "D) Nema uticaja na odluke o zaduživanju.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What is loan amortization?", sr: "Šta je amortizacija kredita?" },
    options: {
      en: [
        "A) A one-time repayment of the entire debt.",
        "B) Partial debt forgiveness by the bank.",
        "C) Changing the interest rate without the client's consent.",
        "D) Gradual repayment of a loan through regular installments that include principal and interest.",
      ],
      sr: [
        "A) Jednokratna otplata celokupnog duga.",
        "B) Delimičan otpis duga od strane banke.",
        "C) Promena kamatne stope bez saglasnosti klijenta.",
        "D) Postepena otplata kredita putem redovnih rata koje uključuju glavnicu i kamatu.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What does a financial reserve (emergency fund) represent?", sr: "Šta predstavlja finansijska rezerva (fond za hitne slučajeve)?" },
    options: {
      en: [
        "A) Separate savings intended to cover unplanned expenses.",
        "B) Money intended exclusively for investing in stocks.",
        "C) A long-term loan for unforeseen situations.",
        "D) A mandatory deposit with the bank.",
      ],
      sr: [
        "A) Posebna štednja namenjena pokrivanju neplaniranih troškova.",
        "B) Novac namenjen isključivo za ulaganje u akcije.",
        "C) Dugoročni kredit za nepredviđene situacije.",
        "D) Obavezan depozit u banci.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does nominal interest mean?", sr: "Šta znači nominalna kamata?" },
    options: {
      en: [
        "A) Interest adjusted for inflation.",
        "B) An interest rate that is not adjusted for inflation.",
        "C) The total cost of the loan including all fees.",
        "D) Penalty interest for late payment.",
      ],
      sr: [
        "A) Kamata korigovana za inflaciju.",
        "B) Kamatna stopa koja nije korigovana za inflaciju.",
        "C) Ukupna cena kredita uključujući sve naknade.",
        "D) Kaznena kamata za kašnjenje u plaćanju.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What is financial leverage?", sr: "Šta je finansijski leveridž?" },
    options: {
      en: [
        "A) Using borrowed capital to increase potential return.",
        "B) Reducing costs through saving.",
        "C) Repaying all debts in advance.",
        "D) Investing exclusively one's own capital.",
      ],
      sr: [
        "A) Korišćenje pozajmljenog kapitala radi povećanja potencijalnog povrata.",
        "B) Smanjenje troškova putem štednje.",
        "C) Otplata svih dugova unapred.",
        "D) Ulaganje isključivo sopstvenog kapitala.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What are external costs (externalities)?", sr: "Šta su eksterni troškovi (eksternalije)?" },
    options: {
      en: [
        "A) Costs borne by the consumer when purchasing a product.",
        "B) Costs that a company records in its corporate report.",
        "C) Costs arising from production or consumption that are not directly paid for by the producer or consumer.",
        "D) Transportation costs of goods.",
      ],
      sr: [
        "A) Troškovi koje snosi potrošač pri kupovini proizvoda.",
        "B) Troškovi koje kompanija beleži u svom izveštaju.",
        "C) Troškovi nastali u procesu proizvodnje ili potrošnje koje direktno ne plaća proizvođač ili potrošač.",
        "D) Troškovi transporta robe.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What is profit tax (corporate income tax)?", sr: "Šta je porez na dobit (korporativni porez)?" },
    options: {
      en: [
        "A) Tax a company pays on its realized profit.",
        "B) Tax on total revenue regardless of costs.",
        "C) An administrative fee for company registration.",
        "D) A penalty for late VAT payment.",
      ],
      sr: [
        "A) Porez koji kompanija plaća na ostvarenu dobit.",
        "B) Porez na ukupan prihod bez obzira na troškove.",
        "C) Administrativna taksa za registraciju kompanije.",
        "D) Kazna za kašnjenje u plaćanju PDV-a.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What does an annuity represent?", sr: "Šta predstavlja anuitet?" },
    options: {
      en: [
        "A) A one-time interest payment.",
        "B) A bonus given by the bank to the client.",
        "C) An equal periodic amount used to repay the principal and interest over time.",
        "D) A fixed tax on a loan.",
      ],
      sr: [
        "A) Jednokratna isplata kamate.",
        "B) Bonus koji banka daje klijentu.",
        "C) Jednak periodični iznos kojim se tokom vremena otplaćuju glavnica i kamata.",
        "D) Fiksni porez na kredit.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is inflation risk?", sr: "Šta je inflacioni rizik?" },
    options: {
      en: [
        "A) The risk that rising prices will reduce the real value of money or an investment.",
        "B) The risk that the bank will not approve a loan.",
        "C) The risk of losing cash at home.",
        "D) The risk of an increase in income tax.",
      ],
      sr: [
        "A) Rizik da će porast cena umanjiti realnu vrednost novca ili investicije.",
        "B) Rizik da banka neće odobriti kredit.",
        "C) Rizik od gubitka gotovine kod kuće.",
        "D) Rizik od povećanja poreza na dohodak.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does it mean to be over-indebted?", sr: "Šta znači biti prezadužen?" },
    options: {
      en: [
        "A) Having multiple sources of income.",
        "B) Owning multiple investments.",
        "C) Repaying a loan before its maturity.",
        "D) Having obligations that exceed the ability to repay regularly.",
      ],
      sr: [
        "A) Imati višestruke izvore prihoda.",
        "B) Posedovati višestruke investicije.",
        "C) Otplata kredita pre roka dospeća.",
        "D) Imati obaveze koje prevazilaze mogućnost redovne otplate.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What is the payback period of an investment?", sr: "Šta je period povraćaja investicije?" },
    options: {
      en: [
        "A) The maturity date of a loan.",
        "B) The duration of a tax obligation.",
        "C) The time needed for the initial investment to be recovered through net cash inflows.",
        "D) The duration of an employment contract.",
      ],
      sr: [
        "A) Datum dospeća kredita.",
        "B) Trajanje poreske obaveze.",
        "C) Vreme potrebno da se početna investicija vrati kroz neto novčane prilive.",
        "D) Trajanje ugovora o radu.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What does inflation-adjusted return mean?", sr: "Šta znači prinos korigovan za inflaciju?" },
    options: {
      en: [
        "A) Total nominal income without adjustment.",
        "B) Return before tax.",
        "C) Interest calculated monthly.",
        "D) Real return, i.e., return reduced by the inflation rate.",
      ],
      sr: [
        "A) Ukupan nominalni prihod bez korekcije.",
        "B) Prinos pre oporezivanja.",
        "C) Kamata obračunata mesečno.",
        "D) Realni prinos, odnosno prinos umanjen za stopu inflacije.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does capital turnover represent?", sr: "Šta predstavlja koeficijent obrta kapitala?" },
    options: {
      en: [
        "A) The total amount of a company's capital.",
        "B) A long-term loan.",
        "C) The ratio of revenue to invested capital, showing the efficiency of its use.",
        "D) The tax liability on assets.",
      ],
      sr: [
        "A) Ukupan iznos kapitala kompanije.",
        "B) Dugoročni kredit.",
        "C) Odnos između prihoda i uloženog kapitala, koji pokazuje efikasnost njegovog korišćenja.",
        "D) Poreska obaveza na imovinu.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What does the financial stability of a household mean?", sr: "Šta znači finansijska stabilnost domaćinstva?" },
    options: {
      en: [
        "A) Relying on short-term loans for basic expenses.",
        "B) Spending all income without planning.",
        "C) The ability to regularly cover expenses while having savings for unforeseen situations.",
        "D) Investing without risk assessment.",
      ],
      sr: [
        "A) Oslanjanje na kratkoročne kredite za osnovne troškove.",
        "B) Trošenje svih prihoda bez planiranja.",
        "C) Sposobnost redovnog pokrivanja troškova uz posedovanje ušteđevine za nepredviđene situacije.",
        "D) Ulganje bez procene rizika.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is investment diversification?", sr: "Šta je diversifikacija investicija?" },
    options: {
      en: [
        "A) Spreading funds across multiple investments to reduce risk.",
        "B) Investing in one safe option.",
        "C) Holding money in cash.",
        "D) Using loans to increase capital.",
      ],
      sr: [
        "A) Raspoređivanje sredstava na više različitih investicija radi smanjenja rizika.",
        "B) Ulaganje u jednu sigurnu opciju.",
        "C) Držanje novca u gotovini.",
        "D) Korišćenje kredita za povećanje kapitala.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does margin represent?", sr: "Šta predstavlja marža?" },
    options: {
      en: [
        "A) The difference between the selling price and the purchase price of a product.",
        "B) Total revenue.",
        "C) Profit tax.",
        "D) A long-term loan.",
      ],
      sr: [
        "A) Razlika između prodajne i nabavne cene proizvoda.",
        "B) Ukupan prihod.",
        "C) Porez na dobit.",
        "D) Dugoročni kredit.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "If you invest 100,000 at 10%, what is the amount after one year?", sr: "Ako investirate 100.000 uz kamatu od 10%, koji je iznos nakon godinu dana?" },
    options: {
      en: [
        "A) 120,000",
        "B) 100,100",
        "C) 90,000",
        "D) 110,000",
      ],
      sr: [
        "A) 120.000",
        "B) 100.100",
        "C) 90.000",
        "D) 110.000",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is a company's liquidity?", sr: "Šta je likvidnost kompanije?" },
    options: {
      en: [
        "A) The total number of employees.",
        "B) The company's long-term assets.",
        "C) A tax liability.",
        "D) The ability to regularly settle short-term obligations.",
      ],
      sr: [
        "A) Ukupan broj zaposlenih.",
        "B) Dugoročna imovina kompanije.",
        "C) Poreska obaveza.",
        "D) Sposobnost redovnog izmirivanja kratkoročnih obaveza.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What is VAT?", sr: "Šta je PDV?" },
    options: {
      en: [
        "A) Tax on employee income.",
        "B) Bank interest.",
        "C) Value Added Tax, which is calculated on the turnover of goods and services.",
        "D) A private donation.",
      ],
      sr: [
        "A) Porez na dohodak zaposlenih.",
        "B) Bankarska kamata.",
        "C) Porez na dodatu vrednost koji se obračunava na promet robe i usluga.",
        "D) Privatna donacija.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What is the minimum share capital for a limited liability company (LLC) in Serbia?", sr: "Koliki je minimalni osnovni kapital za društvo sa ograničenom odgovornošću (D.O.O.) u Srbiji?" },
    options: {
      en: [
        "A) 500 dinars",
        "B) 1000 dinars",
        "C) 2000 dinars",
        "D) 100 dinars",
      ],
      sr: [
        "A) 500 dinara",
        "B) 1000 dinara",
        "C) 2000 dinara",
        "D) 100 dinara",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is the Net Present Value (NPV) of an investment?", sr: "Šta je neto sadašnja vrednost (NPV) investicije?" },
    options: {
      en: [
        "A) The total nominal income during the investment's lifetime.",
        "B) The average annual interest on a loan.",
        "C) The amount of tax paid on the investment.",
        "D) The difference between the present value of future cash flows and the initial investment.",
      ],
      sr: [
        "A) Ukupan nominalni prihod tokom životnog veka investicije.",
        "B) Prosečna godišnja kamata na kredit.",
        "C) Iznos plaćenog poreza na investiciju.",
        "D) Razlika između sadašnje vrednosti budućih novčanih tokova i inicijalne investicije.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does it mean for an investment to be highly volatile?", sr: "Šta znači da je investicija visoko volatilna?" },
    options: {
      en: [
        "A) Its market value fluctuates significantly in a short period of time.",
        "B) The investment guarantees a stable and secure return.",
        "C) The investment has a fixed interest rate.",
        "D) The investment is exempt from tax obligations.",
      ],
      sr: [
        "A) Njena tržišna vrednost značajno varira u kratkom vremenskom periodu.",
        "B) Investicija garantuje stabilan i siguran prinos.",
        "C) Investicija ima fiksnu kamatnu stopu.",
        "D) Investicija je oslobođena poreskih obaveza.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "How does financial leverage affect the return on investment?", sr: "Kako finansijski leveridž utiče na prinos od investicije?" },
    options: {
      en: [
        "A) It always reduces investment risk.",
        "B) It guarantees a stable income regardless of the market.",
        "C) It eliminates the need for equity capital.",
        "D) It can increase the potential return, but also significantly increase the risk of loss.",
      ],
      sr: [
        "A) On uvek smanjuje rizik investicije.",
        "B) On garantuje stabilan prihod bez obzira na tržište.",
        "C) On eliminiše potrebu za sopstvenim kapitalom.",
        "D) Može povećati potencijalni prinos, ali i značajno povećati rizik od gubitka.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What does the Debt-to-Equity ratio represent?", sr: "Šta predstavlja odnos duga prema sopstvenom kapitalu (Debt-to-Equity ratio)?" },
    options: {
      en: [
        "A) An indicator of a company's ability to settle short-term obligations from current assets.",
        "B) An indicator of a company's financial leverage (debt) in relation to its own capital.",
        "C) The ratio of a company's total assets to its total liabilities.",
        "D) An indicator of profitability in relation to the capital invested by owners.",
      ],
      sr: [
        "A) Indikator sposobnosti kompanije da izmiri kratkoročne obaveze iz obrtnih sredstava.",
        "B) Indikator finansijskog leveridža (zaduženosti) kompanije u odnosu na sopstveni kapital.",
        "C) Odnos ukupne imovine kompanije prema njenim ukupnim obavezama.",
        "D) Indikator profitabilnosti u odnosu na kapital koji su uložili vlasnici.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does it mean to be a lump-sum taxed entrepreneur?", sr: "Šta znači biti paušalno oporezovan preduzetnik?" },
    options: {
      en: [
        "A) You pay tax only when you make a profit.",
        "B) You don't pay any tax.",
        "C) You pay a fixed monthly amount of tax and contributions, without keeping business books.",
        "D) You pay VAT instead of income tax.",
      ],
      sr: [
        "A) Plaćate porez samo kada ostvarite dobit.",
        "B) Ne plaćate nikakav porez.",
        "C) Plaćate fiksni mesečni iznos poreza i doprinosa, bez vođenja poslovnih knjiga.",
        "D) Plaćate PDV umesto poreza na dohodak.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What does the liquidation value of an asset mean?", sr: "Šta znači likvidaciona vrednost imovine?" },
    options: {
      en: [
        "A) The market value of an asset under stable conditions.",
        "B) An estimate of an asset's value in the case of a forced sale.",
        "C) The initial purchase price of the asset.",
        "D) The nominal value of the asset regardless of the market.",
      ],
      sr: [
        "A) Tržišna vrednost imovine u stabilnim uslovima.",
        "B) Procena vrednosti imovine u slučaju prisilne prodaje.",
        "C) Početna nabavna cena imovine.",
        "D) Nominalna vrednost imovine bez obzira na tržište.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "How does an increase in the central bank's benchmark interest rate affect the credit market?", sr: "Kako povećanje referentne kamatne stope centralne banke utiče na tržište kredita?" },
    options: {
      en: [
        "A) It reduces the total cost of loans.",
        "B) It automatically increases corporate profits.",
        "C) It has no impact on the banking sector.",
        "D) It increases the cost of borrowing and can reduce the demand for loans.",
      ],
      sr: [
        "A) Smanjuje ukupnu cenu kredita.",
        "B) Automatski povećava profit kompanija.",
        "C) Nema nikakav uticaj na bankarski sektor.",
        "D) Povećava troškove zaduživanja i može smanjiti potražnju za kreditima.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "When does a company in Serbia become a VAT payer?", sr: "Kada kompanija u Srbiji postaje obveznik PDV-a?" },
    options: {
      en: [
        "A) When it pays contributions for employees.",
        "B) When it achieves a total turnover greater than 8,000,000 dinars in the last 12 months.",
        "C) When it has more than 5 employees.",
        "D) When it has a profit of more than 1,000,000 dinars.",
      ],
      sr: [
        "A) Kada plaća doprinose za zaposlene.",
        "B) Kada ostvari ukupan promet veći od 8.000.000 dinara u poslednjih 12 meseci.",
        "C) Kada ima više od 5 zaposlenih.",
        "D) Kada ostvari profit veći od 1.000.000 dinara.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What is the main difference between an entrepreneur and an LLC?", sr: "Koja je glavna razlika između preduzetnika i D.O.O.?" },
    options: {
      en: [
        "A) An entrepreneur does not pay taxes, while an LLC does.",
        "B) An LLC cannot have employees.",
        "C) An entrepreneur is liable with all their personal assets, while in an LLC, the members' liability is limited to the share capital.",
        "D) An entrepreneur must have minimum capital, while an LLC does not.",
      ],
      sr: [
        "A) Preduzetnik ne plaća porez, dok D.O.O. plaća.",
        "B) D.O.O. ne može imati zaposlene.",
        "C) Preduzetnik odgovara svom svojom ličnom imovinom, dok je u D.O.O.-u odgovornost članova ograničena na osnovni udeo u kapitalu.",
        "D) Preduzetnik mora imati minimalni kapital, dok D.O.O. ne mora.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What does credit risk represent?", sr: "Šta predstavlja kreditni rizik?" },
    options: {
      en: [
        "A) The risk that the debtor will not be able to settle their obligations.",
        "B) The risk that the bank will increase the interest rate.",
        "C) The risk of rising inflation.",
        "D) The risk of a change in the tax rate.",
      ],
      sr: [
        "A) Rizik da dužnik neće biti u mogućnosti da izmiri svoje obaveze.",
        "B) Rizik da će banka povećati kamatnu stopu.",
        "C) Rizik od porasta inflacije.",
        "D) Rizik od promene poreske stope.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does hedging mean in finance?", sr: "Šta znači hedžing (hedging) u finansijama?" },
    options: {
      en: [
        "A) A strategy to protect against potential financial losses.",
        "B) An investment diversification strategy to reduce overall portfolio risk.",
        "C) Taking an opposite market position to realize speculative profit.",
        "D) Adjusting the capital structure to reduce financing costs.",
      ],
      sr: [
        "A) Strategija zaštite od potencijalnih finansijskih gubitaka.",
        "B) Strategija diversifikacije investiranja radi smanjenja rizika celokupnog portfolija.",
        "C) Zuzimanje suprotnog tržišnog položaja radi ostvarivanja spekulativnog profita.",
        "D) Prilagođavanje strukture kapitala radi smanjenja troškova finansiranja.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What does operating leverage represent?", sr: "Šta predstavlja poslovni leveridž (operating leverage)?" },
    options: {
      en: [
        "A) The sensitivity of net profit to changes in financial expenses due to the use of debt.",
        "B) The relationship between total revenues and total costs at different production levels.",
        "C) A strategy to increase the profit margin by reducing variable costs per unit of product.",
        "D) The sensitivity of profit to changes in sales volume due to high fixed costs.",
      ],
      sr: [
        "A) Osetljivost neto dobiti na promene finansijskih rashoda zbog korišćenja duga.",
        "B) Odnos ukupnih prihoda i ukupnih troškova pri različitim nivoima proizvodnje.",
        "C) Strategija povećanja profitne marže kroz smanjenje varijabilnih troškova po jedinici proizvoda.",
        "D) Osetljivost dobiti na promene obima prodaje zbog postojanja visokih fiksnih troškova.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "How does high inflation affect fixed-rate debt?", sr: "Kako visoka inflacija utiče na dug sa fiksnom kamatnom stopom?" },
    options: {
      en: [
        "A) It increases the real value of the debt.",
        "B) It can reduce the real value of the debt over time.",
        "C) It does not affect the real amount of the debt.",
        "D) It automatically increases the interest rate.",
      ],
      sr: [
        "A) Povećava realnu vrednost duga.",
        "B) Može smanjiti realnu vrednost duga tokom vremena.",
        "C) Ne utiče na realni iznos duga.",
        "D) Automatski povećava kamatnu stopu.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does capital gain represent?", sr: "Šta predstavlja kapitalni dobitak?" },
    options: {
      en: [
        "A) Profit realized from selling an asset at a higher price than the purchase price.",
        "B) Profit realized from regular business operations after deducting expenses.",
        "C) An increase in the book value of an asset due to revaluation.",
        "D) Income realized from dividends and interest on financial investments.",
      ],
      sr: [
        "A) Dobit ostvarena prodajom imovine po višoj ceni od nabavne.",
        "B) Dobit ostvarena iz redovnog poslovanja nakon odbitka troškova.",
        "C) Povećanje knjigovodstvene vrednosti imovine usled revalorizacije.",
        "D) Prihod ostvaren od dividendi i kamata na finansijske investicije.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What does it mean for an investment to be liquid but high-risk?", sr: "Šta znači da je investicija likvidna, ali visokorizična?" },
    options: {
      en: [
        "A) It can be quickly cashed in with minimal transaction costs and a stable expected return.",
        "B) It yields a high return with limited volatility thanks to diversification.",
        "C) It is easily used as collateral for borrowing, but has a long maturity.",
        "D) It can be sold quickly, but there is a high probability of significant price fluctuations.",
      ],
      sr: [
        "A) Može se brzo unovčiti uz minimalne troškove transakcije i stabilan očekivani prinos.",
        "B) Donosi visok prinos uz ograničenu volatilnost zahvaljujući diversifikaciji.",
        "C) Lako se koristi kao kolateral za zaduživanje, ali ima dug rok dospelosti.",
        "D) Može se brzo prodati, ali postoji velika verovatnoća značajnih fluktuacija cene.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What do compulsory social security contributions represent?", sr: "Šta predstavljaju obavezni doprinosi za socijalno osiguranje?" },
    options: {
      en: [
        "A) A monetary amount paid by the company to employees for education.",
        "B) Money paid to the state for pension, health, and unemployment insurance.",
        "C) Money paid directly to employees for health insurance in case of unemployment.",
        "D) Profit that the company reinvests.",
      ],
      sr: [
        "A) Novčani iznos koji kompanija plaća zaposlenima za edukaciju.",
        "B) Novac koji se plaća državi za penziono, zdravstveno i osiguranje za slučaj nezaposlenosti.",
        "C) Novac koji se isplaćuje direktno zaposlenima za zdravstvo u slučaju nezaposlenosti.",
        "D) Profit koji kompanija ponovo investira.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "If the inflation rate is 8% and the interest on savings is 5%, what is the real interest rate?", sr: "Ako je stopa inflacije 8%, a kamata na štednju 5%, kolika je realna kamatna stopa?" },
    options: {
      en: [
        "A) The real interest rate is 13%.",
        "B) The real interest rate remains 5%.",
        "C) The real interest rate is negative and amounts to approximately –3%.",
        "D) Inflation does not affect the real interest rate.",
      ],
      sr: [
        "A) Realna kamatna stopa je 13%.",
        "B) Realna kamatna stopa ostaje 5%.",
        "C) Realna kamatna stopa je negativna i iznosi približno –3%.",
        "D) Inflacija ne utiče na realnu kamatnu stopu.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "Which institution is responsible for registering a company in Serbia?", sr: "Koja institucija je nadležna za registraciju firme u Srbiji?" },
    options: {
      en: [
        "A) Tax Administration.",
        "B) Ministry of Finance.",
        "C) Serbian Business Registers Agency.",
        "D) Chamber of Commerce.",
      ],
      sr: [
        "A) Poreska uprava.",
        "B) Ministarstvo finansija.",
        "C) Agencija za privredne registre (APR).",
        "D) Privredna komora.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "How does the linear economic model affect natural resources?", sr: "Kako linearni ekonomski model utiče na prirodne resurse?" },
    options: {
      en: [
        "A) It renews resources through closed production loops.",
        "B) It reduces the need for new raw materials.",
        "C) It completely eliminates waste from production.",
        "D) It encourages the continuous exploitation of resources without systematically returning them to the production cycle.",
      ],
      sr: [
        "A) Obnavlja resurse kroz zatvorene krugove proizvodnje.",
        "B) Smanjuje potrebu za novim sirovinama.",
        "C) Potpuno eliminiše otpad iz proizvodnje.",
        "D) Podstiče kontinuiranu eksploataciju resursa bez njihovog sistematskog vraćanja u ciklus proizvodnje.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'finance', reward: 50000, penalty: 25000,
  },
];

// ─────────────────────────────────────────────
//  SUSTAINABILITY QUIZZES — A/B/C/D multiple choice
// ─────────────────────────────────────────────
export const sustainabilityQuizzes: QuizQuestion[] = [
  {
    question: { en: "What does renewable energy source mean?", sr: "Šta znači obnovljivi izvor energije?" },
    options: {
      en: [
        "A) An energy source that is used only once.",
        "B) An energy source that is naturally renewed and can be used long-term.",
        "C) Energy produced exclusively from fossil fuels.",
        "D) Energy that cannot be used multiple times.",
      ],
      sr: [
        "A) Izvor energije koji se koristi samo jednom.",
        "B) Izvor energije koji se prirodno obnavlja i može se koristiti dugoročno.",
        "C) Energija proizvedena isključivo iz fosilnih goriva.",
        "D) Energija koja se ne može koristiti više puta.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What is paper recycling?", sr: "Šta je reciklaža papira?" },
    options: {
      en: [
        "A) Buying new paper without using old paper.",
        "B) Throwing paper in a landfill.",
        "C) Incinerating paper for energy.",
        "D) Reprocessing old paper into a new product.",
      ],
      sr: [
        "A) Kupovina novog papira bez korišćenja starog.",
        "B) Bacanje papira na deponiju.",
        "C) Spaljivanje papira radi dobijanja energije.",
        "D) Prerada starog papira u novi proizvod.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is composting?", sr: "Šta je kompostiranje?" },
    options: {
      en: [
        "A) Turning organic waste into nutrient-rich soil.",
        "B) Throwing food in the trash.",
        "C) Importing fertilizer from other countries.",
        "D) Incinerating waste.",
      ],
      sr: [
        "A) Pretvaranje organskog otpada u plodno zemljište bogato hranljivim materijama.",
        "B) Bacanje hrane u smeće.",
        "C) Uvoz đubriva iz drugih zemalja.",
        "D) Spaljivanje otpada.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does \"reuse\" mean?", sr: "Šta znači ponovna upotreba (reuse)?" },
    options: {
      en: [
        "A) Incinerating old products for energy.",
        "B) Buying new products regardless of old ones.",
        "C) Using a product multiple times before it becomes waste.",
        "D) Disposing of products in a landfill.",
      ],
      sr: [
        "A) Spaljivanje starih proizvoda radi dobijanja energije.",
        "B) Kupovina novih proizvoda bez obzira na stare.",
        "C) Korišćenje proizvoda više puta pre nego što postane otpad.",
        "D) Odlaganje proizvoda na deponiju.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What is local food production?", sr: "Šta je lokalna proizvodnja hrane?" },
    options: {
      en: [
        "A) Importing food from abroad.",
        "B) Producing and buying food close to where one lives.",
        "C) Industrial food production.",
        "D) Buying food of unknown origin.",
      ],
      sr: [
        "A) Uvoz hrane iz inostranstva.",
        "B) Proizvodnja i kupovina hrane u blizini mesta gde osoba živi.",
        "C) Industrijska proizvodnja hrane.",
        "D) Kupovina hrane nepoznatog porekla.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What does reducing plastic in everyday life mean?", sr: "Šta znači smanjenje upotrebe plastike u svakodnevnom životu?" },
    options: {
      en: [
        "A) Using alternative materials and reusable products.",
        "B) Throwing plastic into the river.",
        "C) Buying more plastic products.",
        "D) Turning plastic into paper.",
      ],
      sr: [
        "A) Korišćenje alternativnih materijala i proizvoda za višekratnu upotrebu.",
        "B) Bacanje plastike u reku.",
        "C) Kupovina više plastičnih proizvoda.",
        "D) Pretvaranje plastike u papir.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What is energy efficiency?", sr: "Šta je energetska efikasnost?" },
    options: {
      en: [
        "A) Relying on non-renewable energy sources.",
        "B) Increasing energy consumption for greater production.",
        "C) Using energy without measuring consumption.",
        "D) Using less energy to perform the same activity or production.",
      ],
      sr: [
        "A) Oslanjanje na neobnovljive izvore energije.",
        "B) Povećanje potrošnje energije radi veće proizvodnje.",
        "C) Korišćenje energije bez merenja potrošnje.",
        "D) Korišćenje manje energije za obavljanje iste aktivnosti ili proizvodnje.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What is the sharing economy?", sr: "Šta je ekonomija deljenja (sharing economy)?" },
    options: {
      en: [
        "A) A model where resources and products are shared collectively among multiple users.",
        "B) Private ownership of all products.",
        "C) Importing products from other countries.",
        "D) Buying products that are not used.",
      ],
      sr: [
        "A) Model u kojem se resursi i proizvodi dele kolektivno među više korisnika.",
        "B) Privatno vlasništvo nad svim proizvodima.",
        "C) Uvoz proizvoda iz drugih zemalja.",
        "D) Kupovina proizvoda koji se ne koriste.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What does \"reduce waste\" mean?", sr: "Šta znači smanjenje otpada (reduce waste)?" },
    options: {
      en: [
        "A) Buying products that spoil quickly.",
        "B) Throwing away all products that are not used.",
        "C) Limiting the amount of trash and unnecessary products.",
        "D) Ignoring separate waste collection.",
      ],
      sr: [
        "A) Kupovina proizvoda koji se brzo kvare.",
        "B) Bacanje svih proizvoda koji se ne koriste.",
        "C) Ograničavanje količine smeća i nepotrebnih proizvoda.",
        "D) Ignorisanje odvojenog sakupljanja otpada.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What is an ecological product certificate?", sr: "Šta je sertifikat ekološkog proizvoda?" },
    options: {
      en: [
        "A) A manufacturer's fiction for marketing purposes.",
        "B) Confirmation that a product meets environmental standards and causes less harm to the environment.",
        "C) A tax incentive for the product.",
        "D) A document about the product's origin.",
      ],
      sr: [
        "A) Proizvođačeva fikcija u marketinške svrhe.",
        "B) Potvrda da proizvod ispunjava ekološke standarde i nanosi manje štete životnoj sredini.",
        "C) Poreska olakšica za proizvod.",
        "D) Dokument o poreklu proizvoda.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What does regenerative agriculture mean?", sr: "Šta znači regenerativna poljoprivreda?" },
    options: {
      en: [
        "A) Burning crops for new sowings.",
        "B) Intensive use of pesticides.",
        "C) Using land for only one season.",
        "D) Applying techniques that restore the soil and increase biodiversity.",
      ],
      sr: [
        "A) Spaljivanje useva za nove setve.",
        "B) Intenzivna upotreba pesticida.",
        "C) Korišćenje zemljišta samo jednu sezonu.",
        "D) Primena tehnika koje obnavljaju zemljište i povećavaju biodiverzitet.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is sustainable packaging?", sr: "Šta je održiva ambalaža?" },
    options: {
      en: [
        "A) Packaging made from plastic that is not recycled.",
        "B) Packaging that can be recycled, composted, or reused.",
        "C) Packaging without a label.",
        "D) Packaging for single use only.",
      ],
      sr: [
        "A) Ambalaža od plastike koja se ne reciklira.",
        "B) Ambalaža koja se može reciklirati, kompostirati ili ponovo koristiti.",
        "C) Ambalaža bez etikete.",
        "D) Ambalaža samo za jednokratnu upotrebu.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does \"green purchasing\" mean?", sr: "Šta znači zelena nabavka?" },
    options: {
      en: [
        "A) Buying products that are environmentally friendly and durable.",
        "B) Buying products of unknown origin.",
        "C) Buying as many plastic products as possible.",
        "D) Ignoring the product's impact on the environment.",
      ],
      sr: [
        "A) Kupovina proizvoda koji su ekološki prihvatljivi i dugotrajni.",
        "B) Kupovina proizvoda nepoznatog porekla.",
        "C) Kupovina što više plastičnih proizvoda.",
        "D) Ignorisanje uticaja proizvoda na životnu sredinu.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What is the main goal of the circular economy?", sr: "Šta je glavni cilj cirkularne ekonomije?" },
    options: {
      en: [
        "A) Reducing waste and extending the lifespan of products.",
        "B) Maximum consumption of resources.",
        "C) Increasing disposable production.",
        "D) Rapidly replacing products with new ones.",
      ],
      sr: [
        "A) Smanjenje otpada i produženje životnog veka proizvoda.",
        "B) Maksimalna potrošnja resursa.",
        "C) Povećanje jednokratne proizvodnje.",
        "D) Brza zamena proizvoda novim.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What does recycling mean?", sr: "Šta znači reciklaža?" },
    options: {
      en: [
        "A) Exporting waste.",
        "B) Incinerating waste.",
        "C) Landfill disposal.",
        "D) Reprocessing materials for new use.",
      ],
      sr: [
        "A) Izvoz otpada.",
        "B) Spaljivanje otpada.",
        "C) Odlaganje na deponiju.",
        "D) Prerada materijala za novu upotrebu.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does a circular business model mean?", sr: "Šta znači cirkularni poslovni model?" },
    options: {
      en: [
        "A) Focusing exclusively on profit without sustainability.",
        "B) Maximum production without concern for waste.",
        "C) Business operations that maximize resource use and minimize waste through reuse and recycling.",
        "D) Importing products from multiple countries.",
      ],
      sr: [
        "A) Fokusiranje isključivo na profit bez održivosti.",
        "B) Maksimalna proizvodnja bez brige o otpadu.",
        "C) Poslovanje koje maksimizira upotrebu resursa i minimizira otpad kroz ponovnu upotrebu i reciklažu.",
        "D) Uvoz proizvoda iz više zemalja.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What is a product's carbon footprint?", sr: "Šta je karbonski otisak (carbon footprint) proizvoda?" },
    options: {
      en: [
        "A) The number of products produced annually.",
        "B) The total greenhouse gas emissions generated during the production, transport, and use of a product.",
        "C) The production cost per unit.",
        "D) The physical weight of the product.",
      ],
      sr: [
        "A) Broj proizvoda proizvedenih godišnje.",
        "B) Ukupna emisija gasova staklene bašte nastala tokom proizvodnje, transporta i upotrebe proizvoda.",
        "C) Trošak proizvodnje po jedinici.",
        "D) Fizička težina proizvoda.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is ESG reporting?", sr: "Šta je ESG izveštavanje?" },
    options: {
      en: [
        "A) Company reporting on environmental, social, and governance factors.",
        "B) A financial report on profit and loss.",
        "C) A report on income taxes.",
        "D) A company's marketing strategy.",
      ],
      sr: [
        "A) Izveštavanje kompanije o ekološkim, društvenim i upravljačim faktorima.",
        "B) Finansijski izveštaj o dobiti i gubitku.",
        "C) Izveštaj o porezima na dohodak.",
        "D) Marketinška strategija kompanije.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does \"green product\" mean?", sr: "Šta znači zeleni proizvod?" },
    options: {
      en: [
        "A) A product without origin labels.",
        "B) A product that is more expensive than the competition.",
        "C) A product made from plastic.",
        "D) A product that is environmentally friendly and has a lower negative impact on the environment.",
      ],
      sr: [
        "A) Proizvod bez oznaka o poreklu.",
        "B) Proizvod koji je skuplji od konkurencije.",
        "C) Proizvod napravljen od plastike.",
        "D) Proizvod koji je ekološki prihvatljiv i ima manji negativan uticaj na životnu sredinu.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What is sustainable forestry?", sr: "Šta je održivo šumarstvo?" },
    options: {
      en: [
        "A) Exploiting timber for quick profit.",
        "B) Cutting forests without a renewal plan.",
        "C) Managing forests so that trees are regenerated and biodiversity is preserved.",
        "D) Transporting timber to other countries.",
      ],
      sr: [
        "A) Eksploatacija drveta radi brze dobiti.",
        "B) Seča šuma bez plana obnove.",
        "C) Upravljanje šumama tako da se drveće regeneriše, a biodiverzitet očuva.",
        "D) Transport drveta u druge zemlje.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is energy efficiency in buildings?", sr: "Šta je energetska efikasnost u zgradama?" },
    options: {
      en: [
        "A) Using less energy for the same function while preserving comfort and safety.",
        "B) Increasing consumption for greater production.",
        "C) Installing devices that consume more electricity.",
        "D) Ignoring building insulation.",
      ],
      sr: [
        "A) Korišćenje manje energije za istu funkciju uz očuvanje udobnosti i bezbednosti.",
        "B) Povećanje potrošnje radi veće proizvodnje.",
        "C) Instaliranje uređaja koji troše više električne energije.",
        "D) Ignorisanje izolacije zgrada.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What is the \"cradle-to-cradle\" principle?", sr: "Šta je princip „od kolevke do kolevke” (cradle-to-cradle)?" },
    options: {
      en: [
        "A) Single use of a product without recycling.",
        "B) Product design that enables complete recycling and reuse of materials.",
        "C) Manufacturing products with plastic.",
        "D) Transporting products from another country.",
      ],
      sr: [
        "A) Jednokratna upotreba proizvoda bez reciklaže.",
        "B) Dizajn proizvoda koji omogućava potpunu reciklažu i ponovnu upotrebu materijala.",
        "C) Proizvodnja proizvoda sa plastikom.",
        "D) Transport proizvoda iz druge zemlje.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What does \"sustainable consumption\" mean?", sr: "Šta znači održiva potrošnja?" },
    options: {
      en: [
        "A) Buying the cheapest products regardless of quality.",
        "B) Buying as many products as possible at once.",
        "C) Ignoring environmental criteria when purchasing.",
        "D) Buying products and using resources in a way that reduces the negative impact on the environment.",
      ],
      sr: [
        "A) Kupovina najjeftinijih proizvoda bez obzira na kvalitet.",
        "B) Kupovina što više proizvoda odjednom.",
        "C) Ignorisanje ekoloških kriterijuma pri kupovini.",
        "D) Kupovina proizvoda i korišćenje resursa na način koji smanjuje negativan uticaj na životnu sredinu.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is a regenerative economy?", sr: "Šta je regenerativna ekonomija?" },
    options: {
      en: [
        "A) A model based on fossil fuels.",
        "B) A model that uses resources without planning for renewal.",
        "C) A model that restores natural systems and resources, not just uses them.",
        "D) An economy that ignores environmental factors.",
      ],
      sr: [
        "A) Model zasnovan na fosilnim gorivima.",
        "B) Model koji koristi resurse bez planiranja obnove.",
        "C) Model koji obnavlja prirodne sisteme i resurse, a ne samo da ih koristi.",
        "D) Ekonomija koja ignoriše ekološke faktore.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does the \"zero waste\" philosophy mean?", sr: "Šta znači filozofija bez otpada (zero waste)?" },
    options: {
      en: [
        "A) Importing plastic products.",
        "B) Throwing waste into nature.",
        "C) Minimizing waste and maximizing recycling and reuse.",
        "D) Producing one product per building.",
      ],
      sr: [
        "A) Uvoz plastičnih proizvoda.",
        "B) Bacanje otpada u prirodu.",
        "C) Minimiziranje otpada i maksimiziranje reciklaže i ponovne upotrebe.",
        "D) Proizvodnja jednog proizvoda po jednoj zgradi.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What are green bonds?", sr: "Šta su zelene obveznice?" },
    options: {
      en: [
        "A) Bonds with a fixed interest rate without an environmental goal.",
        "B) Financial instruments intended to finance projects with a positive impact on the environment.",
        "C) Short-term market speculations.",
        "D) Tax incentives for companies.",
      ],
      sr: [
        "A) Obveznice sa fiksnom kamatnom stopom bez ekološkog cilja.",
        "B) Finansijski instrumenti namenjeni finansiranju projekata sa pozitivnim uticajem na životnu sredinu.",
        "C) Kratkoročne tržišne spekulacije.",
        "D) Poreski podsticaji za kompanije.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is ecological product design?", sr: "Šta je ekološki dizajn proizvoda?" },
    options: {
      en: [
        "A) Design that considers minimizing the negative impact on the environment.",
        "B) Product design only for aesthetics.",
        "C) Product design without functionality.",
        "D) Product design only for cost reduction.",
      ],
      sr: [
        "A) Dizajn koji razmatra minimiziranje negativnog uticaja na životnu sredinu.",
        "B) Dizajn proizvoda samo radi estetike.",
        "C) Dizajn proizvoda bez funkcionalnosti.",
        "D) Dizajn proizvoda samo radi smanjenja troškova.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What is green transport?", sr: "Šta je zeleni transport?" },
    options: {
      en: [
        "A) Ignoring gas emissions.",
        "B) Using trucks with maximum fuel consumption.",
        "C) Transporting goods exclusively by plane.",
        "D) Using vehicles and technologies with minimal emissions and environmentally friendly fuels.",
      ],
      sr: [
        "A) Ignorisanje emisija gasova.",
        "B) Korišćenje kamiona sa maksimalnom potrošnjom goriva.",
        "C) Transport robe isključivo avionom.",
        "D) Korišćenje vozila i tehnologija sa minimalnim emisijama i ekološki prihvatljivim gorivima.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What does \"sustainable supply chains\" mean?", sr: "Šta znače održivi lanci snabdevanja?" },
    options: {
      en: [
        "A) Maximizing profit without environmental responsibility.",
        "B) A production and distribution chain that minimizes negative impact on the environment and society.",
        "C) Buying materials from unknown sources.",
        "D) Ignoring local suppliers.",
      ],
      sr: [
        "A) Maksimiziranje profita bez ekološke odgovornosti.",
        "B) Lanac proizvodnje i distribucije koji minimizira negativan uticaj na životnu sredinu i društvo.",
        "C) Kupovina materijala iz nepoznatih izvora.",
        "D) Ignorisanje lokalnih dobavljača.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is CO2 emissions?", sr: "Šta su emisije CO2?" },
    options: {
      en: [
        "A) The rate of plant growth.",
        "B) The amount of oxygen in the atmosphere.",
        "C) The amount of carbon dioxide produced by burning fossil fuels or industrial processes.",
        "D) The amount of recycled waste.",
      ],
      sr: [
        "A) Stopa rasta biljaka.",
        "B) Količina kiseonika u atmosferi.",
        "C) Količina ugljen-dioksida proizvedenog sagorevanjem fosilnih goriva ili industrijskim procesima.",
        "D) Količina recikliranog otpada.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does \"sustainable fashion\" mean?", sr: "Šta znači održiva moda?" },
    options: {
      en: [
        "A) Clothing products manufactured with minimal negative impact on the environment and fair working conditions.",
        "B) Using fast fashion without environmental control.",
        "C) Clothing made exclusively from plastic.",
        "D) Buying the cheapest products.",
      ],
      sr: [
        "A) Proizvodi odeće proizvedeni sa minimalnim negativnim uticajem na životnu sredinu i poštenim uslovima rada.",
        "B) Korišćenje brze mode bez kontrole životne sredine.",
        "C) Odeća napravljena isključivo od plastike.",
        "D) Kupovina najjeftinijih proizvoda.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "Why is extending the lifespan of products given priority in the circular economy?", sr: "Zašto se produženju životnog veka proizvoda daje prioritet u cirkularnoj ekonomiji?" },
    options: {
      en: [
        "A) Because it increases the amount of waste.",
        "B) Because it increases the faster consumption of resources.",
        "C) Because it reduces the need for new production and extraction of raw materials.",
        "D) Because it reduces competition in the market.",
      ],
      sr: [
        "A) Zato što povećava količinu otpada.",
        "B) Zato što povećava bržu potrošnju resursa.",
        "C) Zato što smanjuje potrebu za novom proizvodnjom i eksploatacijom sirovina.",
        "D) Zato što smanjuje konkurenciju na tržištu.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What does \"sustainable diet\" mean?", sr: "Šta znači održiva ishrana?" },
    options: {
      en: [
        "A) Consuming food that has a minimal negative impact on the environment.",
        "B) Consuming as much fast food as possible.",
        "C) Importing food from other continents without impact analysis.",
        "D) Consuming exclusively meat.",
      ],
      sr: [
        "A) Konzumiranje hrane koja ima minimalan negativan uticaj na životnu sredinu.",
        "B) Konzumiranje što više brze hrane.",
        "C) Uvoz hrane sa drugih kontinenata bez analize uticaja.",
        "D) Konzumiranje isključivo mesa.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What is green infrastructure?", sr: "Šta je zelena infrastruktura?" },
    options: {
      en: [
        "A) Installing devices with high emissions.",
        "B) Concreting all surfaces for development.",
        "C) Building factories without environmental standards.",
        "D) Infrastructure that uses natural systems to reduce negative impact on the environment.",
      ],
      sr: [
        "A) Instaliranje uređaja sa visokim emisijama.",
        "B) Betoniranje svih površina radi razvoja.",
        "C) Izgradnja fabrika bez ekoloških standarda.",
        "D) Infrastruktura koja koristi prirodne sisteme za smanjenje negativnog uticaja na životnu sredinu.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "Which is an example of the circular economy?", sr: "Šta je primer cirkularne ekonomije?" },
    options: {
      en: [
        "A) Rapid consumption of products without recycling.",
        "B) A company that buys back old phones, refurbishes them, and resells them.",
        "C) Manufacturing products from non-renewable resources.",
        "D) Producing as much goods as possible for greater profit.",
      ],
      sr: [
        "A) Brza potrošnja proizvoda bez reciklaže.",
        "B) Kompanija koja otkupljuje stare telefone, servisira ih i ponovo prodaje.",
        "C) Proizvodnja proizvoda od neobnovljivih resursa.",
        "D) Proizvodnja što više robe radi veće dobiti.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What does \"sustainable water consumption\" mean?", sr: "Šta znači održiva potrošnja vode?" },
    options: {
      en: [
        "A) Using water in a way that conserves resources and reduces pollution.",
        "B) Disposing of excess water into the sewage system.",
        "C) Increasing consumption without control.",
        "D) Consuming only bottled water.",
      ],
      sr: [
        "A) Korišćenje vode na način koji čuva resurse i smanjuje zagađenje.",
        "B) Odlaganje viška vode u kanalizacioni sistem.",
        "C) Povećanje potrošnje bez kontrole.",
        "D) Konzumiranje isključivo flaširane vode.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What is eco-innovation?", sr: "Šta je eko-inovacija?" },
    options: {
      en: [
        "A) An old product sold at a higher price.",
        "B) A new product or process that reduces the negative impact on the environment.",
        "C) A marketing trick with no ecological effect.",
        "D) Production only for the domestic market.",
      ],
      sr: [
        "A) Stari proizvod koji se prodaje po višoj ceni.",
        "B) Novi proizvod ili proces koji smanjuje negativan uticaj na životnu sredinu.",
        "C) Marketinški trik bez ekološkog efekta.",
        "D) Proizvodnja samo za domaće tržište.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What does \"minimal waste in production\" mean?", sr: "Šta znači minimalan otpad u proizvodnji?" },
    options: {
      en: [
        "A) Increasing production at all costs.",
        "B) Throwing excess material into nature.",
        "C) Optimizing the production process to reduce the amount of waste.",
        "D) Ignoring recycling.",
      ],
      sr: [
        "A) Povećanje proizvodnje po svaku cenu.",
        "B) Bacanje viška materijala u prirodu.",
        "C) Optimizacija procesa proizvodnje radi smanjenja količine otpada.",
        "D) Ignorisanje reciklaže.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What are green investments?", sr: "Šta su zelene investicije?" },
    options: {
      en: [
        "A) Short-term speculations.",
        "B) Investments in fossil fuels.",
        "C) Projects without a financial plan.",
        "D) Investments in projects that reduce the negative impact on the environment.",
      ],
      sr: [
        "A) Kratkoročne spekulacije.",
        "B) Investicije u fosilna goriva.",
        "C) Projekti bez finansijskog plana.",
        "D) Investicije u projekte koji smanjuju negativan uticaj na životnu sredinu.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does the ESG criterion represent?", sr: "Šta predstavlja ESG kriterijum?" },
    options: {
      en: [
        "A) Bank interest.",
        "B) State tax.",
        "C) Assessment of a company's environmental, social, and governance impact.",
        "D) A bonus for employees.",
      ],
      sr: [
        "A) Bankarsku kamatu.",
        "B) Državni porez.",
        "C) Procenu ekološkog, društvenog i upravljačkog uticaja kompanije.",
        "D) Bonus za zaposlene.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What is a Product Life Cycle Assessment (LCA)?", sr: "Šta je procena životnog ciklusa proizvoda (LCA)?" },
    options: {
      en: [
        "A) An assessment of the total environmental impact of a product throughout its entire life cycle.",
        "B) An assessment of the costs and revenues of a product from the development phase to market withdrawal.",
        "C) An analysis of emissions generated exclusively in the production phase.",
        "D) An assessment of a product's market competitiveness in different phases of use.",
      ],
      sr: [
        "A) Procena ukupnog uticaja proizvoda na životnu sredinu tokom celog njegovog životnog ciklusa.",
        "B) Procena troškova i prihoda proizvoda od faze razvoja do povlačenja sa tržišta.",
        "C) Analiza emisija nastalih isključivo u fazi proizvodnje.",
        "D) Procena tržišne konkurentnosti proizvoda u različitim fazama upotrebe.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What does a company's carbon neutrality represent?", sr: "Šta predstavlja karbonska neutralnost kompanije?" },
    options: {
      en: [
        "A) Achieving low emissions in direct operations, without accounting for indirect emissions.",
        "B) Reducing emissions per unit of product while increasing total production.",
        "C) Reducing emissions and compensating for remaining emissions so that net emissions are zero.",
        "D) Completely eliminating all emissions from operations.",
      ],
      sr: [
        "A) Postizanje niskih emisija u direktnim operacijama, bez uračunavanja indirektnih emisija.",
        "B) Smanjenje emisija po jedinici proizvoda uz povećanje ukupne proizvodnje.",
        "C) Smanjenje emisija i kompenzacija preostalih emisija tako da neto emisije budu nula.",
        "D) Potpuno eliminisanje svih emisija iz poslovanja.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What is a green loan?", sr: "Šta je zeleni kredit?" },
    options: {
      en: [
        "A) A long-term loan with a subsidized interest rate for industrial development.",
        "B) A loan intended for companies that have an ESG strategy, regardless of the purpose of the investment.",
        "C) An investment loan with an obligation to report on the project's impact.",
        "D) A loan with more favorable terms for energy efficiency or renewable energy projects.",
      ],
      sr: [
        "A) Dugoročni kredit sa subvencionisanom kamatnom stopom za industrijski razvoj.",
        "B) Kredit namenjen kompanijama koje imaju ESG strategiju, bez obzira na namenu investicije.",
        "C) Investicioni kredit sa obavezom izveštavanja o uticaju projekta.",
        "D) Kredit sa povoljnijim uslovima za projekte energetske efikasnosti ili obnovljivih izvora energije.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What does \"closed production cycle\" mean?", sr: "Šta znači zatvoreni proizvodni ciklus?" },
    options: {
      en: [
        "A) Production within a single company without external suppliers.",
        "B) All materials of a product are returned to production after use, with no waste.",
        "C) A process where part of the waste is used for energy production.",
        "D) An industrial model with minimal import of raw materials.",
      ],
      sr: [
        "A) Proizvodnja u okviru jedne kompanije bez spoljnih dobavljača.",
        "B) Svi materijali proizvoda se nakon upotrebe vraćaju u proizvodnju, bez stvaranja otpada.",
        "C) Proces u kojem se deo otpada koristi za proizvodnju energije.",
        "D) Industrijski model sa minimalnim uvozom sirovina.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is regenerative agriculture in practice?", sr: "Šta je regenerativna poljoprivreda u praksi?" },
    options: {
      en: [
        "A) Sustainable agriculture with reduced use of chemicals.",
        "B) Applying techniques that restore the soil and increase biodiversity.",
        "C) Organic production without mineral fertilizers.",
        "D) Intensive production with controlled use of resources.",
      ],
      sr: [
        "A) Održiva poljoprivreda sa smanjenom upotrebom hemikalija.",
        "B) Primena tehnika koje obnavljaju zemljište i povećavaju biodiverzitet.",
        "C) Organska proizvodnja bez mineralnih đubriva.",
        "D) Intenzivna proizvodnja uz kontrolisanu upotrebu resursa.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What is eco-efficiency in industry?", sr: "Šta je eko-efikasnost u industriji?" },
    options: {
      en: [
        "A) Achieving greater economic value with less resource consumption and lower environmental impact.",
        "B) Reducing emissions per unit of product while maintaining the same profit margin.",
        "C) Increasing energy efficiency through technological innovation.",
        "D) Optimizing production costs while respecting environmental regulations.",
      ],
      sr: [
        "A) Postizanje veće ekonomsoke vrednosti uz manju potrošnju resursa i manji uticaj na životnu sredinu.",
        "B) Smanjenje emisija po jedinici proizvoda uz zadržavanje iste profitne marže.",
        "C) Povećanje energetske efikasnosti kroz tehnološke inovacije.",
        "D) Optimizacija troškova proizvodnje uz poštovanje ekoloških propisa.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What does \"sustainable water resource management\" mean?", sr: "Šta znači održivo upravljanje vodnim resursima?" },
    options: {
      en: [
        "A) Controlled extraction of groundwater with legal monitoring.",
        "B) Reducing industrial water consumption through technological modernization.",
        "C) Using water in a way that preserves the ecosystem and availability for future generations.",
        "D) Redirecting water towards sectors with higher economic value.",
      ],
      sr: [
        "A) Kontrolisano vađenje podzemnih voda uz zakonski monitoring.",
        "B) Smanjenje industrijske potrošnje vode kroz tehnološku modernizaciju.",
        "C) Korišćenje vode na način koji čuva ekosistem i dostupnost za buduće generacije.",
        "D) Preusmeravanje vode ka sektorima sa većom ekonomskom vrednošću.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is a green tax?", sr: "Šta je zeleni porez?" },
    options: {
      en: [
        "A) A tax intended to finance environmental projects.",
        "B) A tax that encourages environmentally friendly activities and limits harmful emissions.",
        "C) A special tax rate for companies with high emissions.",
        "D) A fee for using natural resources.",
      ],
      sr: [
        "A) Porez namenjen finansiranju ekoloških projekata.",
        "B) Porez koji podstiče ekološki prihvatljive aktivnosti i ograničava štetne emisije.",
        "C) Posebna poreska stopa za kompanije sa visokom emisijom.",
        "D) Naknada za korišćenje prirodnih resursa.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What is greenwashing?", sr: "Šta je greenwashing?" },
    options: {
      en: [
        "A) A marketing practice of presenting products or policies as environmentally friendly without making any real significant changes in business operations.",
        "B) A company's strategy to reduce its ecological footprint through measurable sustainability goals.",
        "C) A legal obligation for companies to publish CO2 emission reports.",
        "D) A product certification process by an independent environmental organization.",
      ],
      sr: [
        "A) Marketinška praksa predstavljanja proizvoda ili politika kao ekološki prihvatljivih bez stvarnih značajnih promena u poslovanju.",
        "B) Strategija kompanije za smanjenje ekološkog otiska kroz merljive ciljeve održivosti.",
        "C) Zakonska obaveza kompanija da objavljuju izveštaje o emisiji CO2.",
        "D) Proces sertifikacije proizvoda od strane nezavisne ekološke organizacije.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What is green logistics?", sr: "Šta je zelena logistika?" },
    options: {
      en: [
        "A) Switching to electric vehicles in distribution.",
        "B) Route optimization to reduce fuel costs.",
        "C) Planning and organizing transport and storage with minimal negative impact on the environment.",
        "D) Centralizing warehouses for greater efficiency.",
      ],
      sr: [
        "A) Prelazak na električna vozila u distribuciji.",
        "B) Optimizacija ruta radi smanjenja troškova goriva.",
        "C) Planiranje i organizovanje transporta i skladištenja uz minimalan negativan uticaj na životnu sredinu.",
        "D) Centralizacija skladišta radi veće efikasnosti.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What does \"product life cycle extension\" mean?", sr: "Šta znači produženje životnog ciklusa proizvoda?" },
    options: {
      en: [
        "A) Optimizing the production process for less waste.",
        "B) Extending the warranty to increase customer trust.",
        "C) Modernizing products through software upgrades.",
        "D) Designing products to last longer and be repairable or recyclable.",
      ],
      sr: [
        "A) Optimizacija procesa proizvodnje za manje otpada.",
        "B) Produženje garancije radi povećanja poverenja kupaca.",
        "C) Modernizacija proizvoda kroz softverska ažuriranja.",
        "D) Dizajniranje proizvoda da traju duže i da se mogu popraviti ili reciklirati.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What is a carbon tax?", sr: "Šta je porez na ugljenik?" },
    options: {
      en: [
        "A) A fee for using fossil fuels in industry.",
        "B) A tax on CO2 emissions to encourage pollution reduction.",
        "C) A fiscal instrument for financing climate funds.",
        "D) A special tax for energy-intensive sectors.",
      ],
      sr: [
        "A) Naknada za korišćenje fosilnih goriva u industriji.",
        "B) Porez na emisiju CO2 kako bi se podstaklo smanjenje zagađenja.",
        "C) Fiskalni instrument za finansiranje klimatskih fondova.",
        "D) Poseban porez za energetski intenzivne sektore.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "The \"polluter pays\" principle implies that:", sr: "Princip \"zagađivač plaća\" podrazumeva da:" },
    options: {
      en: [
        "A) The costs of environmental protection are borne by the state from the budget.",
        "B) Consumers jointly finance the remediation of environmental damage.",
        "C) All companies pay the same environmental tax regardless of their emissions.",
        "D) The entity that causes pollution bears the costs of prevention and remediation of damage.",
      ],
      sr: [
        "A) Troškove zaštite životne sredine snosi država iz budžeta.",
        "B) Potrošači zajednički finansiraju sanaciju ekološke štete.",
        "C) Sve kompanije plaćaju isti ekološki porez bez obzira na emisije.",
        "D) Subjekt koji izazove zagađenje snosi troškove prevencije i sanacije štete.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What does \"green building design\" mean?", sr: "Šta znači zeleno projektovanje zgrada?" },
    options: {
      en: [
        "A) Designing buildings with minimal operating costs.",
        "B) Using local construction materials to reduce transport.",
        "C) Designing buildings with energy efficiency, renewable sources, and minimal waste.",
        "D) Applying energy efficiency standards during the operational phase.",
      ],
      sr: [
        "A) Projektovanje zgrada sa minimalnim operativnim trošovima.",
        "B) Korišćenje lokalnih građevinskih materijala radi smanjenja transporta.",
        "C) Projektovanje zgrada uz energetsku efikasnost, obnovljive izvore i minimalan otpad.",
        "D) Primena standarda energetske efikasnosti tokom faze eksploatacije.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does a forest ecological certificate represent?", sr: "Šta predstavlja ekološki sertifikat za šume?" },
    options: {
      en: [
        "A) Confirmation that the forest and forestry operations meet sustainability standards.",
        "B) A permit for timber exploitation with controlled cutting.",
        "C) A document on the legal origin of timber.",
        "D) A national register of forest resources.",
      ],
      sr: [
        "A) Potvrda da šuma i šumske operacije ispunjavaju standarde održivosti.",
        "B) Dozvola za eksploataciju drveta uz kontrolisanu seču.",
        "C) Dokument o legalnom poreklu drveta.",
        "D) Nacionalni registar šumskih resursa.",
      ]
    },
    correct: 0,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "What does \"sustainable aquaculture\" mean?", sr: "Šta znači održiva akvakultura?" },
    options: {
      en: [
        "A) Controlled industrial farming with optimization of feed costs.",
        "B) Aquaculture with reduced impact on local fish populations.",
        "C) An integrated system of fish and plant farming for greater productivity.",
        "D) Farming fish and seafood in a way that does not harm the ecosystem.",
      ],
      sr: [
        "A) Kontrolisani industrijski uzgoj sa optimizacijom troškova hrane.",
        "B) Akvakultura sa smanjenim uticajem na lokalne populacije riba.",
        "C) Integrisani sistem uzgoja ribe i biljaka radi veće produktivnosti.",
        "D) Uzgoj ribe i morskih plodova na način koji ne šteti ekosistemu.",
      ]
    },
    correct: 3,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What is green technology (Green Tech)?", sr: "Šta je zelena tehnologija (Green Tech)?" },
    options: {
      en: [
        "A) Technology with high energy efficiency.",
        "B) Technology that reduces the negative impact on the environment and uses renewable resources.",
        "C) Innovation aimed at reducing industrial emissions.",
        "D) Technological solution based on renewable energy sources.",
      ],
      sr: [
        "A) Tehnologija sa visokom energetskom efikasnošću.",
        "B) Tehnologija koja smanjuje negativan uticaj na životnu sredinu i koristi obnovljive resurse.",
        "C) Inovacija usmerena na smanjenje industrijskih emisija.",
        "D) Tehnološko rešenje zasnovano na obnovljivim izvorima energije.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
  {
    question: { en: "What does \"socially and environmentally responsible investment\" mean?", sr: "Šta znači društveno i ekološki odgovorno investiranje?" },
    options: {
      en: [
        "A) Investment in projects with low regulatory risk.",
        "B) Long-term investment in sustainability infrastructure.",
        "C) Investing in projects that have a positive impact on society and the environment.",
        "D) A portfolio with reduced exposure to fossil fuels.",
      ],
      sr: [
        "A) Investiranje u projekte sa niskim regulatornim rizikom.",
        "B) Dugoročno investiranje u infrastrukturu održivosti.",
        "C) Investiranje u projekte koji imaju pozitivan uticaj na društvo i životnu sredinu.",
        "D) Portfolio sa smanjenom izloženošću fosilnim gorivima.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 10000, penalty: 5000,
  },
  {
    question: { en: "Which situation is the best example of internalizing a negative externality?", sr: "Koji primer najbolje opisuje internalizaciju negativnog eksternalnog efekta?" },
    options: {
      en: [
        "A) Voluntary emission compensation through the purchase of carbon credits.",
        "B) Increasing the price of a product due to rising raw material costs.",
        "C) Introducing a tax on CO2 emissions that increases the price of fossil fuels.",
        "D) Subsidizing clean technologies from the budget.",
      ],
      sr: [
        "A) Dobrovoljna kompenzacija emisija kupovinom karbonskih kredita.",
        "B) Povećanje cene proizvoda zbog rasta troškova sirovina.",
        "C) Uvođenje poreza na emisiju CO2 koji povećava cenu fosilnih goriva.",
        "D) Subvencionisanje čistih tehnologija iz budžeta.",
      ]
    },
    correct: 2,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 20000, penalty: 10000,
  },
  {
    question: { en: "What does \"resource loop\" mean in the circular economy?", sr: "Šta znači krug resursa u cirkularnoj ekonomiji?" },
    options: {
      en: [
        "A) Optimizing the supply chain to reduce waste.",
        "B) Planning production so that materials and energy circulate through reuse, recycling, and regeneration of resources.",
        "C) Increasing the recycling rate at the national level.",
        "D) Replacing fossil fuels with renewable energy sources.",
      ],
      sr: [
        "A) Optimizacija lanca snabdevanja radi smanjenja otpada.",
        "B) Planiranje proizvodnje tako da materijali i energija cirkulišu kroz ponovnu upotrebu, reciklažu i regeneraciju resursa.",
        "C) Povećanje stope reciklaže na nacionalnom nivou.",
        "D) Zamena fosilnih goriva obnovljivim izvorima energije.",
      ]
    },
    correct: 1,
    explanation: { en: "Correct! Keep making smart choices.", sr: "Tačno! Nastavite sa pametnim izborima." },
    mode: 'sustainability', reward: 50000, penalty: 25000,
  },
];




// ─────────────────────────────────────────────
//  INCOME & EXPENSE EVENTS
// ─────────────────────────────────────────────
// Income: Fixed range [50k, 175k]
export const incomeEvents: IncomeEvent[] = [
  { title: { en: "Salary", sr: "Plata" }, description: { en: "You received your monthly salary!", sr: "Dobili ste mesečnu platu!" }, amount: 65000, icon: "💼" },
  { title: { en: "Freelance Gig", sr: "Frilans posao" }, description: { en: "You completed a project for a client!", sr: "Završili ste projekat za klijenta!" }, amount: 35000, icon: "💻" },
  { title: { en: "Dividends", sr: "Dividende" }, description: { en: "Your stocks paid out a dividend!", sr: "Vaše akcije su isplatile dividendu!" }, amount: 45000, icon: "📈" },
  { title: { en: "Bonus", sr: "Bonus" }, description: { en: "A nice performance bonus!", sr: "Dobili ste bonus za odličan rad!" }, amount: 85000, icon: "🎁" },
  { title: { en: "Rent Income", sr: "Kirija" }, description: { en: "Income from your property!", sr: "Prihod od izdavanja nekretnine!" }, amount: 40000, icon: "🏠" },
  { title: { en: "Asset Sale", sr: "Prodaja imovine" }, description: { en: "You sold items at a profit!", sr: "Prodali ste stvari uz profit!" }, amount: 90000, icon: "🚗" },
  { title: { en: "Savings Interest", sr: "Kamata na štednju" }, description: { en: "Interest on your savings account!", sr: "Kamata na vašem štednom računu!" }, amount: 15000, icon: "🏦" },
  { title: { en: "Tax Refund", sr: "Povraćaj poreza" }, description: { en: "Tax office refund!", sr: "Povraćaj novca od poreske uprave!" }, amount: 30000, icon: "📋" },
  { title: { en: "Investment Gain", sr: "Dobitak od investicije" }, description: { en: "Profit from small stocks!", sr: "Dobit od malih akcija!" }, amount: 75000, icon: "💰" },
  { title: { en: "Online Income", sr: "Online zarada" }, description: { en: "Digital business earnings!", sr: "Zarada od digitalnog biznisa!" }, amount: 55000, icon: "🌐" },
];

// Expenses: Fixed range [15k, 90k]
export const expenseEvents: ExpenseEvent[] = [
  { title: { en: "Car Repair", sr: "Popravka auta" }, description: { en: "Vehicle maintenance cost.", sr: "Troškovi održavanja vozila." }, amount: 45000, icon: "🔧" },
  { title: { en: "Medical Bill", sr: "Medicinski trošak" }, description: { en: "Unexpected medical cost.", sr: "Neočekivani troškovi lečenja." }, amount: 30000, icon: "🏥" },
  { title: { en: "Legal Fees", sr: "Pravne takse" }, description: { en: "Cost of legal advice.", sr: "Troškovi pravnog savetovanja." }, amount: 65000, icon: "⚖️" },
  { title: { en: "Tax Audit", sr: "Poreska kontrola" }, description: { en: "Small tax adjustment.", sr: "Mala poreska doplata." }, amount: 90000, icon: "📋" },
  { title: { en: "Home Repair", sr: "Popravka kuće" }, description: { en: "Emergency structural repairs.", sr: "Hitne popravke na kući." }, amount: 75000, icon: "🏠" },
  { title: { en: "Tech Upgrade", sr: "Novi uređaji" }, description: { en: "New equipment cost.", sr: "Trošak za novu opremu." }, amount: 50000, icon: "💻" },
  { title: { en: "Vacation", sr: "Odmor" }, description: { en: "Holiday travel expenses.", sr: "Troškovi putovanja na odmor." }, amount: 55000, icon: "✈️" },
  { title: { en: "Shopping", sr: "Kupovina" }, description: { en: "Essential and non-essential shopping.", sr: "Neophodna i usputna kupovina." }, amount: 15000, icon: "🛍️" },
];

export const jailMessages = [
  { title: { en: "Bad Investment!", sr: "Loša investicija!" }, description: { en: "You invested without research. Wait one turn to recover.", sr: "Investirali ste bez istraživanja. Sačekajte jedan krug za oporavak." }, icon: "📉" },
  { title: { en: "Tax Audit!", sr: "Poreska revizija!" }, description: { en: "A tax inspection. Stay in place or pay a fine to leave.", sr: "Poreska inspekcija. Ostanite na mestu ili platite kaznu za izlazak." }, icon: "🔍" },
  { title: { en: "Fund Bankruptcy", sr: "Bankrot fonda" }, description: { en: "The fund you invested in collapsed. Skip a turn.", sr: "Fond u koji ste investirali je propao. Preskočite krug." }, icon: "💔" },
  { title: { en: "Poor Decisions!", sr: "Loše odluke!" }, description: { en: "A series of bad financial choices has stopped you.", sr: "Serija loših finansijskih izbora vas je zaustavila." }, icon: "⛔" },
];

export const switchMessages = [
  { from: 'finance', to: 'sustainability', message: { en: "🌱 Switching to Sustainability! Your decisions affect the planet!", sr: "🌱 Prelazak na održivost! Vaše odluke utiču na planetu!" }, icon: "🔄" },
  { from: 'sustainability', to: 'finance', message: { en: "💼 Back to Financial Literacy! Use smart investing to fund a green future!", sr: "💼 Povratak na finansije! Koristite pametne investicije za zelenu budućnost!" }, icon: "🔄" },
];
