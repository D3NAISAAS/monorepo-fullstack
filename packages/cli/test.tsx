import test from 'ava';
import chalk from 'chalk';
import { render } from 'ink-testing-library';
import React from 'react';
import App from './source/app';

test('greet unknown user', t => {
	const { lastFrame } = render(<App fromScope="@repo/" toScope="@d3n/" />);

	t.is(lastFrame(), `Hello, ${chalk.green('Stranger')}`);
});

test('greet user with a name', t => {
	const { lastFrame } = render(<App fromScope="@repo/" toScope="@d3n/" />);

	t.is(lastFrame(), `Hello, ${chalk.green('Stranger')}`);
});
