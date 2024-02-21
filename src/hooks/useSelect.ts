import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supaDb } from "../services/supadb";

type UseSelectProps = {
    tableName: string;
    select: string[];
    match?: string;
    limit?: number;
}

export function useSelect<T>({ tableName, select, match, ...props }: UseSelectProps) {
    const [selectResponse, setSelectResponse] = useState<T | null>(null);
    const [selectResponseError, setSelectResponseError] = useState<PostgrestError>();

    const selectedColumns = select.join(',');
    const matchParams = match ? { id: match } : {};

    useEffect(() => {
        async function useSelect() {
            const { data, error } = await supaDb
                .from(tableName)
                .select(selectedColumns)
                .match(matchParams)
                .limit(props.limit)

            setSelectResponse(data as T);
            setSelectResponseError(error);
        }

        useSelect();
    }, [match]);

    return { selectResponse, selectResponseError };
}