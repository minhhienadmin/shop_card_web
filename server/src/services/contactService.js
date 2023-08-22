import db from '../models'
// const cloudinary = require('cloudinary').v2;


export const getAll = async () => {
  try {
    const response = await db.Contact.findAll();

    return {
      err: 0,
      mes: 'Got',
      contactItems: response
    };
  } catch (error) {
    return res.status(500).json({
      err: 1,
      mes: 'Failed in retrieving',
      error: error.message
    });
  }
};


export const addToContact = async (userId, dataToAdd) => {
  try {
    // Retrieve the user's contact
      // Contact exists, add data to the contact
      const newData = await db.Contact.create({...dataToAdd, userId: userId});

      return {
        err: 0,
        mes: 'Created',
      };
  } catch (error) {
    return {
      err: 1,
      mes: 'Failed to add data to contact',
      error: error.message
    };
  }
};


export const deleteItem = async (req,res) => {
  try {
    const item = await db.Contact.findByPk(req.contactId);

    if (!item) {
      return {
        err: 1,
        mes: 'Contact not found'
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
      mes: 'Failed retrieve data',
      error: error.message
    };
  }
};

export const updateItem = async(id,updatedData) => {
  try {
    await db.Contact.update(updatedData, {where: {id: id}});

    return {
      err: 0,
      mes: 'Contact updated successfully',
    };
  } catch (error) {
    return {
      err: 1,
      mes: 'Failed to update product',
      error: error.message
    };
  }
  
}