export interface Entity {
	readonly id: string;
}

export interface User extends Entity {
	name: string;
	age: number;
}

export abstract class BaseRepository<T extends Entity> {
	private items: Map<string, T> = new Map();

	protected log(action: string, entityId: string): void {
		console.log(`${action}: ${entityId}`);
	}

	public add(item: T): void {
		this.items.set(item.id, item);
		this.log("Added", item.id);
	}

	public getById(id: string): T | undefined {
		return this.items.get(id);
	}

	public getAll(): readonly T[] {
		return Array.from(this.items.values());
	}

	public abstract validate(item: T): boolean;
}

export class UserRepository extends BaseRepository<User> {
	public validate(user: User): boolean {
		return user.age >= 0 && user.name.length > 0;
	}

	public override add(user: User): void {
		if (!this.validate(user)) {
			throw new Error("Invalid user");
		}
		super.add(user);
	}
}

const rep = new UserRepository();
rep.add({ id: "1", name: "Alice", age: 30 });
rep.add({ id: "2", name: "Bob", age: 25 });

console.log(rep.getAll());
console.log(rep.getById("2"));

//rep.add({ id: "3", name: "", age: 20 }); // Throws error
