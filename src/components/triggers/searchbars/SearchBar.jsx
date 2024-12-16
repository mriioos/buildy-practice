import Image from "next/image";
import { useRef, useState } from "react";
import { compareTwoStrings } from "string-similarity";
import { try_catch, select } from '@/utils/tools';

export default function SearchBar({ placeholder, searchItems, similarityFunction, similarityAcceptance, limit, searchGet }) {

    const [searchResults, setSearchResults] = useState([]);

    const inputRef = useRef();

    function handleClick() {
        if(inputRef?.current){
            search(inputRef.current.value);
        }
    }

    // Define default orderer
    function defaultSimilarityFunction(value, item){

        const stringifiedItem = select(typeof item, {
            'object' : JSON.stringify(item),
            'string' : item,
            default : item.toString()
        });

        const normalizedItem = stringifiedItem.toLowerCase();
        const normalizedValue = value.toLowerCase();

        return compareTwoStrings(normalizedItem, normalizedValue);
    }

    // Check if similarity function is defined
    const selected_similarityFunction = similarityFunction ?? defaultSimilarityFunction;

    // Define search function
    function search(value){

        console.log('Searching for:', value);

        // Get similarity for each value
        const ponderedItems = searchItems.map((item) => ({
            item : item, 
            similarity : selected_similarityFunction(value, item)
        }));

        console.log('Pondered items:', ponderedItems);

        // Sort by similarity
        const orderedResults = ponderedItems.sort((a, b) => b.similarity - a.similarity);

        // Filter by acceptance and limit
        const filteredResults = orderedResults.slice(0, limit).filter((item) => item.similarity >= similarityAcceptance)

        setSearchResults(filteredResults.map((result) => result.item));
    }

    return (
        <div className="relative h-fit w-full flex justify-center items-center">
            <div className="h-fit w-full flex gap-x-2 rounded-lg pt-1 pr-2 pb-1 pl-2 bg-gray-200 border-[2px] border-transparent focus-within:border-black transition-all">
                <Image 
                    src="/multimedia/img/icons/search.svg" 
                    alt="Search Icon" 
                    width={28} 
                    height={28} 
                    onClick={(event) => { event.stopPropagation(); handleClick(); }}
                    style={{cursor: 'pointer'}}
                />
                <input ref={inputRef} type="text" placeholder={placeholder} className="block bg-gray-200 focus:outline-none w-full"/>
            </div>
            {searchResults.length > 0 && 
                <select onClick={(e) => {if(searchResults.length > 0) setSearchResults([])}} className="absolute w-full h-fit top-10 left-0 rounded-md border-2 bg-white">
                    {searchResults.map((item, index) => (
                        <div key={index} className="w-[95%] h-fit ml-auto mr-auto mt-2 mb-2 p-2">
                            {Object.entries(searchGet(item)).map(([key, value]) => (
                                <p key={`${index}-${key}`}>{key} : {value}</p>
                            ))}
                        </div>
                    ))}
                </select>
            }
        </div>
    );
}