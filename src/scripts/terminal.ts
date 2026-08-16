/**
 * Terminal shell.
 *
 * The pre-rendered document is the only copy of the content. Commands that
 * show a section clone the corresponding `<section>` out of it, so the
 * terminal can never drift from what a crawler or a no-JS visitor reads.
 *
 * Nothing here builds HTML from strings, so a command line can't inject markup.
 */

export {};

interface CommandResult {
	/** Nodes appended to the stream. */
	nodes?: Node[];
	/** Plain text line, rendered with textContent. */
	message?: string;
	tone?: 'info' | 'error';
	/** Wipe the stream before writing. */
	clear?: boolean;
}

interface Command {
	summary: string;
	usage?: string;
	hidden?: boolean;
	run(args: string[]): CommandResult | void;
}

const PROMPT =
	document.querySelector('.prompt-line__label')?.textContent?.trim() ??
	'nishant@portfolio:~$';
const REDUCED_MOTION = window.matchMedia(
	'(prefers-reduced-motion: reduce)',
).matches;

const root = document.documentElement;
const boot = document.querySelector<HTMLElement>('.boot');
const app = document.querySelector<HTMLElement>('.terminal-app');
const screenEl = document.querySelector<HTMLElement>('.screen');
const stream = document.querySelector<HTMLElement>('#stream');
const input = document.querySelector<HTMLInputElement>('#command-input');
const ghost = document.querySelector<HTMLElement>('#command-ghost');
const doc = document.querySelector<HTMLElement>('.doc');

if (!app || !screenEl || !stream || !input || !ghost || !doc) {
	// Nothing to enhance — the watchdog in <head> restores the document view.
	throw new Error('terminal: required elements missing');
}

/** The server-rendered banner, kept so `clear` can be undone by `banner`. */
const bannerTemplate = stream.firstElementChild?.cloneNode(true) ?? null;

// ---------------------------------------------------------------------------
// Output primitives
// ---------------------------------------------------------------------------

function write(node: Node): void {
	stream!.append(node);
}

function writeText(text: string, tone: 'info' | 'error' = 'info'): void {
	const p = document.createElement('p');
	p.className = tone === 'error' ? 'msg msg--error' : 'msg';
	p.textContent = text;
	write(p);
}

function echoCommand(raw: string): void {
	const line = document.createElement('p');
	line.className = 'echo';

	const label = document.createElement('span');
	label.className = 'echo__prompt';
	label.textContent = `${PROMPT} `;

	const cmd = document.createElement('span');
	cmd.className = 'echo__cmd';
	cmd.textContent = raw;

	line.append(label, cmd);
	write(line);
}

function scrollToEnd(): void {
	screenEl!.scrollTo({
		top: screenEl!.scrollHeight,
		behavior: REDUCED_MOTION ? 'auto' : 'smooth',
	});
}

/**
 * Clone a document section for display in the stream. IDs are stripped so the
 * page never ends up with duplicates, and headings drop a level to sit under
 * the terminal's own hierarchy.
 */
function cloneSection(key: string): Node | null {
	const source = doc!.querySelector<HTMLElement>(`[data-section="${key}"]`);
	if (!source) return null;

	const clone = source.cloneNode(true) as HTMLElement;
	clone.removeAttribute('id');
	for (const el of clone.querySelectorAll('[id]')) el.removeAttribute('id');
	return clone;
}

function sectionCommand(key: string, summary: string): Command {
	return {
		summary,
		run() {
			const node = cloneSection(key);
			return node
				? { nodes: [node] }
				: { message: `Section "${key}" is unavailable.`, tone: 'error' };
		},
	};
}

// ---------------------------------------------------------------------------
// Link index — powers `open`
// ---------------------------------------------------------------------------

function slugify(value: string): string {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

/**
 * Keys come from the contact list's <dt> labels and from project slugs, never
 * from link text — link text gives you targets like `3492` (a PR number) and
 * resolves `github` to whichever repo happens to appear first in the document.
 */
function linkIndex(): Map<string, string> {
	const map = new Map<string, string>();

	const contact = doc!.querySelector<HTMLElement>('#sec-contact .definitions');
	if (contact) {
		let key = '';
		for (const child of contact.children) {
			if (child.tagName === 'DT') {
				key = slugify(child.textContent ?? '');
			} else if (child.tagName === 'DD' && key) {
				const anchor = child.querySelector<HTMLAnchorElement>('a[href]');
				if (anchor) map.set(key, anchor.href);
				key = '';
			}
		}
	}

	for (const article of doc!.querySelectorAll<HTMLElement>(
		'#sec-projects [id^="project-"]',
	)) {
		const slug = article.id.replace('project-', '');
		const first = article.querySelector<HTMLAnchorElement>('.linkrow a[href]');
		if (first) map.set(slug, first.href);
	}

	for (const [alias, target] of [
		['x', 'x-twitter'],
		['twitter', 'x-twitter'],
		['cv', 'resume'],
		['mail', 'email'],
	] as const) {
		const href = map.get(target);
		if (href && !map.has(alias)) map.set(alias, href);
	}

	return map;
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

const commands = new Map<string, Command>();

commands.set('help', {
	summary: 'List every command',
	run() {
		const wrapper = document.createElement('div');

		const intro = document.createElement('p');
		intro.className = 'msg';
		intro.textContent = 'Available commands:';
		wrapper.append(intro);

		const list = document.createElement('dl');
		list.className = 'cmdlist';
		for (const [name, command] of commands) {
			if (command.hidden) continue;
			const dt = document.createElement('dt');
			dt.textContent = command.usage ?? name;
			const dd = document.createElement('dd');
			dd.textContent = command.summary;
			list.append(dt, dd);
		}
		wrapper.append(list);

		const hint = document.createElement('p');
		hint.className = 'terminal-hint';
		hint.textContent =
			'Tab completes · ↑ ↓ walk history · Ctrl+L clears · Esc drops the suggestion';
		wrapper.append(hint);

		return { nodes: [wrapper] };
	},
});

commands.set('about', sectionCommand('about', 'Who I am and what I build'));
commands.set('skills', sectionCommand('skills', 'Languages, tools, platforms'));
commands.set('projects', sectionCommand('projects', 'Things I have shipped'));
commands.set(
	'experience',
	sectionCommand('experience', 'Internships and roles'),
);
commands.set('education', sectionCommand('education', 'Degrees and schooling'));
commands.set(
	'certs',
	sectionCommand('certs', 'Certifications and achievements'),
);
commands.set('blogs', sectionCommand('blogs', 'Posts — titles link to the full article'));
commands.set('contact', sectionCommand('contact', 'Email, socials, résumé'));

commands.set('resume', {
	summary: 'Open the résumé PDF in a new tab',
	run() {
		const href =
			doc!.querySelector<HTMLAnchorElement>('a[href$="Resume.pdf"]')?.href ??
			'/assets/Nishant_Sharma_Resume.pdf';
		window.open(href, '_blank', 'noopener');

		const p = document.createElement('p');
		p.className = 'msg';
		p.append(document.createTextNode('Opening résumé… direct link: '));
		const link = document.createElement('a');
		link.href = href;
		link.target = '_blank';
		link.rel = 'noopener';
		link.textContent = 'Nishant_Sharma_Resume.pdf';
		p.append(link);
		return { nodes: [p] };
	},
});

commands.set('ls', {
	summary: 'List the sections available here',
	run() {
		const names = [...doc!.querySelectorAll<HTMLElement>('[data-section]')].map(
			(el) => el.dataset.section!,
		);
		return { message: names.join('  ') };
	},
});

commands.set('open', {
	summary: 'Open a link — try `open github` or `open viztube`',
	usage: 'open <target>',
	run(args) {
		const index = linkIndex();
		const target = args[0]?.toLowerCase();

		if (!target) {
			return {
				message: `Usage: open <target>. Known targets: ${[...index.keys()]
					.sort()
					.join(', ')}`,
			};
		}

		const href = index.get(target);
		if (!href) {
			return {
				message: `No link called "${target}". Try: ${[...index.keys()]
					.sort()
					.join(', ')}`,
				tone: 'error',
			};
		}

		window.open(href, '_blank', 'noopener');
		return { message: `Opening ${href}` };
	},
});

commands.set('whoami', {
	summary: 'The one-line version',
	run() {
		return {
			message:
				'Nishant Sharma — backend software engineer. APIs, RAG pipelines, and the infrastructure under them.',
		};
	},
});

commands.set('neofetch', {
	summary: 'System information, terminal-style',
	run() {
		const facts: [string, string][] = [
			['host', 'nishants.dev'],
			['role', 'Backend Software Engineer'],
			['location', 'Jaipur, Rajasthan, India'],
			['uptime', 'BCA 2024 → 2027'],
			['shell', 'bash, mostly'],
			['runtime', 'Node.js · Python · JVM'],
			['storage', 'PostgreSQL + pgvector'],
			['cloud', 'AWS EC2 · Docker · Nginx'],
			['status', 'open to backend & full-stack roles'],
		];

		const list = document.createElement('dl');
		list.className = 'cmdlist';
		for (const [key, value] of facts) {
			const dt = document.createElement('dt');
			dt.textContent = key;
			const dd = document.createElement('dd');
			dd.textContent = value;
			list.append(dt, dd);
		}
		return { nodes: [list] };
	},
});

commands.set('history', {
	summary: 'Show this session’s commands',
	run() {
		if (commandHistory.length === 0) return { message: 'No history yet.' };
		const list = document.createElement('ol');
		for (const item of [...commandHistory].reverse()) {
			const li = document.createElement('li');
			li.textContent = item;
			list.append(li);
		}
		return { nodes: [list] };
	},
});

commands.set('banner', {
	summary: 'Reprint the welcome banner',
	run() {
		return bannerTemplate
			? { nodes: [bannerTemplate.cloneNode(true)] }
			: { message: 'No banner available.' };
	},
});

commands.set('clear', {
	summary: 'Clear the screen',
	run() {
		return { clear: true };
	},
});

commands.set('exit', {
	summary: 'Leave the terminal for the plain document view',
	run() {
		window.location.href = '/about';
	},
});

commands.set('echo', {
	summary: 'Print a line back',
	usage: 'echo <text>',
	hidden: true,
	run(args) {
		return { message: args.join(' ') };
	},
});

commands.set('sudo', {
	summary: 'Elevate privileges',
	hidden: true,
	run() {
		return {
			message: 'nishant is not in the sudoers file. This incident will be reported.',
			tone: 'error',
		};
	},
});

// ---------------------------------------------------------------------------
// Execution
// ---------------------------------------------------------------------------

const HISTORY_KEY = 'terminal-history';
let commandHistory: string[] = [];
let historyIndex = -1;

try {
	const stored = sessionStorage.getItem(HISTORY_KEY);
	if (stored) commandHistory = JSON.parse(stored) as string[];
} catch {
	// Private-mode storage failures are not worth surfacing.
}

function persistHistory(): void {
	try {
		sessionStorage.setItem(HISTORY_KEY, JSON.stringify(commandHistory.slice(0, 50)));
	} catch {
		/* ignore */
	}
}

function execute(raw: string, { echo = true } = {}): void {
	const trimmed = raw.trim();
	if (!trimmed) return;

	if (echo) echoCommand(trimmed);

	if (commandHistory[0] !== trimmed) {
		commandHistory.unshift(trimmed);
		persistHistory();
	}
	historyIndex = -1;

	const [name, ...args] = trimmed.split(/\s+/);
	const command = commands.get(name!.toLowerCase());

	if (!command) {
		writeText(`command not found: ${name}`, 'error');
		writeText("Type 'help' for the list of commands.");
		scrollToEnd();
		return;
	}

	const result = command.run(args) ?? {};

	if (result.clear) stream!.replaceChildren();
	if (result.message) writeText(result.message, result.tone ?? 'info');
	if (result.nodes) for (const node of result.nodes) write(node);

	scrollToEnd();
}

// ---------------------------------------------------------------------------
// Input handling
// ---------------------------------------------------------------------------

function completionsFor(value: string): string[] {
	const lower = value.toLowerCase();
	return [...commands.keys()].filter((name) => name.startsWith(lower));
}

function updateGhost(): void {
	const value = input!.value;
	if (!value || value.includes(' ')) {
		ghost!.textContent = '';
		return;
	}
	const [match] = completionsFor(value);
	ghost!.textContent = match && match !== value.toLowerCase() ? value + match.slice(value.length) : '';
}

input.addEventListener('input', updateGhost);

input.addEventListener('keydown', (event) => {
	switch (event.key) {
		case 'Enter': {
			execute(input!.value);
			input!.value = '';
			updateGhost();
			break;
		}
		case 'Tab': {
			event.preventDefault();
			const matches = completionsFor(input!.value);
			if (matches.length === 1) {
				input!.value = matches[0]!;
			} else if (matches.length > 1) {
				// Fill the shared prefix, then show the candidates.
				const prefix = matches.reduce((acc, name) => {
					let i = 0;
					while (i < acc.length && acc[i] === name[i]) i += 1;
					return acc.slice(0, i);
				});
				input!.value = prefix;
				echoCommand(`${input!.value}\t`);
				writeText(matches.join('  '));
				scrollToEnd();
			}
			updateGhost();
			break;
		}
		case 'ArrowUp': {
			event.preventDefault();
			if (historyIndex < commandHistory.length - 1) {
				historyIndex += 1;
				input!.value = commandHistory[historyIndex]!;
				updateGhost();
			}
			break;
		}
		case 'ArrowDown': {
			event.preventDefault();
			if (historyIndex > 0) {
				historyIndex -= 1;
				input!.value = commandHistory[historyIndex]!;
			} else {
				historyIndex = -1;
				input!.value = '';
			}
			updateGhost();
			break;
		}
		case 'ArrowRight': {
			// Accept the inline suggestion when the caret is at the end.
			if (
				ghost!.textContent &&
				input!.selectionStart === input!.value.length
			) {
				event.preventDefault();
				input!.value = ghost!.textContent;
				updateGhost();
			}
			break;
		}
		case 'Escape': {
			ghost!.textContent = '';
			break;
		}
		case 'l': {
			if (event.ctrlKey) {
				event.preventDefault();
				stream!.replaceChildren();
			}
			break;
		}
		case 'c': {
			if (event.ctrlKey && !window.getSelection()?.toString()) {
				event.preventDefault();
				echoCommand(`${input!.value}^C`);
				input!.value = '';
				updateGhost();
				scrollToEnd();
			}
			break;
		}
		case 'u': {
			if (event.ctrlKey) {
				event.preventDefault();
				input!.value = '';
				updateGhost();
			}
			break;
		}
	}
});

// Clicking anywhere that isn't a link or a text selection returns focus.
app.addEventListener('click', (event) => {
	const target = event.target as HTMLElement;
	if (target.closest('a, button')) return;
	if (window.getSelection()?.toString()) return;
	input!.focus();
});

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------

const BOOT_LINES = [
	'Loading kernel modules',
	'Mounting /dev/portfolio',
	'Starting network services',
	'Initialising shell environment',
	'Indexing projects and writing',
	'System ready',
];

function finishBoot(): void {
	root.dataset.terminal = 'ready';
	app!.classList.add('is-ready');

	if (boot) {
		boot.classList.add('is-done');
		window.setTimeout(() => boot.setAttribute('hidden', ''), 320);
	}

	// A command in the hash deep-links into the terminal, e.g. /#projects
	const requested = decodeURIComponent(window.location.hash.slice(1)).trim();
	if (requested && commands.has(requested.split(/\s+/)[0]!.toLowerCase())) {
		execute(requested);
	} else {
		execute('help', { echo: false });
	}

	input!.focus({ preventScroll: true });
}

function runBootSequence(): void {
	if (!boot || REDUCED_MOTION) {
		finishBoot();
		return;
	}

	BOOT_LINES.forEach((text, index) => {
		window.setTimeout(() => {
			const line = document.createElement('p');
			line.className = 'boot__line';
			const ok = document.createElement('b');
			ok.textContent = '[ OK ]';
			line.append(ok, document.createTextNode(` ${text}`));
			boot.append(line);
			if (index === BOOT_LINES.length - 1) {
				window.setTimeout(finishBoot, 220);
			}
		}, index * 160);
	});
}

runBootSequence();
