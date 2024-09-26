declare module '*.bmp' {
	const src: string;
	export default src;
}

declare module '*.gif' {
	const src: string;
	export default src;
}

declare module '*.jpg' {
	const src: string;
	export default src;
}

declare module '*.jpeg' {
	const src: string;
	export default src;
}

declare module '*.png' {
	const src: string;
	export default src;
}

declare module '*.webp' {
	const src: string;
	export default src;
}

declare module '*.svg' {
	import type * as React from 'react';

	export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

	const src: string;
	export default src;
}

declare module '*.module.css' {
	const classes: Readonly<Record<string, string>>;
	export default classes;
}

declare module '*.scss' {
	const classes: Readonly<Record<string, string>>;
	export default classes;
}
declare module '*.module.scss' {
	const classes: Readonly<Record<string, string>>;
	export default classes;
}

declare module '*.less' {
	const content: { [className: string]: string };
	export default content;
}

declare module '*.module.less' {
	const classes: Readonly<Record<string, string>>;
	export default classes;
}
