import React from 'react'
import { Doc } from '../../../convex/_generated/dataModel'
import { PaginationStatus } from 'convex/react'

interface DocumentsTableProps {
    documents: Doc<"documents">[] | undefined
    loadMore: (numItems: number) => void
    status: PaginationStatus
}

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { LoaderIcon } from 'lucide-react'
import DocumentRow from './document-row'
import { Button } from '@/components/ui/button'

const DocumentsTable = ({ documents, loadMore, status }: DocumentsTableProps) => {
    return (
        <div className='max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5'>
            {documents === undefined ? (
                <div className='flex justify-center items-center h-24'>
                    <LoaderIcon className='animate-spin text-muted-foreground size-5' />
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow className='hover:bg-transparent border-none'>
                            <TableHead>Name</TableHead>
                            <TableHead>&nbsp;</TableHead>
                            <TableHead className='hidden md:table-cell'>Shared</TableHead>
                            <TableHead className='hidden md:table-cell'>Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    {documents.length > 0 ? (
                        <TableBody>
                            {documents.map((document) => (
                                <DocumentRow key={document._id} document={document} />
                            ))}
                        </TableBody>
                    ) : null}
                </Table>
            )}
            <div className='flex items-center justify-center'>
                <Button variant="ghost" size="sm" onClick={() => loadMore(5)} disabled={status !== "CanLoadMore"}>
                    {status === "CanLoadMore" ? "Load More" : "End of results"}
                </Button>
            </div>
        </div>
    )
}

export default DocumentsTable
