export interface Location {
  slug: string
  name: string
  nameAr: string
  type: "GOVERNORATE" | "CITY"
  governorate: string // slug of parent governorate (same as slug for GOVERNORATE)
}

export const LOCATIONS: Location[] = [
  // ─── Tunis ────────────────────────────────────────────────────────────────
  { slug: "tunis", name: "Tunis", nameAr: "تونس", type: "GOVERNORATE", governorate: "tunis" },
  { slug: "la-marsa", name: "La Marsa", nameAr: "المرسى", type: "CITY", governorate: "tunis" },
  { slug: "carthage", name: "Carthage", nameAr: "قرطاج", type: "CITY", governorate: "tunis" },
  { slug: "le-bardo", name: "Le Bardo", nameAr: "باردو", type: "CITY", governorate: "tunis" },
  { slug: "la-goulette", name: "La Goulette", nameAr: "حلق الوادي", type: "CITY", governorate: "tunis" },
  { slug: "sidi-bou-said", name: "Sidi Bou Saïd", nameAr: "سيدي بوسعيد", type: "CITY", governorate: "tunis" },
  { slug: "el-menzah", name: "El Menzah", nameAr: "المنزه", type: "CITY", governorate: "tunis" },

  // ─── Ariana ───────────────────────────────────────────────────────────────
  { slug: "ariana", name: "Ariana", nameAr: "أريانة", type: "GOVERNORATE", governorate: "ariana" },
  { slug: "ettadhamen", name: "Ettadhamen", nameAr: "التضامن", type: "CITY", governorate: "ariana" },
  { slug: "raoued", name: "Raoued", nameAr: "رواد", type: "CITY", governorate: "ariana" },
  { slug: "soukra", name: "La Soukra", nameAr: "السوكرة", type: "CITY", governorate: "ariana" },
  { slug: "kalaat-landlous", name: "Kalaat El Andalous", nameAr: "قلعة الأندلس", type: "CITY", governorate: "ariana" },

  // ─── Ben Arous ────────────────────────────────────────────────────────────
  { slug: "ben-arous", name: "Ben Arous", nameAr: "بن عروس", type: "GOVERNORATE", governorate: "ben-arous" },
  { slug: "hammam-lif", name: "Hammam Lif", nameAr: "حمام الأنف", type: "CITY", governorate: "ben-arous" },
  { slug: "rades", name: "Radès", nameAr: "رادس", type: "CITY", governorate: "ben-arous" },
  { slug: "ezzahra", name: "Ezzahra", nameAr: "الزهراء", type: "CITY", governorate: "ben-arous" },
  { slug: "megrine", name: "Mégrine", nameAr: "مقرين", type: "CITY", governorate: "ben-arous" },
  { slug: "hammam-chott", name: "Hammam Chott", nameAr: "حمام الشط", type: "CITY", governorate: "ben-arous" },

  // ─── Manouba ──────────────────────────────────────────────────────────────
  { slug: "manouba", name: "Manouba", nameAr: "منوبة", type: "GOVERNORATE", governorate: "manouba" },
  { slug: "douar-hicher", name: "Douar Hicher", nameAr: "دوار هيشر", type: "CITY", governorate: "manouba" },
  { slug: "oued-ellil", name: "Oued Ellil", nameAr: "وادي الليل", type: "CITY", governorate: "manouba" },
  { slug: "djedeida", name: "Djedaïda", nameAr: "الجديدة", type: "CITY", governorate: "manouba" },

  // ─── Nabeul ───────────────────────────────────────────────────────────────
  { slug: "nabeul", name: "Nabeul", nameAr: "نابل", type: "GOVERNORATE", governorate: "nabeul" },
  { slug: "hammamet", name: "Hammamet", nameAr: "الحمامات", type: "CITY", governorate: "nabeul" },
  { slug: "kelibia", name: "Kélibia", nameAr: "قليبية", type: "CITY", governorate: "nabeul" },
  { slug: "korba", name: "Korba", nameAr: "قربة", type: "CITY", governorate: "nabeul" },
  { slug: "menzel-temime", name: "Menzel Temime", nameAr: "منزل تميم", type: "CITY", governorate: "nabeul" },
  { slug: "grombalia", name: "Grombalia", nameAr: "قرمبالية", type: "CITY", governorate: "nabeul" },
  { slug: "soliman", name: "Soliman", nameAr: "سليمان", type: "CITY", governorate: "nabeul" },

  // ─── Zaghouan ─────────────────────────────────────────────────────────────
  { slug: "zaghouan", name: "Zaghouan", nameAr: "زغوان", type: "GOVERNORATE", governorate: "zaghouan" },
  { slug: "bir-mcherga", name: "Bir M'cherga", nameAr: "بئر مشارقة", type: "CITY", governorate: "zaghouan" },
  { slug: "zriba", name: "Zriba", nameAr: "زريبة", type: "CITY", governorate: "zaghouan" },

  // ─── Bizerte ──────────────────────────────────────────────────────────────
  { slug: "bizerte", name: "Bizerte", nameAr: "بنزرت", type: "GOVERNORATE", governorate: "bizerte" },
  { slug: "menzel-bourguiba", name: "Menzel Bourguiba", nameAr: "منزل بورقيبة", type: "CITY", governorate: "bizerte" },
  { slug: "mateur", name: "Mateur", nameAr: "ماطر", type: "CITY", governorate: "bizerte" },
  { slug: "ras-jebel", name: "Ras Jebel", nameAr: "رأس الجبل", type: "CITY", governorate: "bizerte" },
  { slug: "menzel-jemil", name: "Menzel Jamil", nameAr: "منزل جميل", type: "CITY", governorate: "bizerte" },

  // ─── Béja ─────────────────────────────────────────────────────────────────
  { slug: "beja", name: "Béja", nameAr: "باجة", type: "GOVERNORATE", governorate: "beja" },
  { slug: "medjez-el-bab", name: "Medjez el-Bab", nameAr: "مجاز الباب", type: "CITY", governorate: "beja" },
  { slug: "testour", name: "Testour", nameAr: "تستور", type: "CITY", governorate: "beja" },
  { slug: "nefza", name: "Nefza", nameAr: "نفزة", type: "CITY", governorate: "beja" },

  // ─── Jendouba ─────────────────────────────────────────────────────────────
  { slug: "jendouba", name: "Jendouba", nameAr: "جندوبة", type: "GOVERNORATE", governorate: "jendouba" },
  { slug: "tabarka", name: "Tabarka", nameAr: "طبرقة", type: "CITY", governorate: "jendouba" },
  { slug: "ain-draham", name: "Aïn Draham", nameAr: "عين دراهم", type: "CITY", governorate: "jendouba" },
  { slug: "ghardimaou", name: "Ghardimaou", nameAr: "غار الدماء", type: "CITY", governorate: "jendouba" },
  { slug: "bou-salem", name: "Bou Salem", nameAr: "بوسالم", type: "CITY", governorate: "jendouba" },

  // ─── Le Kef ───────────────────────────────────────────────────────────────
  { slug: "kef", name: "Le Kef", nameAr: "الكاف", type: "GOVERNORATE", governorate: "kef" },
  { slug: "dahmani", name: "Dahmani", nameAr: "الدهماني", type: "CITY", governorate: "kef" },
  { slug: "tajerouine", name: "Tajerouine", nameAr: "تاجروين", type: "CITY", governorate: "kef" },
  { slug: "jerissa", name: "Jerissa", nameAr: "الجريصة", type: "CITY", governorate: "kef" },

  // ─── Siliana ──────────────────────────────────────────────────────────────
  { slug: "siliana", name: "Siliana", nameAr: "سليانة", type: "GOVERNORATE", governorate: "siliana" },
  { slug: "makthar", name: "Makthar", nameAr: "مكثر", type: "CITY", governorate: "siliana" },
  { slug: "rohia", name: "Rouhia", nameAr: "الروحية", type: "CITY", governorate: "siliana" },
  { slug: "bou-arada", name: "Bou Arada", nameAr: "بوعرادة", type: "CITY", governorate: "siliana" },

  // ─── Sousse ───────────────────────────────────────────────────────────────
  { slug: "sousse", name: "Sousse", nameAr: "سوسة", type: "GOVERNORATE", governorate: "sousse" },
  { slug: "hammam-sousse", name: "Hammam Sousse", nameAr: "حمام سوسة", type: "CITY", governorate: "sousse" },
  { slug: "msaken", name: "M'saken", nameAr: "مساكن", type: "CITY", governorate: "sousse" },
  { slug: "kalaa-kebira", name: "Kalaa Kebira", nameAr: "القلعة الكبرى", type: "CITY", governorate: "sousse" },
  { slug: "enfidha", name: "Enfidha", nameAr: "النفيضة", type: "CITY", governorate: "sousse" },

  // ─── Monastir ─────────────────────────────────────────────────────────────
  { slug: "monastir", name: "Monastir", nameAr: "المنستير", type: "GOVERNORATE", governorate: "monastir" },
  { slug: "moknine", name: "Moknine", nameAr: "المكنين", type: "CITY", governorate: "monastir" },
  { slug: "ksar-hellal", name: "Ksar Hellal", nameAr: "قصر هلال", type: "CITY", governorate: "monastir" },
  { slug: "teboulba", name: "Teboulba", nameAr: "طبلبة", type: "CITY", governorate: "monastir" },
  { slug: "jemmal", name: "Jemmal", nameAr: "جمال", type: "CITY", governorate: "monastir" },

  // ─── Mahdia ───────────────────────────────────────────────────────────────
  { slug: "mahdia", name: "Mahdia", nameAr: "المهدية", type: "GOVERNORATE", governorate: "mahdia" },
  { slug: "el-jem", name: "El Jem", nameAr: "الجم", type: "CITY", governorate: "mahdia" },
  { slug: "chebba", name: "Chebba", nameAr: "الشابة", type: "CITY", governorate: "mahdia" },
  { slug: "ksour-essaf", name: "Ksour Essaf", nameAr: "قصور الساف", type: "CITY", governorate: "mahdia" },

  // ─── Sfax ─────────────────────────────────────────────────────────────────
  { slug: "sfax", name: "Sfax", nameAr: "صفاقس", type: "GOVERNORATE", governorate: "sfax" },
  { slug: "sakiet-ezzit", name: "Sakiet Ezzit", nameAr: "ساقية الزيت", type: "CITY", governorate: "sfax" },
  { slug: "sakiet-eddaier", name: "Sakiet Eddaïer", nameAr: "ساقية الداير", type: "CITY", governorate: "sfax" },
  { slug: "el-ain", name: "El Ain", nameAr: "العين", type: "CITY", governorate: "sfax" },
  { slug: "agareb", name: "Agareb", nameAr: "عقارب", type: "CITY", governorate: "sfax" },

  // ─── Kairouan ─────────────────────────────────────────────────────────────
  { slug: "kairouan", name: "Kairouan", nameAr: "القيروان", type: "GOVERNORATE", governorate: "kairouan" },
  { slug: "haffouz", name: "Haffouz", nameAr: "حفوز", type: "CITY", governorate: "kairouan" },
  { slug: "el-oueslatia", name: "El Oueslatia", nameAr: "الوسلاتية", type: "CITY", governorate: "kairouan" },
  { slug: "nasrallah", name: "Nasrallah", nameAr: "نصر الله", type: "CITY", governorate: "kairouan" },

  // ─── Kasserine ────────────────────────────────────────────────────────────
  { slug: "kasserine", name: "Kasserine", nameAr: "القصرين", type: "GOVERNORATE", governorate: "kasserine" },
  { slug: "sbeitla", name: "Sbeitla", nameAr: "سبيطلة", type: "CITY", governorate: "kasserine" },
  { slug: "thala", name: "Thala", nameAr: "ثالة", type: "CITY", governorate: "kasserine" },
  { slug: "feriana", name: "Fériana", nameAr: "فريانة", type: "CITY", governorate: "kasserine" },

  // ─── Sidi Bouzid ──────────────────────────────────────────────────────────
  { slug: "sidi-bouzid", name: "Sidi Bouzid", nameAr: "سيدي بوزيد", type: "GOVERNORATE", governorate: "sidi-bouzid" },
  { slug: "meknassy", name: "Meknassy", nameAr: "مكناسي", type: "CITY", governorate: "sidi-bouzid" },
  { slug: "regueb", name: "Regueb", nameAr: "رقاب", type: "CITY", governorate: "sidi-bouzid" },
  { slug: "bir-el-hafey", name: "Bir el Hafey", nameAr: "بئر الحفي", type: "CITY", governorate: "sidi-bouzid" },

  // ─── Gabès ────────────────────────────────────────────────────────────────
  { slug: "gabes", name: "Gabès", nameAr: "قابس", type: "GOVERNORATE", governorate: "gabes" },
  { slug: "mareth", name: "Mareth", nameAr: "مارث", type: "CITY", governorate: "gabes" },
  { slug: "matmata", name: "Matmata", nameAr: "مطماطة", type: "CITY", governorate: "gabes" },
  { slug: "el-hamma", name: "El Hamma", nameAr: "الحامة", type: "CITY", governorate: "gabes" },

  // ─── Medenine ─────────────────────────────────────────────────────────────
  { slug: "medenine", name: "Medenine", nameAr: "مدنين", type: "GOVERNORATE", governorate: "medenine" },
  { slug: "zarzis", name: "Zarzis", nameAr: "جرجيس", type: "CITY", governorate: "medenine" },
  { slug: "djerba-houmt-souk", name: "Djerba - Houmt Souk", nameAr: "جربة - حومة السوق", type: "CITY", governorate: "medenine" },
  { slug: "djerba-midoun", name: "Djerba - Midoun", nameAr: "جربة - ميدون", type: "CITY", governorate: "medenine" },
  { slug: "ben-gardane", name: "Ben Gardane", nameAr: "بن قردان", type: "CITY", governorate: "medenine" },

  // ─── Tataouine ────────────────────────────────────────────────────────────
  { slug: "tataouine", name: "Tataouine", nameAr: "تطاوين", type: "GOVERNORATE", governorate: "tataouine" },
  { slug: "ghomrassen", name: "Ghomrassen", nameAr: "غمراسن", type: "CITY", governorate: "tataouine" },
  { slug: "remada", name: "Remada", nameAr: "رمادة", type: "CITY", governorate: "tataouine" },

  // ─── Gafsa ────────────────────────────────────────────────────────────────
  { slug: "gafsa", name: "Gafsa", nameAr: "قفصة", type: "GOVERNORATE", governorate: "gafsa" },
  { slug: "metlaoui", name: "Metlaoui", nameAr: "المتلوي", type: "CITY", governorate: "gafsa" },
  { slug: "moulares", name: "Moularès", nameAr: "أم العرائس", type: "CITY", governorate: "gafsa" },
  { slug: "redeyef", name: "Redeyef", nameAr: "الرديف", type: "CITY", governorate: "gafsa" },
  { slug: "el-ksar", name: "El Ksar", nameAr: "القصر", type: "CITY", governorate: "gafsa" },

  // ─── Tozeur ───────────────────────────────────────────────────────────────
  { slug: "tozeur", name: "Tozeur", nameAr: "توزر", type: "GOVERNORATE", governorate: "tozeur" },
  { slug: "nefta", name: "Nefta", nameAr: "نفطة", type: "CITY", governorate: "tozeur" },
  { slug: "degache", name: "Degache", nameAr: "دقاش", type: "CITY", governorate: "tozeur" },
  { slug: "tamerza", name: "Tamerza", nameAr: "تمرزة", type: "CITY", governorate: "tozeur" },

  // ─── Kebili ───────────────────────────────────────────────────────────────
  { slug: "kebili", name: "Kebili", nameAr: "قبلي", type: "GOVERNORATE", governorate: "kebili" },
  { slug: "douz", name: "Douz", nameAr: "دوز", type: "CITY", governorate: "kebili" },
  { slug: "souk-lahad", name: "Souk Lahad", nameAr: "سوق الأحد", type: "CITY", governorate: "kebili" },
  { slug: "el-faouar", name: "El Faouar", nameAr: "الفوار", type: "CITY", governorate: "kebili" },
]

export const GOVERNORATES = LOCATIONS.filter((l) => l.type === "GOVERNORATE")

export function getLocation(slug: string) {
  return LOCATIONS.find((l) => l.slug === slug) ?? null
}

export function getCitiesForGov(governorateSlug: string) {
  return LOCATIONS.filter((l) => l.type === "CITY" && l.governorate === governorateSlug)
}
