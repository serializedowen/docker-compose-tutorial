const { Sequelize } = require("sequelize");
const app = require("express")();
const bluebird = require("bluebird");

let connected = false;

// 此处的host应该指向docker-compose中的容器名
const mysql = new Sequelize("sys", "root", "123456", {
  dialect: "mysql",
  host: "mysql",
});

const tryConnect = () =>
  mysql
    .authenticate()
    .then(() => {
      connected = true;
    })
    .catch((e) => {
      console.log(e);
      console.log("连接失败，3秒后重试");
      setTimeout(tryConnect, 3000);
    });

tryConnect();

app.get("/", (req, res) => res.send("hello from express"));
app.get("/mysql", (req, res) => {
  res.send(`mysql连接状态：${connected}`);
});

app.listen(8080, () => console.log("应用已启动并监听8080端口"));
