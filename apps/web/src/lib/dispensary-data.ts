// Static dispensary data sourced from the Happy Times AZ dispensary list
// Organized by region for display on the cannabis page

export type DispensaryEntry = {
  id: string
  name: string
  address: string
  city: string
  phone: string
  region: string
}

export const DISPENSARY_REGIONS = [
  'Phoenix Metro',
  'West Valley',
  'Scottsdale',
  'East Valley',
  'Prescott & Verde Valley',
  'Flagstaff',
  'Tucson',
  'Kingman & Lake Havasu',
] as const

export type DispensaryRegion = (typeof DISPENSARY_REGIONS)[number]

export const dispensaries: DispensaryEntry[] = [
  // ── Phoenix Metro ──────────────────────────────────────────────────────────
  { id: 'trimed', name: 'TruMed', address: '1613 N 40th St', city: 'Phoenix', phone: '(602) 275-1279', region: 'Phoenix Metro' },
  { id: 'trulieve-phoenix-roosevelt', name: 'Trulieve Phoenix – Roosevelt', address: '1007 N 7th St', city: 'Phoenix', phone: '(480) 851-6184', region: 'Phoenix Metro' },
  { id: 'giving-tree', name: 'Giving Tree Dispensary', address: '701 W Union Hills Dr', city: 'Phoenix', phone: '(623) 242-9080', region: 'Phoenix Metro' },
  { id: 'herbal-wellness-north', name: 'Herbal Wellness Center North', address: '1720 E Deer Valley Rd', city: 'Phoenix', phone: '(602) 877-0211', region: 'Phoenix Metro' },
  { id: 'az-natural-concepts', name: 'Arizona Natural Concepts', address: '1039 E Carefree Hwy', city: 'Phoenix', phone: '(602) 224-5999', region: 'Phoenix Metro' },
  { id: 'health-for-life-cave-creek', name: 'Health for Life – Cave Creek', address: 'N Cave Creek Rd', city: 'Phoenix', phone: '(602) 842-5790', region: 'Phoenix Metro' },
  { id: 'flower-shop-phoenix', name: 'The Flower Shop – Phoenix', address: '3155 E McDowell Rd', city: 'Phoenix', phone: '(480) 500-5054', region: 'Phoenix Metro' },
  { id: 'sunday-goods-phoenix', name: 'Sunday Goods', address: '1616 E Glendale Ave', city: 'Phoenix', phone: '(480) 581-5149', region: 'Phoenix Metro' },
  { id: 'curaleaf-camelback', name: 'Curaleaf – Camelback', address: '1040 E Camelback Rd', city: 'Phoenix', phone: '(602) 354-3094', region: 'Phoenix Metro' },
  { id: 'curaleaf-midtown', name: 'Curaleaf – Midtown', address: '2918 N Central Ave', city: 'Phoenix', phone: '(480) 805-1296', region: 'Phoenix Metro' },
  { id: 'curaleaf-bell', name: 'Curaleaf – Bell', address: '17201 N 19th Ave', city: 'Phoenix', phone: '(602) 388-4400', region: 'Phoenix Metro' },
  { id: 'curaleaf-phoenix-airport', name: 'Curaleaf – Phoenix Airport', address: '4415 E Monroe St', city: 'Phoenix', phone: '(602) 396-5757', region: 'Phoenix Metro' },
  { id: 'curaleaf-s-central', name: 'Curaleaf – S Central Ave', address: '3333 S Central Ave', city: 'Phoenix', phone: '(480) 739-0366', region: 'Phoenix Metro' },
  { id: 'natures-medicines', name: "Nature's Medicines", address: '2439 W McDowell Rd', city: 'Phoenix', phone: '(480) 420-3145', region: 'Phoenix Metro' },
  { id: 'yilo-superstore', name: 'YiLo Superstore', address: '2841 W Thunderbird Rd', city: 'Phoenix', phone: '(602) 539-2828', region: 'Phoenix Metro' },
  { id: 'yilo-superstore-east', name: 'YiLo Superstore – East', address: '4456 E Thomas Rd', city: 'Phoenix', phone: '(602) 633-3280', region: 'Phoenix Metro' },
  { id: 'nirvana-center-west', name: 'Nirvana Center – West Phoenix', address: '2330 N 75th Ave, Ste 111', city: 'Phoenix', phone: '(602) 786-7988', region: 'Phoenix Metro' },
  { id: 'nirvana-center-phoenix', name: 'Nirvana Center', address: '2 N 35th Ave', city: 'Phoenix', phone: '(602) 730-3236', region: 'Phoenix Metro' },
  { id: 'zen-leaf-dunlap', name: 'Zen Leaf – Dunlap Ave', address: '4244 W Dunlap Ave', city: 'Phoenix', phone: '(602) 960-2273', region: 'Phoenix Metro' },
  { id: 'zen-leaf-arcadia', name: 'Zen Leaf – Arcadia', address: '2710 E Indian School Rd', city: 'Phoenix', phone: '(602) 960-2273', region: 'Phoenix Metro' },
  { id: 'zen-leaf-phoenix', name: 'Zen Leaf – Phoenix', address: '12401 N Cave Creek Rd', city: 'Phoenix', phone: '(602) 960-2273', region: 'Phoenix Metro' },
  { id: 'mint-northern', name: 'Mint Cannabis – Northern', address: '2444 W Northern Ave', city: 'Phoenix', phone: '(480) 749-6468', region: 'Phoenix Metro' },
  { id: 'mint-cave-creek', name: 'Mint Cannabis – Cave Creek', address: '17036 N Cave Creek Rd', city: 'Phoenix', phone: '(480) 749-6468', region: 'Phoenix Metro' },
  { id: 'hana-dispensary', name: 'Hana Dispensary – Phoenix', address: '3411 E Corona Ave, Ste 101', city: 'Phoenix', phone: '(602) 491-0420', region: 'Phoenix Metro' },
  { id: 'marigold', name: 'Marigold', address: '2601 W Dunlap Ave, Ste 21', city: 'Phoenix', phone: '(602) 900-4557', region: 'Phoenix Metro' },
  { id: 'story-cannabis-dunlap', name: 'Story Cannabis – Dunlap', address: '701 E Dunlap Ave, Ste 9', city: 'Phoenix', phone: '(602) 903-3769', region: 'Phoenix Metro' },
  { id: 'encanto-green-cross', name: 'Encanto Green Cross', address: '2620 W Encanto Blvd', city: 'Phoenix', phone: '(888) 633-7411', region: 'Phoenix Metro' },
  { id: 'natures-wonder-phoenix', name: "Nature's Wonder Phoenix", address: '2825 W Thomas Rd', city: 'Phoenix', phone: '(602) 837-5660', region: 'Phoenix Metro' },
  { id: 'natures-wonder-grand', name: "Nature's Wonder – Grand Ave", address: '2960 Grand Ave', city: 'Phoenix', phone: '(602) 856-9500', region: 'Phoenix Metro' },
  { id: 'phoenix-relief-center', name: 'Phoenix Relief Center', address: '6330 S 35th Ave, Ste 104', city: 'Phoenix', phone: '(602) 276-3401', region: 'Phoenix Metro' },
  { id: 'jars-metrocenter', name: 'JARS Cannabis – Metrocenter', address: '10040 N Metro Pkwy W', city: 'Phoenix', phone: '(602) 870-8700', region: 'Phoenix Metro' },
  { id: 'jars-arcadia', name: 'JARS Cannabis – Arcadia', address: '3001 N 24th St', city: 'Phoenix', phone: '(480) 504-0604', region: 'Phoenix Metro' },
  { id: 'jars-airport', name: 'JARS Cannabis – Phoenix Airport', address: '2424 S 24th St', city: 'Phoenix', phone: '(602) 675-6999', region: 'Phoenix Metro' },
  { id: 'trulieve-north-mountain', name: 'Trulieve – North Mountain', address: '2017 W Peoria Ave', city: 'Phoenix', phone: '(602) 641-3670', region: 'Phoenix Metro' },
  { id: 'trulieve-alhambra', name: 'Trulieve – Alhambra', address: '2630 W Indian School Rd', city: 'Phoenix', phone: '(480) 209-1804', region: 'Phoenix Metro' },
  { id: 'herbal-wellness-west', name: 'Herbal Wellness Center West', address: '4126 W Indian School Rd', city: 'Phoenix', phone: '(602) 635-3502', region: 'Phoenix Metro' },
  { id: 'sol-flower-deer-valley', name: 'Sol Flower – Deer Valley', address: '22041 N 23rd Ave', city: 'Phoenix', phone: '(602) 390-1044', region: 'Phoenix Metro' },
  { id: 'local-joint-zen-leaf', name: 'Local Joint by Zen Leaf', address: '4201 E University Dr', city: 'Phoenix', phone: '(602) 960-2273', region: 'Phoenix Metro' },
  { id: 'house-of-purp', name: 'House of the Purp', address: '555 NE Glendale Ave', city: 'Phoenix', phone: '(602) 491-4371', region: 'Phoenix Metro' },
  { id: 'jars-north-phoenix', name: 'JARS Cannabis – North Phoenix', address: '20224 N 27th Ave', city: 'Phoenix', phone: '(623) 562-1059', region: 'Phoenix Metro' },

  // ── West Valley ────────────────────────────────────────────────────────────
  { id: 'trulieve-peoria', name: 'Trulieve – Peoria', address: '9275 W Peoria Ave, Ste 3', city: 'Peoria', phone: '(623) 878-5954', region: 'West Valley' },
  { id: 'trulieve-glendale', name: 'Trulieve – Glendale', address: '13631 N 59th Ave', city: 'Glendale', phone: '(480) 531-1172', region: 'West Valley' },
  { id: 'all-greens', name: 'All Greens Dispensary', address: '10032 W Bell Rd', city: 'Sun City', phone: '(623) 214-0801', region: 'West Valley' },
  { id: 'oasis-cannabis', name: 'Oasis Cannabis', address: '6676 W Bell Rd', city: 'Peoria', phone: '(623) 295-1788', region: 'West Valley' },
  { id: 'sol-flower-sun-city', name: 'Sol Flower – Sun City', address: '13650 N 99th Ave', city: 'Sun City', phone: '(623) 246-8080', region: 'West Valley' },
  { id: 'white-mountain', name: 'White Mountain Health Center', address: '9420 W Bell Rd', city: 'Sun City', phone: '(623) 374-4141', region: 'West Valley' },
  { id: 'arizona-organix', name: 'Arizona Organix', address: '5301 W Glendale Ave', city: 'Glendale', phone: '(623) 937-2752', region: 'West Valley' },
  { id: 'curaleaf-pavilions', name: 'Curaleaf – Pavilions', address: '2175 N 83rd Ave', city: 'Glendale', phone: '(623) 244-5349', region: 'West Valley' },
  { id: 'curaleaf-union-hills', name: 'Curaleaf – Union Hills', address: '8160 W Union Hills Dr', city: 'Glendale', phone: '(623) 385-1310', region: 'West Valley' },
  { id: 'curaleaf-michigan', name: 'Curaleaf', address: '11200 W Michigan Ave', city: 'Avondale', phone: '(623) 444-5977', region: 'West Valley' },
  { id: 'curaleaf-91st', name: 'Curaleaf', address: '8970 N 91st Ave', city: 'Peoria', phone: '(623) 233-1010', region: 'West Valley' },
  { id: 'jars-peoria', name: 'JARS Cannabis – Peoria', address: '20340 N Lake Pleasant Rd', city: 'Peoria', phone: '(623) 246-1065', region: 'West Valley' },
  { id: 'jars-el-mirage', name: 'JARS Cannabis – El Mirage', address: '12555 NW Grand Ave', city: 'El Mirage', phone: '(602) 351-5450', region: 'West Valley' },
  { id: 'jars-new-river', name: 'JARS Cannabis – New River', address: '46639 N Black Canyon Hwy, Ste 1', city: 'New River', phone: '(623) 936-9333', region: 'West Valley' },
  { id: 'az-cannabis-society', name: 'Arizona Cannabis Society', address: '8376 N El Mirage Rd', city: 'El Mirage', phone: '(888) 249-2927', region: 'West Valley' },
  { id: 'wam-dispensary', name: 'WAM Dispensary', address: '12550 W Thunderbird Rd', city: 'Peoria', phone: '(623) 478-2233', region: 'West Valley' },
  { id: 'debbies-peoria', name: "Debbie's Dispensary – Peoria", address: '20340 N Lake Pleasant Rd', city: 'Peoria', phone: '(833) 332-2437', region: 'West Valley' },
  { id: 'deeply-rooted', name: 'Deeply Rooted Boutique', address: '11725 NW Grand Ave', city: 'El Mirage', phone: '(623) 252-0004', region: 'West Valley' },
  { id: 'natures-medicines-grand', name: "Nature's Medicines – Grand Ave", address: '6840 NW Grand Ave', city: 'Glendale', phone: '(602) 641-6600', region: 'West Valley' },
  { id: 'story-dispensary-mcdowell', name: 'Story Dispensary', address: '9897 W McDowell Rd', city: 'Avondale', phone: '(480) 420-0377', region: 'West Valley' },
  { id: 'ponderosa', name: 'Ponderosa', address: '9240 W Northern Ave, Ste 103b', city: 'Peoria', phone: '(623) 877-3934', region: 'West Valley' },
  { id: 'superior-dispensary', name: 'The Superior Dispensary', address: '211 S 57th Dr', city: 'Avondale', phone: '(602) 926-9100', region: 'West Valley' },
  { id: 'trulieve-avondale', name: 'Trulieve – Avondale', address: '3828 S Vermeersch Rd', city: 'Avondale', phone: '(623) 792-5032', region: 'West Valley' },
  { id: 'valley-of-sun', name: 'Valley of the Sun Medical Dispensary', address: '16200 W Eddie Albert Way', city: 'Goodyear', phone: '(623) 932-3859', region: 'West Valley' },

  // ── Scottsdale ─────────────────────────────────────────────────────────────
  { id: 'sol-flower-scottsdale', name: 'Sol Flower – Scottsdale', address: '14980 N 78th Way', city: 'Scottsdale', phone: '(480) 420-3300', region: 'Scottsdale' },
  { id: 'trulieve-scottsdale', name: 'Trulieve – Scottsdale', address: '15190 N Hayden Rd', city: 'Scottsdale', phone: '(480) 948-3737', region: 'Scottsdale' },
  { id: 'curaleaf-scottsdale', name: 'Curaleaf – Scottsdale', address: '16277 N Greenway Hayden Loop', city: 'Scottsdale', phone: '(602) 842-0020', region: 'Scottsdale' },
  { id: 'mint-scottsdale', name: 'The Mint Cannabis – Scottsdale', address: '8729 E Manzanita Dr', city: 'Scottsdale', phone: '(480) 659-9728', region: 'Scottsdale' },
  { id: 'trulieve-butherus', name: 'Trulieve', address: '7320 E Butherus Dr, Ste 100', city: 'Scottsdale', phone: '(480) 575-1245', region: 'Scottsdale' },

  // ── East Valley ────────────────────────────────────────────────────────────
  { id: 'nova-dispensary', name: 'Nova Dispensary', address: '1911 W Broadway Rd', city: 'Mesa', phone: '(480) 912-4444', region: 'East Valley' },
  { id: 'good-dispensary', name: 'The GOOD Dispensary', address: '1842 W Broadway Rd', city: 'Mesa', phone: '(480) 900-8042', region: 'East Valley' },
  { id: 'greenpharms-mesa', name: 'Greenpharms Dispensary – Mesa', address: '7235 E Hampton Ave, Ste 115', city: 'Mesa', phone: '(480) 410-6705', region: 'East Valley' },
  { id: 'trulieve-mesa-south', name: 'Trulieve – Mesa South', address: '938 E Juanita Ave', city: 'Mesa', phone: '(480) 272-9888', region: 'East Valley' },
  { id: 'jars-mesa', name: 'JARS Cannabis – Mesa', address: '4236 E Juanita Ave', city: 'Mesa', phone: '(480) 420-0064', region: 'East Valley' },
  { id: 'flower-shop-ahwatukee', name: 'The Flower Shop – Ahwatukee', address: '10827 S 51st St', city: 'Phoenix', phone: '(480) 500-5054', region: 'East Valley' },
  { id: 'flower-shop-university', name: 'The Flower Shop – University', address: '5205 E University Dr', city: 'Mesa', phone: '(480) 500-5054', region: 'East Valley' },
  { id: 'sol-flower-mcclintock', name: 'Sol Flower Wellness Center', address: '1322 N McClintock Dr', city: 'Tempe', phone: '(480) 795-6363', region: 'East Valley' },
  { id: 'nirvana-tempe', name: 'Nirvana Center – Tempe', address: '2715 S Hardy Dr', city: 'Tempe', phone: '(480) 378-6917', region: 'East Valley' },
  { id: 'trulieve-tempe', name: 'Trulieve – Tempe', address: '710 W Elliot Rd', city: 'Tempe', phone: '(480) 777-2100', region: 'East Valley' },
  { id: 'sunday-goods-tempe', name: 'Sunday Goods – Tempe', address: '723 N Scottsdale Rd', city: 'Tempe', phone: '(480) 702-0812', region: 'East Valley' },
  { id: 'cookies-tempe', name: 'Cookies', address: '2715 S Hardy Dr', city: 'Tempe', phone: '(480) 378-6917', region: 'East Valley' },
  { id: 'zen-leaf-mesa', name: 'Zen Leaf – Mesa', address: '550 W McKellips Rd', city: 'Mesa', phone: '(602) 960-2273', region: 'East Valley' },
  { id: 'zen-leaf-chandler', name: 'Zen Leaf – Chandler', address: '7200 W Chandler Blvd, Ste 7', city: 'Chandler', phone: '(602) 960-2273', region: 'East Valley' },
  { id: 'trulieve-chandler', name: 'Trulieve – Chandler', address: 'E Chandler Blvd & W Chandler Blvd, Ste A', city: 'Chandler', phone: '(480) 439-7771', region: 'East Valley' },
  { id: 'story-chandler', name: 'Story Cannabis – North Chandler', address: '17006 S Weber Dr', city: 'Chandler', phone: '(480) 626-7333', region: 'East Valley' },
  { id: 'curaleaf-gilbert', name: 'Curaleaf – Gilbert', address: '175 S Hamilton Pl, Ste 110', city: 'Gilbert', phone: '(480) 361-0078', region: 'East Valley' },
  { id: 'harvest-mesa', name: 'Harvest', address: '1150 W McLellan Rd', city: 'Mesa', phone: '(480) 561-0388', region: 'East Valley' },
  { id: 'mint-mesa', name: 'Mint Cannabis – Mesa', address: '330 E Southern Ave', city: 'Mesa', phone: '(480) 749-6468', region: 'East Valley' },
  { id: 'kind-meds', name: 'Kind Meds', address: '2152 S Vineyard, Ste 120', city: 'Mesa', phone: '(480) 686-9302', region: 'East Valley' },
  { id: 'trulieve-baseline', name: 'Trulieve – Baseline', address: '1821 W Baseline Rd', city: 'Tempe', phone: '(623) 404-1420', region: 'East Valley' },
  { id: 'health-for-life-mcdowell', name: 'Health for Life – McDowell', address: '5550 E McDowell Rd', city: 'Mesa', phone: '(480) 830-8251', region: 'East Valley' },
  { id: 'ponderosa-scottsdale', name: 'Ponderosa Dispensary', address: '318 S Bracken Ln', city: 'Scottsdale', phone: '(480) 506-0403', region: 'East Valley' },
  { id: 'phoenix-cannabis', name: 'Phoenix Cannabis', address: '16913 E Enterprise Dr', city: 'Gilbert', phone: '(480) 306-7399', region: 'East Valley' },

  // ── Prescott & Verde Valley ────────────────────────────────────────────────
  { id: 'nirvana-prescott-valley', name: 'Nirvana Center – Prescott Valley', address: '6287 E Copper Hill Dr, Ste A', city: 'Prescott Valley', phone: '(928) 227-2441', region: 'Prescott & Verde Valley' },
  { id: 'trulieve-cottonwood', name: 'Trulieve – Cottonwood', address: '2400 AZ-89A', city: 'Cottonwood', phone: '(928) 634-5233', region: 'Prescott & Verde Valley' },
  { id: 'curaleaf-sedona', name: 'Curaleaf – Sedona', address: '465 Jordan Rd', city: 'Sedona', phone: '(928) 202-3512', region: 'Prescott & Verde Valley' },
  { id: 'nirvana-verde-valley', name: 'Nirvana Center – Verde Valley', address: '675 AZ-89A', city: 'Cottonwood', phone: '(928) 237-5503', region: 'Prescott & Verde Valley' },
  { id: 'organica-prescott', name: 'Organica Patient Group', address: '856 S State Route 89', city: 'Prescott', phone: '(928) 636-5566', region: 'Prescott & Verde Valley' },
  { id: 'yavapai-herbal', name: 'Yavapai Herbal Services', address: '675 E State Route 89A', city: 'Cottonwood', phone: '(928) 634-5233', region: 'Prescott & Verde Valley' },

  // ── Flagstaff ──────────────────────────────────────────────────────────────
  { id: 'noble-herb', name: 'Noble Herb', address: '522 E Route 66', city: 'Flagstaff', phone: '(928) 351-7775', region: 'Flagstaff' },
  { id: 'greenpharms-flagstaff', name: 'Greenpharms Dispensary – Flagstaff', address: '7121 US-89', city: 'Flagstaff', phone: '(928) 522-6337', region: 'Flagstaff' },
  { id: 'high-mountain-cannabis', name: 'High Mountain Cannabis', address: '1250 S Plaza Way', city: 'Flagstaff', phone: '(928) 774-5467', region: 'Flagstaff' },

  // ── Tucson ─────────────────────────────────────────────────────────────────
  { id: 'd2-downtown', name: 'D2 Dispensary – Downtown', address: '221 E 6th St', city: 'Tucson', phone: '(520) 838-0492', region: 'Tucson' },
  { id: 'd2-22nd', name: 'D2 Dispensary', address: '7139 E 22nd St', city: 'Tucson', phone: '(520) 214-3232', region: 'Tucson' },
  { id: 'prime-leaf', name: 'The Prime Leaf', address: '4220 E Speedway Blvd', city: 'Tucson', phone: '(520) 447-7463', region: 'Tucson' },
  { id: 'green-med', name: 'Green Med Wellness Center', address: '6464 E Tanque Verde Rd', city: 'Tucson', phone: '(520) 886-2484', region: 'Tucson' },
  { id: 'desert-bloom', name: 'Desert Bloom Re-Leaf Center', address: '8060 E 22nd St', city: 'Tucson', phone: '(520) 886-1760', region: 'Tucson' },
  { id: 'trulieve-tucson-grant', name: 'Trulieve – Tucson Blenman Elm', address: '2734 E Grant Rd', city: 'Tucson', phone: '(520) 314-9420', region: 'Tucson' },
  { id: 'trulieve-tucson-22nd', name: 'Trulieve – Tucson', address: '4659 E 22nd St', city: 'Tucson', phone: '(520) 640-4600', region: 'Tucson' },
  { id: 'trulieve-tucson-menlo', name: 'Trulieve – Tucson Menlo Park', address: '1010 S Freeway, Ste 130', city: 'Tucson', phone: '(520) 640-4402', region: 'Tucson' },
  { id: 'earths-healing', name: "Earth's Healing", address: '2075 E Benson Hwy', city: 'Tucson', phone: '(520) 373-5779', region: 'Tucson' },
  { id: 'earths-healing-north', name: "Earth's Healing – North", address: '78 W River Rd', city: 'Tucson', phone: '(520) 253-7198', region: 'Tucson' },
  { id: 'botanica', name: 'Botanica', address: '6205 N Travel Center Dr', city: 'Tucson', phone: '(520) 395-0230', region: 'Tucson' },
  { id: 'curaleaf-tucson', name: 'Curaleaf – Tucson', address: '4695 N Oracle Rd', city: 'Tucson', phone: '(520) 293-3315', region: 'Tucson' },
  { id: 'nature-med', name: 'Nature Med', address: '5390 W Ina Rd', city: 'Tucson', phone: '(520) 620-9123', region: 'Tucson' },
  { id: 'nirvana-tucson', name: 'Nirvana Cannabis – Tucson', address: '2209 S 6th Ave', city: 'Tucson', phone: '(520) 524-5821', region: 'Tucson' },
  { id: 'green-halo', name: 'The Green Halo', address: '7710 S Wilmot Rd', city: 'Tucson', phone: '(520) 664-2251', region: 'Tucson' },
  { id: 'tucson-saints', name: 'Tucson SAINTS Dispensary', address: '112 S Kolb Rd', city: 'Tucson', phone: '(520) 886-1003', region: 'Tucson' },
  { id: 'sol-flower-tucson', name: 'Sol Flower – Tucson', address: '3000 W Valencia Rd', city: 'Tucson', phone: '(520) 335-5501', region: 'Tucson' },
  { id: 'sol-flower-tucson-oracle', name: 'Sol Flower – Oracle', address: '4837 N 1st Ave', city: 'Tucson', phone: '(520) 335-4083', region: 'Tucson' },

  // ── Kingman & Lake Havasu ──────────────────────────────────────────────────
  { id: 'medusa-farms', name: 'Medusa Farms Dispensary', address: '3358 E Andy Devine Ave', city: 'Kingman', phone: '(928) 421-0020', region: 'Kingman & Lake Havasu' },
  { id: 'jars-kingman', name: 'JARS Cannabis – Kingman', address: '1975 E Northern Ave', city: 'Kingman', phone: '(928) 263-6348', region: 'Kingman & Lake Havasu' },
  { id: 'debbies-lake-havasu', name: "Debbie's Dispensary – Lake Havasu", address: '3550 North Ln', city: 'Lake Havasu City', phone: '(833) 332-2437', region: 'Kingman & Lake Havasu' },
  { id: 'harvest-lake-havasu', name: 'Harvest HOC – Lake Havasu', address: '1691 Industrial Blvd', city: 'Lake Havasu City', phone: '(928) 453-9333', region: 'Kingman & Lake Havasu' },
  { id: 'story-lake-havasu', name: 'Story Cannabis – Lake Havasu', address: '200 London Bridge Rd', city: 'Lake Havasu City', phone: '(928) 543-9505', region: 'Kingman & Lake Havasu' },
  { id: 'farm-fresh', name: 'Farm Fresh Medical Marijuana', address: '790 Lake Havasu Ave N, Ste 4', city: 'Lake Havasu City', phone: '(928) 733-6339', region: 'Kingman & Lake Havasu' },
]

export function getDispensariesByRegion(): Record<DispensaryRegion, DispensaryEntry[]> {
  const result = {} as Record<DispensaryRegion, DispensaryEntry[]>
  for (const region of DISPENSARY_REGIONS) {
    result[region] = dispensaries.filter(d => d.region === region)
  }
  return result
}
