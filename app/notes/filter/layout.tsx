import SidebarNotes from "./@sidebar/default";
import css from "./FilterLayout.module.css";

export default function FilterLayout({
    children,
    sidebar,
}: {
    children: React.ReactNode;
    sidebar?: React.ReactNode;
}) {
    return (
        <div className={css.container}>
            <aside className={css.sidebar}>
                <SidebarNotes />
            </aside>
            <main className={css.main}>
                {children}
                {sidebar}
            </main>
        </div>
    );
}
