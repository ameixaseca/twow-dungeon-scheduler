import { useState } from "react";
import { Input, Button } from "../core";
import { useAppContext } from "../infra/app.context";
import { ClientResponseError } from "pocketbase";
import { useNavigate } from "react-router";

export const Login = () => {
  const [login, setLogin] = useState<Login>({ username: "", password: "" });

  const navigate = useNavigate();
  const { pocketbase, setMessages } = useAppContext();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await pocketbase.auth(login);
      navigate("/");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        setMessages([{ type: "error", text: "Invalid username or password" }]);
      }
      console.error(error);
    }
  }

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen">

      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          type="text"
          name="username"
          value={login.username}
          onChange={(e) => setLogin({ ...login, username: e.target.value })}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />

        <Button type="submit">Login</Button>
      </form>
    </div>
    </>
  );
};

export interface Login {
  username: string;
  password: string;
}
