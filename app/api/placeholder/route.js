import { NextResponse } from "next/server"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const width = searchParams.get("width") || "400"
  const height = searchParams.get("height") || "400"

  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f3f4f6"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="16" fill="#6b7280">
      ${width}x${height}
    </text>
  </svg>`

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}

