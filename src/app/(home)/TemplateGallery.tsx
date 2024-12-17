"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { templates } from "@/constants/templates"
import { cn } from "@/lib/utils"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { api } from "../../../convex/_generated/api"
import { useState } from "react"
import { toast } from "sonner"

const TemplateGallery = () => {
    const router = useRouter()
    const create = useMutation(api.documents.create)
    const [isCreating, setIsCreating] = useState(false)
    const onTemplateClick = async (title: string, initialContent: string) => {
        setIsCreating(true)
        create({ title, initialContent }).then((documentId) => {
            router.push(`/documents/${documentId}`)
        })
        .catch(() => toast.error("Something went wrong"))
        .finally(() => {
            toast.success("Document Created")
            setIsCreating(false)
        })
    }
    return (
        <div className="bg-[#f1f3f4] w-full">
            <div className="max-w-screen-xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-y-6">
                <h3 className="text-lg font-medium text-gray-900">Start a new document</h3>
                <Carousel className="relative w-full">
                    <CarouselContent className="-ml-4">
                        {templates.map((template) => (
                            <CarouselItem key={template.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4">
                                <div className={cn("aspect-[3/4] flex flex-col gap-y-3", isCreating && "pointer-events-none opacity-50")}>
                                    <button
                                        disabled={isCreating}
                                        // TODO: Add initial content
                                        onClick={() => onTemplateClick(template.label, template.initialContent || "")}
                                        style={{
                                            backgroundImage: `url(${template.imageUrl})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                        className="w-full h-full hover:border-blue-500 rounded-lg border border-gray-200 hover:bg-blue-50/50 transition-all duration-200 flex flex-col items-center justify-center gap-y-4 bg-white shadow-sm hover:shadow-md"
                                    />
                                    <p className="text-sm font-medium text-gray-700 truncate px-1">{template.label}</p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}

export default TemplateGallery