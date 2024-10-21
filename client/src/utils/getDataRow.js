import excelToXMLMap from "../components/ExcelToXMLMap.js";
import isAttributeKey from "./isAttributeKey.js";

const getDataRow = (xmlDoc, dataKeys, idx) => {
	const baseElements = xmlDoc.getElementsByTagName("FullMetadata");
	let row = [];
	if (baseElements.length > 0) {
		const baseObjectData = baseElements[0]; // Assuming we're only interested in the first BaseObjectData element

		dataKeys.forEach((key) => {
			const skipPattern =
				/^(Domain|Relation|Party ID|Role|Alt Title Language|Alt Title Class|Metadata Authority Party ID|Edit Domain) \d+$/;
			if (skipPattern.test(key)) {
				return;
			}
			const foundElements = baseObjectData.getElementsByTagName(
				excelToXMLMap[key] || key
			);
			let value = "";
			if (key === "Unique Row ID") {
				row.push(idx + 1);
			} else if (/^Director \d+$/.test(key)) {
				const directorIndex = parseInt(key.split(" ")[1], 10) - 1; // Extract the director number and convert to zero-based index
				const directors = baseObjectData.getElementsByTagName("Director");
				value =
					directors.length > directorIndex
						? directors[directorIndex].getElementsByTagName("md:DisplayName")[0]
								.textContent
						: "";
				row.push(value);
			} else if (/^Actor \d+$/.test(key)) {
				const actorIndex = parseInt(key.split(" ")[1], 10) - 1; // Extract the actor number and convert to zero-based index
				const actors = baseObjectData.getElementsByTagName("Actor");
				value =
					actors.length > actorIndex
						? actors[actorIndex].getElementsByTagName("md:DisplayName")[0]
								.textContent
						: "";
				row.push(value);
			} else if (/^Edit Class \d+$/.test(key)) {
				const editClassIndex = parseInt(key.split(" ")[2], 10) - 1; // Extract the edit class number and convert to zero-based index
				const editClasses = baseObjectData.getElementsByTagName("EditClass");
				value =
					editClasses.length > editClassIndex
						? editClasses[editClassIndex].textContent
						: "";
				row.push(value);
			} else if (/^Made for Region \d+$/.test(key)) {
				const regionIndex = parseInt(key.split(" ")[3], 10) - 1; // Extract the region number and convert to zero-based index
				const madeForRegions =
					baseObjectData.getElementsByTagName("MadeForRegion");
				value =
					madeForRegions.length > regionIndex
						? madeForRegions[regionIndex].textContent
						: "";
				row.push(value);
			} else if (key === "Assigned EIDR ID") {
				value =
					baseObjectData.getElementsByTagName("ID").length > 0
						? baseObjectData.getElementsByTagName("ID")[0].textContent
						: "";
				row.push(value);
			} else if (/^Edit Details \d+$/.test(key)) {
				const editDetailsIndex = parseInt(key.split(" ")[2], 10) - 1; // Extract the edit details number and convert to zero-based index
				const editDetails = baseObjectData.getElementsByTagName("EditDetails");
				if (editDetails.length > editDetailsIndex) {
					const editDetailsElement = editDetails[editDetailsIndex];
					const domain = editDetailsElement
						? editDetailsElement.getAttribute("domain")
						: "";
					const value = editDetailsElement
						? editDetailsElement.textContent
						: "";
					row.push(value);
					row.push(domain); // Add domain to the row
				} else {
					row.push("");
					row.push("");
				}
			} else if (key === "Version Language 1") {
				if (baseObjectData.getElementsByTagName("VersionLanguage").length > 0) {
					const versionLanguageElement =
						baseObjectData.getElementsByTagName("VersionLanguage")[0];
					const mode = versionLanguageElement
						? versionLanguageElement.getAttribute("mode")
						: "";
					const value = versionLanguageElement
						? versionLanguageElement.textContent
						: "";
					row.push(value);
					row.push(mode);
				} else {
					row.push("");
					row.push("");
				}
			} else if (key === "Original Language 1") {
				if (
					baseObjectData.getElementsByTagName("OriginalLanguage").length > 0
				) {
					const originalLanguageElement =
						baseObjectData.getElementsByTagName("OriginalLanguage")[0];
					const mode = originalLanguageElement
						? originalLanguageElement.getAttribute("mode")
						: "";
					const value = originalLanguageElement
						? originalLanguageElement.textContent
						: "";
					row.push(value);
					row.push(mode);
				} else {
					row.push("");
					row.push("");
				}
			} else if (key === "Title") {
				if (baseObjectData.getElementsByTagName("ResourceName").length > 0) {
					const titleElement =
						baseObjectData.getElementsByTagName("ResourceName")[0];
					const systemGenerated = titleElement.getAttribute("systemGenerated");
					if (systemGenerated !== "true") {
						const language = titleElement
							? titleElement.getAttribute("lang")
							: "";
						const titleClass = titleElement
							? titleElement.getAttribute("titleClass")
							: "";
						const value = titleElement ? titleElement.textContent : "";
						row.push(value);
						row.push(language);
						row.push(titleClass);
					} else {
						row.push("");
						row.push("");
						row.push("");
					}
				} else {
					row.push("");
					row.push("");
					row.push("");
				}
			} else if (/^Alternate Title \d+$/.test(key)) {
				const altTitleIndex = parseInt(key.split(" ")[2], 10) - 1; // Extract the alt title number and convert to zero-based index
				const alternateTitles = baseObjectData.getElementsByTagName(
					"AlternateResourceName"
				);
				if (alternateTitles.length > altTitleIndex) {
					const alternateTitleElement = alternateTitles[altTitleIndex];
					const value = alternateTitleElement
						? alternateTitleElement.textContent
						: "";
					const language = alternateTitleElement
						? alternateTitleElement.getAttribute("lang")
						: "";
					const titleClass = alternateTitleElement
						? alternateTitleElement.getAttribute("titleClass")
						: "";
					row.push(value);
					row.push(language);
					row.push(titleClass);
				} else {
					row.push("");
					row.push("");
					row.push("");
				}
			} else if (/^Associated Org \d+$/.test(key)) {
				const orgIndex = parseInt(key.split(" ")[2], 10) - 1; // Extract the org number and convert to zero-based index
				const associatedOrgs =
					baseObjectData.getElementsByTagName("AssociatedOrg");
				if (associatedOrgs.length > orgIndex) {
					const associatedOrgElement = associatedOrgs[orgIndex];
					const value = associatedOrgElement
						? associatedOrgElement.getElementsByTagName("md:DisplayName")[0]
								.textContent
						: "";
					const role = associatedOrgElement
						? associatedOrgElement.getAttribute("role")
						: "";
					const partyID = associatedOrgElement
						? associatedOrgElement.getAttribute("organizationID")
						: "";
					row.push(value);
					row.push(role);
					row.push(partyID);
				} else {
					row.push("");
					row.push("");
					row.push("");
				}
			} else if (/^Alt ID \d+$/.test(key)) {
				const altIdIndex = parseInt(key.split(" ")[2], 10) - 1; // Extract the alt ID number and convert to zero-based index
				const altIDs = baseObjectData.getElementsByTagName("AlternateID");
				if (altIDs.length > altIdIndex) {
					const altIDElement = altIDs[altIdIndex];
					const domain =
						altIDElement.getAttribute("domain") ||
						altIDElement.getAttribute("xsi:type");
					const relation = altIDElement.getAttribute("relation") || "";
					const value = altIDElement.textContent || "";
					row.push(value);
					row.push(domain);
					row.push(relation);
				} else {
					row.push("");
					row.push("");
					row.push("");
				}
			} else if (/^Metadata Authority \d+$/.test(key)) {
				const metadataAuthorityIndex = parseInt(key.split(" ")[2], 10) - 1; // Extract the metadata authority number and convert to zero-based index
				const metadataAuthorities =
					baseObjectData.getElementsByTagName("MetadataAuthority");
				if (metadataAuthorities.length > metadataAuthorityIndex) {
					const metadataAuthorityElement =
						metadataAuthorities[metadataAuthorityIndex];
					const value = metadataAuthorityElement
						? metadataAuthorityElement.textContent
						: "";
					row.push("");
					row.push(value);
				} else {
					row.push("");
					row.push("");
				}
			} else {
				if (foundElements.length > 0) {
					value = foundElements[0].textContent || "";
					row.push(value);
				} else {
					// console.log(key, "not found in XML"); // Debugging log
					if (!isAttributeKey(key)) {
						row.push(""); // Push an empty string if the element was not found
					}
				}
			}
		});
	}
	return row;
};

export default getDataRow;
