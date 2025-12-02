export function wrapText(text: string, maxWidth: number, fontSize: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    // Approximate character width 
    const charWidth = fontSize * 0.6;
    const maxCharsPerLine = Math.floor(maxWidth / charWidth);

    for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        
        if (testLine.length <= maxCharsPerLine) {
            currentLine = testLine;
        } else {
            if (currentLine) {
                lines.push(currentLine);
            }
            if (word.length > maxCharsPerLine) {
                lines.push(word.substring(0, maxCharsPerLine - 3) + '...');
                currentLine = '';
            } else {
                currentLine = word;
            }
        }
    }
    
    if (currentLine) {
        lines.push(currentLine);
    }
    
    return lines;
}

export function escapeXml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export function createTextSVG(text: string, maxWidth: number, fontSize: number, fillColor: string = 'white'): string {
    const lines = wrapText(text, maxWidth, fontSize);
    const lineHeight = fontSize * 1.2;
    const yStart = fontSize;
    
    const textElements = lines.map((line, index) => {
        const y = yStart + (index * lineHeight);
        return `<text x="0" y="${y}" font-size="${fontSize}" fill="${fillColor}" stroke="none">${escapeXml(line)}</text>`;
    }).join('\n    ');
    
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${maxWidth}" height="${lines.length * lineHeight + fontSize}">
    ${textElements}
</svg>`;
}

