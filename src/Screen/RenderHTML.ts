import puppeteer, { Page } from "puppeteer";
import fs from 'fs/promises';
import { ASSETS_FOLDER, IS_TEST_ENV } from "Config.js";

export const BASE_URL_CHROME = 'http://localhost';


let page: Page;

const args = [
    '--no-sandbox',
    // '--single-process',
    // '--no-zygote',
    '--disable-web-security',
    '--disable-setuid-sandbox',
    '--disable-infobars',
    '--no-first-run',
    `--window-size=800,480`,
    '--window-position=0,0',
    '--ignore-certificate-errors',
    '--ignore-certificate-errors-skip-list',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--hide-scrollbars',
    '--disable-notifications',
    '--disable-extensions',
    '--force-color-profile=srgb',
    '--mute-audio',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-component-extensions-with-background-pages',
    '--disable-features=TranslateUI,BlinkGenPropertyTrees,IsolateOrigins,site-per-process',
    '--disable-ipc-flooding-protection',
    '--disable-renderer-backgrounding',
    '--enable-features=NetworkService,NetworkServiceInProcess'
]

export async function initPuppeteer() {
    if (!IS_TEST_ENV) {
        console.log('start of Puppeteer init');
    }
    const browser = await puppeteer.launch({
        devtools: false,
        headless: true,
        protocolTimeout: 5000,
        timeout: 5000,
        args: args
    }
    );
    page = (await browser.pages())[0];
    await page.setViewport({
        width: 800,
        height: 480,
        deviceScaleFactor: 1,
        isMobile: false
    });
    //await page.setViewport({ width: 800, height: 480 });
    await page.setRequestInterception(true);
    page.on('pageerror', ({ message }) => console.error('error:', message));
    page.on('requestfailed', request => console.log(`Failed: ${request.failure()?.errorText} ${request.url()}`));
    page.on('console', message => console.log('console: ', message.text()));
    page.on('request', async (interceptedRequest) => {
        if (interceptedRequest.isInterceptResolutionHandled()) {
            return;
        }
        const url = interceptedRequest.url();
        if (!url.startsWith(BASE_URL_CHROME + '/fonts/')) {
            await interceptedRequest.continue();
            return;
        }
        console.log(`Intercepting request for ${url}`);
        try {
            const filePathPart = url.replace(BASE_URL_CHROME + '/fonts/', '/')
            const file = await fs.readFile(ASSETS_FOLDER + filePathPart);
            await interceptedRequest.respond({ body: file });
        } catch (error) {
            await interceptedRequest.abort();
        }
    });
    if (!IS_TEST_ENV) {
        console.log('end of Puppeteer init');
    }
}

export async function renderToImage(html: string) {
    await page.setContent(html, { waitUntil: "load" });
    const image: Uint8Array = await page.screenshot();
    return Buffer.from(image);
}