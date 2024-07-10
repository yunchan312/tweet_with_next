import Button from "@/components/button";

export default function Home() {
  return (
    <div className="container">
      <div className="pageTitle">H O M E</div>
      <div className="flex flex-col gap-2">
        <Button text="Create Account" direction="create-account" />
        <Button text="Login" direction="login" />
      </div>
    </div>
  );
}
