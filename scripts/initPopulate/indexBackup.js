const axios = require("axios");
axios.create({
  timeout: 10000,
});
const fs = require("fs");

const max = 20;

async function init() {
  console.log("Aki populate initialized...");
  for (let page = 1; page < max; page++) {
    console.log(`Requesting Page:${page}`);
    console.log({
      per_page: 250,
      page,
    });
    const { data } = await axios.get("http://localhost:3000/test", {
      data: {
        per_page: 250,
        page,
      },
    });

    if (data.status === "done") {
      console.log({ where: "if" });
      const timeOut = (secs) =>
        new Promise((res) => {
          setTimeout(() => res(console.log({ data })), secs);
        });
      console.log(`Leaving page index:${page}`);
      await timeOut(1000);
    } else {
      console.log({ where: "else" });
      page = max + 1;
    }
  }
}

init();
