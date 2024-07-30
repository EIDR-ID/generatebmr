const getReferentType = (baseObjectDatas) => {
	if (baseObjectDatas.length > 0) {
		const baseObjectData = baseObjectDatas[0];
		const referentTypes = baseObjectData.getElementsByTagName("ReferentType");
		if (referentTypes.length > 0) {
			const referentType = referentTypes[0].textContent;
			return referentType;
		}
	}
	return null;
};

const determineFormatType = (xmlDoc) => {
	const baseObjectDatas = xmlDoc.getElementsByTagName("BaseObjectData");
	const extraObjectMetadatas = xmlDoc.getElementsByTagName(
		"ExtraObjectMetadata"
	);
	if (baseObjectDatas.length === 0 && extraObjectMetadatas.length === 0) {
		return "Unknown";
	}
	const referentType = getReferentType(baseObjectDatas);
	if (referentType) {
		if (referentType === "Series" || referentType === "Season") {
			return "Episodic";
		}
	}

	if (extraObjectMetadatas.length == 0) {
		return "NonEpisodic";
	}
	if (extraObjectMetadatas.length > 0) {
		const extraObjectMetadata = extraObjectMetadatas[0];
		if (extraObjectMetadata.getElementsByTagName("EditInfo").length > 0) {
			return "Edit";
		} else if (
			extraObjectMetadata.getElementsByTagName("EpisodeInfo").length > 0
		) {
			return "Episodic";
		} else {
			const tags = [
				"SeriesInfo",
				"SeasonInfo",
				"ClipInfo",
				"ManifestationInfo",
				"CompilationInfo",
				"EpisodeInfo",
			];
			let hasNonEpisodicTags = true;
			for (let tag in tags) {
				const tagNames = extraObjectMetadata.getElementsByTagName(tag);
				if (tagNames.length > 0) {
					hasNonEpisodicTags = false;
					break;
				}
			}
			if (
				extraObjectMetadata.getElementsByTagName("ClipInfo").length > 0 ||
				extraObjectMetadata.getElementsByTagName("CompilationInfo").length >
					0 ||
				extraObjectMetadata.getElementsByTagName("ManifestationInfo").length > 0
			) {
				return "Unknown";
			}
			if (hasNonEpisodicTags) {
				return "NonEpisodic";
			}
		}
	}

	return "Unknown";
};
export default determineFormatType;
