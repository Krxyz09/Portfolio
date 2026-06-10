const { Readable } = require("stream");
const path = require("path"); // Added for reliable absolute path resolution

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
    // Add duplex option; required in modern Node versions when passing a stream as a body
    ...(body ? { duplex: "half" } : {}), 
  });
}

async function pipeWebResponse(res, response) {
  res.statusCode = response.status;
  for (const [k, v] of response.headers.entries()) {
    res.setHeader(k, v);
  }
  
  // Optimization: Stream the response body instead of consuming it entirely into memory
  if (response.body) {
    const readable = Readable.fromWeb(response.body);
    readable.pipe(res);
  } else {
    res.end();
  }
}

module.exports = async (req, res) => {
  try {
    // Standardized relative path resolution using path.resolve
    const serverBundlePath = path.resolve(process.cwd(), "dist/server/server.js");
    const serverModule = await import(serverBundlePath);
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