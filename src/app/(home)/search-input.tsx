"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon, XIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { useSearchParam } from '@/hooks/use-search-param'
const SearchInput = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [search, setSearch] = useSearchParam()
    const [value, setValue] = useState(search)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const handleClear = () => {
        setValue('')
        setSearch('')
        inputRef.current?.blur()
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearch(value)
        inputRef.current?.blur()
    }
  return (
    <div className='flex flex-1 items-center justify-center'>
        <form className='relative max-w-[720px] w-full' onSubmit={handleSubmit}>
            <Input ref={inputRef} value={value} onChange={handleChange} placeholder='Search...' className='md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,0.3),0_1px_3px_1px_rgba(65,69,73,0.15)] focus-visible:outline-none focus-visible:ring-0 focus:bg-white rounded-full h-[48px] bg-[#f0f4f8]'/> 
            <Button className='left-3 top-1/2 -translate-y-1/2 absolute [&_svg]:size-5 rounded-full' type='submit' variant={'ghost'} size={'icon'}>
                <SearchIcon/>
            </Button>
            {value && (
                <Button onClick={handleClear} className='right-3 top-1/2 -translate-y-1/2 absolute [&_svg]:size-5 rounded-full' type='button' variant={'ghost'} size={'icon'}>
                    <XIcon className='rotate-90'/>
                </Button>
            )}
        </form>
    </div>
  )
}

export default SearchInput