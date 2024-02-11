import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Loader } from "lucide-react";
import { SyntheticEvent, useState } from "react";
//import { useAuth } from "../contexts/auth";

export function Register() {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  //const { onLogin } = useAuth();

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();

    setIsRegister(true);

    setTimeout(() => {
      //onLogin();
    }, 2000);
  }

  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">Sign up for free!</p>
            </div>
            <div className={cn("grid gap-6")}>
              <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <Label className="font-semibold" htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isRegister}
                    />
                  </div>

                  <div className="grid gap-1">
                    <Label className="font-semibold" htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="username"
                      autoCorrect="off"
                      disabled={isRegister}
                    />
                  </div>

                  <div className="grid gap-1">
                    <Label className="font-semibold" htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="name"
                      autoCorrect="off"
                      disabled={isRegister}
                    />
                  </div>

                  <div className="grid gap-1">
                    <Label className="font-semibold" htmlFor="password">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="******"
                      autoCapitalize="none"
                      autoComplete="password"
                      autoCorrect="off"
                      disabled={isRegister}
                    />
                  </div>
                  <Button disabled={isRegister}>
                    {isRegister && (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Register
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
