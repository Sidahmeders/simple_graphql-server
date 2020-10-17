const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema.js');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}...`));
