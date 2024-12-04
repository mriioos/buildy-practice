const DEFAULT_OPTION_SIZE = 50;

export default function IconsSelector({ size, rows, options }) {

    // State that handles the selected option
    const [selected, setSelected] = useState(0);

    // Get number of columns based on the number of options and fixed rows 
    const cols = Math.floor(options.length / rows);

    // Calc height of each option
    const option_size = DEFAULT_OPTION_SIZE * size;

    return (
        <div className="absolute">
            <div className={`grid grid-rows-{${rows}} gap-4`}>
                {options.map((option, index) => (
                    <div onClick={() => { setSelected(index); option.handler}}>
                        <div className={`bg-[url('${option.imageURL}')] bg-cover bg-center`}></div>
                    </div>
                ))}
            </div>
            <div style={{ top: `calc(5% + ${cols * option_size})`}} className="relative top-{} left-{}"></div>
        </div>
    );
}