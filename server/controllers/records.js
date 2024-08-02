import fetch from "node-fetch";
import pkg from "express-xml-bodyparser";
import crypto from "crypto";
const { xmlparser } = pkg;

const generateMd5Hash = (password) => {
	return crypto.createHash("md5").update(password).digest("base64");
};

const getRecordsById = async (req, res) => {
	// console.log(req.body);
	console.log(req.params);
	// I want to get the /:envId from the URL. Give me the code to do that
	try {
		const envId = req.params.envId;
		const body = req.body; //Username, password, partyID, eidr_id from req.body
		const { username, partyID, password, eidr_id } = body;

		const md5Password = generateMd5Hash(password);

		let headers = {
			"Content-Type": "application/xml",
			Accept: "*/*",
			Authorization: `Eidr ${username}:${partyID}:${md5Password}`,
		};
		let query = `https://${envId}.eidr.org/EIDR/object/${eidr_id}?type=SelfDefined`;
		if (envId === "sandbox1") {
			query = `https://sandbox1.eidr.org/EIDR/object/${eidr_id}?type=SelfDefined`;
		} else if (envId === "sandbox2") {
			query = `https://sandbox2-mirror.eidr.org/EIDR/object/${eidr_id}?type=SelfDefined`;
		} else if (envId === "production") {
			query = `https://resolve.eidr.org/EIDR/object/${eidr_id}?type=SelfDefined`;
		}

		const response = await fetch(query, {
			method: "GET",
			headers: headers,
		});
		const xmlResp = await response.text();
		console.log(xmlResp);
		const containsStatusCode4 = xmlResp.includes("<Code>4</Code>");
		if (containsStatusCode4) {
			res.status(401).send({ error: "Unauthorized" });
		} else {
			res.status(200).type("application/xml").send(xmlResp); // Correctly set the content type and send the XML response
		}
	} catch (error) {
		console.log("You have received a ", error);
		res.status(400).send({ error: error.message });
	}
};

export default {
	getRecordsById,
};
