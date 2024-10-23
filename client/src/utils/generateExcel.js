import editTemplateFormat from "../assets/edittemplate.json";
import episodicTemplate from "../assets/episodictemplate.json";
import nonepisodicTemplate from "../assets/nonepisodictemplate.json";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import unknowntemplate from "../assets/unknowntemplate.json";
import getMaxCols from "./getMaxCols.js";
import getDataRow from "./getDataRow.js";
import addAdditionalHeaders from "./addAdditionalHeaders.js";
import generateAdditionalData from "./addAdditionalData.js";
const generateExcel = (type, xmlArray, templateFormat) => {
	// Prepare Excel data
	const rows = [];
	rows.push(["version:", "22"]); // Assuming version is static as per the requirement

	let maxHeaders = getMaxCols(xmlArray);

	const metadataKeys = Object.keys(templateFormat.metadata);
	// console.log("Metadata Keys: ", metadataKeys);
	const additionalHeaders = addAdditionalHeaders(maxHeaders);
	// Find the index of Unique Row ID and Relation 3
	const alternateTitleIndex = metadataKeys.indexOf("AlternateResourceName");
	const originalLanguageIndex = metadataKeys.indexOf("OriginalLanguage");
	const associatedOrgIndex = metadataKeys.indexOf("AssociatedOrgs");
	const alternateIndex = metadataKeys.indexOf("Alternate");
	const actorIndex = metadataKeys.indexOf("Actors");
	const additionalMetaDataIndex = metadataKeys.indexOf("MetadataAuthority");
	const alternatenoIndex = metadataKeys.indexOf("AlternateNo.");

	// Compose newMetadata
	let newMetadata = [];
	if (templateFormat === editTemplateFormat) {
		const editClassIndex = metadataKeys.indexOf("EditClass");
		const editDetailsIndex = metadataKeys.indexOf("EditDetails");
		newMetadata = [
			...metadataKeys.slice(0, editClassIndex),
			...Object.keys(additionalHeaders.additionalEditClass),
			...Object.keys(additionalHeaders.additionalMadeForRegion),
			...Object.keys(additionalHeaders.additionalEditDetails),
			...metadataKeys.slice(editDetailsIndex + 1, alternateTitleIndex),
			...Object.keys(additionalHeaders.additionalAlternateTitles),
			...Object.keys(additionalHeaders.additionalAssociatedOrgs),
			...Object.keys(additionalHeaders.additionalMetadataAuthorities),
			...metadataKeys.slice(additionalMetaDataIndex + 1, actorIndex),
			...Object.keys(additionalHeaders.additionalActors),
			...Object.keys(additionalHeaders.additionalIDKeys),
			...metadataKeys.slice(alternateIndex + 1),
		];
	} else if (templateFormat === episodicTemplate) {
		newMetadata = [
			...metadataKeys.slice(0, originalLanguageIndex),
			...Object.keys(additionalHeaders.additionalOriginalLanguages),
			...Object.keys(additionalHeaders.additionalAlternateTitles),
			...Object.keys(additionalHeaders.additionalAssociatedOrgs),
			...Object.keys(additionalHeaders.additionalMetadataAuthorities),
			...metadataKeys.slice(additionalMetaDataIndex + 1, alternatenoIndex),
			...Object.keys(additionalHeaders.additionalAlternateNumbers),
			...metadataKeys.slice(alternatenoIndex + 1, actorIndex),
			...Object.keys(additionalHeaders.additionalActors),
			...Object.keys(additionalHeaders.additionalIDKeys),
			...metadataKeys.slice(alternateIndex + 1),
		];
	} else {
		newMetadata = [
			...metadataKeys.slice(0, originalLanguageIndex),
			...Object.keys(additionalHeaders.additionalOriginalLanguages),
			...Object.keys(additionalHeaders.additionalAlternateTitles),
			...Object.keys(additionalHeaders.additionalCountries),
			...Object.keys(additionalHeaders.additionalAssociatedOrgs),
			...Object.keys(additionalHeaders.additionalMetadataAuthorities),
			...metadataKeys.slice(associatedOrgIndex + 1, actorIndex),
			...Object.keys(additionalHeaders.additionalActors),
			...Object.keys(additionalHeaders.additionalIDKeys),
			...metadataKeys.slice(alternateIndex + 1),
		];
	}

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
	const additionalData = generateAdditionalData(maxHeaders);
	// Find the index of Unique Row ID and Relation 3
	const dataAdditionalOriginalLanguageIndex =
		dataKeys.indexOf("OriginalLanguage");
	const dataAssociatedOrg = dataKeys.indexOf("AssociatedOrgs");
	const dataAlternateIndex = dataKeys.indexOf("Alternate");
	const actorDataIndex = dataKeys.indexOf("Actors");
	const alternateTitleDataIndex = dataKeys.indexOf("AlternateResourceName");
	const additionalMetaDataIndexData = dataKeys.indexOf("MetadataAuthority");
	const alternateNoIndexData = dataKeys.indexOf("AlternateNo.");
	let newData = [];
	// Compose newMetadata
	if (templateFormat === editTemplateFormat) {
		const editClassDataIndex = dataKeys.indexOf("EditClass");
		const editDetailsDataIndex = dataKeys.indexOf("EditDetails");
		newData = [
			...metadataKeys.slice(0, editClassDataIndex),
			...Object.keys(additionalData.additionalEditClassData),
			...Object.keys(additionalData.additionalMadeForRegionData),
			...Object.keys(additionalData.additionalEditDetailsData),
			...metadataKeys.slice(editDetailsDataIndex + 1, alternateTitleDataIndex),
			...Object.keys(additionalData.additionalAlternateTitlesData),
			...Object.keys(additionalData.additionalAssociatedOrgsData),
			...Object.keys(additionalData.additionalMetadataAuthoritiesData),
			...metadataKeys.slice(additionalMetaDataIndexData + 1, actorDataIndex),
			...Object.keys(additionalData.additionalActorsData),
			...Object.keys(additionalData.additionalDataIDKeys),
			...metadataKeys.slice(dataAlternateIndex + 1),
		];
	} else if (templateFormat === episodicTemplate) {
		newData = [
			...metadataKeys.slice(0, dataAdditionalOriginalLanguageIndex),
			...Object.keys(additionalData.additionalOriginalLanguageData),
			...Object.keys(additionalData.additionalAlternateTitlesData),
			...Object.keys(additionalData.additionalAssociatedOrgsData),
			...Object.keys(additionalData.additionalMetadataAuthoritiesData),
			...metadataKeys.slice(
				additionalMetaDataIndexData + 1,
				alternateNoIndexData
			),
			...Object.keys(additionalData.additionalAlternateNumbersData),
			...metadataKeys.slice(alternateNoIndexData + 1, actorDataIndex),
			...Object.keys(additionalData.additionalActorsData),
			...Object.keys(additionalData.additionalDataIDKeys),
			...metadataKeys.slice(dataAlternateIndex + 1),
		];
	} else {
		newData = [
			...metadataKeys.slice(0, dataAdditionalOriginalLanguageIndex),
			...Object.keys(additionalData.additionalOriginalLanguageData),
			...Object.keys(additionalData.additionalAlternateTitlesData),
			...Object.keys(additionalData.additionalCountriesData),
			...Object.keys(additionalData.additionalAssociatedOrgsData),
			...Object.keys(additionalData.additionalMetadataAuthoritiesData),
			...metadataKeys.slice(additionalMetaDataIndexData + 1, actorDataIndex),
			...Object.keys(additionalData.additionalActorsData),
			...Object.keys(additionalData.additionalDataIDKeys),
			...metadataKeys.slice(dataAlternateIndex + 1),
		];
	}

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
