export default function ContentPad({ className, innerClassName, children }) {
    return (
        <div className={`flex-grow flex justify-center items-center m-2 shadow-md rounded-sm bg-white ${className || ''}`}>
            <div className={`flex flex-col p-4 w-full h-full overflow-y-hidden ${innerClassName || ''}`}>
                {children}
            </div>
        </div>
    );
}