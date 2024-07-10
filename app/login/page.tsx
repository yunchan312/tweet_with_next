"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useFormState } from "react-dom";
import { auth } from "./action";

export default function Login() {
  const [state, dispatch] = useFormState(auth, null);
  return (
    <div className="container">
      <div className="pageTitle">Login</div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Button text="Log in" />
      </form>
    </div>
  );
}
