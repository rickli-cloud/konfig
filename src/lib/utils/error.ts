export class ConfigurationError extends Error {
	public readonly name: string;
	public readonly message: string;
	public readonly stack?: string | undefined;

	constructor(message: string) {
		super(message);
		this.name = 'ConfigurationError';
		this.message = message;
	}
}
