import { DNA } from "react-loader-spinner";

function LoadingScreen() {
	return (
		<div className="flex justify-center items-center h-60vh">
			<DNA
				visible={true}
				height="80"
				width="80"
				ariaLabel="dna-loading"
				wrapperStyle={{}}
				wrapperClass="dna-wrapper"
			/>
		</div>
	);
}

export default LoadingScreen;
