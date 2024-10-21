import fetch from "node-fetch";
import pkg from "express-xml-bodyparser";
import crypto from "crypto";
const { xmlparser } = pkg;

const generateSha256Hash = (password) => {
	return crypto.createHash("sha256").update(password).digest("base64");
};

const getRecordsById = async (req, res) => {
	// console.log(req.body);
	console.log(req.params);
	// I want to get the /:envId from the URL. Give me the code to do that
	try {
		const envId = req.params.envId;
		const body = req.body; //Username, password, partyID, eidr_id from req.body
		const { username, partyID, password, eidr_id } = body;

		const finalPassword = generateSha256Hash(password);
		let query = `https://${envId}.eidr.org/EIDR/object/${eidr_id}?type=Full&followAlias=false`;
		if (envId === "sandbox1") {
			query = `https://sandbox1.eidr.org/EIDR/object/${eidr_id}?type=Full&followAlias=false`;
		} else if (envId === "sandbox2") {
			query = `https://sandbox2-mirror.eidr.org/EIDR/object/${eidr_id}?type=Full&followAlias=false`;
		} else if (envId === "production") {
			query = `https://resolve.eidr.org/EIDR/object/${eidr_id}?type=Full&followAlias=false`;
		}
		let headers = {
			"Content-Type": "application/xml",
			Accept: "*/*",
			Authorization: `Eidr ${username}:${partyID}:${finalPassword}`,
		};

		const response = await fetch(query, {
			method: "GET",
			headers: headers,
		});

		const xmlResp = await response.text();
		// console.log("Here is xmlResp, search by resolution ID: ", xmlResp);
		// console.log(
		// 	"Here is modXmlResp, search by modification base: ",
		// 	modXmlResp
		// );
		const containsStatusCode4 = xmlResp.includes("<Code>4</Code>");
		if (containsStatusCode4) {
			res.status(401).send({ error: "Unauthorized" });
		} else {
			res.status(200).json({ xmlResp }); // Correctly set the content type and send the XML response
		}
	} catch (error) {
		console.log("You have received a ", error);
		res.status(400).send({ error: error.message });
	}
};

export default {
	getRecordsById,
};
