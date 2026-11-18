import {migrationFAQ} from './migration.js';
// Focused arrival, banking and daily-life guidance. Source scopes describe what was actually read.
export const faqSources=[
  {
    "id": "faq-consular",
    "title": {
      "ru": "Контакты иностранных представительств",
      "kk": "Шетел өкілдіктерінің байланыстары",
      "en": "Foreign mission contacts"
    },
    "url": "https://www.gov.kz/org/mfa?lang=ru",
    "reference": {
      "ru": "МИД РК: раздел контактов зарубежных дипломатических представительств и консульских учреждений в Казахстане; порядок замены паспорта уточняется у своего консульства",
      "kk": "ҚР СІМ: Қазақстандағы шетел дипломатиялық өкілдіктері мен консулдықтарының байланыстары; паспортты ауыстыру тәртібін өз консулдығыңыздан нақтылаңыз",
      "en": "Kazakhstan MFA: foreign diplomatic and consular mission contacts; confirm passport replacement with your own consulate"
    },
    "checked": "2026-11-11",
    "verifiedFull": false,
    "verificationScope": {
      "ru": "Источник указан как официальный ориентир; полная актуальная правовая применимость отдельно не подтверждена.",
      "kk": "Дереккөз ресми бағдар ретінде берілген; толық өзекті құқықтық қолданылуы бөлек расталмады.",
      "en": "An official reference is provided; full current legal applicability was not independently confirmed."
    }
  },
  {
    "id": "faq-emergency",
    "title": {
      "ru": "Экстренная медицинская помощь",
      "kk": "Шұғыл медициналық көмек",
      "en": "Emergency medical assistance"
    },
    "url": "https://www.gov.kz/situations/55/199?lang=ru",
    "reference": {
      "ru": "gov.kz: обращение за скорой помощью по 103 и экстренное реагирование по 112",
      "kk": "gov.kz: 103 арқылы жедел жәрдем шақыру және 112 арқылы шұғыл әрекет ету",
      "en": "gov.kz: ambulance assistance on 103 and emergency response on 112"
    },
    "checked": "2026-11-13",
    "verifiedFull": true,
    "verificationScope": {
      "ru": "Прочитана официальная страница по указанной теме. Это не индивидуальное решение и не проверка полного законодательства.",
      "kk": "Аталған тақырыптағы ресми парақша оқылды. Бұл жеке шешім не барлық заңнаманы тексеру емес.",
      "en": "The official guidance page for this topic was read. This is not an individual decision or a review of all legislation."
    }
  },
  {
    "id": "faq-school",
    "title": {
      "ru": "Поступление ребёнка в школу",
      "kk": "Баланы мектепке қабылдау",
      "en": "School admission"
    },
    "url": "https://www.gov.kz/situations/15/81?lang=ru",
    "reference": {
      "ru": "gov.kz: приём в школу, включая раздел об иностранных гражданах; применимость и документы уточняются в отделе образования",
      "kk": "gov.kz: мектепке қабылдау, соның ішінде шетел азаматтары туралы бөлім; талаптар мен құжаттарды білім бөлімінен нақтылаңыз",
      "en": "gov.kz: school admission, including foreign citizens; confirm applicability and documents with the education department"
    },
    "checked": "2026-11-13",
    "verifiedFull": true,
    "verificationScope": {
      "ru": "Прочитана официальная страница по указанной теме. Это не индивидуальное решение и не проверка полного законодательства.",
      "kk": "Аталған тақырыптағы ресми парақша оқылды. Бұл жеке шешім не барлық заңнаманы тексеру емес.",
      "en": "The official guidance page for this topic was read. This is not an individual decision or a review of all legislation."
    }
  },
  {
    "id": "faq-public-appeals",
    "title": {
      "ru": "Обжалование государственной услуги",
      "kk": "Мемлекеттік қызметке шағым беру",
      "en": "Complaints about public services"
    },
    "url": "https://beta.egov.kz/situations/741/1544?lang=ru",
    "reference": {
      "ru": "eGov: способы обращения, eOtinish, письменная подача и консультация 1414; обновлено 16.10.2026",
      "kk": "eGov: жүгіну тәсілдері, eOtinish, жазбаша өтініш және 1414 кеңесі; 16.10.2026 жаңартылған",
      "en": "eGov: eOtinish, written complaints and 1414 guidance; updated 16 October 2026"
    },
    "checked": "2026-11-13",
    "verifiedFull": true,
    "verificationScope": {
      "ru": "Прочитана официальная страница по указанной теме. Это не индивидуальное решение и не проверка полного законодательства.",
      "kk": "Аталған тақырыптағы ресми парақша оқылды. Бұл жеке шешім не барлық заңнаманы тексеру емес.",
      "en": "The official guidance page for this topic was read. This is not an individual decision or a review of all legislation."
    }
  },
  {
    "id": "faq-bank-safety",
    "title": {
      "ru": "Защита от схемы «безопасный счёт»",
      "kk": "«Қауіпсіз шот» алаяқтығынан қорғану",
      "en": "Protection from safe-account scams"
    },
    "url": "https://www.bcc.kz/about/press-center/safe-account/",
    "reference": {
      "ru": "Официальная памятка БЦК: прекратить подозрительный разговор, самостоятельно связаться с банком и не передавать секретные коды",
      "kk": "БЦК ресми жадынамасы: күмәнді әңгімені тоқтату, банкпен өзіңіз байланысу және құпия кодтарды бермеу",
      "en": "Official BCC guidance: end suspicious calls, contact the bank independently and keep security codes private"
    },
    "checked": "2026-11-11",
    "verifiedFull": false,
    "verificationScope": {
      "ru": "Источник указан как официальный ориентир; полная актуальная правовая применимость отдельно не подтверждена.",
      "kk": "Дереккөз ресми бағдар ретінде берілген; толық өзекті құқықтық қолданылуы бөлек расталмады.",
      "en": "An official reference is provided; full current legal applicability was not independently confirmed."
    }
  },
  {
    "id": "faq-bank-regulator",
    "title": {
      "ru": "Финансовый регулятор Казахстана",
      "kk": "Қазақстанның қаржы реттеушісі",
      "en": "Kazakhstan financial regulator"
    },
    "url": "https://www.gov.kz/org/ardfm?lang=ru",
    "reference": {
      "ru": "Официальный портал АРРФР: компетенция, контакты и каналы обращения; не гарантия открытия счёта",
      "kk": "ҚР Қаржы нарығын реттеу және дамыту агенттігінің ресми порталы: құзырет, байланыстар және жүгіну арналары; шот ашуға кепілдік емес",
      "en": "Official financial regulator portal: remit, contacts and enquiry channels; not a guarantee of account opening"
    },
    "checked": "2026-11-11",
    "verifiedFull": false,
    "verificationScope": {
      "ru": "Источник указан как официальный ориентир; полная актуальная правовая применимость отдельно не подтверждена.",
      "kk": "Дереккөз ресми бағдар ретінде берілген; толық өзекті құқықтық қолданылуы бөлек расталмады.",
      "en": "An official reference is provided; full current legal applicability was not independently confirmed."
    },
    "lastAttempted": "2026-11-13"
  },
  {
    "id": "faq-tax",
    "title": {
      "ru": "Куда задать налоговый вопрос",
      "kk": "Салық мәселесі бойынша қайда жүгіну керек",
      "en": "Where to ask a tax question"
    },
    "url": "https://www.gov.kz/org/kgd?lang=ru",
    "reference": {
      "ru": "Официальный портал Комитета государственных доходов МФ РК: компетентный орган и территориальные подразделения; ставки и личный статус здесь не определяются",
      "kk": "ҚР ҚМ Мемлекеттік кірістер комитетінің ресми порталы: құзыретті орган мен аумақтық бөлімшелер; мұнда мөлшерлемелер мен жеке мәртебе анықталмайды",
      "en": "Official State Revenue Committee portal: responsible authority and territorial offices; no personal tax-status or rate determination here"
    },
    "checked": "2026-11-11",
    "verifiedFull": false,
    "verificationScope": {
      "ru": "Источник указан как официальный ориентир; полная актуальная правовая применимость отдельно не подтверждена.",
      "kk": "Дереккөз ресми бағдар ретінде берілген; толық өзекті құқықтық қолданылуы бөлек расталмады.",
      "en": "An official reference is provided; full current legal applicability was not independently confirmed."
    },
    "lastAttempted": "2026-11-13"
  },
  {
    "id": "faq-rvp-guide",
    "title": {
      "ru": "РВП: официальные пояснения",
      "kk": "Уақытша тұруға рұқсат: ресми түсіндірме",
      "en": "Temporary residence: official guidance"
    },
    "url": "https://www.gov.kz/situations/572/1262?lang=ru",
    "reference": {
      "ru": "gov.kz, «Как получить разрешение на временное проживание в Казахстане?», разделы об уведомлении, изменении цели и работе; обновлено 15.10.2026",
      "kk": "gov.kz, уақытша тұруға рұқсат туралы: хабарлау, мақсатты өзгерту және жұмыс бөлімдері; 15.10.2026 жаңартылған",
      "en": "gov.kz guidance on temporary residence: notification, changes of purpose and work; updated 15 October 2026"
    },
    "checked": "2026-11-13",
    "verifiedFull": true,
    "verificationScope": {
      "ru": "Прочитана полная официальная страница. Это разъяснение, а не индивидуальная проверка или полная редакция закона.",
      "kk": "Ресми парақша толық оқылды. Бұл түсіндірме, жеке тексеру не заңның толық редакциясы емес.",
      "en": "The full official guidance page was read. This is not an individual assessment or a full consolidated legal text."
    }
  },
  {
    "id": "faq-qazeta",
    "title": {
      "ru": "QazETA: поэтапное внедрение",
      "kk": "QazETA: кезең-кезеңімен енгізу",
      "en": "QazETA: phased introduction"
    },
    "url": "https://www.gov.kz/org/mfa-minsk/press/news/details/1314637?lang=ru",
    "reference": {
      "ru": "Посольство РК в Беларуси, публикация 20.10.2026, разделы 1–3: №890, этапы и переходный период",
      "kk": "ҚР Беларусьтегі Елшілігі, 20.10.2026, 1–3-бөлімдер: №890, кезеңдер және өтпелі кезең",
      "en": "Kazakhstan Embassy in Belarus, 20 October 2026, sections 1–3: Resolution No.890, phases and transition"
    },
    "checked": "2026-11-13",
    "verifiedFull": false,
    "verificationScope": {
      "ru": "Прочитаны указанные разделы официального разъяснения. Полный актуальный текст №890 и все исключения отдельно не подтверждены.",
      "kk": "Ресми түсіндірменің аталған бөлімдері оқылды. №890 қаулысының толық өзекті мәтіні мен барлық ерекшеліктері бөлек расталмады.",
      "en": "The stated sections of the official guidance were read. The full current Resolution No.890 and all exceptions were not independently confirmed."
    }
  },
  {
    "id": "faq-notification-2026",
    "title": {
      "ru": "МВД: уведомление и смена адреса",
      "kk": "ІІМ: хабарлама және мекенжайды өзгерту",
      "en": "MIA: notification and address changes"
    },
    "url": "https://www.gov.kz/org/mvd-abay/press/news/details/1226928?lang=ru",
    "reference": {
      "ru": "ДП области Абай, 22.05.2026: принимающая сторона, каналы подачи, повторное уведомление при смене адреса.",
      "kk": "Абай облысының ПД, 22.05.2026: қабылдаушы тарап, беру арналары, мекенжай өзгергенде қайта хабарлау.",
      "en": "Abai Police Department, 22 May 2026: receiving party, submission channels and repeat notification after an address change."
    },
    "checked": "2026-11-18",
    "verifiedFull": false,
    "verificationScope": {
      "ru": "Прочитана официальная инструкция; она не заменяет проверку индивидуальных оснований и полного текста законодательства.",
      "kk": "Ресми нұсқаулық оқылды; ол жеке негіздер мен заңнаманың толық мәтінін тексеруді алмастырмайды.",
      "en": "Official guidance was read; individual eligibility and the full legislation require separate checks."
    }
  },
  {
    "id": "faq-iin-service",
    "title": {
      "ru": "ИИН: документы, стоимость и результат",
      "kk": "ЖСН: құжаттар, құны және нәтиже",
      "en": "IIN: documents, fee and result"
    },
    "url": "https://www.gov.kz/services/3991?lang=ru",
    "reference": {
      "ru": "Карточка услуги МВД: перечень для Государственной корпорации, перевод, результат; бесплатно, 1 рабочий день.",
      "kk": "ІІМ қызметінің карточкасы: Мемлекеттік корпорацияға құжаттар, аударма, нәтиже; тегін, 1 жұмыс күні.",
      "en": "MIA service card: documents for Government for Citizens, translation and result; free, one working day."
    },
    "checked": "2026-11-18",
    "verifiedFull": false,
    "verificationScope": {
      "ru": "Прочитана официальная инструкция; она не заменяет проверку индивидуальных оснований и полного текста законодательства.",
      "kk": "Ресми нұсқаулық оқылды; ол жеке негіздер мен заңнаманың толық мәтінін тексеруді алмастырмайды.",
      "en": "Official guidance was read; individual eligibility and the full legislation require separate checks."
    }
  },
  {
    "id": "faq-halyk-nonresident",
    "title": {
      "ru": "Halyk: счёт иностранцу без ВНЖ",
      "kk": "Halyk: ықтиярхатсыз шетелдікке шот",
      "en": "Halyk: account without a residence card"
    },
    "url": "https://hlb.halykbank.kz/knowledge_base/560",
    "reference": {
      "ru": "Официальная база знаний Halyk, раздел «Открытие текущего счета иностранным гражданам». Требования конкретного банка.",
      "kk": "Halyk ресми білім базасы, «Шетел азаматтарына ағымдағы шот ашу» бөлімі. Бір банктің талаптары.",
      "en": "Official Halyk knowledge base, foreign-citizen current-account section. Requirements of this bank only."
    },
    "checked": "2026-11-18",
    "verifiedFull": false,
    "verificationScope": {
      "ru": "Прочитан индексированный текст официальной страницы; прямое открытие вернуло 401. Требования повторно подтверждаются в Halyk до визита.",
      "kk": "Ресми парақшаның индекстелген мәтіні оқылды; тікелей ашу 401 қатесін берді. Бармас бұрын талаптарды Halyk-тен қайта растаңыз.",
      "en": "The indexed official-page text was read; direct access returned 401. Reconfirm the requirements with Halyk before visiting."
    }
  },
  {
    "id": "faq-eaeu-work",
    "title": {
      "ru": "ЕАЭС: работа и письменный договор",
      "kk": "ЕАЭО: жұмыс және жазбаша шарт",
      "en": "EAEU: work and a written contract"
    },
    "url": "https://www.gov.kz/org/zhetysu-karatal/documents/details/1091126?lang=ru",
    "reference": {
      "ru": "Официальное сообщение от 28.10.2026: работа граждан ЕАЭС без разрешения на работу; значение письменного договора.",
      "kk": "28.10.2026 ресми хабарлама: ЕАЭО азаматтарының жұмысқа рұқсатсыз еңбек етуі; жазбаша шарттың маңызы.",
      "en": "Official notice of 28 October 2026: EAEU citizens working without a work permit and the role of a written contract."
    },
    "checked": "2026-11-18",
    "verifiedFull": false,
    "verificationScope": {
      "ru": "Прочитана официальная инструкция; она не заменяет проверку индивидуальных оснований и полного текста законодательства.",
      "kk": "Ресми нұсқаулық оқылды; ол жеке негіздер мен заңнаманың толық мәтінін тексеруді алмастырмайды.",
      "en": "Official guidance was read; individual eligibility and the full legislation require separate checks."
    }
  },
  {
    "id": "faq-student-work-exception",
    "title": {
      "ru": "Работа студента: исключение по №1041",
      "kk": "Студенттің жұмысы: №1041 бойынша ерекшелік",
      "en": "Student work: exception under No.1041"
    },
    "url": "https://primeminister.kz/assets/media/1041-prilozhenie-1-rus.pdf",
    "reference": {
      "ru": "Постановление Правительства от 24.11.2023 №1041, приложение 1, пп.8–9: очная учёба и работа в учебном заведении; граждане ЕАЭС.",
      "kk": "Үкіметтің 24.11.2023 №1041 қаулысы, 1-қосымша, 8–9-т.: күндізгі оқу және оқу орнындағы жұмыс; ЕАЭО азаматтары.",
      "en": "Government Resolution No.1041 of 24 November 2023, Annex 1, items 8–9: full-time study and work in an educational institution; EAEU citizens."
    },
    "checked": "2026-11-18",
    "verifiedFull": false,
    "verificationScope": {
      "ru": "Сверены пп.8–9 по индексированному тексту официального приложения и соответствующее положение в индексе ЭКБ на 15.05.2026. Полная актуальная редакция №1041 отдельно не прочитана; применение подтверждает работодатель.",
      "kk": "8–9-т. ресми қосымшаның индекстелген мәтінімен және ЭББ-ның 15.05.2026 индексімен салыстырылды. №1041 толық өзекті редакциясы бөлек оқылмады; қолданылуын жұмыс беруші растайды.",
      "en": "Items 8–9 were checked in the indexed official annex and the corresponding reference-bank excerpt dated 15 May 2026. The full current consolidated text was not read; the employer must confirm applicability."
    }
  },
  {
    "id": "faq-osms-eligibility",
    "title": {
      "ru": "ОСМС для иностранцев: кто участвует",
      "kk": "Шетелдіктерге МӘМС: кім қатысады",
      "en": "Foreign citizens: eligibility for OSMS"
    },
    "url": "https://www.gov.kz/situations/722/1476?lang=ru",
    "reference": {
      "ru": "gov.kz, обновлено 15.10.2026: постоянное проживание, трудящиеся ЕАЭС, статус застрахованности.",
      "kk": "gov.kz, 15.10.2026 жаңартылған: тұрақты тұру, ЕАЭО еңбекшілері, сақтандырылу мәртебесі.",
      "en": "gov.kz, updated 15 October 2026: permanent residence, EAEU workers and insured status."
    },
    "checked": "2026-11-18",
    "verifiedFull": false,
    "verificationScope": {
      "ru": "Прочитана официальная инструкция; она не заменяет проверку индивидуальных оснований и полного текста законодательства.",
      "kk": "Ресми нұсқаулық оқылды; ол жеке негіздер мен заңнаманың толық мәтінін тексеруді алмастырмайды.",
      "en": "Official guidance was read; individual eligibility and the full legislation require separate checks."
    }
  },
  {
    "id": "faq-osms-correction",
    "title": {
      "ru": "ОСМС: обращение и подтверждения",
      "kk": "МӘМС: жүгіну және растаулар",
      "en": "OSMS: enquiry and supporting records"
    },
    "url": "https://www.gov.kz/situations/722/1477?lang=ru",
    "reference": {
      "ru": "gov.kz, обновлено 15.10.2026: проверка статуса, обращение в ФСМС и документы по ситуации.",
      "kk": "gov.kz, 15.10.2026 жаңартылған: мәртебені тексеру, ӘМСҚ-ға жүгіну, жағдайға байланысты құжаттар.",
      "en": "gov.kz, updated 15 October 2026: status check, Health Insurance Fund enquiries and situation-specific documents."
    },
    "checked": "2026-11-18",
    "verifiedFull": false,
    "verificationScope": {
      "ru": "Прочитана официальная инструкция; она не заменяет проверку индивидуальных оснований и полного текста законодательства.",
      "kk": "Ресми нұсқаулық оқылды; ол жеке негіздер мен заңнаманың толық мәтінін тексеруді алмастырмайды.",
      "en": "Official guidance was read; individual eligibility and the full legislation require separate checks."
    }
  },
  {
    "id": "faq-qazeta-2026",
    "title": {
      "ru": "QazETA: этапы и переходный период",
      "kk": "QazETA: кезеңдер және өтпелі мерзім",
      "en": "QazETA: rollout and transition period"
    },
    "url": "https://www.gov.kz/org/mfa-sofia/press/news/details/1320695?lang=ru",
    "reference": {
      "ru": "Посольство РК, 30.10.2026: этапы внедрения, рекомендательный период до 30.06.2027, исключения.",
      "kk": "ҚР елшілігі, 30.10.2026: енгізу кезеңдері, 30.06.2027 дейінгі ұсынымдық кезең, ерекшеліктер.",
      "en": "Kazakhstan Embassy, 30 October 2026: rollout stages, voluntary transition until 30 June 2027 and exemptions."
    },
    "checked": "2026-11-18",
    "verifiedFull": false,
    "verificationScope": {
      "ru": "Прочитана официальная инструкция; она не заменяет проверку индивидуальных оснований и полного текста законодательства.",
      "kk": "Ресми нұсқаулық оқылды; ол жеке негіздер мен заңнаманың толық мәтінін тексеруді алмастырмайды.",
      "en": "Official guidance was read; individual eligibility and the full legislation require separate checks."
    }
  }
];
const arrivalFAQ=[
  {
    "id": "arrival-notification",
    "category": "migration",
    "question": {
      "ru": "Я приехал и заселился. Что проверить первым?",
      "kk": "Келіп, баспанаға орналастым. Алдымен нені тексеремін?",
      "en": "I have arrived and checked in. What should I check first?"
    },
    "answer": {
      "ru": "Уведомление подаёт принимающая сторона — например, гостиница или собственник жилья. По п.17 Правил №148 срок — три рабочих дня со дня прибытия. Получите подтверждение подачи; оно не заменяет РВП и не продлевает пребывание.",
      "kk": "Хабарламаны қабылдаушы тарап, мысалы қонақүй немесе үй иесі береді. №148 қағидалардың 17-тармағы бойынша мерзім — келген күннен бастап үш жұмыс күні. Берілгенін растайтын құжатты алыңыз; ол уақытша тұруға рұқсатты алмастырмайды және болуды ұзартпайды.",
      "en": "Your receiving party, such as the hotel or property owner, submits notification. Paragraph 17 of Rules No.148 sets three working days from arrival. Obtain submission confirmation; it neither replaces temporary residence permission nor extends your stay."
    },
    "steps": [
      {
        "ru": "В день заселения передайте принимающей стороне паспортные данные, дату въезда и фактический адрес.",
        "kk": "Орналасқан күні қабылдаушы тарапқа паспорт деректерін, кіру күнін және нақты мекенжайды беріңіз.",
        "en": "On check-in, provide your host with passport details, entry date and actual address."
      },
      {
        "ru": "Попросите подать уведомление через визово-миграционный портал, eGov, eQonaq или миграционную службу.",
        "kk": "Хабарламаны визалық-көші-қон порталы, eGov, eQonaq немесе көші-қон қызметі арқылы беруді сұраңыз.",
        "en": "Ask the host to submit through the visa-migration portal, eGov, eQonaq or migration services."
      },
      {
        "ru": "Сохраните копию результата и проверьте имя, адрес и дату въезда. Ошибку сразу верните принимающей стороне для исправления.",
        "kk": "Нәтиже көшірмесін сақтап, аты-жөнді, мекенжайды және кіру күнін тексеріңіз. Қате болса, түзету үшін қабылдаушы тарапқа дереу хабарлаңыз.",
        "en": "Keep the result and check your name, address and entry date. Send errors back to the host immediately for correction."
      }
    ],
    "authority": {
      "ru": "Принимающая сторона; миграционная служба РК",
      "kk": "Қабылдаушы тарап; ҚР көші-қон қызметі",
      "en": "Your host; Kazakhstan migration services"
    },
    "ask": {
      "ru": "Подано ли уведомление по моему прибытию и какое подтверждение можно получить?",
      "kk": "Менің келгенім туралы хабарлама берілді ме және оны қалай растауға болады?",
      "en": "Has my arrival notification been submitted, and what confirmation is available?"
    },
    "url": "https://www.gov.kz/org/mvd-abay/press/news/details/1226928?lang=ru",
    "sourceIds": [
      "faq-notification-2026",
      "entry"
    ],
    "coverageTopic": "entry"
  },
  {
    "id": "three-procedures",
    "category": "migration",
    "question": {
      "ru": "Уведомление, регистрация и РВП — это одно и то же?",
      "kk": "Хабарлама, тіркеу және уақытша тұруға рұқсат бір рәсім бе?",
      "en": "Are notification, registration and temporary residence permission the same?"
    },
    "answer": {
      "ru": "Уведомление сообщает о прибытии, РВП оформляет временное проживание по определённому основанию, а регистрация по месту жительства относится к отдельной процедуре. Начните с документа, который уже есть: квитанция об уведомлении не является РВП или ВНЖ.",
      "kk": "Хабарлама келгеніңізді мәлімдейді, уақытша тұруға рұқсат белгілі негізбен тұруды ресімдейді, ал тұрғылықты жер бойынша тіркеу — бөлек рәсім. Қолыңыздағы құжатты тексеріңіз: хабарлама растауы уақытша тұруға рұқсат немесе ықтиярхат емес.",
      "en": "Notification records arrival; temporary residence permission authorises temporary residence on a specific basis; residence registration is a separate procedure. Check what you actually hold: a notification receipt is neither temporary residence permission nor a residence card."
    },
    "steps": [
      {
        "ru": "Найдите подтверждение уведомления и отдельный документ РВП, визы или ВНЖ, если он выдан.",
        "kk": "Хабарлама растауын және берілген болса уақытша тұруға рұқсатты, визаны немесе ықтиярхатты табыңыз.",
        "en": "Locate your notification confirmation and any separately issued temporary residence permission, visa or residence card."
      },
      {
        "ru": "Для долгого временного проживания откройте ответ «РВП: первое оформление»; для переезда насовсем — «ПМЖ».",
        "kk": "Ұзақ уақытша тұру үшін «Уақытша тұруға рұқсатты алғаш ресімдеу», тұрақты көшу үшін «Тұрақты тұру» жауабын ашыңыз.",
        "en": "For a longer temporary stay, open the first temporary-residence answer; for settlement, open permanent residence."
      },
      {
        "ru": "Если есть только уведомление, предъявите его вместе с паспортом и датами поездок миграционной службе: попросите установить нужное основание, а не «просто регистрацию».",
        "kk": "Тек хабарлама болса, оны паспортпен және сапар күндерімен көші-қон қызметіне көрсетіңіз: «жай тіркеуді» емес, қажетті негізді анықтауды сұраңыз.",
        "en": "If you only hold notification, show it with your passport and travel dates to migration services and ask which residence basis you need."
      }
    ],
    "authority": {
      "ru": "Миграционная служба; принимающая сторона",
      "kk": "Көші-қон қызметі; қабылдаушы тарап",
      "en": "Migration services; your host"
    },
    "ask": {
      "ru": "Какие из трёх процедур нужны при моём гражданстве и основании въезда?",
      "kk": "Менің азаматтығым мен кіру негізіме осы үш рәсімнің қайсысы қажет?",
      "en": "Which of these three procedures apply to my citizenship and grounds of entry?"
    },
    "url": "https://www.gov.kz/org/mvd-abay/press/news/details/1226928?lang=ru",
    "sourceIds": [
      "faq-notification-2026",
      "rvp-basis",
      "pmz-overview",
      "registration"
    ],
    "coverageTopic": "stay"
  },
  {
    "id": "permitted-stay",
    "category": "migration",
    "question": {
      "ru": "Сколько дней я могу оставаться в Казахстане?",
      "kk": "Қазақстанда қанша күн бола аламын?",
      "en": "How long may I stay in Kazakhstan?"
    },
    "answer": {
      "ru": "Срок нельзя определить только по выбору «студент» или «релокант». Имеют значение гражданство, виза, международные договоры, история пребывания и оформленные разрешения. Не считайте новый въезд автоматическим обнулением срока.",
      "kk": "Мерзімді тек «студент» немесе «релокант» санатымен анықтау мүмкін емес. Азаматтық, виза, халықаралық шарттар, бұрынғы болу кезеңдері және рұқсаттар маңызды. Қайта кіру мерзімді автоматты түрде жаңартады деп есептемеңіз.",
      "en": "Your category alone does not determine the limit. Citizenship, visa, international agreements, previous stays and permits matter. Do not assume a new entry automatically resets the permitted period."
    },
    "steps": [
      {
        "ru": "Подготовьте даты прежних поездок и сведения о визе.",
        "kk": "Алдыңғы сапар күндері мен виза туралы мәліметті дайындаңыз.",
        "en": "Prepare previous travel dates and visa details."
      },
      {
        "ru": "Сверьте действующие правила и применимый международный договор.",
        "kk": "Қолданыстағы ережелер мен тиісті халықаралық шартты тексеріңіз.",
        "en": "Check the current rules and applicable international agreement."
      },
      {
        "ru": "Запросите порядок исчисления и действий до окончания срока.",
        "kk": "Мерзімді есептеу және ол аяқталғанға дейінгі әрекеттер тәртібін сұраңыз.",
        "en": "Ask how the period is counted and what to do before it ends."
      }
    ],
    "authority": {
      "ru": "Миграционная служба РК",
      "kk": "ҚР көші-қон қызметі",
      "en": "Kazakhstan migration services"
    },
    "ask": {
      "ru": "Как исчисляется мой разрешённый срок с учётом гражданства, визы и прошлых въездов?",
      "kk": "Азаматтығымды, визамды және бұрынғы кірулерімді ескергенде рұқсат етілген мерзім қалай есептеледі?",
      "en": "How is my permitted stay calculated given my citizenship, visa and previous entries?"
    },
    "url": "https://adilet.zan.kz/rus/docs/P1200000148",
    "sourceIds": [
      "entry",
      "migration"
    ],
    "coverageTopic": "stay"
  },
  {
    "id": "change-address",
    "category": "migration",
    "question": {
      "ru": "Я переехал в другую квартиру. Что нужно обновить?",
      "kk": "Басқа пәтерге көшсем, нені жаңартуым керек?",
      "en": "What should I update after moving to another apartment?"
    },
    "answer": {
      "ru": "При переезде принимающая сторона по новому адресу повторно подаёт уведомление. Новый договор аренды сам по себе не обновляет миграционный учёт. Если в РВП или других документах указан прежний адрес, отдельно проверьте их изменение.",
      "kk": "Көшкенде жаңа мекенжайдағы қабылдаушы тарап қайта хабарлама береді. Жаңа жалдау шарты көші-қон есебін өздігінен өзгертпейді. Уақытша тұруға рұқсатта не басқа құжатта ескі мекенжай болса, оны өзгертуді бөлек тексеріңіз.",
      "en": "After moving, the receiving party at the new address submits a new notification. A new lease does not update migration records by itself. If your permit or other documents show the old address, check their amendment separately."
    },
    "steps": [
      {
        "ru": "До заселения согласуйте с новым собственником подачу уведомления и предоставление согласия для вашей процедуры проживания.",
        "kk": "Орналаспас бұрын жаңа үй иесімен хабарлама беруді және тұру рәсіміне қажетті келісімді келістіріңіз.",
        "en": "Before moving in, agree notification and any residence-procedure consent with the new owner."
      },
      {
        "ru": "Передайте дату переезда, паспортные сведения и точный адрес; получите и проверьте новое подтверждение.",
        "kk": "Көшу күнін, паспорт деректерін және нақты мекенжайды беріп, жаңа растауды алыңыз және тексеріңіз.",
        "en": "Provide the move date, passport details and exact address, then obtain and check the new confirmation."
      },
      {
        "ru": "Покажите действующее РВП миграционной службе и спросите, требуется ли переоформление по новому адресу. Сохраните ответ вместе с документами.",
        "kk": "Қолданыстағы рұқсатты көші-қон қызметіне көрсетіп, жаңа мекенжайға қайта ресімдеу қажет пе деп сұраңыз. Жауапты құжаттармен бірге сақтаңыз.",
        "en": "Show your current permit to migration services and ask whether the new address requires reissue. Keep their response with your records."
      }
    ],
    "authority": {
      "ru": "Новая принимающая сторона; миграционная служба",
      "kk": "Жаңа қабылдаушы тарап; көші-қон қызметі",
      "en": "Your new host; migration services"
    },
    "ask": {
      "ru": "Какие сведения о новом адресе нужно обновить мне и принимающей стороне, и в какие сроки?",
      "kk": "Жаңа мекенжай туралы қандай мәліметтерді мен және қабылдаушы тарап қандай мерзімде жаңартуымыз керек?",
      "en": "Which address records must the new host and I update, and by when?"
    },
    "url": "https://www.gov.kz/org/mvd-abay/press/news/details/1226928?lang=ru",
    "sourceIds": [
      "faq-notification-2026",
      "rvp-apply",
      "registration"
    ],
    "coverageTopic": "entry"
  },
  {
    "id": "missed-deadline",
    "category": "migration",
    "question": {
      "ru": "Я не уверен, что срок уведомления или пребывания соблюдён. Что делать?",
      "kk": "Хабарлама немесе болу мерзімін сақтағаныма сенімді емеспін. Не істеймін?",
      "en": "What if I may have missed a notification or stay deadline?"
    },
    "answer": {
      "ru": "Не пытайтесь исправить ситуацию вымышленной датой или обещанным посредником «обнулением». Подготовьте фактическую хронологию и без промедления уточните официальный порядок у миграционной службы; при споре обратитесь за юридической помощью.",
      "kk": "Жалған күнмен немесе делдал уәде еткен «мерзімді жаңартумен» мәселені шешпеңіз. Нақты оқиғалар ретін дайындап, көші-қон қызметінен ресми тәртіпті дереу нақтылаңыз; дау болса, заң көмегіне жүгініңіз.",
      "en": "Do not use false dates or rely on a promised reset by an intermediary. Prepare an accurate timeline and promptly ask migration services about the official procedure; seek legal help if the matter is disputed."
    },
    "steps": [
      {
        "ru": "Соберите даты, документы и имеющиеся подтверждения подачи.",
        "kk": "Күндерді, құжаттарды және берілген өтініштердің растауларын жинаңыз.",
        "en": "Gather dates, documents and any filing confirmations."
      },
      {
        "ru": "Обратитесь в миграционную службу с описанием фактов.",
        "kk": "Нақты мән-жайларды сипаттап, көші-қон қызметіне жүгініңіз.",
        "en": "Present the facts to migration services."
      },
      {
        "ru": "Попросите разъяснить порядок действий и обжалования решения.",
        "kk": "Әрекет ету және шешімге шағымдану тәртібін түсіндіруді сұраңыз.",
        "en": "Ask for the procedure to resolve the issue and challenge a decision."
      }
    ],
    "authority": {
      "ru": "Миграционная служба; квалифицированный юрист при споре",
      "kk": "Көші-қон қызметі; дау туындаса, білікті заңгер",
      "en": "Migration services; a qualified legal adviser if disputed"
    },
    "ask": {
      "ru": "Какой официальный порядок применяется к моей ситуации и где получить письменное разъяснение?",
      "kk": "Менің жағдайыма қандай ресми тәртіп қолданылады және жазбаша түсіндірмені қайдан аламын?",
      "en": "Which official procedure applies, and where can I obtain a written explanation?"
    },
    "url": "https://adilet.zan.kz/rus/docs/Z1100000477",
    "sourceIds": [
      "migration",
      "entry",
      "faq-public-appeals"
    ],
    "coverageTopic": "stay"
  },
  {
    "id": "lost-passport",
    "category": "documents",
    "question": {
      "ru": "Паспорт потерян или украден в Казахстане. Куда обращаться?",
      "kk": "Қазақстанда паспорт жоғалса немесе ұрланса, қайда жүгінемін?",
      "en": "Where should I go if my passport is lost or stolen in Kazakhstan?"
    },
    "answer": {
      "ru": "Свяжитесь с консульством государства вашего гражданства и уточните замену документа. Отдельно выясните у полиции порядок заявления об утрате или краже, а у миграционной службы — действия по документам пребывания.",
      "kk": "Азаматтығыңыз тиесілі мемлекеттің консулдығынан құжатты ауыстыру тәртібін сұраңыз. Полициядан жоғалу немесе ұрлық туралы арыз беру жолын, көші-қон қызметінен болу құжаттарына қатысты әрекеттерді бөлек нақтылаңыз.",
      "en": "Contact your country’s consulate about replacing the document. Separately ask the police how to report loss or theft and migration services what to do about your stay documents."
    },
    "steps": [
      {
        "ru": "Найдите официальные контакты своего консульства через МИД.",
        "kk": "СІМ арқылы өз консулдығыңыздың ресми байланыстарын табыңыз.",
        "en": "Find your consulate official contact details through the MFA."
      },
      {
        "ru": "Подготовьте сведения об утрате и имеющиеся копии для официального обращения.",
        "kk": "Ресми өтініш үшін жоғалу мән-жайлары мен бар көшірмелерді дайындаңыз.",
        "en": "Prepare the circumstances and any copies for the official report."
      },
      {
        "ru": "Уточните документ для дальнейшего пребывания или поездки.",
        "kk": "Одан әрі болуға немесе сапарға қандай құжат қажет екенін сұраңыз.",
        "en": "Ask which document is needed for continued stay or travel."
      }
    ],
    "authority": {
      "ru": "Консульство вашего государства; полиция; миграционная служба",
      "kk": "Өз мемлекетіңіздің консулдығы; полиция; көші-қон қызметі",
      "en": "Your country’s consulate; police; migration services"
    },
    "ask": {
      "ru": "Как восстановить мой документ и согласовать дальнейшее пребывание или выезд до его выдачи?",
      "kk": "Құжатымды қалай қалпына келтіремін және ол берілгенге дейін болуымды не шығуымды қалай келісемін?",
      "en": "How do I replace my document and arrange lawful stay or departure while it is being issued?"
    },
    "url": "https://www.gov.kz/org/mfa?lang=ru",
    "sourceIds": [
      "faq-consular",
      "migration"
    ],
    "coverageTopic": "documents"
  },
  {
    "id": "obtain-iin",
    "category": "documents",
    "question": {
      "ru": "Как иностранцу получить ИИН и что подготовить?",
      "kk": "Шетел азаматы ЖСН-ді қалай алады және не дайындайды?",
      "en": "How can a foreign citizen obtain an IIN, and what should they prepare?"
    },
    "answer": {
      "ru": "Подайте в ЦОН заявление и действительный паспорт. Нотариальный перевод требуется, если установочные данные отсутствуют на кириллице или латинице. По карточке услуги выдача бесплатна, срок — один рабочий день; результат — регистрационное свидетельство либо мотивированный отказ.",
      "kk": "ХҚКО-ға өтініш пен жарамды паспорт беріңіз. Жеке деректер кириллицада не латынша болмаса, нотариалдық аударма қажет. Қызмет карточкасы бойынша тегін, мерзімі — бір жұмыс күні; нәтиже — тіркеу куәлігі не дәлелді бас тарту.",
      "en": "Apply at a service centre with an application and valid passport. A notarised translation is required if identity details are absent in Cyrillic or Latin script. The service card states free issuance in one working day, resulting in a registration certificate or reasoned refusal."
    },
    "steps": [
      {
        "ru": "Подготовьте паспорт; проверьте необходимость перевода по условию выше.",
        "kk": "Паспортты дайындап, жоғарыдағы шарт бойынша аударма қажеттігін тексеріңіз.",
        "en": "Prepare your passport and check whether the translation condition applies."
      },
      {
        "ru": "В ЦОН выберите формирование ИИН и заполните заявление; сохраните расписку.",
        "kk": "ХҚКО-да ЖСН қалыптастыру қызметін таңдап, өтініш толтырыңыз; қолхатты сақтаңыз.",
        "en": "At the service centre choose IIN issuance, complete the application and keep the receipt."
      },
      {
        "ru": "Получив свидетельство, сверьте ФИО и дату рождения с паспортом; ошибку оформляйте как корректировку ИИН.",
        "kk": "Куәлікті алған соң аты-жөн мен туған күнді паспортпен салыстырыңыз; қате болса ЖСН түзету қызметіне жүгініңіз.",
        "en": "Check the certificate against your passport; use the IIN correction service for errors."
      }
    ],
    "authority": {
      "ru": "ЦОН — Государственная корпорация «Правительство для граждан»",
      "kk": "ХҚКО — «Азаматтарға арналған үкімет» мемлекеттік корпорациясы",
      "en": "A service centre operated by Government for Citizens"
    },
    "ask": {
      "ru": "Мне требуется формирование ИИН. Вот паспорт; нужен ли по его написанию нотариальный перевод и где получить результат по расписке?",
      "kk": "Маған ЖСН қалыптастыру қажет. Міне паспорт; жазылуына қарай нотариалдық аударма керек пе, қолхат бойынша нәтижені қайдан аламын?",
      "en": "I need an IIN issued. Does the script in my passport require notarised translation, and where do I collect the result using my receipt?"
    },
    "url": "https://www.gov.kz/services/3991?lang=ru",
    "sourceIds": [
      "faq-iin-service"
    ],
    "coverageTopic": "documents"
  },
  {
    "id": "bank-account",
    "category": "finance",
    "question": {
      "ru": "Какие документы нужны иностранцу для банковского счёта?",
      "kk": "Шетел азаматына банк шотын ашуға қандай құжаттар қажет?",
      "en": "Which documents does a foreign citizen need to open a bank account?"
    },
    "answer": {
      "ru": "Конкретный пример: Halyk для нового иностранного клиента без ВНЖ указывает личное обращение в отделение с паспортом, ИИН и заявлением-анкетой, подтверждениями основания нахождения и адреса. Это требования Halyk; другой банк проверяется отдельно.",
      "kk": "Нақты мысал: Halyk ықтиярхатсыз жаңа шетелдік клиенттен бөлімшеге жеке келуді, паспорт, ЖСН, өтініш-сауалнама, елде болу негізі мен мекенжай растауын сұрайды. Бұл — Halyk талаптары; басқа банкті бөлек тексеріңіз.",
      "en": "For example, Halyk lists an in-person branch visit for a new foreign customer without a residence card, with passport, IIN, application form, evidence of the reason for staying and an address. Other banks have their own requirements."
    },
    "steps": [
      {
        "ru": "Для основания подготовьте, например, трудовой договор или подтверждение учёбы; для адреса — договор аренды или РВП.",
        "kk": "Негіз үшін, мысалы, еңбек шартын немесе оқу растауын; мекенжай үшін жалдау шартын не уақытша тұруға рұқсатты дайындаңыз.",
        "en": "For example, prepare employment or study evidence for your stay and a lease or residence permit for your address."
      },
      {
        "ru": "До визита подтвердите перечень у банка для своего гражданства и статуса.",
        "kk": "Бармас бұрын банктен азаматтығыңыз бен мәртебеңізге сай тізімді растаңыз.",
        "en": "Confirm the list for your citizenship and status with the bank before visiting."
      },
      {
        "ru": "После одобрения сохраните договор, IBAN и тарифы; при отказе — запрос и доступный письменный ответ.",
        "kk": "Мақұлданса шартты, IBAN мен тарифтерді; бас тартылса сұрауды және қолжетімді жазбаша жауапты сақтаңыз.",
        "en": "After approval keep the contract, IBAN and tariffs; after refusal keep your request and any written response."
      }
    ],
    "authority": {
      "ru": "Выбранный банк",
      "kk": "Таңдалған банк",
      "en": "The selected bank"
    },
    "ask": {
      "ru": "Каков полный перечень документов и тарифов для счёта иностранца с моим статусом?",
      "kk": "Менің мәртебемдегі шетел азаматына шот ашуға қажет құжаттар мен тарифтердің толық тізімі қандай?",
      "en": "What is the complete document and fee list for a foreign customer with my status?"
    },
    "url": "https://hlb.halykbank.kz/knowledge_base/560",
    "sourceIds": [
      "faq-halyk-nonresident",
      "bank"
    ],
    "coverageTopic": "finance"
  },
  {
    "id": "bank-refusal",
    "category": "finance",
    "question": {
      "ru": "Банк отказал или запросил дополнительные документы. Куда дальше?",
      "kk": "Банк бас тартса немесе қосымша құжат сұраса, қайда жүгінемін?",
      "en": "What should I do if a bank refuses or requests more documents?"
    },
    "answer": {
      "ru": "Попросите объяснить недостающие сведения и порядок рассмотрения обращения в самом банке. Если вопрос не решён, уточните компетенцию и канал обращения в АРРФР. Обращение не гарантирует открытие счёта.",
      "kk": "Банктен жетіспейтін мәліметтер мен өтінішті қарау тәртібін түсіндіруді сұраңыз. Мәселе шешілмесе, Қаржы нарығын реттеу және дамыту агенттігінің құзыреті мен жүгіну арнасын нақтылаңыз. Өтініш шот ашуға кепілдік бермейді.",
      "en": "Ask the bank to explain missing information and its enquiry process. If unresolved, check the financial regulator remit and submission channel. An enquiry does not guarantee account opening."
    },
    "steps": [
      {
        "ru": "Сохраните запрос банка, свою подачу и доступный ответ.",
        "kk": "Банк сұрауын, өз өтінішіңізді және жауапты сақтаңыз.",
        "en": "Keep the bank’s request, your submission and any response."
      },
      {
        "ru": "Задайте банку конкретный вопрос о следующем действии.",
        "kk": "Банкке келесі әрекет туралы нақты сұрақ қойыңыз.",
        "en": "Ask the bank exactly what action is needed next."
      },
      {
        "ru": "При споре проверьте официальный канал АРРФР и приложите переписку.",
        "kk": "Дау болса, агенттіктің ресми арнасын тексеріп, хат алмасуды тіркеңіз.",
        "en": "If disputed, check the regulator official channel and attach correspondence."
      }
    ],
    "authority": {
      "ru": "Банк; Агентство по регулированию и развитию финансового рынка",
      "kk": "Банк; Қаржы нарығын реттеу және дамыту агенттігі",
      "en": "The bank; the Agency for Regulation and Development of the Financial Market"
    },
    "ask": {
      "ru": "Каких сведений не хватает и куда обратиться для проверки порядка рассмотрения моего заявления?",
      "kk": "Қандай мәлімет жетіспейді және өтінішімнің қаралу тәртібін тексеру үшін қайда жүгінемін?",
      "en": "What information is missing, and where can I ask for a review of the handling of my application?"
    },
    "url": "https://www.gov.kz/org/ardfm?lang=ru",
    "sourceIds": [
      "faq-bank-regulator",
      "bank"
    ],
    "coverageTopic": "finance"
  },
  {
    "id": "international-transfer",
    "category": "finance",
    "question": {
      "ru": "Как подготовиться к международному переводу или проверке платежа?",
      "kk": "Халықаралық аударымға немесе төлемді тексеруге қалай дайындаламын?",
      "en": "How should I prepare for an international transfer or a payment review?"
    },
    "answer": {
      "ru": "Условия зависят от банка, направления, валюты и характера операции. До перевода уточните доступность, комиссии и подтверждения; не обещайте получателю срок, пока банк его не подтвердил.",
      "kk": "Шарттар банкке, бағытқа, валютаға және операция сипатына байланысты. Аударымға дейін қолжетімділікті, комиссиялар мен растауларды нақтылаңыз; банк растағанша алушыға мерзім уәде етпеңіз.",
      "en": "Terms depend on the bank, destination, currency and transaction. Confirm availability, charges and supporting evidence before sending; do not promise a delivery time the bank has not confirmed."
    },
    "steps": [
      {
        "ru": "Проверьте реквизиты получателя и назначение платежа.",
        "kk": "Алушының деректемелері мен төлем мақсатын тексеріңіз.",
        "en": "Verify the recipient details and payment purpose."
      },
      {
        "ru": "Уточните комиссии банков и документы по операции.",
        "kk": "Банктердің комиссиялары мен операция құжаттарын нақтылаңыз.",
        "en": "Ask about bank charges and transaction documents."
      },
      {
        "ru": "При задержке запросите статус и порядок розыска у банка.",
        "kk": "Кідіріс болса, банктен мәртебе мен іздестіру тәртібін сұраңыз.",
        "en": "If delayed, ask the bank for status and tracing procedures."
      }
    ],
    "authority": {
      "ru": "Банк-отправитель; при необходимости банк-получатель",
      "kk": "Жіберуші банк; қажет болса, алушы банк",
      "en": "The sending bank; the receiving bank if needed"
    },
    "ask": {
      "ru": "Доступен ли этот перевод, какие подтверждения нужны и как проверить его статус?",
      "kk": "Бұл аударым қолжетімді ме, қандай растаулар керек және мәртебесін қалай тексеремін?",
      "en": "Is this transfer available, what evidence is required, and how can I check its status?"
    },
    "url": "https://adilet.zan.kz/rus/docs/Z1800000167",
    "sourceIds": [
      "currency",
      "bank"
    ],
    "coverageTopic": "finance"
  },
  {
    "id": "employment-contract",
    "category": "work",
    "question": {
      "ru": "Я гражданин страны ЕАЭС. Нужно ли разрешение на работу?",
      "kk": "Мен ЕАЭО елінің азаматымын. Жұмысқа рұқсат керек пе?",
      "en": "I am an EAEU citizen. Do I need a work permit?"
    },
    "answer": {
      "ru": "Граждане России, Беларуси, Армении и Кыргызстана работают в Казахстане без разрешения на работу по правилам ЕАЭС. Письменный договор и оформление пребывания всё равно нужны. Для других гражданств это исключение не применяется автоматически.",
      "kk": "Ресей, Беларусь, Армения және Қырғызстан азаматтары ЕАЭО қағидалары бойынша Қазақстанда жұмысқа рұқсатсыз еңбек етеді. Жазбаша шарт пен болуды ресімдеу бәрібір қажет. Басқа азаматтыққа бұл ерекшелік автоматты қолданылмайды.",
      "en": "Citizens of Russia, Belarus, Armenia and Kyrgyzstan may work in Kazakhstan without a work permit under EAEU rules. A written contract and lawful residence still matter. This exemption does not automatically extend to other citizenships."
    },
    "steps": [
      {
        "ru": "Получите проект трудового договора: должность, место работы, оплата, режим и срок.",
        "kk": "Еңбек шартының жобасын алыңыз: лауазым, жұмыс орны, ақы, режим және мерзім.",
        "en": "Obtain a draft contract stating the job, workplace, pay, hours and term."
      },
      {
        "ru": "Подпишите договор и сохраните свой экземпляр; с работодателем оформите основание РВП, если оно требуется для срока пребывания.",
        "kk": "Шартқа қол қойып, өз данаңызды сақтаңыз; болу мерзіміне қажет болса, жұмыс берушімен уақытша тұру негізін ресімдеңіз.",
        "en": "Sign and keep your copy; coordinate temporary residence with the employer where required for your stay."
      },
      {
        "ru": "Если гражданство не входит в этот список, до начала работы попросите работодателя назвать разрешение или конкретное исключение.",
        "kk": "Азаматтығыңыз тізімде болмаса, жұмысты бастамас бұрын жұмыс берушіден қажетті рұқсатты не нақты ерекшелікті атауды сұраңыз.",
        "en": "If your citizenship is outside this list, have the employer identify the required permit or specific exemption before you start."
      }
    ],
    "authority": {
      "ru": "Работодатель; миграционная служба; территориальная инспекция труда",
      "kk": "Жұмыс беруші; көші-қон қызметі; аумақтық еңбек инспекциясы",
      "en": "The employer; migration services; the territorial labour inspectorate"
    },
    "ask": {
      "ru": "Я гражданин [страна]. На каком основании оформляется моя работа, кто подаёт на РВП и когда я получу подписанный экземпляр договора?",
      "kk": "Мен [ел] азаматымын. Жұмысым қандай негізбен ресімделеді, уақытша тұруға өтінішті кім береді және қол қойылған шарт данасын қашан аламын?",
      "en": "I am a citizen of [country]. What is the legal basis for my employment, who applies for temporary residence, and when will I receive my signed contract?"
    },
    "url": "https://www.gov.kz/org/zhetysu-karatal/documents/details/1091126?lang=ru",
    "sourceIds": [
      "faq-eaeu-work",
      "labour",
      "rvp-apply"
    ],
    "coverageTopic": "work"
  },
  {
    "id": "student-employment",
    "category": "work",
    "question": {
      "ru": "Можно ли работать, если я приехал учиться?",
      "kk": "Оқуға келген болсам, жұмыс істеуге бола ма?",
      "en": "May I work if I came to Kazakhstan to study?"
    },
    "answer": {
      "ru": "Студенческий статус не разрешает любую работу. В перечне №1041 есть отдельное исключение: очная учёба и одновременная работа именно в учебном заведении РК в свободное от учёбы время. Для граждан ЕАЭС действует отдельное основание.",
      "kk": "Студент мәртебесі кез келген жұмысқа құқық бермейді. №1041 тізімінде күндізгі оқу және оқудан бос уақытта ҚР оқу орнында жұмыс істеу ерекшелігі бар. ЕАЭО азаматтарына бөлек негіз қолданылады.",
      "en": "Student status does not authorise every job. List No.1041 includes an exception for full-time students working in a Kazakhstan educational institution outside study hours. EAEU citizenship provides a separate basis."
    },
    "steps": [
      {
        "ru": "Возьмите в вузе справку с формой обучения и документ об учебном основании пребывания.",
        "kk": "ЖОО-дан оқу нысаны көрсетілген анықтаманы және оқу мақсатымен болу құжатын алыңыз.",
        "en": "Get confirmation of your study mode and your education-based stay document."
      },
      {
        "ru": "Передайте работодателю должность и график: пусть подтвердит конкретное исключение или нужное разрешение.",
        "kk": "Жұмыс берушіге лауазым мен кестені беріңіз: нақты ерекшелікті не қажетті рұқсатты растасын.",
        "en": "Give the employer the job and schedule; have them confirm the exemption or required permit."
      },
      {
        "ru": "До выхода на работу подпишите договор и проверьте с вузом влияние занятости на учебное основание.",
        "kk": "Жұмысқа кіріспес бұрын шартқа қол қойып, жұмыстың оқу негізіне ықпалын ЖОО-мен тексеріңіз.",
        "en": "Before starting, sign the contract and check with your institution whether employment affects your study basis."
      }
    ],
    "authority": {
      "ru": "Вуз; работодатель; миграционная служба",
      "kk": "ЖОО; жұмыс беруші; көші-қон қызметі",
      "en": "Your institution; the employer; migration services"
    },
    "ask": {
      "ru": "Разрешена ли конкретная работа при моём гражданстве и учебном основании пребывания?",
      "kk": "Азаматтығым мен оқу үшін болу негізім бойынша осы нақты жұмысқа рұқсат етіле ме?",
      "en": "Is this particular job permitted with my citizenship and study-related grounds of stay?"
    },
    "url": "https://primeminister.kz/assets/media/1041-prilozhenie-1-rus.pdf",
    "sourceIds": [
      "faq-student-work-exception",
      "faq-eaeu-work",
      "labour"
    ],
    "coverageTopic": "work"
  },
  {
    "id": "remote-employment",
    "category": "work",
    "question": {
      "ru": "Я работаю удалённо на зарубежную компанию. Какие вопросы проверить?",
      "kk": "Шетел компаниясына қашықтан жұмыс істеймін. Нені тексеремін?",
      "en": "What should I check if I work remotely for a foreign company?"
    },
    "answer": {
      "ru": "Слово «удалённо» не определяет миграционное основание, налоговый статус и банковские требования. Проверьте эти вопросы отдельно; отсутствие местного работодателя не заменяет официальное разъяснение по вашей ситуации.",
      "kk": "«Қашықтан» деген атау көші-қон негізін, салық мәртебесін және банк талаптарын анықтамайды. Бұларды бөлек тексеріңіз; жергілікті жұмыс берушінің болмауы жеке жағдайыңызға ресми түсіндірмені алмастырмайды.",
      "en": "Working remotely does not determine migration grounds, tax status or bank requirements. Check each separately; having no local employer is not a substitute for official guidance on your situation."
    },
    "steps": [
      {
        "ru": "Для миграционной службы укажите гражданство, даты поездок и отсутствие местного работодателя: попросите назвать подходящее основание пребывания.",
        "kk": "Көші-қон қызметіне азаматтықты, сапар күндерін және жергілікті жұмыс беруші жоқ екенін көрсетіп, тиісті болу негізін сұраңыз.",
        "en": "Tell migration services your citizenship, travel dates and that you have no local employer; ask which residence basis fits."
      },
      {
        "ru": "Для КГД подготовьте договор, страну работодателя, периоды пребывания и подтверждения иностранного налога; запросите ответ за конкретный налоговый год.",
        "kk": "МКК үшін шартты, жұмыс беруші елін, болу кезеңдері мен шетелдік салық растауын дайындап, нақты салық жылына жауап сұраңыз.",
        "en": "For the tax authority, prepare the contract, employer’s country, stay periods and foreign-tax records and ask about a specific tax year."
      },
      {
        "ru": "Банку покажите договор и источник поступлений через его официальный канал. Сохраните ответы трёх организаций отдельно: один не заменяет другой.",
        "kk": "Банкке шарт пен түсім көзін оның ресми арнасымен көрсетіңіз. Үш ұйым жауабын бөлек сақтаңыз: бірі екіншісін алмастырмайды.",
        "en": "Provide the bank with the contract and source of funds through its official channel. Keep the three organisations’ responses separately."
      }
    ],
    "authority": {
      "ru": "Миграционная служба; КГД; обслуживающий банк",
      "kk": "Көші-қон қызметі; МКК; қызмет көрсететін банк",
      "en": "Migration services; the State Revenue Committee; your bank"
    },
    "ask": {
      "ru": "Какие миграционные основания и налоговые обязанности нужно проверить для моего удалённого договора?",
      "kk": "Қашықтан жұмыс шартым үшін қандай көші-қон негіздері мен салық міндеттерін тексеру керек?",
      "en": "Which migration grounds and tax obligations need checking for my remote-work contract?"
    },
    "url": "https://adilet.zan.kz/rus/docs/Z1100000477",
    "sourceIds": [
      "migration",
      "faq-tax",
      "currency"
    ],
    "coverageTopic": "work"
  },
  {
    "id": "university-host",
    "category": "study",
    "question": {
      "ru": "Что согласовать с вузом после поступления и приезда?",
      "kk": "Оқуға түсіп, келгеннен кейін ЖОО-мен нені келісемін?",
      "en": "What should I coordinate with my university after enrolment and arrival?"
    },
    "answer": {
      "ru": "После приезда обратитесь в международный отдел вуза: для учебного РВП основанием служит ходатайство организации образования. Уведомление о прибытии и документ о зачислении не заменяют выданное РВП.",
      "kk": "Келген соң ЖОО-ның халықаралық бөліміне жүгініңіз: оқу мақсатындағы уақытша тұруға рұқсаттың негізі — білім беру ұйымының өтінішхаты. Келу хабарламасы мен оқуға қабылдану құжаты берілген рұқсатты алмастырмайды.",
      "en": "Contact your institution’s international office after arrival: its petition supports education-based temporary residence. Arrival notification and enrolment evidence do not replace an issued permit."
    },
    "steps": [
      {
        "ru": "Передайте вузу паспорт, сведения о въезде, зачислении и фактическом адресе.",
        "kk": "ЖОО-ға паспортты, кіру, оқуға қабылдану және нақты мекенжай мәліметтерін беріңіз.",
        "en": "Give the institution your passport, entry details, enrolment evidence and actual address."
      },
      {
        "ru": "Попросите подготовить ходатайство и определить принимающую сторону — особенно если живёте не в общежитии.",
        "kk": "Өтінішхат дайындауды және қабылдаушы тарапты анықтауды сұраңыз, әсіресе жатақханада тұрмасаңыз.",
        "en": "Ask it to prepare the petition and identify the receiving party, especially for off-campus housing."
      },
      {
        "ru": "После подачи получите копию РВП и отдельно подтверждение уведомления; сверьте адрес, основание и срок.",
        "kk": "Өтініштен кейін рұқсат көшірмесін және бөлек хабарлама растауын алыңыз; мекенжайды, негізді, мерзімді тексеріңіз.",
        "en": "Obtain a copy of the issued permit and separate notification confirmation; check address, basis and expiry."
      }
    ],
    "authority": {
      "ru": "Международный отдел вуза; принимающая сторона; миграционная служба",
      "kk": "ЖОО халықаралық бөлімі; қабылдаушы тарап; көші-қон қызметі",
      "en": "The university international office; your host; migration services"
    },
    "ask": {
      "ru": "Кто подаёт уведомление и какие документы вуз готовит для моего учебного пребывания?",
      "kk": "Хабарламаны кім береді және ЖОО менің оқу үшін болуыма қандай құжат дайындайды?",
      "en": "Who submits the notification, and which documents will the university provide for my study-related stay?"
    },
    "url": "https://adilet.zan.kz/rus/docs/Z1100000477",
    "sourceIds": [
      "rvp-apply",
      "faq-notification-2026",
      "migration"
    ],
    "coverageTopic": "study"
  },
  {
    "id": "child-school",
    "category": "study",
    "question": {
      "ru": "Как устроить ребёнка иностранного гражданина в школу?",
      "kk": "Шетел азаматының баласын мектепке қалай орналастырады?",
      "en": "How can the child of a foreign citizen be enrolled in school?"
    },
    "answer": {
      "ru": "Уточните применимый порядок в местном отделе образования и выбранной школе. Перечень документов и условия зависят от ситуации семьи и этапа обучения; здесь не определяется автоматическое право на место или бесплатность.",
      "kk": "Жергілікті білім бөлімі мен таңдаған мектептен қолданылатын тәртіпті сұраңыз. Құжаттар мен шарттар отбасы жағдайына және оқу кезеңіне байланысты; мұнда орынға автоматты құқық немесе тегіндік анықталмайды.",
      "en": "Confirm the applicable process with the local education department and school. Documents and conditions depend on family circumstances and the stage of education; this FAQ does not determine automatic admission or free provision."
    },
    "steps": [
      {
        "ru": "Назовите местному отделу образования возраст ребёнка, текущий класс, адрес и правовой статус семьи; попросите школу и, если нужно по вашему статусу, направление.",
        "kk": "Жергілікті білім бөліміне баланың жасын, сыныбын, мекенжайды, отбасының құқықтық мәртебесін айтып, мектепті және мәртебеңізге қажет болса жолдаманы сұраңыз.",
        "en": "Tell the education department the child’s age, current grade, address and family legal status; ask for a school and any status-specific referral."
      },
      {
        "ru": "Получите в школе действующий перечень и подайте заявление; медицинские формы и документы об обучении готовьте по этому перечню.",
        "kk": "Мектептен өзекті тізімді алып, өтініш беріңіз; медициналық нысандар мен оқу құжаттарын сол тізіммен дайындаңыз.",
        "en": "Obtain the school’s current list and submit an application; prepare medical and schooling records against that list."
      },
      {
        "ru": "Получите подтверждение приёма заявления. При отказе запросите письменную причину и направьте её в местный орган образования.",
        "kk": "Өтініш қабылданғанын растатыңыз. Бас тартса, жазбаша себепті сұрап, жергілікті білім органына жіберіңіз.",
        "en": "Obtain submission confirmation. If refused, request written reasons and send them to the local education authority."
      }
    ],
    "authority": {
      "ru": "Местный отдел образования; администрация школы",
      "kk": "Жергілікті білім бөлімі; мектеп әкімшілігі",
      "en": "The local education department; the school administration"
    },
    "ask": {
      "ru": "Какой порядок приёма и какие документы применяются к ребёнку с нашим статусом пребывания?",
      "kk": "Біздің болу мәртебеміздегі балаға қандай қабылдау тәртібі мен құжаттар қолданылады?",
      "en": "Which admission process and documents apply to a child with our family stay status?"
    },
    "url": "https://www.gov.kz/situations/15/81?lang=ru",
    "sourceIds": [
      "faq-school",
      "foreign"
    ],
    "coverageTopic": "study"
  },
  {
    "id": "health-insurance",
    "category": "health",
    "question": {
      "ru": "Как иностранцу проверить право на ОСМС и попасть на приём?",
      "kk": "Шетелдік МӘМС құқығын тексеріп, қабылдауға қалай жазылады?",
      "en": "How can a foreign citizen check OSMS access and see a doctor?"
    },
    "answer": {
      "ru": "Постоянно проживающие иностранцы и трудящиеся ЕАЭС могут участвовать в ОСМС на установленных условиях. Один ИИН, РВП или полис не подтверждает статус застрахованности. Для других временно пребывающих иностранцев проверьте ДМС и платный приём.",
      "kk": "Тұрақты тұратын шетелдіктер мен ЕАЭО еңбекшілері белгіленген шарттармен МӘМС-ке қатыса алады. ЖСН, уақытша тұруға рұқсат немесе полис сақтандырылу мәртебесін өздігінен растамайды. Басқа уақытша шетелдіктер ДМС пен ақылы қабылдауды тексереді.",
      "en": "Permanent foreign residents and EAEU workers may participate in OSMS subject to its conditions. An IIN, residence permit or policy alone does not establish insured status. Other temporary visitors should check voluntary insurance and paid care."
    },
    "steps": [
      {
        "ru": "Проверьте статус в официальном сервисе ОСМС и уточните в клинике запись и прикрепление.",
        "kk": "МӘМС ресми сервисінен мәртебені тексеріп, емханадан жазылу мен тіркелуді сұраңыз.",
        "en": "Check insured status through an official OSMS service and ask the clinic about booking and attachment."
      },
      {
        "ru": "Если статус неверный, подготовьте паспорт, ИИН, документ о проживании и, по ситуации, трудовой договор и подтверждения взносов. Обратитесь в ФСМС.",
        "kk": "Мәртебе қате болса, паспорт, ЖСН, тұру құжатын, қажет болса еңбек шарты мен жарна растауларын дайындап, ӘМСҚ-ға жүгініңіз.",
        "en": "For an incorrect status, prepare identity, IIN and residence evidence plus employment and contribution records where relevant, and contact the Health Insurance Fund."
      },
      {
        "ru": "По ДМС согласуйте с ассистансом конкретную клинику и услугу до визита. При угрозе жизни звоните 103.",
        "kk": "ДМС бойынша бармас бұрын ассистанспен нақты емхана мен қызметті келісіңіз. Өмірге қауіп болса 103-ке қоңырау шалыңыз.",
        "en": "For voluntary cover, get the assistance provider’s approval for the clinic and service before visiting. Call 103 for a life-threatening emergency."
      }
    ],
    "authority": {
      "ru": "ФСМС — по статусу ОСМС; страховщик — по ДМС; регистратура выбранной клиники",
      "kk": "ӘМСҚ — МӘМС мәртебесі; сақтандырушы — ДМС; таңдалған емхананың тіркеу бөлімі",
      "en": "Health Insurance Fund for OSMS status; insurer for voluntary cover; clinic reception"
    },
    "ask": {
      "ru": "Я [гражданство], у меня [ВНЖ/РВП], работа [есть/нет]. Как проверить мой статус ОСМС и какие документы нужны, если взносы не отображаются?",
      "kk": "Мен [азаматтық], менде [ықтиярхат/уақытша рұқсат], жұмыс [бар/жоқ]. МӘМС мәртебесін қалай тексеремін, жарна көрінбесе қандай құжаттар қажет?",
      "en": "I am [citizenship], hold [residence document], and [am/am not] employed. How can I check OSMS status and correct missing contribution records?"
    },
    "url": "https://www.gov.kz/situations/722/1476?lang=ru",
    "sourceIds": [
      "faq-osms-eligibility",
      "faq-osms-correction",
      "faq-emergency"
    ],
    "coverageTopic": "health"
  },
  {
    "id": "medical-emergency",
    "category": "health",
    "question": {
      "ru": "Куда звонить при резком ухудшении здоровья или угрозе жизни?",
      "kk": "Денсаулық күрт нашарласа немесе өмірге қауіп төнсе, қайда қоңырау шаламын?",
      "en": "Who should I call for a serious medical emergency or danger to life?"
    },
    "answer": {
      "ru": "При состоянии, требующем экстренной медицинской помощи, звоните 103. При чрезвычайной ситуации или необходимости нескольких служб — 112. Не откладывайте вызов ради предварительной проверки страхования.",
      "kk": "Шұғыл медициналық көмек қажет болса, 103-ке қоңырау шалыңыз. Төтенше жағдайда немесе бірнеше қызмет қажет болса, 112-ге хабарласыңыз. Сақтандыруды алдын ала тексеру үшін шақыруды кешіктірмеңіз.",
      "en": "Call 103 when emergency medical assistance is needed. Call 112 for an emergency requiring coordinated services. Do not delay the call while checking insurance."
    },
    "steps": [
      {
        "ru": "Сообщите диспетчеру точное местонахождение и что произошло.",
        "kk": "Диспетчерге нақты орналасқан жерді және не болғанын айтыңыз.",
        "en": "Tell the dispatcher your exact location and what happened."
      },
      {
        "ru": "Опишите состояние пострадавшего и ответьте на уточнения.",
        "kk": "Зардап шеккен адамның жағдайын сипаттап, сұрақтарға жауап беріңіз.",
        "en": "Describe the affected person’s condition and answer questions."
      },
      {
        "ru": "Выполняйте инструкции диспетчера и обеспечьте доступ помощи.",
        "kk": "Диспетчер нұсқауларын орындап, көмекке жол ашыңыз.",
        "en": "Follow dispatcher instructions and help responders reach the location."
      }
    ],
    "authority": {
      "ru": "Скорая помощь 103; экстренная служба 112",
      "kk": "Жедел жәрдем 103; шұғыл қызмет 112",
      "en": "Ambulance service 103; emergency service 112"
    },
    "ask": {
      "ru": "По этому адресу человеку нужна срочная помощь. Что делать до прибытия бригады?",
      "kk": "Осы мекенжайдағы адамға шұғыл көмек керек. Бригада келгенше не істеу қажет?",
      "en": "A person at this location needs urgent help. What should we do until responders arrive?"
    },
    "url": "https://www.gov.kz/situations/55/199?lang=ru",
    "sourceIds": [
      "faq-emergency"
    ],
    "coverageTopic": "health"
  },
  {
    "id": "tax-enquiry",
    "category": "life",
    "question": {
      "ru": "Я живу в Казахстане и получаю зарплату из-за рубежа. Что отправить в КГД?",
      "kk": "Қазақстанда тұрып, шетелден жалақы аламын. МКК-ға нені жіберемін?",
      "en": "I live in Kazakhstan and receive foreign salary. What should I send the tax authority?"
    },
    "answer": {
      "ru": "Подготовьте один предметный запрос в территориальный орган государственных доходов. Для ответа нужны налоговый период, фактические даты пребывания, страна работодателя, вид договора и уже удержанный налог. Виза или банковский статус не определяют автоматически налоговые обязанности.",
      "kk": "Аумақтық мемлекеттік кірістер органына бір нақты сұрау дайындаңыз. Жауап үшін салық кезеңі, нақты болу күндері, жұмыс беруші елі, шарт түрі және ұсталған салық қажет. Виза не банк мәртебесі салық міндетін автоматты анықтамайды.",
      "en": "Prepare a focused enquiry to your local State Revenue authority: tax year, actual stay dates, employer’s country, contract type and tax already withheld. Immigration and banking status do not automatically determine tax obligations."
    },
    "steps": [
      {
        "ru": "Составьте таблицу въездов и выездов за соответствующий период и выписку доходов по месяцам.",
        "kk": "Тиісті кезеңдегі кіру-шығу күндері кестесін және айлық кіріс есебін жасаңыз.",
        "en": "List entry and exit dates for the relevant period and income by month."
      },
      {
        "ru": "В официальном обращении спросите об определении резидентства, применимом международном соглашении, форме отчётности и сроке за конкретный год.",
        "kk": "Ресми өтініште нақты жылға резиденттік, қолданылатын халықаралық келісім, есеп нысаны мен мерзімін сұраңыз.",
        "en": "Ask in an official enquiry about residency, the applicable tax treaty, reporting form and deadline for that specific year."
      },
      {
        "ru": "Приложите требуемые подтверждения через защищённый официальный канал; сохраните регистрационный номер и письменный ответ.",
        "kk": "Қажетті растауларды қорғалған ресми арнамен беріп, тіркеу нөмірі мен жазбаша жауапты сақтаңыз.",
        "en": "Supply requested evidence through the secure official channel and keep the registration number and written response."
      }
    ],
    "authority": {
      "ru": "КГД МФ РК; территориальный орган государственных доходов",
      "kk": "ҚР ҚМ МКК; аумақтық мемлекеттік кірістер органы",
      "en": "The State Revenue Committee; the territorial state revenue authority"
    },
    "ask": {
      "ru": "За [год] я находился в РК [даты], получал зарплату от работодателя из [страна], налог удержан там [сведения]. Как определить моё резидентство, учесть иностранный налог и какую отчётность подать?",
      "kk": "[Жыл] ішінде ҚР-да [күндер] болдым, [ел] жұмыс берушісінен жалақы алдым, сонда [мәлімет] салық ұсталды. Резиденттікті, шетелдік салықты есептеуді және есептілікті қалай анықтаймын?",
      "en": "In [year] I stayed in Kazakhstan on [dates], received salary from [country], and had [details] tax withheld abroad. How are my residency, foreign-tax credit and filing obligations determined?"
    },
    "url": "https://www.gov.kz/org/kgd?lang=ru",
    "sourceIds": [
      "faq-tax",
      "currency"
    ],
    "coverageTopic": "life"
  },
  {
    "id": "public-service-complaint",
    "category": "life",
    "question": {
      "ru": "Мне отказали в госуслуге или не объяснили решение. Как обратиться?",
      "kk": "Мемлекеттік қызметтен бас тартса немесе шешімді түсіндірмесе, қалай жүгінемін?",
      "en": "How can I raise a refusal or unexplained decision about a public service?"
    },
    "answer": {
      "ru": "Попросите оформить ответ и назвать причину. eGov перечисляет подачу через eOtinish, письменное обращение и другие официальные способы. Телефонная консультация помогает выбрать маршрут, но не заменяет зарегистрированную жалобу.",
      "kk": "Жауапты рәсімдеп, себебін атауды сұраңыз. eGov eOtinish арқылы, жазбаша және басқа ресми тәсілдермен жүгінуді көрсетеді. Телефон кеңесі бағыт таңдауға көмектеседі, бірақ тіркелген шағымды алмастырмайды.",
      "en": "Ask for the response and its reasons. eGov lists eOtinish, written submissions and other official channels. Telephone guidance can help identify the route but does not replace a registered complaint."
    },
    "steps": [
      {
        "ru": "Сохраните расписку или номер заявления, дату подачи и мотивированный отказ либо доказательство отсутствия ответа.",
        "kk": "Қолхатты не өтініш нөмірін, беру күнін, дәлелді бас тартуды немесе жауап болмағанын растайтын деректі сақтаңыз.",
        "en": "Keep the receipt or application number, filing date, reasoned refusal or evidence that no response arrived."
      },
      {
        "ru": "В eOtinish или письменной жалобе услугодателю укажите услугу, хронологию и требование: объяснить отказ, устранить нарушение или пересмотреть решение.",
        "kk": "eOtinish не қызмет берушіге жазбаша шағымда қызметті, оқиға ретін және талапты жазыңыз: бас тартуды түсіндіру, бұзушылықты жою не шешімді қайта қарау.",
        "en": "In eOtinish or a written complaint to the provider, state the service, timeline and remedy requested: explanation, correction or review."
      },
      {
        "ru": "Получите номер регистрации и отслеживайте ответ. По качеству госуслуги можно обратиться в территориальный департамент Агентства по делам госслужбы; 1414 помогает выбрать адресата.",
        "kk": "Тіркеу нөмірін алып, жауапты бақылаңыз. Қызмет сапасы бойынша Мемлекеттік қызмет істері агенттігінің аумақтық департаментіне жүгінуге болады; 1414 адресатты таңдауға көмектеседі.",
        "en": "Obtain the registration number and track the response. Service-quality complaints can go to the territorial Civil Service Affairs Agency; 1414 can help identify the recipient."
      }
    ],
    "authority": {
      "ru": "Услугодатель; орган контроля качества госуслуг; 1414 для маршрута",
      "kk": "Қызмет көрсетуші; мемлекеттік қызмет сапасын бақылау органы; бағыт үшін 1414",
      "en": "The service provider; the public-service quality oversight authority; 1414 for routing"
    },
    "ask": {
      "ru": "Кому, каким способом и в какой срок обжаловать это решение; как подтвердить регистрацию жалобы?",
      "kk": "Бұл шешімге кімге, қалай және қандай мерзімде шағымданамын; тіркелуін қалай растаймын?",
      "en": "To whom, how and by when may I challenge this decision, and how is the complaint registered?"
    },
    "url": "https://beta.egov.kz/situations/741/1544?lang=ru",
    "sourceIds": [
      "faq-public-appeals"
    ],
    "coverageTopic": "life"
  },
  {
    "id": "prepare-before-entry",
    "category": "migration",
    "question": {
      "ru": "Что проверить до покупки билета и выезда?",
      "kk": "Билет алып, жолға шықпас бұрын нені тексеремін?",
      "en": "What should I check before buying a ticket and travelling?"
    },
    "answer": {
      "ru": "Начните с действительных документов, порядка въезда для своего гражданства и цели поездки. Согласуйте принимающую сторону и способ получить подтверждения. Это план подготовки: он не подтверждает допуск через границу.",
      "kk": "Алдымен құжаттардың жарамдылығын, азаматтық пен сапар мақсатына сай кіру тәртібін тексеріңіз. Қабылдаушы тарапты және растаулар алу тәсілін келісіңіз. Бұл дайындық жоспары, шекарадан өткізу кепілдігі емес.",
      "en": "Start by checking valid documents and entry requirements for your citizenship and purpose. Agree who will host you and how to obtain confirmations. This preparation plan does not guarantee admission at the border."
    },
    "steps": [
      {
        "ru": "По паспорту и гражданству проверьте безвизовый порядок или нужную визу; сверяйте цель поездки с выбранной процедурой.",
        "kk": "Паспорт пен азаматтық бойынша визасыз тәртіпті не қажетті визаны тексеріп, сапар мақсатын рәсіммен салыстырыңыз.",
        "en": "Check the visa waiver or required visa for your passport and citizenship and match it to your actual purpose."
      },
      {
        "ru": "До покупки билета согласуйте фактическое жильё, принимающую сторону и её готовность подать уведомление; для работы или учёбы получите документы работодателя/вуза.",
        "kk": "Билет алар алдында нақты баспананы, қабылдаушы тарапты және оның хабарлама беруін келісіңіз; жұмыс не оқу үшін жұмыс беруші/ЖОО құжаттарын алыңыз.",
        "en": "Before buying a ticket, arrange actual housing and a host willing to notify arrival; obtain employer or institution documents for work or study."
      },
      {
        "ru": "Для долгого переезда заранее откройте нужный FAQ: РВП либо ПМЖ. Проверьте QazETA по дате поездки и пункту пропуска.",
        "kk": "Ұзақ көшу үшін тиісті FAQ-ды алдын ала ашыңыз: уақытша не тұрақты тұру. Сапар күні мен бекетке қарай QazETA-ны тексеріңіз.",
        "en": "For a longer move, read the temporary or permanent residence FAQ in advance. Check QazETA for the travel date and checkpoint."
      }
    ],
    "authority": {
      "ru": "Консульство РК; принимающая сторона; перевозчик",
      "kk": "ҚР консулдығы; қабылдаушы тарап; тасымалдаушы",
      "en": "Kazakhstan consulate; the host; the carrier"
    },
    "ask": {
      "ru": "Какие требования действуют для моего гражданства, цели, даты и пункта въезда?",
      "kk": "Азаматтығыма, мақсатыма, күнім мен кіру пунктіме қандай талаптар қолданылады?",
      "en": "Which requirements apply to my citizenship, purpose, date and entry point?"
    },
    "url": "https://adilet.zan.kz/rus/docs/P1200000148",
    "sourceIds": [
      "entry",
      "faq-qazeta-2026",
      "rvp-basis",
      "pmz-apply"
    ],
    "coverageTopic": "entry"
  },
  {
    "id": "qazeta-entry",
    "category": "migration",
    "question": {
      "ru": "Нужно ли мне оформлять QazETA перед поездкой?",
      "kk": "Сапар алдында QazETA ресімдеуім керек пе?",
      "en": "Do I need QazETA before travelling?"
    },
    "answer": {
      "ru": "По разъяснению МИД от 30.10.2026 до 30.06.2027 QazETA носит рекомендательный характер; отсутствие в этот период не является основанием отказа во въезде. Внедрение по пунктам пропуска поэтапное. Не путайте срок QazETA с разрешённым сроком пребывания.",
      "kk": "СІМ-нің 30.10.2026 түсіндірмесі бойынша 30.06.2027 дейін QazETA ұсынымдық сипатта; осы кезеңде оның болмауы кіруден бас тарту негізі емес. Өткізу бекеттеріне енгізу кезеңмен жүреді. QazETA мерзімін рұқсат етілген болу мерзімімен шатастырмаңыз.",
      "en": "MFA guidance of 30 October 2026 states that QazETA is voluntary until 30 June 2027; absence during that period is not grounds for entry refusal. Rollout differs by checkpoint. Its validity is not your permitted length of stay."
    },
    "steps": [
      {
        "ru": "Проверьте по официальной публикации дату поездки, пункт пропуска и наличие исключения.",
        "kk": "Ресми жарияланымнан сапар күнін, өткізу бекетін және ерекшелікті тексеріңіз.",
        "en": "Check your travel date, checkpoint and exemptions against the official publication."
      },
      {
        "ru": "Для оформления используйте только официальный qazeta.kz; предъявляйте тот паспорт, который указан в заявке.",
        "kk": "Ресімдеу үшін тек ресми qazeta.kz қолданыңыз; өтінімдегі паспортты көрсетіңіз.",
        "en": "Use only official qazeta.kz and travel with the passport specified in the application."
      },
      {
        "ru": "Сохраните разрешение и отдельно проверьте условия въезда и проживания для своего гражданства.",
        "kk": "Рұқсатты сақтап, азаматтығыңызға сай кіру мен тұру шарттарын бөлек тексеріңіз.",
        "en": "Save the authorisation and separately check entry and residence rules for your citizenship."
      }
    ],
    "authority": {
      "ru": "Консульство РК; официальный канал QazETA",
      "kk": "ҚР консулдығы; QazETA ресми арнасы",
      "en": "Kazakhstan consulate; the official QazETA channel"
    },
    "ask": {
      "ru": "На какую дату и пункт въезда распространяется порядок в моей ситуации?",
      "kk": "Менің жағдайымда тәртіп қай күн мен кіру пунктіне қолданылады?",
      "en": "Which date and entry point rules apply to my situation?"
    },
    "url": "https://www.gov.kz/org/mfa-sofia/press/news/details/1320695?lang=ru",
    "sourceIds": [
      "faq-qazeta-2026",
      "entry"
    ],
    "coverageTopic": "entry"
  },
  {
    "id": "study-status-change",
    "category": "study",
    "question": {
      "ru": "Я перевёлся, взял перерыв или прекратил обучение. Что проверить?",
      "kk": "Басқа оқу орнына ауыстым, үзіліс алдым не оқуды тоқтаттым. Нені тексеремін?",
      "en": "I transferred, paused or ended my studies. What should I check?"
    },
    "answer": {
      "ru": "Уточните в вузе дату и содержание изменения, а затем влияние на документы принимающей стороны и основание пребывания. Учебный статус в Migrato не обновляет разрешения и не подтверждает право продолжать пребывание.",
      "kk": "ЖОО-дан өзгерістің күні мен мазмұнын, кейін қабылдаушы тарап құжаттары мен болу негізіне әсерін нақтылаңыз. Migrato-дағы оқу мәртебесі рұқсатты жаңартпайды және қалу құқығын растамайды.",
      "en": "Confirm the change and its date with the institution, then its effect on receiving-party documents and grounds of stay. A Migrato study category does not update permits or confirm a right to remain."
    },
    "steps": [
      {
        "ru": "Получите подтверждение изменения от учебного заведения.",
        "kk": "Оқу орнынан өзгеріс растауын алыңыз.",
        "en": "Obtain confirmation of the change from the institution."
      },
      {
        "ru": "Обсудите необходимые действия с ответственным подразделением вуза.",
        "kk": "Қажетті әрекеттерді ЖОО-ның жауапты бөлімімен талқылаңыз.",
        "en": "Discuss the steps with the institution’s responsible office."
      },
      {
        "ru": "Уточните новое основание и порядок в миграционной службе.",
        "kk": "Көші-қон қызметінен жаңа негіз бен тәртіпті нақтылаңыз.",
        "en": "Confirm any new grounds and process with migration services."
      }
    ],
    "authority": {
      "ru": "Международный или учебный отдел вуза; миграционная служба",
      "kk": "ЖОО-ның халықаралық не оқу бөлімі; көші-қон қызметі",
      "en": "The institution’s international or academic office; migration services"
    },
    "ask": {
      "ru": "Какие сведения и документы нужно изменить после изменения моего обучения?",
      "kk": "Оқуым өзгерген соң қандай дерек пен құжатты өзгерту керек?",
      "en": "Which records and documents need updating following this study change?"
    },
    "url": "https://www.gov.kz/situations/572/1262?lang=ru",
    "sourceIds": [
      "faq-rvp-guide",
      "migration"
    ],
    "coverageTopic": "study"
  },
  {
    "id": "currency-status-check",
    "category": "finance",
    "question": {
      "ru": "Виза, гражданство и валютное резидентство означают одно и то же?",
      "kk": "Виза, азаматтық және валюталық резиденттік бірдей ме?",
      "en": "Are visa status, citizenship and currency residence the same thing?"
    },
    "answer": {
      "ru": "Не переносите вывод из одной процедуры в другую. Для конкретной операции попросите банк назвать применимые критерии и подтверждения. Этот FAQ не определяет ваш валютный или налоговый статус и не рассчитывает обязанности по числу дней.",
      "kk": "Бір рәсімнің қорытындысын екіншісіне көшірмеңіз. Нақты операция үшін банктен өлшемдер мен растауларды атауды сұраңыз. Бұл FAQ валюталық не салық мәртебесін анықтамайды және күн санымен міндет есептемейді.",
      "en": "Do not carry a conclusion from one procedure into another. For a transaction, ask the bank to identify the applicable criteria and evidence. This FAQ does not determine currency or tax status or infer obligations from a day count."
    },
    "steps": [
      {
        "ru": "Назовите банку вид планируемой операции без передачи данных в Migrato.",
        "kk": "Migrato-ға дерек бермей, банкке операция түрін айтыңыз.",
        "en": "Tell the bank the transaction type without sending details to Migrato."
      },
      {
        "ru": "Попросите точную норму и перечень подтверждений.",
        "kk": "Нақты норма мен растаулар тізімін сұраңыз.",
        "en": "Request the exact provision and evidence list."
      },
      {
        "ru": "Налоговый вопрос отдельно направьте в орган государственных доходов.",
        "kk": "Салық мәселесін мемлекеттік кіріс органына бөлек жолдаңыз.",
        "en": "Refer tax questions separately to the state revenue authority."
      }
    ],
    "authority": {
      "ru": "Выбранный банк; Национальный банк; орган государственных доходов",
      "kk": "Таңдалған банк; Ұлттық банк; мемлекеттік кіріс органы",
      "en": "The selected bank; the National Bank; the state revenue authority"
    },
    "ask": {
      "ru": "По какой норме определяется статус для этой операции и чем его подтвердить?",
      "kk": "Осы операция үшін мәртебе қай нормамен анықталады және немен расталады?",
      "en": "Which provision determines status for this transaction, and how is it evidenced?"
    },
    "url": "https://adilet.zan.kz/rus/docs/Z1800000167",
    "sourceIds": [
      "currency",
      "bank",
      "faq-tax"
    ],
    "coverageTopic": "finance"
  }
];
export const faq=[...arrivalFAQ,...migrationFAQ];
