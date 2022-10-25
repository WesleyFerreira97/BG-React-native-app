import type { PostgrestResponse } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { supaDb } from "../services/supadb";

type FileProps = {
    path: string;
    // data: HTMLFormElement;
    file: any | any[];
}

type ResponseUploadProps = {
    uploadFileData: {
        Key: string;
    } | null,
    uploadFileError: Error | null
}

export function useFileUpload<T>() {
    const [file, setFile] = useState<FileProps | null>(null);
    // Optional with array
    const [files, setFiles] = useState<FileProps | null>(null);
    const [fileUploadResponse, setFileUploadResponse] = useState<PostgrestResponse<T> | unknown>(null);

    useEffect(() => {
        if (!file) return;

        async function asyncUpload() {
            await supaDb.storage
                .from("photo")
                .upload(`${file?.path}/${file?.file._parts[0][1].name}`, file?.file)
                .then((res) => {
                    setFileUploadResponse(res);
                });
        }

        asyncUpload();
    }, [file]);

    useEffect(() => {
        if (!files) return;

        files.file.forEach((item) => {
            const fileName = item?._parts[0][1].name;

            async function asyncUpload() {
                await supaDb.storage
                    .from("photo")
                    .upload(`${files?.path}/${fileName}`, item)
                    .then((res) => {
                        setFileUploadResponse(res);
                        console.log(res, 'res log');
                    });
            }
            asyncUpload();
        });
    }, [files]);

    return { fileUploadResponse, setFile, setFiles };
}

export async function useFileUploadAlt(file: FileProps): Promise<ResponseUploadProps> {

    const { data, error } = await supaDb
        .storage
        .from("photo")
        .upload(`products/${file?.path}/${file?.file._parts[0][1].name}`, file?.file)

    return { uploadFileData: data, uploadFileError: error }
}