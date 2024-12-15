import Image from "next/image";
import { useRef } from "react";

export default function SearchBar({ placeholder, onSearch }) {

    const inputRef = useRef();

    function handleClick() {
        if(inputRef?.current){
            onSearch(inputRef.current.value);
        }
    }

    return (
        <div className="h-fit w-full flex gap-x-2 rounded-lg pt-1 pr-2 pb-1 pl-2 bg-gray-200 border-[2px] border-transparent focus-within:border-black transition-all">
            <Image 
                src="/multimedia/img/icons/search.svg" 
                alt="Search Icon" 
                width={28} 
                height={28} 
                onClick={handleClick}
                style={{cursor: 'pointer'}}
            />
            <input ref={inputRef} type="text" placeholder={placeholder} className="block bg-gray-200 focus:outline-none w-full"/>
        </div>
    );
}