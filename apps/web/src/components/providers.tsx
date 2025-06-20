"use client";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
// import { queryClient } from "@/utils/trpc";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TRPCProvider } from "@/trpc/client";

export default function Providers({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<TRPCProvider>
				{/* <QueryClientProvider client={queryClient}> */}
				{children}
				{/* <ReactQueryDevtools /> */}
				{/* </QueryClientProvider> */}
			</TRPCProvider>
			<Toaster richColors />
		</ThemeProvider>
	);
}
