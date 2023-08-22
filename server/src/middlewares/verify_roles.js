import { notAuth } from "./handle_errors"

export const isAdmin = (req, res, next) => {
    const { name } = req.user
    if (name !== 'admin') return notAuth('Require role Admin', res)
    next()
}
