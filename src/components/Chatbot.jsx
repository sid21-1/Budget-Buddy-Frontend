import React, { useState } from "react";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TypingIndicator } from "@/components/ui/typing-indicator";
import { ArrowUp } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Chatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (e) => {
    const { jwtToken } = useGetUserInfo();
    e.preventDefault();
    const userPrompt = prompt;
    setPrompt("");
    setAiMessage("");
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });
      const data = await response.json();

      setAiMessage(data.data);
    } catch (error) {
      console.log("Error chatbot frontend", error);
    }
    setIsLoading(false);
  };
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className=" p-4 w-full main-div  rounded-tl-lg rounded-bl-lg font-rubik ">
          <SidebarTrigger />
          <div className=" flex w-full h-screen flex-col  items-center gap-4">
            <Card className="relative md:w-[60vw] mb-28">
              <div className="relative">
                <Textarea
                  className="w-full h-96 resize-none p-3"
                  cols={80}
                  rows={20}
                  name=""
                  id=""
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  readOnly
                />
                {isLoading && (
                  <div className="absolute top-4 left-4 px-2">
                    <TypingIndicator />
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-5 md:w-[60vw] ">
              <div>
                <form onSubmit={onSubmit} className="flex items-center gap-x-2">
                  <Input
                    value={prompt}
                    type="text"
                    required
                    placeholder="ask me anything"
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <Button type="submit">
                    <ArrowUp />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Chatbot;
