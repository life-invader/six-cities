export interface CliCommandInterface {
  readonly name: string;
  execute(...args: string[]): void;
}
