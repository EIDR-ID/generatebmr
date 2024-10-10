import React, { useState, useEffect } from "react";
import "./App.css";
import GenerateFormInput from "./components/GenerateFormInput";
import determineFormatType from "./utils/determineFormatType";
import GeneratedTable from "./components/GeneratedTable";
import GenerateFileInput from "./components/GenerateFileInput";
import { generateDataConfig } from "./utils/generateDataConfig";
import LoadingModal from "./components/LoadingModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";

const App = () => {
	const [inputs, setInputs] = useState({
		eidr_id: "",
	});
	const API_URL =
		process.env.NODE_ENV === "production"
			? `${process.env.REACT_APP_DEPLOY_DOMAIN}/generatebmr/api`
			: "http://localhost:3001";

	const [user, setUser] = useState(null);
	const [loggedIn, setLoggedIn] = useState(true);
	const [searchType, setSearchType] = useState("");
	const [editEIDRList, setEditEIDRList] = useState([]);
	const [eidrErrorList, setEidrErrorList] = useState([]);
	const [nonEpisodicList, setNonEpisodicList] = useState([]);
	const [episodicList, setEpisodicList] = useState([]);
	const [unknownList, setUnknownList] = useState([]);
	const [editXML, setEditXML] = useState([]);
	const [episodicXML, setEpisodicXML] = useState([]);
	const [nonEpisodicXML, setNonEpisodicXML] = useState([]);
	const [unknownXML, setUnknownXML] = useState([]);
	const [hasEditFormat, setHasEditFormat] = useState(false);
	const [hasEpisodic, setHasEpisodic] = useState(false);
	const [hasNonEpisodic, setHasNonEpisodic] = useState(false);
	const [hasUnknown, setHasUnknown] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isForm, setIsForm] = useState(true);
	const [dataConfig, setDataConfig] = useState({ sections: [] });
	const [modBase, setModBase] = useState(null);
	const [error, setError] = useState(null);
	const [selectedOption, setSelectedOption] = useState("sandbox1");
	const [loginError, setLoginError] = useState("");
	const [loginInfo, setLoginInfo] = useState({
		username: "10.5238/mli",
		password: "ygw9F8hOxlJCPvBK",
		partyID: "10.5237/9241-BC57",
	});
	useEffect(() => {
		const getUser = async () => {
			try {
				console.log("Before retrieving user");
				setLoading(true);
				const response = await fetch(`${API_URL}/auth/login/success`, {
					credentials: "include",
				});
				const content = await response.json();
				if (content.user) {
					setUser(content.user);
					setLoggedIn(true);
				}
				console.log("After retrieving user");
				setLoading(false);
			} catch (error) {
				setLoginError("Error logging in");
				console.log("Login Error: ", error);
				setLoading(false);
			}
		};
		getUser();
	}, []);

	useEffect(() => {
		setDataConfig(
			generateDataConfig(
				episodicList,
				hasEpisodic,
				episodicXML,
				nonEpisodicList,
				hasNonEpisodic,
				nonEpisodicXML,
				editEIDRList,
				hasEditFormat,
				editXML,
				unknownList,
				hasUnknown,
				unknownXML,
				eidrErrorList
			)
		);
	}, [
		episodicList,
		hasEpisodic,
		episodicXML,
		nonEpisodicList,
		hasNonEpisodic,
		nonEpisodicXML,
		editEIDRList,
		hasEditFormat,
		editXML,
		unknownList,
		hasUnknown,
		unknownXML,
		eidrErrorList,
	]);

	const handleLoading = (bool) => {
		setLoading(bool);
	};
	const handleFormChange = () => {
		setIsForm((prev) => !prev);
	};

	const handleLogin = (e) => {
		const { name, value } = e.target;
		setLoginInfo((prev) => ({
			...prev,
			[name]: value,
		}));
		setLoginError(false);
	};

	const handleLogout = () => {
		// Your logout logic here, e.g., clearing tokens, redirecting, etc.
		console.log("User logged out");
		setLoggedIn(false);
	};

	const handleOptionChange = (event) => {
		setEpisodicList([]);
		setHasEpisodic(false);
		setEpisodicXML([]);
		setNonEpisodicList([]);
		setHasNonEpisodic(false);
		setNonEpisodicXML([]);
		setEditEIDRList([]);
		setHasEditFormat(false);
		setEditXML([]);
		setUnknownList([]);
		setHasUnknown(false);
		setUnknownXML([]);
		setEidrErrorList([]);
		setSelectedOption(event.target.value);
	};

	const callAPI = async (query, requestOptions, eidr_id) => {
		const response = await fetch(query, requestOptions);
		if (response.status === 401) {
			setLoginError(true);
			return;
		}
		const data = await response.json();
		const text = data.xmlResp; // Changed from json() to text() to handle XML
		// console.log("Here is the text: ", text, "\n\n");
		const modBase = data.modXmlResp;
		// console.log("Here is the modBase: ", modBase);
		const parser = new DOMParser();
		const xmlDoc = await parser.parseFromString(text, "application/xml");
		const formatType = determineFormatType(xmlDoc);
		if (formatType === "Edit") {
			setEditXML((prev) => [...prev, xmlDoc]);
			setHasEditFormat(true);
			setEditEIDRList((prev) => [...prev, eidr_id]);
		} else if (formatType === "Episodic") {
			setEpisodicXML((prev) => [...prev, xmlDoc]);
			setHasEpisodic(true);
			setEpisodicList((prev) => [...prev, eidr_id]);
		} else if (formatType === "NonEpisodic") {
			setNonEpisodicXML((prev) => [...prev, xmlDoc]);
			setHasNonEpisodic(true);
			setNonEpisodicList((prev) => [...prev, eidr_id]);
		} else {
			setUnknownXML((prev) => [...prev, xmlDoc]);
			setHasUnknown(true);
			setUnknownList((prev) => [...prev, eidr_id]);
		}
	};

	const makeQuery = async (eidrId) => {
		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		};
		//let query = `https://cors-anywhere.herokuapp.com/https://proxy.eidr.org/resolve/${inputs.eidr_id}?type=Full&followAlias=false`;
		let query = "";
		query = `${API_URL}/api/resolve/${selectedOption}`;
		requestOptions = {
			...requestOptions,
			body: JSON.stringify({
				username: loginInfo.username.trim(),
				password: loginInfo.password.trim(),
				partyID: loginInfo.partyID.trim(),
				eidr_id: eidrId,
			}),
		};
		try {
			await callAPI(query, requestOptions, eidrId);
		} catch (error) {
			console.error("Error right here ", eidrId, ": ", error);
			setEidrErrorList((prev) => [...prev, eidrId]);
		}
	};
	const reset = () => {
		setInputs({
			title: "",
			eidr_id: "",
		});
	};

	return (
		<div className='bg-gradient-to-r from-gray-400 to-green-700 min-h-screen w-full py-6 flex flex-col justify-center sm:py-12 items-center'>
			{loggedIn ? (
				<div className='flex flex-col items-center justify-center'>
					<h1 className='text-4xl font-bold text-center mb-4'>
						BMR Template Generator
					</h1>
					<div className='flex flex-col w-full max-w-sm'>
						<input
							type='text'
							name='username'
							placeholder='Username'
							value={loginInfo.username}
							onChange={handleLogin}
							className='mb-4 w-full'
						/>

						<input
							type='password'
							name='password'
							placeholder='Password'
							value={loginInfo.password}
							onChange={handleLogin}
							className='mb-4 w-full'
						/>

						<input
							type='text'
							name='partyID'
							placeholder='Party ID'
							value={loginInfo.partyID}
							onChange={handleLogin}
							className='mb-4 w-full'
						/>
						{loginError && (
							<div className='mt-2 w-full flex items-center'>
								<FontAwesomeIcon
									icon={faWarning}
									className='text-red-500 mr-2'
								/>
								<span className='text-red-500'>
									Login error. Please try again.
								</span>
							</div>
						)}
					</div>

					<div className='flex w-full max-w-sm pr-0'>
						<button
							onClick={handleFormChange}
							className='text-white bg-black rounded-lg shadow-lg p-2 mt-4 transition duration-500 mr-2'
						>
							{isForm ? "Switch to File Mode" : "Switch to Text Mode"}
						</button>
						<select
							value={selectedOption}
							onChange={handleOptionChange}
							className='text-black bg-white rounded-lg shadow-lg mt-4 ml-2 transition duration-500 flex grow w-1'
						>
							<option value='' disabled>
								Select an environment
							</option>
							<option value='sandbox1'>Sandbox1</option>
							<option value='production'>Production</option>
							<option value='sandbox2'>Sandbox2</option>
						</select>
					</div>
					{selectedOption === "production" && (
						<div className='mt-2'>
							<FontAwesomeIcon
								icon={faWarning}
								className='text-yellow-500 ml-2'
							/>
							<span className='text-yellow-500'>
								You have chosen production, use with caution!
							</span>
						</div>
					)}
					<div className='flex w-full max-w-sm'>
						{isForm ? (
							<GenerateFormInput
								inputs={inputs}
								handleChange={(e) =>
									setInputs((prevState) => ({
										...prevState,
										[e.target.name]: e.target.value.trim(),
									}))
								}
								setSearchType={setSearchType}
								makeQuery={makeQuery}
								onLoading={handleLoading}
							/>
						) : (
							<GenerateFileInput
								setSearchType={setSearchType}
								makeQuery={makeQuery}
								onLoading={handleLoading}
							/>
						)}
					</div>

					{!loading && <GeneratedTable dataConfig={dataConfig} />}
					<br></br>
				</div>
			) : (
				<div className='flex flex-col items-center justify-center'>
					<Login />
					{loginError && (
						<p>There is problem with logging in, please try again</p>
					)}
					{loading && <LoadingModal modalIsOpen={loading} />}
				</div>
			)}
		</div>
	);
};

export default App;
