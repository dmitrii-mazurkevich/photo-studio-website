/* ==========================================================================
   Aperture — EN / RU language layer
   English lives in the markup, Russian in the dictionary. Switching back to
   English restores the original DOM, so the English copy can never drift.
   ========================================================================== */

(function () {
  'use strict';

  var LANGS = ['en', 'ru'];
  var DEFAULT = 'en';
  var STORE = 'ap-lang';

  var DICT = {
    ru: {
      /* ---------- shared ---------- */
      'nav.skip': 'Перейти к содержимому',
      'nav.home': 'Главная',
      'nav.portfolio': 'Портфолио',
      'nav.pricing': 'Пакеты и цены',
      'nav.about': 'О студии',
      'nav.book': 'Забронировать съёмку',
      'nav.menu': 'Открыть меню',
      'nav.theme': 'Сменить оформление',
      'logo.sub': 'Фотостудия',

      'demo.text': 'Демо для портфолио. Изображения — сгенерированные заглушки, а не фотографии.',
      'demo.link': 'Вернуться к портфолио',

      'lb.close': 'Закрыть',
      'lb.prev': 'Предыдущее фото',
      'lb.next': 'Следующее фото',

      'foot.about': 'Портреты, свадьбы, интерьеры и предметная съёмка. Студия и съёмка на локации.',
      'foot.explore': 'Разделы',
      'foot.services': 'Съёмки',
      'foot.contact': 'Контакты',
      'foot.demoNote': 'Сайт сделал Дмитрий Мазуркевич.',

      /* ---------- packages ---------- */
      'pk.from': 'от',
      'pk.book': 'Забронировать',
      'pk.popular': 'Выбирают чаще всего',
      'pk.1n': 'Портрет',
      'pk.1f': 'Личный или деловой портрет',
      'pk.1a': '1 час в студии или на локации',
      'pk.1b': 'Две смены образа',
      'pk.1c': '15 обработанных кадров',
      'pk.1d': 'Все исходники без обработки',
      'pk.1e': 'Готово за 5 рабочих дней',
      'pk.2n': 'Свадьба',
      'pk.2f': 'Полный день с вами',
      'pk.2a': 'До 10 часов съёмки',
      'pk.2b': 'Второй фотограф',
      'pk.2c': '400+ обработанных кадров',
      'pk.2d': 'Закрытая галерея для гостей',
      'pk.2e': 'Готово за 4 недели',
      'pk.3n': 'Интерьер и предмет',
      'pk.3f': 'Для бизнеса и каталогов',
      'pk.3a': 'Полдня съёмки',
      'pk.3b': 'Съёмочный свет и реквизит',
      'pk.3c': '25 обработанных кадров',
      'pk.3d': 'Права на коммерческое использование',
      'pk.3e': 'Готово за 7 рабочих дней',

      /* ---------- home ---------- */
      'home.metaTitle': 'Aperture — портреты, свадьбы, интерьеры, предметная съёмка',
      'home.metaDesc': 'Фотостудия: портреты, свадьбы, интерьеры и предметная съёмка. Студия и локация, прозрачные пакеты, готовые кадры в срок.',
      'home.eyebrow': 'Фотостудия',
      'home.title': 'Свет, который <em>идёт вам</em>',
      'home.lede': 'Портреты, свадьбы, интерьеры и предметная съёмка. Спокойно, без позирования по команде и без сюрпризов в счёте.',
      'home.cta1': 'Смотреть портфолио',
      'home.cta2': 'Пакеты и цены',
      'home.meta1': 'Портреты · Свадьбы · Интерьеры · Предмет',
      'home.meta2': 'Студия и съёмка на локации',
      'home.meta3': 'Снимаем с 2016 года',

      'home.selEyebrow': 'Избранное',
      'home.selTitle': 'Несколько кадров',
      'home.selLede': 'Кликните на любой — откроется во весь экран. Стрелки на клавиатуре тоже работают.',
      'home.selMore': 'Всё портфолио',

      'home.aboutEyebrow': 'О студии',
      'home.aboutTitle': 'Съёмка, на которой не нужно играть',
      'home.aboutP1': 'Большинство людей говорит, что не умеет фотографироваться. Обычно это значит, что их снимали быстро, при плохом свете и командовали, куда повернуть голову. Мы работаем иначе: сначала разговор, потом камера.',
      'home.aboutP2': 'Студия на дневном свете, полный набор импульсного света для сложных задач и выезд на локацию, если место важно для истории. Обработка — своя, без пересылки на аутсорс.',
      'home.aboutQuote': 'Хороший портрет — это не про идеальное лицо, а про момент, когда человек перестал следить за собой.',
      'home.aboutCite': 'Мария Коваль, основатель студии',
      'home.stat1v': '9 лет',
      'home.stat1l': 'снимаем',
      'home.stat2v': '600+',
      'home.stat2l': 'съёмок',
      'home.stat3v': '5 дней',
      'home.stat3l': 'обычный срок обработки',

      'home.baEyebrow': 'Обработка',
      'home.baTitle': 'До и после',
      'home.baLede': 'Обработка не должна менять человека. Свет, цвет, кожа — да; лицо — нет. Потяните ползунок.',
      'home.baBefore': 'Исходник',
      'home.baAfter': 'После обработки',
      'home.baNote': 'Управляется мышью, пальцем и стрелками на клавиатуре.',

      'home.packEyebrow': 'Пакеты',
      'home.packTitle': 'Цена известна заранее',
      'home.packLede': 'В каждом пакете написано, сколько часов, сколько кадров и когда вы их получите. Доплаты обсуждаются до съёмки, а не после.',
      'home.packMore': 'Все пакеты и допуслуги',

      'home.procEyebrow': 'Как это устроено',
      'home.procTitle': 'От письма до готовых фотографий',
      'home.proc1t': 'Разговор',
      'home.proc1d': 'Двадцать минут: зачем нужна съёмка, где она будет и что должно получиться. Часто на этом этапе меняется сама идея.',
      'home.proc2t': 'Подготовка',
      'home.proc2d': 'Дата, локация, что надеть, что взять. Перед свадьбами — отдельный план по времени, чтобы день не поехал.',
      'home.proc3t': 'Съёмка',
      'home.proc3d': 'Спокойно и без спешки. Показываем кадры прямо во время съёмки, чтобы вы понимали, что получается.',
      'home.proc4t': 'Отбор и обработка',
      'home.proc4d': 'Вы выбираете кадры из галереи, мы обрабатываем выбранное. Исходники остаются у вас в любом случае.',

      'home.faqEyebrow': 'Вопросы',
      'home.faqTitle': 'Что спрашивают чаще всего',
      'home.faq1q': 'Я не умею фотографироваться. Это лечится?',
      'home.faq1a': 'Это самое частое, что мы слышим, и почти всегда неправда. Первые двадцать минут съёмки уходят на то, чтобы вы перестали думать о камере, и они входят в оплаченное время. Мы показываем кадры по ходу — когда человек видит, что получается хорошо, он расслабляется сам.',
      'home.faq2q': 'Что надеть?',
      'home.faq2a': 'После бронирования присылаем короткую памятку под ваш тип съёмки. Общее правило: однотонное лучше пёстрого, фактура лучше блеска, и возьмите два-три варианта — на месте видно, что работает.',
      'home.faq3q': 'Когда будут фотографии?',
      'home.faq3a': 'Портреты — пять рабочих дней, предметная и интерьерная — семь, свадьбы — четыре недели. Десять кадров из свадебного дня присылаем в течение сорока восьми часов, чтобы было что показать.',
      'home.faq4q': 'Можно ли получить исходники?',
      'home.faq4a': 'Да, они входят во все пакеты. Мы не считаем нормальным удерживать ваши фотографии — обработанные кадры и так лучше, и это видно.',
      'home.faq5q': 'А если погода испортится или кто-то заболеет?',
      'home.faq5a': 'Переносим без штрафа, если предупредить за сутки. Для съёмок на улице сразу договариваемся о запасной дате — так спокойнее обеим сторонам.',

      'home.ctaTitle': 'Давайте обсудим вашу съёмку',
      'home.ctaLede': 'Напишите пару предложений о том, что нужно. Ответим в течение дня и скажем, какой пакет подходит — или что съёмка вам пока не нужна.',

      /* ---------- portfolio ---------- */
      'pf.metaTitle': 'Портфолио — Aperture',
      'pf.metaDesc': 'Портфолио фотостудии: портреты, свадьбы, интерьеры и предметная съёмка. Полноэкранный просмотр с клавиатурой.',
      'pf.title': 'Портфолио',
      'pf.lede': 'Двадцать четыре кадра из разных съёмок. Кликните на любой — откроется во весь экран; стрелки и свайп работают.',
      'pf.all': 'Все',
      'pf.portraits': 'Портреты',
      'pf.weddings': 'Свадьбы',
      'pf.interiors': 'Интерьеры',
      'pf.product': 'Предмет',
      'pf.note': 'Ссылку на конкретный кадр можно отправить: адрес меняется, когда вы листаете.',

      /* ---------- pricing ---------- */
      'pr.metaTitle': 'Пакеты и цены — Aperture',
      'pr.metaDesc': 'Пакеты съёмок с понятными условиями: сколько часов, сколько обработанных кадров и когда вы их получите. Плюс список допуслуг.',
      'pr.title': 'Пакеты и цены',
      'pr.lede': 'Никаких «от» без продолжения. В каждом пакете написано, что входит и в какой срок.',
      'pr.incEyebrow': 'В любом пакете',
      'pr.incTitle': 'Что входит всегда',
      'pr.inc1': 'Разговор до съёмки и памятка по подготовке',
      'pr.inc2': 'Все исходники без обработки',
      'pr.inc3': 'Закрытая онлайн-галерея для отбора',
      'pr.inc4': 'Цветокоррекция и ретушь выбранных кадров',
      'pr.inc5': 'Файлы для печати и для интернета',
      'pr.inc6': 'Перенос без штрафа при предупреждении за сутки',

      'pr.addTitle': 'Дополнительно',
      'pr.addLede': 'Всё считается до съёмки. В счёте не появится ничего, о чём мы не договорились.',
      'pr.thItem': 'Услуга',
      'pr.thPrice': 'Цена',
      'pr.ad1': 'Дополнительный час съёмки',
      'pr.ad2': 'Дополнительный обработанный кадр',
      'pr.ad3': 'Срочная обработка (48 часов)',
      'pr.ad4': 'Второй фотограф',
      'pr.ad5': 'Выезд за пределы города',
      'pr.ad6': 'Фотокнига, 30 разворотов',
      'pr.perHour': 'за час',
      'pr.perShot': 'за кадр',
      'pr.perKm': 'за км',

      'pr.formEyebrow': 'Бронирование',
      'pr.formTitle': 'Расскажите про съёмку',
      'pr.formLede': 'Ответим в течение рабочего дня. Если дата занята — предложим ближайшие свободные.',
      'pr.name': 'Как вас зовут',
      'pr.email': 'Email',
      'pr.phone': 'Телефон',
      'pr.type': 'Тип съёмки',
      'pr.date': 'Желаемая дата',
      'pr.message': 'Что снимаем?',
      'pr.messagePh': 'Например: деловой портрет для сайта, нужно 10 кадров, желательно на светлом фоне.',
      'pr.namePh': 'Анна Петрова',
      'pr.required': '— обязательно',
      'pr.optional': '— необязательно',
      'pr.send': 'Отправить заявку',
      'pr.privacy': 'Данные используются только чтобы ответить на эту заявку. Никаких рассылок.',
      'pr.t1': 'Портрет',
      'pr.t2': 'Свадьба',
      'pr.t3': 'Интерьер',
      'pr.t4': 'Предметная съёмка',
      'pr.t5': 'Пока не знаю',
      'pr.sentT': 'Заявка отправлена.',
      'pr.sentB': 'Ответим в течение рабочего дня. Если вопрос срочный — напишите в Telegram.',
      'pr.faqTitle': 'Про оплату и сроки',
      'pr.q1': 'Как вносится оплата?',
      'pr.a1': 'Тридцать процентов при бронировании даты — это то, что резервирует день. Остальное после съёмки, до передачи обработанных файлов. Для компаний работаем по счёту и договору.',
      'pr.q2': 'Что если нужно перенести?',
      'pr.a2': 'Предупредите за сутки — переносим без штрафа, предоплата остаётся за вами. Отмена меньше чем за сутки удерживает предоплату: время уже зарезервировано и другим клиентам отказано.',
      'pr.q3': 'Кому принадлежат фотографии?',
      'pr.a3': 'Вам — для личного использования всегда, для коммерческого — по пакетам «Интерьер и предмет» и по отдельной договорённости для остальных. Мы оставляем за собой право показать кадры в портфолио, но только с вашего письменного согласия.',
      'pr.q4': 'Можно снимать в моём помещении?',
      'pr.a4': 'Да. Привозим свет и всё необходимое; нужна розетка и примерно два на три метра свободного места. Для интерьерной съёмки заранее приезжаем посмотреть на свет в нужное время суток.',

      /* ---------- captions ---------- */
      'cap.portrait-01t': 'Студийный портрет', 'cap.portrait-01m': '85 мм · f/1.4 · импульсный свет',
      'cap.portrait-02t': 'Естественный свет', 'cap.portrait-02m': '50 мм · f/2 · окно',
      'cap.portrait-03t': 'Портрет для журнала', 'cap.portrait-03m': '85 мм · f/2.8 · две вспышки',
      'cap.portrait-04t': 'Свет из окна', 'cap.portrait-04m': '35 мм · f/1.8 · без вспышки',
      'cap.portrait-05t': 'Характер', 'cap.portrait-05m': '105 мм · f/2.5 · один источник',
      'cap.portrait-06t': 'Деловой портрет', 'cap.portrait-06m': '85 мм · f/4 · для сайта компании',
      'cap.wedding-01t': 'Первый взгляд', 'cap.wedding-01m': '35 мм · f/1.8 · утро',
      'cap.wedding-02t': 'Церемония', 'cap.wedding-02m': '70–200 мм · без вспышки',
      'cap.wedding-03t': 'Золотой час', 'cap.wedding-03m': '85 мм · f/1.6 · закат',
      'cap.wedding-04t': 'Детали', 'cap.wedding-04m': '100 мм макро · f/4',
      'cap.wedding-05t': 'Банкет', 'cap.wedding-05m': '24 мм · f/2.8 · накамерный свет',
      'cap.wedding-06t': 'Тихий момент', 'cap.wedding-06m': '50 мм · f/1.4 · доступный свет',
      'cap.interior-01t': 'Утренняя комната', 'cap.interior-01m': '17 мм · штатив · склейка экспозиций',
      'cap.interior-02t': 'Зал ресторана', 'cap.interior-02m': '24 мм · f/8 · смешанный свет',
      'cap.interior-03t': 'Номер отеля', 'cap.interior-03m': '20 мм · f/9 · штатив',
      'cap.interior-04t': 'Съёмочная студия', 'cap.interior-04m': '17 мм · f/8',
      'cap.interior-05t': 'Торговый зал', 'cap.interior-05m': '24 мм · f/7.1 · вечер',
      'cap.interior-06t': 'Уголок для чтения', 'cap.interior-06m': '35 мм · f/4 · дневной свет',
      'cap.product-01t': 'Керамика', 'cap.product-01m': '100 мм макро · софтбокс',
      'cap.product-02t': 'Стекло', 'cap.product-02m': '100 мм · контровой свет',
      'cap.product-03t': 'Упаковка', 'cap.product-03m': '90 мм · f/11 · склейка по фокусу',
      'cap.product-04t': 'Кожаные изделия', 'cap.product-04m': '100 мм · боковой свет',
      'cap.product-05t': 'Мелкие предметы', 'cap.product-05m': '100 мм макро · f/16',
      'cap.product-06t': 'Предметный натюрморт', 'cap.product-06m': '85 мм · f/5.6 · жёсткий свет'
    }
  };

  /* ---------- engine ---------------------------------------------------- */

  var root = document.documentElement;
  var originals = null;

  function nodes() {
    return document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-attr]');
  }

  function cacheOriginals() {
    if (originals) return;
    originals = [];
    Array.prototype.forEach.call(nodes(), function (el) {
      var rec = { el: el };
      if (el.hasAttribute('data-i18n')) rec.text = el.textContent;
      if (el.hasAttribute('data-i18n-html')) rec.html = el.innerHTML;
      if (el.hasAttribute('data-i18n-attr')) {
        rec.attrs = {};
        el.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
          var attr = pair.split(':')[0].trim();
          rec.attrs[attr] = el.getAttribute(attr);
        });
      }
      originals.push(rec);
    });
  }

  function restore() {
    originals.forEach(function (rec) {
      if (rec.text !== undefined) rec.el.textContent = rec.text;
      if (rec.html !== undefined) rec.el.innerHTML = rec.html;
      if (rec.attrs) {
        Object.keys(rec.attrs).forEach(function (attr) {
          if (rec.attrs[attr] !== null) rec.el.setAttribute(attr, rec.attrs[attr]);
        });
      }
    });
  }

  function translate(lang) {
    var dict = DICT[lang] || {};
    Array.prototype.forEach.call(nodes(), function (el) {
      var key = el.getAttribute('data-i18n');
      if (key && dict[key] !== undefined) el.textContent = dict[key];

      var htmlKey = el.getAttribute('data-i18n-html');
      if (htmlKey && dict[htmlKey] !== undefined) el.innerHTML = dict[htmlKey];

      var spec = el.getAttribute('data-i18n-attr');
      if (spec) {
        spec.split('|').forEach(function (pair) {
          var parts = pair.split(':');
          var attr = parts[0].trim(), k = (parts[1] || '').trim();
          if (dict[k] !== undefined) el.setAttribute(attr, dict[k]);
        });
      }
    });
  }

  function current() { return root.getAttribute('data-lang') || DEFAULT; }

  function apply(lang, persist) {
    if (LANGS.indexOf(lang) === -1) lang = DEFAULT;
    cacheOriginals();
    restore();
    if (lang !== DEFAULT) translate(lang);

    root.setAttribute('lang', lang);
    root.setAttribute('data-lang', lang);
    root.classList.remove('i18n-pending');

    document.querySelectorAll('.lang button[data-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });

    if (persist) { try { localStorage.setItem(STORE, lang); } catch (e) {} }

    if (window.history && history.replaceState) {
      var url = new URL(location.href);
      if (lang === DEFAULT) url.searchParams.delete('lang');
      else url.searchParams.set('lang', lang);
      history.replaceState(null, '', url.toString());
    }

    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } }));
  }

  apply(current(), false);

  document.querySelectorAll('.lang button[data-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () { apply(btn.getAttribute('data-lang'), true); });
  });

  window.I18N = { apply: apply, current: current, langs: LANGS, dict: DICT };
})();
