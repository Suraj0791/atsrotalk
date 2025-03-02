const OrderDetails = ({ order }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
      <div className="space-y-4">
        <p>
          <strong>Order ID:</strong> {order.id}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Total Amount:</strong> ₹{order.total_amount.toFixed(2)}
        </p>

        <div>
          <h3 className="text-xl font-semibold mb-2">Items</h3>
          <ul className="list-disc list-inside">
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} - Quantity: {item.quantity} - ₹{item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Shipping Details</h3>
          <p>{order.shipping_details.name}</p>
          <p>{order.shipping_details.address}</p>
          <p>
            {order.shipping_details.city}, {order.shipping_details.state} {order.shipping_details.pincode}
          </p>
          <p>{order.shipping_details.phone}</p>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails

