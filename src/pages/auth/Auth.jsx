import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Auth = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    userId,
    setUserId,
    isSignUp,
    setIsSignUp,
    handleMySqlEmailPassword,
    userName,
    setUserName,
  } = useAuth();
  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {isSignUp ? "Create an Account" : "Welcome Back"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleMySqlEmailPassword} className="space-y-4">
                {isSignUp && (
                  <div>
                    <Label htmlFor="name">User Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                variant="link"
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full text-center"
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Auth;
