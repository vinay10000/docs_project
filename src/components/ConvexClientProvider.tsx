"use client"
import { ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth,SignIn } from "@clerk/nextjs";
import { FullScreenLoader } from "./full-screen-loader";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk
        useAuth={useAuth}
        client={convex}
      >
        <Authenticated>
          {children}
        </Authenticated>
        <Unauthenticated>
          <div className="flex items-center justify-center flex-col min-h-screen">
            <SignIn routing="hash"/>
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullScreenLoader label="Loading auth..."/>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}