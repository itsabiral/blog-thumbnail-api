Built this small project for personal blog posts. It can also be used as a social media image for blog posts.

# Blog Thumbnail Generator

API for generating dynamic blog thumbnails with customizable text and colors. Built with TypeScript, Express, and Sharp.

## Features

- Customizable background and text colors (hex or named colors)
- Automatic text wrapping for long content
- Configurable image dimensions
- Adjustable font sizes
- SVG-based text rendering
- Fast image generation with Sharp

## Installation

```bash
# Clone the repository
git clone https://github.com/itsabiral/blog-thumbnail-api.git

# Navigate to the project directory
cd blog-thumbnail-api

# Install dependencies
npm install

# Start development server
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoint

### `GET /`

Generates a thumbnail image with customizable text and styling.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `width` | `string` | No | `"1280"` | Image width in pixels |
| `height` | `string` | No | `"720"` | Image height in pixels |
| `bg_color` | `string` | No | `"#00001A"` | Background color (hex format: `#RRGGBB` or `#RGB`) |
| `text` | `string` | Yes | `"Example Text"` | Text content to display (automatically wraps) |
| `text_color` | `string` | No | `"white"` | Text color (hex format or named color: `white`, `black`, `red`, etc.) |
| `font_size` | `string` | No | `"100"` | Font size in pixels |

#### Response

- **Content-Type**: `image/png`
- **Status Code**: `200` on success

## Usage Examples

### Basic Example

```
/?text=Hello World
```

### Custom Dimensions and Colors

```
/?width=1920&height=1080&bg_color=#FF5733&text_color=white&text=My Blog Post Title
```

### Short Hex Colors

```
/?bg_color=f00&text_color=fff&text=Short Hex Colors
```

### Named Colors

```
/?bg_color=#1a1a2e&text_color=cyan&text=Using Named Colors
```

### Long Text (Auto-wrapping)

```
/?text=This is a very long blog post title that will automatically wrap to multiple lines&font_size=80
```

## Color Formats

### Hex Colors
- Full format: `#RRGGBB` (e.g., `#FF5733`, `#00001A`)
- Short format: `#RGB` (e.g., `#f00` → `#ff0000`)
- With or without `#` prefix

### Named Colors
Supported named colors: `white`, `black`, `red`, `green`, `blue`, `yellow`, `cyan`, `magenta`, `gray`, `grey`

## Limitations

- **Font Family**: Font Family isn't dynamic right now (in development)
- **Icon Positioning**: Icon position is currently hardcoded (feature in development)
- **No Image Caching**: Each request generates a new image (no caching mechanism)
and more..

If these limitations aren't updated yet, they can be easily modified in the code by changing the corresponding values.


## License

MIT License

