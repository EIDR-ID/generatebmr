import GenerateTemplate from "./GenerateTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const GeneratedTable = ({ dataConfig }) => {
	const handleDownloadClick = (list) => {
		const data = list.join("\n");
		const blob = new Blob([data], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "EIDR_List.txt";
		a.click();
		URL.revokeObjectURL(url);
	};
	return (
		<table className='min-w-full divide-y divide-gray-200 mt-6'>
			<thead className='bg-gray-50'>
				<tr>
					{dataConfig.sections.map((section) => (
						<th
							key={section.name}
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
						>
							<div>
								{" "}
								{section.name}: {section.list?.length}
								{section.list?.length > 0 && (
									<button
										onClick={() => handleDownloadClick(section.list)}
										className='group'
									>
										<FontAwesomeIcon
											icon={faDownload}
											className='text-gray-500 hover:text-gray-700 ml-2'
										/>
										<span className='absolute left-1/2 transform -translate-x-1/2 -bottom-8 w-auto p-2 bg-black text-white text-xs rounded-md scale-0 group-hover:scale-100 transition-transform duration-150 ease-in-out'>
											Download the file list
										</span>
									</button>
								)}
							</div>

							{section.hasTemplate ? (
								<GenerateTemplate
									xmlArray={section.xmlArray}
									buttonName={section.buttonName}
									templateFormat={section.templateFormat}
								/>
							) : (
								<div> </div>
							)}
						</th>
					))}
				</tr>
			</thead>
			<tbody className='bg-white divide-y divide-gray-200'>
				<tr>
					{dataConfig.sections.map((section) => (
						<td key={section.name} className='px-6 py-4 whitespace-nowrap'>
							{section.list?.length > 0 &&
								section.list.map((eidr_id, index) => (
									<div key={index}>{eidr_id}</div>
								))}
						</td>
					))}
				</tr>
			</tbody>
		</table>
	);
};
export default GeneratedTable;
