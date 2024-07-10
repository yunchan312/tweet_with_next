"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import { useFormState } from "react-dom";
import { createAccount } from "./action";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);
  return (
    <div className="container">
      <div className="pageTitle">CREATE ACCOUNT</div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          required
          placeholder="Username"
          errors={state?.fieldErrors.username}
        />
        <Input
          name="email"
          type="email"
          required
          placeholder="Email"
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          required
          placeholder="Password"
          errors={state?.fieldErrors.password}
        />
        <Input
          name="confirmPassword"
          type="password"
          required
          placeholder="Confirm Password"
          errors={state?.fieldErrors.confirmPassword}
        />
        <Button text="Create Account" />
      </form>
    </div>
  );
}
