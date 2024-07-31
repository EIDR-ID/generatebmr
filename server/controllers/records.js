import fetch from "node-fetch";
import pkg from "express-xml-bodyparser";
const { xmlparser } = pkg;
const getRecordsById = async (req, res) => {
	// console.log(req.body);
	console.log(req.params);
	// I want to get the /:envId from the URL. Give me the code to do that
	try {
		const envId = req.params.envId;
		const body = req.body;
		let headers = {
			"Content-Type": "application/xml",
			Accept: "*/*",
		};
		let query = `https://${envId}.eidr.org/EIDR/object/${body.eidr_id}?type=SelfDefined`;
		if (envId === "sandbox1") {
			query = `https://sandbox1.eidr.org/EIDR/object/${body.eidr_id}?type=SelfDefined`;
		} else if (envId === "sandbox2") {
			query = `https://sandbox2-mirror.eidr.org/EIDR/object/${body.eidr_id}?type=SelfDefined`;
		} else if (envId === "production") {
			query = `https://resolve.eidr.org/EIDR/object/${body.eidr_id}?type=SelfDefined`;
		}

		const response = await fetch(query, {
			method: "GET",
			headers: headers,
		});
		const xmlResp = await response.text();
		// console.log(xmlResp);
		res.status(200).type("application/xml").send(xmlResp); // Correctly set the content type and send the XML response
	} catch (error) {
		// console.log(error);
		res.status(400).send({ error: error.message });
	}
};

export default {
	getRecordsById,
};
