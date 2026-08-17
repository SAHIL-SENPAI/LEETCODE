
const {createClient} = require("redis")

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-12744.crce182.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 12744
    }
});

module.exports = client;


