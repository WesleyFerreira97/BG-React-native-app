import { useEffect, useState } from "react";
import { supaDb } from "../services/supadb";

type UseSelectProps = {
    select: string[];
    match: string;
}

export function useSelect({ select, match }: UseSelectProps) {
    const [selectResponse, setSelectResponse] = useState();
    const [selectResponseError, setSelectResponseError] = useState();

    const selectedColumns = select.join(',');

    useEffect(() => {
        async function useSelect() {
            const { data, error } = await supaDb
                .from('products')
                .select(selectedColumns)
                .match({ id: '3ecf95f9-8c69-42e6-8c99-38ba6dcc6bdf' })

            setSelectResponse(data);
            setSelectResponseError(error);
        }

        useSelect();
    }, []);

    return { selectResponse, selectResponseError };
}
