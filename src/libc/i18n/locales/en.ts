import type { TranslationKey } from "../types";

export const en: Record<TranslationKey, string> = {
  "app.tagline":
    "A quiet file converter. Everything happens locally — nothing ever leaves your device.",
  "app.badge": "Runs offline",
  "app.footer": "Powered by GitHub Pages · Nothing leaves your device",

  "tabs.images": "Images",
  "tabs.data": "Data",
  "tabs.pdf": "PDF",
  "tabs.media": "Media",
  "tabs.soon": "soon",

  "drop.title": "Drop files here",
  "drop.titleActive": "Drop to upload",
  "drop.hint": "or",
  "drop.browse": "browse your device",
  "drop.images": "images",
  "drop.data": "data files",
  "drop.pdf": "PDF documents",
  "drop.media": "media files",
  "drop.more": "+ more",
  "drop.rejected": "file skipped — unsupported format",

  "stats.files": "file",
  "stats.done": "done",
  "stats.failed": "failed",

  "actions.clearAll": "Clear all",
  "actions.convert": "Convert",
  "actions.convertN": "Convert {{n}} file",
  "actions.converting": "Converting… {{done}}/{{total}}",
  "actions.allConverted": "All converted",
  "actions.download": "Download",
  "actions.downloadAll": "Download all",
  "actions.downloadZip": "As ZIP",
  "actions.downloadSeparate": "One by one",
  "actions.zipping": "Zipping…",
  "actions.retry": "Retry",
  "actions.cancel": "Cancel",
  "actions.remove": "Remove",

  "settings.title": "Settings",
  "settings.format": "Output format",
  "settings.quality": "Quality",
  "settings.maxWidth": "Max width",
  "settings.original": "original",
  "settings.pretty": "Pretty print",
  "settings.quality.smaller": "Smaller",
  "settings.quality.better": "Better",
  "settings.privacy.title": "Metadata is stripped automatically",
  "settings.privacy.text":
    "EXIF, GPS and camera info are removed during conversion. Nothing ever leaves your device.",
  "settings.data.privacy.title": "Conversion happens locally",
  "settings.data.privacy.text":
    "Your data never leaves the browser. Parsing and serialization run entirely on your device.",
  "settings.pdf.title": "PDF settings",

  "status.queued": "Queued",
  "status.processing": "Converting…",
  "status.done": "Done",
  "status.error": "Failed",
  "status.cancelled": "Cancelled",

  "toast.added": "Added {{n}} file",
  "toast.convertedOne": "Converted successfully",
  "toast.convertedMany": "Converted {{n}} file",
  "toast.convertedPartial": "Converted {{ok}}, failed {{failed}}",
  "toast.allFailed": "All {{n}} failed",
  "toast.failed": "Conversion failed",
  "toast.zipping": "Zipping {{n}} file",
  "toast.downloaded": "Downloaded {{name}}",
  "toast.cancelled": "Cancelled",
  "toast.pasted": "Pasted {{n}} file",
  "toast.noSupported": "No supported files",

  "shortcuts.paste": "Paste files",
  "shortcuts.convert": "Convert all",
  "shortcuts.clear": "Clear all",
  "shortcuts.theme": "Toggle theme",
  "shortcuts.language": "Switch language",

  "theme.toggle": "Toggle theme",
  "lang.toggle": "Switch language",

  "meta.title": "re:convert — File Converter",
  "meta.description":
    "A quiet file converter. Everything happens locally — nothing ever leaves your device.",

  "compare.original": "Original",
  "compare.result": "Result",
  "compare.smaller": "Smaller",
  "compare.larger": "Larger",
  "compare.same": "Same size",
  "compare.expand": "Expand preview",
  "compare.collapse": "Collapse preview",

  "pdf.direction": "Direction",
  "pdf.imageFormat": "Image format",
  "pdf.pageSize": "Page size",
  "pdf.resolution": "Resolution",
  "pdf.pages": "{{n}} pages",
  "pdf.zipHint": "Multiple pages → ZIP",

  "quick.title": "Popular conversions",

  "command.title": "Command palette",
  "command.placeholder": "Type a command…",
  "command.noResults": "No results",
  "command.navigate": "navigate",
  "command.select": "select",
  "command.close": "close",
  "command.group.actions": "Actions",
  "command.group.tabs": "Tabs",
  "command.group.settings": "Settings",
  "command.action.convert": "Convert all files",
  "command.action.clear": "Clear queue",
  "command.action.cancel": "Cancel conversion",
  "command.action.downloadZip": "Download all as ZIP",
  "command.action.downloadSeparate": "Download files one by one",
  "command.action.toggleTheme": "Toggle theme",
  "command.action.toggleLang": "Switch language",
  "command.action.openImages": "Open Images tab",
  "command.action.openData": "Open Data tab",
  "command.action.openPdf": "Open PDF tab",

  "landing.hero.badge": "Private by design",
  "landing.hero.title": "Convert anything.",
  "landing.hero.subtitle":
    "The private file converter that runs entirely in your browser. No uploads, no servers, no limits — your files never leave your device.",
  "landing.hero.cta": "Start converting",
  "landing.hero.cta2": "See how it works",
  "landing.hero.noUpload": "No uploads",
  "landing.hero.noLimits": "No limits",
  "landing.hero.noAds": "No ads",

  "landing.features.title": "Built different",
  "landing.features.subtitle":
    "Every other converter sends your files to their servers. We don't.",
  "landing.feature.private.title": "100% private",
  "landing.feature.private.text":
    "Files are processed locally in your browser. Nothing is ever uploaded, stored, or shared.",
  "landing.feature.fast.title": "Blazing fast",
  "landing.feature.fast.text":
    "No waiting for uploads or downloads. Conversion happens instantly on your device.",
  "landing.feature.formats.title": "Formats you need",
  "landing.feature.formats.text":
    "Images (HEIC, PNG, JPG, WEBP, AVIF, ICO), PDFs, and data files (JSON, CSV, YAML, XML).",
  "landing.feature.free.title": "Free forever",
  "landing.feature.free.text":
    "No limits, no sign-up, no credit card. Convert as many files as you want.",
  "landing.feature.pwa.title": "Install as app",
  "landing.feature.pwa.text":
    "Works offline as a PWA. Install it once and use it anywhere, anytime.",
  "landing.feature.i18n.title": "Multi-language",
  "landing.feature.i18n.text":
    "English and Russian out of the box. More languages coming soon.",

  "landing.formats.title": "Formats we support",
  "landing.formats.subtitle":
    "Growing every week. If you need a format we don't support yet, tell us.",
  "landing.formats.images": "Images",
  "landing.formats.data": "Data",
  "landing.formats.pdf": "PDF",

  "landing.faq.title": "Questions?",
  "landing.faq.q1": "Do you upload my files to a server?",
  "landing.faq.a1":
    "No. Everything runs locally in your browser using WebAssembly and the Canvas API. Your files never leave your device.",
  "landing.faq.q2": "Is it really free?",
  "landing.faq.a2":
    "Yes. There's no server to pay for, no limits, and no ads. It's free forever.",
  "landing.faq.q3": "Which formats are supported?",
  "landing.faq.a3":
    "Images: PNG, JPG, WEBP, AVIF, ICO, HEIC, SVG, GIF, BMP. Data: JSON, CSV, TSV, YAML, XML. PDF: convert to/from images. More formats are added regularly.",
  "landing.faq.q4": "Can I use it offline?",
  "landing.faq.a4":
    "Yes! Once loaded, the app works completely offline. You can even install it as a PWA on your phone or desktop.",

  "landing.cta.title": "Ready to convert?",
  "landing.cta.subtitle": "No sign-up. No uploads. Just drop a file and go.",
  "landing.cta.button": "Open converter",

  "landing.footer.madeWith": "Made with care. Runs on GitHub Pages.",

  "nav.app": "Open app",
  "nav.home": "Home",
  "onboarding.step1.title": "Drop files anywhere",
  "onboarding.step1.text":
    "Drag & drop, click to browse, or just paste from clipboard. We accept images, PDFs, and data files.",
  "onboarding.step2.title": "Pick your format",
  "onboarding.step2.text":
    "Choose output format, quality, and resize. Everything happens right here in your browser.",
  "onboarding.step3.title": "Download instantly",
  "onboarding.step3.text":
    "Files never leave your device. Download one by one or as a ZIP — your choice.",
  "onboarding.skip": "Skip",
  "onboarding.next": "Next",
  "onboarding.done": "Got it",
  "seo.convertNow": "Convert {{from}} to {{to}}",
  "seo.badges.private": "100% private",
  "seo.badges.free": "Free forever",
  "seo.badges.noLimits": "No limits",
  "seo.howItWorks": "How it works",
  "seo.step1.title": "Drop your files",
  "seo.step1.text":
    "Drag & drop, click, or paste from clipboard. Any number of files, any size.",
  "seo.step2.title": "Pick the format",
  "seo.step2.text":
    "Choose output format, quality and size. See a live preview of the result.",
  "seo.step3.title": "Download instantly",
  "seo.step3.text":
    "Files never leave your device. Download one by one or as a ZIP.",
  "seo.faq": "Frequently asked questions",
  "seo.related": "Related conversions",
  "seo.cta.title": "Convert {{from}} to {{to}} now",
  "seo.cta.button": "Open converter",
  "seo.notFound": "Page not found",
};