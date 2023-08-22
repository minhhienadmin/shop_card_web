import db from '../models'
import { interalServerError, badRequest } from "../middlewares/handle_errors"
// import { email, password } from "../helpers/joi_schema"
// import joi from 'joi'



export async function displayModelFields() {
    const tableDefinition = await db.User.describe();
    const fields = Object.keys(tableDefinition);
  
    console.log('Model Fields:');
    fields.forEach((field) => {
      console.log(field);
    });
  }
  
  