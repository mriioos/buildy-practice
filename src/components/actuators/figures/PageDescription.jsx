export default function PageDescription({ title, subtitle }) {
    return (
        <div className="block pointer-events-none">
            <h1 className="text-3xl font-bold text-left">{title}</h1>
            <p className="text-slate-600 text-left">{subtitle}</p>
        </div>
    );
}