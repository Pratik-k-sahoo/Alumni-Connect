import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

import { useInView } from "framer-motion";

export default function Counter(props) {
	const ref = useRef(null);
	const isInView = useInView(ref);
	let count = useMotionValue(0);
	let rounded = useTransform(count, Math.round);

	useEffect(() => {
		console.log("In view port", isInView);
	}, [isInView]);

	useEffect(() => {
		if (isInView) {
			const animation = animate(count, props.value, { duration: 2 });
			return animation.stop;
		}
	}, [isInView]);

	return <motion.h1 ref={ref}>{rounded}</motion.h1>;
}
