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

export const AESTHETICS = [
  { value: 'coquette', label: 'Coquette' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'streetwear', label: 'Streetwear' },
  { value: 'college', label: 'College' },
  { value: 'casual', label: 'Casual' },
  { value: 'date-night', label: 'Date night' },
  { value: 'formal', label: 'Formal' },
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
*/
export function dailyLooks(date, count, offset = 0) {
  const all = mixedLooks()
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
