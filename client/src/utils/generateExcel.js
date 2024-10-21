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
	let maxAltIDs = 1; // Maximum number of AltIDs
	let maxActors = 1;
	let maxAssociatedOrgs = 1;
	let maxAlternateTitles = 2;
	let maxCountryOfOrigin = 1;
	let maxMetadataAuthority = 1;
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
		const associatedOrgs = xml.getElementsByTagName("AssociatedOrg");
		if (associatedOrgs.length > maxAssociatedOrgs) {
			maxAssociatedOrgs = associatedOrgs.length;
		}
		const alternateTitles = xml.getElementsByTagName("AlternateResourceName");
		if (alternateTitles.length > maxAlternateTitles) {
			maxAlternateTitles = alternateTitles.length;
		}
		const countryOfOrigin = xml.getElementsByTagName("CountryOfOrigin");
		if (countryOfOrigin.length > maxCountryOfOrigin) {
			maxCountryOfOrigin = countryOfOrigin.length;
		}
		const metadataAuthority = xml.getElementsByTagName("MetadataAuthority");
		if (metadataAuthority.length > maxMetadataAuthority) {
			maxMetadataAuthority = metadataAuthority.length;
		}
	});

	const metadataKeys = Object.keys(templateFormat.metadata);
	// console.log("Metadata Keys: ", metadataKeys);
	const additionalIDKeys = {};
	const additionalActors = {};
	const additionalAssociatedOrgs = {};
	const additionalAlternateTitles = {};
	const additionalCountries = {};
	const additionalMetadataAuthorities = {};
	//Don't run if you don't need any more columns than given already.
	for (let i = 1; i <= maxAltIDs; i++) {
		additionalIDKeys[`Alt ID ${i}`] = { required: "optional" };
		additionalIDKeys[`Domain ${i}`] = { required: "optional" };
		additionalIDKeys[`Relation ${i}`] = { required: "optional" };
	}
	for (let i = 1; i <= maxActors; i++) {
		additionalActors[`Actor ${i}`] = { required: "optional" };
	}
	for (let i = 1; i <= maxAssociatedOrgs; i++) {
		additionalAssociatedOrgs[`Associated Org ${i}`] = { required: "optional" };
		additionalAssociatedOrgs[`Role ${i}`] = { required: "optional" };
		additionalAssociatedOrgs[`Party ID ${i}`] = { required: "optional" };
	}
	for (let i = 1; i <= maxAlternateTitles; i++) {
		additionalAlternateTitles[`Alternate Title ${i}`] = {
			required: "optional",
		};
		additionalAlternateTitles[`Alt Title Language ${i}`] = {
			required: "optional",
		};
		additionalAlternateTitles[`Alt Title Class ${i}`] = {
			required: "optional",
		};
	}
	for (let i = 1; i <= maxCountryOfOrigin; i++) {
		additionalCountries[`Country of Origin ${i}`] = { required: "optional" };
	}
	for (let i = 1; i <= maxMetadataAuthority; i++) {
		additionalMetadataAuthorities[`Metadata Authority ${i}`] = {
			required: "optional",
		};
		additionalMetadataAuthorities[`Metadata Authority Party ID ${i}`] = {
			required: "optional",
		};
	}

	// Find the index of Unique Row ID and Relation 3
	const alternateTitleIndex = metadataKeys.indexOf("AlternateResourceName");
	const associatedOrgIndex = metadataKeys.indexOf("AssociatedOrgs");
	const alternateIndex = metadataKeys.indexOf("Alternate");
	const actorIndex = metadataKeys.indexOf("Actors");
	const additionalMetaDataIndex = metadataKeys.indexOf("MetadataAuthority");

	// Compose newMetadata
	const newMetadata = [
		...metadataKeys.slice(0, alternateTitleIndex),
		...Object.keys(additionalAlternateTitles),
		...Object.keys(additionalCountries),
		...Object.keys(additionalAssociatedOrgs),
		...Object.keys(additionalMetadataAuthorities),
		...metadataKeys.slice(associatedOrgIndex + 1, actorIndex),
		...Object.keys(additionalActors),
		...Object.keys(additionalIDKeys),
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
	const additionalAssociatedOrgsData = {};
	const additionalAlternateTitlesData = {};
	const additionalCountriesData = {};
	const additionalMetadataAuthoritiesData = {};
	for (let i = 1; i <= maxAltIDs; i++) {
		//Append new Alt ID, Domain.
		additionalDataIDKeys[`Alt ID ${i}`] = "";
		additionalDataIDKeys[`Domain ${i}`] = "";
		additionalDataIDKeys[`Relation ${i}`] = "";
	}
	for (let i = 1; i <= maxActors; i++) {
		additionalActorsData[`Actor ${i}`] = "";
	}
	for (let i = 1; i <= maxAssociatedOrgs; i++) {
		additionalAssociatedOrgsData[`Associated Org ${i}`] = "";
		additionalAssociatedOrgsData[`Role ${i}`] = "";
		additionalAssociatedOrgsData[`Party ID ${i}`] = "";
	}
	for (let i = 1; i <= maxAlternateTitles; i++) {
		additionalAlternateTitlesData[`Alternate Title ${i}`] = "";
		additionalAlternateTitlesData[`Alt Title Language ${i}`] = "";
		additionalAlternateTitlesData[`Alt Title Class ${i}`] = "";
	}
	for (let i = 1; i <= maxCountryOfOrigin; i++) {
		additionalCountriesData[`Country of Origin ${i}`] = "";
	}
	for (let i = 1; i <= maxMetadataAuthority; i++) {
		additionalMetadataAuthoritiesData[`Metadata Authority ${i}`] = "";
		additionalMetadataAuthoritiesData[`Metadata Authority Party ID ${i}`] = "";
	}
	// Find the index of Unique Row ID and Relation 3
	const dataAssociatedOrg = dataKeys.indexOf("AssociatedOrgs");
	const dataAlternateIndex = dataKeys.indexOf("Alternate");
	const actorDataIndex = dataKeys.indexOf("Actors");
	const alternateTitleDataIndex = dataKeys.indexOf("AlternateResourceName");
	const additionalMetaDataIndexData = dataKeys.indexOf("MetadataAuthority");

	// Compose newMetadata
	const newData = [
		...metadataKeys.slice(0, alternateTitleDataIndex),
		...Object.keys(additionalAlternateTitlesData),
		...Object.keys(additionalCountriesData),
		...Object.keys(additionalAssociatedOrgsData),
		...Object.keys(additionalMetadataAuthoritiesData),
		...metadataKeys.slice(additionalMetaDataIndexData + 1, actorDataIndex),
		...Object.keys(additionalActorsData),
		...Object.keys(additionalDataIDKeys),
		...metadataKeys.slice(dataAlternateIndex + 1),
	];

	const updatedDataKeyValuePairs = {};
	newData.forEach((key) => {
		updatedDataKeyValuePairs[key] = templateFormat.data[key] || "";
	});
	// console.log("Updated Data Key Value Pairs: ", updatedDataKeyValuePairs);
	rows.push(newData); // Third row: keys from data

	const updatedDataKeys = Object.keys(updatedDataKeyValuePairs);
	updatedDataKeys.map((key) => updatedDataKeyValuePairs[key] || ""); // Replace null with 'null' string
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
