import React, { useState, Component } from "react";
import RocketCore from "./RocketCore";
import _isEqual from "lodash.isequal";

// functionnal component to be memoized
const MemoizedFuction = () => {
	const [initialLaunchTime] = useState(Date.now());

	return <RocketCore initialLaunchTime={initialLaunchTime} />;
};
// export memoized components
// Prevent to render
export const FunctionalRocket = React.memo(MemoizedFuction);

export class ClassRocket extends Component {
	constructor() {
		super();

		this.state = {
			initialLaunchTime: Date.now(),
		};
	}
	shouldComponentUpdate(next) {
		return !_isEqual(next, this.props);
	}
	render() {
		const { initialLaunchTime } = this.state;

		return <RocketCore initialLaunchTime={initialLaunchTime} />;
	}
}
