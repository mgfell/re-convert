import type { TranslationKey } from "../types";

export const ru: Record<TranslationKey, string> = {
  "app.tagline":
    "Тихий конвертер файлов. Всё происходит локально — ничего не покидает ваше устройство.",
  "app.badge": "Работает офлайн",
  "app.footer": "Работает на GitHub Pages · Ничего не покидает устройство",

  "tabs.images": "Картинки",
  "tabs.data": "Данные",
  "tabs.pdf": "PDF",
  "tabs.media": "Медиа",
  "tabs.soon": "скоро",

  "drop.title": "Перетащите файлы сюда",
  "drop.titleActive": "Отпускайте!",
  "drop.hint": "или",
  "drop.browse": "выберите на устройстве",
  "drop.images": "изображения",
  "drop.data": "файлы данных",
  "drop.pdf": "PDF-документы",
  "drop.media": "медиафайлы",
  "drop.more": "+ ещё",
  "drop.rejected": "файл пропущен — неподдерживаемый формат",

  "stats.files": "файл",
  "stats.done": "готово",
  "stats.failed": "ошибок",

  "actions.clearAll": "Очистить",
  "actions.convert": "Конвертировать",
  "actions.convertN": "Конвертировать {{n}} файл",
  "actions.converting": "Конвертация… {{done}}/{{total}}",
  "actions.allConverted": "Всё готово",
  "actions.download": "Скачать",
  "actions.downloadAll": "Скачать всё",
  "actions.downloadZip": "Как ZIP",
  "actions.downloadSeparate": "По одному",
  "actions.zipping": "Упаковка…",
  "actions.retry": "Повторить",
  "actions.cancel": "Отмена",
  "actions.remove": "Удалить",

  "settings.title": "Настройки",
  "settings.format": "Формат результата",
  "settings.quality": "Качество",
  "settings.maxWidth": "Макс. ширина",
  "settings.original": "оригинал",
  "settings.pretty": "Форматировать",
  "settings.quality.smaller": "Меньше",
  "settings.quality.better": "Лучше",
  "settings.privacy.title": "Метаданные удаляются автоматически",
  "settings.privacy.text":
    "EXIF, GPS и данные камеры удаляются при конвертации. Ничего не покидает устройство.",
  "settings.data.privacy.title": "Конвертация локальная",
  "settings.data.privacy.text":
    "Данные не покидают браузер. Парсинг и сериализация работают на устройстве.",
  "settings.pdf.title": "Настройки PDF",

  "status.queued": "В очереди",
  "status.processing": "Конвертация…",
  "status.done": "Готово",
  "status.error": "Ошибка",
  "status.cancelled": "Отменено",

  "toast.added": "Добавлено {{n}} файл",
  "toast.convertedOne": "Успешно сконвертировано",
  "toast.convertedMany": "Сконвертировано {{n}} файл",
  "toast.convertedPartial": "Готово {{ok}}, ошибок {{failed}}",
  "toast.allFailed": "Все {{n}} не удалось",
  "toast.failed": "Ошибка конвертации",
  "toast.zipping": "Упаковка {{n}} файл",
  "toast.downloaded": "Скачано {{name}}",
  "toast.cancelled": "Отменено",
  "toast.pasted": "Вставлено {{n}} файл",
  "toast.noSupported": "Нет поддерживаемых файлов",

  "shortcuts.paste": "Вставить файлы",
  "shortcuts.convert": "Конвертировать всё",
  "shortcuts.clear": "Очистить",
  "shortcuts.theme": "Сменить тему",
  "shortcuts.language": "Сменить язык",

  "theme.toggle": "Сменить тему",
  "lang.toggle": "Сменить язык",

  "meta.title": "re:convert — конвертер файлов",
  "meta.description":
    "Тихий конвертер файлов. Всё происходит локально — ничего не покидает ваше устройство.",

  "compare.original": "Оригинал",
  "compare.result": "Результат",
  "compare.smaller": "Меньше",
  "compare.larger": "Больше",
  "compare.same": "Тот же размер",
  "compare.expand": "Развернуть превью",
  "compare.collapse": "Свернуть превью",

  "pdf.direction": "Направление",
  "pdf.imageFormat": "Формат картинок",
  "pdf.pageSize": "Размер страницы",
  "pdf.resolution": "Разрешение",
  "pdf.pages": "{{n}} страниц",
  "pdf.zipHint": "Несколько страниц → ZIP",

  "quick.title": "Популярные конвертации",

  "command.title": "Командная палитра",
  "command.placeholder": "Введите команду…",
  "command.noResults": "Ничего не найдено",
  "command.navigate": "навигация",
  "command.select": "выбрать",
  "command.close": "закрыть",
  "command.group.actions": "Действия",
  "command.group.tabs": "Вкладки",
  "command.group.settings": "Настройки",
  "command.action.convert": "Конвертировать всё",
  "command.action.clear": "Очистить очередь",
  "command.action.cancel": "Отменить конвертацию",
  "command.action.downloadZip": "Скачать всё как ZIP",
  "command.action.downloadSeparate": "Скачать по одному",
  "command.action.toggleTheme": "Сменить тему",
  "command.action.toggleLang": "Сменить язык",
  "command.action.openImages": "Открыть вкладку Картинки",
  "command.action.openData": "Открыть вкладку Данные",
  "command.action.openPdf": "Открыть вкладку PDF",

  "landing.hero.badge": "Приватность по умолчанию",
  "landing.hero.title": "Конвертируйте что угодно.",
  "landing.hero.subtitle":
    "Приватный конвертер файлов, который работает прямо в вашем браузере. Без загрузок, без серверов, без лимитов — файлы не покидают ваше устройство.",
  "landing.hero.cta": "Начать",
  "landing.hero.cta2": "Как это работает",
  "landing.hero.noUpload": "Без загрузок",
  "landing.hero.noLimits": "Без лимитов",
  "landing.hero.noAds": "Без рекламы",

  "landing.features.title": "Сделано иначе",
  "landing.features.subtitle":
    "Все остальные конвертеры отправляют ваши файлы на сервер. Мы — нет.",
  "landing.feature.private.title": "100% приватно",
  "landing.feature.private.text":
    "Файлы обрабатываются локально в браузере. Ничего не загружается, не хранится, не передаётся.",
  "landing.feature.fast.title": "Молниеносно",
  "landing.feature.fast.text":
    "Никакого ожидания загрузки и скачивания. Конвертация происходит мгновенно на вашем устройстве.",
  "landing.feature.formats.title": "Нужные форматы",
  "landing.feature.formats.text":
    "Картинки (HEIC, PNG, JPG, WEBP, AVIF, ICO), PDF, данные (JSON, CSV, YAML, XML).",
  "landing.feature.free.title": "Бесплатно навсегда",
  "landing.feature.free.text":
    "Без лимитов, регистрации и карт. Конвертируйте сколько хотите.",
  "landing.feature.pwa.title": "Устанавливается как приложение",
  "landing.feature.pwa.text":
    "Работает офлайн как PWA. Установите и пользуйтесь где угодно.",
  "landing.feature.i18n.title": "Мультиязычность",
  "landing.feature.i18n.text":
    "Английский и русский из коробки. Другие языки — скоро.",

  "landing.formats.title": "Поддерживаемые форматы",
  "landing.formats.subtitle":
    "Растём каждую неделю. Нужен формат, которого нет — скажите.",
  "landing.formats.images": "Картинки",
  "landing.formats.data": "Данные",
  "landing.formats.pdf": "PDF",

  "landing.faq.title": "Есть вопросы?",
  "landing.faq.q1": "Вы загружаете файлы на сервер?",
  "landing.faq.a1":
    "Нет. Всё работает локально в браузере через WebAssembly и Canvas API. Файлы не покидают ваше устройство.",
  "landing.faq.q2": "Это правда бесплатно?",
  "landing.faq.a2":
    "Да. Нет сервера, нет лимитов, нет рекламы. Бесплатно навсегда.",
  "landing.faq.q3": "Какие форматы поддерживаются?",
  "landing.faq.a3":
    "Картинки: PNG, JPG, WEBP, AVIF, ICO, HEIC, SVG, GIF, BMP. Данные: JSON, CSV, TSV, YAML, XML. PDF: туда и обратно. Новые форматы добавляются регулярно.",
  "landing.faq.q4": "Работает ли офлайн?",
  "landing.faq.a4":
    "Да! После первой загрузки приложение работает полностью офлайн. Можно установить как PWA на телефон или компьютер.",

  "landing.cta.title": "Готовы конвертировать?",
  "landing.cta.subtitle": "Без регистрации. Без загрузок. Просто киньте файл.",
  "landing.cta.button": "Открыть конвертер",

  "landing.footer.madeWith": "Сделано с заботой. Работает на GitHub Pages.",

  "nav.app": "Открыть приложение",
  "nav.home": "Главная",
  "onboarding.step1.title": "Перетащите файлы",
  "onboarding.step1.text":
    "Drag & drop, клик, или вставка из буфера. Принимаем картинки, PDF и данные.",
  "onboarding.step2.title": "Выберите формат",
  "onboarding.step2.text":
    "Формат, качество, ресайз. Всё работает прямо в браузере.",
  "onboarding.step3.title": "Скачайте мгновенно",
  "onboarding.step3.text":
    "Файлы не покидают устройство. Скачивайте по одному или ZIP-архивом.",
  "onboarding.skip": "Пропустить",
  "onboarding.next": "Далее",
  "onboarding.done": "Понятно",
  "seo.convertNow": "Конвертировать {{from}} в {{to}}",
  "seo.badges.private": "100% приватно",
  "seo.badges.free": "Бесплатно навсегда",
  "seo.badges.noLimits": "Без лимитов",
  "seo.howItWorks": "Как это работает",
  "seo.step1.title": "Перетащите файлы",
  "seo.step1.text":
    "Drag & drop, клик или вставка из буфера. Сколько угодно файлов любого размера.",
  "seo.step2.title": "Выберите формат",
  "seo.step2.text":
    "Формат, качество, размер. Превью результата в реальном времени.",
  "seo.step3.title": "Скачайте мгновенно",
  "seo.step3.text":
    "Файлы не покидают устройство. По одному или ZIP-архивом.",
  "seo.faq": "Частые вопросы",
  "seo.related": "Похожие конвертации",
  "seo.cta.title": "Сконвертировать {{from}} в {{to}}",
  "seo.cta.button": "Открыть конвертер",
  "seo.notFound": "Страница не найдена",
  "seo.whyTitle": "Зачем конвертировать {{from}} в {{to}}?",
};