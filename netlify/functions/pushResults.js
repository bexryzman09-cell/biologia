// netlify/functions/pushResults.js
const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body); // результаты ученика
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO = "user/repo"; // замени на свой
  const PATH = "results.json";
  const BRANCH = "main";

  try {
    // 1. Получаем текущий файл с GitHub
    const getResp = await fetch(`https://api.github.com/repos/${REPO}/contents/${PATH}?ref=${BRANCH}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "User-Agent": "NetlifyFunction"
      }
    });

    const getData = await getResp.json();
    const sha = getData.sha;
    const content = JSON.parse(Buffer.from(getData.content, "base64").toString());

    // 2. Добавляем новые результаты
    content.push(data);

    // 3. Записываем обратно в GitHub
    const updateResp = await fetch(`https://api.github.com/repos/${REPO}/contents/${PATH}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "User-Agent": "NetlifyFunction",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `Добавлен результат ученика ${data.studentName}`,
        content: Buffer.from(JSON.stringify(content, null, 2)).toString("base64"),
        sha: sha,
        branch: BRANCH
      })
    });

    const updateData = await updateResp.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data: updateData })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};