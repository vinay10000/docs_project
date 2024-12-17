'use client'
import { useStorage } from '@liveblocks/react'
import TextAlign from '@tiptap/extension-text-align'
import TaskItem from '@tiptap/extension-task-item'
import Link from '@tiptap/extension-link'
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import TaskList from '@tiptap/extension-task-list'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import FontFamily from '@tiptap/extension-font-family'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import ImageResize from 'tiptap-extension-resize-image'
import { useEditorStore } from '@/store/use-editor-store'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import { FontSizeExtension } from '@/extensions/font-size'
import { LineHeightExtension } from '@/extensions/line-height'
import { Ruler } from './Ruler'
import { Threads } from './threads';
interface EditorProps{
  intialContent?: string | undefined
}
export function Editor({ intialContent }: EditorProps) {
  const leftMargin = useStorage((root)=>root.leftMargin)
  const rightMargin = useStorage((root)=>root.rightMargin)
  const { setEditor } = useEditorStore()
  const liveblocks = useLiveblocksExtension({initialContent: intialContent,offlineSupport_experimental: true})
  const editor = useEditor({
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      setEditor(editor)
    },
    onDestroy: () => {
      setEditor(null)
    },
    onUpdate: ({ editor }) => {
      setEditor(editor)
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor)
    },
    onTransaction: ({ editor }) => {
      setEditor(editor)
    },
    onFocus: ({ editor }) => {
      setEditor(editor)
    },
    onBlur: ({ editor }) => {
      setEditor(editor)
    },
    onContentError: ({ editor }) => {
      setEditor(editor)
    },
    extensions: [StarterKit.configure({history: false}), liveblocks, LineHeightExtension.configure({ types: ['paragraph', 'heading'],defaultLineHeight: 'normal' }), FontSizeExtension, TextAlign.configure({ types: ['heading', 'paragraph'] }), Color, Link.configure({openOnClick: false,autolink: true,defaultProtocol: 'https'}), Highlight.configure({ multicolor: true }), FontFamily, TextStyle, Underline, Image, ImageResize, TaskItem.configure({ nested: true }), TaskList, Table.configure({
      resizable: true,
    }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin ?? 56}px; padding-right: ${rightMargin ?? 56}px;`,
        class: 'focus:outline-none print:border-0 bg-white border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
      }
    },
  })
  return (
    <div className='size-full  overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
      <Ruler/>
      <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
        <EditorContent editor={editor} />
        <Threads editor={editor}/>
      </div>
    </div>
  )
}