import TopBar from "@/components/actuators/bars/TopBar"

/**
 * Component that wraps the main content of the layout to add the top bar with the page name
 * @param {*} page_title 
 */
// Este patrón me parece terrible pero no se me ocurre otra forma de hacer lo que quiero sin sacrificar mil horas de trabajo
export default function MainContentLayout({ title, subtitle, children }){
    return (
        <>
            <TopBar page_title={title} page_subtitle={subtitle}/> {/* Top Bar */}
            <section className="flex-grow flex"> {/* Main Content */}
                {children}
            </section>
        </>
    )
}