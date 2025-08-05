import { prepareData, TemplateDataType } from "Data/PrepareData.js";
import { to2BitPng } from "./PNGto1BIT.js";
import { TEMPLATE_FOLDER } from "Config.js";
import App from "Template/JSX/App.js";
import { renderToImage } from "./RenderHTML.js";
import { buildJSX } from "./BuildJSX.js";
import crypto from "crypto";
import { readFileSync } from "node:fs";

const headerHtml = readFileSync(TEMPLATE_FOLDER + '/Header.html', 'utf8');

export async function buildScreen() {
    const templateData = await prepareData();
    const html = await buildJSX(App, templateData);
    const image = await renderToImage(headerHtml + html);
    return to2BitPng(image);
}

export async function getScreenHash() {
    const image = await buildScreen();
    return crypto.createHash('sha256').update(image).digest('hex');
}

export async function checkImageUrl(url: string): Promise<boolean> {
    let response;
    try {
        response = await fetch(url);
    } catch (error: any) {
        console.error(`Failed to check image ${url} - ${error.message}`);
        return false;
    }
    if (!response.ok) {
        console.error(`Failed to check image ${url} - got ${response.status} code`);
        return false;
    }
    const data = await response.text();
    if (data.length < 1000) {
        console.error(`Failed to check image ${url} - no content`);
        return false;
    }
    return true;
}
