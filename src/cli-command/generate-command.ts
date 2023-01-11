import axios from 'axios';
import TSVFileWriter from '../common/file-writer/tsv-file-writer.js';
import OfferGenerator from '../common/offer-generator/offer-generator.js';

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
      console.log(`Can't fetch data from ${url}.`);
    }

    const offerGeneratorString = new OfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(offerGeneratorString.generate());
    }

    console.log(`File ${filepath} was created!`);
  }
}
