"use client"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface RemoveDailogProps {
    documentId: Id<"documents">
    children: React.ReactNode
}
export const RemoveDailog = ({ documentId, children }: RemoveDailogProps) => {
    const remove = useMutation(api.documents.removeById)
    const router = useRouter()
    const [isRemoving, setIsRemoving] = useState(false)

    const onDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsRemoving(true);
        
        try {
            toast.success("Document deleted");
            router.replace("/");
            router.refresh();
            await remove({ id: documentId });
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
            setIsRemoving(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction 
                        disabled={isRemoving} 
                        onClick={onDelete}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
