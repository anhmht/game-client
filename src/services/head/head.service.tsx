import React from 'react'
import Head from "next/head"

import { StringUtils } from '../../modules';

export interface IHead {
    title?: string,
    thumbnailURL?: string,
    webURL?: string,
    description?: string,
    siteName?: string,
    type?: string,
}

export class HeadService {
    static render(main: IHead = {}): any {
        const defaultHead: any = {
            title: "MemeLotto - Revolutionizing Blockchain Lotteries with Memes",
            thumbnailURL: `${process.env['NEXT_PUBLIC_PUBLIC_URL']}/assets/images/thumbnail.png`,
            webURL: '/',
            description: "MemeLotto - Revolutionizing Blockchain Lotteries with Memes",
            siteName: "MemeLotto - Revolutionizing Blockchain Lotteries with Memes",
            type: "website",
        }

        for (const key in defaultHead) {
            if (defaultHead.hasOwnProperty(key)) {
                const item = defaultHead[key];
                // @ts-ignore
                if (!main[key]) main[key] = item;
            }
        }

        const { title, siteName, type, thumbnailURL } = main;

        // ============================ Convert Values ============================
        const description = StringUtils.removeHtmlTags(main.description || defaultHead.description);

        let webURL = StringUtils.isURL(main.webURL || '') ? main.webURL : `${process.env['NEXT_PUBLIC_PUBLIC_URL']}${main.webURL}`;
        if (main.webURL === '/') webURL = `${process.env['NEXT_PUBLIC_PUBLIC_URL']}`;

        // ============================ Render ============================
        return (
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={webURL} />

                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:image:url" content={thumbnailURL} />
                <meta property="og:image" content={thumbnailURL} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={webURL} />
                <meta property="og:site_name" content={siteName} />
                <meta property="og:type" content={type} />
            </Head>
        );
    }
}