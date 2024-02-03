import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supaDb } from "../services/supadb";

type UseSelectProps = {
    bucketName: string;
}

export function useBucket<T>({ bucketName, ...props }: UseSelectProps) {
    const [selectResponse, setSelectResponse] = useState<T | null>(null);
    const [selectResponseError, setSelectResponseError] = useState<PostgrestError>();

    useEffect(() => {
        async function useSelect() {
            const { } = await supaDb
                .storage
                .from(bucketName)

            // setSelectResponse(data as T);
            // setSelectResponseError(error);
        }

        useSelect();
    }, []);

    return { selectResponse, selectResponseError };
}