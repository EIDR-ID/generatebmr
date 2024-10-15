import excelToXMLMap from "../components/ExcelToXMLMap.js";
import isAttributeKey from "./isAttributeKey.js";

const getDataRow = (xmlDoc, dataKeys, idx) => {
	const baseElements = xmlDoc.getElementsByTagName("FullMetadata");
	let row = [];
	if (baseElements.length > 0) {
		const baseObjectData = baseElements[0]; // Assuming we're only interested in the first BaseObjectData element

		dataKeys.forEach((key) => {
			const skipPattern = /^(Domain|Relation) [1-3]$/;
			if (skipPattern.test(key)) {
				return;
			}
			const foundElements = baseObjectData.getElementsByTagName(
				excelToXMLMap[key] || key
			);
			let value = "";
			if (key === "Unique Row ID") {
				row.push(idx + 1);
			} else if (key === "Director 1") {
				value =
					baseObjectData.getElementsByTagName("Director").length > 0
						? baseObjectData
								.getElementsByTagName("Director")[0]
								.getElementsByTagName("md:DisplayName")[0].textContent
						: "";
				row.push(value);
			} else if (key === "Director 2") {
				value =
					baseObjectData.getElementsByTagName("Director").length > 1
						? baseObjectData
								.getElementsByTagName("Director")[1]
								.getElementsByTagName("md:DisplayName")[0].textContent
						: "";
				row.push(value);
			} else if (key === "Actor 1") {
				value =
					baseObjectData.getElementsByTagName("Actor").length > 0
						? baseObjectData
								.getElementsByTagName("Actor")[0]
								.getElementsByTagName("md:DisplayName")[0].textContent
						: "";
				row.push(value);
			} else if (key === "Actor 2") {
				value =
					baseObjectData.getElementsByTagName("Actor").length > 1
						? baseObjectData
								.getElementsByTagName("Actor")[1]
								.getElementsByTagName("md:DisplayName")[0].textContent
						: "";
				row.push(value);
			} else if (key === "Actor 3") {
				value =
					baseObjectData.getElementsByTagName("Actor").length > 2
						? baseObjectData
								.getElementsByTagName("Actor")[2]
								.getElementsByTagName("md:DisplayName")[0].textContent
						: "";
				row.push(value);
			} else if (key === "Actor 4") {
				value =
					baseObjectData.getElementsByTagName("Actor").length > 3
						? baseObjectData
								.getElementsByTagName("Actor")[3]
								.getElementsByTagName("md:DisplayName")[0].textContent
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
			} else if (key === "Alt ID 1") {
				const altIDs = baseObjectData.getElementsByTagName("AlternateID");
				if (altIDs.length > 0) {
					const altIDElement = altIDs[0];
					const domain =
						altIDElement.getAttribute("domain") ||
						altIDElement.getAttribute("xsi:type") ||
						"";
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
			} else if (key === "Alt ID 2") {
				const altIDs = baseObjectData.getElementsByTagName("AlternateID");
				if (altIDs.length > 1) {
					const altIDElement = altIDs[1];
					const domain =
						altIDElement.getAttribute("domain") ||
						altIDElement.getAttribute("xsi:type") ||
						"";
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
			} else if (key === "Alt ID 3") {
				const altIDs = baseObjectData.getElementsByTagName("AlternateID");
				if (altIDs.length > 2) {
					const altIDElement = altIDs[2];
					const domain =
						altIDElement.getAttribute("domain") ||
						altIDElement.getAttribute("xsi:type") ||
						"";
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
