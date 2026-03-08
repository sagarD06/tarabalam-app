import HomeClient from "@/components/HomeClient";

export default function Home() {
  return (
    <div className="space-y-6 w-full">
      <div className="space-y-1 text-center py-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-3xl">🌟</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Tarabalam
        </h1>
        <p className="text-base text-primary font-medium">
          Welcome! See what the universe has for you today!
        </p>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
          Select your birth star to see how the universe will support you today.
        </p>
      </div>
      <HomeClient />
    </div>
  );
}
