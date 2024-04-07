import { Routes, Route } from "react-router-dom";
import { SignIn } from "@/app/pages/sign-in";
import { Dashboard } from "@/app/pages/dashboard";
import { AuthProvider } from "@/app/contexts/auth";
import { ProtectedRoute } from "@/app/components/protected-route";
import { Register } from "@/app/pages/register";
import { ThemeProvider } from "@/app/contexts/theme";
import { Links } from "@/app/pages/links";
import { Index } from "@/app/pages";
import { Collections } from "@/app/pages/collections";
import { Settings } from "@/app/pages/settings";
import { Toaster } from "@/components/ui/sonner";
import { Collection } from "./app/pages/collection";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="bio-ui-theme">
      <AuthProvider>
        <Routes>
          <Route index element={<Index />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="register" element={<Register />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="links"
            element={
              <ProtectedRoute>
                <Links />
              </ProtectedRoute>
            }
          />
          <Route
            path="collections"
            element={
              <ProtectedRoute>
                <Collections />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="collections/:hash" element={<Collection />} />
    
          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

        </Routes>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}