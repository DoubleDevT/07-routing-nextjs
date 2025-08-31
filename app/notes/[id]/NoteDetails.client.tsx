"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import css from "./NoteDetails.client.module.css";
import type { Note } from "@/types/note";

interface NoteDetailsClientProps {
    id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
    const params = useParams();
    const noteId = Array.isArray(params.id) ? params.id[0] : (params.id ?? id);

    const {
        data: note,
        isLoading,
        isError,
    } = useQuery<Note, Error>({
        queryKey: ["note", noteId],
        queryFn: () => fetchNoteById(noteId),
        refetchOnMount: false,
        retry: 2,
        staleTime: 60_000,
    });

    if (isLoading) {
        return (
            <div className={css.loadingContainer}>
                <p>Loading, please wait...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={css.errorContainer}>
                <p>Failed to load note details</p>
            </div>
        );
    }

    if (!note) {
        return (
            <div className={css.errorContainer}>
                <p>Note not found</p>
            </div>
        );
    }

    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{note.title}</h2>
                </div>
                <p className={css.content}>{note.content}</p>
                <div className={css.footer}>
                    <span className={css.tag}>{note.tag}</span>
                    <p className={css.date}>
                        Created: {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
