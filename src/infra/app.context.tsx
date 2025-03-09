import { PropsWithChildren, useContext, useState } from "react";
import { usePocketbase } from "./pocketbase";
import React from "react";

interface Message {
  type: "success" | "error" | "info";
  text: string;
}

interface IAppContext {
  pocketbase: ReturnType<typeof usePocketbase>;
  theme: "light" | "dark";
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const AppContext = React.createContext<IAppContext>({} as IAppContext);

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = (props: PropsWithChildren) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const pocketbase = usePocketbase();
  const theme = "light";

  return (
    <AppContext.Provider value={{ pocketbase, theme, messages, setMessages }}>
      {props.children}
    </AppContext.Provider>
  );
};
