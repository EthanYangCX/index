import { Link as MuiLink, Typography } from "@mui/material";
import * as OpenCC from "opencc-js";
import "purecss/build/pure.css";
import * as React from "react";
import { getFallbackLanguage, getLocaleText, LangCode, languageCodeToLocale } from "../data/I18n";
import { Lang2FNID, TitleTranslationsResp } from "../pages/BlogList";
import "../styles.scss";

export default function BlogListItem(props: {
    id: string;
    blogs: Map<string, Lang2FNID>;
    lang: LangCode;
    titleTranslations: TitleTranslationsResp;
}) {
    const { id, blogs, lang, titleTranslations } = props;
    // Blog List is still Loading
    if (!blogs.has(id)) return <Typography variant="caption">{"Loading"}</Typography>;

    const [date, titleId] = [id.slice(0, 9), id.slice(9)];

    // Blog available in the current page language
    if (blogs.get(id)![lang]) {
        return (
            <div>
                <MuiLink key={id} href={"/blog/" + blogs.get(id)![lang]!.fileName}>
                    {blogs.get(id)![lang]!.title}
                </MuiLink>
                <Typography variant="caption">{" (" + date + ")"}</Typography>
            </div>
        );
    }

    // Simple Chinese - Traditional Chinese Conversion
    if ((lang == "zh-Hant" && blogs.get(id)!["zh-Hans"]) || (lang == "zh-Hans" && blogs.get(id)!["zh-Hant"])) {
        const pageLang = lang;
        const blogLang = lang == "zh-Hant" ? "zh-Hans" : "zh-Hant";
        const converter =
            lang == "zh-Hant" ? OpenCC.Converter({ from: "cn", to: "hk" }) : OpenCC.Converter({ from: "hk", to: "cn" });
        return (
            <div>
                <MuiLink key={id} href={"/blog/" + blogs.get(id)![blogLang]!.fileName}>
                    {converter(blogs.get(id)![blogLang]!.title)}
                </MuiLink>
                <Typography variant="caption">{" (" + date + ")"}</Typography>
            </div>
        );
    }

    const fallbackLanguage = getFallbackLanguage(blogs.get(id)!, lang);
    const targetLanguageLocale = languageCodeToLocale(fallbackLanguage, lang);
    const targetFile = blogs.get(id)![fallbackLanguage];

    // Title Translation Available
    if (titleTranslations && lang in titleTranslations[titleId]!) {
        return (
            <div>
                <MuiLink key={id} href={"/blog/" + targetFile?.fileName}>
                    {titleTranslations[titleId]![lang]}
                </MuiLink>
                <Typography variant="caption">
                    {" (" +
                        date +
                        ") " +
                        getLocaleText(
                            {
                                "en":
                                    "(Not in the current language. Original title (in " + targetLanguageLocale + "): ",
                                "zh-Hant": "?????????????????????????????????" + targetLanguageLocale + "??????",
                                "zh-Hans": "?????????????????????????????????" + targetLanguageLocale + "??????",
                                "tto-bro": "(bFe DRZ98aH Zei2ZeiH. ZvoH beaFD8ae (" + targetLanguageLocale + "): ",
                                "tto": "(Ve SRHM aHaH. beaFDae aH eSSa (" + targetLanguageLocale + "): ",
                                "ja": "??????????????????????????????????????????????????????" + targetLanguageLocale + "?????????",
                                "de":
                                    "(Nicht auf die aktuelle Sprache. Der Originaltitel (auf " +
                                    targetLanguageLocale +
                                    "): ",
                            },
                            lang
                        )}
                    {targetFile?.title}
                    {getLocaleText(
                        {
                            "en": ")",
                            "zh-Hant": "???",
                            "zh-Hans": "???",
                            "tto-bro": ")",
                            "tto": ")",
                            "ja": "???",
                            "de": ")",
                        },
                        lang
                    )}
                </Typography>
            </div>
        );
    }

    return (
        <div>
            <MuiLink key={id} href={"/blog/" + targetFile?.fileName}>
                {targetFile?.title}
            </MuiLink>
            <Typography variant="caption">
                {" (" +
                    date +
                    ") " +
                    getLocaleText(
                        {
                            "en": "(Not in the current language)",
                            "zh-Hant": "?????????????????????",
                            "zh-Hans": "?????????????????????",
                            "tto-bro": "(bFe DRZ98aH Zei2ZeiH)",
                            "tto": "(Ve SRHM aHaH)",
                            "ja": "???????????????????????????????????????",
                            "de": "(Nicht auf die aktuelle Sprache)",
                        },
                        lang
                    )}
            </Typography>
        </div>
    );
}
