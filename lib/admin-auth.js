export function checkAdminAuth() {
  const adminKey = localStorage.getItem("adminKey")

  if (!adminKey) {
    return Promise.resolve(false)
  }

  return fetch("/api/admin/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: adminKey }),
  })
    .then((response) => response.json())
    .then((data) => data.isValid)
    .catch(() => false)
}

export async function isAdminRequest(request) {
  const adminKey = request.headers.get("X-Admin-Key")

  if (!adminKey) {
    return false
  }

  return adminKey === process.env.ADMIN_API_KEY
}

