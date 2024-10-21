const generateAdditionalData = (maxHeaders) => {
	const additionalDataIDKeys = {};
	const additionalActorsData = {};
	const additionalAssociatedOrgsData = {};
	const additionalAlternateTitlesData = {};
	const additionalCountriesData = {};
	const additionalMetadataAuthoritiesData = {};
	const additionalEditClassData = {};
	const additionalEditDetailsData = {};
	const additionalMadeForRegionData = {};

	for (let i = 1; i <= maxHeaders.maxAltIDs; i++) {
		// Append new Alt ID, Domain.
		additionalDataIDKeys[`Alt ID ${i}`] = "";
		additionalDataIDKeys[`Domain ${i}`] = "";
		additionalDataIDKeys[`Relation ${i}`] = "";
	}
	for (let i = 1; i <= maxHeaders.maxActors; i++) {
		additionalActorsData[`Actor ${i}`] = "";
	}
	for (let i = 1; i <= maxHeaders.maxAssociatedOrgs; i++) {
		additionalAssociatedOrgsData[`Associated Org ${i}`] = "";
		additionalAssociatedOrgsData[`Role ${i}`] = "";
		additionalAssociatedOrgsData[`Party ID ${i}`] = "";
	}
	for (let i = 1; i <= maxHeaders.maxAlternateTitles; i++) {
		additionalAlternateTitlesData[`Alternate Title ${i}`] = "";
		additionalAlternateTitlesData[`Alt Title Language ${i}`] = "";
		additionalAlternateTitlesData[`Alt Title Class ${i}`] = "";
	}
	for (let i = 1; i <= maxHeaders.maxCountryOfOrigin; i++) {
		additionalCountriesData[`Country of Origin ${i}`] = "";
	}
	for (let i = 1; i <= maxHeaders.maxMetadataAuthority; i++) {
		additionalMetadataAuthoritiesData[`Metadata Authority ${i}`] = "";
		additionalMetadataAuthoritiesData[`Metadata Authority Party ID ${i}`] = "";
	}
	for (let i = 1; i <= maxHeaders.maxEditClass; i++) {
		additionalEditClassData[`Edit Class ${i}`] = "";
	}
	for (let i = 1; i <= maxHeaders.maxEditDetails; i++) {
		additionalEditDetailsData[`Edit Details ${i}`] = "";
		additionalEditDetailsData[`Edit Domain ${i}`] = "";
	}
	for (let i = 1; i <= maxHeaders.maxMadeForRegion; i++) {
		additionalMadeForRegionData[`Made for Region ${i}`] = "";
	}

	return {
		additionalDataIDKeys,
		additionalActorsData,
		additionalAssociatedOrgsData,
		additionalAlternateTitlesData,
		additionalCountriesData,
		additionalMetadataAuthoritiesData,
		additionalEditClassData,
		additionalEditDetailsData,
		additionalMadeForRegionData,
	};
};

export default generateAdditionalData;
