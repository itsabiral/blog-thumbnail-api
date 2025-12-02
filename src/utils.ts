export function normalizeHexColor(hex: string): string {
    // Remove # if present
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
        throw new Error('Invalid hex color format');
    }
    
    return `#${hex}`;
}

export function normalizeColor(color: string): string {
    const namedColors: Record<string, string> = {
        'white': 'white',
        'black': 'black',
        'red': 'red',
        'green': 'green',
        'blue': 'blue',
        'yellow': 'yellow',
        'cyan': 'cyan',
        'magenta': 'magenta',
        'gray': 'gray',
        'grey': 'grey',
    };
    
    const lowerColor = color.toLowerCase();
    if (namedColors[lowerColor]) {
        return namedColors[lowerColor];
    }
    
    try {
        return normalizeHexColor(color);
    } catch {
        return 'white'; 
    }
}

