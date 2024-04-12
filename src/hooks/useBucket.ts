import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supaDb } from "../services/supadb";
import { FileObject } from '@supabase/storage-js'

type UseSelectProps = {
    bucketName: string;
}

export function useBucket<T>({ bucketName, ...props }: UseSelectProps) {
    const [selectResponse, setSelectResponse] = useState<FileObject[] | null>(null);
    const [selectResponseError, setSelectResponseError] = useState<PostgrestError>();

    useEffect(() => {
        async function useSelect() {
            const { data, error } = await supaDb
                .storage
                .from("photo")
                .list(`${bucketName}`, {
                    limit: 20,
                    offset: 0,
                    sortBy: { column: 'name', order: 'asc' },
                });

            // console.log(data, " bucket Data");
            // console.log(error, " bucket Error");

            if (error) {
                setSelectResponseError(error as unknown as PostgrestError);
                return;
            }

            setSelectResponse(data);
        }

        useSelect();
    }, []);

    return { selectResponse, selectResponseError };
}