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
    const [fileUploadResponse, setFileUploadResponse] = useState<PostgrestResponse<T> | unknown>();

    useEffect(() => {
        if (!file) return;

        supaDb.storage
            .from("photo")
            .upload(`public/news/${file.data._parts[0][1].name}`, file.data)
            .then((res) => {
                setFileUploadResponse(res);
            });

    }, [file]);


    return { fileUploadResponse, setFile };
}