/**
 * All interface copy, in English and Arabic.
 * Arabic is written for the Egyptian market — warm, direct, natural.
 */

export type Lang = "en" | "ar";
export const languages: Lang[] = ["en", "ar"];
export const langPath = (lang: Lang) => (lang === "ar" ? "/ar/" : "/");

const en = {
  meta: {
    title: "Foda Agency — Advertising & Media Production Studio in Damietta, Egypt",
    description:
      "Foda Agency is a creative advertising and media production agency in Damietta, Egypt. Commercial films, reels, AI video, design and digital campaigns — from first idea to final frame.",
    ogAlt: "Foda Agency — creative advertising & media production",
  },
  a11y: {
    skip: "Skip to content",
    menu: "Open menu",
    closeMenu: "Close menu",
    close: "Close video",
    language: "Language",
    switchTo: "عربي",
    switchToLabel: "Switch to Arabic",
    primaryNav: "Primary",
    playVideo: "Play video",
  },
  nav: {
    home: "Home",
    work: "Work",
    about: "About",
    contact: "Contact",
    cta: "Start a project",
  },
  hero: {
    eyebrow: "Advertising & Media Production",
    location: "Damietta — Egypt",
    lines: ["We make what’s", "worth", "watching."],
    accentLine: 2,
    intro:
      "Foda Agency is a creative advertising studio. We take brands from the first idea to the final frame — concept, direction, production, and the platforms where it all lives.",
    ctaWork: "See the work",
    ctaTalk: "Talk to us",
    scroll: "Scroll",
    tags: ["Films", "Reels", "AI Video", "Campaigns"],
  },
  marquee: ["Concept", "Creative Direction", "Production", "Content", "Advertising", "Platform Management"],
  showreel: {
    label: "Showreel",
    fallbackLabel: "Featured film",
    title: ["Every frame", "is a decision."],
    play: "Play",
    caption: "Sound on. Full screen recommended.",
  },
  work: {
    eyebrow: "Selected work",
    title: "The Work",
    intro: "Films, reels and campaigns made for brands across Damietta and beyond. Pick a field, press play.",
    all: "All work",
    watch: "Watch",
    view: "View",
    projects: (n: number) => `${n} ${n === 1 ? "project" : "projects"}`,
    filterLabel: "Filter work by category",
    more: "Show more",
    less: "Show less",
    noThumb: "Preview",
  },
  about: {
    eyebrow: "About Foda",
    statement:
      "We are a creative advertising and media production agency that turns ideas into images people stop for. Strategy, concept, production and the platforms that follow — one team, from the first sketch to the final frame.",
    processTitle: "From idea to impact",
    steps: [
      { title: "Strategy & Concept", text: "We find what makes your brand worth watching." },
      { title: "Creative Direction", text: "Look, tone and story — designed before we shoot." },
      { title: "Production", text: "Filming, editing, motion, AI and design under one roof." },
      { title: "Launch & Platforms", text: "We publish, manage and keep the brand moving." },
    ],
  },
  stats: {
    eyebrow: "In numbers",
    title: "Six years of making brands seen.",
  },
  contact: {
    eyebrow: "Contact",
    titleLines: ["Let’s make", "something worth", "watching."],
    accentLine: 2,
    text: "Tell us about your brand. The fastest way to reach us is WhatsApp — a real person replies.",
    whatsapp: "Chat on WhatsApp",
    call: "Call us",
    phone: "Phone",
    whatsappLabel: "WhatsApp",
    facebook: "Facebook",
    instagram: "Instagram",
    email: "Email",
    location: "Studio",
    openMaps: "Open in Google Maps",
    mapTitle: "Foda Agency location on Google Maps",
  },
  footer: {
    rights: "All rights reserved.",
    top: "Back to top",
    tagline: "Advertising & media production",
  },
  notFound: {
    title: "This frame doesn’t exist.",
    back: "Back to the homepage",
  },
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  meta: {
    title: "Foda للدعاية والإعلان — وكالة دعاية وإنتاج ميديا في دمياط",
    description:
      "Foda للدعاية والإعلان: وكالة إبداعية للدعاية والإعلان والإنتاج الإعلامي في دمياط، مصر. أفلام إعلانية، ريلز، فيديوهات بالذكاء الاصطناعي، تصميمات وحملات ديجيتال — من أول فكرة لآخر كادر.",
    ogAlt: "Foda للدعاية والإعلان — دعاية وإنتاج ميديا",
  },
  a11y: {
    skip: "انتقل للمحتوى",
    menu: "افتح القائمة",
    closeMenu: "اقفل القائمة",
    close: "اقفل الفيديو",
    language: "اللغة",
    switchTo: "EN",
    switchToLabel: "Switch to English",
    primaryNav: "القائمة الرئيسية",
    playVideo: "شغّل الفيديو",
  },
  nav: {
    home: "الرئيسية",
    work: "أعمالنا",
    about: "مين إحنا",
    contact: "تواصل",
    cta: "ابدأ مشروعك",
  },
  hero: {
    eyebrow: "دعاية وإعلان وإنتاج ميديا",
    location: "دمياط — مصر",
    lines: ["بنصنع", "اللي يستاهل", "يتشاف."],
    accentLine: 2,
    intro:
      "فودة وكالة إبداعية للدعاية والإعلان. بناخد البراند من أول فكرة لحد آخر كادر — الفكرة، الإخراج، التصوير والإنتاج، وإدارة المنصات اللي هيعيش عليها.",
    ctaWork: "شوف أعمالنا",
    ctaTalk: "كلّمنا",
    scroll: "انزل",
    tags: ["أفلام", "ريلز", "فيديو AI", "حملات"],
  },
  marquee: ["الفكرة", "الإخراج الإبداعي", "الإنتاج", "صناعة المحتوى", "الدعاية والإعلان", "إدارة المنصات"],
  showreel: {
    label: "الشوريل",
    fallbackLabel: "فيلم مختار",
    title: ["كل كادر", "وراه قرار."],
    play: "تشغيل",
    caption: "شغّل الصوت، ويفضّل ملء الشاشة.",
  },
  work: {
    eyebrow: "مختارات من شغلنا",
    title: "أعمالنا",
    intro: "أفلام وريلز وحملات عملناها لبراندات في دمياط وبرّه دمياط. اختار المجال، ودوس تشغيل.",
    all: "كل الأعمال",
    watch: "شاهد",
    view: "عرض",
    projects: (n: number) => (n === 1 ? "مشروع واحد" : n === 2 ? "مشروعين" : n <= 10 ? `${n} مشاريع` : `${n} مشروع`),
    filterLabel: "فلترة الأعمال حسب المجال",
    more: "اعرض أكتر",
    less: "اعرض أقل",
    noThumb: "معاينة",
  },
  about: {
    eyebrow: "عن فودة",
    statement:
      "إحنا وكالة إبداعية للدعاية والإعلان والإنتاج الإعلامي، بنحوّل الأفكار لصورة توقّف اللي بيتفرّج. استراتيجية، فكرة، إنتاج، وإدارة المنصات بعدها — فريق واحد من أول اسكتش لحد آخر كادر.",
    processTitle: "من الفكرة للأثر",
    steps: [
      { title: "الاستراتيجية والفكرة", text: "بندوّر على اللي يخلّي البراند بتاعك يستاهل يتشاف." },
      { title: "الإخراج الإبداعي", text: "الشكل والإحساس والحكاية — بنصمّمهم قبل ما نصوّر." },
      { title: "التصوير والإنتاج", text: "تصوير، مونتاج، موشن، AI وتصميم — كله عندنا." },
      { title: "النشر وإدارة المنصات", text: "بننشر ونتابع ونخلّي البراند دايماً في الصورة." },
    ],
  },
  stats: {
    eyebrow: "بالأرقام",
    title: "ست سنين بنخلّي البراندات تتشاف.",
  },
  contact: {
    eyebrow: "تواصل معانا",
    titleLines: ["يلا نعمل", "حاجة تستاهل", "تتشاف."],
    accentLine: 2,
    text: "احكيلنا عن البراند بتاعك. أسرع طريقة توصلّنا بيها هي واتساب — وهيرد عليك حد من الفريق بنفسه.",
    whatsapp: "كلّمنا واتساب",
    call: "اتصل بينا",
    phone: "التليفون",
    whatsappLabel: "واتساب",
    facebook: "فيسبوك",
    instagram: "إنستجرام",
    email: "الإيميل",
    location: "مكاننا",
    openMaps: "افتح على خرائط جوجل",
    mapTitle: "موقع Foda على خرائط جوجل",
  },
  footer: {
    rights: "جميع الحقوق محفوظة.",
    top: "لفوق",
    tagline: "دعاية وإعلان وإنتاج ميديا",
  },
  notFound: {
    title: "الكادر ده مش موجود.",
    back: "ارجع للرئيسية",
  },
};

export const dictionaries: Record<Lang, Dictionary> = { en, ar };
export const getDictionary = (lang: Lang) => dictionaries[lang];
