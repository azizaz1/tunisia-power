export interface Location {
  slug: string
  name: string
  nameAr: string
  type: "GOVERNORATE" | "CITY"
  governorate: string // slug of parent governorate (same as slug for GOVERNORATE)
  lat: number
  lng: number
}

export const LOCATIONS: Location[] = [
  // ─── Tunis ────────────────────────────────────────────────────────────────
  { slug: "tunis", name: "Tunis", nameAr: "تونس", type: "GOVERNORATE", governorate: "tunis", lat: 36.8065, lng: 10.1815 },
  { slug: "la-marsa", name: "La Marsa", nameAr: "المرسى", type: "CITY", governorate: "tunis", lat: 36.8782, lng: 10.3247 },
  { slug: "carthage", name: "Carthage", nameAr: "قرطاج", type: "CITY", governorate: "tunis", lat: 36.8531, lng: 10.3239 },
  { slug: "le-bardo", name: "Le Bardo", nameAr: "باردو", type: "CITY", governorate: "tunis", lat: 36.8092, lng: 10.1397 },
  { slug: "la-goulette", name: "La Goulette", nameAr: "حلق الوادي", type: "CITY", governorate: "tunis", lat: 36.8189, lng: 10.3053 },
  { slug: "sidi-bou-said", name: "Sidi Bou Saïd", nameAr: "سيدي بوسعيد", type: "CITY", governorate: "tunis", lat: 36.8703, lng: 10.3417 },
  { slug: "el-menzah", name: "El Menzah", nameAr: "المنزه", type: "CITY", governorate: "tunis", lat: 36.8467, lng: 10.1611 },

  // ─── Ariana ───────────────────────────────────────────────────────────────
  { slug: "ariana", name: "Ariana", nameAr: "أريانة", type: "GOVERNORATE", governorate: "ariana", lat: 36.8625, lng: 10.1956 },
  { slug: "ettadhamen", name: "Ettadhamen", nameAr: "التضامن", type: "CITY", governorate: "ariana", lat: 36.8419, lng: 10.1281 },
  { slug: "raoued", name: "Raoued", nameAr: "رواد", type: "CITY", governorate: "ariana", lat: 36.9394, lng: 10.2231 },
  { slug: "soukra", name: "La Soukra", nameAr: "السوكرة", type: "CITY", governorate: "ariana", lat: 36.8975, lng: 10.2372 },
  { slug: "kalaat-landlous", name: "Kalaat El Andalous", nameAr: "قلعة الأندلس", type: "CITY", governorate: "ariana", lat: 37.0333, lng: 10.0500 },

  // ─── Ben Arous ────────────────────────────────────────────────────────────
  { slug: "ben-arous", name: "Ben Arous", nameAr: "بن عروس", type: "GOVERNORATE", governorate: "ben-arous", lat: 36.7533, lng: 10.2282 },
  { slug: "hammam-lif", name: "Hammam Lif", nameAr: "حمام الأنف", type: "CITY", governorate: "ben-arous", lat: 36.7228, lng: 10.3383 },
  { slug: "rades", name: "Radès", nameAr: "رادس", type: "CITY", governorate: "ben-arous", lat: 36.7681, lng: 10.2789 },
  { slug: "ezzahra", name: "Ezzahra", nameAr: "الزهراء", type: "CITY", governorate: "ben-arous", lat: 36.7433, lng: 10.3083 },
  { slug: "megrine", name: "Mégrine", nameAr: "مقرين", type: "CITY", governorate: "ben-arous", lat: 36.7597, lng: 10.2394 },
  { slug: "hammam-chott", name: "Hammam Chott", nameAr: "حمام الشط", type: "CITY", governorate: "ben-arous", lat: 36.7139, lng: 10.3389 },

  // ─── Manouba ──────────────────────────────────────────────────────────────
  { slug: "manouba", name: "Manouba", nameAr: "منوبة", type: "GOVERNORATE", governorate: "manouba", lat: 36.8081, lng: 10.0972 },
  { slug: "douar-hicher", name: "Douar Hicher", nameAr: "دوار هيشر", type: "CITY", governorate: "manouba", lat: 36.8358, lng: 10.0489 },
  { slug: "oued-ellil", name: "Oued Ellil", nameAr: "وادي الليل", type: "CITY", governorate: "manouba", lat: 36.8272, lng: 10.0186 },
  { slug: "djedeida", name: "Djedaïda", nameAr: "الجديدة", type: "CITY", governorate: "manouba", lat: 36.9167, lng: 9.9500 },

  // ─── Nabeul ───────────────────────────────────────────────────────────────
  { slug: "nabeul", name: "Nabeul", nameAr: "نابل", type: "GOVERNORATE", governorate: "nabeul", lat: 36.4561, lng: 10.7376 },
  { slug: "hammamet", name: "Hammamet", nameAr: "الحمامات", type: "CITY", governorate: "nabeul", lat: 36.4000, lng: 10.6167 },
  { slug: "kelibia", name: "Kélibia", nameAr: "قليبية", type: "CITY", governorate: "nabeul", lat: 36.8419, lng: 11.0940 },
  { slug: "korba", name: "Korba", nameAr: "قربة", type: "CITY", governorate: "nabeul", lat: 36.5717, lng: 10.8600 },
  { slug: "menzel-temime", name: "Menzel Temime", nameAr: "منزل تميم", type: "CITY", governorate: "nabeul", lat: 36.7808, lng: 10.9950 },
  { slug: "grombalia", name: "Grombalia", nameAr: "قرمبالية", type: "CITY", governorate: "nabeul", lat: 36.6011, lng: 10.5000 },
  { slug: "soliman", name: "Soliman", nameAr: "سليمان", type: "CITY", governorate: "nabeul", lat: 36.6997, lng: 10.4839 },

  // ─── Zaghouan ─────────────────────────────────────────────────────────────
  { slug: "zaghouan", name: "Zaghouan", nameAr: "زغوان", type: "GOVERNORATE", governorate: "zaghouan", lat: 36.4029, lng: 10.1429 },
  { slug: "bir-mcherga", name: "Bir M'cherga", nameAr: "بئر مشارقة", type: "CITY", governorate: "zaghouan", lat: 36.4667, lng: 9.9500 },
  { slug: "zriba", name: "Zriba", nameAr: "زريبة", type: "CITY", governorate: "zaghouan", lat: 36.3167, lng: 10.1167 },

  // ─── Bizerte ──────────────────────────────────────────────────────────────
  { slug: "bizerte", name: "Bizerte", nameAr: "بنزرت", type: "GOVERNORATE", governorate: "bizerte", lat: 37.2744, lng: 9.8739 },
  { slug: "menzel-bourguiba", name: "Menzel Bourguiba", nameAr: "منزل بورقيبة", type: "CITY", governorate: "bizerte", lat: 37.1547, lng: 9.7911 },
  { slug: "mateur", name: "Mateur", nameAr: "ماطر", type: "CITY", governorate: "bizerte", lat: 37.0392, lng: 9.6683 },
  { slug: "ras-jebel", name: "Ras Jebel", nameAr: "رأس الجبل", type: "CITY", governorate: "bizerte", lat: 37.2153, lng: 10.1200 },
  { slug: "menzel-jemil", name: "Menzel Jamil", nameAr: "منزل جميل", type: "CITY", governorate: "bizerte", lat: 37.2394, lng: 9.8489 },

  // ─── Béja ─────────────────────────────────────────────────────────────────
  { slug: "beja", name: "Béja", nameAr: "باجة", type: "GOVERNORATE", governorate: "beja", lat: 36.7256, lng: 9.1817 },
  { slug: "medjez-el-bab", name: "Medjez el-Bab", nameAr: "مجاز الباب", type: "CITY", governorate: "beja", lat: 36.6472, lng: 9.6156 },
  { slug: "testour", name: "Testour", nameAr: "تستور", type: "CITY", governorate: "beja", lat: 36.5522, lng: 9.4406 },
  { slug: "nefza", name: "Nefza", nameAr: "نفزة", type: "CITY", governorate: "beja", lat: 37.0833, lng: 9.1167 },

  // ─── Jendouba ─────────────────────────────────────────────────────────────
  { slug: "jendouba", name: "Jendouba", nameAr: "جندوبة", type: "GOVERNORATE", governorate: "jendouba", lat: 36.5011, lng: 8.7803 },
  { slug: "tabarka", name: "Tabarka", nameAr: "طبرقة", type: "CITY", governorate: "jendouba", lat: 36.9547, lng: 8.7583 },
  { slug: "ain-draham", name: "Aïn Draham", nameAr: "عين دراهم", type: "CITY", governorate: "jendouba", lat: 36.7761, lng: 8.6889 },
  { slug: "ghardimaou", name: "Ghardimaou", nameAr: "غار الدماء", type: "CITY", governorate: "jendouba", lat: 36.4531, lng: 8.4372 },
  { slug: "bou-salem", name: "Bou Salem", nameAr: "بوسالم", type: "CITY", governorate: "jendouba", lat: 36.6083, lng: 8.9694 },

  // ─── Le Kef ───────────────────────────────────────────────────────────────
  { slug: "kef", name: "Le Kef", nameAr: "الكاف", type: "GOVERNORATE", governorate: "kef", lat: 36.1826, lng: 8.7148 },
  { slug: "dahmani", name: "Dahmani", nameAr: "الدهماني", type: "CITY", governorate: "kef", lat: 35.9333, lng: 8.8333 },
  { slug: "tajerouine", name: "Tajerouine", nameAr: "تاجروين", type: "CITY", governorate: "kef", lat: 35.8833, lng: 8.5583 },
  { slug: "jerissa", name: "Jerissa", nameAr: "الجريصة", type: "CITY", governorate: "kef", lat: 36.1500, lng: 8.5833 },

  // ─── Siliana ──────────────────────────────────────────────────────────────
  { slug: "siliana", name: "Siliana", nameAr: "سليانة", type: "GOVERNORATE", governorate: "siliana", lat: 36.0844, lng: 9.3708 },
  { slug: "makthar", name: "Makthar", nameAr: "مكثر", type: "CITY", governorate: "siliana", lat: 35.8628, lng: 9.2003 },
  { slug: "rohia", name: "Rouhia", nameAr: "الروحية", type: "CITY", governorate: "siliana", lat: 35.8556, lng: 9.1078 },
  { slug: "bou-arada", name: "Bou Arada", nameAr: "بوعرادة", type: "CITY", governorate: "siliana", lat: 36.3583, lng: 9.6167 },

  // ─── Sousse ───────────────────────────────────────────────────────────────
  { slug: "sousse", name: "Sousse", nameAr: "سوسة", type: "GOVERNORATE", governorate: "sousse", lat: 35.8256, lng: 10.6369 },
  { slug: "hammam-sousse", name: "Hammam Sousse", nameAr: "حمام سوسة", type: "CITY", governorate: "sousse", lat: 35.8592, lng: 10.5983 },
  { slug: "msaken", name: "M'saken", nameAr: "مساكن", type: "CITY", governorate: "sousse", lat: 35.7333, lng: 10.5833 },
  { slug: "kalaa-kebira", name: "Kalaa Kebira", nameAr: "القلعة الكبرى", type: "CITY", governorate: "sousse", lat: 35.8722, lng: 10.5347 },
  { slug: "enfidha", name: "Enfidha", nameAr: "النفيضة", type: "CITY", governorate: "sousse", lat: 36.1372, lng: 10.3775 },

  // ─── Monastir ─────────────────────────────────────────────────────────────
  { slug: "monastir", name: "Monastir", nameAr: "المنستير", type: "GOVERNORATE", governorate: "monastir", lat: 35.7643, lng: 10.8113 },
  { slug: "moknine", name: "Moknine", nameAr: "المكنين", type: "CITY", governorate: "monastir", lat: 35.6297, lng: 10.8994 },
  { slug: "ksar-hellal", name: "Ksar Hellal", nameAr: "قصر هلال", type: "CITY", governorate: "monastir", lat: 35.6444, lng: 10.8917 },
  { slug: "teboulba", name: "Teboulba", nameAr: "طبلبة", type: "CITY", governorate: "monastir", lat: 35.6739, lng: 10.9319 },
  { slug: "jemmal", name: "Jemmal", nameAr: "جمال", type: "CITY", governorate: "monastir", lat: 35.6244, lng: 10.7594 },

  // ─── Mahdia ───────────────────────────────────────────────────────────────
  { slug: "mahdia", name: "Mahdia", nameAr: "المهدية", type: "GOVERNORATE", governorate: "mahdia", lat: 35.5047, lng: 11.0622 },
  { slug: "el-jem", name: "El Jem", nameAr: "الجم", type: "CITY", governorate: "mahdia", lat: 35.2967, lng: 10.7150 },
  { slug: "chebba", name: "Chebba", nameAr: "الشابة", type: "CITY", governorate: "mahdia", lat: 35.2378, lng: 11.1150 },
  { slug: "ksour-essaf", name: "Ksour Essaf", nameAr: "قصور الساف", type: "CITY", governorate: "mahdia", lat: 35.4167, lng: 10.9833 },

  // ─── Sfax ─────────────────────────────────────────────────────────────────
  { slug: "sfax", name: "Sfax", nameAr: "صفاقس", type: "GOVERNORATE", governorate: "sfax", lat: 34.7406, lng: 10.7603 },
  { slug: "sakiet-ezzit", name: "Sakiet Ezzit", nameAr: "ساقية الزيت", type: "CITY", governorate: "sfax", lat: 34.7833, lng: 10.7333 },
  { slug: "sakiet-eddaier", name: "Sakiet Eddaïer", nameAr: "ساقية الداير", type: "CITY", governorate: "sfax", lat: 34.7667, lng: 10.7500 },
  { slug: "el-ain", name: "El Ain", nameAr: "العين", type: "CITY", governorate: "sfax", lat: 34.7333, lng: 10.6833 },
  { slug: "agareb", name: "Agareb", nameAr: "عقارب", type: "CITY", governorate: "sfax", lat: 34.7500, lng: 10.5000 },

  // ─── Kairouan ─────────────────────────────────────────────────────────────
  { slug: "kairouan", name: "Kairouan", nameAr: "القيروان", type: "GOVERNORATE", governorate: "kairouan", lat: 35.6781, lng: 10.0963 },
  { slug: "haffouz", name: "Haffouz", nameAr: "حفوز", type: "CITY", governorate: "kairouan", lat: 35.6333, lng: 9.6667 },
  { slug: "el-oueslatia", name: "El Oueslatia", nameAr: "الوسلاتية", type: "CITY", governorate: "kairouan", lat: 35.9167, lng: 9.7833 },
  { slug: "nasrallah", name: "Nasrallah", nameAr: "نصر الله", type: "CITY", governorate: "kairouan", lat: 35.3667, lng: 9.8500 },

  // ─── Kasserine ────────────────────────────────────────────────────────────
  { slug: "kasserine", name: "Kasserine", nameAr: "القصرين", type: "GOVERNORATE", governorate: "kasserine", lat: 35.1676, lng: 8.8365 },
  { slug: "sbeitla", name: "Sbeitla", nameAr: "سبيطلة", type: "CITY", governorate: "kasserine", lat: 35.2333, lng: 9.1167 },
  { slug: "thala", name: "Thala", nameAr: "ثالة", type: "CITY", governorate: "kasserine", lat: 35.5667, lng: 8.6667 },
  { slug: "feriana", name: "Fériana", nameAr: "فريانة", type: "CITY", governorate: "kasserine", lat: 34.9500, lng: 8.5667 },

  // ─── Sidi Bouzid ──────────────────────────────────────────────────────────
  { slug: "sidi-bouzid", name: "Sidi Bouzid", nameAr: "سيدي بوزيد", type: "GOVERNORATE", governorate: "sidi-bouzid", lat: 35.0381, lng: 9.4858 },
  { slug: "meknassy", name: "Meknassy", nameAr: "مكناسي", type: "CITY", governorate: "sidi-bouzid", lat: 34.6167, lng: 9.6167 },
  { slug: "regueb", name: "Regueb", nameAr: "رقاب", type: "CITY", governorate: "sidi-bouzid", lat: 34.8500, lng: 9.7667 },
  { slug: "bir-el-hafey", name: "Bir el Hafey", nameAr: "بئر الحفي", type: "CITY", governorate: "sidi-bouzid", lat: 34.9167, lng: 9.1667 },

  // ─── Gabès ────────────────────────────────────────────────────────────────
  { slug: "gabes", name: "Gabès", nameAr: "قابس", type: "GOVERNORATE", governorate: "gabes", lat: 33.8815, lng: 10.0982 },
  { slug: "mareth", name: "Mareth", nameAr: "مارث", type: "CITY", governorate: "gabes", lat: 33.6333, lng: 10.2833 },
  { slug: "matmata", name: "Matmata", nameAr: "مطماطة", type: "CITY", governorate: "gabes", lat: 33.5433, lng: 9.9683 },
  { slug: "el-hamma", name: "El Hamma", nameAr: "الحامة", type: "CITY", governorate: "gabes", lat: 33.8858, lng: 9.7947 },

  // ─── Medenine ─────────────────────────────────────────────────────────────
  { slug: "medenine", name: "Medenine", nameAr: "مدنين", type: "GOVERNORATE", governorate: "medenine", lat: 33.3549, lng: 10.5055 },
  { slug: "zarzis", name: "Zarzis", nameAr: "جرجيس", type: "CITY", governorate: "medenine", lat: 33.5044, lng: 11.1122 },
  { slug: "djerba-houmt-souk", name: "Djerba - Houmt Souk", nameAr: "جربة - حومة السوق", type: "CITY", governorate: "medenine", lat: 33.8759, lng: 10.8578 },
  { slug: "djerba-midoun", name: "Djerba - Midoun", nameAr: "جربة - ميدون", type: "CITY", governorate: "medenine", lat: 33.8083, lng: 10.9989 },
  { slug: "ben-gardane", name: "Ben Gardane", nameAr: "بن قردان", type: "CITY", governorate: "medenine", lat: 33.1394, lng: 11.2178 },

  // ─── Tataouine ────────────────────────────────────────────────────────────
  { slug: "tataouine", name: "Tataouine", nameAr: "تطاوين", type: "GOVERNORATE", governorate: "tataouine", lat: 32.9297, lng: 10.4518 },
  { slug: "ghomrassen", name: "Ghomrassen", nameAr: "غمراسن", type: "CITY", governorate: "tataouine", lat: 33.0578, lng: 10.2306 },
  { slug: "remada", name: "Remada", nameAr: "رمادة", type: "CITY", governorate: "tataouine", lat: 32.3167, lng: 10.3833 },

  // ─── Gafsa ────────────────────────────────────────────────────────────────
  { slug: "gafsa", name: "Gafsa", nameAr: "قفصة", type: "GOVERNORATE", governorate: "gafsa", lat: 34.4250, lng: 8.7842 },
  { slug: "metlaoui", name: "Metlaoui", nameAr: "المتلوي", type: "CITY", governorate: "gafsa", lat: 34.3333, lng: 8.4000 },
  { slug: "moulares", name: "Moularès", nameAr: "أم العرائس", type: "CITY", governorate: "gafsa", lat: 34.5500, lng: 8.2333 },
  { slug: "redeyef", name: "Redeyef", nameAr: "الرديف", type: "CITY", governorate: "gafsa", lat: 34.3833, lng: 8.1500 },
  { slug: "el-ksar", name: "El Ksar", nameAr: "القصر", type: "CITY", governorate: "gafsa", lat: 34.3833, lng: 8.8000 },

  // ─── Tozeur ───────────────────────────────────────────────────────────────
  { slug: "tozeur", name: "Tozeur", nameAr: "توزر", type: "GOVERNORATE", governorate: "tozeur", lat: 33.9197, lng: 8.1335 },
  { slug: "nefta", name: "Nefta", nameAr: "نفطة", type: "CITY", governorate: "tozeur", lat: 33.8733, lng: 7.8792 },
  { slug: "degache", name: "Degache", nameAr: "دقاش", type: "CITY", governorate: "tozeur", lat: 33.9700, lng: 8.2000 },
  { slug: "tamerza", name: "Tamerza", nameAr: "تمرزة", type: "CITY", governorate: "tozeur", lat: 34.3833, lng: 7.9500 },

  // ─── Kebili ───────────────────────────────────────────────────────────────
  { slug: "kebili", name: "Kebili", nameAr: "قبلي", type: "GOVERNORATE", governorate: "kebili", lat: 33.7044, lng: 8.9690 },
  { slug: "douz", name: "Douz", nameAr: "دوز", type: "CITY", governorate: "kebili", lat: 33.4667, lng: 9.0167 },
  { slug: "souk-lahad", name: "Souk Lahad", nameAr: "سوق الأحد", type: "CITY", governorate: "kebili", lat: 33.6167, lng: 8.8667 },
  { slug: "el-faouar", name: "El Faouar", nameAr: "الفوار", type: "CITY", governorate: "kebili", lat: 33.3167, lng: 8.9833 },
]

export const GOVERNORATES = LOCATIONS.filter((l) => l.type === "GOVERNORATE")

export function getLocation(slug: string) {
  return LOCATIONS.find((l) => l.slug === slug) ?? null
}

export function getCitiesForGov(governorateSlug: string) {
  return LOCATIONS.filter((l) => l.type === "CITY" && l.governorate === governorateSlug)
}
