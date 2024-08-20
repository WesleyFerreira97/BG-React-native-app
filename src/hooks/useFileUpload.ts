import type { PostgrestError, PostgrestResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supaDb } from "../services/supadb";

export type FileProps = {
    path: string;
    file: any | any[];
}

type FileUploadResponse = {
    path: string;
    fullPath: string;
    id: string;

}
type StorageError = {
    error: string;
    message: string;
    statusCode: string;
} | null

export function useFileUpload<T>() {
    const [fileUploadResponse, setFileUploadResponse] = useState<FileUploadResponse[]>(null);
    const [files, setFiles] = useState<FileProps[] | null>(null);
    const [uploadResponseError, setUploadResponseError] = useState<StorageError>();

    useEffect(() => {
        if (!files) return;
        let allUploadResponses = [];
        let allUploadErrors = []

        const uploadPromises = files.map(async (item) => {
            let hasNoImage = item.file?.length === 0

            if (hasNoImage) return;

            const imageUploadPromises = item.file.map(async (image) => {
                const fileName = image._parts[0][1].name;

                try {
                    const { data, error } = await supaDb.storage
                        .from("photo")
                        .upload(`${item.path}/${fileName}`, image)

                    if (data) allUploadResponses.push(data)
                    // if (error) allUploadErrors.push(error)
                } catch (error) {
                    allUploadErrors.push(error)
                }
            });

            await Promise.all(imageUploadPromises);
        });

        Promise.all(uploadPromises).then(() => {
            setFileUploadResponse(allUploadResponses);
            setUploadResponseError(allUploadErrors as unknown as StorageError)
        });

    }, [files]);

    return { fileUploadResponse, setFiles, uploadResponseError };
}