#!/usr/bin/env node
import { render } from 'ink';
import meow from 'meow';
import React from 'react';
import App from './app.js';

const cli = meow(
	`
	Usage
	  $ d3ncli <command> [options]

	Commands
	  rename-scope    Remplace un scope par un autre dans tous les fichiers du projet

	Options
	  --from          Le scope source à remplacer (par défaut: @repo/)
	  --to            Le scope cible à utiliser (par défaut: @d3nai/)
	  --help, -h      Affiche l'aide

	Examples
	  $ d3ncli rename-scope --from=@repo/ --to=@acme/
	  $ d3ncli rename-scope --from=@old-scope/ --to=@new-scope/
`,
	{
		importMeta: import.meta,
		flags: {
			from: {
				type: 'string',
				default: '@repo/',
			},
			to: {
				type: 'string',
				default: '@d3nai/',
			},
			help: {
				type: 'boolean',
				shortFlag: 'h',
			},
		},
	},
);

const [command] = cli.input;

if (cli.flags.help || !command) {
	cli.showHelp();
	process.exit(0);
}

if (command === 'rename-scope') {
	render(<App fromScope={cli.flags.from} toScope={cli.flags.to} />);
} else {
	console.error(`Commande inconnue: ${command}`);
	cli.showHelp();
	process.exit(1);
}
