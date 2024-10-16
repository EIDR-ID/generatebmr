import editTemplateFormat from "../assets/edittemplate.json";
import episodicTemplate from "../assets/episodictemplate.json";
import nonepisodicTemplate from "../assets/nonepisodictemplate.json";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import unknowntemplate from "../assets/unknowntemplate.json";
import getDataRow from "./getDataRow.js";
const generateExcel = (type, xmlArray, templateFormat) => {
	// Prepare Excel data
	const rows = [];
	rows.push(["version:", "22"]); // Assuming version is static as per the requirement
	let maxAltIDs = 3; // Maximum number of AltIDs
	let maxActors = 1;
	// Loop through xmlArray to determine the maximum number of Alt IDs
	xmlArray.forEach((xml) => {
		const altIDs = xml.getElementsByTagName("AlternateID");
		if (altIDs.length > maxAltIDs) {
			maxAltIDs = altIDs.length;
		}
		const actors = xml.getElementsByTagName("Actor");
		if (actors.length > maxActors) {
			maxActors = actors.length;
		}
	});
	console.log("Max Alt IDs: ", maxAltIDs);

	const metadataKeys = Object.keys(templateFormat.metadata);
	console.log("Metadata Keys: ", metadataKeys);
	const additionalIDKeyss = {};
	const additionalActors = {};
	//Don't run if you don't need any more columns than given already.
	for (let i = 1; i <= maxAltIDs; i++) {
		additionalIDKeyss[`Alt ID ${i}`] = { required: "optional" };
		additionalIDKeyss[`Domain ${i}`] = { required: "optional" };
		additionalIDKeyss[`Relation ${i}`] = { required: "optional" };
	}
	for (let i = 1; i <= maxActors; i++) {
		additionalActors[`Actor ${i}`] = { required: "optional" };
	}

	// Find the index of Unique Row ID and Relation 3
	const alternateIndex = metadataKeys.indexOf("Alternate");
	const actorIndex = metadataKeys.indexOf("Actors");

	// Compose newMetadata
	const newMetadata = [
		...metadataKeys.slice(0, actorIndex),
		...Object.keys(additionalActors),
		...Object.keys(additionalIDKeyss),
		...metadataKeys.slice(alternateIndex + 1),
	];

	const metadataRequired = newMetadata.map((key) => {
		if (templateFormat.metadata[key]?.required === "TBD") {
			return "TBD";
		}
		return templateFormat.metadata[key]?.required ? "required" : "optional";
	});
	// rows.push(newMetadata); // Third row: keys from metadata
	rows.push(metadataRequired); // Second row: required or optional

	// Data keys and their values
	const dataKeys = Object.keys(templateFormat.data);
	const additionalDataIDKeys = {};
	const additionalActorsData = {};
	for (let i = 1; i <= maxAltIDs; i++) {
		//Append new Alt ID, Domain.
		additionalDataIDKeys[`Alt ID ${i}`] = "";
		additionalDataIDKeys[`Domain ${i}`] = "";
		additionalDataIDKeys[`Relation ${i}`] = "";
	}
	for (let i = 1; i <= maxActors; i++) {
		additionalActorsData[`Actor ${i}`] = "";
	}
	// Find the index of Unique Row ID and Relation 3
	const dataAlternateIndex = dataKeys.indexOf("Alternate");
	const actorDataIndex = dataKeys.indexOf("Actors");

	// Compose newMetadata
	const newData = [
		...metadataKeys.slice(0, actorDataIndex),
		...Object.keys(additionalActorsData),
		...Object.keys(additionalDataIDKeys),
		...metadataKeys.slice(dataAlternateIndex + 1),
	];

	console.log("New Data: ", newData);

	// Create an object to hold the key-value pairs for newData
	const updatedDataKeyValuePairs = {};
	newData.forEach((key) => {
		updatedDataKeyValuePairs[key] = templateFormat.data[key] || "";
	});

	const updatedDataKeys = Object.keys(updatedDataKeyValuePairs);
	const dataValues = updatedDataKeys.map(
		(key) => updatedDataKeyValuePairs[key] || ""
	); // Replace null with 'null' string
	rows.push(newData); // Third row: keys from data
	xmlArray.forEach((xml, idx) => {
		rows.push(getDataRow(xml, updatedDataKeys, idx)); // Fourth row: values from data
	});
	// Generate Excel file
	const wb = XLSX.utils.book_new();
	const ws = XLSX.utils.aoa_to_sheet(rows);
	XLSX.utils.book_append_sheet(wb, ws, `${type}`); // Set sheet name to "Edits"
	const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
	function s2ab(s) {
		const buf = new ArrayBuffer(s.length);
		const view = new Uint8Array(buf);
		for (let i = 0; i < s.length; i++) {
			view[i] = s.charCodeAt(i) & 0xff;
		}
		return buf;
	}

	// Save to file
	saveAs(
		new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
		`${type}Template.xlsx`
	);
};

export default generateExcel;
