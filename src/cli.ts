#!/usr/bin/env node

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
