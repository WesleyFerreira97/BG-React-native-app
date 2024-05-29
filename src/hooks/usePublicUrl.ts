import { supaDb } from "../services/supadb";

export const usePublicUrl = async (bucketPath: string, fileName: string) => {

    const { data } = supaDb
        .storage
        .from('photo')
        .getPublicUrl(`${bucketPath}/${fileName}`);

    return data
}