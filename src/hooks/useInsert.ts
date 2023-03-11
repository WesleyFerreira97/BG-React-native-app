import type { PostgrestError, PostgrestResponse } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { supaDb } from "../services/supadb";

type InsertResponseProps = {
    id?: string | null;
    error: PostgrestError | null;
    status: number
}

type DbInsertReturn<T> = {
    dataResponse?: InsertResponseProps;
    setData: React.Dispatch<T>;
};

export function useInsert<T>(
    table: string
): DbInsertReturn<T> {
    // const [dataResponse, setDataResponse] = useState<PostgrestResponse<T>>();
    const [dataResponse, setDataResponse] = useState<InsertResponseProps>();
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        if (!data) return;

        supaDb.from(table)
            .insert(data)
            .then((res) => {

                setDataResponse({
                    error: res.error,
                    status: res.status
                });

            });

    }, [data]);

    return { dataResponse, setData };
}


