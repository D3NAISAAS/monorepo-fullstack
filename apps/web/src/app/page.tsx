"use client"
// import { trpc } from "@/utils/trpc";
// import { useQuery } from "@tanstack/react-query";


const TITLE_TEXT = `
███████╗████████╗ █████╗ ██████╗ ████████╗███████╗██████╗     ██╗  ██╗██╗████████╗
██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔══██╗    ██║ ██╔╝██║╚══██╔══╝
███████╗   ██║   ███████║██████╔╝   ██║   █████╗  ██████╔╝    █████╔╝ ██║   ██║
╚════██║   ██║   ██╔══██║██╔══██╗   ██║   ██╔══╝  ██╔══██╗    ██╔═██╗ ██║   ██║
███████║   ██║   ██║  ██║██║  ██║   ██║   ███████╗██║  ██║    ██║  ██╗██║   ██║
╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝   ╚═╝

██████╗ ██╗   ██╗    ██████╗ ██████╗ ███╗   ██╗
██╔══██╗╚██╗ ██╔╝    ██╔══██╗╚════██╗████╗  ██║
██████╔╝ ╚████╔╝     ██║  ██║ █████╔╝██╔██╗ ██║
██╔══██╗  ╚██╔╝      ██║  ██║ ╚═══██╗██║╚██╗██║
██████╔╝   ██║       ██████╔╝██████╔╝██║ ╚████║
╚═════╝    ╚═╝       ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝
 `;

export default function Home() {
  // const healthCheck = useQuery(trpc.healthCheck.queryOptions());
  // const hello = useQuery(trpc.hello.queryOptions({
  //   text: "world Greetings",
  // }));

  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <pre className="overflow-x-auto font-mono text-sm">{TITLE_TEXT}</pre>
      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">API Status</h2>
          <div className="flex items-center gap-2">
            {/* <div className={`h-2 w-2 rounded-full ${healthCheck.data ? "bg-green-500" : "bg-red-500"}`} /> */}
            {/* <span className="text-sm text-muted-foreground">
              {healthCheck.isLoading
                ? "Checking..."
                : healthCheck.data
                  ? "Connected"
                  : "Disconnected"}
            </span> */}
          </div>
        </section>
      </div>
      <section className="p-4">
        <div className="container">
          <h1 className="text-2xl font-bold">Home Page</h1>
          <p className="font-medium py-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            natus minima exercitationem perferendis hic maxime nihil officia
            fugit, illo asperiores fugiat odit harum, dicta cumque ad atque
            assumenda! Saepe dolores repellendus animi harum ex voluptatibus
            quaerat unde obcaecati quo consequuntur sequi, autem deleniti?
            Eligendi ipsa impedit cupiditate accusantium delectus quidem.
          </p>
        </div>
      </section>
      {/* <Button>{hello.data?.greeting || "Loading..."}</Button> */}
    </div>
  );
}
