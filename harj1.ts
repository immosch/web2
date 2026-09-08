// Define UserStatus type here
export type UserStatus = "active" | "inactive" | "pending";

// Define Coordinate tuple type here
export type Coordinate = [latitude: number, longitude: number];

// Define UserProfile interface or type alias here
export interface UserProfile {
	readonly id: number;
	user: string;
	email: string;
	location: Coordinate;
	status: UserStatus;
	bio?: string;
}

// Implement createUser function
export function createUser(
	id: number,
	username: string,
	email: string,
	location: Coordinate,
): UserProfile {
	return {
		id,
		user: username,
		email,
		location,
		status: "pending",
	};
}

const johnDoe = createUser(
	1,
	"john_doe",
	"john_doe@example.com",
	[40.7128, -74.006],
);

console.log(johnDoe);
