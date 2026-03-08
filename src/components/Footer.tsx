const Footer = () => {
  return (
    <footer className="border-t border-border py-6 mt-auto">
      <div className="max-w-md mx-auto px-4 flex flex-col items-center gap-1">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>🌟</span>
          <span className="font-medium text-foreground">Tarabalam</span>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Based on Vedic astrology principles
        </p>
        <p className="text-xs text-muted-foreground">
          Built with 🤍 for family
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          © {new Date().getFullYear()} Tarabalam. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer