# 🌟 Tarabalam — Daily Star Checker

> See what the universe has for you today. Select your birth star to check your daily Tarabalam based on Vedic astrology.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)
![Shadcn UI](https://img.shields.io/badge/Shadcn/ui-latest-black?style=flat-square)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)

---

## 📖 What is Tarabalam?

Tarabalam is a concept from **Vedic astrology** that determines whether a day is auspicious or inauspicious for a person based on the relationship between their **birth star (Janma Nakshatra)** and the **star ruling the current day**.

There are **27 Nakshatras** in the Vedic zodiac, grouped into a repeating cycle of **9 Taras**. Each Tara has a specific quality:

| # | Tara | Result |
|---|------|--------|
| 1 | Janma | Neutral |
| 2 | Sampat | Auspicious ✅ |
| 3 | Vipat | Inauspicious ❌ |
| 4 | Kshema | Auspicious ✅ |
| 5 | Pratyak | Inauspicious ❌ |
| 6 | Sadhana | Auspicious ✅ |
| 7 | Naidhana | Inauspicious ❌ |
| 8 | Mitra | Auspicious ✅ |
| 9 | Paramamitra | Auspicious ✅ |

---

## ✨ Features

- 🌙 **Daily Nakshatra** — Fetches today's ruling star automatically
- ⭐ **Tarabalam Checker** — Select your birth star and get instant result
- 🎨 **Light & Dark Mode** — Vedic parchment light theme + cosmic dark theme
- ⚡ **Smart Caching** — API called only once per Nakshatra period (not per user)
- 📱 **Mobile First** — Designed for morning phone checks
- 🔒 **No Login Required** — Simple and private

---

## 🧮 How Tarabalam is Computed
```ts
Distance   = ((todayNakshatraId - birthNakshatraId + 27) % 27) + 1
TaraNumber = ((Distance - 1) % 9) + 1
TaraGroup  = TARA_GROUPS[TaraNumber - 1]
```

Example:
```
Birth Star   = Rohini (4)
Today's Star = Swati (15)

Distance   = ((15 - 4 + 27) % 27) + 1 = 12
TaraNumber = ((12 - 1) % 9) + 1 = 3 → Vipat → Inauspicious ⚠️
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Shadcn/ui |
| Data Fetching | Next.js Server Actions |
| Panchang API | FreeAstrologyAPI |
| Caching | Module-level server cache |
| Deployment | Vercel |

---

## 📁 Project Structure
```
tarabalam-app/
├── app/
│   ├── actions/
│   │   ├── panchang.ts          # Fetches today's nakshatra (cached)
│   │   └── tarabalam.ts         # Computes tarabalam result
│   ├── globals.css              # Tailwind v4 theme + custom colors
│   ├── layout.tsx               # Root layout + metadata
│   └── page.tsx                 # Home page (server component)
├── components/
│   ├── HomeClient.tsx           # Client wrapper — owns panchang state
│   ├── Navbar.tsx               # Title + theme toggle
│   ├── PanchangCard.tsx         # Today's nakshatra card
│   ├── TarabalamChecker.tsx     # Birth star selector + result card
│   └── ThemeProvider.tsx        # next-themes provider
└── lib/
    ├── tarabalam.ts             # Core computation logic + nakshatra list
    └── types/
        └── astrology.ts         # TypeScript types
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- FreeAstrologyAPI key → [freeastrologyapi.com](https://freeastrologyapi.com)

### Installation
```bash
# Clone the repo
git clone https://github.com/sagarD06/tarabalam-app.git
cd tarabalam-app

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root:
```env
ASTROLOGY_API_KEY=your_api_key_here
```

### Run Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment

This app is deployed on **Vercel**.

### Deploy your own

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add environment variable `ASTROLOGY_API_KEY`
4. Click Deploy ✅

---

## 🗺️ Roadmap

- [ ] Save birth nakshatra per family member (profiles)
- [ ] Full Panchang dashboard (Tithi, Yoga, Karana)
- [ ] Push notifications for auspicious days
- [ ] Tamil / Telugu / Kannada language support
- [ ] React Native mobile app

---

## 📚 Resources

- [Vedic Nakshatra System](https://en.wikipedia.org/wiki/Nakshatra)
- [FreeAstrologyAPI Docs](https://freeastrologyapi.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn/ui Components](https://ui.shadcn.com)

---

## 🙏 Acknowledgements

Built with love for family. Inspired by the ancient wisdom of Vedic astrology. 🌙

---

> *"The stars incline, they do not bind."*