import Link from "next/link";
import css from "./SidebarNotes.module.css";

const categories = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];

export default function SidebarNotes() {
    return (
        <aside className={css.sidebar}>
            <h3 className={css.title}>Filter by Tag</h3>
            <ul className={css.menuList}>
                {categories.map((tag) => (
                    <li key={tag} className={css.menuItem}>
                        <Link
                            href={`/notes/filter/${tag === "All" ? "All" : tag}`}
                            className={css.menuLink}
                            scroll={false}
                            replace
                        >
                            {tag}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
