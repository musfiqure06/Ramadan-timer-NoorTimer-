export type DuaItem = {
  title: string
  arabic: string
  transliteration: string
  translation: string
  category: string
}

export const DUAS: DuaItem[] = [
  {
    title: 'Dua for Sehri (Intention)',
    arabic: 'وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ',
    transliteration: 'Wa bisawmi ghadin nawaytu min shahri Ramadan.',
    translation: 'I intend to keep the fast for tomorrow in the month of Ramadan.',
    category: 'Sehri'
  },
  {
    title: 'Dua at Iftar',
    arabic: 'اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ',
    transliteration: 'Allahumma inni laka sumtu wa bika amantu wa ‘alayka tawakkaltu wa ‘ala rizqika aftartu.',
    translation: 'O Allah, I fasted for You, I believe in You, I place my trust in You, and with Your provision I break my fast.',
    category: 'Iftar'
  },
  {
    title: 'Dua for Acceptance',
    arabic: 'اللَّهُمَّ تَقَبَّلْ مِنِّي إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Allahumma taqabbal minni innaka anta as-sami‘ul-‘alim.',
    translation: 'O Allah, accept from me. Indeed, You are the All-Hearing, All-Knowing.',
    category: 'General'
  },
  {
    title: 'Dua for Forgiveness',
    arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
    transliteration: 'Allahumma innaka ‘afuwwun tuhibbul ‘afwa fa‘fu ‘anni.',
    translation: 'O Allah, You are Most Forgiving and You love forgiveness, so forgive me.',
    category: 'Laylatul Qadr'
  },
  {
    title: 'Dua for Guidance',
    arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    transliteration: 'Ihdinas-siratal-mustaqim.',
    translation: 'Guide us to the straight path.',
    category: 'General'
  },
  {
    title: 'Dua for Mercy',
    arabic: 'رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ',
    transliteration: 'Rabbighfir warham wa anta khayrur rahimin.',
    translation: 'My Lord, forgive and have mercy, for You are the best of those who show mercy.',
    category: 'General'
  },
  {
    title: 'Dua for Family',
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ',
    transliteration: 'Rabbana hablana min azwajina wa dhurriyyatina qurrata a‘yun.',
    translation: 'Our Lord, grant us from among our spouses and offspring comfort to our eyes.',
    category: 'Family'
  },
  {
    title: 'Dua for Provision',
    arabic: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
    transliteration: 'Allahummakfini bihalalika ‘an haramika wa aghnini bifadlika ‘amman siwaka.',
    translation: 'O Allah, suffice me with what You have allowed instead of what You have forbidden, and make me independent by Your grace of all else.',
    category: 'Provision'
  },
  {
    title: 'Dua for Patience',
    arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ',
    transliteration: 'Rabbana afrigh ‘alayna sabran wa tawaffana muslimin.',
    translation: 'Our Lord, pour upon us patience and let us die as Muslims.',
    category: 'General'
  },
  {
    title: 'Dua for Night Prayer',
    arabic: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا وَفِي بَصَرِي نُورًا وَفِي سَمْعِي نُورًا',
    transliteration: 'Allahumma aj‘al fi qalbi nura wa fi basari nura wa fi sam‘i nura.',
    translation: 'O Allah, place light in my heart, light in my sight, and light in my hearing.',
    category: 'Taraweeh'
  },
  {
    title: 'Dua for Knowledge',
    arabic: 'رَبِّ زِدْنِي عِلْمًا',
    transliteration: 'Rabbi zidni ‘ilma.',
    translation: 'My Lord, increase me in knowledge.',
    category: 'General'
  },
  {
    title: 'Dua for Peace',
    arabic: 'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالإِكْرَامِ',
    transliteration: 'Allahumma anta as-salam wa minka as-salam tabarakta ya dhal jalali wal ikram.',
    translation: 'O Allah, You are Peace and from You is peace. Blessed are You, O Possessor of majesty and honor.',
    category: 'General'
  }
]
