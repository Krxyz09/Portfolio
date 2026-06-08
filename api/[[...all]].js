const { Readable } = require("stream");

async function toWebRequest(req) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host || "localhost";
  const url = `${proto}://${host}${req.url}`;

  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers || {})) {
    if (Array.isArray(v)) v.forEach((val) => headers.append(k, val));
    else if (v != null) headers.set(k, String(v));
  }

  let body = undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = req;
  }

  return new Request(url, {
    method: req.method,
    headers,
    body,
  });
}

async function pipeWebResponse(res, response) {
  res.statusCode = response.status;
  for (const [k, v] of response.headers.entries()) {
    // Node allows setting multiple headers; use setHeader
    res.setHeader(k, v);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  res.end(buffer);
}

module.exports = async (req, res) => {
  try {
    // import the built server bundle
    const serverModule = await import(`${process.cwd()}/dist/server/server.js`);
    const server = serverModule.default ?? serverModule;

    const webReq = await toWebRequest(req);
    const webRes = await server.fetch(webReq, {}, {});
    await pipeWebResponse(res, webRes);
  } catch (err) {
    console.error("SSR handler error:", err);
    res.statusCode = 500;
    res.end("Internal server error");
  }
};
