export async function verifyAdminKey(key) {
  try {
    const response = await fetch("/api/admin/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key }),
    })

    const data = await response.json()
    return data.isValid
  } catch (error) {
    console.error("Error verifying admin key:", error)
    return false
  }
}

export async function fetchAdminProducts() {
  const adminKey = localStorage.getItem("adminKey")

  if (!adminKey) {
    throw new Error("Admin key not found")
  }

  const response = await fetch(`/api/products`, {
    headers: {
      "X-Admin-Key": adminKey,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  const { data } = await response.json()
  return data
}

export async function createProduct(productData) {
  const adminKey = localStorage.getItem("adminKey")

  if (!adminKey) {
    throw new Error("Admin key not found")
  }

  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Key": adminKey,
    },
    body: JSON.stringify(productData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to create product")
  }

  return response.json()
}

export async function updateProduct(id, productData) {
  const adminKey = localStorage.getItem("adminKey")

  if (!adminKey) {
    throw new Error("Admin key not found")
  }

  const response = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Key": adminKey,
    },
    body: JSON.stringify(productData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to update product")
  }

  return response.json()
}

export async function deleteProduct(id) {
  const adminKey = localStorage.getItem("adminKey")

  if (!adminKey) {
    throw new Error("Admin key not found")
  }

  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
    headers: {
      "X-Admin-Key": adminKey,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to delete product")
  }

  return response.json()
}

export async function uploadImage(file) {
  const adminKey = localStorage.getItem("adminKey")

  if (!adminKey) {
    throw new Error("Admin key not found")
  }

  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "X-Admin-Key": adminKey,
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to upload image")
  }

  const data = await response.json()
  return data.url
}
