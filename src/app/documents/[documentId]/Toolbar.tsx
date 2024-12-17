"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { type ColorResult, SketchPicker } from 'react-color'
import { type Level } from "@tiptap/extension-heading"
import { useEditorStore } from "@/store/use-editor-store";
import { AlignCenter, AlignJustify, AlignLeftIcon, AlignRight, BoldIcon, ChevronDownIcon, HighlighterIcon, ImageIcon, ItalicIcon, Link2Icon, ListCollapseIcon, ListIcon, ListOrderedIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, MinusIcon, PlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SearchIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon, UploadIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
const LineHeightButton = () => {
    const { editor } = useEditorStore()
    const lineHeights = [
        {
            label: "Default",
            value: "Normal",
        },
        {
            label: "Single",
            value: "1",
        },
        {
            label: "1.15",
            value: "1.15",
        },
        {
            label: "1.5",
            value: "1.5",
        },
        {
            label: "Double",
            value: "2",
        },
        
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("h-7 min-w-7 shrink-0 flex items-center rounded-sm justify-between hover:bg-neutral-200/80 px-2 overflow-hidden text-sm")}>
                    <div className="flex items-center gap-x-2">
                        <ListCollapseIcon className="size-4" />
                    </div>
                    <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="p-1 flex flex-col gap-y-1">
                {lineHeights.map(({ label, value }) => (
                    <button key={value} onClick={() => editor?.chain().focus().setLineHeight(value).run()} className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80", editor?.getAttributes("paragraph").lineHeight === value && "bg-neutral-200/80")}>
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const FontSizeButton = () => {
    const { editor } = useEditorStore()
    const currentFontSize = editor?.getAttributes("textStyle").fontSize
        ? editor?.getAttributes("textStyle").fontSize.replace("px", "") : "16"
    const [fontSize, setFontSize] = useState(currentFontSize)
    const [inputValue, setInputValue] = useState(fontSize)
    const [isEditing, setIsEditing] = useState(false)
    const updateFontSize = (newSize: string) => {
        const size = parseInt(newSize)
        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run()
            setFontSize(newSize)
            setInputValue(newSize)
            setIsEditing(false)
        }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const handleInputBlur = () => {
        updateFontSize(inputValue);
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            updateFontSize(inputValue);
            editor?.commands.focus()
        }
    }
    const increment = () => {
        const newSize = parseInt(fontSize) + 1
        updateFontSize(newSize.toString())
    }
    const decrement = () => {
        const newSize = parseInt(fontSize) - 1
        if (newSize > 0) {
            updateFontSize(newSize.toString())
        }

    }
    return (
        <div className="flex items-center gap-0.5">
            <button onClick={decrement} className={cn("h-7 w-7 shrink-0 flex items-center rounded-sm justify-between hover:bg-neutral-200/80 px-2")}>
                <MinusIcon className="size-4" />
            </button>

            {isEditing ? (
                <input type="text" value={inputValue} onChange={handleInputChange} onBlur={handleInputBlur} onKeyDown={handleKeyDown} className={cn("h-7 w-10 text-sm  rounded-sm border border-neutral-400 text-center bg-transparent focus:outline-none focus:ring-0 px-2")} />
            ) : (
                <button onClick={() => { setIsEditing(true); setFontSize(currentFontSize); }} className={cn("h-7 w-10 text-sm  rounded-sm border border-neutral-400 text-center bg-transparent cursor-text px-2")}>
                    {currentFontSize}
                </button>
            )}
            <button onClick={increment} className={cn("h-7 w-7 shrink-0 flex items-center rounded-sm justify-between hover:bg-neutral-200/80 px-2")}>
                <PlusIcon className="size-4" />
            </button>
        </div>
    )
}
const ListButton = () => {
    const { editor } = useEditorStore()
    const lists = [
        {
            label: "Bullet List",
            icon: ListIcon,
            isActive: () => editor?.isActive("bulletList"),
            onClick: () => editor?.chain().focus().toggleBulletList().run()
        },
        {
            label: "Ordered List",
            icon: ListOrderedIcon,
            isActive: () => editor?.isActive("orderedList"),
            onClick: () => editor?.chain().focus().toggleOrderedList().run()
        },

    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("h-7 min-w-7 shrink-0 flex items-center rounded-sm justify-between hover:bg-neutral-200/80 px-2 overflow-hidden text-sm")}>
                    <div className="flex items-center gap-x-2">
                        <ListIcon className="size-4" />
                    </div>
                    <ChevronDownIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="p-1 flex flex-col gap-y-1">
                {lists.map(({ label, icon: Icon, onClick, isActive }) => (
                    <button key={label} onClick={onClick} className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80", isActive() && "bg-neutral-200/80")}>
                        <Icon className="size-4" />
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const AlignButton = () => {
    const { editor } = useEditorStore()
    const alignments = [
        {
            label: "Align Left",
            value: "left",
            icon: AlignLeftIcon
        },
        {
            label: "Align Center",
            value: "center",
            icon: AlignCenter
        },
        {
            label: "Align Right",
            value: "right",
            icon: AlignRight
        },
        {
            label: "Align Justify",
            value: "justify",
            icon: AlignJustify
        },
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("h-7 min-w-7 shrink-0 flex items-center rounded-sm justify-between hover:bg-neutral-200/80 px-2 overflow-hidden text-sm")}>
                    <div className="flex items-center gap-x-2">
                        <AlignLeftIcon className="size-4" />
                    </div>
                    <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="p-1 flex flex-col gap-y-1">
                {alignments.map(({ label, value, icon: Icon }) => (
                    <button key={value} onClick={() => editor?.chain().focus().setTextAlign(value).run()} className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80", editor?.isActive({ TextAlign: value }) && "bg-neutral-200/80")}>
                        <Icon className="size-4" />
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const ImageButton = () => {
    const { editor } = useEditorStore()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [ImageUrl, setImageUrl] = useState("")

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run()
    }

    const onUpload = () => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/*"
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                const imageUrl = URL.createObjectURL(file)
                onChange(imageUrl)
            }
        }
        input.click()
    }

    const handleImageUrlSubmit = () => {
        if (ImageUrl) {
            onChange(ImageUrl)
            setImageUrl("")
            setIsDialogOpen(false)
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className={cn("h-7 min-w-7 shrink-0 flex items-center rounded-sm justify-between hover:bg-neutral-200/80 px-2 overflow-hidden text-sm")}>
                        <ImageIcon className="size-4" />
                        <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className="size-4 mr-2" />
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon className="size-4 mr-2" />
                        Paste image url
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert image url</DialogTitle>
                    </DialogHeader>
                    <Input 
                        value={ImageUrl} 
                        onChange={(e) => setImageUrl(e.target.value)} 
                        placeholder="https://example.com" 
                        onKeyDown={(e) => e.key === "Enter" && handleImageUrlSubmit()} 
                    />
                    <DialogFooter>
                        <Button onClick={handleImageUrlSubmit}>Insert</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

const LinkButton = () => {
    const { editor } = useEditorStore()
    const [value, setValue] = useState("")
    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run()
        setValue("")
    }
    return (
        <DropdownMenu onOpenChange={(open) => { if (open) { setValue(editor?.getAttributes("link").href || "") } }}>
            <DropdownMenuTrigger asChild>
                <button className={cn("h-7 min-w-7 shrink-0 flex items-center rounded-sm justify-between hover:bg-neutral-200/80 px-2 overflow-hidden text-sm")}>
                    <div className="flex items-center gap-x-2">
                        <Link2Icon className="size-4" />
                    </div>
                    <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="p-2.5 flex items-center gap-x-2">
                <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="https://example.com" />
                <Button onClick={() => onChange(value)}>Apply</Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const FontFamilyButton = () => {
    const { editor } = useEditorStore()
    const fonts = [
        {
            label: "Arial",
            value: "Arial",
        },
        {
            label: "Times New Roman",
            value: "Times New Roman",
        },
        {
            label: "Courier New",
            value: "Courier New",
        },
        {
            label: "Verdana",
            value: "Verdana",
        },
        {
            label: "Georgia",
            value: "Georgia",
        },
        {
            label: "Calibri",
            value: "Calibri",
        },
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("h-7 w-[70px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm")}>
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {fonts.map(({ value, label }) => (
                    <button key={value} className={cn(" flex items-center gap-x-2 rounded-sm px-2 py-1 text-sm hover:bg-neutral-200/80",
                        editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                    )}
                        onClick={() => {
                            editor?.chain().focus().setFontFamily(value).run()
                        }}
                        style={{ fontFamily: value }}
                    >
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const HighlightColorButton = () => {
    const { editor } = useEditorStore()
    const value = editor?.getAttributes('highlight').color || "#ffffff"
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("h-7 w-[50px] shrink-0 flex items-center rounded-sm justify-between hover:bg-neutral-200/80 px-2 overflow-hidden text-sm")}>
                    <div className="flex items-center gap-x-2">
                        <HighlighterIcon className="size-4" />
                    </div>
                    <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="p-0">
                <SketchPicker
                    color={value}
                    onChange={onChange}
                    width="224px"

                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const TextColorButton = () => {
    const { editor } = useEditorStore()
    const currentValue = editor?.getAttributes('textStyle').color || "#000000"
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("h-7 w-[40px] shrink-0 flex items-center rounded-sm justify-between hover:bg-neutral-200/80 px-2 overflow-hidden text-sm")}>
                    <div className="flex items-center gap-x-2">
                        <span className="text-base font-medium" style={{ color: currentValue }}>A</span>

                    </div>
                    <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="p-0">
                <SketchPicker
                    color={currentValue}
                    onChange={onChange}
                    width="224px"

                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const HeadingLevelButton = () => {
    const { editor } = useEditorStore()
    const headings = [
        {
            label: "Normal Text",
            value: 0,
            fontSize: "16px",
        },
        {
            label: "Heading 1",
            value: 1,
            fontSize: "32px",
        },
        {
            label: "Heading 2",
            value: 2,
            fontSize: "24px",
        },
        {
            label: "Heading 3",
            value: 3,
            fontSize: "20px",
        },
        {
            label: "Heading 4",
            value: 4,
            fontSize: "16px",
        }
    ]
    const getCurrentHeading = () => {
        for (let level = 1; level <= 4; level++) {
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`
            }
        }
        return "Normal Text"
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("h-7 w-[140px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-2 overflow-hidden text-sm font-medium")}>
                    <span className="truncate">
                        {getCurrentHeading()}
                    </span>
                    <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px] p-1.5">
                {headings.map(({ value, label, fontSize }) => (
                    <button
                        key={value}
                        className={cn(
                            "w-full flex items-center gap-x-2 rounded-sm px-2 py-1.5 text-sm hover:bg-neutral-100 transition-colors",
                            ((value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", { level: value })) &&
                            "bg-neutral-100 font-medium"
                        )}
                        onClick={() => {
                            if (value === 0) {
                                editor?.chain().focus().setParagraph().run()
                            } else {
                                editor?.chain().focus().toggleHeading({ level: value as Level }).run()
                            }
                        }}
                        style={{
                            fontSize: value === 0 ? '14px' : fontSize,
                            fontWeight: value === 0 ? 400 : 500
                        }}
                    >
                        {label}
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
interface ToolbarButtonProps {
    onClick?: () => void
    isActive?: boolean
    icon: LucideIcon;
}
const ToolbarButton = ({ icon: Icon, onClick, isActive }: ToolbarButtonProps) => {
    return <button onClick={onClick} className={cn("text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80", isActive && "bg-neutral-200/80")}><Icon className="size-4" /></button>;
}
export const Toolbar = () => {
    const { editor } = useEditorStore()
    const sections: { label: string, icon: LucideIcon, onClick: () => void, isActive?: boolean }[][] = [
        [
            {
                label: "Undo",
                icon: Undo2Icon,
                onClick: () => editor?.chain().focus().undo().run(),
            },
            {
                label: "Redo",
                icon: Redo2Icon,
                onClick: () => editor?.chain().focus().redo().run(),
            },
            {
                label: "Print",
                icon: PrinterIcon,
                onClick: () => window.print(),
            },
            {
                label: "Spell Check",
                icon: SpellCheckIcon,
                onClick: () => {
                    const current = editor?.view.dom.getAttribute("spellcheck");
                    const next = current === "false" ? "true" : "false";
                    editor?.view.dom.setAttribute("spellcheck", next);
                },
            }
        ],
        [
            {
                label: "Bold",
                icon: BoldIcon,
                isActive: editor?.isActive("bold"),
                onClick: () => editor?.chain().focus().toggleBold().run(),
            },
            {
                label: "Italic",
                icon: ItalicIcon,
                isActive: editor?.isActive("italic"),
                onClick: () => editor?.chain().focus().toggleItalic().run(),
            },
            {
                label: "underline",
                icon: UnderlineIcon,
                isActive: editor?.isActive("underline"),
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
            },
        ],
        [
            {
                label: "Comment",
                icon: MessageSquarePlusIcon,
                onClick: () => {
                    editor?.chain().focus().addPendingComment().run()
                },
                isActive: editor?.isActive("liveblocksCommentMark"),
            },
            {
                label: "List todo",
                icon: ListTodoIcon,
                onClick: () => {
                    editor?.chain().focus().toggleTaskList().run()
                },
                isActive: editor?.isActive("taskList"),
            },
            {
                label: "Remove Formatting",
                icon: RemoveFormattingIcon,
                onClick: () => {
                    editor?.chain().focus().unsetAllMarks().run()
                },
            },
        ]
    ]
    return <div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
        {sections[0].map((item) => (
            <ToolbarButton key={item.label} {...item} />
        ))}
        <Separator orientation="vertical" className=" h-6 bg-neutral-300" />
        <FontFamilyButton />
        <Separator orientation="vertical" className=" h-6 bg-neutral-300" />
        <HeadingLevelButton />
        <Separator orientation="vertical" className=" h-6 bg-neutral-300" />
        <FontSizeButton />
        <Separator orientation="vertical" className=" h-6 bg-neutral-300" />
        {sections[1].map((item) => (
            <ToolbarButton key={item.label} {...item} />
        ))}
        <TextColorButton />
        <HighlightColorButton />
        <Separator orientation="vertical" className=" h-6 bg-neutral-300" />
        <LinkButton />
        <ImageButton />
        <AlignButton />
        <LineHeightButton/>
        <ListButton />
        {sections[2].map((item) => (
            <ToolbarButton key={item.label} {...item} />
        ))}
    </div>;
};
