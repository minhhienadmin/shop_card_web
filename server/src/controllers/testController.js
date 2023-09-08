import {interalServerError} from "../middlewares/handle_errors"

export const getAll = async (req, res) => {
  try {

      // const userId  = req.query.userId
      // console.log(req.query)
      console.log(testT.Picture.findAll())
      const response = await testT.Picture.findAll()

     
      return res.status(200).json(response)

  } catch (error) {
      return interalServerError(res)
  }
}


export const create = async (req, res) => {
  const UP=testT.Picture.create({title: "ok"})
  res.status(200).json({code: 0, data: UP})
}