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

  /* ---------- Konvert / kirish ---------- */
  envelope: {
    to: "Eng aziz Onajonimga",
    hint: "Ochish uchun bosing",
    sealLetter: "♥",
  },

  /* ---------- Kino-titrlar (konvert ochilgach) ---------- */
  intro: [
    "1974-yilning bir sentyabr kuni…",
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
      year: "1993–2009",
      title: "To'rt farzand, bitta yurak",
      text: "Bir-birin ketidan to'rtta farzand keldi. Tunlar uxlamay chiqdingiz, kunlar charchamay yugurdingiz. Har birimizning birinchi qadamimizda, birinchi so'zimizda Siz bor edingiz.",
      photo: "assets/photos/chapter-3.jpg",
      audio: "assets/audio/chapter-3.mp3",
    },
    {
      year: "2009-yildan",
      title: "Uzoqdagi mehr",
      text: "2009-yildan boshlab hayot bizni Rossiyaga olib bordi. Farzandlaringiz umrining katta qismi u yerda o'tdi — sog'inch bilan, mehnat bilan, lekin hech qachon bir-birimizdan uzoqlashmagan yurak bilan. Siz uzoqda bo'lsangiz ham, doim eng yaqinimiz edingiz.",
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
  },

  /* ---------- Yakun ---------- */
  finale: {
    heading: "Sizni yaxshi ko'ramiz",
    sub: "Bu sayt — bizning kichik sovg'amiz. Lekin mehrimiz kichik emas, Onajonim.",
    replay: "Yana bir bor ko'rish",
  },
};
