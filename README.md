# Onajon uchun sovg'a sayti 🎂♥

Onaning tug'ilgan kuniga bag'ishlangan, love-story uslubidagi kinematik veb-sovg'a.
Konvert ochilishidan boshlab — kino-titrlar, oilaviy hikoya (yillar bo'yicha), 3D xotira
karuseli, yuraklardan tabriklar, sham puflash animatsiyasi, qo'lda yozilgan xat va
yakuniy sahna — barchasi musiqa va zarrachali effektlar (gullar, chang, yuraklar) bilan.

## Tezkor boshlash

Kodga tegishning hojati yo'q. Hammasi bitta faylda:

➡️ **`js/config.js`** — ism, sanalar, rasmlar, matnlar, tabriklar, musiqa shu yerda.

1. `assets/photos/` papkasiga haqiqiy rasmlarni tashlang (istalgan nom bilan).
2. `js/config.js` ichida har bir rasm yo'lini o'zingiznikiga almashtiring.
3. `assets/music/` papkasiga `.mp3` musiqa faylini tashlang va `config.js` dagi
   `music.src` qatorini shu faylga yo'naltiring (masalan `assets/music/song.mp3`).
   Agar fayl qo'yilmasa — sayt o'zi yumshoq fortepiano ohangini avtomatik chaladi.
4. `mother.name`, `mother.birthYear`, `mother.birthday` — yosh va sarlavhalar shundan
   avtomatik hisoblanadi.
5. `chapters` — hikoyangizning har bir davri (yil, sarlavha, matn, rasm).
6. `wishes` — oila a'zolaridan tabriklar (xohlasangiz `audio` maydoniga ovozli
   tabrik `.mp3` faylini bog'lang).

## Ko'rish

Oddiy statik sayt — istalgan static-server bilan ochiladi:

```bash
python3 -m http.server 8080
# yoki
npx serve .
```

So'ng brauzerda `http://localhost:8080` oching.

## Joylashtirish (bepul)

Eng oson yo'l — **GitHub Pages**:

1. Repozitoriyni GitHub'ga push qiling.
2. Repo sozlamalari → **Pages** → Source: `main` branch, `/ (root)`.
3. Bir necha daqiqada `https://<username>.github.io/<repo>/` manzili tayyor bo'ladi.

Yoki **Vercel** / **Netlify** ga papkani tashlab, bir zumda bepul domen olish mumkin —
ularga alohida sozlash kerak emas, chunki sayt to'liq statik (server kerak emas).

## Fayl tuzilishi

```
index.html         — sahifa strukturasi
css/styles.css      — dizayn (kinematik uslub, animatsiyalar)
js/config.js        — ⭐ FAQAT SHU FAYLNI TAHRIRLANG — barcha matn/rasm/musiqa
js/app.js           — dvigatel (konvert, karusel, sham, xat animatsiyasi va h.k.)
assets/photos/      — rasmlar (hozircha o'rniga SVG placeholder turibdi)
assets/music/       — fon musiqa (.mp3)
```

## Texnik eslatmalar

- Tashqi kutubxonasiz, sof HTML/CSS/JS — hech qanday `npm install` shart emas.
- `prefers-reduced-motion` hurmat qilinadi (animatsiyalarga sezgir foydalanuvchilar uchun).
- Mobil va desktopda ishlaydi, klaviatura orqali ham boshqarsa bo'ladi.
- Sinov uchun `?skip=1` query parametri konvert va kino-titrlarni o'tkazib yuboradi
  (masalan: `index.html?skip=1`).
