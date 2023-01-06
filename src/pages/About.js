import "purecss/build/pure.css";
import React, { useState, useEffect } from "react";
import "../styles.scss";
import { 
  Container
} from '@mui/material';
import MuiMarkdown from 'mui-markdown';

export default function About({ lang }) {

    const [markdown, setMarkdown] = React.useState('Loading');
    const fileName = {
        'en': '2021-0915.about-me.About_Me.en.life.md',
        'zh-Hans': '2021-0915.about-me.关于我.zh-Hans.life.md',
        'zh-Hant': '2021-0915.about-me.關於我.zh-Hant.life.md',
        'ja': '2021-0915.about-me.私について.ja.life.md',
        'de': '2021-0915.about-me.Über_Mich.de.life.md',
        'tto': '2021-0915.about-me.aCmqSqv.tto.life.md',
        'tto-bro': '2021-0915.about-me.YQFRHOei_Z72.tto-bro.life.md'
    };

    const fetchAbout = async () => {
        const text = await (await fetch('https://raw.githubusercontent.com/yangchnx/blog/main/' + fileName[lang])).text();
        setMarkdown(text);
        console.log("Markdown got")
      }
    useEffect(() => {
        fetchAbout();
    }, [lang]);
    return (
        <div>
          
          <Container maxWidth="md">
            <MuiMarkdown overrides={{
              h6: { props: { style: { scrollMarginTop: "50px" }, }, },
              h5: { props: { style: { scrollMarginTop: "50px" }, }, },
              h4: { props: { style: { scrollMarginTop: "50px" }, }, },
              h3: {
                props: {
                  style: { fontSize: 38 },
                },
              },
              h2: {
                props: {
                  style: { fontSize: 46 },
                },
              },
              h1: {
                props: {
                  style: { fontSize: 56, scrollMarginTop: "50px" },
                },
              }
            }}>{markdown}</MuiMarkdown>
          </Container>
        </div>
      );
};