const addDataKeys = (maxHeaders) => {
	const {
		maxAltIDs,
		maxActors,
		maxAssociatedOrgs,
		maxAlternateTitles,
		maxCountryOfOrigin,
		maxMetadataAuthority,
		maxEditClass,
		maxEditDetails,
		maxMadeForRegion,
	} = maxHeaders;
	const additionalIDKeys = {};
	const additionalActors = {};
	const additionalAssociatedOrgs = {};
	const additionalAlternateTitles = {};
	const additionalCountries = {};
	const additionalMetadataAuthorities = {};
	const additionalEditClass = {};
	const additionalEditDetails = {};
	const additionalMadeForRegion = {};

	// Don't run if you don't need any more columns than given already.
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
	for (let i = 1; i <= maxEditClass; i++) {
		additionalEditClass[`Edit Class ${i}`] = { required: "optional" };
	}
	for (let i = 1; i <= maxEditDetails; i++) {
		additionalEditDetails[`Edit Details ${i}`] = { required: "optional" };
		additionalEditDetails[`Edit Domain ${i}`] = { required: "optional" };
	}
	for (let i = 1; i <= maxMadeForRegion; i++) {
		additionalMadeForRegion[`Made for Region ${i}`] = { required: "optional" };
	}

	return {
		additionalIDKeys,
		additionalActors,
		additionalAssociatedOrgs,
		additionalAlternateTitles,
		additionalCountries,
		additionalMetadataAuthorities,
		additionalEditClass,
		additionalEditDetails,
		additionalMadeForRegion,
	};
};

export default addDataKeys;
