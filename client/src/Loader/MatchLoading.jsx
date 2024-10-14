import { MagnifyingGlass } from "react-loader-spinner";

function MatchLoading() {
	return (
		<div className="flex justify-center items-center h-60vh">
			<MagnifyingGlass
				visible={true}
				height="120"
				width="120"
				ariaLabel="magnifying-glass-loading"
				wrapperStyle={{}}
				wrapperClass="magnifying-glass-wrapper"
				glassColor="#c0efff"
				color="#28a745"
			/>
		</div>
	);
}

export default MatchLoading;
