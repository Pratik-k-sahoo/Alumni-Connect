import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const buildClassNames = (...values) => {
	return twMerge(clsx(values));
};
