const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config()
const passport = require('passport')
const db = require('./models')
const { v4: uuidv4 } = require('uuid');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID||"329325730959-fpfmmsnf5qha0g3gh8ouns6c4qf456h0.apps.googleusercontent.com",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET||"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",
    callbackURL: "/api/v1/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        // them user vaof dbsds
        const tokenLogin = uuidv4()
        profile.tokenLogin = tokenLogin
        try {
            console.log(profile)
            if (profile?.emails) {
                let response = await db.User.findOrCreate({
                    where: { email: profile.emails[0]?.value },
                    defaults: {
                        // id: profile.id,
                        email: profile.emails.value,
                        typeLogin: profile?.provider,
                        name: profile?.displayName,
                        avatarUrl: profile?.photos[0]?.value,
                        tokenLogin
                    }
                })
                if (!response[1]) {
                    await db.User.update({
                        tokenLogin
                    }, {
                        where: { id: profile.id }
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
        // console.log(profile);
        return cb(null, profile);

    }
));


// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "/api/auth/facebook/callback",
//     profileFields: ['email', 'photos', 'id', 'displayName']

// },
//     async function (accessToken, refreshToken, profile, cb) {
//         const tokenLogin = uuidv4()
//         profile.tokenLogin = tokenLogin
//         try {
//             if (profile?.id) {
//                 let response = await db.User.findOrCreate({
//                     where: { id: profile.id },
//                     defaults: {
//                         id: profile.id,
//                         email: profile.emails[0]?.value,
//                         typeLogin: profile?.provider,
//                         name: profile?.displayName,
//                         avatarUrl: profile?.photos[0]?.value,
//                         tokenLogin
//                     }
//                 })
//                 if (!response[1]) {
//                     await db.User.update({
//                         tokenLogin
//                     }, {
//                         where: { id: profile.id }
//                     })
//                 }
//             }
//         } catch (error) {
//             console.log(error)
//         }
//         // console.log(profile);
//         return cb(null, profile);
//     }
// ));