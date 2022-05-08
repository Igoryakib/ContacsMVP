const app = require('./src/app');

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}/`);
});