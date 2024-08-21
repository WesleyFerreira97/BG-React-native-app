import { useEffect, useState } from "react";
import { ProductProps } from "../@types/product";
import { PostgrestError } from "@supabase/supabase-js";
import { supaDb } from "../services/supadb";

type UseUpdateProps = {
    productId: string | number;
    formData: Partial<ProductProps>;
}

type ResponseProps = {
    status: number;
    statusText: string;
    data: string | null;
}

type ResponseErrorProps = {
    error: "" | null;
}

export function useUpdate() {
    const [updateData, setUpdateData] = useState<UseUpdateProps>();
    const [updateResponse, setUpdateResponse] = useState<ResponseProps | null>(null);
    const [updateError, setUpdateError] = useState<ResponseErrorProps | null>(null);

    const update = async ({ formData, productId }: UseUpdateProps) => {
        const { status, statusText, data, error } = await supaDb
            .from('products')
            .update(formData)
            .eq('id', productId);

        setUpdateResponse({ status, statusText, data });
        setUpdateError(error as unknown as ResponseErrorProps);
    }

    useEffect(() => {
        if (!updateData) return;

        update(updateData);
    }, [updateData]);

    return { setUpdateData, updateResponse, updateError };
}
