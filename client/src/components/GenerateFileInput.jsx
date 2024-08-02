import React, { useState } from "react";

function GenerateFileInput({ setSearchType, makeQuery, onLoading }) {
	// State to store the file content
	const [file, setFile] = useState(null);

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	const submitForm = () => {
		if (file) {
			onLoading(true); // Show loading modal
			const reader = new FileReader();
			reader.onload = (e) => {
				const fileContent = e.target.result;
				const inputsArr = fileContent
					.split("\n")
					.filter((item) => item.trim() !== "")
					.map((item) => item.trim());
				console.log("Length before: ", inputsArr.length);

				const dedupInputsArr = [...new Set(inputsArr)];
				console.log("Length after (dupes removed): ", dedupInputsArr.length); // You only need one of the record.

				setSearchType("byEidrId");
				const jobs = [];
				const jobsSize = dedupInputsArr.length / 1000;
				for (let i = 0; i < jobsSize; i++) {
					jobs.push(dedupInputsArr.slice(i * 1000, (i + 1) * 1000));
				}
				jobs.forEach((job, index) => {
					setTimeout(() => {
						for (let i = 0; i < job.length; i++) {
							makeQuery(job[i]);
						}
						if (index === jobs.length - 1) {
							onLoading(false); // Hide loading modal when all jobs are done
						}
					}, index * 25000); // Delay each call by 20000 ms more than the previous one
				});
			};
			reader.readAsText(file);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center w-full max-w-sm'>
			<div className='flex items-center bg-white py-2 shadow-md rounded-lg mt-5 w-full max-w-lg'>
				<input
					type='file'
					accept='.txt'
					onChange={handleFileChange}
					className='file:mr-4 file:py-2 file:px-4
    file:rounded-full file:border file:border-white
    file:text-sm file:font-semibold
    file:text-black-700
    hover:file:bg-blue-100 hover:file:cursor-pointer'
				/>
			</div>
			<button
				type='submit'
				onClick={submitForm}
				className='grow w-full text-white bg-black rounded-lg shadow-lg p-2 mt-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'
			>
				Generate from File
			</button>
			{/* Render LoadingModal */}
		</div>
	);
}

export default GenerateFileInput;
