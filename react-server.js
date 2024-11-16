const { spawn } = require("child_process");
const dotenv = require("dotenv").config();

const reactServer = spawn("npm", ["start"], {
    cwd: "frontend",
    env: { ...process.env, PORT: process.env.REACT_PORT },
    stdio: "inherit"
})

reactServer.on("close", (code) => {
    console.log(`React server exited with code ${code}`)
})