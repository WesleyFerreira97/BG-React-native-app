import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

// const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY_ENV;
// const SUPABASE_URL = process.env.SUPABASE_URL_ENV;
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL_ENV
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_PRIVATE_KEY
const public_storage = process.env.EXPO_PUBLIC_STORAGE_URL;

const supaDb = createClient(
    SUPABASE_URL as string,
    SUPABASE_ANON_KEY as string
);

export { supaDb, public_storage }

