// import { GameMode } from './gameData';

export interface RankedQuestion {
  id: string;
  category: 'linear' | 'circular';
  difficulty: 'easy' | 'medium' | 'hard';
  question: { en: string; sr: string };
  options: { en: string[]; sr: string[] };
  correct: number;
  explanation: { en: string; sr: string };
}

export interface SwotScenario {
  id: string;
  scenario: { en: string; sr: string };
  category: 'S' | 'W' | 'O' | 'T';
  explanation: { en: string; sr: string };
}

// Rewards and Penalties for Ranked Mode
export const RANKED_REWARDS = {
  easy: { reward: 10000, penalty: 5000 },
  medium: { reward: 20000, penalty: 10000 },
  hard: { reward: 50000, penalty: 25000 }
};

export const SWOT_PENALTY = 35000;

// Linear Economy Questions (80 total: 40 Easy, 30 Medium, 10 Hard)
export const rankedLinearQuizzes: RankedQuestion[] = [
  // EASY (1-40)
  {
    id: 'l_e_1',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What defines the 'take-make-dispose' model?", sr: "Šta definiše model 'uzmi-napravi-odloži'?" },
    options: {
      en: ["Sustainable economy", "Linear economy", "Circular economy", "Green economy"],
      sr: ["Održiva ekonomija", "Linearna ekonomija", "Cirkularna ekonomija", "Zelena ekonomija"]
    },
    correct: 1,
    explanation: { en: "The linear economy follows a straight path from extraction to waste.", sr: "Linearna ekonomija prati pravolinijski put od eksploatacije do otpada." }
  },
  {
    id: 'l_e_2',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the primary goal of short-term profit maximization?", sr: "Šta je primarni cilj maksimizacije profita u kratkom roku?" },
    options: {
      en: ["Resource conservation", "Social equity goals", "Long-term stability", "Linear growth trend"],
      sr: ["Očuvanje prirodnih resursa", "Ciljevi socijalne pravde", "Dugoročna stabilnost sistema", "Linearni rast profita"]
    },
    correct: 3,
    explanation: { en: "Linear models prioritize immediate growth over long-term sustainability.", sr: "Linearni modeli daju prioritet trenutnom rastu u odnosu na dugoročnu održivost." }
  },
  {
    id: 'l_e_3',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What happens to most products in a linear economy after use?", sr: "Šta se dešava sa većinom proizvoda u linearnoj ekonomiji nakon upotrebe?" },
    options: {
      en: ["They become waste", "They get recycled", "They are remanufactured", "They are composted"],
      sr: ["Postaju nepotreban otpad", "Oni se recikliraju", "Ponovo se proizvode", "Oni se kompostiraju"]
    },
    correct: 0,
    explanation: { en: "In linear models, products are typically discarded after their first use.", sr: "U linearnim modelima, proizvodi se obično odbacuju nakon prve upotrebe." }
  },
  {
    id: 'l_e_4',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "Which resource type is heavily exploited in linear models?", sr: "Koji tip resursa se intenzivno eksploatiše u linearnim modelima?" },
    options: {
      en: ["Renewable natural assets", "Atmospheric gas components", "Non-renewable finite resources", "Intangible digital products"],
      sr: ["Obnovljivi prirodni resursi", "Atmosferske komponente vazduha", "Neobnovljivi konačni resursi", "Nematerijalna digitalna imovina"]
    },
    correct: 2,
    explanation: { en: "Linear economy relies on the constant extraction of finite natural resources.", sr: "Linearna ekonomija se oslanja na stalnu eksploataciju konačnih prirodnih resursa." }
  },
  {
    id: 'l_e_5',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is 'planned obsolescence'?", sr: "Šta je 'planirano zastarevanje'?" },
    options: {
      en: ["Items lasting longer", "Recycling old devices", "Frequent software updates", "Designing early failure"],
      sr: ["Pravljenje trajnih stvari", "Recikliranje starih uređaja", "Česta ažuriranja softvera", "Dizajniranje ranog kvara"]
    },
    correct: 3,
    explanation: { en: "Planned obsolescence encourages frequent replacement of goods.", sr: "Planirano zastarevanje podstiče čestu zamenu robe." }
  },
  {
    id: 'l_e_6',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "Where does most linear waste end up?", sr: "Gde završava većina linearnog otpada?" },
    options: {
      en: ["Back in production", "In community gardens", "Landfills or incineration", "Digital storage facilities"],
      sr: ["Nazad u proizvodnji", "Zajedničke gradske bašte", "Deponije ili spaljivanje", "Digitalni skladišni kapaciteti"]
    },
    correct: 2,
    explanation: { en: "Linear waste management focuses on disposal rather than recovery.", sr: "Linearno upravljanje otpadom fokusira se na odlaganje umesto na oporavak." }
  },
  {
    id: 'l_e_7',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the main driver of cost in a linear model?", sr: "Šta je glavni pokretač troškova u linearnom modelu?" },
    options: {
      en: ["Logistics of recycling", "Raw material extraction", "Ecosystem restoration work", "Modular circular design"],
      sr: ["Logistika procesa reciklaže", "Ekstrakcija sirovih materijala", "Rad na obnovi ekosistema", "Modularni cirkularni dizajn"]
    },
    correct: 1,
    explanation: { en: "Extracting new materials is the primary cost and activity in linear supply chains.", sr: "Ekstrakcija novih materijala je primarni trošak i aktivnost u linearnim lancima snabdevanja." }
  },
  {
    id: 'l_e_8',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What characterizes linear consumption?", sr: "Šta karakteriše linearnu potrošnju?" },
    options: {
      en: ["Sharing economy models", "Repair and reuse culture", "Subscription service plans", "High volume, low durability"],
      sr: ["Modeli ekonomije deljenja", "Kultura popravke i upotrebe", "Planovi usluga pretplate", "Veliki obim, niska trajnost"]
    },
    correct: 3,
    explanation: { en: "Linear consumption encourages 'buying more' rather than 'using better'.", sr: "Linearna potrošnja podstiče 'kupovinu više' umesto 'boljeg korišćenja'." }
  },
  {
    id: 'l_e_9',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is a major environmental impact of linear production?", sr: "Koji je glavni uticaj linearne proizvodnje na životnu sredinu?" },
    options: {
      en: ["Pollution and resource depletion", "Local biodiversity population increase", "Natural carbon sequestration growth", "Groundwater purification process results"],
      sr: ["Zagađenje i iscrpljivanje resursa", "Povećanje populacije lokalnog biodiverziteta", "Rast prirodnog skladištenja ugljenika", "Rezultati procesa prečišćavanja podzemnih voda"]
    },
    correct: 0,
    explanation: { en: "The linear model causes significant damage to ecosystems through waste and emissions.", sr: "Linearni model uzrokuje značajnu štetu ekosistemima kroz otpad i emisije." }
  },
  {
    id: 'l_e_10',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "Why is 'single-use' plastic linear?", sr: "Zašto je 'jednokratna' plastika linearna?" },
    options: {
      en: ["Lasting for generations", "Designed for disposal", "Made from plants", "Expensive to produce"],
      sr: ["Traje mnogo generacija", "Dizajnirana za odlaganje", "Napravljena od biljaka", "Skupa za proizvodnju"]
    },
    correct: 1,
    explanation: { en: "Single-use items exemplify the 'dispose' part of the linear model.", sr: "Jednokratni predmeti su primer 'odlaganja' u linearnom modelu." }
  },
  {
    id: 'l_e_11',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What does 'downcycling' mean?", sr: "Šta znači 'downcycling'?" },
    options: {
      en: ["Upgrading product quality", "Increasing total production", "Ending current production", "Lowering material quality"],
      sr: ["Poboljšanje kvaliteta proizvoda", "Povećanje ukupne proizvodnje", "Prekid trenutne proizvodnje", "Smanjenje kvaliteta materijala"]
    },
    correct: 3,
    explanation: { en: "Downcycling is often the limit of recycling in linear systems.", sr: "Downcycling je često granica reciklaže u linearnim sistemima." }
  },
  {
    id: 'l_e_12',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the 'throwaway culture'?", sr: "Šta je 'kultura bacanja'?" },
    options: {
      en: ["Zero-waste lifestyle choice", "Preference for disposable items", "General culture of saving", "Art made from trash"],
      sr: ["Izbor lifestyle-a bez otpada", "Sklonost ka jednokratnim stvarima", "Opšta kultura štednje", "Umetnost napravljena od smeća"]
    },
    correct: 1,
    explanation: { en: "Throwaway culture is a social result of linear economic incentives.", sr: "Kultura bacanja je društveni rezultat linearnih ekonomskih podsticaja." }
  },
  {
    id: 'l_e_13',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is an externality?", sr: "Šta je eksternalija?" },
    options: {
      en: ["Strategic marketing plan", "Binding legal contract", "Unintended side effect", "Primary internal profit"],
      sr: ["Strateški marketinški plan", "Obavezujući pravni ugovor", "Nenamerni sporedni efekat", "Primarni interni profit"]
    },
    correct: 2,
    explanation: { en: "Linear models often 'externalize' environmental costs to society.", sr: "Linearni modeli često 'eksternalizuju' ekološke troškove društvu." }
  },
  {
    id: 'l_e_14',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "How does linear economy view natural capital?", sr: "Kako linearna ekonomija posmatra prirodni kapital?" },
    options: {
      en: ["Infinite raw material source", "Sacred and protected asset", "Financial and legal liability", "External ecosystem service provider"],
      sr: ["Beskonačan izvor sirovih materijala", "Svetu i zaštićenu imovinu", "Finansijsku i pravnu obavezu", "Eksternog pružaoca usluga ekosistema"]
    },
    correct: 0,
    explanation: { en: "Linear models often assume resources are always available and cheap.", sr: "Linearni modeli često pretpostavljaju da su resursi uvek dostupni i jeftini." }
  },
  {
    id: 'l_e_15',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the main risk of resource scarcity?", sr: "Šta je glavni rizik oskudice resursa?" },
    options: {
      en: ["Lower market prices", "Faster industrial production", "Better product quality", "Supply chain disruption"],
      sr: ["Niže tržišne cene", "Brža industrijska proizvodnja", "Bolji kvalitet proizvoda", "Prekid lanca snabdevanja"]
    },
    correct: 3,
    explanation: { en: "Relying on finite resources makes linear businesses vulnerable to scarcity.", sr: "Oslanjanje na konačne resurse čini linearne poslove ranjivim na oskudicu." }
  },
  {
    id: 'l_e_16',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is 'fast fashion'?", sr: "Šta je 'brza moda'?" },
    options: {
      en: ["Slowly made durable luxury clothes", "Cheap trendy clothes made quickly", "Durable handmade traditional wear", "Recycled and sustainable textile brand"],
      sr: ["Sporo pravljena trajna luksuzna odeća", "Jeftina moderna odeća pravljena brzo", "Trajna ručno rađena odeća", "Reciklirani i održivi brend tekstila"]
    },
    correct: 1,
    explanation: { en: "Fast fashion is a prime example of linear high-turnover consumption.", sr: "Brza moda je glavni primer linearne potrošnje sa brzim obrtom." }
  },
  {
    id: 'l_e_17',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "Which energy source is typically linear?", sr: "Koji izvor energije je tipično linearan?" },
    options: {
      en: ["Geothermal heat", "Solar energy", "Coal fuel", "Wind power"],
      sr: ["Geotermalna toplota", "Solarna energija", "Ugalj gorivo", "Snaga vetra"]
    },
    correct: 2,
    explanation: { en: "Fossil fuels are extracted, burned (used), and emitted (wasted).", sr: "Fosilna goriva se vade, sagorevaju (koriste) i emituju (otpad)." }
  },
  {
    id: 'l_e_18',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What does 'virgin material' refer to?", sr: "Na šta se odnosi 'devizni/novi materijal' (virgin material)?" },
    options: {
      en: ["Newly extracted raw material", "Items recycled from products", "Natural organic wood plants", "Common synthetic hard plastic"],
      sr: ["Materijal izvučen iz prirode", "Stvari reciklirane od proizvoda", "Prirodno organsko drvo biljke", "Obična sintetička tvrda plastika"]
    },
    correct: 0,
    explanation: { en: "Linear economy depends heavily on virgin materials.", sr: "Linearna ekonomija u velikoj meri zavisi od novih (virgin) materijala." }
  },
  {
    id: 'l_e_19',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the goal of a landfill?", sr: "Šta je cilj deponije?" },
    options: {
      en: ["Isolate and bury waste materials", "Store materials for future use", "Generate high local biodiversity", "Purify and clean the air"],
      sr: ["Izolacija i zakopavanje otpadnih materijala", "Skladištenje materijala za buduću upotrebu", "Generisanje visokog lokalnog biodiverziteta", "Prečišćavanje i čišćenje vazduha"]
    },
    correct: 0,
    explanation: { en: "Landfills are the final stage of the linear 'dispose' phase.", sr: "Deponije su završna faza linearnog 'odlaganja'." }
  },
  {
    id: 'l_e_20',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "How does linear design affect repairability?", sr: "Kako linearni dizajn utiče na mogućnost popravke?" },
    options: {
      en: ["Makes the process much easier", "Design prevents easy product repair", "Encourages a local DIY culture", "Requires only very simple tools"],
      sr: ["Čini proces mnogo lakšim", "Dizajn sprečava laku popravku proizvoda", "Podstiče lokalnu DIY kulturu", "Zahteva samo veoma jednostavne alate"]
    },
    correct: 1,
    explanation: { en: "Linear products are often glued or sealed to prevent repair.", sr: "Linearni proizvodi su često zalepljeni ili zapečaćeni da bi se sprečila popravka." }
  },
  {
    id: 'l_e_21',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is 'e-waste'?", sr: "Šta je 'e-otpad'?" },
    options: {
      en: ["Discarded electronic devices", "Unsolicited email spam", "Electric car fuel", "New digital currency"],
      sr: ["Odbačeni elektronski uređaji", "Nepoželjna email pošta", "Gorivo za automobile", "Nova digitalna valuta"]
    },
    correct: 0,
    explanation: { en: "Electronics are a fast-growing category of linear waste.", sr: "Elektronika je brzorastuća kategorija linearnog otpada." }
  },
  {
    id: 'l_e_22',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is a 'linear supply chain'?", sr: "Šta je 'linearni lanac snabdevanja'?" },
    options: {
      en: ["One-way material flow", "Continuous circular loop", "Network of recyclers", "Local community market"],
      sr: ["Jednosmerni tok materijala", "Kontinuirana cirkularna petlja", "Mreža lokalnih reciklera", "Lokalna gradska pijaca"]
    },
    correct: 0,
    explanation: { en: "Linear supply chains move from extraction to disposal without returning.", sr: "Linearni lanci snabdevanja se kreću od ekstrakcije do odlaganja bez povratka." }
  },
  {
    id: 'l_e_23',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the impact of toxic additives in products?", sr: "Kakav je uticaj toksičnih aditiva u proizvodima?" },
    options: {
      en: ["Improve the recycling", "Improve product smell", "Prevent material recovery", "Reduce total weight"],
      sr: ["Poboljšavaju proces reciklaže", "Poboljšavaju miris proizvoda", "Sprečavaju oporavak materijala", "Smanjuju ukupnu težinu"]
    },
    correct: 2,
    explanation: { en: "Toxic additives make it dangerous to recycle linear materials.", sr: "Toksični aditivi čine recikliranje linearnih materijala opasnim." }
  },
  {
    id: 'l_e_24',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is 'take-back' usually NOT in linear systems?", sr: "Šta 'preuzimanje' (take-back) obično NIJE u linearnim sistemima?" },
    options: {
      en: ["Brief marketing stunt", "Effective material recovery", "Very rare occurrence", "Fixed brand cost"],
      sr: ["Kratak marketinški trik", "Efikasan oporavak materijala", "Veoma retka pojava", "Fiksni trošak brenda"]
    },
    correct: 1,
    explanation: { en: "True material recovery is difficult in systems designed for disposal.", sr: "Istinski oporavak materijala je težak u sistemima dizajniranim za odlaganje." }
  },
  {
    id: 'l_e_25',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "How does the linear model view waste?", sr: "Kako linearni model posmatra otpad?" },
    options: {
      en: ["End-of-pipe problem", "Valuable future resource", "Strategic long-term investment", "Renewable energy source"],
      sr: ["Problem na kraju", "Vredan budući resurs", "Stratešku dugoročnu investiciju", "Obnovljivi izvor energije"]
    },
    correct: 0,
    explanation: { en: "Waste is seen as something to be managed, not avoided or reused.", sr: "Otpad se posmatra kao nešto čime treba upravljati, a ne izbegavati ili ponovo koristiti." }
  },
  {
    id: 'l_e_26',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the 'linear mindset'?", sr: "Šta je 'linearni način razmišljanja'?" },
    options: {
      en: ["Holistic systemic thinking", "Circular loop-based logic", "Full systemic awareness", "Isolated process focus"],
      sr: ["Holističko sistemsko razmišljanje", "Cirkularna logika petlje", "Puna sistemska svest", "Fokus na proces"]
    },
    correct: 3,
    explanation: { en: "Linear thinking ignores the systemic consequences of extraction and waste.", sr: "Linearno razmišljanje ignoriše sistemske posledice ekstrakcije i otpada." }
  },
  {
    id: 'l_e_27',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the primary motivation for linear businesses?", sr: "Šta je primarna motivacija za linearne biznise?" },
    options: {
      en: ["Global ecological health", "Extended product longevity", "Quick sales volume", "General social welfare"],
      sr: ["Globalno ekološko zdravlje", "Produžena dugovečnost proizvoda", "Brz obim prodaje", "Opšte socijalno blagostanje"]
    },
    correct: 2,
    explanation: { en: "Linear profits are often tied to selling more units as fast as possible.", sr: "Linearni profiti su često vezani za prodaju što više jedinica što je brže moguće." }
  },
  {
    id: 'l_e_28',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is 'incineration with energy recovery' in a linear context?", sr: "Šta je 'spaljivanje sa povratkom energije' u linearnom kontekstu?" },
    options: {
      en: ["Way to justify waste", "Best possible solution", "Circular economy practice", "Zero emission strategy"],
      sr: ["Način opravdanja otpada", "Najbolje moguće rešenje", "Praksa cirkularne ekonomije", "Strategija nulte emisije"]
    },
    correct: 0,
    explanation: { en: "Incineration destroys the material's structural value forever.", sr: "Spaljivanje zauvek uništava strukturnu vrednost materijala." }
  },
  {
    id: 'l_e_29',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "How does linear growth affect the planet's boundaries?", sr: "Kako linearni rast utiče na granice planete?" },
    options: {
      en: ["Stays within them", "Pushes past them", "Actively restores them", "Completely ignores them"],
      sr: ["Ostaje unutar njih", "Gura preko njih", "Aktivno ih obnavlja", "Potpuno ih ignoriše"]
    },
    correct: 1,
    explanation: { en: "Linear economy requires more resources than the planet can regenerate.", sr: "Linearna ekonomija zahteva više resursa nego što planeta može da regeneriše." }
  },
  {
    id: 'l_e_30',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is 'material throughput'?", sr: "Šta je 'materijalni protok' (material throughput)?" },
    options: {
      en: ["Total material saved", "Overall recycling rate", "High durability score", "Flow through system"],
      sr: ["Ukupno sačuvani materijal", "Opšta stopa reciklaže", "Visoka ocena trajnosti", "Tok kroz sistem"]
    },
    correct: 3,
    explanation: { en: "Linear systems aim for high throughput to drive GDP.", sr: "Linearni sistemi teže velikom protoku kako bi podstakli BDP." }
  },
  {
    id: 'l_e_31',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the 'rebound effect' in linear efficiency?", sr: "Šta je 'rebound efekat' u linearnoj efikasnosti?" },
    options: {
      en: ["Higher efficiency consumption", "Higher total recycling", "Saving more materials", "Providing better quality"],
      sr: ["Veća potrošnja efikasnosti", "Veća ukupna reciklaža", "Štednja više materijala", "Pružanje boljeg kvaliteta"]
    },
    correct: 0,
    explanation: { en: "Making linear items cheaper often leads to people buying even more of them.", sr: "Činiti linearne predmete jeftinijim često vodi do toga da ih ljudi kupuju još više." }
  },
  {
    id: 'l_e_32',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the typical lifespan of a linear smartphone?", sr: "Koliki je tipičan životni vek linearnog smartfona?" },
    options: {
      en: ["Ten years time", "Two years time", "Fifty years time", "Forever and ever"],
      sr: ["Deset godina vremena", "Dve godine vremena", "Pedeset godina vremena", "Zauvek i zauvek"]
    },
    correct: 1,
    explanation: { en: "Smartphones are often designed for short cycles and frequent upgrades.", sr: "Smartfoni su često dizajnirani za kratke cikluse i česte nadogradnje." }
  },
  {
    id: 'l_e_33',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "Why is repair often more expensive than buying new?", sr: "Zašto je popravka često skuplja od kupovine novog?" },
    options: {
      en: ["Free spare parts", "Costly labor fees", "Simple product design", "Forbidden repair laws"],
      sr: ["Besplatni rezervni delovi", "Skupi troškovi rada", "Jednostavan dizajn proizvoda", "Zabranjeni zakoni popravke"]
    },
    correct: 1,
    explanation: { en: "Linear systems subsidize extraction but not repair labor.", sr: "Linearni sistemi subvencionišu ekstrakciju, ali ne i rad na popravci." }
  },
  {
    id: 'l_e_34',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is 'greenwashing'?", sr: "Šta je 'greenwashing'?" },
    options: {
      en: ["Planting many trees", "Misleading environmental claims", "Cleaning public parks", "Saving drinking water"],
      sr: ["Sadnja mnogo drveća", "Obmanjujuće ekološke tvrdnje", "Čišćenje javnih parkova", "Štednja pijaće vode"]
    },
    correct: 1,
    explanation: { en: "Linear companies sometimes use greenwashing to hide their impact.", sr: "Linearne kompanije ponekad koriste greenwashing da sakriju svoj uticaj." }
  },
  {
    id: 'l_e_35',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "How does linear farming affect soil?", sr: "Kako linearna poljoprivreda utiče na zemljište?" },
    options: {
      en: ["Enriches it naturally", "Depletes soil nutrients", "Creates new forests", "Purifies deep groundwater"],
      sr: ["Prirodno ga obogaćuje", "Iscrpljuje hranljive materije", "Stvara nove šume", "Prečišćava duboke vode"]
    },
    correct: 1,
    explanation: { en: "Linear agriculture 'extracts' soil health without returning organic matter.", sr: "Linearna poljoprivreda 'izvlači' zdravlje zemljišta bez vraćanja organske materije." }
  },
  {
    id: 'l_e_36',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is 'embodied energy'?", sr: "Šta je 'otelovljena energija' (embodied energy)?" },
    options: {
      en: ["Battery charging life", "Total production energy", "User consumption energy", "Static electricity flow"],
      sr: ["Trajanje punjenja baterije", "Ukupna proizvodna energija", "Korisnička potrošnja energije", "Tok statičkog elektriciteta"]
    },
    correct: 1,
    explanation: { en: "Linear waste discards all the embodied energy used in production.", sr: "Linearni otpad odbacuje svu otelovljenu energiju utrošenu u proizvodnji." }
  },
  {
    id: 'l_e_37',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is a 'disposable' item?", sr: "Šta je 'jednokratni' (disposable) predmet?" },
    options: {
      en: ["Durable workshop tool", "Single use object", "Valuable family heirloom", "High quality asset"],
      sr: ["Trajni radionički alat", "Jednokratni upotrebni predmet", "Vredno porodično nasleđe", "Vredna poslovna imovina"]
    },
    correct: 1,
    explanation: { en: "Disposability is the heart of linear logic.", sr: "Jednokratnost je srce linearne logike." }
  },
  {
    id: 'l_e_38',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What happens to the value of materials in a landfill?", sr: "Šta se dešava sa vrednošću materijala na deponiji?" },
    options: {
      en: ["Economic value lost", "Material value grows", "Value stays same", "Value is harvested"],
      sr: ["Ekonomski gubitak vrednosti", "Vrednost materijala raste", "Vrednost ostaje ista", "Vrednost se sakuplja"]
    },
    correct: 0,
    explanation: { en: "Landfilling represents a total loss of economic value for that material.", sr: "Odlaganje na deponiju predstavlja potpuni gubitak ekonomske vrednosti tog materijala." }
  },
  {
    id: 'l_e_39',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "Which packaging is most linear?", sr: "Koja ambalaža je najlinearnija?" },
    options: {
      en: ["Reusable glass bottles", "Non-recyclable plastic sachets", "Simple paper bags", "Durable metal tins"],
      sr: ["Povratne staklene flaše", "Nereciklažne plastične kesice", "Obične papirne kese", "Trajne metalne kutije"]
    },
    correct: 1,
    explanation: { en: "Multi-layer materials are nearly impossible to separate and recycle.", sr: "Višeslojne materijale je skoro nemoguće odvojiti i reciklirati." }
  },
  {
    id: 'l_e_40',
      category: 'linear',
      difficulty: 'easy',
      question: { en: "What is the ultimate end of the linear economy?", sr: "Šta je krajnji ishod linearne ekonomije?" },
      options: {
        en: ["Waste resource depletion", "Universal global wealth", "Infinite economic growth", "Perfect operational efficiency"],
        sr: ["Iscrpljivanje prirodnih resursa", "Univerzalno globalno bogatstvo", "Beskonačan ekonomski rast", "Savršena operativna efikasnost"]
      },
      correct: 0,
      explanation: { en: "A linear system on a finite planet eventually runs out of inputs and overflows with waste.", sr: "Linearni sistem na konačnoj planeti na kraju ostaje bez ulaza i biva preplavljen otpadom." }
    },
    // MEDIUM (41-70)
    {
      id: 'l_m_41',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "How does over-exploitation affect raw material prices long-term?", sr: "Kako prekomerna eksploatacija utiče na dugoročnu cenu sirovina?" },
      options: {
        en: ["Prices rise from scarcity", "Prices are totally removed", "Prices drop from abundance", "Prices remain fully stable"],
        sr: ["Cene rastu zbog oskudice", "Cene se potpuno ukidaju", "Cene padaju zbog obilja", "Cene ostaju sasvim stabilne"]
      },
      correct: 0,
      explanation: { en: "As finite resources become harder to extract, their market price inevitably rises.", sr: "Kako konačni resursi postaju teži za eksploataciju, njihova tržišna cena neizbežno raste." }
    },
    {
      id: 'l_m_42',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'resource volatility'?", sr: "Šta je 'nestabilnost resursa' (resource volatility)?" },
      options: {
        en: ["Strict official government rules", "Unpredictable resource price swings", "Highly stable resource supply", "Advanced material recovery tech"],
        sr: ["Stroga zvanična državna pravila", "Nepredvidive promene cene resursa", "Vrlo stabilno snabdevanje resursima", "Napredna tehnologija oporavka materijala"]
      },
      correct: 1,
      explanation: { en: "Linear businesses face high risks from price swings in raw materials.", sr: "Linearni biznisi se suočavaju sa velikim rizicima od promena cena sirovina." }
    },
    {
      id: 'l_m_43',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is the 'linear lock-in'?", sr: "Šta je 'linearna zarobljenost' (linear lock-in)?" },
      options: {
        en: ["Infrastructure favoring linear models", "Endless material recycling loops", "Mandatory legal recycling rules", "Secure raw material storage"],
        sr: ["Infrastruktura favorizuje linearne modele", "Beskonačne petlje reciklaže materijala", "Obavezujuća pravna pravila recikliranja", "Sigurno skladište sirovih materijala"]
      },
      correct: 0,
      explanation: { en: "Existing systems (like waste collection) are often built only for linear flows.", sr: "Postojeći sistemi (poput sakupljanja otpada) često su izgrađeni samo za linearne tokove." }
    },
    {
      id: 'l_m_44',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "How does the linear model contribute to climate change?", sr: "Kako linearni model doprinosi klimatskim promenama?" },
      options: {
        en: ["Active electric car promotion", "Resource extraction and disposal", "Global planet cooling effect", "Large scale global reforestation"],
        sr: ["Aktivna promocija električnih automobila", "Ekstrakcija resursa i odlaganje", "Globalni efekat hlađenja planete", "Globalno pošumljavanje velikih razmera"]
      },
      correct: 1,
      explanation: { en: "About 45% of CO2 emissions come from material production and land use.", sr: "Oko 45% emisija CO2 dolazi od proizvodnje materijala i korišćenja zemljišta." }
    },
    {
      id: 'l_m_45',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is the 'entropy' problem in linear systems?", sr: "Šta je problem 'entropije' u linearnim sistemima?" },
      options: {
        en: ["Better material organizational structure", "Infinite material service life", "Hard to recover dispersion", "Cheap industrial energy costs"],
        sr: ["Bolja organizaciona struktura materijala", "Beskonačan vek trajanja materijala", "Težak oporavak raspršenih materijala", "Jeftini industrijski troškovi energije"]
      },
      correct: 2,
      explanation: { en: "Mixing and polluting materials increases entropy, making recovery difficult.", sr: "Mešanje i zagađivanje materijala povećava entropiju, čineći oporavak težim." }
    },
    {
      id: 'l_m_46',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "Why is 'extended producer responsibility' (EPR) rare in linear models?", sr: "Zašto je 'proširena odgovornost proizvođača' (EPR) retka u linearnim modelima?" },
      options: {
        en: ["Lack of post-sale care", "Low total production costs", "High producer social responsibility", "General consumer refusal trends"],
        sr: ["Nedostatak brige posle prodaje", "Niski ukupni troškovi proizvodnje", "Visoka socijalna odgovornost proizvođača", "Opšti trendovi odbijanja potrošača"]
      },
      correct: 0,
      explanation: { en: "Linearity separates the 'selling' phase from the 'disposal' phase responsibility.", sr: "Linearnost odvaja fazu 'prodaje' od odgovornosti za fazu 'odlaganja'." }
    },
    {
      id: 'l_m_47',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is the impact of 'perceived obsolescence'?", sr: "Kakav je uticaj 'percipiranog zastarevanja'?" },
      options: {
        en: ["High quality software updates", "Subjective feeling of outdatedness", "Actual functional technical failure", "Lower total industrial emissions"],
        sr: ["Visokokvalitetna ažuriranja softverskih sistema", "Subjektivni osećaj zastarelosti proizvoda", "Stvarni funkcionalni tehnički kvar", "Niže ukupne industrijske emisije"]
      },
      correct: 1,
      explanation: { en: "Marketing often creates a desire for new things to maintain linear sales.", sr: "Marketing često stvara želju za novim stvarima kako bi se održala linearna prodaja." }
    },
    {
      id: 'l_m_48',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "How does linear economy impact global supply chains?", sr: "Kako linearna ekonomija utiče na globalne lance snabdevanja?" },
      options: {
        en: ["Greatly simplifies global logistics", "Increases full system transparency", "Fragile extraction dependent chains", "Promotes local supply networks"],
        sr: ["Znatno pojednostavljuje globalnu logistiku", "Povećava potpunu transparentnost sistema", "Krhki lanci zavisni ekstrakciji", "Promoviše lokalne mreže snabdevanja"]
      },
      correct: 2,
      explanation: { en: "Linearity forces businesses to source materials from across the globe.", sr: "Linearnost primorava biznise da nabavljaju materijale širom sveta." }
    },
    {
      id: 'l_m_49',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'externalizing' environmental costs?", sr: "Šta je 'eksternalizacija' ekoloških troškova?" },
      options: {
        en: ["Actively reducing total waste", "Passing costs to society", "Investing in green technology", "Paying for full cleanup"],
        sr: ["Aktivno smanjenje ukupnog otpada", "Prenošenje troškova na društvo", "Investiranje u zelenu tehnologiju", "Plaćanje potpunog čišćenja otpada"]
      },
      correct: 1,
      explanation: { en: "Linear business models often don't include the cost of pollution in the price.", sr: "Linearni biznis modeli često ne uključuju trošak zagađenja u cenu." }
    },
    {
      id: 'l_m_50',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "Why is most recycling actually 'downcycling'?", sr: "Zašto je većina reciklaže zapravo 'downcycling'?" },
      options: {
        en: ["General lack of technology", "Namerni strateški poslovni izbor", "Material degradation during processing", "Obtaining better product colors"],
        sr: ["Opšti nedostatak moderne tehnologije", "Namerni strateški poslovni izbor", "Degradacija materijala tokom obrade", "Dobijanje boljih boja proizvoda"]
      },
      correct: 2,
      explanation: { en: "In linear systems, materials are often mixed, making high-quality recovery hard.", sr: "U linearnim sistemima, materijali su često pomešani, što otežava kvalitetan oporavak." }
    },
    {
      id: 'l_m_51',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is the relationship between GDP and material use in linear models?", sr: "Kakav je odnos između BDP-a i upotrebe materijala u linearnim modelima?" },
      options: {
        en: ["No relationship", "Positively coupled", "Strongly decoupled", "Strictly inverse"],
        sr: ["Nema povezanosti", "Pozitivno povezan", "Potpuno razdvojen", "Strogo inverzan"]
      },
      correct: 1,
      explanation: { en: "Linear growth usually means extracting and wasting more materials.", sr: "Linearni rast obično znači ekstrakciju i traćenje više materijala." }
    },
    {
      id: 'l_m_52',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "How does the linear model view biodiversity?", sr: "Kako linearni model posmatra biodiverzitet?" },
      options: {
        en: ["Resource or obstacle", "Strategic long-term asset", "Essential shareholder", "Primary target customer"],
        sr: ["Resurs ili prepreku", "Strateška dugoročna imovina", "Suštinski akcionar", "Primarni ciljni kupac"]
      },
      correct: 0,
      explanation: { en: "Linear progress often ignores its impact on biological diversity.", sr: "Linearni napredak često ignoriše svoj uticaj na biološku raznolikost." }
    },
    {
      id: 'l_m_53',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'material leakage'?", sr: "Šta je 'curenje materijala' (material leakage)?" },
      options: {
        en: ["Exporting finished goods", "Waste leaving the cycle", "Theft of raw materials", "Accidental liquid spills"],
        sr: ["Izvoz gotovih proizvoda", "Otpad napušta ciklus", "Krađa sirovih materijala", "Slučajno prosipanje tečnosti"]
      },
      correct: 1,
      explanation: { en: "Linear economy is defined by constant material leakage into the environment.", sr: "Linearnu ekonomiju definiše stalno curenje materijala u životnu sredinu." }
    },
    {
      id: 'l_m_54',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "Why is the linear model socially risky?", sr: "Zašto je linearni model društveno rizičan?" },
      options: {
        en: ["Causes wars and health risks", "Creates excessive job roles", "Empowers all global citizens", "System remains too stable"],
        sr: ["Uzrokuje ratove i rizike", "Stvara preveliki broj poslova", "Osnažuje sve svetske građane", "Sistem ostaje previše stabilan"]
      },
      correct: 0,
      explanation: { en: "Inequity in resource access and pollution impacts the most vulnerable.", sr: "Nepravda u pristupu resursima i zagađenju utiče na najranjivije." }
    },
    {
      id: 'l_m_55',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What characterizes linear investment?", sr: "Šta karakteriše linearno investiranje?" },
      options: {
        en: ["Long-term social legacy", "Quarterly profit focus", "Focus on ESG goals", "Circular city systems"],
        sr: ["Dugoročno društveno nasleđe", "Kvartalni profitni fokus", "Fokus na ESG ciljeve", "Cirkularni gradski sistemi"]
      },
      correct: 1,
      explanation: { en: "Investors often demand quick profits, favoring short-term linear tactics.", sr: "Investitori često zahtevaju brzi profit, favorizujući kratkoročne linearne taktike." }
    },
    {
      id: 'l_m_56',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'take-back' inflation?", sr: "Šta je 'inflacija preuzimanja'?" },
      options: {
        en: ["Higher market retail prices", "Local currency devaluation", "Collection costs > value", "More efficient recycling"],
        sr: ["Više maloprodajne cene", "Lokalna devalvacija valute", "Trošak sakupljanja > vrednosti", "Efikasnije recikliranje"]
      },
      correct: 2,
      explanation: { en: "Linear products are often so cheap or complex that collecting them is unprofitable.", sr: "Linearni proizvodi su često toliko jeftini ili složeni da je njihovo sakupljanje neprofitabilno." }
    },
    {
      id: 'l_m_57',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'planned obsolescence' in software?", sr: "Šta je 'planirano zastarevanje' u softveru?" },
      options: {
        en: ["Open source software", "Critical security patches", "Updates slowing old hardware", "Limited free trials"],
        sr: ["Softver otvorenog koda", "Kritične sigurnosne zakrpe", "Ažuriranja usporavaju hardver", "Ograničene besplatne probe"]
      },
      correct: 2,
      explanation: { en: "Software can be used to force users to buy new hardware.", sr: "Softver se može koristiti da natera korisnike da kupe novi hardver." }
    },
    {
      id: 'l_m_58',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "How does linear design impact disassembly?", sr: "Kako linearni dizajn utiče na rasklapanje?" },
      options: {
        en: ["Modular replaceable parts", "Standardized repair tools", "Permanent glues and welds", "Clear instructional labels"],
        sr: ["Modularni zamenljivi delovi", "Standardni alati za popravku", "Trajni lepkovi i zavarivanje", "Jasne oznake sa uputstvom"]
      },
      correct: 2,
      explanation: { en: "Linear products are designed to be cheap to assemble, not easy to disassemble.", sr: "Linearni proizvodi su dizajnirani da budu jeftini za sklapanje, a ne laki za rasklapanje." }
    },
    {
      id: 'l_m_59',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is the 'linear efficiency trap'?", sr: "Šta je 'linearna zamka efikasnosti'?" },
      options: {
        en: ["Efficiency in wrong goals", "Perfect recycling systems", "Standard energy saving", "Overly efficient processes"],
        sr: ["Efikasnost u pogrešnom", "Savršeni sistemi reciklaže", "Standardna štednja energije", "Previše efikasni procesi"]
      },
      correct: 0,
      explanation: { en: "Making a linear process 'efficient' still results in waste, just faster.", sr: "Učiniti linearni proces 'efikasnim' i dalje rezultira otpadom, samo brže." }
    },
    {
      id: 'l_m_60',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is the role of advertising in linearity?", sr: "Koja je uloga oglašavanja u linearnosti?" },
      options: {
        en: ["Stimulating demand", "General education", "Saving resources", "Promoting repair"],
        sr: ["Stimulacija tražnje", "Opšta edukacija", "Ušteda resursa", "Promocija popravke"]
      },
      correct: 0,
      explanation: { en: "Advertising drives the high consumption needed for linear growth.", sr: "Oglašavanje podstiče veliku potrošnju neophodnu za linearni rast." }
    },
    {
      id: 'l_m_61',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is a 'linear city'?", sr: "Šta je 'linearni grad'?" },
      options: {
        en: ["Resource extracting waste exporting", "Highly walkable urban center", "Uniform linear city structure", "Advanced smart city infrastructure"],
        sr: ["Ekstrakcija resursa izvoz otpada", "Visoko prohodan gradski centar", "Jedinstvena linearna struktura grada", "Napredna infrastruktura pametnog grada"]
      },
      correct: 0,
      explanation: { en: "Most modern cities function as linear consumers of rural resources.", sr: "Većina modernih gradova funkcioniše kao linearni potrošači ruralnih resursa." }
    },
    {
      id: 'l_m_62',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'carbon leakage'?", sr: "Šta je 'curenje ugljenika' (carbon leakage)?" },
      options: {
        en: ["Advanced carbon capture tech", "Accidental natural gas leak", "Moving to low emissions", "Active urban tree planting"],
        sr: ["Napredna tehnologija hvatanja ugljenika", "Slučajno curenje prirodnog gasa", "Selidba u niske emisije", "Aktivna gradska sadnja drveća"]
      },
      correct: 2,
      explanation: { en: "Linear companies often move to avoid environmental costs.", sr: "Linearne kompanije se često sele kako bi izbegle ekološke troškove." }
    },
    {
      id: 'l_m_63',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "How does linearity impact water?", sr: "Kako linearnost utiče na vodu?" },
      options: {
        en: ["Water purification system process", "Pollution and over extraction", "Artificial industrial rainmaking methods", "Sustainable closed loop usage"],
        sr: ["Proces sistema prečišćavanja vode", "Zagađenje i prekomerna ekstrakcija", "Veštačke industrijske metode pravljenja kiše", "Održiva upotreba zatvorenog kruga"]
      },
      correct: 1,
      explanation: { en: "Linear industry often discharges contaminated water as waste.", sr: "Linearna industrija često ispušta zagađenu vodu kao otpad." }
    },
    {
      id: 'l_m_64',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'biological nutrient' loss?", sr: "Gubitak 'bioloških hranljivih materija'?" },
      options: {
        en: ["Gradual biological weight loss", "Eating healthy organic food", "Organic waste landfill ending", "Standard industrial farming practices"],
        sr: ["Postepeni biološki gubitak težine", "Ishrana zdravom organskom hranom", "Završetak organskog otpada deponiji", "Standardne industrijske poljoprivredne prakse"]
      },
      correct: 2,
      explanation: { en: "Linear systems prevent organic matter from returning to the ecosystem.", sr: "Linearni sistemi sprečavaju vraćanje organske materije u ekosistem." }
    },
    {
      id: 'l_m_65',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'single-stream' recycling's linear flaw?", sr: "Koja je linearna mana 'single-stream' reciklaže (sve u jednu kantu)?" },
      options: {
        en: ["Contamination lower material quality", "Extremely fast processing speeds", "Extremely easy processing steps", "Saving total operational money"],
        sr: ["Kontaminacija niži kvalitet materijala", "Izuzetno velike brzine obrade", "Izuzetno laki koraci obrade", "Ušteda ukupnog operativnog novca"]
      },
      correct: 0,
      explanation: { en: "Mixing everything often makes high-quality recycling impossible.", sr: "Mešanje svega često čini kvalitetnu reciklažu nemogućom." }
    },
    {
      id: 'l_m_66',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "How does linearity view 'repair' as a business?", sr: "Kako linearnost posmatra 'popravku' kao biznis?" },
      options: {
        en: ["Mandatory legal system requirement", "Primary core business service", "Threat to new sales", "Strategic future business opportunity"],
        sr: ["Obavezujući pravni sistemski zahtev", "Primarna osnovna poslovna usluga", "Pretnja novoj prodaji proizvoda", "Strateška buduća poslovna prilika"]
      },
      correct: 2,
      explanation: { en: "Selling new is usually more profitable than repairing in linear models.", sr: "Prodaja novog je obično profitabilnija od popravke u linearnim modelima." }
    },
    {
      id: 'l_m_67',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'resource nationalism'?", sr: "Šta je 'resursni nacionalizam'?" },
      options: {
        en: ["Global resource sharing programs", "Countries controlling finite resources", "Active shared recycling efforts", "International free trade agreements"],
        sr: ["Globalni programi deljenja resursa", "Zemlje kontrolišu konačne resurse", "Aktivni zajednički napori reciklaže", "Međunarodni sporazumi slobodne trgovine"]
      },
      correct: 1,
      explanation: { en: "Scarcity leads to political tension over material control.", sr: "Oskudica vodi do političkih tenzija oko kontrole materijala." }
    },
    {
      id: 'l_m_68',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is a 'legacy' environmental problem?", sr: "Šta je 'nasleđeni' ekološki problem?" },
      options: {
        en: ["Advanced modern industrial technology", "Renewable clean energy sources", "Future generations cleanup costs", "Protected cultural heritage site"],
        sr: ["Napredna moderna industrijska tehnologija", "Obnovljivi izvori čiste energije", "Troškovi čišćenja budućih generacija", "Zaštićeni lokalitet kulturne baštine"]
      },
      correct: 2,
      explanation: { en: "Linearity 'borrows' from the future and leaves the cleanup cost.", sr: "Linearnost 'pozajmljuje' od budućnosti i ostavlja trošak čišćenja." }
    },
    {
      id: 'l_m_69',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'downstream' impact?", sr: "Šta je 'nizvodni' (downstream) uticaj?" },
      options: {
        en: ["Post sale product impact", "Internal company office cost", "Commercial deep sea fishing", "Initial raw extraction impact"],
        sr: ["Uticaj proizvoda posle prodaje", "Interni kancelarijski trošak kompanije", "Komercijalni dubokomorski ribolov", "Početni uticaj sirove ekstrakcije"]
      },
      correct: 0,
      explanation: { en: "Linear companies often ignore what happens downstream.", sr: "Linearne kompanije često ignorišu šta se dešava 'nizvodno' (posle prodaje)." }
    },
    {
      id: 'l_m_70',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'material intensity'?", sr: "Šta je 'materijalni intenzitet'?" },
      options: {
        en: ["Overall material surface hardness", "Total physical substance density", "Material needed per dollar", "Extremely strong industrial materials"],
        sr: ["Opšta površinska tvrdoća materijala", "Ukupna gustina fizičke supstance", "Materijal potreban po dolaru", "Izuzetno jaki industrijski materijali"]
      },
      correct: 2,
      explanation: { en: "Linearity usually requires high material intensity.", sr: "Linearnost obično zahteva veliki materijalni intenzitet." }
    },

    // HARD (71-80)
    {
      id: 'l_h_71',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "Explain the concept of 'externalities' in linear pollution.", sr: "Objasnite koncept eksternalija u kontekstu zagađenja u linearnom modelu." },
      options: {
        en: ["Market price production costs", "International product export duties", "Internal company operational costs", "Standard municipal cleaning fees"],
        sr: ["Tržišna cena troškova proizvodnje", "Međunarodne izvozne dažbine proizvoda", "Interni operativni troškovi kompanije", "Standardne opštinske naknade čišćenja"]
      },
      correct: 0,
      explanation: { en: "Society pays for health and environmental damage, not the buyer or seller.", sr: "Društvo plaća za štetu po zdravlje i okolinu, a ne kupac ili prodavac." }
    },
    {
      id: 'l_h_72',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "What is the 'Jevons Paradox'?", sr: "Šta je 'Dževonsov paradoks' (Jevons Paradox)?" },
      options: {
        en: ["Economic growth is infinite", "Efficiency lowers total use", "Efficiency increases total use", "Recycling is totally impossible"],
        sr: ["Ekonomski rast je beskonačan", "Efikasnost smanjuje ukupnu upotrebu", "Efikasnost povećava ukupnu upotrebu", "Reciklaža je potpuno nemoguća"]
      },
      correct: 2,
      explanation: { en: "In linear systems, tech progress often speeds up resource depletion.", sr: "U linearnim sistemima, tehnički napredak često ubrzava iscrpljivanje resursa." }
    },
    {
      id: 'l_h_73',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "What is 'thermodynamic irreversible loss'?", sr: "Šta je 'termodinamički nepovratni gubitak'?" },
      options: {
        en: ["Total internal battery discharge", "Irrecoverable material resource dispersion", "Waste heat industrial byproduct", "Sustainable industrial energy saving"],
        sr: ["Potpuno unutrašnje pražnjenje baterije", "Nepovratna disperzija materijalnih resursa", "Otpadna toplota industrijski nusproizvod", "Održiva industrijska ušteda energije"]
      },
      correct: 1,
      explanation: { en: "Mixing metals in electronics often leads to irreversible losses.", sr: "Mešanje metala u elektronici često vodi do nepovratnih gubitaka." }
    },
    {
      id: 'l_h_74',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "What is 'resource decoupling'?", sr: "Šta je 'razdvajanje resursa' (resource decoupling)?" },
      options: {
        en: ["Active splitting industrial materials", "Advanced plastic recycling systems", "Decoupling GDP material growth", "Quitting all mining activities"],
        sr: ["Aktivno cepanje industrijskih materijala", "Napredni sistemi recikliranja plastike", "Razdvajanje BDP materijal rasta", "Prekid svih rudarskih aktivnosti"]
      },
      correct: 2,
      explanation: { en: "Linearity makes absolute decoupling extremely difficult.", sr: "Linearnost čini apsolutno razdvajanje (decoupling) ekstremno teškim." }
    },
    {
      id: 'l_h_75',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "What is the 'linear subsidy' from nature?", sr: "Šta je 'linearna subvencija' od prirode?" },
      options: {
        en: ["Unpaid ecological service resources", "Standard internal company taxes", "Major government financial grants", "Private non profit charity"],
        sr: ["Neplaćeni resursi ekoloških usluga", "Standardni interni porezi kompanije", "Glavni državni finansijski grantovi", "Privatna neprofitna dobrotvorna organizacija"]
      },
      correct: 0,
      explanation: { en: "Linear profits often rely on not paying the true cost of natural capital.", sr: "Linearni profiti se često oslanjaju na neplaćanje stvarne cene prirodnog kapitala." }
    },
    {
      id: 'l_h_76',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "What is 'path dependency' in linear systems?", sr: "Šta je 'zavisnost od puta' (path dependency) u linearnim sistemima?" },
      options: {
        en: ["Global industrial supply routes", "Advanced GPS tracking systems", "Large scale road construction", "Past decisions block change"],
        sr: ["Globalne industrijske rute snabdevanja", "Napredni sistemi GPS praćenja", "Izgradnja puteva velikih razmera", "Prošle odluke blokiraju promene"]
      },
      correct: 3,
      explanation: { en: "Massive investment in linear infra makes switching to circular slow.", sr: "Ogromna investicija u linearnu infrastrukturu usporava prelazak na cirkularnu." }
    },
    {
      id: 'l_h_77',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "What is 'toxic lock-in'?", sr: "Šta je 'toksična zarobljenost' (toxic lock-in)?" },
      options: {
        en: ["Acute industrial chemical poisoning", "Harmful additives prevent recycling", "Being stuck inside labs", "Large chemical storage facility"],
        sr: ["Akutno industrijsko hemijsko trovanje", "Štetni aditivi sprečavaju reciklažu", "Biti zaglavljen unutar laboratorija", "Veliko postrojenje skladištenja hemikalija"]
      },
      correct: 1,
      explanation: { en: "Design choices from decades ago still prevent recycling today.", sr: "Dizajnerski izbori od pre nekoliko decenija i danas sprečavaju reciklažu." }
    },
    {
      id: 'l_h_78',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "What is the 'Tragedy of the Commons' in linearity?", sr: "Šta je 'tragedija zajedničkog dobra' u linearnosti?" },
      options: {
        en: ["Poor global population segments", "General industrial environmental pollution", "Selfish shared resource extraction", "Lack of public parks"],
        sr: ["Siromašni segmenti svetske populacije", "Opšte industrijsko zagađenje okoline", "Sebična ekstrakcija zajedničkih resursa", "Nedostatak javnih gradskih parkova"]
      },
      correct: 2,
      explanation: { en: "Linearity encourages taking as much as possible before others do.", sr: "Linearnost podstiče uzimanje što je više moguće pre nego što drugi to urade." }
    },
    {
      id: 'l_h_79',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "What is 'planned systemic failure'?", sr: "Šta je 'planirani sistemski neuspeh'?" },
      options: {
        en: ["Dizajnirani neuspeh oporavka sistema", "Potpuni korporativni finansijski bankrot", "Jedna slučajna ljudska greška", "Nepredvidivo ekstremno loše vreme"],
        sr: ["Dizajnirani neuspeh oporavka sistema", "Potpuni korporativni finansijski bankrot", "Jedna slučajna ljudska greška", "Nepredvidivo ekstremno loše vreme"]
      },
      correct: 0,
      explanation: { en: "Linearity isn't broken; it's performing exactly as designed (to waste).", sr: "Linearnost nije pokvarena; ona radi tačno kako je dizajnirana (da traći)." }
    },
    {
      id: 'l_h_80',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "Explain 'embedded emissions' in global trade.", sr: "Objasnite 'ugrađene emisije' u globalnoj trgovini." },
      options: {
        en: ["Carbon sequestered in soil", "Car exhaust pipe emissions", "Cross border CO2 emissions", "Industrial chimney smoke clouds"],
        sr: ["Ugljenik skladišten u zemljištu", "Emisije izduvnih cevi automobila", "Prekogranične emisije CO2 gasova", "Oblaci dima industrijskih dimnjaka"]
      },
      correct: 2,
      explanation: { en: "Rich linear economies often export their carbon footprint.", sr: "Bogate linearne ekonomije često izvoze svoj ugljenični otisak." }
    },
];

export const rankedCircularQuizzes: RankedQuestion[] = [
  // EASY (1-40)
  {
    id: 'c_e_1',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What does the '3R' acronym stand for?", sr: "Šta znači skraćenica '3R'?" },
    options: {
      en: ["Refine Reform Rebuild", "Reduce Reuse Recycle", "Read Research Report", "Reset Replace Restore"],
      sr: ["Prečisti Reformiši Izgradi", "Smanji Koristi Recikliraj", "Čitaj Istraži Izvesti", "Resetuj Zameni Obnovi"]
    },
    correct: 1,
    explanation: { en: "The 3Rs are the foundation of waste hierarchy in circularity.", sr: "3R su osnova hijerarhije otpada u cirkularnosti." }
  },
  {
    id: 'c_e_2',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "Which resources are in focus on the Green board?", sr: "Koji resursi su u fokusu zelene table?" },
    options: {
      en: ["Renewable natural energy sources", "Critical rare earth metals", "Non renewable finite resources", "Polluting ancient fossil fuels"],
      sr: ["Obnovljivi prirodni izvori energije", "Kritični retki zemni metali", "Neobnovljivi konačni prirodni resursi", "Zagađujuća drevna fosilna goriva"]
    },
    correct: 0,
    explanation: { en: "Circular economy focuses on using renewable resources and keeping materials in use.", sr: "Cirkularna ekonomija se fokusira na korišćenje obnovljivih resursa i očuvanje materijala u upotrebi." }
  },
  {
    id: 'c_e_3',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'composting'?", sr: "Šta je 'kompostiranje'?" },
    options: {
      en: ["Industrial scale plastic recycling", "Incinerating used office paper", "Turning waste into soil", "Purifying urban drinking water"],
      sr: ["Industrijska reciklaža otpadne plastike", "Spaljivanje korišćenog kancelarijskog papira", "Pretvaranje otpada u zemljište", "Prečišćavanje gradske pijaće vode"]
    },
    correct: 2,
    explanation: { en: "Composting returns biological nutrients back to the soil.", sr: "Kompostiranje vraća biološke hranljive materije nazad u zemljište." }
  },
  {
    id: 'c_e_4',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What does 'closing the loop' mean?", sr: "Šta znači 'zatvaranje kruga'?" },
    options: {
      en: ["Reducing total industrial production", "Preventing material waste generation", "Locking main storage warehouse", "Ending current business operations"],
      sr: ["Smanjenje ukupne industrijske proizvodnje", "Sprečavanje stvaranja materijalnog otpada", "Zaključavanje glavnog skladišnog magacina", "Zatvaranje trenutnih poslovnih operacija"]
    },
    correct: 1,
    explanation: { en: "Closing the loop means returning materials back into the production cycle.", sr: "Zatvaranje kruga znači vraćanje materijala nazad u proizvodni ciklus." }
  },
  {
    id: 'c_e_5',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'reuse'?", sr: "Šta je 'ponovna upotreba'?" },
    options: {
      en: ["Throwing item away forever", "Melting down used materials", "Using item original purpose", "Burning item energy recovery"],
      sr: ["Bacanje predmeta zauvek daleko", "Topljenje svih korišćenih materijala", "Korišćenje predmeta originalnu svrhu", "Spaljivanje predmeta energiju oporavka"]
    },
    correct: 2,
    explanation: { en: "Reuse keeps products at their highest value without processing.", sr: "Ponovna upotreba čuva proizvode u njihovoj najvišoj vrednosti bez obrade." }
  },
  {
    id: 'c_e_6',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'repair'?", sr: "Šta je 'popravka'?" },
    options: {
      en: ["Buying brand new item", "Fixing product extending life", "Discarding all used items", "Recycling individual component parts"],
      sr: ["Kupovina potpuno novog predmeta", "Popravka proizvoda produženje života", "Odbacivanje svih korišćenih predmeta", "Recikliranje pojedinačnih komponentnih delova"]
    },
    correct: 1,
    explanation: { en: "Repairing products avoids the need for new material extraction.", sr: "Popravka proizvoda izbegava potrebu za vađenjem novih materijala." }
  },
  {
    id: 'c_e_7',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is the 'Sharing Economy'?", sr: "Šta je 'Ekonomija deljenja'?" },
    options: {
      en: ["Selling mass produced products", "Collective product user access", "Giving away personal money", "Opening new commercial bank"],
      sr: ["Prodaja masovno proizvedenih proizvoda", "Kolektivni pristup korisnika proizvodu", "Poklanjanje ličnog novca drugima", "Otvaranje nove komercijalne banke"]
    },
    correct: 1,
    explanation: { en: "Sharing models increase the utilization rate of individual products.", sr: "Modeli deljenja povećavaju stopu korišćenja pojedinačnih proizvoda." }
  },
  {
    id: 'c_e_8',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'refurbishment'?", sr: "Šta je 'obnova' (refurbishment)?" },
    options: {
      en: ["Extracting raw brown coal", "Demolishing old city building", "Restoring product working order", "Creating more industrial waste"],
      sr: ["Ekstrakcija sirovog braon uglja", "Rušenje stare gradske zgrade", "Obnova ispravnog stanja proizvoda", "Stvaranje još industrijskog otpada"]
    },
    correct: 2,
    explanation: { en: "Refurbished products are cleaned and repaired for resale.", sr: "Obnovljeni proizvodi se čiste i popravljaju za dalju prodaju." }
  },
  {
    id: 'c_e_9',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'remanufacturing'?", sr: "Šta je 'ponovna proizvodnja' (remanufacturing)?" },
    options: {
      en: ["Creating handmade local crafts", "Recycling used plastic bottles", "Building completely from scratch", "Industrial scale product restoration"],
      sr: ["Stvaranje ručno rađenih zanata", "Reciklaža korišćenih plastičnih flaša", "Izgradnja potpuno od nule", "Industrijska obnova proizvoda razmera"]
    },
    correct: 3,
    explanation: { en: "Remanufacturing uses original parts to build a high-quality product.", sr: "Ponovna proizvodnja koristi originalne delove za izradu visokokvalitetnog proizvoda." }
  },
  {
    id: 'c_e_10',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'upcycling'?", sr: "Šta je 'upcycling'?" },
    options: {
      en: ["Recycling lower quality items", "Creative high value reuse", "Buying many more things", "Driving heavy bike uphill"],
      sr: ["Reciklaža predmeta nižeg kvaliteta", "Kreativna ponovna upotreba vrednosti", "Kupovina mnogo više stvari", "Vožnja teškog bicikla uzbrdo"]
    },
    correct: 1,
    explanation: { en: "Upcycling adds aesthetic or functional value to discarded items.", sr: "Upcycling dodaje estetsku ili funkcionalnu vrednost odbačenim predmetima." }
  },  {
    id: 'c_e_11',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'design for longevity'?", sr: "Šta je 'dizajn za dugovečnost'?" },
    options: {
      en: ["Designing longest lasting products", "Promoting short term fashion", "Making items break quickly", "Default single use design"],
      sr: ["Dizajniranje najdugotrajnijih mogućih proizvoda", "Promovisanje kratkoročne moderne mode", "Pravljenje predmeta brzim kvarom", "Standardni jednokratni upotrebni dizajn"]
    },
    correct: 0,
    explanation: { en: "Durability is a key principle of circular design.", sr: "Trajnost je ključni princip cirkularnog dizajna." }
  },
  {
    id: 'c_e_12',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'modular design'?", sr: "Šta je 'modularni dizajn'?" },
    options: {
      en: ["Secret proprietary industrial design", "Easily replaceable component parts", "Extremely complex manual assembly", "Single solid material block"],
      sr: ["Tajni vlasnički industrijski dizajn", "Lako zamenljivi komponentni delovi", "Izuzetno složeno ručno sklapanje", "Jedan čvrsti materijalni blok"]
    },
    correct: 1,
    explanation: { en: "Modular products are easier to repair and upgrade.", sr: "Modularni proizvodi se lakše popravljaju i nadograđuju." }
  },
  {
    id: 'c_e_13',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'Product-as-a-Service'?", sr: "Šta je 'Proizvod kao usluga'?" },
    options: {
      en: ["Selling single physical product", "Giving away free products", "Renting product versus buying", "Basic technical customer support"],
      sr: ["Prodaja jednog fizičkog proizvoda", "Davanje besplatnih promotivnih proizvoda", "Iznajmljivanje proizvoda umesto kupovine", "Osnovna tehnička korisnička podrška"]
    },
    correct: 2,
    explanation: { en: "Users pay for the function of the product, not ownership.", sr: "Korisnici plaćaju za funkciju proizvoda, a ne za vlasništvo." }
  },
  {
    id: 'c_e_14',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'circular sourcing'?", sr: "Šta je 'cirkularna nabavka'?" },
    options: {
      en: ["Managing global transport logistics", "Sourcing recycled renewable materials", "Buying only new materials", "Using secret industrial suppliers"],
      sr: ["Upravljanje globalnom transportnom logistikom", "Nabavka recikliranih obnovljivih materijala", "Kupovina isključivo novih materijala", "Korišćenje tajnih industrijskih dobavljača"]
    },
    correct: 1,
    explanation: { en: "Circular sourcing reduces the demand for virgin raw materials.", sr: "Cirkularna nabavka smanjuje potražnju za novim sirovinama." }
  },
  {
    id: 'c_e_15',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'renewable energy'?", sr: "Šta je 'obnovljiva energija'?" },
    options: {
      en: ["Solar wind hydro energy", "Extracted natural gas fuel", "Single nuclear energy source", "Polluting coal and oil"],
      sr: ["Sunce vetar hidro energija", "Ekstrahovano prirodno gasno gorivo", "Jedan nuklearni izvor energije", "Zagađujući ugalj i nafta"]
    },
    correct: 0,
    explanation: { en: "Renewable energy powers circular production cycles sustainably.", sr: "Obnovljiva energija napaja cirkularne proizvodne cikluse na održiv način." }
  },
  {
    id: 'c_e_16',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'industrial symbiosis'?", sr: "Šta je 'industrijska simbioza'?" },
    options: {
      en: ["Advanced internal biological research", "High competition between firms", "Waste becomes another's resource", "Large corporate firms merger"],
      sr: ["Napredno interno biološko istraživanje", "Velika konkurencija između firmi", "Otpad postaje tuđi resurs", "Spajanje velikih korporativnih firmi"]
    },
    correct: 2,
    explanation: { en: "Industrial symbiosis mimics natural ecosystems in business.", sr: "Industrijska simbioza imitira prirodne ekosisteme u biznisu." }
  },
  {
    id: 'c_e_17',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'closed-loop recycling'?", sr: "Šta je 'reciklaža zatvorenog kruga'?" },
    options: {
      en: ["High temperature waste incineration", "Same product loop recycling", "Lowering quality downcycling process", "Single cycle material recycling"],
      sr: ["Spaljivanje otpada visokoj temperaturi", "Reciklaža petlje istog proizvoda", "Smanjenje kvaliteta procesom downcycling", "Jednokratna reciklaža materijalnog ciklusa"]
    },
    correct: 1,
    explanation: { en: "Closed-loop keeps material quality high for the same application.", sr: "Zatvoreni krug čuva kvalitet materijala za istu primenu." }
  },
  {
    id: 'c_e_18',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What are 'biological nutrients'?", sr: "Šta su 'biološki nutrijenti'?" },
    options: {
      en: ["Nature returning organic materials", "Essential human health vitamins", "Synthetic plastic metal components", "Harmful industrial toxic chemicals"],
      sr: ["Organski materijali povratka prirodi", "Esencijalni vitamini ljudskog zdravlja", "Sintetičke plastične metalne komponente", "Štetne industrijske toksične hemikalije"]
    },
    correct: 0,
    explanation: { en: "Biological nutrients safely biodegrade and enrich ecosystems.", sr: "Biološki nutrijenti se bezbedno razlažu i obogaćuju ekosisteme." }
  },
  {
    id: 'c_e_19',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What are 'technical nutrients'?", sr: "Šta su 'tehnički nutrijenti'?" },
    options: {
      en: ["High voltage industrial electricity", "Recoverable man made materials", "Basic food water resources", "Digital computer system software"],
      sr: ["Visokonaponska industrijska električna struja", "Oporavljivi ljudski stvoreni materijali", "Osnovni resursi hrane vode", "Digitalni softver kompjuterskog sistema"]
    },
    correct: 1,
    explanation: { en: "Technical nutrients should circulate in industrial loops without degradation.", sr: "Tehnički nutrijenti treba da cirkulišu u industrijskim krugovima bez degradacije." }
  },
  {
    id: 'c_e_20',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'zero waste'?", sr: "Šta je 'nula otpada' (zero waste)?" },
    options: {
      en: ["Designing material reuse systems", "Misleading circular marketing slogan", "Total physical goods destruction", "Producing small trash amounts"],
      sr: ["Dizajniranje sistema ponovne upotrebe", "Obmanjujući cirkularni marketinški slogan", "Potpuno fizičko uništenje robe", "Proizvodnja male količine smeća"]
    },
    correct: 0,
    explanation: { en: "Zero waste aims to eliminate the concept of waste entirely.", sr: "Nula otpada teži da potpuno eliminiše koncept otpada." }
  },
  {
    id: 'c_e_21',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'circular fashion'?", sr: "Šta je 'cirkularna moda'?" },
    options: {
      en: ["Expensive luxury brands", "Circular textile design", "Fast fashion model", "Wearing circle clothes"],
      sr: ["Skupi luksuzni brendovi", "Cirkularni dizajn tekstila", "Model brze mode", "Nošenje kružne odeće"]
    },
    correct: 1,
    explanation: { en: "Circular fashion tackles the waste crisis in the textile industry.", sr: "Cirkularna moda rešava krizu otpada u tekstilnoj industriji." }
  },
  {
    id: 'c_e_22',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'regenerative agriculture'?", sr: "Šta je 'regenerativna poljoprivreda'?" },
    options: {
      en: ["Industrial monoculture", "Standard chemical farming", "Restorative soil farming", "Advanced indoor farming"],
      sr: ["Industrijska monokultura", "Standardna hemijska polja", "Obnova zdravlja zemljišta", "Napredni uzgoj unutra"]
    },
    correct: 2,
    explanation: { en: "Regenerative farming fixes carbon and improves water cycles.", sr: "Regenerativna poljoprivreda vezuje ugljenik i poboljšava vodene cikluse." }
  },
  {
    id: 'c_e_23',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is a 'resource loop'?", sr: "Šta je 'resursna petlja'?" },
    options: {
      en: ["Continuous flow loop", "Common rope knot", "Economic dead end", "Map drawing circle"],
      sr: ["Kontinuirani tok u krugu", "Obični čvor na konopcu", "Ekonomska slepa ulica", "Krug nacrtan na mapi"]
    },
    correct: 0,
    explanation: { en: "Resource loops prevent material leakage from the economy.", sr: "Resursne petlje sprečavaju curenje materijala iz ekonomije." }
  },
  {
    id: 'c_e_24',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'circular procurement'?", sr: "Šta je 'cirkularna javna nabavka'?" },
    options: {
      en: ["Buying bulk goods units", "Using circular criteria sets", "Selecting cheapest option available", "Purchasing from single individual"],
      sr: ["Grupna kupovina robe jedinica", "Cirkularni kriterijumi nabavke set", "Izbor najjeftinije opcije dostupno", "Kupovina od jedne osobe"]
    },
    correct: 1,
    explanation: { en: "Procurement can drive market demand for circular products.", sr: "Nabavka može podstaći tržišnu potražnju za cirkularnim proizvodima." }
  },
  {
    id: 'c_e_25',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'bio-based material'?", sr: "Šta je 'bio-materijal'?" },
    options: {
      en: ["Bio based materials", "Recyclable steel", "Oil based plastic", "Recyclable glass"],
      sr: ["Bio bazirani materijali", "Reciklažni čelik", "Plastika od nafte", "Reciklažno staklo"]
    },
    correct: 0,
    explanation: { en: "Bio-based materials are part of the biological cycle.", sr: "Bio-materijali su deo biološkog ciklusa." }
  },
  {
    id: 'c_e_26',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'dematerialization'?", sr: "Šta je 'dematerijalizacija'?" },
    options: {
      en: ["Using less material", "Illusionary magic trick", "Deleting digital files", "Losing valuable resources"],
      sr: ["Korišćenje manje materijala", "Iluzionistički mađioničarski trik", "Brisanje digitalnih fajlova", "Gubitak vrednih resursa"]
    },
    correct: 0,
    explanation: { en: "Digital services often achieve dematerialization (e.g., streaming vs CDs).", sr: "Digitalne usluge često postižu dematerijalizaciju (npr. striming umesto CD-ova)." }
  },
  {
    id: 'c_e_27',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'urban mining'?", sr: "Šta je 'urbano rudarenje'?" },
    options: {
      en: ["Standard city planning", "Recovering raw materials", "Digging under cities", "Building urban subways"],
      sr: ["Standardno planiranje grada", "Oporavak sirovih materijala", "Kopanje ispod gradova", "Gradnja gradskog metroa"]
    },
    correct: 1,
    explanation: { en: "Electronic waste is a major source for urban mining.", sr: "Elektronski otpad je glavni izvor za urbano rudarenje." }
  },
  {
    id: 'c_e_28',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'circular electronics'?", sr: "Šta je 'cirkularna elektronika'?" },
    options: {
      en: ["Damaged broken smartphones", "Repairable circular devices", "Obsolete old televisions", "Spherical round computers"],
      sr: ["Oštećeni polomljeni smartfoni", "Popravljivi cirkularni uređaji", "Zastareli stari televizori", "Sferični okrugli kompjuteri"]
    },
    correct: 1,
    explanation: { en: "Circular electronics reduce e-waste and material scarcity.", sr: "Cirkularna elektronika smanjuje e-otpad i oskudicu materijala." }
  },
  {
    id: 'c_e_29',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'cascading' use?", sr: "Šta je 'kaskadna' upotreba?" },
    options: {
      en: ["Sequential material reuse", "Single use once", "Water for waterfalls", "Continuous infinite use"],
      sr: ["Sekvencijalna ponovna upotreba", "Jednokratna upotreba jednom", "Voda za vodopade", "Kontinuirana beskonačna upotreba"]
    },
    correct: 0,
    explanation: { en: "Example: High-quality wood -> furniture -> chipboard -> energy.", sr: "Primer: Kvalitetno drvo -> nameštaj -> iverica -> energija." }
  },
  {
    id: 'c_e_30',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'design for disassembly'?", sr: "Šta je 'dizajn za rasklapanje'?" },
    options: {
      en: ["Gluing parts together", "Easy disassembly process", "Destroying old things", "Secret assembly methods"],
      sr: ["Lepljenje delova zajedno", "Laki proces rasklapanja", "Uništavanje starih stvari", "Tajne metode sklapanja"]
    },
    correct: 1,
    explanation: { en: "Fasteners like screws are better than glues for disassembly.", sr: "Spone poput šrafova su bolje od lepkova za rasklapanje." }
  },
  {
    id: 'c_e_31',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'eco-design'?", sr: "Šta je 'eko-dizajn'?" },
    options: {
      en: ["Purely aesthetic design", "Cheap industrial design", "Impact reduction design", "Green colored products"],
      sr: ["Čisto estetski dizajn", "Jeftin industrijski dizajn", "Dizajn smanjenja uticaja", "Zeleno obojeni proizvodi"]
    },
    correct: 2,
    explanation: { en: "Eco-design considers everything from raw materials to end-of-life.", sr: "Eko-dizajn razmatra sve, od sirovina do kraja životnog veka." }
  },
  {
    id: 'c_e_32',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is a 'circular city'?", sr: "Šta je 'cirkularni grad'?" },
    options: {
      en: ["Advanced high tech city", "Circular shaped city", "Waste free resource city", "Highly crowded city"],
      sr: ["Visokotehnološki grad", "Okrugli oblik grada", "Grad bez otpada", "Veoma prenaseljen grad"]
    },
    correct: 2,
    explanation: { en: "Circular cities focus on food, mobility, and construction loops.", sr: "Cirkularni gradovi se fokusiraju na hranu, mobilnost i građevinske petlje." }
  },
  {
    id: 'c_e_33',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'material value retention'?", sr: "Šta je 'očuvanje vrednosti materijala'?" },
    options: {
      en: ["Saving financial money", "Storing gold reserves", "Keeping materials in use", "Selling at high prices"],
      sr: ["Štednja novčanog iznosa", "Čuvanje zlatnih rezervi", "Zadržavanje materijala", "Prodaja po visokoj ceni"]
    },
    correct: 2,
    explanation: { en: "Circularity aims to keep material value from leaking out.", sr: "Cirkularnost teži da spreči curenje vrednosti materijala." }
  },
  {
    id: 'c_e_34',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'biological cycle'?", sr: "Šta je 'biološki ciklus'?" },
    options: {
      en: ["Animal life cycle", "Manufacturing loop", "Organic return cycle", "Financial cycle"],
      sr: ["Životni ciklus životinje", "Proizvodna petlja", "Ciklus povratka organskog", "Finansijski ciklus"]
    },
    correct: 2,
    explanation: { en: "Biological materials should safely return to the biosphere.", sr: "Biološki materijali treba bezbedno da se vrate u biosferu." }
  },
  {
    id: 'c_e_35',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'technical cycle'?", sr: "Šta je 'tehnički ciklus'?" },
    options: {
      en: ["Standard software update", "Metal bicycle vehicle", "Technical material reuse", "Large construction site"],
      sr: ["Standardno ažuriranje softvera", "Metalno biciklističko vozilo", "Tehnička ponovna upotreba", "Veliko aktivno gradilište"]
    },
    correct: 2,
    explanation: { en: "Technical materials circulate in industrial loops without degrading.", sr: "Tehnički materijali cirkulišu u industrijskim krugovima bez degradacije." }
  },
  {
    id: 'c_e_36',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'systemic thinking'?", sr: "Šta je 'sistemsko razmišljanje'?" },
    options: {
      en: ["System interaction focus", "Standard linear logic", "Isolated component focus", "Rapid decision making"],
      sr: ["Fokus na interakcije", "Standardna linearna logika", "Fokus na jednu komponentu", "Brzo donošenje odluka"]
    },
    correct: 0,
    explanation: { en: "Circularity requires understanding the whole supply chain.", sr: "Cirkularnost zahteva razumevanje celog lanca snabdevanja." }
  },
  {
    id: 'c_e_37',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'renewable material'?", sr: "Šta je 'obnovljiv materijal'?" },
    options: {
      en: ["Bio based fibers", "Synthetic plastic", "Recyclable steel", "Recyclable aluminum"],
      sr: ["Bio bazirana vlakna", "Sintetička plastika", "Reciklažni čelik", "Reciklažni aluminijum"]
    },
    correct: 0,
    explanation: { en: "Renewable materials grow back naturally if managed well.", sr: "Obnovljivi materijali ponovo rastu prirodno ako se njima dobro upravlja." }
  },
  {
    id: 'c_e_38',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'take-back' scheme?", sr: "Šta je 'program preuzimanja' (take-back)?" },
    options: {
      en: ["Corporate bankruptcy", "Company collection scheme", "Theft of products", "Returning a gift"],
      sr: ["Korporativni bankrot", "Šema sakupljanja", "Krađa proizvoda", "Vraćanje poklona"]
    },
    correct: 1,
    explanation: { en: "Take-back ensures materials stay in the technical cycle.", sr: "Preuzimanje obezbeđuje da materijali ostanu u tehničkom ciklusu." }
  },
  {
    id: 'c_e_39',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'waste hierarchy'?", sr: "Šta je 'hijerarhija otpada'?" },
    options: {
      en: ["Waste priority order", "Standard pile of trash", "Local government office", "Basic recycling rules"],
      sr: ["Prioritetni red otpada", "Standardna gomila smeća", "Lokalna državna kancelarija", "Osnovna pravila reciklaže"]
    },
    correct: 0,
    explanation: { en: "The hierarchy prioritizes preventing waste over managing it.", sr: "Hijerarhija daje prioritet sprečavanju nastanka otpada u odnosu na upravljanje njime." }
  },
  {
    id: 'c_e_40',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is the ultimate goal of the circular economy?", sr: "Šta je krajnji cilj cirkularne ekonomije?" },
    options: {
      en: ["Global universal wealth", "Infinite economic growth", "Waste free planet balance", "Perfect system efficiency"],
      sr: ["Globalno univerzalno blago", "Beskonačan ekonomski rast", "Svet bez otpada i balans", "Savršena sistemska efikasnost"]
    },
    correct: 2,
    explanation: { en: "A circular economy aims for long-term survival within planetary boundaries.", sr: "Cirkularna ekonomija teži dugoročnom opstanku u okviru granica planete." }
  },
  // MEDIUM (41-70)
  {
    id: 'c_m_41',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is the 'Butterfly Diagram'?", sr: "Šta je 'Leptir dijagram' (Butterfly Diagram)?" },
    options: {
      en: ["Trade route map", "Circular flow visual", "Species growth chart", "Weather forecast tool"],
      sr: ["Mapa trgovine", "Prikaz tokova kruga", "Grafikon rasta vrsta", "Vremenska prognoza"]
    },
    correct: 1,
    explanation: { en: "Developed by Ellen MacArthur Foundation, it separates technical and biological cycles.", sr: "Razvijen od strane Ellen MacArthur Fondacije, on razdvaja tehničke i biološke cikluse." }
  },
  {
    id: 'c_m_42',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'Cradle to Cradle' (C2C)?", sr: "Šta je 'Cradle to Cradle' (C2C)?" },
    options: {
      en: ["C2C design framework", "Linear production line", "Standard baby store", "Waste management plan"],
      sr: ["C2C okvir za dizajn", "Linearna proizvodna traka", "Obična prodavnica za bebe", "Plan upravljanja otpada"]
    },
    correct: 0,
    explanation: { en: "C2C eliminates the concept of waste by design.", sr: "C2C eliminiše koncept otpada kroz dizajn." }
  },
  {
    id: 'c_m_43',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'Extended Producer Responsibility' (EPR)?", sr: "Šta je 'Proširena odgovornost proizvođača' (EPR)?" },
    options: {
      en: ["Express shipping speed", "Full life cycle responsibility", "Increasing worker pay", "Market expansion goals"],
      sr: ["Ekspresna brzina dostave", "Odgovornost celog ciklusa", "Povećanje plata radnika", "Ciljevi širenja tržišta"]
    },
    correct: 1,
    explanation: { en: "EPR incentivizes producers to design for recyclability and repair.", sr: "EPR podstiče proizvođače da dizajniraju za reciklažu i popravku." }
  },
  {
    id: 'c_m_44',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'reverse logistics'?", sr: "Šta je 'povratna logistika' (reverse logistics)?" },
    options: {
      en: ["Driving vehicle backward", "Standard inventory plan", "Goods recovery logistics", "International cargo ship"],
      sr: ["Vožnja vozila unazad", "Plan upravljanja zalihama", "Logistika oporavka robe", "Međunarodni teretni brod"]
    },
    correct: 2,
    explanation: { en: "Reverse logistics is essential for take-back and recycling systems.", sr: "Povratna logistika je neophodna za sisteme preuzimanja i reciklaže." }
  },
  {
    id: 'c_m_45',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'upcycling' vs 'recycling'?", sr: "Šta je 'upcycling' u odnosu na 'recikliranje'?" },
    options: {
      en: ["Upcycle vs Downcycle", "Processes are identical", "Recycling always superior", "Upcycling limited to art"],
      sr: ["Upcycle naspram Downcycle", "Procesi su identični", "Recikliranje uvek bolje", "Upcycling samo za umetnost"]
    },
    correct: 0,
    explanation: { en: "Upcycling creative reuse avoids destroying the material's structure.", sr: "Upcycling kreativna ponovna upotreba izbegava uništavanje strukture materijala." }
  },
  {
    id: 'c_m_46',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is the 'Performance Economy'?", sr: "Šta je 'Ekonomija performansi'?" },
    options: {
      en: ["Major sports economy", "Selling performance services", "GDP growth percentage", "Stock market performance"],
      sr: ["Ekonomija velikog sporta", "Prodaja usluga performansi", "BDP procenat rasta", "Berzanski učinak sistema"]
    },
    correct: 1,
    explanation: { en: "Walter Stahel's model focuses on loops and product-life extension.", sr: "Model Waltera Stahela fokusira se na petlje i produženje života proizvoda." }
  },
  {
    id: 'c_m_47',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'bio-mimicry' in design?", sr: "Šta je 'biomimikrija' u dizajnu?" },
    options: {
      en: ["Nature emulation strategy", "Exclusive use of wood", "Animal like product design", "General forest protection"],
      sr: ["Strategija oponašanja prirode", "Isključiva upotreba drveta", "Dizajn po ugledu na životinje", "Opšta zaštita šumskih zona"]
    },
    correct: 0,
    explanation: { en: "Nature has already solved many problems with zero waste.", sr: "Priroda je već rešila mnoge probleme sa nula otpada." }
  },
  {
    id: 'c_m_48',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'pre-consumer' vs 'post-consumer' waste?", sr: "Šta je 'pre-potrošački' u odnosu na 'post-potrošački' otpad?" },
    options: {
      en: ["Organic vs inorganic", "Factory vs home waste", "Kids vs adults waste", "Old vs new waste"],
      sr: ["Organski naspram neorganskog", "Fabrički naspram kućnog", "Dečiji naspram odraslih", "Stari naspram novog"]
    },
    correct: 1,
    explanation: { en: "Pre-consumer waste includes production scraps; post-consumer is discarded after use.", sr: "Pre-potrošački otpad uključuje ostatke iz proizvodnje; post-potrošački se odbacuje nakon upotrebe." }
  },
  {
    id: 'c_m_49',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is the 'R-ladder'?", sr: "Šta je 'R-lestvica'?" },
    options: {
      en: ["Global financial index", "Strategy impact rank", "Common painting tool", "Strategic career path"],
      sr: ["Globalni finansijski indeks", "Rang uticaja strategije", "Obični alat za krečenje", "Strateški razvoj karijere"]
    },
    correct: 1,
    explanation: { en: "Higher 'R' strategies (Refuse/Reduce) are more impactful than lower ones (Recycle).", sr: "Više 'R' strategije (Odbij/Smanji) su uticajnije od nižih (Recikliraj)." }
  },
  {
    id: 'c_m_50',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'circularity gap'?", sr: "Šta je 'cirkularni jaz' (circularity gap)?" },
    options: {
      en: ["Missing statistical data", "Circularity gap margin", "Physical product hole", "Structural bridge design"],
      sr: ["Nedostajući podaci u bazi", "Margina cirkularnog jaza", "Fizička rupa u robi", "Dizajn čvrstog mosta"]
    },
    correct: 1,
    explanation: { en: "Globally, only about 7-9% of materials are circular.", sr: "Globalno, samo oko 7-9% materijala je cirkularno." }
  },
  {
    id: 'c_m_51',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "How does the circular economy reduce business risk?", sr: "Kako cirkularna ekonomija smanjuje poslovni rizik?" },
    options: {
      en: ["Firing redundant staff", "Reducing price volatility", "Avoiding local taxes", "Ignoring legal laws"],
      sr: ["Otpuštanje viška radnika", "Smanjenje cenovne nestabilnosti", "Izbegavanje lokalnih poreza", "Ignorisanje zakonskih normi"]
    },
    correct: 1,
    explanation: { en: "Decoupling from virgin resources provides supply security.", sr: "Razdvajanje od novih resursa pruža sigurnost snabdevanja." }
  },
  {
    id: 'c_m_52',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'functional economy'?", sr: "Šta je 'funkcionalna ekonomija'?" },
    options: {
      en: ["Digital economy model", "Selling functions logic", "Working economy system", "Standard government plan"],
      sr: ["Model digitalne ekonomije", "Fokus na funkcije rada", "Sistem ekonomije rada", "Standardni vladin plan"]
    },
    correct: 1,
    explanation: { en: "Service-based models align producer and consumer interests in durability.", sr: "Modeli zasnovani na uslugama usklađuju interese proizvođača i potrošača u pogledu trajnosti." }
  },
  {
    id: 'c_m_53',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'downcycling' in the context of plastics?", sr: "Šta je 'downcycling' u kontekstu plastike?" },
    options: {
      en: ["Infinite recycling loop", "Burning waste plastic", "High to low grade shift", "Improved plastic quality"],
      sr: ["Beskonačna petlja reciklaže", "Spaljivanje otpadne plastike", "Prelazak sa visokog na nisko", "Poboljšani kvalitet plastike"]
    },
    correct: 2,
    explanation: { en: "Most plastic recycling results in lower-grade materials that can't be recycled again.", sr: "Većina reciklaže plastike rezultira materijalima nižeg kvaliteta koji se ne mogu ponovo reciklirati." }
  },
  {
    id: 'c_m_54',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'blue economy'?", sr: "Šta je 'plava ekonomija'?" },
    options: {
      en: ["Takmičarski vodeni sport", "Koncept Guntera Paulija", "Ekonomija baze okeana", "Napredno istraživanje neba"],
      sr: ["Takmičarski vodeni sport", "Koncept Guntera Paulija", "Ekonomija baze okeana", "Napredno istraživanje neba"]
    },
    correct: 1,
    explanation: { en: "Blue economy focuses on local resources and zero emissions.", sr: "Plava ekonomija se fokusira na lokalne resurse i nultu emisiju." }
  },
  {
    id: 'c_m_55',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What are 'circular indicators'?", sr: "Šta su 'cirkularni indikatori'?" },
    options: {
      en: ["Circularity metric data", "Moving clock hands", "Standard traffic lights", "Standard stock charts"],
      sr: ["Podaci metriker cirkularnosti", "Pokretne kazaljke na satu", "Standardni ulični semafori", "Standardni berzanski grafikoni"]
    },
    correct: 0,
    explanation: { en: "Indicators like Material Circularity Indicator (MCI) help track progress.", sr: "Indikatori poput MCI pomažu u praćenju napretka." }
  },
  {
    id: 'c_m_56',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'circular bio-economy'?", sr: "Šta je 'cirkularna bio-ekonomija'?" },
    options: {
      en: ["General forest protection", "Renewable bio loops", "Pure biological research", "Eating organic food"],
      sr: ["Opšta zaštita šumskih zona", "Obnovljive bio petlje", "Čisto biološko istraživanje", "Ishrana organskom hranom"]
    },
    correct: 1,
    explanation: { en: "It combines bioscience with circular principles.", sr: "Ona kombinuje bionauku sa cirkularnim principima." }
  },
  {
    id: 'c_m_57',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'resource productivity'?", sr: "Šta je 'produktivnost resursa'?" },
    options: {
      en: ["Value per material unit", "Total material production", "Standard mining speed", "Total system consumption"],
      sr: ["Vrednost po jedinici materije", "Ukupna proizvodna materijala", "Standardna brzina rudarenja", "Ukupna sistemska potrošnja"]
    },
    correct: 0,
    explanation: { en: "Circular economy aims to maximize resource productivity.", sr: "Cirkularna ekonomija teži maksimizaciji produktivnosti resursa." }
  },
  {
    id: 'c_m_58',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'design for repair'?", sr: "Šta je 'dizajn za popravku'?" },
    options: {
      en: ["Selling workshop tools", "Easy standard tool repair", "Broken look product design", "Advanced self healing tech"],
      sr: ["Prodaja alata", "Laka popravka alatima", "Dizajn pokvarenog izgleda", "Napredna tehnologija zaceljenja"]
    },
    correct: 1,
    explanation: { en: "Right to repair is a key consumer movement in circularity.", sr: "Pravo na popravku je ključni pokret potrošača u cirkularnosti." }
  },
  {
    id: 'c_m_59',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'open-loop' vs 'closed-loop' recycling?", sr: "Šta je 'otvoreni' naspram 'zatvorenog' kruga reciklaže?" },
    options: {
      en: ["Global vs local recycling", "Different vs same product", "Plastic vs metal recycling", "Circular loop size"],
      sr: ["Globalna naspram lokalne", "Drugi naspram istog proizvoda", "Plastika naspram metala", "Veličina cirkularne petlje"]
    },
    correct: 1,
    explanation: { en: "Closed-loop is generally better for material quality retention.", sr: "Zatvoreni krug je generalno bolji za očuvanje kvaliteta materijala." }
  },
  {
    id: 'c_m_60',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'waste-to-energy' position in circularity?", sr: "Koja je pozicija 'otpada u energiju' u cirkularnosti?" },
    options: {
      en: ["Core circular strategy", "Highest system priority", "Last resort recovery", "Illegal illegal action"],
      sr: ["Osnovna cirkularna strategija", "Najviši sistemski prioritet", "Poslednja opcija oporavka", "Ilegalna i zabranjena radnja"]
    },
    correct: 2,
    explanation: { en: "Incineration destroys materials; it is better than landfilling but worse than recycling.", sr: "Spaljivanje uništava materijale; bolje je od deponije, ali gore od reciklaže." }
  },
  {
    id: 'c_m_61',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'circular business model innovation'?", sr: "Šta je 'inovacija cirkularnog biznis modela'?" },
    options: {
      en: ["Operational value shift", "Increasing total sales", "Designing new logo", "Building company website"],
      sr: ["Promena vrednosti rada", "Povećanje ukupne prodaje", "Dizajniranje novog logotipa", "Izrada sajta kompanije"]
    },
    correct: 0,
    explanation: { en: "It involves shifting from selling ownership to selling access or results.", sr: "Ona uključuje prelazak sa prodaje vlasništva na prodaju pristupa ili rezultata." }
  },
  {
    id: 'c_m_62',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'regenerative design'?", sr: "Šta je 'regenerativni dizajn'?" },
    options: {
      en: ["Standard recycled design", "Old fashioned design", "Active improvement design", "Bright colorful design"],
      sr: ["Standardni reciklirani dizajn", "Staromodni stil dizajna", "Aktivni dizajn poboljšanja", "Svetli šareni dizajn"]
    },
    correct: 2,
    explanation: { en: "Regenerative design seeks to restore ecosystems.", sr: "Regenerativni dizajn teži obnavljanju ekosistema." }
  },
  {
    id: 'c_m_63',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'material efficiency'?", sr: "Šta je 'materijalna efikasnost'?" },
    options: {
      en: ["More service less mass", "Fast material recycling", "Heavy weight materials", "Rapid industrial production"],
      sr: ["Više usluge manje mase", "Brza reciklaža materijala", "Teški materijali mase", "Brza industrijska proizvodnja"]
    },
    correct: 0,
    explanation: { en: "Material efficiency reduces the overall footprint of the economy.", sr: "Materijalna efikasnost smanjuje ukupni otisak ekonomije." }
  },
  {
    id: 'c_m_64',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'circular construction'?", sr: "Šta je 'cirkularna gradnja'?" },
    options: {
      en: ["Rapid building construction", "Buildings as material banks", "Building round houses", "Exclusive concrete usage"],
      sr: ["Brza izgradnja objekata", "Zgrade kao banke materije", "Gradnja okruglih kuća", "Isključiva upotreba betona"]
    },
    correct: 1,
    explanation: { en: "Buildings are designed to be disassembled, not demolished.", sr: "Zgrade se dizajniraju tako da se mogu rastaviti, a ne srušiti." }
  },
  {
    id: 'c_m_65',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'biocyclic' industry?", sr: "Šta je 'biociklična' industrija?" },
    options: {
      en: ["Biological cycle industry", "Heavy chemical industry", "Standard bicycle industry", "Raw material mining"],
      sr: ["Industrija bioloških ciklusa", "Teška hemijska industrija", "Standardna bicikl industrija", "Rudarenje sirovih materijala"]
    },
    correct: 0,
    explanation: { en: "It aligns industrial processes with the biosphere.", sr: "Ona usklađuje industrijske procese sa biosferom." }
  },
  {
    id: 'c_m_66',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'resource resilience'?", sr: "Šta je 'resursna otpornost'?" },
    options: {
      en: ["Durable hard materials", "Infinite resource supply", "Supply maintenance ability", "Standard money saving"],
      sr: ["Trajni i jaki materijali", "Beskonačno snabdevanje", "Sposobnost održanja mreže", "Standardna štednja novca"]
    },
    correct: 2,
    explanation: { en: "Circular loops make businesses and cities more resilient.", sr: "Cirkularne petlje čine biznise i gradove otpornijim." }
  },
  {
    id: 'c_m_67',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'collaborative consumption'?", sr: "Šta je 'kolaborativna potrošnja'?" },
    options: {
      en: ["Shared group usage", "General global trade", "Eating meals together", "Buying goods together"],
      sr: ["Zajednička grupna upotreba", "Opšta globalna trgovina", "Zajednička ishrana obroka", "Zajednička kupovina robe"]
    },
    correct: 0,
    explanation: { en: "It is a key driver of the sharing economy.", sr: "Ona je ključni pokretač ekonomije deljenja." }
  },
  {
    id: 'c_m_68',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'nutrient recovery' from waste water?", sr: "Šta je 'oporavak nutrijenata' iz otpadnih voda?" },
    options: {
      en: ["Desalinizacija okeanske vode", "Oporavak đubriva iz vode", "Standardno čišćenje vode", "Takmičarski vodeni sportovi"],
      sr: ["Desalinizacija okeanske vode", "Oporavak đubriva iz vode", "Standardno čišćenje vode", "Takmičarski vodeni sportovi"]
    },
    correct: 1,
    explanation: { en: "Waste water is a source of valuable biological nutrients.", sr: "Otpadna voda je izvor vrednih bioloških nutrijenata." }
  },
  {
    id: 'c_m_69',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'closed-loop supply chain'?", sr: "Šta je 'lanac snabdevanja zatvorenog kruga'?" },
    options: {
      en: ["Short supply chain", "Logistics integration model", "Secret supply chain", "Local supply chain"],
      sr: ["Kratak lanac snabdevanja", "Model integracije logistike", "Tajni lanac snabdevanja", "Lokalni lanac snabdevanja"]
    },
    correct: 1,
    explanation: { en: "It manages the product flow in both directions.", sr: "On upravlja tokom proizvoda u oba smera." }
  },
  {
    id: 'c_m_70',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'material passport'?", sr: "Šta je 'materijalni pasoš'?" },
    options: {
      en: ["Standard travel document", "Personal identity card", "Digital material record", "Quality control stamp"],
      sr: ["Standardni putni dokument", "Lična karta pojedinca", "Digitalni zapis materije", "Pečat kontrole kvaliteta"]
    },
    correct: 2,
    explanation: { en: "Passports help identify and sort materials at the end of life.", sr: "Pasoši pomažu u identifikaciji i sortiranju materijala na kraju veka." }
  },

  // HARD (71-80)
  {
    id: 'c_h_71',
    category: 'circular',
    difficulty: 'hard',
    question: { en: "How does the 'Rebound Effect' threaten circular economy goals?", sr: "Kako 'Rebound efekat' ugrožava ciljeve cirkularne ekonomije?" },
    options: {
      en: ["Efficiency consumption gain", "Materials bouncing back", "Lowering product quality", "Acute technical failure"],
      sr: ["Dobitak u potrošnji", "Materijali koji se vraćaju", "Smanjenje kvaliteta robe", "Akutni tehnički neuspeh"]
    },
    correct: 0,
    explanation: { en: "If we make things 2x more circular but consume 3x more, the planet still suffers.", sr: "Ako stvari učinimo 2x cirkularnijim, a trošimo 3x više, planeta i dalje trpi." }
  },
  {
    id: 'c_h_72',
    category: 'circular',
    difficulty: 'hard',
    question: { en: "Explain 'thermodynamic limits' to recycling.", sr: "Objasnite 'termodinamička ograničenja' reciklaže." },
    options: {
      en: ["Lack of recycling machines", "Energy vs benefit ratio", "Recycling heat levels", "Material melting points"],
      sr: ["Manjak mašina za rad", "Odnos energije i koristi", "Nivoi toplote reciklaže", "Tačke topljenja materije"]
    },
    correct: 1,
    explanation: { en: "Entropy makes it impossible to recycle everything with 100% efficiency.", sr: "Entropija čini nemogućim recikliranje svega sa 100% efikasnošću." }
  },
  {
    id: 'c_h_73',
    category: 'circular',
    difficulty: 'hard',
    question: { en: "What is 'absolute' vs 'relative' decoupling?", sr: "Šta je 'apsolutno' naspram 'relativnog' razdvajanja (decoupling)?" },
    options: {
      en: ["Impact flat vs falling", "Good versus bad impact", "Fast versus slow growth", "Common math terms"],
      sr: ["Uticaj isti naspram pada", "Dobar naspram lošeg uticaja", "Brz naspram sporog rasta", "Obični matematički pojmovi"]
    },
    correct: 0,
    explanation: { en: "Absolute decoupling is the ultimate goal: economic growth with shrinking environmental impact.", sr: "Apsolutno razdvajanje je krajnji cilj: ekonomski rast uz smanjenje uticaja na okolinu." }
  },
  {
    id: 'c_h_74',
    category: 'circular',
    difficulty: 'hard',
    question: { en: "How do 'Digital Product Passports' (DPP) impact global trade?", sr: "Kako 'Digitalni pasoši proizvoda' (DPP) utiču na globalnu trgovinu?" },
    options: {
      en: ["Increasing trade taxes", "Transparent chain data", "Slowing trade speeds", "Replacing brand logos"],
      sr: ["Povećanje poreza trgovine", "Transparentni podaci lanca", "Usporavanje brzine trgovine", "Zamena logotipa brenda"]
    },
    correct: 1,
    explanation: { en: "DPPs enable better sorting and policy enforcement globally.", sr: "DPP-ovi omogućavaju bolje sortiranje i sprovođenje politika globalno." }
  },
  {
    id: 'c_h_75',
    category: 'circular',
    difficulty: 'hard',
    question: { en: "Explain the 'Slow, Narrow, Close' framework for loops.", sr: "Objasnite okvir 'Uspori, Suzi, Zatvori' (Slow, Narrow, Close) za petlje." },
    options: {
      en: ["Standard traffic rules", "Global financial models", "Longer less again logic", "Standard marketing tactics"],
      sr: ["Standardna saobraćajna pravila", "Globalni finansijski modeli", "Duže manje ponovo logika", "Standardne marketinške taktike"]
    },
    correct: 2,
    explanation: { en: "Slow (longevity), Narrow (efficiency), Close (recycling).", sr: "Uspori (dugovečnost), Suzi (efikasnost), Zatvori (reciklaža)." }
  },
  {
    id: 'c_h_76',
    category: 'circular',
    difficulty: 'hard',
    question: { en: "What is 'Circular Economy 2.0' focusing on?", sr: "Na šta se fokusira 'Cirkularna ekonomija 2.0'?" },
    options: {
      en: ["Modern digital marketing", "Regeneration and systemic social equity", "Increased recycling rates", "Improved machine tech"],
      sr: ["Moderni digitalni marketing", "Regeneracija i sistemska socijalna pravda", "Povećane stope reciklaže", "Poboljšana tehnologija mašina"]
    },
    correct: 1,
    explanation: { en: "2.0 goes beyond material efficiency to restore nature and society.", sr: "2.0 ide dalje od materijalne efikasnosti ka obnovi prirode i društva." }
  },
  {
    id: 'c_h_77',
    category: 'circular',
    difficulty: 'hard',
    question: { en: "What is the role of 'Tax Shifting' in circularity?", sr: "Koja je uloga 'pomeranja poreza' (tax shifting) u cirkularnosti?" },
    options: {
      en: ["Resource vs labor taxing", "Higher income tax levels", "Lowering all system taxes", "Standard sales tax model"],
      sr: ["Porez na resurse naspram rada", "Veći nivoi poreza na prihod", "Smanjenje svih poreza sistema", "Standardni model poreza promet"]
    },
    correct: 0,
    explanation: { en: "Taxing resources makes virgin materials expensive and human labor (repair) cheaper.", sr: "Oporezivanje resursa čini nove materijale skupim, a ljudski rad (popravku) jeftinijim." }
  },
  {
    id: 'c_h_78',
    category: 'circular',
    difficulty: 'hard',
    question: { en: "Explain the concept of 'Enabling Technologies' in circularity.", sr: "Objasnite koncept 'Omogućavajućih tehnologija' u cirkularnosti." },
    options: {
      en: ["Faster transport trucks", "AI IoT Blockchain tech", "General social media", "Improved display screens"],
      sr: ["Brži transportni kamioni", "AI IoT Blockchain tehnika", "Opšte društvene mreže", "Poboljšani ekrani prikaza"]
    },
    correct: 1,
    explanation: { en: "Tech like IoT allows for real-time monitoring of product health and usage.", sr: "Tehnologije poput IoT-a omogućavaju praćenje stanja i korišćenja proizvoda u realnom vremenu." }
  },
  {
    id: 'c_h_79',
    category: 'circular',
    difficulty: 'hard',
    question: { en: "What is 'Circular Risk' in financial reporting?", sr: "Šta je 'cirkularni rizik' u finansijskom izveštavanju?" },
    options: {
      en: ["Moving in circular paths", "Local inflation rates", "Linear obsolescence risk", "Bad corporate credit"],
      sr: ["Kretanje u krugu putanja", "Lokalne stope inflacije", "Rizik linearne zastarelosti", "Loš korporativni kredit"]
    },
    correct: 2,
    explanation: { en: "Stranded assets include mines or factories that become unusable due to policy changes.", sr: "Zarobljena imovina uključuje rudnike ili fabrike koje postaju neupotrebljive zbog promene politike." }
  },
  {
    id: 'c_h_80',
    category: 'circular',
    difficulty: 'hard',
    question: { en: "What is 'Bioregionalism' in circular economy?", sr: "Šta je 'bioregionalizam' u cirkularnoj ekonomiji?" },
    options: {
      en: ["Global export shipping routes", "Local regional economic loops", "Moving to remote countryside", "Exclusive plant based diet"],
      sr: ["Globalne rute izvoza robe", "Lokalne regionalne ekonomske petlje", "Selidba u daleka sela", "Isključivo biljna ishrana ljudi"]
    },
    correct: 1,
    explanation: { en: "Bioregionalism promotes local resilience and reduces transport impact.", sr: "Bioregionalizam promoviše lokalnu otpornost i smanjuje uticaj transporta." }
  }
];

// SWOT Scenariji (40 total: 10 S, 10 W, 10 O, 10 T)
export const swotScenarios: SwotScenario[] = [
  {
    id: 'swot_1',
    scenario: { en: "Your supplier introduced 100% recycled packaging without increasing the price.", sr: "Vaš dobavljač je uveo 100% recikliranu ambalažu bez povećanja cene." },
    category: 'O',
    explanation: { en: "This is an external positive factor that you can exploit.", sr: "Ovo je eksterni pozitivni faktor koji možete iskoristiti." }
  },
  {
    id: 'swot_2',
    scenario: { en: "The state introduces a new CO2 emission tax for your factory.", sr: "Država uvodi novi porez na emisiju CO2 za vašu fabriku." },
    category: 'T',
    explanation: { en: "This is an external negative factor that poses a risk.", sr: "Ovo je eksterni negativni faktor koji predstavlja rizik." }
  },
  {
    id: 'swot_3',
    scenario: { en: "Your R&D team developed a new patent for energy-efficient production.", sr: "Vaš R&D tim je razvio novi patent za energetski efikasnu proizvodnju." },
    category: 'S',
    explanation: { en: "Internal strength based on innovation and intellectual property.", sr: "Interna snaga zasnovana na inovaciji i intelektualnoj svojini." }
  },
  {
    id: 'swot_4',
    scenario: { en: "High employee turnover is affecting your production consistency.", sr: "Velika fluktuacija zaposlenih utiče na konzistentnost vaše proizvodnje." },
    category: 'W',
    explanation: { en: "Internal weakness related to human resources.", sr: "Interna slabost vezana za ljudske resurse." }
  },
  {
    id: 'swot_5',
    scenario: { en: "A new market opens up in a country with strict green energy laws.", sr: "Otvara se novo tržište u zemlji sa strogim zakonima o zelenoj energiji." },
    category: 'O',
    explanation: { en: "External opportunity for expansion into eco-conscious markets.", sr: "Eksterna prilika za širenje na ekološki svesna tržišta." }
  },
  {
    id: 'swot_6',
    scenario: { en: "Raw material prices have doubled due to a global supply chain crisis.", sr: "Cene sirovina su se udvostručile zbog globalne krize lanca snabdevanja." },
    category: 'T',
    explanation: { en: "External threat affecting your cost structure.", sr: "Eksterna pretnja koja utiče na strukturu troškova." }
  },
  {
    id: 'swot_7',
    scenario: { en: "Your brand is ranked #1 in consumer trust for sustainability.", sr: "Vaš brend je na prvom mestu po poverenju potrošača u održivost." },
    category: 'S',
    explanation: { en: "Internal strength related to brand reputation.", sr: "Interna snaga vezana za reputaciju brenda." }
  },
  {
    id: 'swot_8',
    scenario: { en: "Your current factory machinery is outdated and consumes too much power.", sr: "Vaše trenutne fabričke mašine su zastarele i troše previše struje." },
    category: 'W',
    explanation: { en: "Internal weakness in physical infrastructure.", sr: "Interna slabost u fizičkoj infrastrukturi." }
  },
  {
    id: 'swot_9',
    scenario: { en: "Government subsidies for circular business models are announced.", sr: "Najavljene su državne subvencije za cirkularne biznis modele." },
    category: 'O',
    explanation: { en: "External opportunity through financial incentives.", sr: "Eksterna prilika kroz finansijske podsticaje." }
  },
  {
    id: 'swot_10',
    scenario: { en: "A competitor launches a cheaper, non-recyclable alternative to your product.", sr: "Konkurent lansira jeftiniju alternativu vašem proizvodu koja se ne može reciklirati." },
    category: 'T',
    explanation: { en: "External threat from price-based competition.", sr: "Eksterna pretnja od konkurencije zasnovane na ceni." }
  },
  {
    id: 'swot_11',
    scenario: { en: "You have a strong partnership with local waste management facilities.", sr: "Imate snažno partnerstvo sa lokalnim centrima za upravljanje otpadom." },
    category: 'S',
    explanation: { en: "Internal strength through strategic local partnerships.", sr: "Interna snaga kroz strateška lokalna partnerstva." }
  },
  {
    id: 'swot_12',
    scenario: { en: "Your digital sales platform has high latency and poor user experience.", sr: "Vaša platforma za digitalnu prodaju ima veliki zastoj i loše korisničko iskustvo." },
    category: 'W',
    explanation: { en: "Internal weakness in digital infrastructure.", sr: "Interna slabost u digitalnoj infrastrukturi." }
  },
  {
    id: 'swot_13',
    scenario: { en: "Emerging tech allows for easier sorting of mixed textile waste.", sr: "Nova tehnologija omogućava lakše sortiranje mešanog tekstilnog otpada." },
    category: 'O',
    explanation: { en: "External opportunity from technological advancements.", sr: "Eksterna prilika kroz tehnološki napredak." }
  },
  {
    id: 'swot_14',
    scenario: { en: "Changing import regulations make it harder to source rare earth metals.", sr: "Promena uvoznih propisa otežava nabavku retkih metala." },
    category: 'T',
    explanation: { en: "External threat from regulatory changes.", sr: "Eksterna pretnja kroz regulatorne promene." }
  },
  {
    id: 'swot_15',
    scenario: { en: "Your company has significant cash reserves for new green investments.", sr: "Vaša kompanija ima značajne gotovinske rezerve za nove zelene investicije." },
    category: 'S',
    explanation: { en: "Internal strength in financial liquidity.", sr: "Interna snaga u finansijskoj likvidnosti." }
  },
  {
    id: 'swot_16',
    scenario: { en: "The company lacks a clear roadmap for transitioning to circularity.", sr: "Kompaniji nedostaje jasan plan za prelazak na cirkularnost." },
    category: 'W',
    explanation: { en: "Internal weakness in strategic planning.", sr: "Interna slabost u strateškom planiranju." }
  },
  {
    id: 'swot_17',
    scenario: { en: "Rising consumer awareness increases demand for 'Product-as-a-Service'.", sr: "Rastuća svest potrošača povećava potražnju za 'Proizvodom kao uslugom'." },
    category: 'O',
    explanation: { en: "External opportunity from shifting consumer trends.", sr: "Eksterna prilika kroz promenu trendova potrošača." }
  },
  {
    id: 'swot_18',
    scenario: { en: "New environmental lawsuits are filed against your industry sector.", sr: "Pokrenute su nove ekološke tužbe protiv vašeg industrijskog sektora." },
    category: 'T',
    explanation: { en: "External threat from legal risks.", sr: "Eksterna pretnja kroz pravne rizike." }
  },
  {
    id: 'swot_19',
    scenario: { en: "Your logistics network is optimized for zero-emission delivery.", sr: "Vaša logistička mreža je optimizovana za dostavu bez emisija." },
    category: 'S',
    explanation: { en: "Internal strength in sustainable distribution.", sr: "Interna snaga u održivoj distribuciji." }
  },
  {
    id: 'swot_20',
    scenario: { en: "Dependency on a single supplier for a critical component.", sr: "Zavisnost od jednog dobavljača za kritičnu komponentu." },
    category: 'W',
    explanation: { en: "Internal weakness in supply chain resilience.", sr: "Interna slabost u otpornosti lanca snabdevanja." }
  },
  {
    id: 'swot_21',
    scenario: { en: "A global initiative for plastic neutrality gaines massive funding.", sr: "Globalna inicijativa za neutralnost plastike dobija ogromna sredstva." },
    category: 'O',
    explanation: { en: "External opportunity through global funding and collaboration.", sr: "Eksterna prilika kroz globalno finansiranje i saradnju." }
  },
  {
    id: 'swot_22',
    scenario: { en: "Political instability in the region of your main production plant.", sr: "Politička nestabilnost u regionu gde se nalazi vaš glavni pogon." },
    category: 'T',
    explanation: { en: "External threat from geopolitical instability.", sr: "Eksterna pretnja kroz geopolitičku nestabilnost." }
  },
  {
    id: 'swot_23',
    scenario: { en: "Internal culture is highly aligned with sustainability goals.", sr: "Interna kultura je visoko usklađena sa ciljevima održivosti." },
    category: 'S',
    explanation: { en: "Internal strength in organizational alignment.", sr: "Interna snaga kroz organizacionu usklađenost." }
  },
  {
    id: 'swot_24',
    scenario: { en: "High cost of capital makes new green projects difficult to fund.", sr: "Visoka cena kapitala otežava finansiranje novih zelenih projekata." },
    category: 'W',
    explanation: { en: "Internal/Financial weakness in project funding.", sr: "Interna/finansijska slabost u finansiranju projekata." }
  },
  {
    id: 'swot_25',
    scenario: { en: "Competitor bankruptcy allows you to acquire green patents cheaply.", sr: "Bankrot konkurenta vam omogućava da jeftino kupite zelene patente." },
    category: 'O',
    explanation: { en: "External opportunity through market consolidation.", sr: "Eksterna prilika kroz konsolidaciju tržišta." }
  },
  {
    id: 'swot_26',
    scenario: { en: "Sudden change in consumer behavior towards extreme frugality.", sr: "Nagla promena u ponašanju potrošača ka ekstremnoj štedljivosti." },
    category: 'T',
    explanation: { en: "External threat from reduced consumer spending.", sr: "Eksterna pretnja kroz smanjenu potrošnju." }
  },
  {
    id: 'swot_27',
    scenario: { en: "You have exclusive access to a new bio-based polymer.", sr: "Imate ekskluzivan pristup novom bio-polimeru." },
    category: 'S',
    explanation: { en: "Internal strength through exclusive resource access.", sr: "Interna snaga kroz ekskluzivan pristup resursima." }
  },
  {
    id: 'swot_28',
    scenario: { en: "Lack of digital tracking for material flows in your factory.", sr: "Nedostatak digitalnog praćenja tokova materijala u fabrici." },
    category: 'W',
    explanation: { en: "Internal weakness in data and transparency.", sr: "Interna slabost u podacima i transparentnosti." }
  },
  {
    id: 'swot_29',
    scenario: { en: "New EU regulations mandate 30% recycled content in all products.", sr: "Novi propisi EU nalažu 30% recikliranog sadržaja u svim proizvodima." },
    category: 'O',
    explanation: { en: "External opportunity for companies already using recycled materials.", sr: "Eksterna prilika za kompanije koje već koriste reciklirane materijale." }
  },
  {
    id: 'swot_30',
    scenario: { en: "Severe drought affects the water supply for your cooling systems.", sr: "Ozbiljna suša utiče na snabdevanje vodom za vaše sisteme hlađenja." },
    category: 'T',
    explanation: { en: "External threat from climate-related resource scarcity.", sr: "Eksterna pretnja kroz oskudicu resursa uzrokovanu klimom." }
  },
  {
    id: 'swot_31',
    scenario: { en: "Highly skilled engineering team specialized in circular design.", sr: "Visoko stručan inženjerski tim specijalizovan za cirkularni dizajn." },
    category: 'S',
    explanation: { en: "Internal strength in specialized human capital.", sr: "Interna snaga kroz specijalizovan ljudski kapital." }
  },
  {
    id: 'swot_32',
    scenario: { en: "Complex product architecture makes disassembly difficult.", sr: "Složena arhitektura proizvoda otežava rasklapanje." },
    category: 'W',
    explanation: { en: "Internal weakness in product design.", sr: "Interna slabost u dizajnu proizvoda." }
  },
  {
    id: 'swot_33',
    scenario: { en: "Collaboration with a major university on carbon capture tech.", sr: "Saradnja sa velikim univerzitetom na tehnologiji hvatanja ugljenika." },
    category: 'O',
    explanation: { en: "External opportunity through academic partnership.", sr: "Eksterna prilika kroz akademsko partnerstvo." }
  },
  {
    id: 'swot_34',
    scenario: { en: "Public protest against your new production site location.", sr: "Javni protest protiv lokacije vašeg novog proizvodnog pogona." },
    category: 'T',
    explanation: { en: "External threat from social opposition.", sr: "Eksterna pretnja kroz društveno protivljenje." }
  },
  {
    id: 'swot_35',
    scenario: { en: "Vertical integration allows control over the entire supply chain.", sr: "Vertikalna integracija omogućava kontrolu nad celim lancem snabdevanja." },
    category: 'S',
    explanation: { en: "Internal strength in supply chain control.", sr: "Interna snaga kroz kontrolu lanca snabdevanja." }
  },
  {
    id: 'swot_36',
    scenario: { en: "Marketing department lacks experience in communicating green values.", sr: "Marketing odeljenju nedostaje iskustvo u komunikaciji zelenih vrednosti." },
    category: 'W',
    explanation: { en: "Internal weakness in communication skills.", sr: "Interna slabost u komunikacionim veštinama." }
  },
  {
    id: 'swot_37',
    scenario: { en: "Tax breaks for companies achieving 50% carbon reduction.", sr: "Poreske olakšice za kompanije koje ostvare 50% smanjenja ugljenika." },
    category: 'O',
    explanation: { en: "External opportunity through fiscal policy.", sr: "Eksterna prilika kroz fiskalnu politiku." }
  },
  {
    id: 'swot_38',
    scenario: { en: "New synthetic material from competitors renders your bio-material obsolete.", sr: "Novi sintetički materijal konkurencije čini vaš bio-materijal zastarelim." },
    category: 'T',
    explanation: { en: "External threat from technological substitution.", sr: "Eksterna pretnja kroz tehnološku supstituciju." }
  },
  {
    id: 'swot_39',
    scenario: { en: "Large database of consumer usage patterns for product optimization.", sr: "Velika baza podataka o obrascima korišćenja za optimizaciju proizvoda." },
    category: 'S',
    explanation: { en: "Internal strength in data assets.", sr: "Interna snaga u podacima." }
  },
  {
    id: 'swot_40',
    scenario: { en: "Inability to secure insurance for projects in high-risk climate zones.", sr: "Nemogućnost dobijanja osiguranja za projekte u klimatski rizičnim zonama." },
    category: 'T',
    explanation: { en: "External threat from financial services withdrawal.", sr: "Eksterna pretnja kroz povlačenje finansijskih usluga." }
  }
];