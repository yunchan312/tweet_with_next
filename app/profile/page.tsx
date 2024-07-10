import Button from "@/components/button";
import db from "@/lib/database";
import getSession from "@/lib/session";
import { ok } from "assert";
import { notFound, redirect } from "next/navigation";

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
};

const logOutExe = async () => {
  "use server";
  const session = await getSession();
  await session.destroy();
  redirect("/login");
};

export default async function Profile() {
  const user = await getUser();
  return (
    <div className="container">
      <div className="pageTitle">PROFILE</div>
      <div>Welcome!! 🔥{user?.username}</div>
      <form action={logOutExe}>
        <Button text="Logout" />
      </form>
    </div>
  );
}
