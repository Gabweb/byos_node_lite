import { spawn } from "node:child_process";

export async function to2BitPng(
    inputPng: Buffer
): Promise<Buffer> {
    const dither = true
    const args = [
        // build the 4-level grayscale map in memory
        "-size", "4x1", "xc:#000000", "xc:#555555", "xc:#aaaaaa", "xc:#ffffff", "+append", "-type", "Palette",
        "-write", "mpr:map", "+delete",

        // read the Puppeteer image from stdin
        "-",

        // make sure we're grayscale and opaque before remapping
        "-background", "white", "-alpha", "remove", "-alpha", "off",
        "-colorspace", "Gray",

        // dither + remap to 4 levels
        "-dither", dither ? "FloydSteinberg" : "None",
        "-remap", "mpr:map",

        // force 2-bit grayscale PNG
        "-define", "png:bit-depth=2",
        "-define", "png:color-type=0",
        "-strip",
        "png:-"
    ];

    return new Promise((resolve, reject) => {
        const bin = "magick"; // use "convert" if you're on IM6
        const proc = spawn(bin, args);
        const out: Buffer[] = [];
        let err = "";
        proc.stdout.on("data", d => out.push(d as Buffer));
        proc.stderr.on("data", d => (err += d.toString()));
        proc.on("close", code =>
            code === 0 ? resolve(Buffer.concat(out)) : reject(new Error(err || `ImageMagick exited ${code}`))
        );
        proc.on("error", reject);
        proc.stdin.end(inputPng);
    });
}
