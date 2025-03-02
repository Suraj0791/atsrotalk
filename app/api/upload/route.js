import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { isAdminRequest } from "@/lib/admin-auth"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

export async function POST(request) {
  // Check admin authentication
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage.from("product-images").upload(fileName, buffer, {
      contentType: file.type,
      cacheControl: "3600",
    })

    if (error) {
      console.error("Error uploading file:", error)
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(fileName)

    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error("Error processing upload:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

