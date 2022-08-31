import type { PostgrestResponse } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { supaDb } from "../services/supadb";

type FileProps = {
    name: string;
    // data: HTMLFormElement;
    data: any;
}

export function useFileUpload<T>() {
    const [file, setFile] = useState<FileProps | null>(null);
    const [fileUploadResponse, setFileUploadResponse] = useState<PostgrestResponse<T> | unknown>(null);

    useEffect(() => {
        if (!file) return;

        async function asyncUpload() {
            await supaDb.storage
                .from("photo")
                .upload(`public/${file?.name}/${file?.data._parts[0][1].name}`, file?.data)
                .then((res) => {
                    setFileUploadResponse(res);
                    console.log(res, 'res log');

                });
        }

        asyncUpload();
    }, [file]);

    return { fileUploadResponse, setFile };
}
