import db from '../models'
// const cloudinary = require('cloudinary').v2;

const generateOrderCode = () => {
  const timestamp = Date.now().toString(); // Lấy thời gian hiện tại dưới dạng chuỗi
  const randomDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // Sinh số ngẫu nhiên và chuyển thành chuỗi 3 chữ số
  const orderCode = `${timestamp}${randomDigits}`; // Kết hợp thời gian và số ngẫu nhiên để tạo mã đơn hàng
  return orderCode;
};


export const createOrder = async (orderData) => {
  const t = await db.sequelize.transaction(); // Bắt đầu một transaction

  try {
    const { userId, nameReceive, address, phone, productList } = orderData;

    // Create the order
    const order = await db.Order.create(
      {
        userId,
        orderCode: generateOrderCode(),
        nameReceive,
        address,
        phone,
        status: 'pending', // Set the initial status of the order
      },
      { transaction: t } // Thêm transaction cho create order
      );
      
      // Create the order items
      const orderItems = [];
      for (const product of productList) {
      const orderItem = await db.OrderItem.create(
        {
          orderId: order.id,
          ...product
        },
        { transaction: t } // Thêm transaction cho create order item
      );
      orderItems.push(orderItem);
    }

    await t.commit(); // Commit transaction nếu tất cả các hoạt động thành công
    return true;
  } catch (error) {
    await t.rollback(); // Rollback transaction nếu có lỗi
    return {
      err: 1,
      mes: error.message,
    };
  }
};


export const getAll = async () => {
  try {
    const orders = await db.Order.findAll({
      include: [
        {
          model: db.OrderItem,
        },
      ],}
    );
    if (orders)  return {
        err: 0,
        mes: "Got all orders",
        data: orders
      };
    return {
      err: 0,
      mes: "Don't findout any order",
    };
    
  } catch (error) {
    return {
      err: 1,
      mes: 'Failed to retrieve orders',
      error: error.message
    }
  }
};

export const addToOrder = async (userId, dataToAdd) => {
  try {
      const newData = await db.Order.create({...dataToAdd, userId: userId});

      return {
        err: 0,
        mes: 'Updated!',
      };
  } catch (error) {
    return {
      err: 1,
      mes: 'Failed in retrieving order',
      error: error.message
    };
  }
};

export const updateOrder = async (orderId, dataUpdate) => {
  try {

      let checker=["completed","pending","printing"]
      console.log(checker)
      if (!(checker.includes(dataUpdate.status)))
      return {err:1, mes:`Status must be "completed", "pending" or "printing"`};
      const updater = await db.Order.findByPk(orderId);
      if (!updater) {
        return {
          err: 1,
          mes: 'Order not found',
        };
      }
      
      await updater.update(dataUpdate);
      return {
        err: 0,
        mes: 'Updated',
      };
  } catch (error) {
    return {
      err: 1,
      mes: 'Failed in retrieving order',
      error: error.message
    };
  }
};

export const deleteItem = async (req,res) => {
  try {
    const item = await db.Order.findByPk(req.orderId);

    if (!item) {
      return {
        err: 1,
        mes: 'Order not found'
      };
    }

    console.log(item);
    if (item.dataValues.userId==req.userId) {
      await item.destroy();
    }
    else{
      return {
        err: 1,
        mes: 'You are not allowed to delete this Item'
      }
    }

    return {
      err: 0,
      mes: 'Item deleted successfully'
    };
  } catch (error) {
    return {
      err: 2,
      msg: 'Failed retrieve data',
      error: error.message
    };
  }
};

export const updateItem = async(orderId,updatedData) => {
  try {
    await db.Order.update(updatedData, {where: {orderId: orderId}});

    return {
      err: 0,
      mes: 'Order updated successfully',
    };
  } catch (error) {
    return {
      err: 1,
      mes: 'Failed to update product',
      error: error.message
    };
  }
  
}