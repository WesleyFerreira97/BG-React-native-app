import React, { useEffect, useState } from 'react'
import { supaDb } from '../services/supadb'
import { PostgrestError } from '@supabase/supabase-js';

type CreateBucketTypes = {
    data: any;
    error: PostgrestError | null;

}

export function useCreateBucket() {
    const [createBucketResponse, setCreateBucketResponse] = useState<T | null>(null);
    const [createBucketError, setCreateBucketError] = useState<PostgrestError>();

    useEffect(() => {
        async function createBucket() {
            const { data, error } = await supaDb
                .storage
                .createBucket('avatars', {
                    public: false,
                    allowedMimeTypes: ['image/png'],
                    fileSizeLimit: 1024
                })
        }

        createBucket()

    }, [])

    return
}
