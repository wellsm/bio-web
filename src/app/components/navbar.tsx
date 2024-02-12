/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Moon, Palette, Sun } from "lucide-react";
import { BR, US } from "country-flag-icons/react/3x2";
import { useTheme } from "../contexts/theme";
import { useAuth } from "../contexts/auth";
import { cn, fallback, src } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useBioStore } from "../stores/bio";
import { http } from "@/lib/api";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { LANGUAGE } from "@/languages/i18n";

export function NavBar() {
  const location = useLocation();

  const { setTheme, theme } = useTheme();
  const { onLogout } = useAuth();
  const { t, i18n } = useTranslation();

  const [bioChanges] = useBioStore((state) => [state.bioChanges]);
  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    http.get("profile").then(({ data }) => {
      setProfile(data);
    });
  }, [bioChanges]);

  const changeLanguage = (language: string): void => {
    localStorage.setItem(LANGUAGE, language);

    i18n.changeLanguage(language);
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            to="/dashboard"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname !== "/dashboard" && "text-muted-foreground"
            )}
          >
            {t('Overview')}
          </Link>
          <Link
            to="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden"
          >
            {t('Categories')}
          </Link>
          <Link
            to="/links"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname !== "/links" && "text-muted-foreground"
            )}
          >
            {t('Links')}
          </Link>
          <Link
            to="/settings"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname !== "/settings" && "text-muted-foreground"
            )}
          >
            {t("Settings")}
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {profile && (
                <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary">
                  <AvatarImage src={src(profile.avatar)} />
                  <AvatarFallback>{fallback(profile.name)}</AvatarFallback>
                </Avatar>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="px-2 py-1 text-xs">
                {t('Themes')}
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="h-[1.2rem] w-[1.2rem] mr-2" />
                {t('Light')}
                {theme === "light" && (
                  <div className="ml-2 w-2 h-2 border-1 border-white rounded-full bg-green-500"></div>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="h-[1.2rem] w-[1.2rem] mr-2" />
                {t('Dark')}
                {theme === "dark" && (
                  <div className="ml-2 w-2 h-2 border-1 border-white rounded-full bg-green-500"></div>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Palette className="h-[1.2rem] w-[1.2rem] mr-2" />
                {t('System')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="px-2 py-1 text-xs">
                {t('Languages')}
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => changeLanguage("pt_BR")}>
                <BR title="Brasil" className="h-[1.2rem] w-[1.2rem] mr-2" />
                {t('Brazil')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("en")}>
                <US title="United States" className="h-[1.2rem] w-[1.2rem] mr-2" />
                {t('United States')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onLogout()}>
                <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
                {t('Log-out')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
