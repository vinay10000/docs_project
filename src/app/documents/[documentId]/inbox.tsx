"use client"
import { ClientSideSuspense } from "@liveblocks/react"
import { BellIcon } from "lucide-react"
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui"
import { useInboxNotifications } from "@liveblocks/react/suspense"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu"
import { Separator } from "@/components/ui/separator"

export const Inbox = () => {
    return (
        <ClientSideSuspense fallback={
            <>
                <Button disabled className="relative" variant="outline" size="icon">
                    <BellIcon className="size-5 text-gray-900" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
            </>
        }
        >
            <InboxMenu />
        </ClientSideSuspense>
    )
}

const InboxMenu = () => {
    const { inboxNotifications } = useInboxNotifications()
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="relative" variant="outline" size="icon">
                        <BellIcon className="size-5 text-gray-900" />
                        {inboxNotifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 size-4 rounded-full bg-red-700 text-white flex items-center justify-center text-xs">
                                {inboxNotifications.length}
                            </span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[500px] bg-white shadow-lg rounded-md">
                    {inboxNotifications.length > 0 ? (
                        <InboxNotificationList>
                            {inboxNotifications.map((notification) => (
                                <InboxNotificationList key={notification.id}>
                                    <InboxNotification
                                        key={notification.id}
                                        inboxNotification={notification}
                                        className="text-gray-900"
                                    />
                                </InboxNotificationList>
                            ))}
                        </InboxNotificationList>
                    ) : (
                        <div className="p-4 w-full text-sm text-gray-800 text-center">No notifications</div>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            <Separator orientation="vertical" className="h-6" />
        </>
    )
}