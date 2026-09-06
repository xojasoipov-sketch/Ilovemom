/* =====================================================================
   ONAJONIM — Sovg'a sayti konfiguratsiyasi
   ---------------------------------------------------------------------
   Boss, FAQAT SHU FAYLNI tahrirlaysiz. Kod tarafiga tegish shart emas.
   - Rasmlar:   assets/photos/ papkasiga tashlang va yo'lini yozing
   - Musiqa:    ixtiyoriy — bo'lmasa sayt o'zi yumshoq ohang chaladi
   - Ismlar:    "TODO" belgili joylarga farzandlaringizning ismlarini yozing
   ===================================================================== */

window.GIFT_CONFIG = {

  /* ---------- Asosiy ma'lumotlar ---------- */
  mother: {
    name: "Onajonim",
    shortName: "Onajonim",
    birthYear: 1974,
    birthday: "2026-09-08",         // 8-sentyabr
    heroPhoto: "assets/photos/hero.jpg",
  },

  /* ---------- Kimdan ---------- */
  from: {
    signature: "Sizni cheksiz sevuvchi farzandlaringiz",
    names: ["O'g'illaringiz", "Qizlaringiz", "Kelinlaringiz", "Umr yo'ldoshingiz"],
  },

  /* ---------- Musiqa ----------
     Sevimli qo'shiq aniqlanmadi — sayt o'zi yumshoq, iliq fortepiano
     ohangini (Web Audio orqali, real vaqtda) avtomatik chaladi.
     Agar keyin mp3 fayl qo'shmoqchi bo'lsangiz: assets/music/ ga tashlang
     va pastdagi src qatoriga yo'lini yozing. */
  music: {
    src: "assets/music/song.mp3",
    title: "Onajonim uchun",
    artist: "Yumshoq fortepiano",
    volume: 0.7,
  },

  /* Kino-titrlar ovozi (ixtiyoriy) — bo'lmasa faqat matn animatsiyasi ko'rinadi */
  introAudio: "assets/audio/intro.mp3",

  /* ---------- Konvert / kirish ---------- */
  envelope: {
    to: "Eng aziz Onajonimga",
    hint: "Ochish uchun bosing",
    sealLetter: "♥",
  },

  /* ---------- Kino-titrlar (konvert ochilgach) ---------- */
  intro: [
    "1974-yilning 8-sentyabr kuni…",
    "…dunyoga bitta yulduz keldi.",
    "U yildan-yilga yorug'roq porladi — bir uyni, bir oilani, bir umrni yoritib.",
    "Bugun o'sha yulduzning kuni.",
    "Bu hikoya Sizniki, Onajonim.",
  ],

  /* ---------- Hikoya boblari (love story) ----------
     Har bir bob: yil, sarlavha, matn, rasm. Xohlagancha qo'shing. */
  chapters: [
    {
      year: "1974",
      title: "Boshlanish",
      text: "Sentyabr oyi, quyosh hali yoz sha'nini yo'qotmagan kunlardan birida dunyoga bitta qiz keldi. Hech kim bilmasdi — u kunlarning eng bebahosi edi.",
      photo: "assets/photos/chapter-1.jpg",
      audio: "assets/audio/chapter-1.mp3",
    },
    {
      year: "1992, 18 yoshda",
      title: "Turmush qurish",
      text: "Hali o'zi bola bo'lsa ham, Siz ulg'ayib, o'z uyingizni qurishga qadam qo'ydingiz. 18 yoshda — hayotning eng katta sinovini boshladingiz: oila bo'lish, sevish, mas'ul bo'lish.",
      photo: "assets/photos/chapter-2.jpg",
      audio: "assets/audio/chapter-2.mp3",
    },
    {
      year: "1993–2005",
      title: "To'rt farzand, bitta yurak",
      text: "Bir-birin ketidan to'rtta farzand keldi. Tunlar uxlamay chiqdingiz, kunlar charchamay yugurdingiz. Har birimizning birinchi qadamimizda, birinchi so'zimizda Siz bor edingiz.",
      photo: "assets/photos/chapter-3.jpg",
      audio: "assets/audio/chapter-3.mp3",
    },
    {
      year: "2009-yildan",
      title: "Uzoqdagi mehr",
      text: "2009-yilda hayot og'ir sinov keltirdi: turmush o'rtog'ingiz kichik o'g'lingiz bilan mehnat qidirib Rossiyaga ketishga majbur bo'ldi, uchta farzand esa Siz bilan qoldi. Ayriliq og'ir edi, lekin Siz uyni yolg'iz tutib turdingiz — na sabringiz, na mehringiz bir zum ham kamaymadi.",
      photo: "assets/photos/chapter-4.jpg",
      audio: "assets/audio/chapter-4.mp3",
    },
    {
      year: "Bugun, 52 yosh",
      title: "Sizning kuningiz",
      text: "Bugun ba'zilarimiz vatanda, ba'zilarimiz hali ham uzoqda — lekin shu kun hammamizni bir yurakka birlashtiradi. O'g'illaringiz, qizlaringiz, kelinlaringiz va umr yo'ldoshingiz — bir ovozdan aytamiz: rahmat Sizga, Onajonim. Bu kun — faqat Sizniki.",
      photo: "assets/photos/chapter-5.jpg",
      audio: "assets/audio/chapter-5.mp3",
    },
  ],

  /* ---------- Katta oila albomi (deyarli barcha yuborilgan rasmlar) ----------
     Tartibsiz "sochilib yotgan xotiralar" devori sifatida chiqadi.
     Bosilganda katta o'lchamda ochiladi. Istalgancha rasm qo'shishingiz/
     o'chirishingiz mumkin. */
  album: [
    { thumb: "assets/photos/album/thumb-00.jpg", full: "assets/photos/album/full-00.jpg" },
    { thumb: "assets/photos/album/thumb-01.jpg", full: "assets/photos/album/full-01.jpg" },
    { thumb: "assets/photos/album/thumb-02.jpg", full: "assets/photos/album/full-02.jpg" },
    { thumb: "assets/photos/album/thumb-03.jpg", full: "assets/photos/album/full-03.jpg" },
    { thumb: "assets/photos/album/thumb-04.jpg", full: "assets/photos/album/full-04.jpg" },
    { thumb: "assets/photos/album/thumb-05.jpg", full: "assets/photos/album/full-05.jpg" },
    { thumb: "assets/photos/album/thumb-06.jpg", full: "assets/photos/album/full-06.jpg" },
    { thumb: "assets/photos/album/thumb-07.jpg", full: "assets/photos/album/full-07.jpg" },
    { thumb: "assets/photos/album/thumb-08.jpg", full: "assets/photos/album/full-08.jpg" },
    { thumb: "assets/photos/album/thumb-09.jpg", full: "assets/photos/album/full-09.jpg" },
    { thumb: "assets/photos/album/thumb-10.jpg", full: "assets/photos/album/full-10.jpg" },
    { thumb: "assets/photos/album/thumb-11.jpg", full: "assets/photos/album/full-11.jpg" },
    { thumb: "assets/photos/album/thumb-12.jpg", full: "assets/photos/album/full-12.jpg" },
    { thumb: "assets/photos/album/thumb-13.jpg", full: "assets/photos/album/full-13.jpg" },
    { thumb: "assets/photos/album/thumb-14.jpg", full: "assets/photos/album/full-14.jpg" },
    { thumb: "assets/photos/album/thumb-15.jpg", full: "assets/photos/album/full-15.jpg" },
    { thumb: "assets/photos/album/thumb-16.jpg", full: "assets/photos/album/full-16.jpg" },
    { thumb: "assets/photos/album/thumb-17.jpg", full: "assets/photos/album/full-17.jpg" },
    { thumb: "assets/photos/album/thumb-18.jpg", full: "assets/photos/album/full-18.jpg" },
    { thumb: "assets/photos/album/thumb-19.jpg", full: "assets/photos/album/full-19.jpg" },
    { thumb: "assets/photos/album/thumb-20.jpg", full: "assets/photos/album/full-20.jpg" },
    { thumb: "assets/photos/album/thumb-21.jpg", full: "assets/photos/album/full-21.jpg" },
    { thumb: "assets/photos/album/thumb-22.jpg", full: "assets/photos/album/full-22.jpg" },
    { thumb: "assets/photos/album/thumb-23.jpg", full: "assets/photos/album/full-23.jpg" },
    { thumb: "assets/photos/album/thumb-24.jpg", full: "assets/photos/album/full-24.jpg" },
    { thumb: "assets/photos/album/thumb-25.jpg", full: "assets/photos/album/full-25.jpg" },
    { thumb: "assets/photos/album/thumb-26.jpg", full: "assets/photos/album/full-26.jpg" },
    { thumb: "assets/photos/album/thumb-28.jpg", full: "assets/photos/album/full-28.jpg" },
    { thumb: "assets/photos/album/thumb-29.jpg", full: "assets/photos/album/full-29.jpg" },
    { thumb: "assets/photos/album/thumb-30.jpg", full: "assets/photos/album/full-30.jpg" },
    { thumb: "assets/photos/album/thumb-31.jpg", full: "assets/photos/album/full-31.jpg" },
    { thumb: "assets/photos/album/thumb-32.jpg", full: "assets/photos/album/full-32.jpg" },
    { thumb: "assets/photos/album/thumb-33.jpg", full: "assets/photos/album/full-33.jpg" },
    { thumb: "assets/photos/album/thumb-34.jpg", full: "assets/photos/album/full-34.jpg" },
    { thumb: "assets/photos/album/thumb-35.jpg", full: "assets/photos/album/full-35.jpg" },
    { thumb: "assets/photos/album/thumb-36.jpg", full: "assets/photos/album/full-36.jpg" },
    { thumb: "assets/photos/album/thumb-37.jpg", full: "assets/photos/album/full-37.jpg" },
    { thumb: "assets/photos/album/thumb-38.jpg", full: "assets/photos/album/full-38.jpg" },
    { thumb: "assets/photos/album/thumb-39.jpg", full: "assets/photos/album/full-39.jpg" },
    { thumb: "assets/photos/album/thumb-40.jpg", full: "assets/photos/album/full-40.jpg" },
    { thumb: "assets/photos/album/thumb-41.jpg", full: "assets/photos/album/full-41.jpg" },
    { thumb: "assets/photos/album/thumb-42.jpg", full: "assets/photos/album/full-42.jpg" },
    { thumb: "assets/photos/album/thumb-43.jpg", full: "assets/photos/album/full-43.jpg" },
    { thumb: "assets/photos/album/thumb-44.jpg", full: "assets/photos/album/full-44.jpg" },
    { thumb: "assets/photos/album/thumb-45.jpg", full: "assets/photos/album/full-45.jpg" },
    { thumb: "assets/photos/album/thumb-46.jpg", full: "assets/photos/album/full-46.jpg" },
    { thumb: "assets/photos/album/thumb-47.jpg", full: "assets/photos/album/full-47.jpg" },
    { thumb: "assets/photos/album/thumb-48.jpg", full: "assets/photos/album/full-48.jpg" },
    { thumb: "assets/photos/album/thumb-49.jpg", full: "assets/photos/album/full-49.jpg" },
    { thumb: "assets/photos/album/thumb-50.jpg", full: "assets/photos/album/full-50.jpg" },
    { thumb: "assets/photos/album/thumb-53.jpg", full: "assets/photos/album/full-53.jpg" },
    { thumb: "assets/photos/album/thumb-54.jpg", full: "assets/photos/album/full-54.jpg" },
    { thumb: "assets/photos/album/thumb-55.jpg", full: "assets/photos/album/full-55.jpg" },
    { thumb: "assets/photos/album/thumb-56.jpg", full: "assets/photos/album/full-56.jpg" },
    { thumb: "assets/photos/album/thumb-57.jpg", full: "assets/photos/album/full-57.jpg" },
    { thumb: "assets/photos/album/thumb-58.jpg", full: "assets/photos/album/full-58.jpg" },
    { thumb: "assets/photos/album/thumb-59.jpg", full: "assets/photos/album/full-59.jpg" },
    { thumb: "assets/photos/album/thumb-60.jpg", full: "assets/photos/album/full-60.jpg" },
    { thumb: "assets/photos/album/thumb-61.jpg", full: "assets/photos/album/full-61.jpg" },
    { thumb: "assets/photos/album/thumb-62.jpg", full: "assets/photos/album/full-62.jpg" },
    { thumb: "assets/photos/album/thumb-63.jpg", full: "assets/photos/album/full-63.jpg" },
    { thumb: "assets/photos/album/thumb-64.jpg", full: "assets/photos/album/full-64.jpg" },
    { thumb: "assets/photos/album/thumb-65.jpg", full: "assets/photos/album/full-65.jpg" },
    { thumb: "assets/photos/album/thumb-66.jpg", full: "assets/photos/album/full-66.jpg" },
    { thumb: "assets/photos/album/thumb-67.jpg", full: "assets/photos/album/full-67.jpg" },
    { thumb: "assets/photos/album/thumb-68.jpg", full: "assets/photos/album/full-68.jpg" },
    { thumb: "assets/photos/album/thumb-69.jpg", full: "assets/photos/album/full-69.jpg" },
    { thumb: "assets/photos/album/thumb-70.jpg", full: "assets/photos/album/full-70.jpg" },
    { thumb: "assets/photos/album/thumb-71.jpg", full: "assets/photos/album/full-71.jpg" },
    { thumb: "assets/photos/album/thumb-72.jpg", full: "assets/photos/album/full-72.jpg" },
    { thumb: "assets/photos/album/thumb-73.jpg", full: "assets/photos/album/full-73.jpg" },
    { thumb: "assets/photos/album/thumb-74.jpg", full: "assets/photos/album/full-74.jpg" },
    { thumb: "assets/photos/album/thumb-75.jpg", full: "assets/photos/album/full-75.jpg" },
    { thumb: "assets/photos/album/thumb-76.jpg", full: "assets/photos/album/full-76.jpg" },
    { thumb: "assets/photos/album/thumb-77.jpg", full: "assets/photos/album/full-77.jpg" },
    { thumb: "assets/photos/album/thumb-78.jpg", full: "assets/photos/album/full-78.jpg" },
    { thumb: "assets/photos/album/thumb-79.jpg", full: "assets/photos/album/full-79.jpg" },
    { thumb: "assets/photos/album/thumb-80.jpg", full: "assets/photos/album/full-80.jpg" },
    { thumb: "assets/photos/album/thumb-81.jpg", full: "assets/photos/album/full-81.jpg" },
    { thumb: "assets/photos/album/thumb-82.jpg", full: "assets/photos/album/full-82.jpg" },
    { thumb: "assets/photos/album/thumb-84.jpg", full: "assets/photos/album/full-84.jpg" },
  ],

  /* ---------- Xotiralar karuseli ---------- */
  gallery: [
    { src: "assets/photos/memory-1.jpg", caption: "Qishki sayohat" },
    { src: "assets/photos/memory-2.jpg", caption: "O'g'illari bilan Samarqandda" },
    { src: "assets/photos/memory-3.jpg", caption: "Bog'dagi quvnoq lahza" },
    { src: "assets/photos/memory-4.jpg", caption: "Bog'ning hosili" },
    { src: "assets/photos/memory-5.jpg", caption: "Farzandlari bilan bayram kechasi" },
    { src: "assets/photos/memory-6.jpg", caption: "Oilaviy tabrik lahzasi" },
    { src: "assets/photos/memory-7.jpg", caption: "Umr yo'ldoshi bilan" },
    { src: "assets/photos/memory-8.jpg", caption: "Hazil-mutoyiba lahzasi" },
  ],

  /* ---------- Tabriklar ----------
     "TODO" deb belgilangan ismlarni haqiqiylariga almashtiring.
     audio: ixtiyoriy — ovozli tabrik faylini assets/music/ ga tashlab,
     yo'lini shu yerga yozsangiz, kartada "Ovozli tabrik" tugmasi chiqadi. */
  wishes: [
    {
      name: "Katta o'g'lingiz",           // TODO: ismini yozing
      relation: "O'g'lingiz",
      text: "Onajonim, Siz bo'lmaganingizda men ham bo'lmasdim. Har bir yutug'imda Sizning duoingiz, har bir qadamimda Sizning mehringiz bor. Sog' bo'ling, uzoq umr ko'ring!",
      audio: "",
    },
    {
      name: "Kichik o'g'lingiz",          // TODO: ismini yozing
      relation: "O'g'lingiz",
      text: "Katta bo'lsam ham, hali ham Sizning quchog'ingizdagidek his qilaman o'zimni. Tug'ilgan kuningiz muborak, Onajonim — mendan Sizga cheksiz mehr.",
      audio: "",
    },
    {
      name: "Katta qizingiz",             // TODO: ismini yozing
      relation: "Qizingiz",
      text: "Siz menga faqat onalik emas — sabr, mehr va kuchni ham o'rgatdingiz. Bugun Sizni quchoqlab, rahmat aytgim keladi. Yaxshi ko'raman, Onajonim!",
      audio: "",
    },
    {
      name: "Kichik qizingiz",            // TODO: ismini yozing
      relation: "Qizingiz",
      text: "Onajonim, Sizning kulgingiz — bizning uyimizning eng yorqin nuri. Tug'ilgan kuningiz muborak bo'lsin, hamisha shunday baxtli kuling!",
      audio: "",
    },
    {
      name: "Kelinlaringiz",              // TODO: ismlarini yozing (masalan "Malika va Zarina")
      relation: "Kelinlaringiz",
      text: "Siz bizni o'z farzandingizdek qabul qildingiz, ikkinchi onamiz bo'ldingiz. Mehringiz va sabringiz uchun rahmat — tug'ilgan kuningiz muborak, Onajonim!",
      audio: "",
    },
    {
      name: "Umr yo'ldoshingiz",          // TODO: ismini yozing
      relation: "Turmush o'rtog'ingiz",
      text: "Necha yillardirki, quvonchni ham, qiyinchilikni ham birga bosib o'tdik. Har kuningiz shunday yorug' bo'lsin, mendan Sizga bugun ham, hamisha ham — cheksiz mehr.",
      audio: "",
    },
  ],

  /* ---------- Shamlar sahnasi ---------- */
  cake: {
    heading: "Orzu tuting, Onajonim",
    sub: "Tugmani bosib turing — shamlarni birga puflaymiz",
    button: "Puflash",
    reveal: "Tug'ilgan kuningiz muborak, Onajonim!",
  },

  /* ---------- Xat (harfma-harf yoziladi) ---------- */
  letter: {
    greeting: "Eng aziz Onajonim,",
    body: [
      "Bu xatni yozayotib, to'g'ri so'z topa olmayapmiz. Chunki Sizga bo'lgan mehrimizni hech qanday so'z bilan o'lchab bo'lmaydi.",
      "1974-yilning sentyabrida dunyoga kelgan o'sha qiz — bugun bizning onamiz, bizning tayanchimiz, bizning uyimizning yuragi bo'lib turibdi.",
      "Siz bizga yurishni, gapirishni, sevishni o'rgatdingiz. Eng muhimi — mehribon inson bo'lishni o'rgatdingiz. Har birimiz — o'g'illaringiz, qizlaringiz, kelinlaringiz — Sizning bir bo'lagingizmiz.",
      "52 yil — bu son emas, bu butun bir hayot yo'li: kulgilar, tunlar, duolar, sabr va cheksiz mehr yo'li. Va bu yo'lning har qadamida Siz eng go'zal inson bo'lib qoldingiz.",
      "Har bir tongingiz quvonchli, har bir kuningiz sog'lik va baxtga to'la bo'lsin. Qayerda bo'lsak ham, yuragimiz doim Sizning yoningizda.",
    ],
    closing: "Sizni cheksiz sevamiz, Onajonim.",
    audio: "assets/audio/letter.mp3",
  },

  /* ---------- Yakun ---------- */
  finale: {
    heading: "Sizni yaxshi ko'ramiz",
    sub: "Bu sayt — bizning kichik sovg'amiz. Lekin mehrimiz kichik emas, Onajonim.",
    replay: "Yana bir bor ko'rish",
  },
};
