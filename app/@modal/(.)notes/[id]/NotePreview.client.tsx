"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

interface NotePreviewProps {
    id: string;
}

export default function NotePreviewClient({ id }: NotePreviewProps) {
    const router = useRouter();
    const handleClickBack = () => {
        router.back();
    };
    const {
        data: note,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
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
        <Modal onClose={handleClickBack}>
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{note.title}</h2>
                    </div>
                    <p className={css.content}>{note.content}</p>
                    <p className={css.tag}>{note.tag}</p>
                    <p className={css.date}>Created: {note.createdAt}</p>
                    <button className={css.btn} onClick={handleClickBack}>
                        Back
                    </button>
                </div>
            </div>
        </Modal>
    );
}
