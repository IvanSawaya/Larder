export const PRODUCTS = [
  {id:1, name:"Ceylon Cinnamon Quills", cat:"Spices", origin:"Sri Lanka", flag:"🇱🇰", harvest:"Spring 2026", price:9.50, dietary:["Vegan","Gluten-Free"], heat:0, icon:"🪵",
    desc:"True cinnamon bark, hand-rolled by a fourth-generation family plantation near Galle. Delicate, citrusy, nothing like supermarket cassia."},
  {id:2, name:"Kashmiri Chili Powder", cat:"Spices", origin:"India", flag:"🇮🇳", harvest:"Fall 2025", price:8.00, sale:6.80, dietary:["Vegan","Gluten-Free"], heat:2, icon:"🌶️",
    desc:"Brilliant crimson color with a gentle, fruity heat — built for curries and tandoori marinades that need color without punishing spice."},
  {id:3, name:"Smoked Applewood Paprika", cat:"Spices", origin:"USA", flag:"🇺🇸", harvest:"Summer 2025", price:7.25, dietary:["Vegan","Gluten-Free","Organic"], heat:1, icon:"🔥",
    desc:"Cold-smoked over applewood for three days at a small Vermont mill. Deep, sweet smoke that finishes almost like bacon."},
  {id:4, name:"Wild Malabar Peppercorns", cat:"Spices", origin:"India", flag:"🇮🇳", harvest:"Winter 2025", price:11.00, dietary:["Vegan","Gluten-Free"], heat:1, icon:"⚫",
    desc:"Foraged, not farmed — wild vines along the Malabar coast. Bright, resinous heat with a citrus finish few peppercorns have."},
  {id:5, name:"Alleppey Finger Turmeric", cat:"Spices", origin:"India", flag:"🇮🇳", harvest:"Spring 2026", price:6.50, sale:5.20, dietary:["Vegan","Gluten-Free","Organic"], heat:0, icon:"🟡",
    desc:"The highest-curcumin turmeric we've tasted — earthy, almost peppery. Ground fresh in small batches so it never goes dusty.",
    founder:"I tried eleven turmerics before I found this farm. This is the one that made me start Larder. — Alex, founder"},
  {id:6, name:"Sicilian Frantoio Olive Oil", cat:"Oils", origin:"Italy", flag:"🇮🇹", harvest:"Autumn 2025 press", price:24.00, dietary:["Vegan","Organic"], heat:0, icon:"🫒",
    desc:"First cold press from a single grove outside Trapani. Grassy and peppery, with the kind of bite that means it's actually fresh."},
  {id:7, name:"Toasted Sesame Oil", cat:"Oils", origin:"Japan", flag:"🇯🇵", harvest:"2025 press", price:14.50, dietary:["Vegan"], heat:0, icon:"🌰",
    desc:"Stone-toasted and slow-pressed for a nutty, almost caramel aroma. A few drops finishes a dish better than a whole splash of most."},
  {id:8, name:"Cold-Pressed Argan Oil", cat:"Oils", origin:"Morocco", flag:"🇲🇦", harvest:"2025", price:28.00, sale:22.40, dietary:["Vegan","Organic"], heat:0, icon:"💧",
    desc:"Culinary-grade, hand-cracked by a women's cooperative in the Souss Valley. Toasty and rich — beautiful drizzled over grains."},
  {id:9, name:"Bhutanese Red Rice", cat:"Grains", origin:"Bhutan", flag:"🇧🇹", harvest:"2025", price:9.00, dietary:["Vegan","Gluten-Free"], heat:0, icon:"🌾",
    desc:"Grown at altitude in the Paro Valley. Nutty and slightly sweet, with a chew closer to farro than white rice."},
  {id:10, name:"Heirloom Umbrian Farro", cat:"Grains", origin:"Italy", flag:"🇮🇹", harvest:"2025", price:8.50, dietary:["Vegan"], heat:0, icon:"🌿",
    desc:"An ancient wheat variety grown on the same hillside terraces for generations. Holds its bite beautifully in soups and salads."},
  {id:11, name:"Black Quinoa", cat:"Grains", origin:"Peru", flag:"🇵🇪", harvest:"2025", price:10.00, dietary:["Vegan","Gluten-Free","Organic"], heat:0, icon:"⚫",
    desc:"Grown by a farming collective above 3,000m in the Andes. Earthier and crunchier than the white quinoa you're used to."},
  {id:12, name:"Calabrian Chili Paste", cat:"Sauces", origin:"Italy", flag:"🇮🇹", harvest:"2025", price:12.00, dietary:["Vegan","Gluten-Free"], heat:3, icon:"🌶️",
    desc:"Sun-ripened Calabrian chilies, crushed with oil and sea salt. Fruity and genuinely hot — a spoonful transforms pasta or eggs.",
    founder:"I keep a jar of this open on my own counter at all times. Fair warning. — Alex, founder"},
  {id:13, name:"Aged Three-Crab Fish Sauce", cat:"Sauces", origin:"Vietnam", flag:"🇻🇳", harvest:"Aged 2 years", price:16.00, dietary:["Gluten-Free"], heat:0, icon:"🦀",
    desc:"Barrel-aged on Phu Quoc island for two full years. Deep umami without the sharp, fishy edge of mass-market brands."},
  {id:14, name:"Smoked Chipotle Salsa", cat:"Sauces", origin:"Mexico", flag:"🇲🇽", harvest:"2025", price:9.75, sale:7.80, dietary:["Vegan","Gluten-Free"], heat:2, icon:"🍅",
    desc:"Slow-smoked jalapeños and vine tomatoes, blended small-batch in Oaxaca. Smoky first, then a warm, rolling heat."},
  {id:15, name:"Wild Meyer Lemon Preserve", cat:"Sauces", origin:"Morocco", flag:"🇲🇦", harvest:"2025", price:13.00, dietary:["Vegan","Gluten-Free","Organic"], heat:0, icon:"🍋",
    desc:"Salt-cured for six weeks the traditional way. Floral and tangy — the secret ingredient in a really good tagine."},
];

export const CATEGORIES = ["Spices","Oils","Grains","Sauces"];
export const CAT_LABELS = {Spices:"Spices", Oils:"Oils", Grains:"Grains", Sauces:"Sauces & Condiments"};
export const ORIGINS = [...new Set(PRODUCTS.map(p=>p.origin))].sort();
export const DIETARY = ["Vegan","Gluten-Free","Organic"];
export const HEAT_LEVELS = [
  {v:0,label:"None"},{v:1,label:"Mild"},{v:2,label:"Medium"},{v:3,label:"Hot"}
];

export function heatFlames(level){
  if(level===0) return "—";
  return "🔥".repeat(level);
}
export function money(n){ return "$" + n.toFixed(2); }
