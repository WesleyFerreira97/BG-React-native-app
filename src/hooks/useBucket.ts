import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supaDb } from "../services/supadb";
import { FileObject } from '@supabase/storage-js'

type UseSelectProps = {
    bucketPath: string;
    selectInsideFolders: boolean;
}

export function useBucket<T>({ bucketPath, ...props }: UseSelectProps) {
    const [selectResponse, setSelectResponse] = useState<FileObject[] | null>(null);
    const [selectResponseError, setSelectResponseError] = useState<PostgrestError>();
    const [selectInsideFolders, setSelectInsideFolders] = useState<{ [key: string]: {} }>();

    useEffect(() => {
        if (!bucketPath) return;

        async function useSelect() {
            const { data, error } = await supaDb
                .storage
                .from("photo")
                .list(`${bucketPath}`, {
                    limit: 20,
                    offset: 0,
                    sortBy: { column: 'name', order: 'asc' },
                });

            if (error) {
                setSelectResponseError(error as unknown as PostgrestError);
                return;
            }

            setSelectResponse(data);

            if (props.selectInsideFolders) {
                selectFolders(data);
            }
        }

        useSelect();
    }, []);

    function selectFolders(data) {

        data.forEach((item) => {

            async function useSelect() {
                const { data, error } = await supaDb
                    .storage
                    .from("photo")
                    .list(`${bucketPath}/${item.name}`, {
                        limit: 20,
                        offset: 0,
                        sortBy: { column: 'name', order: 'asc' },
                    });

                setSelectInsideFolders(prev => ({ ...prev, [item.name]: data }))
            }

            useSelect();
        })

    }

    return { selectResponse, selectResponseError, selectInsideFolders };
}

