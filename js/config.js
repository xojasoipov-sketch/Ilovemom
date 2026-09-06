/* =====================================================================
   ONAJON — Sovg'a sayti konfiguratsiyasi
   ---------------------------------------------------------------------
   Boss, FAQAT SHU FAYLNI tahrirlaysiz. Kod tarafiga tegish shart emas.
   - Rasmlar:   assets/photos/ papkasiga tashlang va yo'lini yozing
   - Musiqa:    assets/music/ papkasiga .mp3 tashlang va yo'lini yozing
   - Matnlar:   xohlagancha o'zgartiring (o'zbekcha lotin)
   ===================================================================== */

window.GIFT_CONFIG = {

  /* ---------- Asosiy ma'lumotlar ---------- */
  mother: {
    name: "Onajon",                 // Masalan: "Gulnora Karimova"
    shortName: "Onajon",            // Sarlavhalarda ishlatiladi
    birthYear: 1970,                // Tug'ilgan yili (yosh avtomatik hisoblanadi)
    birthday: "2026-09-20",         // YYYY-MM-DD — tug'ilgan kun sanasi (bu yilgi)
    heroPhoto: "assets/photos/hero.svg",
  },

  /* ---------- Kimdan ---------- */
  from: {
    signature: "Sizni cheksiz sevuvchi farzandlaringiz",
    names: ["Farzandingiz", "Kelinngiz", "Nevaralaringiz"],
  },

  /* ---------- Musiqa ----------
     src bo'sh yoki fayl topilmasa, sayt o'zi yumshoq fortepiano
     ohangini (Web Audio) chalib beradi — hech qachon jim qolmaydi. */
  music: {
    src: "assets/music/song.mp3",
    title: "Onam uchun",
    artist: "Sevimli qo'shig'ingiz",
    volume: 0.7,
  },

  /* ---------- Konvert / kirish ---------- */
  envelope: {
    to: "Onajonga",
    hint: "Ochish uchun bosing",
    sealLetter: "♥",
  },

  /* ---------- Kino-titrlar (konvert ochilgach) ---------- */
  intro: [
    "Har bir insonning hayotida bitta yulduz bo'ladi…",
    "U tunda yo'l ko'rsatadi, kunduzi iliq qiladi.",
    "Bizning yulduzimiz — Siz, Onajon.",
    "Bu hikoya Siz haqingizda.",
  ],

  /* ---------- Hikoya boblari (love story) ----------
     Har bir bob: yil, sarlavha, matn, rasm. Xohlagancha qo'shing. */
  chapters: [
    {
      year: "1970",
      title: "Boshlanish",
      text: "Bir kuz kuni dunyoga kichkina bir qiz keldi. Hech kim bilmasdi — u bir kun butun bir oilaning quyoshi bo'ladi.",
      photo: "assets/photos/chapter-1.svg",
    },
    {
      year: "1988",
      title: "Yoshlik",
      text: "Orzular katta, yo'llar uzoq edi. Siz hech qachon to'xtamadingiz — o'qidingiz, o'rgandingiz, yashadingiz.",
      photo: "assets/photos/chapter-2.svg",
    },
    {
      year: "1994",
      title: "Oila",
      text: "Bir uy, bir dasturxon, bir yurak. Siz uyni uyga aylantirdingiz.",
      photo: "assets/photos/chapter-3.svg",
    },
    {
      year: "2000-lar",
      title: "Biz",
      text: "Bizning har bir qadamimizda Sizning qo'lingiz bor edi. Yiqilganda ko'tardingiz, yutganda birinchi bo'lib quvondingiz.",
      photo: "assets/photos/chapter-4.svg",
    },
    {
      year: "Bugun",
      title: "Sizning kuningiz",
      text: "Bugun butun oila bir joyga yig'ildi — bitta sabab bilan: Sizga rahmat aytish uchun.",
      photo: "assets/photos/chapter-5.svg",
    },
  ],

  /* ---------- Xotiralar karuseli ---------- */
  gallery: [
    { src: "assets/photos/memory-1.svg", caption: "Birinchi kulgi" },
    { src: "assets/photos/memory-2.svg", caption: "Bayram dasturxoni" },
    { src: "assets/photos/memory-3.svg", caption: "Yozgi ta'til" },
    { src: "assets/photos/memory-4.svg", caption: "Onam va men" },
    { src: "assets/photos/memory-5.svg", caption: "Nevaralar bilan" },
    { src: "assets/photos/memory-6.svg", caption: "Bahor" },
    { src: "assets/photos/memory-7.svg", caption: "Oila" },
    { src: "assets/photos/memory-8.svg", caption: "Eng yaxshi kun" },
  ],

  /* ---------- Tabriklar ----------
     audio: ixtiyoriy — assets/music/ ichiga ovozli tabrik (.mp3) */
  wishes: [
    {
      name: "Farzandingiz",
      relation: "O'g'lingiz",
      text: "Onajon, Siz bo'lmaganingizda men bo'lmasdim. Har bir yutug'imda Sizning duoingiz bor. Sog' bo'ling, uzoq yashang!",
      audio: "",
    },
    {
      name: "Kelinngiz",
      relation: "Kelin",
      text: "Menga ikkinchi ona bo'ldingiz. Mehringiz, sabringiz uchun rahmat. Tug'ilgan kuningiz muborak!",
      audio: "",
    },
    {
      name: "Nevarangiz",
      relation: "Nevara",
      text: "Buvijon! Sizning somsangiz dunyodagi eng mazali somsa. Sizni juda-juda yaxshi ko'raman!",
      audio: "",
    },
    {
      name: "Singlingiz",
      relation: "Singil",
      text: "Opajon, bolalikdan beri Siz mening himoyachim edingiz. Baxtli bo'ling!",
      audio: "",
    },
    {
      name: "Do'stingiz",
      relation: "Do'st",
      text: "30 yillik do'stlik — bu katta boylik. Siz bilan do'st bo'lganimdan faxrlanaman.",
      audio: "",
    },
    {
      name: "Butun oila",
      relation: "Hammamiz",
      text: "Siz bizning ildizimiz, tayanchimiz va quyoshimizsiz. Sizni yaxshi ko'ramiz!",
      audio: "",
    },
  ],

  /* ---------- Shamlar sahnasi ---------- */
  cake: {
    heading: "Orzu tuting, Onajon",
    sub: "Tugmani bosib turing — shamlarni birga puflaymiz",
    button: "Puflash",
    reveal: "Tug'ilgan kuningiz muborak!",
  },

  /* ---------- Xat (harfma-harf yoziladi) ---------- */
  letter: {
    greeting: "Aziz Onajon,",
    body: [
      "Bu xatni yozayotib, so'z topolmayapmiz. Chunki Sizga bo'lgan mehrimizni so'z bilan o'lchab bo'lmaydi.",
      "Siz bizga yurishni, gapirishni, sevishni o'rgatdingiz. Eng muhimi — inson bo'lishni o'rgatdingiz.",
      "Har bir tongingiz quvonchli, har bir kuningiz sog'lik va baxtga to'la bo'lsin. Yoningizda doim biz bormiz.",
    ],
    closing: "Sizni cheksiz sevamiz.",
  },

  /* ---------- Yakun ---------- */
  finale: {
    heading: "Sizni yaxshi ko'ramiz",
    sub: "Bu sayt — bizning kichik sovg'amiz. Lekin mehrimiz kichik emas.",
    replay: "Yana bir bor ko'rish",
  },
};
