"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullScreenLoader } from "@/components/full-screen-loader";
import { getDocuments, getUsers } from "./actions";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";
type User = {
  id: string;
  name: string;
  avatar: string;
  color: string;
};
export function Room({ children }: { children: ReactNode }) {
  const params = useParams()
  const [users, setUsers] = useState<User[]>([])
  const fetchUsers = useCallback(async () => {
    try {
      const list = await getUsers()
      setUsers(list)
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Failed to fetch users")
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])
  return (
    <LiveblocksProvider
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth"
        const room = params.documentId as string
        const res = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room }),
        })
        return await res.json()
      }}
      throttle={16}
      resolveUsers={({ userIds }) => {
        return userIds.map((userId) => users.find((user) => user.id === userId) ?? undefined)
      }}
      resolveMentionSuggestions={({text})=>{
        let filteredUsers = users
        if(text){
          filteredUsers = users.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()))
        }
        return filteredUsers.map((user) => user.id)
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<"documents">[] )
        return documents.map((document) => ({
          id : document.id,
          name : document.name
        }))
      }}
      >
      <RoomProvider id={params.documentId as string} initialStorage={{leftMargin:56,rightMargin:56}}>
        <ClientSideSuspense fallback={<FullScreenLoader label="Room loading..." />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}