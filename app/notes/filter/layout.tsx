import SidebarNotes from "./@sidebar/default";
import css from "./FilterLayout.module.css";

export default function FilterLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal?: React.ReactNode;
}) {
    return (
        <div className={css.container}>
            <aside className={css.sidebar}>
                <SidebarNotes />
            </aside>
            <main className={css.main}>
                {children}
                {modal}
            </main>
        </div>
    );
}
