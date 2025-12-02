import type { Request, Response } from "express";
import sharp from "sharp";
import { createTextSVG, wrapText } from "./text.js";
import { normalizeHexColor, normalizeColor } from "./utils.js";

export function setupThumbnailRoute(router: any) {
    router.get("/", (req: Request, res: Response) => {
        let width = (req.query.width as string) ?? "1280";
        let height = (req.query.height as string) ?? "720";
        let bgColorInput = (req.query.bg_color as string) ?? "#00001A";
        let textContent = (req.query.text as string) ?? "Example Text";
        let textColor = (req.query.text_color as string) ?? "white";
        let fontSize = parseInt((req.query.font_size as string) ?? "100");
        
        const imgWidth = parseInt(width);
        const imgHeight = parseInt(height);
        
        const textMaxWidth = imgWidth - 100; 
        const textX = 50;
        
        try {
            let bgColor = normalizeHexColor(bgColorInput);
            let textColorNormalized = normalizeColor(textColor);
            
            const lines = wrapText(textContent, textMaxWidth, fontSize);
            const lineHeight = fontSize * 1.2;
            const svgHeight = lines.length * lineHeight + fontSize;
            
            const textY = Math.floor((imgHeight - svgHeight) / 2);
            
            const textSVG = createTextSVG(textContent, textMaxWidth, fontSize, textColorNormalized);

            // TODO: make the icon changeable
            const svgBlogIcon = '<svg fill="#ffffff" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.52 491.52" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <polygon points="204.8,12.001 204.8,122.88 315.679,122.88 "></polygon> <path d="M163.84,143.36V0H20.48C9.175,0,0,9.175,0,20.48v450.56c0,11.305,9.175,20.48,20.48,20.48H307.2 c11.305,0,20.48-9.175,20.48-20.48v-307.2H184.32C173.015,163.84,163.84,154.665,163.84,143.36z M225.28,409.6H81.92 c-11.305,0-20.48-9.175-20.48-20.48c0-11.305,9.175-20.48,20.48-20.48h143.36c11.305,0,20.48,9.175,20.48,20.48 C245.76,400.425,236.585,409.6,225.28,409.6z M225.28,327.68H81.92c-11.305,0-20.48-9.175-20.48-20.48 c0-11.305,9.175-20.48,20.48-20.48h143.36c11.305,0,20.48,9.175,20.48,20.48C245.76,318.505,236.585,327.68,225.28,327.68z M245.76,225.28c0,11.305-9.175,20.48-20.48,20.48H81.92c-11.305,0-20.48-9.175-20.48-20.48c0-11.305,9.175-20.48,20.48-20.48 h143.36C236.585,204.8,245.76,213.975,245.76,225.28z"></path> <path d="M368.64,409.6c0,4.035,1.208,8.008,3.441,11.366l40.96,61.44c3.809,5.693,10.199,9.114,17.039,9.114 c6.84,0,13.23-3.42,17.039-9.114l40.96-61.44c2.232-3.359,3.441-7.332,3.441-11.366V143.36H368.64V409.6z"></path> <path d="M430.08,0c-33.874,0-61.44,27.566-61.44,61.44v40.96h122.88V61.44C491.52,27.566,463.954,0,430.08,0z"></path> </g> </g> </g> </g></svg>';
            const svgTextBuffer = Buffer.from(textSVG);
            const svgBlogIconBuffer = Buffer.from(svgBlogIcon);
            sharp({
              create: {
                width: imgWidth,
                height: imgHeight,
                channels: 3,
                background: bgColor,
              }
            })
            .composite([{ input: svgTextBuffer, top: textY, left: textX }, { input: svgBlogIconBuffer, top: 450, left: 1000 }]) // TODO: make blog icon position dynamic
            .png()
            .toBuffer()
            .then((buffer) => {
              res.setHeader("Content-Type", "image/png");
              res.send(buffer);
            })
            .catch((err) => {
              res.status(500).send("Error generating thumbnail");
            });
        } catch (err) {
            res.status(400).send(err instanceof Error ? err.message : "Invalid hex color");
        }
    });
}

