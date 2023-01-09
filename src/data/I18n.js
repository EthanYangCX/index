export const fallbackLanguages = [
    "en",
    "zh-Hans",
    "zh-Hant",
    "ja",
    "de",
    "tto",
    "tto-bro",
];

export const getFallbackLanguage = (i18nText, pageLang) => {
    if (pageLang in i18nText) {
        return pageLang;
    } else {
        for (let lang of fallbackLanguages) {
            if (lang in i18nText) return lang;
        }
    }
    return 'en';
}

export const getLocaleText = (i18nText, pageLang) => {
    return i18nText[getFallbackLanguage(i18nText, pageLang)];
};

const langNames = {
    "en": {
        "en": "English",
        "zh-Hans": "英语",
        "zh-Hant": "英語",
        "ja": "英語",
        "de": "Englisch",
        "tto": "aZYSeW",
        "tto-bro": "OQeLZZei2",
    },
    "zh-Hans": {
        "en": "Simplified Chinese",
        "zh-Hans": "简体中文",
        "zh-Hant": "簡體中文",
        "ja": "簡体字中国語",
        "de": "Vereinfachtes Chinesisch",
        "tto": "YQaHmaeDeFZVFH",
        "tto-bro": "YQaH2mae2 DleFZVFH",
    },
    "zh-Hant": {
        "en": "Traditional Chinese",
        "zh-Hans": "繁体中文",
        "zh-Hant": "繁體中文",
        "ja": "繁体字中国語",
        "de": "Traditionelles Chinesisch",
        "tto": "bvoHmaeDeFZVFH",
        "tto-bro": "b8voHmae2 DleFZVFH",
    },
    "ja": {
        "en": "Japanese",
        "zh-Hans": "日语",
        "zh-Hant": "日語",
        "ja": "日本語",
        "de": "Japanisch",
        "tto": "HeXoZYo",
        "tto-bro": "HMemZei2",
    },
    "de": {
        "en": "German",
        "zh-Hans": "德语",
        "zh-Hant": "德語",
        "ja": "ドイツ語",
        "de": "Deutsch",
        "tto": "D7vJ",
        "tto-bro": "DiAZei2",
    },
    "tto": {
        "en": "Ttomni",
        "zh-Hans": "丌通语",
        "zh-Hant": "丌通語",
        "ja": "丌通語",
        "de": "Ttomni",
        "tto": "mim",
        "tto-bro": "Y8dmFZZei2",
    },
    "tto-bro": {
        "en": "Ttomni Brongduk",
        "zh-Hans": "丌棒语",
        "zh-Hant": "丌棒語",
        "ja": "丌棒語",
        "de": "Ttomni Brongduk",
        "tto": "bQ7ZDFA",
        "tto-bro": "Y8db8Q7Z2Zei2",
    },
};

export const languageCodeToLocale = (langCode, pageLang) => {
    return langNames[langCode][pageLang];
};
