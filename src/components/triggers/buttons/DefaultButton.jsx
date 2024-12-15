export default function DefaultButton({ text, onClick, className }){
    
    return (
        <button onClick={onClick} className={`block h-[30px] w-[70%] bg-gradient-to-tl from-green-500 to-blue-500 rounded-[3px] mx-auto text-white ${className || ''}`}>
            {text}
        </button>
    );
}