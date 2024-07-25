import fetch from "node-fetch";
import pkg from "express-xml-bodyparser";
const { xmlparser } = pkg;
const getRecordsById = async (req, res) => {
	// console.log(req.body);
	try {
		const body = req.body;
		let headers = {
			"Content-Type": "application/xml",
			Accept: "*/*",
		};
		let query = `https://sandbox1.eidr.org/EIDR/object/${body.eidr_id}?type=SelfDefined`;

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
