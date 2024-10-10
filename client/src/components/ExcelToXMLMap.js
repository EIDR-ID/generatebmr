const excelToXMLMap = {
	"Parent EIDR/Row ID": "Parent",
	"Structural Type": "StructuralType",
	"Referent Type": "ReferentType",
	Title: "ResourceName",
	"Release Date": "ReleaseDate",
	"Actor 1:": "Actor",
	"Actor 2:": "Actor",
	"Actor 3:": "Actor",
	"Actor 4:": "Actor",
	"Director 1": "Director",
	"Director 2": "Director",

	"Alt ID 1": "AlternateID",
	"Domain 1": "Domain1",
	"Relation 1": "Relation1",
	"Alt ID 2": "AlternateID",
	"Domain 2": "Domain2",
	"Relation 2": "Relation2",
	"Alt ID 3": "AlternateID",
	"Domain 3": "Domain3",
	"Relation 3": "Relation3",
	"IMDb Relation": "IMDbRelation",
	"ISAN Relation": "ISANRelation",
	"Description Language": "DescriptionLanguage",
	"Registrant Extra": "RegistrantExtra",
	"Operator's Notes": "Operator'sNotes",
	"Assigned EIDR ID": "ID",
	"Registration Errors & Notes": "RegistrationErrors&Notes",
	"Edit Use": "EditUse",
	"Color Type": "ColorType",
	"In 3D": "ThreeD",
	"Edit Class": "EditClass",
	"Unique Row ID": "UniqueRowID",
	"Edit Class 1": "EditClass",
	"Edit Class 2": "EditClass",
	"Edit Class 3": "EditClass",
	"Made for Region 1": "MadeForRegion",
	"Made for Region 2": "MadeForRegion",
	"Made for Region 3": "MadeForRegion",
	"Edit Details 1": "EditDetails",
	"Edit Details Domain 1": "XMLAttribute", // The data is an attribute of Edit Details 1, so marks this field as an XML attribute
	"Title Language": "XMLAttribute",
	"Title Class": "XMLAttribute",
	"Version Language 1": "VersionLanguage",
	"Language Mode 1": "XMLAttribute", // The data is an attribute of Version Language 1, so marks this field as an XML attribute
	"Alternate Title 1": "AlternateTitle1",
	"Alt Title Language 1": "AltTitleLanguage1",
	"Alt Title Class 1": "AltTitleClass1",
	"Country of Origin 1": "CountryOfOrigin",
	"Associated Org 1": "AssociatedOrg",
	"Associated Org Role 1": "XMLAttribute",
	"Associated Org Party ID 1": "XMLAttribute",
	"Associated Org 2": "AssociatedOrg",
	"Associated Org Role 2": "XMLAttribute",
	"Associated Org Party ID 2": "XMLAttribute",
	"Associated Org 3": "AssociatedOrg",
	"Associated Org Role 3": "XMLAttribute",
	"Associated Org Party ID 3": "XMLAttribute",
	"Metadata Authority 1": "MetadataAuthority1",
	"Metadata Authority Party ID 1": "MetadataAuthorityPartyID1",
	"Publication Status": "Status",
	"Approx Length": "ApproximateLength",
	//Extra Keys in Episodic below
	Mode: "Mode",
	"End Date": "EndDate",
	"Time Slot": "TimeSlot",
	"Series Class": "SeriesClass",
	"Season Class 1": "SeasonClass",
	"Episode Class 1": "EpisodeClass",
	"Number Required": "NumberRequired",
	"Date Required": "DateRequired",
	"Original Title Required": "OriginalTitleRequired",
	"Original Language 1": "OriginalLanguage",
	"Language Mode 1": "XMLAttribute",
	"Season No.": "SequenceNumber",
	"Distribution No.": "md:DistributionNumber",
	"Dist. No. Domain": "DistNoDomain",
	"House No.": "md:HouseSequence",
	"House No. Domain": "HouseNoDomain",
	"Alternate No. 1": "AlternateNo1",
	"Alt. No. Domain 1": "AltNoDomain1",
	Registrant: "Registrant",
	IMDb: "IMDb",
	ISAN: "ISAN",
	Description: "Description",
	"Alternate Title 2": "AlternateTitle2",
	"Alt Title Language 2": "AltTitleLanguage2",
	"Alt Title Class 2": "AltTitleClass2",
};

export default excelToXMLMap;
