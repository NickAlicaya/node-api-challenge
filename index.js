const server = require("./server.js");





const port = 5000; server.listen(port, () => {
    console.log(`\n***Server is now running on http://localhost:${port}***\n`)
})