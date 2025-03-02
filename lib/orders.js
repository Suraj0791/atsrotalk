export async function createOrder(orderData) {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to create order")
  }

  return response.json()
}

export async function getOrderById(id) {
  const response = await fetch(`/api/orders/${id}`)

  if (!response.ok) {
    return null
  }

  return response.json()
}

