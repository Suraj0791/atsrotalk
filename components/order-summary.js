export default function OrderSummary({ cart }) {
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 1000 ? 0 : 100
  const total = subtotal + shipping

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>₹{subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping</p>
          <p>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</p>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <p>Total</p>
          <p>₹{total.toFixed(2)}</p>
        </div>
      </div>

      {shipping === 0 && (
        <div className="mt-4 bg-green-50 text-green-700 p-2 rounded text-sm">
          Free shipping applied on orders over ₹1000!
        </div>
      )}
    </div>
  )
}

