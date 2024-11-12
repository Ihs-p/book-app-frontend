import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/feature/orders/ordersApi';
import { useAuth } from '../../context/authContext';

const OrderPage = () => {
  const { currentUser } = useAuth();
  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders</div>;

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <div>No orders found</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((item, index) => (
            <div key={index} className="mb-4 border-b">
                <p className='p-1 bg-secondary text-white w-10 rounded text-center'>#{index+1}</p>
              <h2 className="mt-10 font-bold">OrderId: {item?._id}</h2>
              <p className="text-gray-600">Name: {item.name}</p>
              <p className="text-gray-600">Email: {item.email}</p>
              <p className="text-gray-600">Phone: {item.phone}</p>
              <p className="text-gray-600">Total Price: ${item.totalPrice}</p>
              <h3 className="font-semibold">Address:</h3>
              <p>
                {item.address.city}, {item.address.state}, {item.address.country}, {item.address.zipcode}
              </p>
              <h3 className="font-semibold">Products Id:</h3>
              <ul>
                {item?.productIds?.map((productId, index) => (
                  <li key={index}>{productId}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
