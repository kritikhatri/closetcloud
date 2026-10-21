/*
  Curated outfit inspiration.

  These are NOT the user's clothes. They're editorial photos from
  Unsplash (https://unsplash.com/license — free to use, including
  commercially, no permission needed). We still credit every
  photographer, because it's the right thing to do and Unsplash asks
  for it. The UI always labels these as "Inspiration".

  Each look stores:
    imageId      – the part after "photo-" in the images.unsplash.com URL
    photoId      – the id in the photo's page URL (for the credit link)
    ratio        – height ÷ width, so the grid can reserve the right
                   space before the image loads (no layout jumping)

  Every image URL and photo-page link was checked when this list was made.
*/

// The `value`s must match server/src/constants/aesthetics.js.
export const AESTHETICS = [
  { value: 'coquette', label: 'Coquette', description: 'Bows, blush tones, ballet flats and a little romance in every detail.' },
  { value: 'cottagecore', label: 'Cottagecore', description: 'Floral midis, soft fabrics and the feeling of a slow summer afternoon.' },
  { value: 'old-money', label: 'Old money', description: 'Camel coats, crisp tailoring and quiet, timeless neutrals.' },
  { value: 'minimal', label: 'Minimal', description: 'Clean lines, a calm palette and pieces that do a lot with very little.' },
  { value: 'streetwear', label: 'Streetwear', description: 'Statement sneakers, easy layers and confident, relaxed shapes.' },
  { value: 'college', label: 'College', description: 'Denim, knits and practical favourites that still look put-together.' },
  { value: 'casual', label: 'Casual', description: 'Comfortable, effortless pieces for everyday life, rain or shine.' },
  { value: 'date-night', label: 'Date night', description: 'A little leather, a little shine, and something that feels special.' },
  { value: 'formal', label: 'Formal', description: 'Gowns, satin and sequins for the nights that deserve them.' },
]

export const LOOKS = [
  // ---------- Coquette ----------
  { id: 'pink-faux-fur', title: 'Pink faux fur & white boots', aesthetic: 'coquette', season: 'winter', imageId: '1609534927279-5d8c599f3ea6', ratio: 1.5, photographer: 'Vladimir Yelizarov', photoId: 'rNfJcubpK3U' },
  { id: 'rose-maxi', title: 'Rose maxi & straw hat', aesthetic: 'coquette', season: 'summer', imageId: '1473286835901-04adb1afab03', ratio: 1.5, photographer: 'henri meilhac', photoId: 'jJ0tLs2ROd4' },
  { id: 'blossom-pink', title: 'Soft pink among the blossoms', aesthetic: 'coquette', season: 'spring', imageId: '1612847760086-f481d7b93de2', ratio: 0.666, photographer: 'Олег Мороз', photoId: 'DTjOwOt_8NI' },
  { id: 'tiered-pink', title: 'Tiered pink sundress', aesthetic: 'coquette', season: 'summer', imageId: '1689829319983-01d39b09ba18', ratio: 1.5, photographer: 'Alexandra Tran', photoId: 'yQezIIjOd-Q' },
  { id: 'gingham-bag', title: 'Gingham & a sugared-almond bag', aesthetic: 'coquette', season: 'summer', imageId: '1637227274966-7fc628d8684a', ratio: 1.5, photographer: 'Gabrielle Henderson', photoId: 'HcwwAhYvHfI' },
  { id: 'blush-backless', title: 'Blush backless set', aesthetic: 'coquette', season: 'spring', imageId: '1779153995594-abc822ae9d65', ratio: 1.333, photographer: 'ola szkolda', photoId: 'pzFbFNXa5cM' },

  // ---------- Minimal ----------
  { id: 'ivory-coat', title: 'Ivory coat & blush knit', aesthetic: 'minimal', season: 'autumn', imageId: '1578102718171-ec1f91680562', ratio: 1.333, photographer: 'Laura Chouette', photoId: 'd7wSG9uPev4' },
  { id: 'trench-maxi', title: 'Trench over a black maxi', aesthetic: 'minimal', season: 'autumn', imageId: '1529399447871-731cff7f696b', ratio: 1.776, photographer: '0xdosa', photoId: '6OAgcfO2Ujo' },
  { id: 'black-cami', title: 'Black cami & gold chain', aesthetic: 'minimal', season: 'summer', imageId: '1589713680561-1d0b6945a582', ratio: 1.5, photographer: 'Tanisa Beck', photoId: 'kUPY_LN-TH0' },
  { id: 'oat-knit', title: 'Oat knit, nothing else', aesthetic: 'minimal', season: 'winter', imageId: '1759229874914-c1ffdb3ebd0c', ratio: 0.75, photographer: 'MANITO SILK', photoId: 'rz3sw-8VNCw' },
  { id: 'cream-suit', title: 'Cream two-piece', aesthetic: 'minimal', season: 'spring', imageId: '1627130697816-4d71dbfe6a5b', ratio: 1.5, photographer: 'Ron McClenny', photoId: 'UpL2_sNSgHg' },
  { id: 'white-crosswalk', title: 'White dress on the crosswalk', aesthetic: 'minimal', season: 'summer', imageId: '1758073028060-ed5a505c3bf6', ratio: 1.5, photographer: 'Jadon Johnson', photoId: 'KoVgJQplclc' },
  { id: 'all-white', title: 'All-white linen', aesthetic: 'minimal', season: 'summer', imageId: '1603344797033-f0f4f587ab60', ratio: 1.5, photographer: 'engin akyurt', photoId: 'jaZoffxg1yc' },

  // ---------- Streetwear ----------
  { id: 'knit-vest', title: 'Knit vest & sporty layers', aesthetic: 'streetwear', season: 'autumn', imageId: '1684283377169-e3dcfec7790c', ratio: 1.25, photographer: 'Ali Pazani', photoId: 'RSc2fWHs12o' },
  { id: 'neon-knit', title: 'Neon knit & beanie', aesthetic: 'streetwear', season: 'winter', imageId: '1547069553-12f23c839aaa', ratio: 1.5, photographer: 'Daniel Adesina', photoId: 'F3kpQ9UEgDo' },
  { id: 'teal-puffer', title: 'Teal puffer & wide trousers', aesthetic: 'streetwear', season: 'winter', imageId: '1584216338898-f34d78201414', ratio: 1.5, photographer: 'Amy Geier', photoId: 'om-Cvae8PUo' },
  { id: 'tee-joggers', title: 'Tee, joggers & statement sneakers', aesthetic: 'streetwear', season: 'spring', imageId: '1588117260148-b47818741c74', ratio: 1.5, photographer: 'Mike Von', photoId: 'YsiSAp3ccvk' },
  { id: 'yellow-puffer', title: 'Sunshine puffer', aesthetic: 'streetwear', season: 'winter', imageId: '1631902112544-2271267abb73', ratio: 1.5, photographer: 'Mike Von', photoId: 'WcwCGMETMaM' },
  { id: 'oversized-hoodie', title: 'Oversized hoodie', aesthetic: 'streetwear', season: 'autumn', imageId: '1508216310976-c518daae0cdc', ratio: 1.44, photographer: 'Oladimeji Odunsi', photoId: 'aNj8Hvbrss8' },
  { id: 'cap-varsity', title: 'Cap & varsity layers', aesthetic: 'streetwear', season: 'autumn', imageId: '1721637635502-b0abaaa75edb', ratio: 1.506, photographer: 'JC Gellidon', photoId: 'ktME4-TLi1Q' },
  { id: 'patched-denim', title: 'Crop top & patched denim', aesthetic: 'streetwear', season: 'summer', imageId: '1784850227098-0a886518216c', ratio: 1.496, photographer: 'sofia inductgroup', photoId: 'Y8xS1Nxtivw' },

  // ---------- College ----------
  { id: 'denim-cargo', title: 'Denim jacket & cargo pants', aesthetic: 'college', season: 'spring', imageId: '1600219823854-f3bfee26ea9c', ratio: 1.4, photographer: 'Matt Koffel', photoId: 'mU6vF37vufw' },
  { id: 'blazer-class', title: 'White blazer for class', aesthetic: 'college', season: 'spring', imageId: '1779150182406-accea37308c8', ratio: 1.78, photographer: 'Waylon Hobson', photoId: 'kMuS4Jm_eQ8' },
  { id: 'crop-green', title: 'Crop top & olive trousers', aesthetic: 'college', season: 'summer', imageId: '1687825519674-bb8513d23790', ratio: 1.5, photographer: 'Laura Oliveira', photoId: 'J6rLnKD4wco' },
  { id: 'stripes-flatlay', title: 'Stripes, denim & red sandals', aesthetic: 'college', season: 'summer', imageId: '1525507119028-ed4c629a60a3', ratio: 1.333, photographer: 'Junko Nakase', photoId: 'Q-72wa9-7Dg' },
  { id: 'beanie-flatlay', title: 'Beanie, knit & jeans', aesthetic: 'college', season: 'winter', imageId: '1556905055-8f358a7a47b2', ratio: 0.666, photographer: 'Angela Bailey', photoId: 'jlo7Bf4tUoY' },
  { id: 'tee-boots-flatlay', title: 'White tee & suede boots', aesthetic: 'college', season: 'autumn', imageId: '1467043237213-65f2da53396f', ratio: 1.5, photographer: 'Sarah Dorweiler', photoId: 'gUPiTDBdRe4' },

  // ---------- Casual ----------
  { id: 'teal-coat', title: 'Tailored teal coat', aesthetic: 'casual', season: 'autumn', imageId: '1652590480678-ad2baa51f76c', ratio: 1.25, photographer: 'Adele Shafiee', photoId: '3WCNW3veV7E' },
  { id: 'trench-scarf', title: 'Trench, scarf & sneakers', aesthetic: 'casual', season: 'autumn', imageId: '1652473291442-7a2e034a00d1', ratio: 1.25, photographer: 'Ali Ahmadi', photoId: '7LiRr9RWIoU' },
  { id: 'cardigan-flatlay', title: 'Cardigan, jeans & ankle boots', aesthetic: 'casual', season: 'autumn', imageId: '1516762689617-e1cffcef479d', ratio: 1.413, photographer: 'Heather Ford', photoId: '5gkYsrH_ebY' },
  { id: 'vest-jeans', title: 'Vest, light jeans & a sun hat', aesthetic: 'casual', season: 'summer', imageId: '1619027131391-87eadec6a398', ratio: 1.5, photographer: 'Alexandra Tran', photoId: 'uiJdBgd_u2M' },
  { id: 'weekend-flatlay', title: 'Weekend layers', aesthetic: 'casual', season: 'autumn', imageId: '1632469188022-b5db09a70fbc', ratio: 1.27, photographer: 'Zoe', photoId: 'DOYASc77qmw' },

  // ---------- Date night ----------
  { id: 'leather-mini', title: 'Leather jacket & mini', aesthetic: 'date-night', season: 'autumn', imageId: '1708242355178-d8c929b01a9d', ratio: 1.5, photographer: 'Kevin Grieve', photoId: 'bO3Py9X2XD0' },
  { id: 'pink-corset', title: 'Pink corset mini', aesthetic: 'date-night', season: 'summer', imageId: '1609533896512-68e72be46a33', ratio: 1.41, photographer: 'Vladimir Yelizarov', photoId: 'S47-OMYAql8' },
  { id: 'red-swirl', title: 'Red dress, in motion', aesthetic: 'date-night', season: 'summer', imageId: '1595777457583-95e059d581b8', ratio: 1.2, photographer: 'R N', photoId: 'tyfqOL1FAQc' },
  { id: 'teal-jumpsuit', title: 'Halter jumpsuit', aesthetic: 'date-night', season: 'summer', imageId: '1495385794356-15371f348c31', ratio: 1.57, photographer: 'Darko Mitev', photoId: 'c5t_j1zlk1Y' },

  // ---------- Formal ----------
  { id: 'blush-satin', title: 'Blush satin gown', aesthetic: 'formal', season: 'spring', imageId: '1613424935149-c8efd5c41e91', ratio: 1.503, photographer: 'Tamara Bellis', photoId: 'X2qRKqLKtg4' },
  { id: 'magenta-tulle', title: 'Magenta tulle sleeves', aesthetic: 'formal', season: 'spring', imageId: '1791232776239-b1925c78318c', ratio: 0.666, photographer: 'DIEGO SÁNCHEZ', photoId: 'EBrS7rpgwVM' },
  { id: 'floral-tulle', title: 'Embroidered tulle gown', aesthetic: 'formal', season: 'spring', imageId: '1568252542512-9fe8fe9c87bb', ratio: 1.386, photographer: 'Khaled Ghareeb', photoId: '-NyPn9up_7o' },
  { id: 'black-satin', title: 'Black satin column', aesthetic: 'formal', season: 'winter', imageId: '1623580674393-edf6eb7090f8', ratio: 1.5, photographer: 'Knight Duong', photoId: '77iyep3uIjg' },
  { id: 'sequin-gown', title: 'Champagne sequins', aesthetic: 'formal', season: 'winter', imageId: '1765870973443-705ef47bfec5', ratio: 1.5, photographer: 'FOTOGRAFÍA EDITORIAL', photoId: 'ChqO7zfYJSw' },
  { id: 'wine-mermaid', title: 'Wine mermaid gown', aesthetic: 'formal', season: 'autumn', imageId: '1583039949165-96ee24b0d8de', ratio: 1.25, photographer: 'Happy Face Emoji', photoId: 'cqgSaFgMSqg' },

  // ---------- Cottagecore ----------
  { id: 'hay-bale-florals', title: 'Florals by the hay bales', aesthetic: 'cottagecore', season: 'summer', imageId: '1786365448711-21f6a9867868', ratio: 1.333, photographer: 'Freddie Addery', photoId: 'bHuiU6kGU1Y' },
  { id: 'wildflower-field', title: 'Wildflower field dress', aesthetic: 'cottagecore', season: 'summer', imageId: '1780301663843-80c3c920e3d5', ratio: 0.667, photographer: 'Margo Evardson', photoId: '_pJWA6zdn2g' },
  { id: 'gazebo-vintage', title: 'Vintage dress & corset belt', aesthetic: 'cottagecore', season: 'autumn', imageId: '1764684809273-edd203f9eb71', ratio: 1.25, photographer: 'Ali Karimiboroujeni', photoId: 'oQ5R5WcK35Y' },
  { id: 'dappled-floral', title: 'Floral dress in dappled light', aesthetic: 'cottagecore', season: 'spring', imageId: '1782786982033-d68e8612ba9a', ratio: 1.5, photographer: 'Alexander Mass', photoId: '04by5jFaFE8' },
  { id: 'silk-scarves', title: 'Slip dresses & silk headscarves', aesthetic: 'cottagecore', season: 'summer', imageId: '1679025907388-30694aebf154', ratio: 1.4, photographer: 'Megan Ruth', photoId: '0ul16kAUx7I' },
  { id: 'daisy-bouquet', title: 'Daisies & a floral midi', aesthetic: 'cottagecore', season: 'spring', imageId: '1786365426273-0ce22b4ef554', ratio: 1.333, photographer: 'Freddie Addery', photoId: 'DgjfVW7hkzM' },

  // ---------- Old money ----------
  { id: 'camel-blazer-hat', title: 'Camel blazer & wide-brim hat', aesthetic: 'old-money', season: 'autumn', imageId: '1583002083769-0bd781675d2f', ratio: 1.5, photographer: 'Marcos Paulo Prado', photoId: '1-HOJGOtFcg' },
  { id: 'coat-white-bag', title: 'Black coat & white top-handle bag', aesthetic: 'old-money', season: 'winter', imageId: '1633450796397-1e1344fde97a', ratio: 1.5, photographer: 'Luthfi Ali Qodri', photoId: 'IfMv7JSdT3E' },
  { id: 'beige-blazer-leaves', title: 'Beige blazer in the leaves', aesthetic: 'old-money', season: 'autumn', imageId: '1590873802674-55bb8f947bc5', ratio: 1.5, photographer: 'Roman Holoschchuk', photoId: 'ZnHpOhHnkDY' },
  { id: 'beige-suit', title: 'Beige suit, crisp shirt', aesthetic: 'old-money', season: 'spring', imageId: '1779406166699-662a041a12a9', ratio: 1.5, photographer: 'ola szkolda', photoId: '6A1dE8VEENc' },
  { id: 'tan-blazer', title: 'Tan belted blazer', aesthetic: 'old-money', season: 'autumn', imageId: '1605017283705-d15cb0346bf2', ratio: 1.5, photographer: 'Marcel Strauß', photoId: '6NZJpSxYFEc' },
  { id: 'vintage-car-coat', title: 'Camel coat & a vintage car', aesthetic: 'old-money', season: 'autumn', imageId: '1602192937302-e35469228d35', ratio: 1.5, photographer: 'Benjamin Child', photoId: 'VcS-SjGqKk4' },
  { id: 'station-trench', title: 'Trench at the train station', aesthetic: 'old-money', season: 'autumn', imageId: '1788120680424-60c0069f9e61', ratio: 1.25, photographer: 'Vlad Ionita', photoId: 'pP6iXsMGpo8' },

  // ---------- More coquette ----------
  { id: 'pointe-tulle', title: 'Pointe shoes & pink tulle', aesthetic: 'coquette', season: 'spring', imageId: '1703797203337-f942475d73a2', ratio: 1.497, photographer: 'Haley Parson', photoId: 'axe33ZnYCPw' },
  { id: 'ballet-ornaments', title: 'Ballet slippers, holiday edition', aesthetic: 'coquette', season: 'winter', imageId: '1702335708964-b8e70502398f', ratio: 0.667, photographer: 'Haley Parson', photoId: 'FB25FQaT0qU' },
  { id: 'pink-clutch', title: 'Eyelet dress & a pink clutch', aesthetic: 'coquette', season: 'summer', imageId: '1789110854836-a7e790d83736', ratio: 1.5, photographer: 'engin akyurt', photoId: 'gw70gEsJjlk' },
  { id: 'pink-slip', title: 'Pale pink slip dress', aesthetic: 'coquette', season: 'summer', imageId: '1618502109256-2028fedcc430', ratio: 1.5, photographer: 'Eddy Abimbi', photoId: 'gnE3nTEKUuw' },

  // ---------- More minimal ----------
  { id: 'beret-flatlay', title: 'Beret, knit & strappy sandals', aesthetic: 'minimal', season: 'spring', imageId: '1625899845678-3fad6a4a1846', ratio: 1.333, photographer: 'Leslie Leon', photoId: '9cOAfYJjJUk' },
  { id: 'oversized-blazer', title: 'Oversized beige blazer', aesthetic: 'minimal', season: 'spring', imageId: '1747815065172-a3234582223e', ratio: 1.4, photographer: 'Alina Matveycheva', photoId: 'MNwRn2MMHPM' },
  { id: 'coffee-coat', title: 'Beige coat & morning coffee', aesthetic: 'minimal', season: 'autumn', imageId: '1618928727380-bbbf229f71d1', ratio: 1.5, photographer: 'Marina Abrosimova', photoId: 'djXyaMIsOvo' },
  { id: 'black-trench-slip', title: 'Black trench over a slip dress', aesthetic: 'minimal', season: 'autumn', imageId: '1790802222952-eb7e610de0d1', ratio: 1.5, photographer: 'Marina Nazina', photoId: 'S9WUsF-Is7c' },

  // ---------- More casual (lots of cosy autumn) ----------
  { id: 'bench-coat', title: 'Camel coat, jeans & boots', aesthetic: 'casual', season: 'autumn', imageId: '1638485581193-a7a88f60ff7a', ratio: 1.5, photographer: 'freestocks', photoId: 'uPycVJ87eAc' },
  { id: 'plaid-coat', title: 'Plaid coat in the park', aesthetic: 'casual', season: 'autumn', imageId: '1578632292335-df3abbb0d586', ratio: 1.5, photographer: 'Max Titov', photoId: 'Mhktr6dFD3I' },
  { id: 'blanket-scarf', title: 'Blanket scarf season', aesthetic: 'casual', season: 'autumn', imageId: '1698345742000-d12044e807a2', ratio: 0.667, photographer: 'Chiriac Bianca', photoId: 'mW8Him6M1Es' },
  { id: 'umbrella-walk', title: 'Rainy-day neutrals', aesthetic: 'casual', season: 'autumn', imageId: '1728992119176-2b2f3fd7454b', ratio: 1.25, photographer: 'Mohammad Hossein Mirzagol', photoId: 'GYu32I7NrOw' },
  { id: 'tan-crossbody', title: 'Tan crossbody & denim', aesthetic: 'casual', season: 'summer', imageId: '1523779105320-d1cd346ff52b', ratio: 0.663, photographer: 'Tamara Bellis', photoId: 'HY1fq4ZtLTE' },
  { id: 'cobalt-coast', title: 'Cobalt dress by the sea', aesthetic: 'casual', season: 'summer', imageId: '1784385411619-f67767c966fe', ratio: 1.5, photographer: 'Laura Chouette', photoId: '96f4kfzK2RI' },
  { id: 'white-trench', title: 'Crisp white trench', aesthetic: 'casual', season: 'spring', imageId: '1773955130654-88b0f92118d2', ratio: 1.25, photographer: 'Margo Evardson', photoId: 'al7AbyMvj1Q' },

  // ---------- More streetwear & date night ----------
  { id: 'pink-sweatsuit', title: 'Pink sweatsuit', aesthetic: 'streetwear', season: 'spring', imageId: '1655361930131-e390916f167c', ratio: 1.25, photographer: 'Viacheslav Volodin', photoId: 'JqcizoG8ilY' },
  { id: 'crop-wide-leg', title: 'Crop top & wide-leg trousers', aesthetic: 'streetwear', season: 'summer', imageId: '1700557478863-bf8c59b973fe', ratio: 1.4, photographer: 'Virginia Marinova', photoId: '1Hghp8Y7zfU' },
  { id: 'blazer-little-bag', title: 'Black blazer & a little bag', aesthetic: 'date-night', season: 'autumn', imageId: '1700557478265-09bf56763a5d', ratio: 1.4, photographer: 'Virginia Marinova', photoId: 'CulhD_FRXEY' },
]

/*
  Unsplash's image CDN resizes on the fly: ?w=600 returns a 600px-wide
  version. auto=format serves modern formats (like AVIF/WebP) to
  browsers that support them.
*/
export function lookImageUrl(look, width) {
  return `https://images.unsplash.com/photo-${look.imageId}?w=${width}&q=75&auto=format&fit=crop`
}

/* srcSet lets the browser pick the smallest file that still looks sharp
   for the screen it's on (phones download less). */
export function lookSrcSet(look) {
  return [400, 600, 900].map((w) => `${lookImageUrl(look, w)} ${w}w`).join(', ')
}

// Unsplash asks that credit links include these referral parameters.
const UTM = 'utm_source=closetcloud&utm_medium=referral'

export function lookCreditUrl(look) {
  return `https://unsplash.com/photos/${look.photoId}?${UTM}`
}

export const UNSPLASH_URL = `https://unsplash.com/?${UTM}`

const lookById = Object.fromEntries(LOOKS.map((look) => [look.id, look]))

/* getLooks(['ivory-coat', 'pink-corset']) → the matching look objects. */
export function getLooks(ids) {
  return ids.map((id) => lookById[id]).filter(Boolean)
}

/*
  A different set of looks each day, the same for everyone that day.
  "Days since 1970" changes once per day, so it works as a simple seed.
  Pass `aesthetics` (e.g. a user's saved quiz result) to pick only from
  those styles; an empty list means all looks.
*/
export function dailyLooks(date, count, offset = 0, aesthetics = []) {
  const pool = aesthetics.length
    ? LOOKS.filter((look) => aesthetics.includes(look.aesthetic))
    : LOOKS
  const all = mixedLooks(pool)
  const day = Math.floor(date.getTime() / 86_400_000)
  const start = (day * count + offset) % all.length
  return Array.from({ length: count }, (_, i) => all[(start + i) % all.length])
}

/* Mixes the aesthetics together so the board doesn't show all the pink
   looks, then all the black ones. Deterministic (same order every load). */
export function mixedLooks(looks = LOOKS) {
  const groups = AESTHETICS.map((a) => looks.filter((look) => look.aesthetic === a.value))
  const mixed = []
  for (let i = 0; mixed.length < looks.length; i++) {
    for (const group of groups) if (group[i]) mixed.push(group[i])
  }
  return mixed
}
