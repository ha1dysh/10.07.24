import { Request, Response } from "express";
import { Stream } from "stream";

const { spawn } = require("node:child_process")
const http = require("node:http");
const fsPromises = require("node:fs/promises")
const fs = require("node:fs")
const url = require("node:url")

const server = http.createServer()
server.listen(3000, "0.0.0.0")

server.on("request", async (req: Request, res: Response) => {
	if (req.url === "/favicon.ico") {
		return res.end()
	}

	try {
		if (req.url !== "/" && !(req.url).includes("result")) {
			const file = await fsPromises.readFile(`./data${req.url}`, "utf8")
			res.writeHead(200, { "Content-Type": "application/json" });
			return res.end(file)
		}

		if (req.url === "/") {
			const html = await fsPromises.readFile("index.html")
			res.writeHead(200, { "Content-Type": "text/html" });
			return res.end(html)
		}


		if (!(req.url).includes("result") && req.method !== "POST") {
			const html = await fsPromises.readFile("index.html")
			return res.end(html)
		}

		if (req.method === "POST") {
			const requestUrl = url.parse(req.url, true);
			const query = requestUrl.query;

			const [lsInput, ...flags] = query.input.trim().split(" ")

			if (lsInput !== "ls") {
				console.log('wrong command')
				return res.end('wrong command')
			}

			const ls = spawn(lsInput, flags)
			ls.stdout.on("data", (data: Stream) => {
				const arr = (data.toString()).split("\n")

				let html = fs.readFileSync("index.html").toString('utf-8')

				const script = `<script>
					const data = ${JSON.stringify(arr, null, 1)}
					document.body.innerHTML = data
				</script>`

				html = html.replace('</body>', script + '</body>')

				res.writeHead(200, { "Content-Type": "text/html" });
				return res.end(html)
			})
		}

	} catch (error) {
		if (error instanceof Error && 'code' in error && error.code === "ENOENT") {
			const notFound = `file "${req.url.slice(1)}" not found`
			console.log(notFound)
			return res.end(notFound)
		}
	}
})

// HTML Script
function setQuery() {
  const input = document.querySelector('input');
  const form = document.querySelector('form');
  if (form) {
    form.action = `/result?input=${input?.value}`;
  }
}
