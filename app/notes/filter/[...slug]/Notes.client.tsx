"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import styles from "./Notes.module.css";

interface NotesClientProps {
    initialData: Awaited<ReturnType<typeof fetchNotes>>;
    tag?: string;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleSearch = useDebouncedCallback((search: string) => {
        setDebouncedSearch(search);
    }, 300);

    const handleSearchChange = (search: string) => {
        setSearch(search);
        setPage(1);
        handleSearch(search);
    };

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["notes", page, debouncedSearch, tag],
        queryFn: () =>
            fetchNotes({
                page,
                perPage: 12,
                search: debouncedSearch,
                tag,
            }),
        placeholderData: keepPreviousData,
        initialData:
            page === 1 && !debouncedSearch && !tag ? initialData : undefined,
    });

    return (
        <div className={styles.app}>
            <header className={styles.toolbar}>
                <SearchBox value={search} onChange={handleSearchChange} />
                {data && data.total_pages > 1 && (
                    <Pagination
                        currentPage={page}
                        totalPages={data.total_pages}
                        onPageChange={setPage}
                    />
                )}
                <button
                    className={styles.button}
                    type="button"
                    onClick={() => setModalIsOpen(true)}
                >
                    Create +
                </button>
            </header>
            {isLoading && !data && <Loader />}
            {isError && <ErrorMessage />}
            {isSuccess && data?.data?.length > 0 ? (
                <NoteList notes={data.data} />
            ) : (
                !isLoading && <p>No notes found</p>
            )}

            {modalIsOpen && (
                <Modal onClose={() => setModalIsOpen(false)}>
                    <NoteForm onClose={() => setModalIsOpen(false)} />
                </Modal>
            )}
        </div>
    );
}
