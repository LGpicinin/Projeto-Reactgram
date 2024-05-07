const mongoose = require('mongoose')
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

const conn = async () => {
    try {

        const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.b3lt88a.mongodb.net/?retryWrites=true&w=majority`) 

        console.log("Conexão feita com sucesso!")

        return dbConn;

    } catch (error) {

        console.log(error)

    }
}

conn()

module.exports = conn