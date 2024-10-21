const getMaxCols = (xmlArray) => {
	let maxAltIDs = 1; // Maximum number of AltIDs
	let maxActors = 1;
	let maxAssociatedOrgs = 1;
	let maxAlternateTitles = 2;
	let maxCountryOfOrigin = 1;
	let maxMetadataAuthority = 1;
	let maxEditClass = 1;
	let maxEditDetails = 1;
	let maxMadeForRegion = 1;
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
		const editClass = xml.getElementsByTagName("EditClass");
		if (editClass.length > maxEditClass) {
			maxEditClass = editClass.length;
		}
		const editDetails = xml.getElementsByTagName("EditDetails");
		if (editDetails.length > maxEditDetails) {
			maxEditDetails = editDetails.length;
		}
		const madeForRegion = xml.getElementsByTagName("MadeForRegion");
		if (madeForRegion.length > maxMadeForRegion) {
			maxMadeForRegion = madeForRegion.length;
		}
	});
	return {
		maxAltIDs,
		maxActors,
		maxAssociatedOrgs,
		maxAlternateTitles,
		maxCountryOfOrigin,
		maxMetadataAuthority,
		maxEditClass,
		maxEditDetails,
		maxMadeForRegion,
	};
};

export default getMaxCols;
