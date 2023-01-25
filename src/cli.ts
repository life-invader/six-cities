#!/usr/bin/env node

// Команда запуска
// ./dist/cli.js --import ./mocks/mocks-data.tsv Admin qwerty 127.0.0.1 html-academy-nodejs-1 345fdgfd34532

import 'reflect-metadata';
import CliApplication from './app/cli-application.js';
import HelpCommand from './cli-command/help-command.js';
import VersionCommand from './cli-command/version-command.js';
import ImportCommand from './cli-command/import-command.js';
import GenerateCommand from './cli-command/generate-command.js';

import type { CliCommandInterface } from './cli-command/cli-command.interface.js';

const manager = new CliApplication();

const commands: CliCommandInterface[] = [new VersionCommand(), new HelpCommand(), new ImportCommand(), new GenerateCommand()];
manager.registerCommands(commands);
manager.processCommand(process.argv);
