# NoorTimer

A premium Ramadan countdown and prayer companion built with Vite, React, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## Features
- Live Sehri & Iftar countdown with automatic switching
- Global city selector (AlAdhan API integration)
- 30-day Ramadan timetable with current day highlight
- Hijri + Gregorian date display
- Ramadan progress tracker
- Auto Adhan with popup alerts
- Tasbih counter, Dua of the Day, and Quran Ayah placeholder
- Dark / Light Ramadan mode, sound toggle
- Installable PWA support

## Environment Variables
Create a `.env` file if you want to override the API base URL:
```
VITE_ALADHAN_BASE_URL=https://api.aladhan.com/v1
```

## Development
```
npm install
npm run dev
```

## Production Build
```
npm run build
```

## Deployment
The project is optimized for Vercel. Build the project and deploy the `dist` folder.
