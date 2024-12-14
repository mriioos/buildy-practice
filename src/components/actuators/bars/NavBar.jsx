
// Object that maps the position of the NavBar to the corresponding class names
const pos_to_class = {
    top: 'top-0 left-0 flex-row w-full',
    right: 'right-0 top-0 flex-col h-full',
    bottom: 'bottom-0 left-0 flex-row w-full',
    left: 'left-0 top-0 flex-col h-full',
}

export default function NavBar({ position, className, children }) {
    
    // Hide trigger?

    // Hide actuator?

    return (
        <nav className={`flex ${pos_to_class[position]} ${className}`}>
            {children}
        </nav>
    );
}