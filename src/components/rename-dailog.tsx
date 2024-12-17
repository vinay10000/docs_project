"use client"
import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
interface RenameDailogProps {
    documentId: Id<"documents">
    children: React.ReactNode
    initialTitle: string
}
export const RenameDailog = ({ documentId, initialTitle, children }: RenameDailogProps) => {
    const remove = useMutation(api.documents.updateById)
    const [isUpdating, setIsUpdating] = useState(false)
    const [title, setTitle] = useState(initialTitle)
    const [open, setOpen] = useState(false)
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setIsUpdating(true); remove({ id: documentId, title: title.trim() || "Untitled" }).then(() => { setOpen(false) }).catch(() => toast.error("Something went wrong")).then(() => toast.success("Document Updated")).finally(() => { setIsUpdating(false) }) }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            Rename document
                        </DialogTitle>
                        <DialogDescription>
                            Enter the new name of the document
                        </DialogDescription>
                    </DialogHeader>
                    <div className="my-4">
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Document name" onClick={(e) => e.stopPropagation()} />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" disabled={isUpdating} onClick={(e) => { e.stopPropagation(); setOpen(false) }}>Cancel</Button>
                        <Button type="submit" disabled={isUpdating} onClick={(e) => e.stopPropagation()}>Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
