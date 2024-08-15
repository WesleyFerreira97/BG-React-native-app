import type { PostgrestResponse } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { supaDb } from "../services/supadb";

type FileProps = {
    path: string;
    // data: HTMLFormElement;
    file: any | any[];
}

type FileUploadResponseProps = {
    data: {},
    error: {
        error: string;
        message: string;
        statusCode: string;
    } | null
}

export function useFileUpload<T>() {
    const [fileUploadResponse, setFileUploadResponse] = useState<FileUploadResponseProps>(null);
    const [files, setFiles] = useState<FileProps | null>(null);

    useEffect(() => {
        if (!files) return;

        files.file.forEach((item) => {
            const fileName = item?._parts[0][1].name;

            async function asyncUpload() {
                const data: unknown = await supaDb.storage
                    .from("photo")
                    .upload(`${files?.path}/${fileName}`, item)

                setFileUploadResponse(data as FileUploadResponseProps);
            }
            asyncUpload();
        });
    }, [files]);

    return { fileUploadResponse, setFiles };
}