import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const hashPW = password => bcrypt.hashSync(password, bcrypt.genSaltSync(7))

export const register = (req) => new Promise(async(resolve, reject) => {
    try { 
        
        const response = await db.User.findOrCreate({
            where:  { email:req?.email},
            defaults:{
                password: hashPW(req?.password),
                fullname: req?.name,
                phone: req?.phone,
                avt: req?.avt,
                // email: req?.email
            },
            // attributes: { exclude: ['userId'] },
        });
        
        let token = response[1]? jwt.sign({userId: response[0].id, email: response[0].email, roleId: response[0].roleId},process.env.JWT_SECRET, {expiresIn: 60}) :null
        resolve({
            err: response[1] ? 0 :1,
            mes: response[1] ? 'Register is successful' : 'Email is used already',
            'access_token': token ? `Bearer ${token}` : token
        })
    } catch (error) {
        console.log(error)
        reject(error)
    }
});


export const changeinfo = (data) => new Promise(async(resolve, reject) => {
    try { 

        const user = await db.User.findOne({
            where:  { email:data?.email}
        });
        if (data.password) {
            if (bcrypt.compareSync(data.password, user.password)) return{
                err: 1,
                mes: "Password wrong!"
            };
            data.password=data.newpassword;
        }
        console.log(">>>>>>>data:   ",typeof(user))
        await db.User.update(data, {where: { email:data?.email}})
        resolve({
            err: 0,
            mes: "Updated!"
        })
    } catch (error) {
        console.log(error)
        reject(error)
    }
});

export const login = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { email },
            raw: true
        })
        const isChecked = response && bcrypt.compareSync(password, response.password)
        const accessToken = isChecked
            ? jwt.sign({ userId: response.id, email: response.email }, process.env.JWT_SECRET, { expiresIn: 3600 })
            : null
        // JWT_SECRET_REFRESH_TOKEN
        const refreshToken = isChecked
            ? jwt.sign({ userId: response.id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: 3600 })
            : null
        resolve({
            err: accessToken ? 0 : 1,
            mes: accessToken ? 'Login is successfully' : response ? 'Password is wrong' : 'Email has not been registered',
            'access_token': accessToken,
            'refresh_token': refreshToken
        })
        if (refreshToken) {
            await db.User.update({
                refresh_token: refreshToken
            }, {
                where: { id: response.id }
            })
        }

    } catch (error) {
        reject(error)
    }
})