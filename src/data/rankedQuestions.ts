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
      en: ["Circular economy", "Linear economy", "Sustainable economy", "Green economy"],
      sr: ["Cirkularna ekonomija", "Linearna ekonomija", "Održiva ekonomija", "Zelena ekonomija"]
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
      en: ["Long-term stability", "Linear growth", "Resource conservation", "Social equity"],
      sr: ["Dugoročna stabilnost", "Linearni rast", "Očuvanje resursa", "Socijalna pravda"]
    },
    correct: 1,
    explanation: { en: "Linear models prioritize immediate growth over long-term sustainability.", sr: "Linearni modeli daju prioritet trenutnom rastu u odnosu na dugoročnu održivost." }
  },
  {
    id: 'l_e_3',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What happens to most products in a linear economy after use?", sr: "Šta se dešava sa većinom proizvoda u linearnoj ekonomiji nakon upotrebe?" },
    options: {
      en: ["They are recycled", "They become waste", "They are remanufactured", "They are composted"],
      sr: ["Recikliraju se", "Postaju otpad", "Ponovo se proizvode", "Kompostiraju se"]
    },
    correct: 1,
    explanation: { en: "In linear models, products are typically discarded after their first use.", sr: "U linearnim modelima, proizvodi se obično odbacuju nakon prve upotrebe." }
  },
  {
    id: 'l_e_4',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "Which resource type is heavily exploited in linear models?", sr: "Koji tip resursa se intenzivno eksploatiše u linearnim modelima?" },
    options: {
      en: ["Renewable", "Finite/Non-renewable", "Atmospheric", "Intangible"],
      sr: ["Obnovljivi", "Konačni/Neobnovljivi", "Atmosferski", "Nematerijalni"]
    },
    correct: 1,
    explanation: { en: "Linear economy relies on the constant extraction of finite natural resources.", sr: "Linearna ekonomija se oslanja na stalnu eksploataciju konačnih prirodnih resursa." }
  },
  {
    id: 'l_e_5',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is 'planned obsolescence'?", sr: "Šta je 'planirano zastarevanje'?" },
    options: {
      en: ["Making products last longer", "Designing products to break or become obsolete", "Recycling old electronics", "Upgrading software regularly"],
      sr: ["Pravljenje dugovečnijih proizvoda", "Dizajniranje proizvoda da se pokvare ili zastare", "Recikliranje stare elektronike", "Redovno ažuriranje softvera"]
    },
    correct: 1,
    explanation: { en: "Planned obsolescence encourages frequent replacement of goods.", sr: "Planirano zastarevanje podstiče čestu zamenu robe." }
  },
  {
    id: 'l_e_6',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "Where does most linear waste end up?", sr: "Gde završava većina linearnog otpada?" },
    options: {
      en: ["Back in production", "Landfills or incineration", "Community gardens", "Digital storage"],
      sr: ["Nazad u proizvodnji", "Deponije ili spaljivanje", "Zajedničke bašte", "Digitalno skladište"]
    },
    correct: 1,
    explanation: { en: "Linear waste management focuses on disposal rather than recovery.", sr: "Linearno upravljanje otpadom fokusira se na odlaganje umesto na oporavak." }
  },
  {
    id: 'l_e_7',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the main driver of cost in a linear model?", sr: "Šta je glavni pokretač troškova u linearnom modelu?" },
    options: {
      en: ["Recycling logistics", "Raw material extraction", "Ecosystem restoration", "Circular design"],
      sr: ["Logistika reciklaže", "Ekstrakcija sirovina", "Obnova ekosistema", "Cirkularni dizajn"]
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
      en: ["Sharing economy", "High volume, low durability", "Subscription models", "Repair and reuse"],
      sr: ["Ekonomija deljenja", "Veliki obim, niska trajnost", "Modeli pretplate", "Popravka i ponovna upotreba"]
    },
    correct: 1,
    explanation: { en: "Linear consumption encourages 'buying more' rather than 'using better'.", sr: "Linearna potrošnja podstiče 'kupovinu više' umesto 'boljeg korišćenja'." }
  },
  {
    id: 'l_e_9',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is a major environmental impact of linear production?", sr: "Koji je glavni uticaj linearne proizvodnje na životnu sredinu?" },
    options: {
      en: ["Biodiversity increase", "Pollution and resource depletion", "Carbon sequestration", "Water purification"],
      sr: ["Povećanje biodiverziteta", "Zagađenje i iscrpljivanje resursa", "Skladištenje ugljenika", "Prečišćavanje vode"]
    },
    correct: 1,
    explanation: { en: "The linear model causes significant damage to ecosystems through waste and emissions.", sr: "Linearni model uzrokuje značajnu štetu ekosistemima kroz otpad i emisije." }
  },
  {
    id: 'l_e_10',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "Why is 'single-use' plastic linear?", sr: "Zašto je 'jednokratna' plastika linearna?" },
    options: {
      en: ["It lasts forever", "It is designed to be thrown away after one use", "It is made of plants", "It is expensive"],
      sr: ["Traje zauvek", "Dizajnirana je da se baci nakon jedne upotrebe", "Napravljena je od biljaka", "Skupa je"]
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
      en: ["Upgrading a product", "Recycling into lower quality material", "Producing more with less", "Ending production"],
      sr: ["Unapređenje proizvoda", "Recikliranje u materijal nižeg kvaliteta", "Proizvodnja više sa manje", "Prekid proizvodnje"]
    },
    correct: 1,
    explanation: { en: "Downcycling is often the limit of recycling in linear systems.", sr: "Downcycling je često granica reciklaže u linearnim sistemima." }
  },
  {
    id: 'l_e_12',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the 'throwaway culture'?", sr: "Šta je 'kultura bacanja'?" },
    options: {
      en: ["A culture of saving", "Consumer focus on disposable products", "Art made from trash", "Zero-waste lifestyle"],
      sr: ["Kultura štednje", "Fokus potrošača na jednokratne proizvode", "Umetnost od smeća", "Lifestyle bez otpada"]
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
      en: ["Internal profit", "Unintended side effect affecting others", "Marketing strategy", "Legal contract"],
      sr: ["Interni profit", "Nenamerni sporedni efekat koji utiče na druge", "Marketinška strategija", "Pravni ugovor"]
    },
    correct: 1,
    explanation: { en: "Linear models often 'externalize' environmental costs to society.", sr: "Linearni modeli često 'eksternalizuju' ekološke troškove društvu." }
  },
  {
    id: 'l_e_14',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "How does linear economy view natural capital?", sr: "Kako linearna ekonomija posmatra prirodni kapital?" },
    options: {
      en: ["As a sacred asset", "As an infinite source of raw materials", "As a liability", "As a service provider"],
      sr: ["Kao svetinju", "Kao beskonačan izvor sirovina", "Kao obavezu", "Kao pružaoca usluga"]
    },
    correct: 1,
    explanation: { en: "Linear models often assume resources are always available and cheap.", sr: "Linearni modeli često pretpostavljaju da su resursi uvek dostupni i jeftini." }
  },
  {
    id: 'l_e_15',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the main risk of resource scarcity?", sr: "Šta je glavni rizik oskudice resursa?" },
    options: {
      en: ["Lower prices", "Supply chain disruption", "Faster production", "Better quality"],
      sr: ["Niže cene", "Prekid lanca snabdevanja", "Brža proizvodnja", "Bolji kvalitet"]
    },
    correct: 1,
    explanation: { en: "Relying on finite resources makes linear businesses vulnerable to scarcity.", sr: "Oslanjanje na konačne resurse čini linearne poslove ranjivim na oskudicu." }
  },
  {
    id: 'l_e_16',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is 'fast fashion'?", sr: "Šta je 'brza moda'?" },
    options: {
      en: ["Slowly made durable clothes", "Cheap, trendy clothes made quickly", "Handmade traditional wear", "Recycled textile brand"],
      sr: ["Sporo pravljena trajna odeća", "Jeftina, moderna odeća pravljena brzo", "Ručno rađena tradicionalna odeća", "Brend recikliranog tekstila"]
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
      en: ["Solar", "Coal", "Wind", "Geothermal"],
      sr: ["Solarna", "Ugalj", "Vatrena", "Geotermalna"]
    },
    correct: 1,
    explanation: { en: "Fossil fuels are extracted, burned (used), and emitted (wasted).", sr: "Fosilna goriva se vade, sagorevaju (koriste) i emituju (otpad)." }
  },
  {
    id: 'l_e_18',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What does 'virgin material' refer to?", sr: "Na šta se odnosi 'devizni/novi materijal' (virgin material)?" },
    options: {
      en: ["Recycled material", "Material extracted from nature for the first time", "Organic material", "Plastic"],
      sr: ["Reciklirani materijal", "Materijal izvučen iz prirode po prvi put", "Organski materijal", "Plastika"]
    },
    correct: 1,
    explanation: { en: "Linear economy depends heavily on virgin materials.", sr: "Linearna ekonomija u velikoj meri zavisi od novih (virgin) materijala." }
  },
  {
    id: 'l_e_19',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the goal of a landfill?", sr: "Šta je cilj deponije?" },
    options: {
      en: ["To store materials for future use", "To isolate and bury waste", "To generate biodiversity", "To clean the air"],
      sr: ["Skladištenje materijala za budućnost", "Izolacija i zakopavanje otpada", "Generisanje biodiverziteta", "Prečišćavanje vazduha"]
    },
    correct: 1,
    explanation: { en: "Landfills are the final stage of the linear 'dispose' phase.", sr: "Deponije su završna faza linearnog 'odlaganja'." }
  },
  {
    id: 'l_e_20',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "How does linear design affect repairability?", sr: "Kako linearni dizajn utiče na mogućnost popravke?" },
    options: {
      en: ["Makes it easier", "Often makes it impossible or too expensive", "Encourages DIY culture", "Requires simple tools"],
      sr: ["Olakšava je", "Često je čini nemogućom ili preskupom", "Podstiče DIY kulturu", "Zahteva jednostavne alate"]
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
      en: ["Email spam", "Discarded electronic devices", "Electric car fuel", "Digital currency"],
      sr: ["Email spam", "Odbačeni elektronski uređaji", "Gorivo za električne automobile", "Digitalna valuta"]
    },
    correct: 1,
    explanation: { en: "Electronics are a fast-growing category of linear waste.", sr: "Elektronika je brzorastuća kategorija linearnog otpada." }
  },
  {
    id: 'l_e_22',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is a 'linear supply chain'?", sr: "Šta je 'linearni lanac snabdevanja'?" },
    options: {
      en: ["A loop", "A one-way flow of materials", "A network of recyclers", "A community market"],
      sr: ["Petlja", "Jednosmerni tok materijala", "Mreža reciklera", "Lokalna pijaca"]
    },
    correct: 1,
    explanation: { en: "Linear supply chains move from extraction to disposal without returning.", sr: "Linearni lanci snabdevanja se kreću od ekstrakcije do odlaganja bez povratka." }
  },
  {
    id: 'l_e_23',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the impact of toxic additives in products?", sr: "Kakav je uticaj toksičnih aditiva u proizvodima?" },
    options: {
      en: ["They help recycling", "They prevent material recovery", "They make products smell good", "They reduce weight"],
      sr: ["Pomažu reciklaži", "Sprečavaju oporavak materijala", "Čine da proizvodi mirišu", "Smanjuju težinu"]
    },
    correct: 1,
    explanation: { en: "Toxic additives make it dangerous to recycle linear materials.", sr: "Toksični aditivi čine recikliranje linearnih materijala opasnim." }
  },
  {
    id: 'l_e_24',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is 'take-back' usually NOT in linear systems?", sr: "Šta 'preuzimanje' (take-back) obično NIJE u linearnim sistemima?" },
    options: {
      en: ["A marketing stunt", "A way to truly recover all materials", "A rare occurrence", "A cost for the brand"],
      sr: ["Marketinški trik", "Način da se zaista vrate svi materijali", "Retka pojava", "Trošak za brend"]
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
      en: ["As a resource", "As an end-of-pipe problem", "As an investment", "As energy"],
      sr: ["Kao resurs", "Kao problem na kraju cevi", "Kao investiciju", "Kao energiju"]
    },
    correct: 1,
    explanation: { en: "Waste is seen as something to be managed, not avoided or reused.", sr: "Otpad se posmatra kao nešto čime treba upravljati, a ne izbegavati ili ponovo koristiti." }
  },
  {
    id: 'l_e_26',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the 'linear mindset'?", sr: "Šta je 'linearni način razmišljanja'?" },
    options: {
      en: ["Holistic thinking", "Focusing on isolated parts of the process", "Loop-based logic", "Systemic awareness"],
      sr: ["Holističko razmišljanje", "Fokusiranje na izolovane delove procesa", "Logika zasnovana na petljama", "Sistemska svest"]
    },
    correct: 1,
    explanation: { en: "Linear thinking ignores the systemic consequences of extraction and waste.", sr: "Linearno razmišljanje ignoriše sistemske posledice ekstrakcije i otpada." }
  },
  {
    id: 'l_e_27',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the primary motivation for linear businesses?", sr: "Šta je primarna motivacija za linearne biznise?" },
    options: {
      en: ["Ecological health", "Sales volume and quick turnover", "Product longevity", "Social welfare"],
      sr: ["Ekološko zdravlje", "Obim prodaje i brz obrt", "Dugovečnost proizvoda", "Socijalno blagostanje"]
    },
    correct: 1,
    explanation: { en: "Linear profits are often tied to selling more units as fast as possible.", sr: "Linearni profiti su često vezani za prodaju što više jedinica što je brže moguće." }
  },
  {
    id: 'l_e_28',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is 'incineration with energy recovery' in a linear context?", sr: "Šta je 'spaljivanje sa povratkom energije' u linearnom kontekstu?" },
    options: {
      en: ["The best possible solution", "A way to justify wasting high-value materials", "Circular economy", "Zero emissions"],
      sr: ["Najbolje moguće rešenje", "Način da se opravda traćenje vrednih materijala", "Cirkularna ekonomija", "Nulta emisija"]
    },
    correct: 1,
    explanation: { en: "Incineration destroys the material's structural value forever.", sr: "Spaljivanje zauvek uništava strukturnu vrednost materijala." }
  },
  {
    id: 'l_e_29',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "How does linear growth affect the planet's boundaries?", sr: "Kako linearni rast utiče na granice planete?" },
    options: {
      en: ["It stays within them", "It pushes past them (overshoot)", "It restores them", "It ignores them"],
      sr: ["Ostaje unutar njih", "Gura ih (premašuje - overshoot)", "Obnavlja ih", "Ignoriše ih"]
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
      en: ["Material saved", "Amount of material flowing through the system", "Recycling rate", "Durability score"],
      sr: ["Sačuvani materijal", "Količina materijala koja protiče kroz sistem", "Stopa reciklaže", "Ocena trajnosti"]
    },
    correct: 1,
    explanation: { en: "Linear systems aim for high throughput to drive GDP.", sr: "Linearni sistemi teže velikom protoku kako bi podstakli BDP." }
  },
  {
    id: 'l_e_31',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the 'rebound effect' in linear efficiency?", sr: "Šta je 'rebound efekat' u linearnoj efikasnosti?" },
    options: {
      en: ["Saving more", "Efficiency gains leading to more consumption", "Recycling more", "Higher quality"],
      sr: ["Veća štednja", "Dobici u efikasnosti koji vode većoj potrošnji", "Više reciklaže", "Bolji kvalitet"]
    },
    correct: 1,
    explanation: { en: "Making linear items cheaper often leads to people buying even more of them.", sr: "Činiti linearne predmete jeftinijim često vodi do toga da ih ljudi kupuju još više." }
  },
  {
    id: 'l_e_32',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "What is the typical lifespan of a linear smartphone?", sr: "Koliki je tipičan životni vek linearnog smartfona?" },
    options: {
      en: ["10-15 years", "2-3 years", "50 years", "Forever"],
      sr: ["10-15 godina", "2-3 godine", "50 godina", "Zauvek"]
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
      en: ["Parts are free", "Labor costs and lack of spare parts", "Products are too simple", "Repair is forbidden"],
      sr: ["Delovi su besplatni", "Troškovi rada i nedostatak rezervnih delova", "Proizvodi su previše jednostavni", "Popravka je zabranjena"]
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
      en: ["Cleaning parks", "Misleading claims about environmental benefits", "Planting trees", "Saving water"],
      sr: ["Čišćenje parkova", "Obmanjujuće tvrdnje o ekološkim prednostima", "Sređivanje drveća", "Štednja vode"]
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
      en: ["Enriches it naturally", "Depletes nutrients and relies on chemicals", "Creates forest", "Purifies groundwater"],
      sr: ["Prirodno ga obogaćuje", "Iscrpljuje hranljive materije i oslanja se na hemiju", "Stvara šumu", "Prečišćava podzemne vode"]
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
      en: ["Battery life", "Total energy used to make a product", "Energy used by the user", "Static electricity"],
      sr: ["Trajanje baterije", "Ukupna energija utrošena na pravljenje proizvoda", "Energija koju troši korisnik", "Statički elektricitet"]
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
      en: ["A tool", "Something intended to be used once and thrown away", "An heirloom", "A high-quality asset"],
      sr: ["Alat", "Nešto namenjeno jednoj upotrebi pa bacanju", "Porodično nasleđe", "Vredna imovina"]
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
      en: ["It grows", "It is lost (economic leak)", "It stays the same", "It is harvested"],
      sr: ["Raste", "Gubi se (ekonomsko curenje)", "Ostaje ista", "Skuplja se"]
    },
    correct: 1,
    explanation: { en: "Landfilling represents a total loss of economic value for that material.", sr: "Odlaganje na deponiju predstavlja potpuni gubitak ekonomske vrednosti tog materijala." }
  },
  {
    id: 'l_e_39',
    category: 'linear',
    difficulty: 'easy',
    question: { en: "Which packaging is most linear?", sr: "Koja ambalaža je najlinearnija?" },
    options: {
      en: ["Glass bottles for return", "Multi-layer non-recyclable sachets", "Paper bags", "Metal tins"],
      sr: ["Staklene flaše za povrat", "Višeslojne kesice koje se ne recikliraju", "Papirne kese", "Metalne kutije"]
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
        en: ["Universal wealth", "Waste and resource depletion", "Infinite growth", "Perfect efficiency"],
        sr: ["Univerzalno bogatstvo", "Otpad i iscrpljivanje resursa", "Beskonačan rast", "Savršena efikasnost"]
      },
      correct: 1,
      explanation: { en: "A linear system on a finite planet eventually runs out of inputs and overflows with waste.", sr: "Linearni sistem na konačnoj planeti na kraju ostaje bez ulaza i biva preplavljen otpadom." }
    },
    // MEDIUM (41-70)
    {
      id: 'l_m_41',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "How does over-exploitation affect raw material prices long-term?", sr: "Kako prekomerna eksploatacija utiče na dugoročnu cenu sirovina?" },
      options: {
        en: ["Prices decrease due to abundance", "Prices increase due to scarcity", "Prices stay constant", "Prices are eliminated"],
        sr: ["Cene opadaju zbog obilja", "Cene rastu zbog oskudice", "Cene ostaju konstantne", "Cene se ukidaju"]
      },
      correct: 1,
      explanation: { en: "As finite resources become harder to extract, their market price inevitably rises.", sr: "Kako konačni resursi postaju teži za eksploataciju, njihova tržišna cena neizbežno raste." }
    },
    {
      id: 'l_m_42',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'resource volatility'?", sr: "Šta je 'nestabilnost resursa' (resource volatility)?" },
      options: {
        en: ["Stable supply", "Unpredictable changes in resource availability and price", "A new recycling technology", "Government regulation"],
        sr: ["Stabilno snabdevanje", "Nepredvidive promene u dostupnosti i ceni resursa", "Nova tehnologija reciklaže", "Državna regulativa"]
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
        en: ["Being trapped in a recycling loop", "Infrastructure and habits that favor linear models", "A secure material storage", "A legal requirement to recycle"],
        sr: ["Biti zarobljen u petlji reciklaže", "Infrastruktura i navike koje favorizuju linearne modele", "Sigurno skladište materijala", "Zakonska obaveza recikliranja"]
      },
      correct: 1,
      explanation: { en: "Existing systems (like waste collection) are often built only for linear flows.", sr: "Postojeći sistemi (poput sakupljanja otpada) često su izgrađeni samo za linearne tokove." }
    },
    {
      id: 'l_m_44',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "How does the linear model contribute to climate change?", sr: "Kako linearni model doprinosi klimatskim promenama?" },
      options: {
        en: ["By cooling the planet", "Through high energy use in extraction and disposal", "By promoting electric cars", "Through reforestation"],
        sr: ["Hlađenjem planete", "Kroz veliku potrošnju energije u ekstrakciji i odlaganju", "Promovisanjem električnih automobila", "Kroz pošumljavanje"]
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
        en: ["Materials becoming more organized", "Materials becoming dispersed and hard to recover", "Energy becoming cheaper", "Infinite material life"],
        sr: ["Materijali postaju organizovaniji", "Materijali postaju raspršeni i teški za oporavak", "Energija postaje jeftinija", "Beskonačan život materijala"]
      },
      correct: 1,
      explanation: { en: "Mixing and polluting materials increases entropy, making recovery difficult.", sr: "Mešanje i zagađivanje materijala povećava entropiju, čineći oporavak težim." }
    },
    {
      id: 'l_m_46',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "Why is 'extended producer responsibility' (EPR) rare in linear models?", sr: "Zašto je 'proširena odgovornost proizvođača' (EPR) retka u linearnim modelima?" },
      options: {
        en: ["Producers want to be responsible", "Producers stop caring once the product is sold", "It is too cheap", "Consumers refuse it"],
        sr: ["Proizvođači žele da budu odgovorni", "Proizvođače prestaje da bude briga čim se proizvod proda", "Previše je jeftino", "Potrošači to odbijaju"]
      },
      correct: 1,
      explanation: { en: "Linearity separates the 'selling' phase from the 'disposal' phase responsibility.", sr: "Linearnost odvaja fazu 'prodaje' od odgovornosti za fazu 'odlaganja'." }
    },
    {
      id: 'l_m_47',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is the impact of 'perceived obsolescence'?", sr: "Kakav je uticaj 'percipiranog zastarevanja'?" },
      options: {
        en: ["Actual technical failure", "Believing a product is outdated even if it works", "Better software", "Lower emissions"],
        sr: ["Stvarni tehnički kvar", "Uverenje da je proizvod zastareo iako još radi", "Bolji softver", "Niže emisije"]
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
        en: ["Simplifies them", "Creates long, fragile chains dependent on extraction sites", "Makes them local", "Increases transparency"],
        sr: ["Pojednostavljuje ih", "Stvara duge, krhke lance zavisne od mesta ekstrakcije", "Čini ih lokalnim", "Povećava transparentnost"]
      },
      correct: 1,
      explanation: { en: "Linearity forces businesses to source materials from across the globe.", sr: "Linearnost primorava biznise da nabavljaju materijale širom sveta." }
    },
    {
      id: 'l_m_49',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'externalizing' environmental costs?", sr: "Šta je 'eksternalizacija' ekoloških troškova?" },
      options: {
        en: ["Paying for cleanup", "Letting society and nature pay for the damage", "Investing in green tech", "Reducing waste"],
        sr: ["Plaćanje čišćenja", "Puštanje društva i prirode da plate za štetu", "Investiranje u zelenu tehnologiju", "Smanjenje otpada"]
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
        en: ["Lack of technology", "Material degradation during use and processing", "It is a choice", "For better colors"],
        sr: ["Nedostatak tehnologije", "Degradacija materijala tokom upotrebe i obrade", "To je izbor", "Zbog boljih boja"]
      },
      correct: 1,
      explanation: { en: "In linear systems, materials are often mixed, making high-quality recovery hard.", sr: "U linearnim sistemima, materijali su često pomešani, što otežava kvalitetan oporavak." }
    },
    {
      id: 'l_m_51',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is the relationship between GDP and material use in linear models?", sr: "Kakav je odnos između BDP-a i upotrebe materijala u linearnim modelima?" },
      options: {
        en: ["Decoupled", "Coupled (they grow together)", "Inverse", "None"],
        sr: ["Razdvojen (decoupled)", "Povezan (rastu zajedno)", "Inverzan", "Nikakav"]
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
        en: ["As an asset", "As a resource to be harvested or an obstacle", "As a shareholder", "As a customer"],
        sr: ["Kao imovinu", "Kao resurs za eksploataciju ili prepreku", "Kao akcionara", "Kao kupca"]
      },
      correct: 1,
      explanation: { en: "Linear progress often ignores its impact on biological diversity.", sr: "Linearni napredak često ignoriše svoj uticaj na biološku raznolikost." }
    },
    {
      id: 'l_m_53',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'material leakage'?", sr: "Šta je 'curenje materijala' (material leakage)?" },
      options: {
        en: ["Spilling liquids", "Materials leaving the economic cycle as waste", "Theft", "Exporting goods"],
        sr: ["Prosipanje tečnosti", "Materijali koji napuštaju ekonomski ciklus kao otpad", "Krađa", "Izvoz robe"]
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
        en: ["It creates too many jobs", "It can lead to resource wars and health issues", "It is too stable", "It empowers everyone"],
        sr: ["Stvara previše poslova", "Može dovesti do ratova za resurse i zdravstvenih problema", "Previše je stabilan", "Ona osnažuje sve"]
      },
      correct: 1,
      explanation: { en: "Inequity in resource access and pollution impacts the most vulnerable.", sr: "Nepravda u pristupu resursima i zagađenju utiče na najranjivije." }
    },
    {
      id: 'l_m_55',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What characterizes linear investment?", sr: "Šta karakteriše linearno investiranje?" },
      options: {
        en: ["Focus on ESG", "Focus on quarterly financial returns", "Long-term legacy", "Circular infrastructure"],
        sr: ["Fokus na ESG", "Fokus na kvartalne finansijske prinose", "Dugoročno nasleđe", "Cirkularna infrastruktura"]
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
        en: ["Higher prices", "When collection costs more than the material value", "More recycling", "Currency devaluation"],
        sr: ["Više cene", "Kada sakupljanje košta više od vrednosti materijala", "Više reciklaže", "Devalvacija valute"]
      },
      correct: 1,
      explanation: { en: "Linear products are often so cheap or complex that collecting them is unprofitable.", sr: "Linearni proizvodi su često toliko jeftini ili složeni da je njihovo sakupljanje neprofitabilno." }
    },
    {
      id: 'l_m_57',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'planned obsolescence' in software?", sr: "Šta je 'planirano zastarevanje' u softveru?" },
      options: {
        en: ["Updates that slow down old devices", "Security patches", "Free trials", "Open source"],
        sr: ["Ažuriranja koja usporavaju stare uređaje", "Sigurnosne zakrpe", "Besplatne probe", "Open source"]
      },
      correct: 0,
      explanation: { en: "Software can be used to force users to buy new hardware.", sr: "Softver se može koristiti da natera korisnike da kupe novi hardver." }
    },
    {
      id: 'l_m_58',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "How does linear design impact disassembly?", sr: "Kako linearni dizajn utiče na rasklapanje?" },
      options: {
        en: ["Standardized tools", "Permanent bonding (glues/welds)", "Modular parts", "Clear labels"],
        sr: ["Standardizovani alati", "Trajno spajanje (lepkovi/zavarivanje)", "Modularni delovi", "Jasne oznake"]
      },
      correct: 1,
      explanation: { en: "Linear products are designed to be cheap to assemble, not easy to disassemble.", sr: "Linearni proizvodi su dizajnirani da budu jeftini za sklapanje, a ne laki za rasklapanje." }
    },
    {
      id: 'l_m_59',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is the 'linear efficiency trap'?", sr: "Šta je 'linearna zamka efikasnosti'?" },
      options: {
        en: ["Being too efficient", "Being efficient at doing the wrong thing", "Recycling perfectly", "Saving energy"],
        sr: ["Biti previše efikasan", "Biti efikasan u rađenju pogrešne stvari", "Savršeno recikliranje", "Štednja energije"]
      },
      correct: 1,
      explanation: { en: "Making a linear process 'efficient' still results in waste, just faster.", sr: "Učiniti linearni proces 'efikasnim' i dalje rezultira otpadom, samo brže." }
    },
    {
      id: 'l_m_60',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is the role of advertising in linearity?", sr: "Koja je uloga oglašavanja u linearnosti?" },
      options: {
        en: ["Educational", "To stimulate continuous demand for new goods", "To promote repair", "To save resources"],
        sr: ["Edukativna", "Stimulisanje stalne potražnje za novom robom", "Promovisanje popravke", "Ušteda resursa"]
      },
      correct: 1,
      explanation: { en: "Advertising drives the high consumption needed for linear growth.", sr: "Oglašavanje podstiče veliku potrošnju neophodnu za linearni rast." }
    },
    {
      id: 'l_m_61',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is a 'linear city'?", sr: "Šta je 'linearni grad'?" },
      options: {
        en: ["A city in a line", "A city that extracts resources and exports waste", "A walkable city", "A smart city"],
        sr: ["Grad u liniji", "Grad koji uzima resurse i izvozi otpad", "Grad po meri pešaka", "Pametan grad"]
      },
      correct: 1,
      explanation: { en: "Most modern cities function as linear consumers of rural resources.", sr: "Većina modernih gradova funkcioniše kao linearni potrošači ruralnih resursa." }
    },
    {
      id: 'l_m_62',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'carbon leakage'?", sr: "Šta je 'curenje ugljenika' (carbon leakage)?" },
      options: {
        en: ["Gas leak", "Moving production to countries with lower emissions rules", "Tree planting", "Carbon capture"],
        sr: ["Curenje gasa", "Premeštanje proizvodnje u zemlje sa labavijim pravilima o emisiji", "Sadnja drveća", "Hvatanje ugljenika"]
      },
      correct: 1,
      explanation: { en: "Linear companies often move to avoid environmental costs.", sr: "Linearne kompanije se često sele kako bi izbegle ekološke troškove." }
    },
    {
      id: 'l_m_63',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "How does linearity impact water?", sr: "Kako linearnost utiče na vodu?" },
      options: {
        en: ["Closed loop usage", "Pollution and over-extraction from basins", "Purification", "Rainmaking"],
        sr: ["Upotreba u zatvorenom krugu", "Zagađenje i prekomerna ekstrakcija iz slivova", "Prečišćavanje", "Pravljenje kiše"]
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
        en: ["Weight loss", "Organic waste ending up in landfills instead of soil", "Farming", "Eating healthy"],
        sr: ["Gubitak težine", "Organski otpad koji završava na deponiji umesto u zemlji", "Poljoprivreda", "Zdrava ishrana"]
      },
      correct: 1,
      explanation: { en: "Linear systems prevent organic matter from returning to the ecosystem.", sr: "Linearni sistemi sprečavaju vraćanje organske materije u ekosistem." }
    },
    {
      id: 'l_m_65',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'single-stream' recycling's linear flaw?", sr: "Koja je linearna mana 'single-stream' reciklaže (sve u jednu kantu)?" },
      options: {
        en: ["It is too easy", "High contamination and lower material quality", "It is too fast", "It saves money"],
        sr: ["Previše je lako", "Velika kontaminacija i niži kvalitet materijala", "Previše je brzo", "Štedi novac"]
      },
      correct: 1,
      explanation: { en: "Mixing everything often makes high-quality recycling impossible.", sr: "Mešanje svega često čini kvalitetnu reciklažu nemogućom." }
    },
    {
      id: 'l_m_66',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "How does linearity view 'repair' as a business?", sr: "Kako linearnost posmatra 'popravku' kao biznis?" },
      options: {
        en: ["As a core service", "As a threat to new product sales", "As an opportunity", "As a requirement"],
        sr: ["Kao osnovnu uslugu", "Kao pretnju prodaji novih proizvoda", "Kao priliku", "Kao obavezu"]
      },
      correct: 1,
      explanation: { en: "Selling new is usually more profitable than repairing in linear models.", sr: "Prodaja novog je obično profitabilnija od popravke u linearnim modelima." }
    },
    {
      id: 'l_m_67',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'resource nationalism'?", sr: "Šta je 'resursni nacionalizam'?" },
      options: {
        en: ["Recycling together", "Countries controlling their finite resources as power", "Global sharing", "Free trade"],
        sr: ["Zajednička reciklaža", "Zemlje koje kontrolišu svoje konačne resurse kao moć", "Globalno deljenje", "Slobodna trgovina"]
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
        en: ["New technology", "Contamination left for future generations to clean", "Clean energy", "Heritage site"],
        sr: ["Nova tehnologija", "Zagađenje ostavljeno budućim generacijama da očiste", "Čista energija", "Kulturna baština"]
      },
      correct: 1,
      explanation: { en: "Linearity 'borrows' from the future and leaves the cleanup cost.", sr: "Linearnost 'pozajmljuje' od budućnosti i ostavlja trošak čišćenja." }
    },
    {
      id: 'l_m_69',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'downstream' impact?", sr: "Šta je 'nizvodni' (downstream) uticaj?" },
      options: {
        en: ["Fishing", "Impact of a product after it is sold/discarded", "Impact of raw extraction", "Internal office cost"],
        sr: ["Pecanje", "Uticaj proizvoda nakon što je prodat/odbačen", "Uticaj sirove ekstrakcije", "Interni kancelarijski trošak"]
      },
      correct: 1,
      explanation: { en: "Linear companies often ignore what happens downstream.", sr: "Linearne kompanije često ignorišu šta se dešava 'nizvodno' (posle prodaje)." }
    },
    {
      id: 'l_m_70',
      category: 'linear',
      difficulty: 'medium',
      question: { en: "What is 'material intensity'?", sr: "Šta je 'materijalni intenzitet'?" },
      options: {
        en: ["Strong materials", "Amount of material needed to generate $1 of GDP", "Density", "Hardness"],
        sr: ["Jaki materijali", "Količina materijala potrebna za generisanje 1$ BDP-a", "Gustina", "Tvrdoća"]
      },
      correct: 1,
      explanation: { en: "Linearity usually requires high material intensity.", sr: "Linearnost obično zahteva veliki materijalni intenzitet." }
    },

    // HARD (71-80)
    {
      id: 'l_h_71',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "Explain the concept of 'externalities' in linear pollution.", sr: "Objasnite koncept eksternalija u kontekstu zagađenja u linearnom modelu." },
      options: {
        en: [
          "Internal company costs",
          "Costs of production not reflected in the market price",
          "Export duties",
          "Cleaning fees"
        ],
        sr: [
          "Interni troškovi kompanije",
          "Troškovi proizvodnje koji se ne vide u tržišnoj ceni",
          "Izvozne dažbine",
          "Naknade za čišćenje"
        ]
      },
      correct: 1,
      explanation: { en: "Society pays for health and environmental damage, not the buyer or seller.", sr: "Društvo plaća za štetu po zdravlje i okolinu, a ne kupac ili prodavac." }
    },
    {
      id: 'l_h_72',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "What is the 'Jevons Paradox'?", sr: "Šta je 'Dževonsov paradoks' (Jevons Paradox)?" },
      options: {
        en: ["Efficiency leads to lower use", "Efficiency increases the total use of a resource", "Recycling is impossible", "Growth is infinite"],
        sr: ["Efikasnost vodi manjoj upotrebi", "Efikasnost povećava ukupnu upotrebu resursa", "Reciklaža je nemoguća", "Rast je beskonačan"]
      },
      correct: 1,
      explanation: { en: "In linear systems, tech progress often speeds up resource depletion.", sr: "U linearnim sistemima, tehnički napredak često ubrzava iscrpljivanje resursa." }
    },
    {
      id: 'l_h_73',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "What is 'thermodynamic irreversible loss'?", sr: "Šta je 'termodinamički nepovratni gubitak'?" },
      options: {
        en: ["Energy saving", "When materials are so dispersed they can't be recovered", "Battery discharge", "Heat"],
        sr: ["Ušteda energije", "Kada su materijali toliko raspršeni da se ne mogu povratiti", "Pražnjenje baterije", "Toplota"]
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
        en: ["Splitting materials", "Growing GDP without growing material use", "Quitting mining", "Recycling plastic"],
        sr: ["Cepanje materijala", "Rast BDP-a bez rasta upotrebe materijala", "Prestanak rudarenja", "Recikliranje plastike"]
      },
      correct: 1,
      explanation: { en: "Linearity makes absolute decoupling extremely difficult.", sr: "Linearnost čini apsolutno razdvajanje (decoupling) ekstremno teškim." }
    },
    {
      id: 'l_h_75',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "What is the 'linear subsidy' from nature?", sr: "Šta je 'linearna subvencija' od prirode?" },
      options: {
        en: ["Government grants", "Unpaid ecological services and free resources", "Taxes", "Charity"],
        sr: ["Državni grantovi", "Neplaćene ekološke usluge i besplatni resursi", "Porezi", "Dobrotvorne svrhe"]
      },
      correct: 1,
      explanation: { en: "Linear profits often rely on not paying the true cost of natural capital.", sr: "Linearni profiti se često oslanjaju na neplaćanje stvarne cene prirodnog kapitala." }
    },
    {
      id: 'l_h_76',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "What is 'path dependency' in linear systems?", sr: "Šta je 'zavisnost od puta' (path dependency) u linearnim sistemima?" },
      options: {
        en: ["GPS tracking", "Past decisions making it hard to change current models", "Supply routes", "Road construction"],
        sr: ["GPS praćenje", "Prošle odluke koje otežavaju promenu trenutnih modela", "Rute snabdevanja", "Izgradnja puteva"]
      },
      correct: 1,
      explanation: { en: "Massive investment in linear infra makes switching to circular slow.", sr: "Ogromna investicija u linearnu infrastrukturu usporava prelazak na cirkularnu." }
    },
    {
      id: 'l_h_77',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "What is 'toxic lock-in'?", sr: "Šta je 'toksična zarobljenost' (toxic lock-in)?" },
      options: {
        en: ["Being stuck in a lab", "Materials that can't be recycled due to harmful additives", "Chemical storage", "Poisoning"],
        sr: ["Biti zaglavljen u laboratoriji", "Materijali koji se ne mogu reciklirati zbog štetnih aditiva", "Skladištenje hemikalija", "Trovanje"]
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
        en: ["Poor people", "Individuals over-extracting shared resources for self-interest", "Lack of parks", "Pollution"],
        sr: ["Siromašni ljudi", "Pojedinci koji previše eksploatišu zajedničke resurse zbog ličnog interesa", "Nedostatak parkova", "Zagađenje"]
      },
      correct: 1,
      explanation: { en: "Linearity encourages taking as much as possible before others do.", sr: "Linearnost podstiče uzimanje što je više moguće pre nego što drugi to urade." }
    },
    {
      id: 'l_h_79',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "What is 'planned systemic failure'?", sr: "Šta je 'planirani sistemski neuspeh'?" },
      options: {
        en: ["A mistake", "When a system is designed to fail at recovery", "Bankruptcy", "Bad weather"],
        sr: ["Greška", "Kada je sistem dizajniran da ne uspe u oporavku", "Bankrot", "Loše vreme"]
      },
      correct: 1,
      explanation: { en: "Linearity isn't broken; it's performing exactly as designed (to waste).", sr: "Linearnost nije pokvarena; ona radi tačno kako je dizajnirana (da traći)." }
    },
    {
      id: 'l_h_80',
      category: 'linear',
      difficulty: 'hard',
      question: { en: "Explain 'embedded emissions' in global trade.", sr: "Objasnite 'ugrađene emisije' u globalnoj trgovini." },
      options: {
        en: [
          "Car exhausts",
          "CO2 emitted in one country to produce goods consumed in another",
          "Smoke",
          "Carbon in soil"
        ],
        sr: [
          "Izduvni gasovi",
          "CO2 emitovan u jednoj zemlji za proizvodnju robe koja se troši u drugoj",
          "Dim",
          "Ugljenik u zemlji"
        ]
      },
      correct: 1,
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
      en: ["Reduce, Reuse, Recycle", "Refine, Reform, Rebuild", "Reset, Replace, Restore", "Read, Research, Report"],
      sr: ["Smanji, Ponovo koristi, Recikliraj", "Prečisti, Reformiši, Ponovo izgradi", "Resetuj, Zameni, Obnovi", "Čitaj, Istraži, Izvesti"]
    },
    correct: 0,
    explanation: { en: "The 3Rs are the foundation of waste hierarchy in circularity.", sr: "3R su osnova hijerarhije otpada u cirkularnosti." }
  },
  {
    id: 'c_e_2',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "Which resources are in focus on the Green board?", sr: "Koji resursi su u fokusu zelene table?" },
    options: {
      en: ["Non-renewable", "Renewable", "Fossil fuels", "Rare earth metals"],
      sr: ["Neobnovljivi", "Obnovljivi", "Fosilna goriva", "Retki metali"]
    },
    correct: 1,
    explanation: { en: "Circular economy focuses on using renewable resources and keeping materials in use.", sr: "Cirkularna ekonomija se fokusira na korišćenje obnovljivih resursa i očuvanje materijala u upotrebi." }
  },
  {
    id: 'c_e_3',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'composting'?", sr: "Šta je 'kompostiranje'?" },
    options: {
      en: ["Recycling plastic", "Turning organic waste into nutrient-rich soil", "Incinerating paper", "Purifying water"],
      sr: ["Recikliranje plastike", "Pretvaranje organskog otpada u plodno zemljište", "Spaljivanje papira", "Prečišćavanje vode"]
    },
    correct: 1,
    explanation: { en: "Composting returns biological nutrients back to the soil.", sr: "Kompostiranje vraća biološke hranljive materije nazad u zemljište." }
  },
  {
    id: 'c_e_4',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What does 'closing the loop' mean?", sr: "Šta znači 'zatvaranje kruga'?" },
    options: {
      en: ["Ending a business", "Preventing materials from becoming waste", "Locking a warehouse", "Reducing production"],
      sr: ["Zatvaranje firme", "Sprečavanje da materijali postanu otpad", "Zaključavanje magacina", "Smanjenje proizvodnje"]
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
      en: ["Using an item again for its original purpose", "Throwing it away", "Melting it down", "Burning it for energy"],
      sr: ["Ponovno korišćenje predmeta za originalnu svrhu", "Bacanje predmeta", "Topljenje materijala", "Spaljivanje za energiju"]
    },
    correct: 0,
    explanation: { en: "Reuse keeps products at their highest value without processing.", sr: "Ponovna upotreba čuva proizvode u njihovoj najvišoj vrednosti bez obrade." }
  },
  {
    id: 'c_e_6',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'repair'?", sr: "Šta je 'popravka'?" },
    options: {
      en: ["Buying a new one", "Fixing a faulty product to extend its life", "Recycling parts", "Discarding used items"],
      sr: ["Kupovina novog", "Popravljanje pokvarenog proizvoda radi dužeg trajanja", "Recikliranje delova", "Odbacivanje korišćenih predmeta"]
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
      en: ["Giving away money", "Collective use of products by multiple users", "Selling products", "Opening a bank"],
      sr: ["Poklanjanje novca", "Kolektivno korišćenje proizvoda od strane više korisnika", "Prodaja proizvoda", "Otvaranje banke"]
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
      en: ["Demolishing a building", "Restoring an old product to good working order", "Creating waste", "Extracting coal"],
      sr: ["Rušenje zgrade", "Vraćanje starog proizvoda u ispravno stanje", "Stvaranje otpada", "Vađenje uglja"]
    },
    correct: 1,
    explanation: { en: "Refurbished products are cleaned and repaired for resale.", sr: "Obnovljeni proizvodi se čiste i popravljaju za dalju prodaju." }
  },
  {
    id: 'c_e_9',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'remanufacturing'?", sr: "Šta je 'ponovna proizvodnja' (remanufacturing)?" },
    options: {
      en: ["Industrial-scale restoration of products to 'as new' condition", "Handmade crafts", "Recycling plastic bottles", "Building from scratch"],
      sr: ["Industrijska obnova proizvoda u stanje 'kao novo'", "Ručna izrada", "Recikliranje plastičnih flaša", "Gradnja od nule"]
    },
    correct: 0,
    explanation: { en: "Remanufacturing uses original parts to build a high-quality product.", sr: "Ponovna proizvodnja koristi originalne delove za izradu visokokvalitetnog proizvoda." }
  },
  {
    id: 'c_e_10',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'upcycling'?", sr: "Šta je 'upcycling'?" },
    options: {
      en: ["Recycling into something of lower quality", "Creative reuse of waste to create something higher value", "Buying more things", "Driving a bike uphill"],
      sr: ["Recikliranje u nešto nižeg kvaliteta", "Kreativna ponovna upotreba otpada za stvaranje veće vrednosti", "Kupovina više stvari", "Vožnja bicikla uzbrdo"]
    },
    correct: 1,
    explanation: { en: "Upcycling adds aesthetic or functional value to discarded items.", sr: "Upcycling dodaje estetsku ili funkcionalnu vrednost odbačenim predmetima." }
  },
  {
    id: 'c_e_11',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'design for longevity'?", sr: "Šta je 'dizajn za dugovečnost'?" },
    options: {
      en: ["Making things break fast", "Designing products to last as long as possible", "Short-term fashion", "Disposable design"],
      sr: ["Pravljenje stvari da se brzo pokvare", "Dizajniranje proizvoda da traju što duže", "Kratkoročna moda", "Jednokratni dizajn"]
    },
    correct: 1,
    explanation: { en: "Durability is a key principle of circular design.", sr: "Trajnost je ključni princip cirkularnog dizajna." }
  },
  {
    id: 'c_e_12',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'modular design'?", sr: "Šta je 'modularni dizajn'?" },
    options: {
      en: ["One single block", "Product made of easily replaceable parts", "Complex assembly", "Secret design"],
      sr: ["Jedan čvrst blok", "Proizvod napravljen od lako zamenljivih delova", "Složeno sklapanje", "Tajni dizajn"]
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
      en: ["Selling a product once", "Renting or leasing a product instead of buying it", "Customer support", "Giving a product for free"],
      sr: ["Jednokratna prodaja proizvoda", "Iznajmljivanje proizvoda umesto kupovine", "Korisnička podrška", "Davanje proizvoda besplatno"]
    },
    correct: 1,
    explanation: { en: "Users pay for the function of the product, not ownership.", sr: "Korisnici plaćaju za funkciju proizvoda, a ne za vlasništvo." }
  },
  {
    id: 'c_e_14',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'circular sourcing'?", sr: "Šta je 'cirkularna nabavka'?" },
    options: {
      en: ["Buying only new materials", "Sourcing recycled or renewable materials", "Global transport", "Secret suppliers"],
      sr: ["Kupovina samo novih materijala", "Nabavka recikliranih ili obnovljivih materijala", "Globalni transport", "Tajni dobavljači"]
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
      en: ["Coal and Oil", "Solar, Wind, and Hydro", "Nuclear only", "Natural Gas"],
      sr: ["Ugalj i nafta", "Sunce, vetar i voda", "Samo nuklearna", "Prirodni gas"]
    },
    correct: 1,
    explanation: { en: "Renewable energy powers circular production cycles sustainably.", sr: "Obnovljiva energija napaja cirkularne proizvodne cikluse na održiv način." }
  },
  {
    id: 'c_e_16',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'industrial symbiosis'?", sr: "Šta je 'industrijska simbioza'?" },
    options: {
      en: ["Competition between companies", "One company's waste becoming another's resource", "Biological research", "A merger of firms"],
      sr: ["Takmičenje između firmi", "Otpad jedne kompanije postaje resurs druge", "Biološko istraživanje", "Spajanje firmi"]
    },
    correct: 1,
    explanation: { en: "Industrial symbiosis mimics natural ecosystems in business.", sr: "Industrijska simbioza imitira prirodne ekosisteme u biznisu." }
  },
  {
    id: 'c_e_17',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'closed-loop recycling'?", sr: "Šta je 'reciklaža zatvorenog kruga'?" },
    options: {
      en: ["Recycling into the same product", "Recycling once", "Downcycling", "Incineration"],
      sr: ["Recikliranje u isti proizvod", "Recikliranje samo jednom", "Downcycling", "Spaljivanje"]
    },
    correct: 0,
    explanation: { en: "Closed-loop keeps material quality high for the same application.", sr: "Zatvoreni krug čuva kvalitet materijala za istu primenu." }
  },
  {
    id: 'c_e_18',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What are 'biological nutrients'?", sr: "Šta su 'biološki nutrijenti'?" },
    options: {
      en: ["Plastic and Metal", "Organic materials that can return to nature", "Vitamins", "Chemicals"],
      sr: ["Plastika i metal", "Organski materijali koji se mogu vratiti u prirodu", "Vitamini", "Hemikalije"]
    },
    correct: 1,
    explanation: { en: "Biological nutrients safely biodegrade and enrich ecosystems.", sr: "Biološki nutrijenti se bezbedno razlažu i obogaćuju ekosisteme." }
  },
  {
    id: 'c_e_19',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What are 'technical nutrients'?", sr: "Šta su 'tehnički nutrijenti'?" },
    options: {
      en: ["Food and water", "Man-made materials like metals and polymers designed to be recovered", "Software", "Electricity"],
      sr: ["Hrana i voda", "Materijali poput metala i polimera dizajnirani za oporavak", "Softver", "Struja"]
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
      en: ["Producing only a little trash", "Designing systems where all materials are reused", "Total destruction of goods", "A marketing slogan"],
      sr: ["Proizvodnja malo smeća", "Dizajniranje sistema gde se svi materijali ponovo koriste", "Potpuno uništenje robe", "Marketinški slogan"]
    },
    correct: 1,
    explanation: { en: "Zero waste aims to eliminate the concept of waste entirely.", sr: "Nula otpada teži da potpuno eliminiše koncept otpada." }
  },
  {
    id: 'c_e_21',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'circular fashion'?", sr: "Šta je 'cirkularna moda'?" },
    options: {
      en: ["Fast fashion", "Clothing designed to be reused, repaired, and recycled", "Wearing circles", "Expensive brands"],
      sr: ["Brza moda", "Odeća dizajnirana da se ponovo koristi, popravlja i reciklira", "Nošenje krugova", "Skupi brendovi"]
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
      en: ["Chemical farming", "Farming that restores soil health and biodiversity", "Industrial monoculture", "Indoor farming"],
      sr: ["Hemijska poljoprivreda", "Poljoprivreda koja obnavlja zdravlje zemljišta i biodiverzitet", "Industrijska monokultura", "Uzgoj u zatvorenom"]
    },
    correct: 1,
    explanation: { en: "Regenerative farming fixes carbon and improves water cycles.", sr: "Regenerativna poljoprivreda vezuje ugljenik i poboljšava vodene cikluse." }
  },
  {
    id: 'c_e_23',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is a 'resource loop'?", sr: "Šta je 'resursna petlja'?" },
    options: {
      en: ["A dead end", "The continuous flow of materials within a system", "A circle drawn on a map", "A type of knot"],
      sr: ["Slepa ulica", "Kontinuirani tok materijala unutar sistema", "Krug nacrtan na mapi", "Vrsta čvora"]
    },
    correct: 1,
    explanation: { en: "Resource loops prevent material leakage from the economy.", sr: "Resursne petlje sprečavaju curenje materijala iz ekonomije." }
  },
  {
    id: 'c_e_24',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'circular procurement'?", sr: "Šta je 'cirkularna javna nabavka'?" },
    options: {
      en: ["Buying the cheapest option", "Buying goods/services with circular criteria", "Buying in bulk", "Buying from one person"],
      sr: ["Kupovina najjeftinije opcije", "Kupovina robe/usluga po cirkularnim kriterijumima", "Grupna kupovina", "Kupovina od jedne osobe"]
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
      en: ["Plastic from oil", "Material derived from living organisms (plants, fungi)", "Steel", "Glass"],
      sr: ["Plastika od nafte", "Materijal dobijen od živih organizama (biljke, gljive)", "Čelik", "Staklo"]
    },
    correct: 1,
    explanation: { en: "Bio-based materials are part of the biological cycle.", sr: "Bio-materijali su deo biološkog ciklusa." }
  },
  {
    id: 'c_e_26',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'dematerialization'?", sr: "Šta je 'dematerijalizacija'?" },
    options: {
      en: ["Magic trick", "Using less material to provide the same service", "Losing resources", "Deleting files"],
      sr: ["Mađioničarski trik", "Korišćenje manje materijala za istu uslugu", "Gubitak resursa", "Brisanje fajlova"]
    },
    correct: 1,
    explanation: { en: "Digital services often achieve dematerialization (e.g., streaming vs CDs).", sr: "Digitalne usluge često postižu dematerijalizaciju (npr. striming umesto CD-ova)." }
  },
  {
    id: 'c_e_27',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'urban mining'?", sr: "Šta je 'urbano rudarenje'?" },
    options: {
      en: ["Digging under cities", "Recovering raw materials from used products in cities", "City planning", "Building subways"],
      sr: ["Kopanje ispod gradova", "Oporavak sirovina iz korišćenih proizvoda u gradovima", "Planiranje grada", "Gradnja metroa"]
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
      en: ["Round computers", "Devices built to be repaired, upgraded, and recycled", "Old TVs", "Broken phones"],
      sr: ["Okrugli kompjuteri", "Uređaji napravljeni da se popravljaju, nadograđuju i recikliraju", "Stari televizori", "Polomljeni telefoni"]
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
      en: ["Using water for a waterfall", "Using a material for different purposes as its quality decreases", "Using things once", "Infinite use"],
      sr: ["Korišćenje vode za vodopad", "Korišćenje materijala za različite svrhe kako kvalitet opada", "Jednokratna upotreba", "Beskonačna upotreba"]
    },
    correct: 1,
    explanation: { en: "Example: High-quality wood -> furniture -> chipboard -> energy.", sr: "Primer: Kvalitetno drvo -> nameštaj -> iverica -> energija." }
  },
  {
    id: 'c_e_30',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'design for disassembly'?", sr: "Šta je 'dizajn za rasklapanje'?" },
    options: {
      en: ["Gluing parts together", "Making it easy to take a product apart for repair or recycling", "Destroying things", "Secret assembly"],
      sr: ["Lepljenje delova", "Olakšavanje rastavljanja proizvoda radi popravke ili reciklaže", "Uništavanje stvari", "Tajno sklapanje"]
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
      en: ["Aesthetic design", "Design that reduces environmental impact throughout the life cycle", "Green-colored products", "Cheap design"],
      sr: ["Estetski dizajn", "Dizajn koji smanjuje uticaj na okolinu tokom celog životnog veka", "Zeleno obojeni proizvodi", "Jeftin dizajn"]
    },
    correct: 1,
    explanation: { en: "Eco-design considers everything from raw materials to end-of-life.", sr: "Eko-dizajn razmatra sve, od sirovina do kraja životnog veka." }
  },
  {
    id: 'c_e_32',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is a 'circular city'?", sr: "Šta je 'cirkularni grad'?" },
    options: {
      en: ["A round city", "A city that aims to eliminate waste and circulate resources", "A high-tech city", "A crowded city"],
      sr: ["Okrugli grad", "Grad koji teži eliminaciji otpada i cirkulaciji resursa", "Visokotehnološki grad", "Prenaseljen grad"]
    },
    correct: 1,
    explanation: { en: "Circular cities focus on food, mobility, and construction loops.", sr: "Cirkularni gradovi se fokusiraju na hranu, mobilnost i građevinske petlje." }
  },
  {
    id: 'c_e_33',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'material value retention'?", sr: "Šta je 'očuvanje vrednosti materijala'?" },
    options: {
      en: ["Storing gold", "Keeping materials in the economy as long as possible", "Selling at high price", "Saving money"],
      sr: ["Čuvanje zlata", "Zadržavanje materijala u ekonomiji što je duže moguće", "Prodaja po visokoj ceni", "Štednja novca"]
    },
    correct: 1,
    explanation: { en: "Circularity aims to keep material value from leaking out.", sr: "Cirkularnost teži da spreči curenje vrednosti materijala." }
  },
  {
    id: 'c_e_34',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'biological cycle'?", sr: "Šta je 'biološki ciklus'?" },
    options: {
      en: ["The life of an animal", "The process of organic materials returning to soil", "Manufacturing loop", "Financial cycle"],
      sr: ["Život životinje", "Proces povratka organskih materija u zemljište", "Proizvodna petlja", "Finansijski ciklus"]
    },
    correct: 1,
    explanation: { en: "Biological materials should safely return to the biosphere.", sr: "Biološki materijali treba bezbedno da se vrate u biosferu." }
  },
  {
    id: 'c_e_35',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'technical cycle'?", sr: "Šta je 'tehnički ciklus'?" },
    options: {
      en: ["A bicycle made of metal", "The recovery and reuse of non-biological materials", "Software update", "Construction site"],
      sr: ["Bicikl od metala", "Oporavak i ponovna upotreba nebioloških materijala", "Ažuriranje softvera", "Gradilište"]
    },
    correct: 1,
    explanation: { en: "Technical materials circulate in industrial loops without degrading.", sr: "Tehnički materijali cirkulišu u industrijskim krugovima bez degradacije." }
  },
  {
    id: 'c_e_36',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'systemic thinking'?", sr: "Šta je 'sistemsko razmišljanje'?" },
    options: {
      en: ["Thinking about one part", "Understanding how different parts of a system interact", "Linear logic", "Quick decisions"],
      sr: ["Razmišljanje o jednom delu", "Razumevanje kako različiti delovi sistema utiču jedni na druge", "Linearna logika", "Brze odluke"]
    },
    correct: 1,
    explanation: { en: "Circularity requires understanding the whole supply chain.", sr: "Cirkularnost zahteva razumevanje celog lanca snabdevanja." }
  },
  {
    id: 'c_e_37',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'renewable material'?", sr: "Šta je 'obnovljiv materijal'?" },
    options: {
      en: ["Plastic", "Wood, Cotton, or Bamboo", "Steel", "Aluminum"],
      sr: ["Plastika", "Drvo, pamuk ili bambus", "Čelik", "Aluminijum"]
    },
    correct: 1,
    explanation: { en: "Renewable materials grow back naturally if managed well.", sr: "Obnovljivi materijali ponovo rastu prirodno ako se njima dobro upravlja." }
  },
  {
    id: 'c_e_38',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is 'take-back' scheme?", sr: "Šta je 'program preuzimanja' (take-back)?" },
    options: {
      en: ["Stealing products", "When a company collects used products from customers for recycling", "Returning a gift", "Bankruptcy"],
      sr: ["Krađa proizvoda", "Kada kompanija sakuplja korišćene proizvode od kupaca za reciklažu", "Vraćanje poklona", "Bankrot"]
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
      en: ["A pile of trash", "The priority order for waste management (Prevention > Reuse > Recycling)", "A government office", "Recycling rules"],
      sr: ["Gomila smeća", "Prioritetni red upravljanja otpadom (Prevencija > Ponovna upotreba > Reciklaža)", "Državna kancelarija", "Pravila reciklaže"]
    },
    correct: 1,
    explanation: { en: "The hierarchy prioritizes preventing waste over managing it.", sr: "Hijerarhija daje prioritet sprečavanju nastanka otpada u odnosu na upravljanje njime." }
  },
  {
    id: 'c_e_40',
    category: 'circular',
    difficulty: 'easy',
    question: { en: "What is the ultimate goal of the circular economy?", sr: "Šta je krajnji cilj cirkularne ekonomije?" },
    options: {
      en: ["Universal wealth", "Waste-free world and planetary balance", "Infinite growth", "Perfect efficiency"],
      sr: ["Univerzalno bogatstvo", "Svet bez otpada i planetarna ravnoteža", "Beskonačan rast", "Savršena efikasnost"]
    },
    correct: 1,
    explanation: { en: "A circular economy aims for long-term survival within planetary boundaries.", sr: "Cirkularna ekonomija teži dugoročnom opstanku u okviru granica planete." }
  },
  // MEDIUM (41-70)
  {
    id: 'c_m_41',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is the 'Butterfly Diagram'?", sr: "Šta je 'Leptir dijagram' (Butterfly Diagram)?" },
    options: {
      en: ["A chart showing species growth", "A visual representation of circular economy flows (technical and biological)", "A map of trade routes", "A weather forecast tool"],
      sr: ["Grafikon rasta vrsta", "Vizuelni prikaz tokova cirkularne ekonomije (tehnički i biološki)", "Mapa trgovačkih puteva", "Alat za vremensku prognozu"]
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
      en: ["A baby store", "A framework for designing products as healthy nutrients for cycles", "Waste management strategy", "Linear production line"],
      sr: ["Prodavnica za bebe", "Okvir za dizajniranje proizvoda kao zdravih nutrijenata za cikluse", "Strategija upravljanja otpadom", "Linearna proizvodna traka"]
    },
    correct: 1,
    explanation: { en: "C2C eliminates the concept of waste by design.", sr: "C2C eliminiše koncept otpada kroz dizajn." }
  },
  {
    id: 'c_m_43',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'Extended Producer Responsibility' (EPR)?", sr: "Šta je 'Proširena odgovornost proizvođača' (EPR)?" },
    options: {
      en: ["Paying employees more", "Producers' responsibility for the entire life cycle of their products", "Fast shipping", "Selling in more countries"],
      sr: ["Povećanje plata", "Odgovornost proizvođača za ceo životni vek njihovih proizvoda", "Brza dostava", "Prodaja u više zemalja"]
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
      en: ["Driving backwards", "Moving goods from consumers back to producers for recovery", "Inventory management", "International shipping"],
      sr: ["Vožnja unazad", "Kretanje robe od potrošača nazad do proizvođača radi oporavka", "Upravljanje zalihama", "Međunarodna dostava"]
    },
    correct: 1,
    explanation: { en: "Reverse logistics is essential for take-back and recycling systems.", sr: "Povratna logistika je neophodna za sisteme preuzimanja i reciklaže." }
  },
  {
    id: 'c_m_45',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'upcycling' vs 'recycling'?", sr: "Šta je 'upcycling' u odnosu na 'recikliranje'?" },
    options: {
      en: ["They are the same", "Upcycling increases value; Recycling often involves downcycling", "Recycling is always better", "Upcycling is only for art"],
      sr: ["To je isto", "Upcycling povećava vrednost; recikliranje često uključuje downcycling", "Recikliranje je uvek bolje", "Upcycling je samo za umetnost"]
    },
    correct: 1,
    explanation: { en: "Upcycling creative reuse avoids destroying the material's structure.", sr: "Upcycling kreativna ponovna upotreba izbegava uništavanje strukture materijala." }
  },
  {
    id: 'c_m_46',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is the 'Performance Economy'?", sr: "Šta je 'Ekonomija performansi'?" },
    options: {
      en: ["Economic growth rate", "Selling services and performance instead of physical goods", "Stock market results", "Sport events economy"],
      sr: ["Stopa ekonomskog rasta", "Prodaja usluga i performansi umesto fizičke robe", "Rezultati na berzi", "Ekonomija sportskih događaja"]
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
      en: ["Making products look like animals", "Emulating nature's patterns and strategies to solve human challenges", "Using wood only", "Protecting forests"],
      sr: ["Pravljenje proizvoda da liče na životinje", "Oponašanje prirodnih obrazaca i strategija za rešavanje ljudskih izazova", "Korišćenje samo drveta", "Zaštita šuma"]
    },
    correct: 1,
    explanation: { en: "Nature has already solved many problems with zero waste.", sr: "Priroda je već rešila mnoge probleme sa nula otpada." }
  },
  {
    id: 'c_m_48',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'pre-consumer' vs 'post-consumer' waste?", sr: "Šta je 'pre-potrošački' u odnosu na 'post-potrošački' otpad?" },
    options: {
      en: ["Waste from factories vs waste from households", "Waste from kids vs adults", "Old vs new waste", "Organic vs inorganic"],
      sr: ["Otpad iz fabrika vs otpad iz domaćinstava", "Otpad od dece vs odraslih", "Stari vs novi otpad", "Organski vs neorganski"]
    },
    correct: 0,
    explanation: { en: "Pre-consumer waste includes production scraps; post-consumer is discarded after use.", sr: "Pre-potrošački otpad uključuje ostatke iz proizvodnje; post-potrošački se odbacuje nakon upotrebe." }
  },
  {
    id: 'c_m_49',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is the 'R-ladder'?", sr: "Šta je 'R-lestvica'?" },
    options: {
      en: ["A tool for painting", "A ranking of circularity strategies by impact (Refuse > Reduce > Reuse...)", "A financial index", "A career path"],
      sr: ["Alat za krečenje", "Rangiranje cirkularnih strategija po uticaju (Odbij > Smanji > Ponovo koristi...)", "Finansijski indeks", "Put u karijeri"]
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
      en: ["Hole in a product", "The difference between total material use and circular use", "A bridge design", "Missing data"],
      sr: ["Rupa u proizvodu", "Razlika između ukupne upotrebe materijala i cirkularne upotrebe", "Dizajn mosta", "Nedostajući podaci"]
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
      en: ["By avoiding taxes", "By reducing dependence on volatile raw material prices", "By firing employees", "By ignoring laws"],
      sr: ["Izbegavanjem poreza", "Smanjenjem zavisnosti od nestabilnih cena sirovina", "Otpuštanjem radnika", "Ignorisanjem zakona"]
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
      en: ["An economy that works", "Focusing on delivering functions rather than selling objects", "A government plan", "Digital economy"],
      sr: ["Ekonomija koja radi", "Fokus na pružanje funkcija umesto prodaje predmeta", "Vladin plan", "Digitalna ekonomija"]
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
      en: ["Recycling it many times", "Turning high-quality plastic into low-quality mixed plastic items", "Better plastic", "Burning plastic"],
      sr: ["Recikliranje više puta", "Pretvaranje kvalitetne plastike u mešane plastične predmete niskog kvaliteta", "Bolja plastika", "Spaljivanje plastike"]
    },
    correct: 1,
    explanation: { en: "Most plastic recycling results in lower-grade materials that can't be recycled again.", sr: "Većina reciklaže plastike rezultira materijalima nižeg kvaliteta koji se ne mogu ponovo reciklirati." }
  },
  {
    id: 'c_m_54',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'blue economy'?", sr: "Šta je 'plava ekonomija'?" },
    options: {
      en: ["Ocean-based economy", "Gunter Pauli's concept of using waste from one process as input for another", "Water sports", "Sky exploration"],
      sr: ["Ekonomija zasnovana na okeanu", "Koncept Guntera Paulija o korišćenju otpada jednog procesa kao ulaza za drugi", "Sportovi na vodi", "Istraživanje neba"]
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
      en: ["Traffic lights", "Metrics used to measure the circularity of a product or company", "Clock hands", "Stock charts"],
      sr: ["Semafori", "Metrike koje se koriste za merenje cirkularnosti proizvoda ili kompanije", "Kazaljke na satu", "Berzanski grafikoni"]
    },
    correct: 1,
    explanation: { en: "Indicators like Material Circularity Indicator (MCI) help track progress.", sr: "Indikatori poput MCI pomažu u praćenju napretka." }
  },
  {
    id: 'c_m_56',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'circular bio-economy'?", sr: "Šta je 'cirkularna bio-ekonomija'?" },
    options: {
      en: ["Biological research", "Using renewable biological resources to produce food, materials, and energy in loops", "Eating organic", "Forest protection"],
      sr: ["Biološko istraživanje", "Korišćenje obnovljivih bioloških resursa za hranu, materijale i energiju u krugovima", "Organska ishrana", "Zaštita šuma"]
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
      en: ["Amount of materials produced", "Generating more economic value per unit of material used", "Mining speed", "Total material consumption"],
      sr: ["Količina proizvedenih materijala", "Stvaranje veće ekonomske vrednosti po jedinici korišćenog materijala", "Brzina rudarenja", "Ukupna potrošnja materijala"]
    },
    correct: 1,
    explanation: { en: "Circular economy aims to maximize resource productivity.", sr: "Cirkularna ekonomija teži maksimizaciji produktivnosti resursa." }
  },
  {
    id: 'c_m_58',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'design for repair'?", sr: "Šta je 'dizajn za popravku'?" },
    options: {
      en: ["Making products look broken", "Ensuring products can be fixed easily with standard tools", "Selling tools", "Self-healing materials"],
      sr: ["Pravljenje pokvarenih proizvoda", "Obezbeđivanje da se proizvodi lako poprave standardnim alatima", "Prodaja alata", "Samozaceljujući materijali"]
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
      en: ["Loop size", "Recycling into a different product vs recycling into the same product", "Recycling plastic vs metal", "Global vs local"],
      sr: ["Veličina petlje", "Recikliranje u drugi proizvod vs recikliranje u isti proizvod", "Recikliranje plastike vs metala", "Globalno vs lokalno"]
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
      en: ["Top priority", "Last resort after all recovery options are exhausted", "Circular strategy", "Illegal"],
      sr: ["Glavni prioritet", "Poslednja opcija nakon što se iscrpe sve mogućnosti oporavka", "Cirkularna strategija", "Ilegalno"]
    },
    correct: 1,
    explanation: { en: "Incineration destroys materials; it is better than landfilling but worse than recycling.", sr: "Spaljivanje uništava materijale; bolje je od deponije, ali gore od reciklaže." }
  },
  {
    id: 'c_m_61',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'circular business model innovation'?", sr: "Šta je 'inovacija cirkularnog biznis modela'?" },
    options: {
      en: ["New logo", "Creating value by changing how a company operates and interacts with resources", "Building a website", "Selling more"],
      sr: ["Novi logo", "Stvaranje vrednosti menjanjem načina rada i odnosa prema resursima", "Izrada sajta", "Veća prodaja"]
    },
    correct: 1,
    explanation: { en: "It involves shifting from selling ownership to selling access or results.", sr: "Ona uključuje prelazak sa prodaje vlasništva na prodaju pristupa ili rezultata." }
  },
  {
    id: 'c_m_62',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'regenerative design'?", sr: "Šta je 'regenerativni dizajn'?" },
    options: {
      en: ["Recycled design", "Design that actively improves the environment instead of just reducing harm", "Old-fashioned design", "Colorful design"],
      sr: ["Reciklirani dizajn", "Dizajn koji aktivno poboljšava okolinu umesto da samo smanjuje štetu", "Staromodni dizajn", "Šareni dizajn"]
    },
    correct: 1,
    explanation: { en: "Regenerative design seeks to restore ecosystems.", sr: "Regenerativni dizajn teži obnavljanju ekosistema." }
  },
  {
    id: 'c_m_63',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'material efficiency'?", sr: "Šta je 'materijalna efikasnost'?" },
    options: {
      en: ["Heavy materials", "Providing more service with less material mass", "Fast production", "Recycling speed"],
      sr: ["Teški materijali", "Pružanje više usluga sa manjom masom materijala", "Brza proizvodnja", "Brzina reciklaže"]
    },
    correct: 1,
    explanation: { en: "Material efficiency reduces the overall footprint of the economy.", sr: "Materijalna efikasnost smanjuje ukupni otisak ekonomije." }
  },
  {
    id: 'c_m_64',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'circular construction'?", sr: "Šta je 'cirkularna gradnja'?" },
    options: {
      en: ["Building round houses", "Designing buildings as material banks for future reuse", "Fast building", "Concrete only"],
      sr: ["Gradnja okruglih kuća", "Dizajniranje zgrada kao banaka materijala za buduću upotrebu", "Brza gradnja", "Samo beton"]
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
      en: ["Bicycle industry", "Industry based on biological cycles and renewable materials", "Chemical industry", "Mining"],
      sr: ["Biciklistička industrija", "Industrija zasnovana na biološkim ciklusima i obnovljivim materijalima", "Hemijska industrija", "Rudarstvo"]
    },
    correct: 1,
    explanation: { en: "It aligns industrial processes with the biosphere.", sr: "Ona usklađuje industrijske procese sa biosferom." }
  },
  {
    id: 'c_m_66',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'resource resilience'?", sr: "Šta je 'resursna otpornost'?" },
    options: {
      en: ["Hard materials", "The ability to maintain supply despite global shocks by using local loops", "Endless resources", "Saving money"],
      sr: ["Jaki materijali", "Sposobnost održavanja snabdevanja uprkos šokovima korišćenjem lokalnih petlji", "Beskonačni resursi", "Štednja novca"]
    },
    correct: 1,
    explanation: { en: "Circular loops make businesses and cities more resilient.", sr: "Cirkularne petlje čine biznise i gradove otpornijim." }
  },
  {
    id: 'c_m_67',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'collaborative consumption'?", sr: "Šta je 'kolaborativna potrošnja'?" },
    options: {
      en: ["Eating together", "The shared use of a good or service by a group (e.g., car sharing)", "Buying together", "Global trade"],
      sr: ["Zajednička ishrana", "Zajedničko korišćenje dobra ili usluge od strane grupe (npr. car sharing)", "Zajednička kupovina", "Globalna trgovina"]
    },
    correct: 1,
    explanation: { en: "It is a key driver of the sharing economy.", sr: "Ona je ključni pokretač ekonomije deljenja." }
  },
  {
    id: 'c_m_68',
    category: 'circular',
    difficulty: 'medium',
    question: { en: "What is 'nutrient recovery' from waste water?", sr: "Šta je 'oporavak nutrijenata' iz otpadnih voda?" },
    options: {
      en: ["Cleaning water", "Extracting phosphorus and nitrogen to use as fertilizer", "Desalination", "Water sports"],
      sr: ["Prečišćavanje vode", "Ekstrakcija fosfora i azota za upotrebu kao đubrivo", "Desalinizacija", "Sportovi na vodi"]
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
      en: ["Secret chain", "Integrating forward and reverse logistics to maximize material recovery", "Local chain", "A short chain"],
      sr: ["Tajni lanac", "Integracija direktne i povratne logistike radi maksimizacije oporavka materijala", "Lokalni lanac", "Kratak lanac"]
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
      en: ["Document for travel", "Digital record of all materials in a product or building for future recovery", "Identity card", "Quality stamp"],
      sr: ["Dokument za putovanje", "Digitalni zapis svih materijala u proizvodu ili zgradi za budući oporavak", "Lična karta", "Pečat kvaliteta"]
    },
    correct: 1,
    explanation: { en: "Passports help identify and sort materials at the end of life.", sr: "Pasoši pomažu u identifikaciji i sortiranju materijala na kraju veka." }
  },

  // HARD (71-80)
  {
    id: 'c_h_71',
    category: 'circular',
    difficulty: 'hard',
    question: { en: "How does the 'Rebound Effect' threaten circular economy goals?", sr: "Kako 'Rebound efekat' ugrožava ciljeve cirkularne ekonomije?" },
    options: {
      en: ["Materials bounce back", "Efficiency gains leading to increased total consumption", "Lower quality", "Technical failure"],
      sr: ["Materijali se vraćaju", "Dobici u efikasnosti koji vode povećanju ukupne potrošnje", "Niži kvalitet", "Tehnički neuspeh"]
    },
    correct: 1,
    explanation: { en: "If we make things 2x more circular but consume 3x more, the planet still suffers.", sr: "Ako stvari učinimo 2x cirkularnijim, a trošimo 3x više, planeta i dalje trpi." }
  },
  {
    id: 'c_h_72',
    category: 'circular',
    difficulty: 'hard',
    question: { en: "Explain 'thermodynamic limits' to recycling.", sr: "Objasnite 'termodinamička ograničenja' reciklaže." },
    options: {
      en: ["Recycling is too hot", "Energy required to sort dispersed materials can exceed the benefit", "Lack of machines", "Material melting point"],
      sr: ["Reciklaža je pretopla", "Energija potrebna za sortiranje raspršenih materijala može premašiti korist", "Nedostatak mašina", "Tačka topljenja materijala"]
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
      en: ["Math terms", "Impact staying flat vs impact falling while growth continues", "Fast vs slow", "Good vs bad"],
      sr: ["Matematički termini", "Uticaj ostaje isti vs uticaj opada dok rast traje", "Brzo vs sporo", "Dobro vs loše"]
    },
    correct: 1,
    explanation: { en: "Absolute decoupling is the ultimate goal: economic growth with shrinking environmental impact.", sr: "Apsolutno razdvajanje je krajnji cilj: ekonomski rast uz smanjenje uticaja na okolinu." }
  },
  {
    id: 'c_h_74',
    category: 'circular',
    difficulty: 'hard',
    question: { en: "How do 'Digital Product Passports' (DPP) impact global trade?", sr: "Kako 'Digitalni pasoši proizvoda' (DPP) utiču na globalnu trgovinu?" },
    options: {
      en: ["They make it slower", "By providing transparent data on origin, materials, and repair across the chain", "They increase taxes", "They replace logos"],
      sr: ["Čine je sporijom", "Pružanjem transparentnih podataka o poreklu, materijalima i popravci kroz lanac", "Povećavaju poreze", "Zamenjuju logotipe"]
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
      en: ["Traffic rules", "Strategies: Use longer, use less, use again", "Financial models", "Marketing tactics"],
      sr: ["Saobraćajna pravila", "Strategije: Koristi duže, koristi manje, koristi ponovo", "Finansijski modeli", "Marketinške taktike"]
    },
    correct: 1,
    explanation: { en: "Slow (longevity), Narrow (efficiency), Close (recycling).", sr: "Uspori (dugovečnost), Suzi (efikasnost), Zatvori (reciklaža)." }
  },
  {
    id: 'c_h_76',
    category: 'circular',
    difficulty: 'hard',
    question: { en: "What is 'Circular Economy 2.0' focusing on?", sr: "Na šta se fokusira 'Cirkularna ekonomija 2.0'?" },
    options: {
      en: ["More recycling", "Regeneration and systemic social equity", "Better machines", "Digital marketing"],
      sr: ["Više reciklaže", "Regeneracija i sistemska socijalna pravda", "Bolje mašine", "Digitalni marketing"]
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
      en: ["Lowering all taxes", "Taxing resources and pollution instead of labor", "Higher income tax", "Sales tax"],
      sr: ["Smanjenje svih poreza", "Oporezivanje resursa i zagađenja umesto rada", "Veći porez na prihod", "Porez na promet"]
    },
    correct: 1,
    explanation: { en: "Taxing resources makes virgin materials expensive and human labor (repair) cheaper.", sr: "Oporezivanje resursa čini nove materijale skupim, a ljudski rad (popravku) jeftinijim." }
  },
  {
    id: 'c_h_78',
    category: 'circular',
    difficulty: 'hard',
    question: { en: "Explain the concept of 'Enabling Technologies' in circularity.", sr: "Objasnite koncept 'Omogućavajućih tehnologija' u cirkularnosti." },
    options: {
      en: ["Social media", "AI, IoT, and Blockchain for tracking and optimizing resource flows", "Faster trucks", "Better screens"],
      sr: ["Društvene mreže", "AI, IoT i Blockchain za praćenje i optimizaciju tokova resursa", "Brži kamioni", "Bolji ekrani"]
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
      en: ["Going in circles", "The risk that linear business models will become obsolete and face stranded assets", "Bad credit", "Inflation"],
      sr: ["Kretanje u krug", "Rizik da će linearni biznis modeli zastareti i suočiti se sa 'zarobljenom' imovinom", "Loš kredit", "Inflacija"]
    },
    correct: 1,
    explanation: { en: "Stranded assets include mines or factories that become unusable due to policy changes.", sr: "Zarobljena imovina uključuje rudnike ili fabrike koje postaju neupotrebljive zbog promene politike." }
  },
  {
    id: 'c_h_80',
    category: 'circular',
    difficulty: 'hard',
    question: { en: "What is 'Bioregionalism' in circular economy?", sr: "Šta je 'bioregionalizam' u cirkularnoj ekonomiji?" },
    options: {
      en: ["Eating only plants", "Aligning economic loops with local biological and geographic boundaries", "Global shipping", "Moving to the countryside"],
      sr: ["Ishrana biljkama", "Usklađivanje ekonomskih petlji sa lokalnim biološkim i geografskim granicama", "Globalna dostava", "Selidba na selo"]
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