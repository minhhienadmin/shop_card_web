const { sequelize, models } = require('../models');

// const cloudinary = require('cloudinary').v2;


export const createCart = async (data) => {
  const transaction = await models.sequelize.transaction();
  try {
    const { userId, productList } = data;
    // Create the cart
    const cart = await models.Cart.create(
      {
        userId,
        status: 'pending', // Set the initial status of the cart
      },
      { transaction }
    );
    // Create the cart items
    const cartItems = [];
    for (const product of productList) {
      const cartItem = await models.CartCo.create({...product, cartId: cart.id},{ transaction });
      cartItems.push(cartItem);
    }
    await transaction.commit();
    return true;
    // return { cart, cartItems };
  } catch (error) {
    await transaction.rollback();
    return {
      err: 1,
      mes: error.message,
    };
  }
};

export const getAll = async (userId) => {
  try {
    console.log('Getting all of user: ', userId);
    const carts = await models.Cart.findAll({
      where: {
        userId: userId,
      },
      // include: [{
      //   model: models.CartCo,
      //   attributes: ['name']  
      // }]
    });

    if (carts)
    return {
      err: 0,
      mes: 'Got',
      cartLists: carts
    };
    return {
      err: 0,
      mes: "You don't have any cart",
    };
    
  } catch (error) {
    console.log(error);
  }
};

export const deleteCart = async (cartId) => {
  const transaction = await models.sequelize.transaction();
  try {
    // Xóa tất cả các mục giỏ hàng liên quan đến giỏ hàng
    await models.CartCo.destroy({
      where: {
        cartId: cartId
      },
      transaction
    });

    // Xóa giỏ hàng
    const cart = await models.Cart.findByPk(cartId, { transaction });
    if (!cart) {
      await transaction.rollback();
      return {
        err: 1,
        mes: 'Cart not found',
      };
    }
    console.log("here")
    await cart.destroy({ transaction });
    await transaction.commit();

    return {
      err: 0,
      mes: 'Cart deleted',
    };
  } catch (error) {
    await transaction.rollback();
    return {
      err: 1,
      mes: error.message,
    };
  }
};

export const updateCart = async (cartId, updatedData) => {
  try {
    const cart = await models.Cart.findByPk(cartId);
    if (!cart) {
      return {
        err: 1,
        mes: 'Cart not found',
      };
    }

    // Cập nhật thông tin giỏ hàng
    await cart.update(updatedData);
    return {
      err: 0,
      mes: 'Cart updated',
    };
  } catch (error) {
    return {
      err: 1,
      mes: error.message,
    };
  }
};



export const addItem = async (cartId, itemData) => {
  try {
    const cart = await models.Cart.findByPk(cartId);
    if (!cart) {
      return {
        err: 1,
        mes: 'Cart not found',
      };
    }
    await models.CartCo.create(
      {
        cartId,
        ...itemData,
      },
    );

    return {
      err: 0,
      mes: 'Item added to cart',
    };
  } catch (error) {
    return {
      err: 1,
      mes: error.message,
    };
  }
};

export const getItem = async (itemId) => {
  try {
    const item = await models.CartCo.findByPk(itemId);
    if (!item) {
      return {
        err: 1,
        mes: 'Item not found',
      };
    }

    return {
      err: 0,
      mes: 'Item found',
      item: item.toJSON(),
    };
  } catch (error) {
    return {
      err: 1,
      mes: error.message,
    };
  }
};


export const updateItem = async (itemId, updatedData) => {
  try {
    const item = await models.CartCo.findByPk(itemId);
    if (!item) {
      return {
        err: 1,
        mes: 'Item not found',
      };
    }

    await item.update(updatedData);

    return {
      err: 0,
      mes: 'Item updated',
    };
  } catch (error) {
    return {
      err: 1,
      mes: error.message,
    };
  }
};


export const deleteItem = async (itemId) => {
  try {
    const item = await models.CartCo.findByPk(itemId);
    if (!item) {
      return {
        err: 1,
        mes: 'Item not found',
      };
    }

    await item.destroy();

    return {
      err: 0,
      mes: 'Item deleted',
    };
  } catch (error) {
    return {
      err: 1,
      mes: error.message,
    };
  }
};
