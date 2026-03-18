export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-background">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent dark:from-primary/20 dark:via-secondary/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse dark:bg-primary/30" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700 dark:bg-secondary/30" />
      </div>

      <div className="flex flex-col items-center gap-6 z-10">
        {/* Animated Logo with glow effect */}
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse shadow-lg shadow-primary/50 dark:shadow-primary/70">
            <span className="text-white font-bold text-3xl">S</span>
          </div>
          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-2xl border-4 border-primary/30 animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        {/* Loading text */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold gradient-text">Loading</span>
          <div className="flex gap-1">
            <span className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>

        {/* Developer text */}
        <p className="text-muted-foreground text-sm dark:text-muted-foreground/80">
          Preparing your experience...
        </p>
      </div>
    </div>
  );
}
