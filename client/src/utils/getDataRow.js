import excelToXMLMap from "../components/ExcelToXMLMap.js";
import isAttributeKey from "./isAttributeKey.js";

const getDataRow = (xmlDoc, dataKeys, idx) => {
	const baseElements = xmlDoc.getElementsByTagName("FullMetadata");
	let row = [];
	if (baseElements.length > 0) {
		const baseObjectData = baseElements[0]; // Assuming we're only interested in the first BaseObjectData element

		dataKeys.forEach((key) => {
			const skipPattern = /^(Domain|Relation) \d+$/;
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
			} else if (key === "Edit Class 1") {
				value =
					baseObjectData.getElementsByTagName("EditClass").length > 0
						? baseObjectData.getElementsByTagName("EditClass")[0].textContent
						: "";
				row.push(value);
			} else if (key === "Edit Class 2") {
				value =
					baseObjectData.getElementsByTagName("EditClass").length > 1
						? baseObjectData.getElementsByTagName("EditClass")[1].textContent
						: "";
				row.push(value);
			} else if (key === "Edit Class 3") {
				value =
					baseObjectData.getElementsByTagName("EditClass").length > 2
						? baseObjectData.getElementsByTagName("EditClass")[2].textContent
						: "";
				row.push(value);
			} else if (key === "Made for Region 1") {
				value =
					baseObjectData.getElementsByTagName("MadeForRegion").length > 0
						? baseObjectData.getElementsByTagName("MadeForRegion")[0]
								.textContent
						: "";
				row.push(value);
			} else if (key === "Made for Region 2") {
				value =
					baseObjectData.getElementsByTagName("MadeForRegion").length > 1
						? baseObjectData.getElementsByTagName("MadeForRegion")[1]
								.textContent
						: "";
				row.push(value);
			} else if (key === "Made for Region 3") {
				value =
					baseObjectData.getElementsByTagName("MadeForRegion").length > 2
						? baseObjectData.getElementsByTagName("MadeForRegion")[2]
								.textContent
						: "";
				row.push(value);
			} else if (key === "Assigned EIDR ID") {
				value =
					baseObjectData.getElementsByTagName("ID").length > 0
						? baseObjectData.getElementsByTagName("ID")[0].textContent
						: "";
				row.push(value);
			} else if (key === "Edit Details 1") {
				if (baseObjectData.getElementsByTagName("EditDetails").length > 0) {
					const editDetailsElement =
						baseObjectData.getElementsByTagName("EditDetails")[0];
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
			} else if (key === "Associated Org 1") {
				if (baseObjectData.getElementsByTagName("AssociatedOrg").length > 0) {
					const associatedOrgElement =
						baseObjectData.getElementsByTagName("AssociatedOrg")[0];
					const value = associatedOrgElement
						? associatedOrgElement.getElementsByTagName("md:DisplayName")[0]
								.textContent
						: "";
					const role = associatedOrgElement
						? associatedOrgElement.getAttribute("role")
						: "";
					const idType = associatedOrgElement
						? associatedOrgElement.getAttribute("idType")
						: "";
					row.push(value);
					row.push(role);
					row.push(idType);
				} else {
					row.push("");
					row.push("");
					row.push("");
				}
			} else if (key === "Associated Org 2") {
				if (baseObjectData.getElementsByTagName("AssociatedOrg").length > 1) {
					const associatedOrgElement =
						baseObjectData.getElementsByTagName("AssociatedOrg")[1];
					const value = associatedOrgElement
						? associatedOrgElement.getElementsByTagName("md:DisplayName")[0]
								.textContent
						: "";
					const role = associatedOrgElement
						? associatedOrgElement.getAttribute("role")
						: "";
					const idType = associatedOrgElement
						? associatedOrgElement.getAttribute("idType")
						: "";
					row.push(value);
					row.push(role);
					row.push(idType);
				} else {
					row.push("");
					row.push("");
					row.push("");
				}
			} else if (key === "Associated Org 3") {
				if (baseObjectData.getElementsByTagName("AssociatedOrg").length > 2) {
					const associatedOrgElement =
						baseObjectData.getElementsByTagName("AssociatedOrg")[2];
					const value = associatedOrgElement
						? associatedOrgElement.getElementsByTagName("md:DisplayName")[0]
								.textContent
						: "";
					const role = associatedOrgElement
						? associatedOrgElement.getAttribute("role")
						: "";
					const idType = associatedOrgElement
						? associatedOrgElement.getAttribute("idType")
						: "";
					row.push(value);
					row.push(role);
					row.push(idType);
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
			} else {
				if (foundElements.length > 0) {
					value = foundElements[0].textContent || "";
					row.push(value);
				} else {
					console.log(key, "not found in XML"); // Debugging log
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
