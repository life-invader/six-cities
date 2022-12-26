import axios from 'axios';
import type { MockDataType } from '../types/mock-data.type';
import type { CliCommandInterface } from './cli-command.interface';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockDataType;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      const response = await axios.get<MockDataType>(url);
      this.initialData = response.data;
    } catch {
      return console.log(`Can't fetch data from ${url}.`);
    }
  }
}
