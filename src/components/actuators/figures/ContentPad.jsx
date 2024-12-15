export default function ContentPad({ className, children }) {
    return (
        <div className={`flex-grow flex justify-center items-center m-2 shadow-md rounded-sm bg-white ${className || ''}`}>
            <div className="flex flex-col p-4 w-full h-full overflow-y-auto">
                {children}
            </div>
        </div>
    );
}