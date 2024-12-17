"use server"
import {auth,clerkClient} from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { COLORS } from "@/types/liveblocks";

export async function getUsers() {
    const {sessionClaims} = await auth();
    const clerk = await clerkClient()
    const response = await clerk.users.getUserList({
        organizationId: [sessionClaims?.org_id as string]
    })
    const users = response.data.map((user) => {
        const name = user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous";
        const nameToNumber = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const colorIndex = nameToNumber % COLORS.length;
        
        return {
            id: user.id,
            name,
            avatar: user.imageUrl,
            color: COLORS[colorIndex]
        }
    })
    return users
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getDocuments(ids:Id<"documents">[]) {
    return await convex.query(api.documents.getByIds, { ids })
}