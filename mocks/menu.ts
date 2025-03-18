export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isPopular?: boolean;
  nutritionalValues?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    sugar?: number;
    salt?: number;
  };
  allergens?: string[];
}

export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: 'moisRolls', name: 'Mois Rolls' },
  { id: 'helfriterade', name: 'Helfriterade Maki' },
  { id: 'pokebowls', name: 'Pokébowls' },
  { id: 'nigiri', name: 'Nigiri' },
  { id: 'combo', name: 'Nigiri Combo' },
  { id: 'delikatesser', name: 'Exotiska Delikatesser' },
  { id: 'barn', name: 'Barnmenyer' },
  { id: 'smatt', name: 'Smått Och Gott' },
  { id: 'saser', name: 'Våra Såser' },
  { id: 'drycker', name: 'Uppfriskande Drycker' },
  { id: 'nigiriPar', name: 'Nigiri i Par' },
];

export const menuItems: MenuItem[] = [
  // Mois Rolls
  {
    id: '1',
    name: 'California Roll',
    description: 'En klassisk rulle där krispig gurka, krämig avokado och en lätt söt calimix kombineras för att skapa en fräsch och välbalanserad smakupplevelse som lockar både öga och gom.',
    price: 109,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'moisRolls',
    isPopular: true,
    nutritionalValues: {
      calories: 320,
      protein: 7,
      carbs: 55,
      fat: 8,
      sugar: 4,
      salt: 1.2
    },
    allergens: ['Gluten', 'Skaldjur', 'Soja', 'Sesam']
  },
  {
    id: '2',
    name: 'Salmon Roll',
    description: 'Färskost, avokado, gurka och delikat lax möts i denna rulle som erbjuder en harmonisk blandning av mjuka och friska smaker – en riktig klassiker med en modern twist.',
    price: 115,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'moisRolls',
    nutritionalValues: {
      calories: 340,
      protein: 12,
      carbs: 48,
      fat: 11,
      sugar: 3,
      salt: 1.5
    },
    allergens: ['Fisk', 'Mjölk', 'Soja', 'Sesam']
  },
  {
    id: '3',
    name: 'Shrimp Roll',
    description: 'En smakrik rulle fylld med färskost, avokado, gurka, sockerärta och saftiga räkor. Varje tugga ger en härlig mix av krispighet och lenhet, perfekt för den äventyrlige.',
    price: 129,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'moisRolls',
    nutritionalValues: {
      calories: 310,
      protein: 10,
      carbs: 50,
      fat: 7,
      sugar: 3,
      salt: 1.4
    },
    allergens: ['Skaldjur', 'Mjölk', 'Soja', 'Sesam']
  },
  {
    id: '4',
    name: 'Veggo Roll',
    description: 'En grönare variant med gurka, färskost, avokado, tofu och inari. Denna rulle är speciellt framtagen för dig som vill ha ett vegetariskt alternativ utan att kompromissa med smak och fräschhet.',
    price: 109,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'moisRolls',
    nutritionalValues: {
      calories: 280,
      protein: 6,
      carbs: 52,
      fat: 6,
      sugar: 4,
      salt: 1.0
    },
    allergens: ['Mjölk', 'Soja', 'Sesam']
  },
  {
    id: '5',
    name: 'Vegan Roll',
    description: 'Helt växtbaserad med gurka, avokado, sockerärtor, tofu och inari. En lätt och smakfull rulle som visar att växtbaserat kan vara både kreativt och utsökt, med en naturlig balans mellan smaker.',
    price: 109,
    image: 'https://images.unsplash.com/photo-1559410545-0bdcd187e323?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'moisRolls',
    nutritionalValues: {
      calories: 260,
      protein: 5,
      carbs: 50,
      fat: 5,
      sugar: 3,
      salt: 0.9
    },
    allergens: ['Soja', 'Sesam']
  },
  {
    id: '6',
    name: 'Crazy Salmon',
    description: 'En rulle med en oväntad twist: krispig textur från sockerärta och avokado, blandat med färskost och toppad med en flamberad laxröra. En spännande kombination som utmanar de traditionella sushismakerna.',
    price: 135,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'moisRolls',
    nutritionalValues: {
      calories: 360,
      protein: 14,
      carbs: 46,
      fat: 13,
      sugar: 3,
      salt: 1.6
    },
    allergens: ['Fisk', 'Mjölk', 'Soja', 'Sesam']
  },
  {
    id: '7',
    name: 'Crazy Shrimp',
    description: 'Här möts krispighet och tradition – en rulle med avokado, sockerärta och färskost som avslutas med en flamberad räkröra. En djärv och smakrik kreation som garanterat överraskar.',
    price: 135,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'moisRolls',
    nutritionalValues: {
      calories: 330,
      protein: 12,
      carbs: 48,
      fat: 10,
      sugar: 3,
      salt: 1.5
    },
    allergens: ['Skaldjur', 'Mjölk', 'Soja', 'Sesam']
  },
  {
    id: '8',
    name: 'Avokado Love',
    description: 'En hyllning till avokadon med friterad räka, gurka och färskost. Denna rulle erbjuder en lyxig mix av krämighet och fräschhet, perfekt för dig som älskar en mjuk, rik smak.',
    price: 135,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'moisRolls',
    nutritionalValues: {
      calories: 350,
      protein: 9,
      carbs: 45,
      fat: 14,
      sugar: 2,
      salt: 1.3
    },
    allergens: ['Skaldjur', 'Mjölk', 'Gluten', 'Soja', 'Sesam']
  },
  {
    id: '9',
    name: 'Magic Tempura',
    description: 'En magisk kombination av sockerärta, avokado och färskost, toppad med lax. Du kan även välja att flambera laxen för en extra dimension, vilket ger en både krispig och saftig upplevelse.',
    price: 135,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'moisRolls',
    nutritionalValues: {
      calories: 370,
      protein: 13,
      carbs: 47,
      fat: 14,
      sugar: 3,
      salt: 1.4
    },
    allergens: ['Fisk', 'Mjölk', 'Gluten', 'Soja', 'Sesam']
  },
  {
    id: '10',
    name: 'Rainbow Roll',
    description: 'En färgglad rulle med calimix, gurka och avokado, som kompletteras med en blandning av lax, extra avokado och räka. Varje bit är en visuell och smakfull explosion som får regnbågen att dansa på din tunga.',
    price: 129,
    image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'moisRolls',
    isPopular: true,
    nutritionalValues: {
      calories: 340,
      protein: 13,
      carbs: 46,
      fat: 12,
      sugar: 3,
      salt: 1.5
    },
    allergens: ['Fisk', 'Skaldjur', 'Soja', 'Sesam']
  },
  {
    id: '11',
    name: 'Magic Shrimp',
    description: 'En rulle där avokado och färskost möter friterad räka, med extra räka på toppen för att ge en extra smakdimension. En perfekt kombination av krispigt och mjukt, som verkligen förtrollar.',
    price: 135,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'moisRolls',
    nutritionalValues: {
      calories: 345,
      protein: 12,
      carbs: 44,
      fat: 13,
      sugar: 2,
      salt: 1.6
    },
    allergens: ['Skaldjur', 'Mjölk', 'Gluten', 'Soja', 'Sesam']
  },

  // Helfriterade Maki
  {
    id: '12',
    name: 'Salmon',
    description: 'Friterade maki med en krispig yta, fyllda med avokado, färskost och lax. En modern tolkning av klassisk sushi där den extra crunch ger en unik textur.',
    price: 139,
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'helfriterade',
    nutritionalValues: {
      calories: 420,
      protein: 14,
      carbs: 50,
      fat: 18,
      sugar: 3,
      salt: 1.7
    },
    allergens: ['Fisk', 'Mjölk', 'Gluten', 'Soja', 'Sesam']
  },
  {
    id: '13',
    name: 'Chicken',
    description: 'Saftig kyckling, avokado och färskost i en friterad maki som kombinerar möra och krispiga inslag. En spännande variant för den som söker något nytt men bekant.',
    price: 139,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'helfriterade',
    nutritionalValues: {
      calories: 410,
      protein: 16,
      carbs: 48,
      fat: 17,
      sugar: 2,
      salt: 1.5
    },
    allergens: ['Mjölk', 'Gluten', 'Soja', 'Sesam']
  },
  {
    id: '14',
    name: 'Beef',
    description: 'Maki med marinerat yakiniku-kött, avokado och färskost. En rullad upplevelse som balanserar möra köttsmaker med en lätt krispighet från den friterade ytan.',
    price: 139,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'helfriterade',
    nutritionalValues: {
      calories: 430,
      protein: 18,
      carbs: 46,
      fat: 19,
      sugar: 3,
      salt: 1.8
    },
    allergens: ['Mjölk', 'Gluten', 'Soja', 'Sesam']
  },

  // Pokebowls
  {
    id: '15',
    name: 'Spicy Beef',
    description: 'En pokébowl med marinerat yakiniku-kött som kombineras med mango, sjögräs, gurka, kimchi, inlagd rödlök, edamame och salladsmix. En kryddig och färgglad rätt som levererar en explosion av smak i varje tugga.',
    price: 135,
    image: 'https://images.unsplash.com/photo-1563612116625-9a3203a7c486?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'pokebowls',
    nutritionalValues: {
      calories: 480,
      protein: 22,
      carbs: 60,
      fat: 16,
      sugar: 8,
      salt: 2.0
    },
    allergens: ['Soja', 'Sesam']
  },
  {
    id: '16',
    name: 'Crispy Chicken',
    description: 'Friterad kyckling serverad med en rad fräscha ingredienser som mango, sjögräs, gurka, kimchi, inlagd rödlök, edamame och salladsmix. En välbalanserad bowl där krispighet och fräschhet går hand i hand.',
    price: 135,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'pokebowls',
    nutritionalValues: {
      calories: 460,
      protein: 20,
      carbs: 58,
      fat: 15,
      sugar: 7,
      salt: 1.8
    },
    allergens: ['Gluten', 'Soja', 'Sesam']
  },
  {
    id: '17',
    name: 'Crazy Swede',
    description: 'En oväntad mix av friterad kyckling och yakiniku-kött, som tillsammans blandas med mango, sjögräs, gurka, kimchi, inlagd rödlök, edamame och salladsmix. En rätt med djärva smaker och en härlig texturvariation.',
    price: 145,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'pokebowls',
    nutritionalValues: {
      calories: 520,
      protein: 26,
      carbs: 56,
      fat: 20,
      sugar: 8,
      salt: 2.2
    },
    allergens: ['Gluten', 'Soja', 'Sesam']
  },
  {
    id: '18',
    name: 'Magic Lax',
    description: 'Rå lax kombineras med mango, sjögräs, gurka, kimchi, inlagd rödlök, edamame och salladsmix i denna eleganta bowl. En fräsch och sofistikerad rätt som hyllar råvarornas naturliga smaker.',
    price: 149,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'pokebowls',
    isPopular: true,
    nutritionalValues: {
      calories: 440,
      protein: 24,
      carbs: 54,
      fat: 14,
      sugar: 7,
      salt: 1.7
    },
    allergens: ['Fisk', 'Soja', 'Sesam']
  },
  {
    id: '19',
    name: 'Lemon Shrimp',
    description: 'Friterade tempuraräkor serverade med en uppfriskande mix av mango, sjögräs, gurka, kimchi, inlagd rödlök, edamame och salladsmix. Den subtila citronnoten lyfter rätten till nya höjder.',
    price: 135,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'pokebowls',
    nutritionalValues: {
      calories: 430,
      protein: 18,
      carbs: 56,
      fat: 14,
      sugar: 8,
      salt: 1.8
    },
    allergens: ['Skaldjur', 'Gluten', 'Soja', 'Sesam']
  },
  {
    id: '20',
    name: 'Vegan Bowl',
    description: 'En helt växtbaserad bowl med tofu inari, kombinerat med mango, sjögräs, gurka, kimchi, inlagd rödlök, edamame och salladsmix. En näringsrik och färgstark rätt som bevisar att veganskt kan vara både mättande och inspirerande.',
    price: 129,
    image: 'https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'pokebowls',
    nutritionalValues: {
      calories: 380,
      protein: 14,
      carbs: 62,
      fat: 10,
      sugar: 9,
      salt: 1.5
    },
    allergens: ['Soja', 'Sesam']
  },
  {
    id: '21',
    name: 'Veggo',
    description: 'Friterad halloumi blandas med mango, sjögräs, gurka, kimchi, inlagd rödlök, edamame och salladsmix. En oväntad twist för ostälskare som söker en balanserad och smakrik pokébowl.',
    price: 135,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'pokebowls',
    nutritionalValues: {
      calories: 420,
      protein: 16,
      carbs: 54,
      fat: 16,
      sugar: 8,
      salt: 1.9
    },
    allergens: ['Mjölk', 'Soja', 'Sesam']
  },
  {
    id: '22',
    name: 'Chicken Sallad',
    description: 'Tärnad kyckling blandas med färska grönsaker i en lätt sallad som är både näringsrik och smakfull. En idealisk rätt för den som vill ha något fräscht och enkelt.',
    price: 119,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'pokebowls',
    nutritionalValues: {
      calories: 320,
      protein: 22,
      carbs: 30,
      fat: 12,
      sugar: 5,
      salt: 1.4
    },
    allergens: []
  },
  {
    id: '23',
    name: 'Shrimp Bowl',
    description: 'Handskalade räkor serveras med en balanserad mix av grönsaker och andra noggrant utvalda ingredienser. En elegant bowl som tar dig direkt till autentisk japansk smak.',
    price: 145,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'pokebowls',
    nutritionalValues: {
      calories: 360,
      protein: 20,
      carbs: 48,
      fat: 10,
      sugar: 6,
      salt: 1.6
    },
    allergens: ['Skaldjur', 'Soja', 'Sesam']
  },

  // Nigiri Combo
  {
    id: '24',
    name: 'Nigiri Mix 8 Bitar',
    description: '8 bitar med en kockutvald blandning av nigiri, där varje bit speglar en unik kombination av färska ingredienser. En perfekt introduktion till vår nigiri-fusion.',
    price: 109,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'combo',
    nutritionalValues: {
      calories: 320,
      protein: 16,
      carbs: 50,
      fat: 6,
      sugar: 2,
      salt: 1.5
    },
    allergens: ['Fisk', 'Skaldjur', 'Soja', 'Sesam']
  },
  {
    id: '25',
    name: 'Nigiri Mix 14 Bitar',
    description: 'En generös sats med 14 bitar där kockens kreativitet och passion går igenom i varje detalj. En rik variation som passar den som vill uppleva allt på en gång.',
    price: 169,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'combo',
    nutritionalValues: {
      calories: 560,
      protein: 28,
      carbs: 88,
      fat: 10,
      sugar: 3,
      salt: 2.6
    },
    allergens: ['Fisk', 'Skaldjur', 'Soja', 'Sesam']
  },
  {
    id: '26',
    name: 'Omakase Sushi – Munchies 8 Bitar',
    description: 'En spännande mix av 4 maki och 4 nigiri, designad för att ta dig med på en smakresa där kockens rekommendationer lyser starkt. En perfekt balans mellan tradition och innovation.',
    price: 89,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'combo',
    nutritionalValues: {
      calories: 280,
      protein: 12,
      carbs: 46,
      fat: 6,
      sugar: 2,
      salt: 1.3
    },
    allergens: ['Fisk', 'Skaldjur', 'Soja', 'Sesam']
  },
  {
    id: '27',
    name: 'Single 12 Bitar',
    description: 'Med 8 maki och 4 nigiri erbjuder denna sats en välavvägd kombination för den som önskar en mindre portion men med full smak. Varje bit är noggrant tillagad för optimal njutning.',
    price: 139,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'combo',
    nutritionalValues: {
      calories: 420,
      protein: 18,
      carbs: 70,
      fat: 8,
      sugar: 3,
      salt: 1.8
    },
    allergens: ['Fisk', 'Skaldjur', 'Soja', 'Sesam']
  },
  {
    id: '28',
    name: 'Hungry 16 Bitar',
    description: '8 maki och 8 nigiri i en sats som är gjord för den stora sushilusten. En mångsidig blandning som ger dig möjlighet att njuta av en rad olika smaker i varje tugga.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'combo',
    nutritionalValues: {
      calories: 560,
      protein: 24,
      carbs: 94,
      fat: 10,
      sugar: 4,
      salt: 2.4
    },
    allergens: ['Fisk', 'Skaldjur', 'Soja', 'Sesam']
  },
  {
    id: '29',
    name: 'Duo 20 Bitar',
    description: '12 maki och 8 nigiri – perfekt för att dela med en vän. Denna sats kombinerar traditionella inslag med en modern twist, vilket skapar en oförglömlig upplevelse.',
    price: 249,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'combo',
    nutritionalValues: {
      calories: 680,
      protein: 28,
      carbs: 116,
      fat: 12,
      sugar: 5,
      salt: 3.0
    },
    allergens: ['Fisk', 'Skaldjur', 'Soja', 'Sesam']
  },
  {
    id: '30',
    name: 'Company 30 Bitar',
    description: '16 maki och 14 nigiri – en omfattande sats som passar perfekt för företagsevenemang eller större sällskap. Här får du en bred palett av smaker att njuta av tillsammans.',
    price: 349,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'combo',
    nutritionalValues: {
      calories: 980,
      protein: 42,
      carbs: 168,
      fat: 18,
      sugar: 7,
      salt: 4.2
    },
    allergens: ['Fisk', 'Skaldjur', 'Soja', 'Sesam']
  },
  {
    id: '31',
    name: 'Gathering 40 Bitar',
    description: '24 maki och 16 nigiri, designade för att delas med vänner och familj. En generös blandning som inbjuder till gemenskap och festlig stämning.',
    price: 449,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'combo',
    nutritionalValues: {
      calories: 1280,
      protein: 56,
      carbs: 220,
      fat: 24,
      sugar: 9,
      salt: 5.6
    },
    allergens: ['Fisk', 'Skaldjur', 'Soja', 'Sesam']
  },
  {
    id: '32',
    name: 'Family 50 Bitar',
    description: '32 maki och 18 nigiri – en riktig familjefest med en balanserad mix av klassiska och kreativa sushibitar. Perfekt för att njuta tillsammans i goda vänners lag.',
    price: 549,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'combo',
    nutritionalValues: {
      calories: 1580,
      protein: 68,
      carbs: 274,
      fat: 30,
      sugar: 11,
      salt: 7.0
    },
    allergens: ['Fisk', 'Skaldjur', 'Soja', 'Sesam']
  },
  {
    id: '33',
    name: 'Party 100 Bitar',
    description: 'En imponerande sats med 64 maki och 36 nigiri, skapad för de stora festligheterna. Här möts tradition, innovation och generositet i varje bit.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'combo',
    nutritionalValues: {
      calories: 3160,
      protein: 136,
      carbs: 548,
      fat: 60,
      sugar: 22,
      salt: 14.0
    },
    allergens: ['Fisk', 'Skaldjur', 'Soja', 'Sesam']
  },

  // Exotiska Delikatesser
  {
    id: '34',
    name: 'Sashimi Lax 10 Bitar',
    description: 'Tunna, färska bitar av lax som framhäver fiskens rena och delikata smak. En elegant rätt som är lika visuellt tilltalande som den är smakfull.',
    price: 139,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'delikatesser',
    nutritionalValues: {
      calories: 220,
      protein: 30,
      carbs: 0,
      fat: 12,
      sugar: 0,
      salt: 0.8
    },
    allergens: ['Fisk']
  },
  {
    id: '35',
    name: 'Yakiniku',
    description: 'Skivad och marinerad biff serverad med ris, salladsmix, chilimajonnäs och teriyaki. En rätt som förenar det bästa från japansk och västerländsk matlagning för en rik och intensiv smakupplevelse.',
    price: 139,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'delikatesser',
    nutritionalValues: {
      calories: 480,
      protein: 26,
      carbs: 58,
      fat: 16,
      sugar: 10,
      salt: 2.2
    },
    allergens: ['Soja', 'Sesam', 'Ägg']
  },
  {
    id: '36',
    name: 'EbiFry',
    description: 'Tempura-friterade räkor med ris, teriyakisås, chilimajonnäs, inlagd rödlök, gurka och salladsmix. En harmonisk rätt där krispighet möter en fyllig såsig rikedom.',
    price: 139,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'delikatesser',
    nutritionalValues: {
      calories: 460,
      protein: 18,
      carbs: 62,
      fat: 14,
      sugar: 8,
      salt: 2.0
    },
    allergens: ['Skaldjur', 'Gluten', 'Soja', 'Sesam', 'Ägg']
  },

  // Barnmenyer
  {
    id: '37',
    name: '8 Bitar Risbollar – Helt Naturella',
    description: 'Små, naturella risbollar som är anpassade för de små. En enkel och smakfull rätt som ger energi och glädje.',
    price: 39,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'barn',
    nutritionalValues: {
      calories: 160,
      protein: 3,
      carbs: 36,
      fat: 0,
      sugar: 0,
      salt: 0.2
    },
    allergens: []
  },
  {
    id: '38',
    name: 'Ris, Kyckling, Gurka & Mango',
    description: 'En balanserad rätt med mjuka risbitar, tärnad kyckling, färsk gurka och söt mango. Speciellt framtagen för att passa barns smaklökar med en lätt och näringsrik komposition.',
    price: 75,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'barn',
    nutritionalValues: {
      calories: 280,
      protein: 14,
      carbs: 48,
      fat: 4,
      sugar: 6,
      salt: 0.6
    },
    allergens: []
  },

  // Smått Och Gott
  {
    id: '39',
    name: 'Wakamesallad & Sjögräs',
    description: 'En frisk sallad med wakame och sjögräs som ger en lätt och uppfriskande start på måltiden. Perfekt som förrätt eller sidorätt för att väcka aptiten.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'smatt',
    nutritionalValues: {
      calories: 60,
      protein: 2,
      carbs: 10,
      fat: 2,
      sugar: 1,
      salt: 1.0
    },
    allergens: ['Soja', 'Sesam']
  },
  {
    id: '40',
    name: 'Steamed Edamame Kryddad',
    description: 'Ångade edamamebönor med en kryddig touch som sätter extra sting på smaken. En favorit bland sushiälskare som älskar en liten extra kick.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'smatt',
    nutritionalValues: {
      calories: 120,
      protein: 10,
      carbs: 10,
      fat: 5,
      sugar: 2,
      salt: 0.8
    },
    allergens: ['Soja']
  },
  {
    id: '41',
    name: 'Steamed Edamame Saltad',
    description: 'Klassiska ångade edamamebönor med en lagom dos salt för att framhäva deras naturliga smak. Enkel men oemotståndlig i sin renhet.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'smatt',
    nutritionalValues: {
      calories: 120,
      protein: 10,
      carbs: 10,
      fat: 5,
      sugar: 2,
      salt: 1.0
    },
    allergens: ['Soja']
  },
  {
    id: '42',
    name: 'Avokai',
    description: 'Två halvor av krämig avokado serverade med en smakrik laxröra. En elegant rätt som kombinerar friskhet med en mjuk, len konsistens.',
    price: 69,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'smatt',
    nutritionalValues: {
      calories: 220,
      protein: 12,
      carbs: 6,
      fat: 18,
      sugar: 1,
      salt: 0.9
    },
    allergens: ['Fisk']
  },
  {
    id: '43',
    name: 'Gyoza Kyckling',
    description: '5 friterade dumplings fyllda med saftig kyckling och aromatiska kryddor. En spröd och smakfull upplevelse som lockar med både crunch och fyllighet.',
    price: 65,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'smatt',
    nutritionalValues: {
      calories: 280,
      protein: 14,
      carbs: 32,
      fat: 12,
      sugar: 2,
      salt: 1.2
    },
    allergens: ['Gluten', 'Soja', 'Sesam']
  },
  {
    id: '44',
    name: 'Gyoza Vegansk',
    description: '5 friterade dumplings med en växtbaserad fyllning, rik på smak och textur. Perfekt för dig som föredrar ett veganskt alternativ utan att kompromissa med smaken.',
    price: 65,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'smatt',
    nutritionalValues: {
      calories: 260,
      protein: 8,
      carbs: 34,
      fat: 10,
      sugar: 3,
      salt: 1.0
    },
    allergens: ['Gluten', 'Soja', 'Sesam']
  },
  {
    id: '45',
    name: 'Gyoza Räka',
    description: '5 friterade dumplings med en lätt och delikat räkinspiration. En rätt som kombinerar havets friskhet med en krispig yta.',
    price: 65,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'smatt',
    nutritionalValues: {
      calories: 270,
      protein: 12,
      carbs: 32,
      fat: 11,
      sugar: 2,
      salt: 1.3
    },
    allergens: ['Skaldjur', 'Gluten', 'Soja', 'Sesam']
  },
  {
    id: '46',
    name: 'Shrimptempura',
    description: '5 friterade räkor med en luftig tempurabotten, serverade med en liten fräsch sallad. En underbar blandning av krispigt och mjukt som gör varje tugga speciell.',
    price: 75,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'smatt',
    nutritionalValues: {
      calories: 320,
      protein: 14,
      carbs: 30,
      fat: 16,
      sugar: 1,
      salt: 1.2
    },
    allergens: ['Skaldjur', 'Gluten', 'Ägg']
  },
  {
    id: '47',
    name: 'Misosoppa',
    description: 'En klassisk misosoppa med rik umamismak och en värmande känsla. Perfekt som en mjuk start eller avslutning på en måltid.',
    price: 39,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'smatt',
    nutritionalValues: {
      calories: 80,
      protein: 5,
      carbs: 8,
      fat: 3,
      sugar: 1,
      salt: 1.5
    },
    allergens: ['Soja']
  },

  // Såser
  {
    id: '48',
    name: 'Chilimajonäs',
    description: 'En krämig sås med en tydlig kryddighet som lyfter varje rätt med en extra dos hetta. En favoritsmak för den äventyrlige.',
    price: 15,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'saser',
    nutritionalValues: {
      calories: 120,
      protein: 1,
      carbs: 2,
      fat: 12,
      sugar: 1,
      salt: 0.5
    },
    allergens: ['Ägg']
  },
  {
    id: '49',
    name: 'Söt Sojasås',
    description: 'En söt och fyllig sojasås som ger en harmonisk smakförstärkning till dina rätter. En klassiker med en modern touch.',
    price: 15,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'saser',
    nutritionalValues: {
      calories: 40,
      protein: 2,
      carbs: 8,
      fat: 0,
      sugar: 6,
      salt: 1.2
    },
    allergens: ['Soja', 'Vete']
  },

  // Drycker
  {
    id: '50',
    name: 'Coca-Cola 33 cl',
    description: 'En klassisk, bubblande läskedryck med en tidlös smak som kompletterar måltiden perfekt.',
    price: 20,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'drycker',
    nutritionalValues: {
      calories: 139,
      protein: 0,
      carbs: 35,
      fat: 0,
      sugar: 35,
      salt: 0
    },
    allergens: []
  },
  {
    id: '51',
    name: 'Coca-Cola Zero 33 cl',
    description: 'Den sockerfria versionen av den ikoniska läsken, med samma uppfriskande smak och karaktär.',
    price: 20,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'drycker',
    nutritionalValues: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      sugar: 0,
      salt: 0
    },
    allergens: []
  },
  {
    id: '52',
    name: 'Fanta 33 cl',
    description: 'En fruktig och bubblande dryck med en söt och livlig smak som passar till alla typer av måltider.',
    price: 20,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'drycker',
    nutritionalValues: {
      calories: 138,
      protein: 0,
      carbs: 33,
      fat: 0,
      sugar: 33,
      salt: 0
    },
    allergens: []
  },
  {
    id: '53',
    name: 'Fanta Exotic 33 cl',
    description: 'En exotisk variant med toner av tropiska frukter, som tar dig med på en smakresa med varje klunk.',
    price: 20,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'drycker',
    nutritionalValues: {
      calories: 140,
      protein: 0,
      carbs: 34,
      fat: 0,
      sugar: 34,
      salt: 0
    },
    allergens: []
  },
  {
    id: '54',
    name: 'Pepsi max 33 cl',
    description: 'En sockerfri Pepsi med maximal smak, perfekt för den som vill ha allt utan socker.',
    price: 20,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'drycker',
    nutritionalValues: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      sugar: 0,
      salt: 0
    },
    allergens: []
  },
  {
    id: '55',
    name: 'Sprite 33 cl',
    description: 'En citron-lime läsk med en frisk och klar smak – lätt och uppfriskande vid varje tillfälle.',
    price: 20,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'drycker',
    nutritionalValues: {
      calories: 135,
      protein: 0,
      carbs: 33,
      fat: 0,
      sugar: 33,
      salt: 0
    },
    allergens: []
  },
  {
    id: '56',
    name: 'Ramlösa 33 cl',
    description: 'Naturligt kolsyrat vatten med en ren och uppfriskande smak, ett hälsosamt val för törstsläckning.',
    price: 20,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'drycker',
    nutritionalValues: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      sugar: 0,
      salt: 0
    },
    allergens: []
  },
  {
    id: '57',
    name: 'Ramlösa Citrus 33 cl',
    description: 'Kolsyrat vatten med en hint av citrus, vilket ger en fräsch twist på en klassisk dryck.',
    price: 20,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'drycker',
    nutritionalValues: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      sugar: 0,
      salt: 0
    },
    allergens: []
  },
  {
    id: '58',
    name: 'Pacha – Fruktiga Favoriter',
    description: 'En läskedryck med en mix av fruktiga smaker som Peach, Mojito, Strawberry, Lychee, Apple och Melon – en festlig och uppfriskande dryck som lyfter hela måltiden.',
    price: 25,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'drycker',
    nutritionalValues: {
      calories: 120,
      protein: 0,
      carbs: 30,
      fat: 0,
      sugar: 28,
      salt: 0
    },
    allergens: []
  },

  // Nigiri i Par
  {
    id: '59',
    name: 'Tofu',
    description: 'Två bitar med mjuk tofu som erbjuder en mild, fyllig smak. Ett perfekt alternativ för dig som söker ett lättare inslag i din nigiri.',
    price: 30,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'nigiriPar',
    nutritionalValues: {
      calories: 70,
      protein: 4,
      carbs: 12,
      fat: 1,
      sugar: 0,
      salt: 0.3
    },
    allergens: ['Soja']
  },
  {
    id: '60',
    name: 'Tamago (Omelett)',
    description: 'Två bitar av söt, fluffig omelett som smälter i munnen och ger en härlig kontrast till övriga nigiribitar.',
    price: 30,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'nigiriPar',
    nutritionalValues: {
      calories: 90,
      protein: 5,
      carbs: 14,
      fat: 2,
      sugar: 2,
      salt: 0.4
    },
    allergens: ['Ägg', 'Soja']
  },
  {
    id: '61',
    name: 'Gurka',
    description: 'Två krispiga bitar av färsk gurka som tillför en frisk och ren smak, vilket ger en fin balans i din nigiri-upplevelse.',
    price: 30,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'nigiriPar',
    nutritionalValues: {
      calories: 60,
      protein: 1,
      carbs: 14,
      fat: 0,
      sugar: 0,
      salt: 0.2
    },
    allergens: []
  },
  {
    id: '62',
    name: 'Surimi',
    description: 'Två bitar med ett mildt fiskbaserat alternativ, surimi, som är perfekt för dig som vill prova något annorlunda.',
    price: 30,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'nigiriPar',
    nutritionalValues: {
      calories: 80,
      protein: 4,
      carbs: 14,
      fat: 1,
      sugar: 1,
      salt: 0.6
    },
    allergens: ['Fisk', 'Skaldjur', 'Ägg']
  },
  {
    id: '63',
    name: 'Lax',
    description: 'Två bitar med färsk, delikat lax som erbjuder en rik och naturlig smak, en självklar favorit bland nigiriälskare.',
    price: 30,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'nigiriPar',
    nutritionalValues: {
      calories: 90,
      protein: 6,
      carbs: 12,
      fat: 2,
      sugar: 0,
      salt: 0.4
    },
    allergens: ['Fisk']
  },
  {
    id: '64',
    name: 'Räka',
    description: 'Två bitar med klassiska räkor, noggrant utvalda för sin fräschör, som tillsammans skapar en harmonisk smakupplevelse.',
    price: 30,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'nigiriPar',
    nutritionalValues: {
      calories: 80,
      protein: 5,
      carbs: 12,
      fat: 1,
      sugar: 0,
      salt: 0.5
    },
    allergens: ['Skaldjur']
  },
  {
    id: '65',
    name: 'Avokado',
    description: 'Två bitar med krämig avokado som ger en len och fyllig konsistens, ett perfekt komplement till de övriga nigiribitarna.',
    price: 30,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'nigiriPar',
    nutritionalValues: {
      calories: 85,
      protein: 1,
      carbs: 12,
      fat: 4,
      sugar: 0,
      salt: 0.2
    },
    allergens: []
  },
  {
    id: '66',
    name: 'Flamberad Lax',
    description: 'Två bitar med flamberad lax, vars lätt brända yta tillför en extra dimension av smak och textur – en modern twist på traditionell nigiri.',
    price: 35,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'nigiriPar',
    nutritionalValues: {
      calories: 95,
      protein: 6,
      carbs: 12,
      fat: 2,
      sugar: 0,
      salt: 0.4
    },
    allergens: ['Fisk']
  },
  {
    id: '67',
    name: 'Flamberad Räka',
    description: 'Två bitar med flamberad räka där den delikata, lätt rostade ytan lyfter den naturliga räksmaken till nya höjder – ett måste för den äventyrlige.',
    price: 35,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'nigiriPar',
    nutritionalValues: {
      calories: 85,
      protein: 5,
      carbs: 12,
      fat: 1,
      sugar: 0,
      salt: 0.5
    },
    allergens: ['Skaldjur']
  },
];

export const locations = [
  { id: 'trelleborg', name: 'Trelleborg', address: 'Corfitz-Beck-Friisgatan 5B, 231 43, Trelleborg', fullMenu: true },
  { id: 'ystad', name: 'Ystad', address: 'Stora Östergatan 39, 271 35, Ystad', fullMenu: false, onlyPokebowl: true },
  { id: 'malmo', name: 'Malmö', address: 'Öppnar snart!', comingSoon: true },
];