const isAttributeKey = (key) => {
	const patterns = [
		/^Edit Details Domain \d+$/,
		/^Language Mode \d+$/,
		/^Associated Org$/,
		/^Role$/,
		/^Party ID$/,
		/^Title Language$/,
		/^Title Class$/,
	];

	return patterns.some((pattern) => pattern.test(key));
};

export default isAttributeKey;
