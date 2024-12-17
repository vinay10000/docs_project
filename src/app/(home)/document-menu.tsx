import { Button } from '@/components/ui/button'
import { ExternalLinkIcon, FilePenIcon, MoreVerticalIcon, TrashIcon } from 'lucide-react'
import React from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Id } from '../../../convex/_generated/dataModel'
import { RemoveDailog } from '@/components/remove-dailog'
import { RenameDailog } from '@/components/rename-dailog'
interface DocumentMenuProps {
    documentId: Id<"documents">
    title: string
    onNewTabClick: (id: Id<"documents">) => void
}
const DocumentMenu = ({ documentId, title, onNewTabClick }: DocumentMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className='rounded-full' variant="ghost" size="icon">
                    <MoreVerticalIcon className='size-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <RenameDailog documentId={documentId} initialTitle={title}>
                    <DropdownMenuItem onSelect={(e) => { e.preventDefault() }} onClick={(e) => e.stopPropagation()}>
                        <FilePenIcon className="mr-2 h-4 w-4" />
                        Rename
                    </DropdownMenuItem>
                </RenameDailog>
                <RemoveDailog documentId={documentId}>
                    <DropdownMenuItem onSelect={(e) => { e.preventDefault() }} onClick={(e) => e.stopPropagation()}>
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Remove
                    </DropdownMenuItem>
                </RemoveDailog>
                <DropdownMenuItem onClick={() => onNewTabClick(documentId)}>
                    <ExternalLinkIcon className="mr-2 h-4 w-4" />
                    Open in a new tab
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DocumentMenu
