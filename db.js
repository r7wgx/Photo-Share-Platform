import mongoose from 'mongoose'

const conn = () => {
    mongoose.connect(process.env.DB_URL, {
        dbName: "lenslight",
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("DataBase Successully")
    }).catch((err) => {
        console.log(`DataBase BOOOOM ----> ${err}`)
    })
}

export default conn