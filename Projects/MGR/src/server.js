import express from 'express';
import router from './router.js'
import morgan from 'morgan';
const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.get('/', (req, res) => {
//     console.log('i am get response')
//     res.status(200)
//     res.json({message: 'hello'})
// })

app.use('/api', router)

// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true,
// }));

export default app;