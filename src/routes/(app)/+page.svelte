<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Sheet from '$lib/components/ui/sheet';
	import { buttonVariants, Button } from '$lib/components/ui/button';

	import { generateKubeconfig } from '$lib/utils/kubeconfig.js';
	import { Copy, Download, User } from 'lucide-svelte';
	import { getUserInfo, sessionStore, type SessionData } from '$lib/store/session';
	import { stringify } from 'yaml';

	function getExpiry(session: SessionData | undefined) {
		const expiry = getUserInfo(session)?.exp;
		return expiry ? new Date((expiry as number) * 1000).toLocaleString() : void 0;
	}
</script>

<Card.Root class="h-full w-full min-w-64 max-w-screen-lg sm:h-auto">
	<Card.Header>
		<Card.Title>Kubeconfig</Card.Title>
		<Card.Description class="flex items-center justify-between gap-1">
			Session expires:

			<span class="rounded bg-muted px-1.5 py-0.5 text-foreground">
				{getExpiry($sessionStore)}
			</span>
		</Card.Description>
	</Card.Header>

	<Card.Content class="space-y-4">
		<pre class="overflow-x-scroll"><code>{generateKubeconfig()}</code></pre>

		<div class="grid grid-cols-2 items-center gap-2">
			<a
				href={'data:text/plain;charset=utf-8,' + encodeURIComponent(generateKubeconfig())}
				download="kubeconfig.yaml"
				class={buttonVariants({ variant: 'ghost' }) + ' flex items-center gap-1.5'}
			>
				<Download class="h-4 w-4" />
				Download
			</a>

			<Button
				class="flex items-center gap-1.5"
				variant="ghost"
				on:click={() => {
					navigator.clipboard.writeText(generateKubeconfig());
				}}
			>
				<Copy class="h-4 w-4" />
				Copy
			</Button>
		</div>
	</Card.Content>

	<Card.Header>
		<Card.Title>ID Token</Card.Title>
		<Card.Description>
			Kubectl lets you pass in a token using the
			<span class="rounded bg-muted px-1.5 py-0.5 text-foreground">--token</span>
			option
		</Card.Description>
	</Card.Header>

	<Card.Content class="space-y-4">
		<!-- prettier-ignore -->
		<pre class="whitespace-normal break-words" style="word-break: break-all;"><code>{$sessionStore?.token}</code></pre>

		<div class="grid grid-cols-2">
			<Button
				class="flex items-center gap-1.5"
				variant="ghost"
				on:click={() => {
					$sessionStore?.token ? navigator.clipboard.writeText($sessionStore.token) : void 0;
				}}
			>
				<Copy class="h-4 w-4" />
				Copy
			</Button>

			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button builders={[builder]} class="flex items-center gap-1.5" variant="ghost">
						<User class="h-4 w-4" />
						Claims
					</Button>
				</Sheet.Trigger>

				<Sheet.Content side="right">
					<Sheet.Header>
						<Sheet.Title>Token claims</Sheet.Title>
					</Sheet.Header>

					<pre class="mt-4 overflow-x-scroll"><code>{stringify(getUserInfo())}</code></pre>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</Card.Content>
</Card.Root>
