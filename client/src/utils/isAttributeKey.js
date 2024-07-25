const isAttributeKey = (key) => {
	if (
		key === "Edit Details Domain 1" ||
		key === "Language Mode 1" ||
		key === "Associated Org Role 1" ||
		key === "Associated Org Party ID 1" ||
		key === "Associated Org Role 2" ||
		key === "Associated Org Party ID 2" ||
		key === "Associated Org Role 3" ||
		key === "Associated Org Party ID 3" ||
		key === "Title Language" ||
		key === "Title Class"
	) {
		return true;
	}
	return false;
};

export default isAttributeKey;
