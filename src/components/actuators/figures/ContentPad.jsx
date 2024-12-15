export default function ContentPad({ className, children }) {
    return (
        <div className={`flex-grow flex justify-center items-center m-4 shadow-md rounded-sm bg-white ${className || ''}`}>
            {children}
        </div>
    );
}