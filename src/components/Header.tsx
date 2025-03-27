import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between">
      <Link
        href="/youtube"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-foreground/80 sm:text-sm",
          pathname === "/youtube"
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        YouTube
      </Link>
      <Link
        href="/youtube-alt"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-foreground/80 sm:text-sm",
          pathname === "/youtube-alt"
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        YouTube Alt
      </Link>
    </div>
  );
};

export default Header; 