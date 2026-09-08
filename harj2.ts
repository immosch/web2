export interface Circle {
	kind: "circle";
	radius: number;
}

export interface Rectangle {
	kind: "rectangle";
	width: number;
	height: number;
}

export interface Square {
	kind: "square";
	size: number;
}

export type Shape = Circle | Rectangle | Square;

export function isCircle(shape: Shape): shape is Circle {
	// Implement custom type guard
	return shape.kind === "circle";
}

export function calculateArea(shape: Shape): number {
	switch (shape.kind) {
		case "circle":
			return Math.PI * shape.radius * shape.radius;
		case "rectangle":
			return shape.width * shape.height;
		case "square":
			return shape.size * shape.size;
		default:
			const exhaustiveCheck: never = shape;
			return exhaustiveCheck;
	}
}

console.log(calculateArea({ kind: "circle", radius: 5 }));
