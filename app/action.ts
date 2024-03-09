"use server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Client } from "pg";
import bcrypt from "bcryptjs";
import * as jose from "jose";

export async function singuptologin(currentState: any, formdata: FormData) {
  "use server";

  let dorediract = false;
  const username = formdata.get("username");
  const email = formdata.get("email");
  let password = formdata.get("password");

  console.log(username, email, password);
  const client = new Client(process.env.DATABASE_URL);
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  await client.connect();

  try {
    //@ts-ignore
    if (pattern.test(email) && password.length > 8) {
      //@ts-ignore
      password = bcrypt.hashSync(password, 8);

      const res = await client.query(
        `INSERT INTO rajinda_schema.userdev (email,password,username) VALUES ('${email}','${password}','${username}')`
      );
      dorediract = true;
    } else {
      return { message: "email or password incorcet" };
    }
  } catch (err) {
    return { message: "database error" };
  } finally {
    await client.end();
  }

  if (dorediract) {
    redirect("/login");
  }
}

export async function login(currentState: any, formdata: FormData) {
  "use server";
  const client = new Client(process.env.DATABASE_URL);

  let id = "";
  const email = formdata.get("email");
  const password = formdata.get("password");
  let dorediract = false;
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  await client.connect();

  try {
    //@ts-ignore
    if (pattern.test(email) && password.length > 8) {
      const resExist = await client.query(`
        SELECT EXISTS ( SELECT email FROM rajinda_schema.userdev WHERE email = '${email}');`);

      console.log(resExist.rows);

      if (!resExist.rows[0].exists) {
        return { message: "Invalid email address" };
      }
      const res = await client.query(
        `SELECT id,email,username,password FROM rajinda_schema.userdev WHERE email = '${email}';`
      );

      const isCorectePassword = bcrypt.compareSync(
        //@ts-ignore
        password,
        res.rows[0].password
      );

      if (!isCorectePassword) {
        return { message: "Invalid password" };
      } else {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        const alg = "HS256";

        const jwt = await new jose.SignJWT()
          .setProtectedHeader({ alg })
          .setExpirationTime("72h")
          .setSubject(res.rows[0].id)
          .sign(secret);

        id = res.rows[0].id;
        dorediract = true;

        cookies().set("Authorization", jwt, {
          secure: true,
          httpOnly: true,
          expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
          path: "/",
          sameSite: "strict",
        });
      }
    }
  } catch (err) {
    return { message: "database error" };
  } finally {
    await client.end();
  }

  if (dorediract) {
    redirect(`/profile/${id}`);
  }
}
