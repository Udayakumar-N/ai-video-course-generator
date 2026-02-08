import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const email = user.primaryEmailAddress.emailAddress;

    // try inserting directly
    const newUser = await db
      .insert(usersTable)
      .values({
        email,
        name: user.fullName ?? "Anonymous",
      })
      .onConflictDoNothing({ target: usersTable.email })
      .returning();

    // if inserted successfully
    if (newUser.length > 0) {
      return NextResponse.json(newUser[0]);
    }

    // otherwise fetch existing user
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    return NextResponse.json(existingUser[0]);
  } catch (error) {
    console.error("CREATE USER ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
