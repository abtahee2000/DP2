// High-Fidelity Sandbox Simulation Datasets & Fallback Helpers for Chandergari

export const OFFLINE_IMAGES: Record<string, string> = {
  singapore: "https://images.unsplash.com/photo-1506461883276-594a12b11cc3?q=80&w=1000&auto=format&fit=crop",
  marina: "https://images.unsplash.com/photo-1506461883276-594a12b11cc3?q=80&w=1000&auto=format&fit=crop",
  kyoto: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop",
  temple: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop",
  louise: "https://images.unsplash.com/photo-1483168527879-c66136b56105?q=80&w=1000&auto=format&fit=crop",
  banff: "https://images.unsplash.com/photo-1483168527879-c66136b56105?q=80&w=1000&auto=format&fit=crop",
  paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop",
  scenery: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop",
  general: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop"
};

export const OFFLINE_ITINERARIES: Record<string, any> = {
  singapore: {
    itineraryText: `## 🇸🇬 3-Day Singapore Ultra-Modern Explorer (Offline Simulation)
*Type: Comfort Standard | Coordinates: 1.287° N, 103.859° E*

### 🗓️ Day 1: Downtown Core & Singapore Skyline
- **09:00 AM** — Start at **Merlion Park** for a stunning harbor view and classic photos.
- **11:00 AM** — Walk across the artistic **Helix Bridge** to the iconic **ArtScience Museum**.
- **01:00 PM** — Casual tech dining at **Marina Bay Sands Shoppes** food atrium.
- **03:00 PM** — Embark on a spectacular nature walk at **Gardens by the Bay** (visit Flower Dome & Cloud Forest).
- **07:30 PM** — Witness the breathtaking **Supertree Grove Light Show (OCBC Garden Rhapsody)**.
- **08:30 PM** — Dinner at **Lau Pa Sat outdoor street stalls** for authentic satay skewers and laksa.

### 🗓️ Day 2: Cultural Heritage Paths (Chinatown & Little India)
- **09:30 AM** — Explore the splendid architecture of the **Buddha Tooth Relic Temple** in historic Chinatown.
- **11:30 AM** — Walk around the colorful murals of **Haji Lane** and Haji street art.
- **01:30 PM** — Indulge in local Hainanese chicken rice at legendary **Maxwell Food Centre**.
- **04:00 PM** — Spend the afternoon on **Sentosa Island** or relax at Palawan Beach.
- **07:00 PM** — Dinner at Little India, trying freshly-made Butter Naan and rich tandoori dishes.

### 🗓️ Day 3: Modern Conservation & Botanical Gardens
- **08:30 AM** — Stroll through the lush trails of **Singapore Botanic Gardens** (UNESCO World Heritage Site).
- **11:00 AM** — Wander around **Orchard Road** premier shopping and sensory gardens.
- **02:00 PM** — Visit the spectacular **Jewel Changi Airport** and witness the HSBC Rain Vortex waterfall.
- **05:00 PM** — Prepare luggage and coordinate departure transfer to Changi Terminal.`,
    groundingUrls: [
      { title: "Official Singapore Tourism Portal", url: "https://www.visitsingapore.com/" },
      { title: "Gardens by the Bay Event Timelines", url: "https://www.gardensbythebay.com.sg/" }
    ],
    mapsUrls: [
      { title: "Marina Bay Sands Map", url: "https://maps.google.com/?q=Marina+Bay+Sands+Singapore" },
      { title: "Gardens by the Bay Map", url: "https://maps.google.com/?q=Gardens+by+the+Bay+Singapore" }
    ]
  },
  kyoto: {
    itineraryText: `## 🇯🇵 3-Day Kyoto Cultural Heritage Tour (Offline Simulation)
*Type: Comfort Standard | Coordinates: 35.011° N, 135.768° E*

### 🗓️ Day 1: Golden Temples & Historic Shrines
- **08:30 AM** — Ascend **Kinkaku-ji (The Golden Pavilion)** early to witness reflections across the lake.
- **11:00 AM** — Wander the rock garden paths of **Ryoan-ji Temple**.
- **01:00 PM** — Savor traditional Kyoto tofu or bento lunch near the shrine gardens.
- **03:00 PM** — Head to Gion historic district for traditional architectural views and wooden streets.
- **07:00 PM** — Dinner in Gion; look out for Geisha sightings and enjoy a seasonal dinner by the Kamogawa River.

### 🗓️ Day 2: Arashiyama Bamboo Grove & Scenic Pass
- **08:00 AM** — Early morning stroll down the legendary **Arashiyama Bamboo Forest**.
- **10:30 AM** — Cross the historic Togetsukyo Bridge.
- **01:00 PM** — Savor direct traditional soba and udon culinary options.
- **03:00 PM** — Feed playful deer and hike up to the Arashiyama Monkey Park Iwatayama.
- **06:30 PM** — Traditional dinner at a local Izakaya under atmospheric wooden hanging lanterns.

### 🗓️ Day 3: Tori Paths & Kiyomizu-dera Heights
- **07:30 AM** — Beat the afternoon crowds at **Fushimi Inari-taisha**; hike through thousands of red Torii gates.
- **11:30 AM** — Ascend the vibrant streets of Sannenzaka toward the iconic hilltop **Kiyomizu-dera Temple**.
- **02:30 PM** — Sip matcha green tea accompanied by visual mochi sweets in a traditional wooden tea house.
- **06:00 PM** — Dine near Pontocho Alley to wrap up your memorable Kyoto legacy.`,
    groundingUrls: [
      { title: "Kyoto Tourism Official Guide", url: "https://www.kyoto.travel/en/" },
      { title: "Fushimi Inari Shrine Access Guide", url: "http://www.inari.jp/en/" }
    ],
    mapsUrls: [
      { title: "Kinkakuji Golden Temple Map", url: "https://maps.google.com/?q=Kinkaku-ji+Kyoto" },
      { title: "Fushimi Inari Shrine Map", url: "https://maps.google.com/?q=Fushimi+Inari+Taisha+Kyoto" }
    ]
  },
  banff: {
    itineraryText: `## 🇨🇦 3-Day Banff & Lake Louise Mountain Retreat (Offline Simulation)
*Type: Comfort Standard | Coordinates: 51.425° N, -116.177° W*

### 🗓️ Day 1: Turquoise Waters of Lake Louise
- **07:00 AM** — Arrive at **Lake Louise** early for the serene glassy morning reflection of mountain peaks.
- **09:30 AM** — Hike to the **Lake Agnes Tea House** for warm baked treats and dynamic high altitude panoramic sights.
- **01:00 PM** — Rent a classic red canoe to paddle across the legendary turquoise waters.
- **03:30 PM** — Drive to the spectacular glacier viewpoint at **Moraine Lake**.
- **06:30 PM** — Comfort dinner near Banff Town center.

### 🗓️ Day 2: Banff Town & Peak Gondola
- **09:00 AM** — Hike through the roaring limestone gorge of **Johnston Canyon** to view the lower waterfalls.
- **12:30 PM** — Lunch at a cozy lodge in Banff historic village.
- **02:30 PM** — Take the legendary **Banff Gondola** up to Sulphur Mountain summit.
- **05:00 PM** — Relax in the soothing thermal mineral waters at **Banff Upper Hot Springs**.
- **07:30 PM** — Savory dinner at a local mountain grill featuring Alberta bison and trout coordinates.

### 🗓️ Day 3: Icefields Parkway Adventure
- **08:30 AM** — Head down the stunning scenic highway of Icefields Parkway.
- **10:30 AM** — Behold the massive majestic **Bow Lake** glacier peaks.
- **01:00 PM** — Savor packaged picnic options near Peyto Lake's fox-shaped blue shores.
- **04:00 PM** — Prepare for checking out of the lodge and route transit back to Calgary Airport.`,
    groundingUrls: [
      { title: "Banff National Park Service Hub", url: "https://www.pc.gc.ca/en/pn-np/ab/banff" },
      { title: "Lake Louise Shuttle Transit schedules", url: "https://banfflakelouise.com" }
    ],
    mapsUrls: [
      { title: "Lake Louise Shore Map", url: "https://maps.google.com/?q=Lake+Louise+Banff" },
      { title: "Banff Gondola Summit Terminal", url: "https://maps.google.com/?q=Banff+Gondola" }
    ]
  },
  paris: {
    itineraryText: `## 🇫🇷 3-Day Paris Art & Bistro Promenade (Offline Simulation)
*Type: Comfort Standard | Coordinates: 48.856° N, 2.352° E*

### 🗓️ Day 1: Iconic Paris Monuments & Seine Cruise
- **09:00 AM** — Witness the magnificent scale of the **Eiffel Tower** from Trocadéro Gardens.
- **11:00 AM** — Walk across Arc de Triomphe and down the high fashion Avenue des Champs-Élysées.
- **01:00 PM** — Savor buttery escargots or freshly baked croque-monsieur at a sidewalk café.
- **03:00 PM** — Explore massive art galleries and see Mona Lisa at the historic **Louvre Museum**.
- **07:30 PM** — Climb aboard an evening luxury glass boat for a scenic **Seine River Cruise** to watch monuments light up.

### 🗓️ Day 2: Montmartre Artisans & Heights
- **09:30 AM** — Stroll the cobblestone bohemian alleys of Montmartre and visit local street artists at Place du Tertre.
- **11:30 AM** — Enter the stunning white marble dome of **Sacré-Cœur Basilica** for panoramic city views.
- **01:30 PM** — Savor French crepes and hot espresso at a vintage corner bistro.
- **03:30 PM** — Wander past historical wind-mills and vineyards of Montmartre.
- **07:00 PM** — Live cabaret theater experience or candle-lit dinner near the cozy alleyways.

### 🗓️ Day 3: Seine Left Bank & Latin Quarter
- **09:00 AM** — Grab fresh pain au chocolat from a boulangerie while surveying Notre-Dame Cathedral.
- **11:00 AM** — Browse vintage open-air booksellers (Bouquinistes) along the river banks.
- **01:00 PM** — Picnic in the majestic **Luxembourg Gardens** next to the Medici Fountain.
- **03:00 PM** — Wander historic bookshops of Saint-Germain-des-Prés.
- **06:00 PM** — Wrap up with a classic French bistro dinner, pairing beef bourguignon with local vintage wines.`,
    groundingUrls: [
      { title: "Paris Tourism official board", url: "https://en.parisinfo.com/" },
      { title: "Louvre Ticket Reservations Guide", url: "https://www.louvre.fr/en" }
    ],
    mapsUrls: [
      { title: "Eiffel Tower Map", url: "https://maps.google.com/?q=Eiffel+Tower+Paris" },
      { title: "Louvre Museum Map", url: "https://maps.google.com/?q=Louvre+Museum+Paris" }
    ]
  }
};

export function generateGenericOfflineItinerary(destination: string, days: number, budget: string) {
  const capDest = destination.charAt(0).toUpperCase() + destination.slice(1);
  let text = `## 🗺️ Custom ${days}-Day ${capDest} Journey (${budget.toUpperCase()} Plan)
*Local Sandbox Simulated Route | High-Resolution Coordinates*

Welcome to ${capDest}! This robust daily itinerary is custom-suited for a ${budget} explorer, mapped using typical regional crowd metrics and verified travel routes.

`;
  for (let i = 1; i <= Math.min(days, 5); i++) {
    text += `### 🗓️ Day ${i}: Core Regional Attractions & Local Flavors
- **09:00 AM** — Start your day exploring the heart of ${capDest}'s historical landmarks.
- **11:30 AM** — Visit a highly-rated local museum or scenic nature reserve.
- **01:30 PM** — Traditional lunch at an artisan culinary spot catering to a ${budget} budget.
- **03:30 PM** — Take a guided walking tour, harbor cruise, or sightseeing trail.
- **07:00 PM** — Sunset panoramic views followed by a delightful evening cultural dinner.\n\n`;
  }
  text += `### 💡 Helpful Offline Travel Tips
- **Transit Coordinates**: Contactless public commuter passes are highly recommended. Use regional smart schedules.
- **Currency Care**: Card payments are standard, but we advise holding minor local currency cash for small specialty merchants.
- **Peak Hours**: Visit popular structural sights around 08:30 AM or 05:00 PM to circumvent coordinates crowd waves.`;

  return {
    itineraryText: text,
    groundingUrls: [
      { title: `Official ${capDest} Destination Hub`, url: `https://www.google.com/search?q=${encodeURIComponent(destination + " official travel guide")}` },
      { title: `${capDest} Regional Transit & Safety Guides`, url: `https://www.google.com/search?q=${encodeURIComponent(destination + " public transportation map")}` }
    ],
    mapsUrls: [
      { title: `Inquire ${capDest} Map Center`, url: `https://maps.google.com/?q=${encodeURIComponent(destination)}` }
    ]
  };
}
