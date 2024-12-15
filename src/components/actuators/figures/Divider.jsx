export default function Divider({ direction, color, width, length, margin }) {

    // Calc class names
    const classNames = `border-[${color}] 
    ${
        direction.includes('h') 
        ? `
            border-t-[${width}] border-b-[${width}]
            w-[${length}] 
            mt-${margin} mb-${margin} mr-auto ml-auto
        `
        : `
            border-l-[${width}] border-r-[${width}]
            h-[${length}]
            ml-${margin} mr-${margin} mt-auto mb-auto
        `
    }`;

    return (
        <div className={classNames}></div>
    );
}