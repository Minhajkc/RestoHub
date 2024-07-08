import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    menuItems: [
      { id: '1', name: 'Burger', price: 8.99 },
      { id: '2', name: 'Fries', price: 3.99 },
      { id: '3', name: 'Soda', price: 1.99 },
    ],
    orders: [],
    recentOrders:[]
  },
  reducers: {
    addMenuItem: (state, action) => {
      state.menuItems.push(action.payload);
    },
    removeMenuItem: (state, action) => {
      state.menuItems = state.menuItems.filter(item => item.id !== action.payload);
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(order => order.id === orderId);
      if (order) {
        order.status = status;
      }
    },
    updateOrderItem: (state, action) => {
      const { orderId, itemId, quantity } = action.payload;
      const order = state.orders.find(order => order.id === orderId);
      if (order) {
        const item = order.items.find(item => item.id === itemId);
        if (item) {
          item.quantity = quantity;
        } else if (quantity > 0) {
          const menuItem = state.menuItems.find(item => item.id === itemId);
          if (menuItem) {
            order.items.push({ ...menuItem, quantity });
          }
        }
      
        order.items = order.items.filter(item => item.quantity > 0);
      }
    },
    removeOrder: (state, action) => {
        const order = state.orders.find(order => order.id === action.payload);
        if (order) {
          state.recentOrders.push(order);
          state.orders = state.orders.filter(order => order.id !== action.payload);
          console.log(state.recentOrders,'rerere');
        }
      },
  },
});

export const {
  addMenuItem,
  removeMenuItem,
  addOrder,
  updateOrderStatus,
  updateOrderItem,
  removeOrder
} = orderSlice.actions;

export default orderSlice.reducer;