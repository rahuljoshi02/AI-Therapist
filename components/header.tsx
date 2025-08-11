import Link from "next/link"
import { AudioWaveform } from "lucide-react";
import { ThemeToggle } from "./theme-toggle"
import { SignInButton } from "./auth/sign-in-button";

export default function Header() {
    const navItems = [
        { href: "/features", label: "Features" },
        { href: "/about", label: "About Aura" },
    ];

    return (
    <div className="w-full fixed top-0 z-50 bg-background/95 backdrop-blur">
        <div className="border-b border-primary/10"></div>
        <header className="relative max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
                <Link
                href="/"
                className="flex items-center gap-2 space-x-2 transition-opacity hover:opacity-80">
                <AudioWaveform className="h-7 w-7 text-primary animate-pulse-gentle"/>\
                <div className="flex flex-col">
                    <span className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
                        Aura3.0
                    </span>
                </div>
                </Link>

            {/* navitems*/}
            <div className="flex items-center gap-4">
                <nav className="hidden md:flex
                items-center space-x-1">
                    {navItems.map((item) => {
                        return (
                            <Link 
                            key={item.href}
                            href={item.href}
                            className="px-4 py-2 text-sm 
                            font-medium text-muted-foreground 
                            hover:text-foreground c
                            transition-colors relative group"
                            >
                                {item.label}
                                <span className="absolute
                                bottom-0 left-0 w-full h-0.5
                                bg-primary scale-x-0
                                group-hover:scale-x-100
                                transition-transform duration-200
                                origin-left" />
                            </Link>
                        )
                    })}
                    </nav>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <SignInButton />
                    </div>
                </div>
            </div>
        </header>
    </div>
    );
}