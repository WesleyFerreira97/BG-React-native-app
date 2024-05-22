import { useEffect, useState } from "react";
import { ProductProps } from "../@types/product";
import { PostgrestError } from "@supabase/supabase-js";
import { supaDb } from "../services/supadb";

type UseUpdateProps = {
    productId: string | number;
    data: Partial<ProductProps>;
}

export function useUpdate() {
    const [updateData, setUpdateData] = useState<UseUpdateProps>();
    const [updateResponse, setUpdateResponse] = useState<T | null>(null);
    const [updateError, setUpdateError] = useState<PostgrestError>();

    const update = async ({ data, productId }: UseUpdateProps) => {
        const { data: dataDb, error } = await supaDb
            .from('products')
            .update(data)
            .eq('id', productId);

        setUpdateResponse(dataDb);
        setUpdateError(error);
    }

    useEffect(() => {
        if (!updateData) return;

        update(updateData);
    }, [updateData]);

    return { setUpdateData, updateResponse, updateError };
}
