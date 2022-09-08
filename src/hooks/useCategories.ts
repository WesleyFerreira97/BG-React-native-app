import { PostgrestError } from "@supabase/supabase-js";
import { useState } from "react";
import { supaDb } from "../services/supadb";

type CategoriesProps = {
    id: string,
    created_at: Date,
    title: string,
    slug: string,
}

type CategoriesHookProps = {
    allCategories: CategoriesProps[] | null,
    categoriesError: PostgrestError | null,
}

export function useCategories() {
    const [categoriesData, setCategoriesData] = useState<CategoriesHookProps>();

    async function getAllCategories() {
        const { data, error } = await supaDb
            .from<any>('categories')
            .select();

        setCategoriesData({
            allCategories: data,
            categoriesError: error,
        })
    }

    getAllCategories();

    return { categoriesData }
}