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
            const { data, error } = await supaDb
                .storage
                .from(bucketName)
                .list()

            // if (error) {
            //     setSelectResponseError(error as unknown as PostgrestError);
            //     return;
            // }
            console.log(data, "data");
            console.log(error, "error");


            setSelectResponse(data as T);
        }

        useSelect();
    }, []);

    return { selectResponse, selectResponseError };
}