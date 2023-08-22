import db from '../models'
// const cloudinary = require('cloudinary').v2;


export const createCart = async (data) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { userId, productList } = data;
    // Create the cart
    const cart = await db.Cart.create(
      {
        userId,
        status: 'pending', // Set the initial status of the cart
      },
      { transaction }
    );
    // Create the cart items
    const cartItems = [];
    for (const product of productList) {
      const cartItem = await db.CartItem.create({...product, cartId: cart.id},{ transaction });
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
    console.log('Getting all: ', userId);
    const carts = await db.Cart.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: db.CartItem,
          include: {
            model: db.Product,
          },
        },
      ],
    });

    const result = carts.map((cart) => {
      const cartData = {
        cartId: cart.id,
        productList: cart.CartItems.map((cartItem) => {
          return {
            cartItemId: cartItem.id,
            name: cartItem.Product.name,
            productId: cartItem.Product.id,
            material: cartItem.material,
            size: cartItem.size,
            sides: cartItem.sides,
            effect: cartItem.effect,
            quantity: cartItem.quantity,
            isDesigned: cartItem.isDesigned,
            img_src: cartItem.img_src,
          };
        }),
      };
      return cartData;
    });

    if (result.length!==0) return {
      err: 0,
      mes: 'Got',
      cartLists: result
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
  const transaction = await db.sequelize.transaction();
  try {
    // Xóa tất cả các mục giỏ hàng liên quan đến giỏ hàng
    await db.CartItem.destroy({
      where: {
        cartId: cartId
      },
      transaction
    });

    // Xóa giỏ hàng
    const cart = await db.Cart.findByPk(cartId, { transaction });
    if (!cart) {
      await transaction.rollback();
      return {
        err: 1,
        mes: 'Cart not found',
      };
    }

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
    const cart = await db.Cart.findByPk(cartId);
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
    const cart = await db.Cart.findByPk(cartId);
    if (!cart) {
      return {
        err: 1,
        mes: 'Cart not found',
      };
    }
    await db.CartItem.create(
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
    const item = await db.CartItem.findByPk(itemId);
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
    const item = await db.CartItem.findByPk(itemId);
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
    const item = await db.CartItem.findByPk(itemId);
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
