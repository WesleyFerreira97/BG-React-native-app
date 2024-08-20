import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

// const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY_ENV;
// const SUPABASE_URL = process.env.SUPABASE_URL_ENV;
const SUPABASE_URL = "https://qelkbubgpdwwhqzoqphu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyOTE0MjIxLCJleHAiOjE5NTg0OTAyMjF9.d-rjEkZOyaV04SVFGVg_xKxv_QK4N_DyOpDZyXUlLsg";
const public_storage = "https://qelkbubgpdwwhqzoqphu.supabase.co/storage/v1/object/public";

const supaDb = createClient(
    SUPABASE_URL as string,
    SUPABASE_ANON_KEY as string
);

export { supaDb, public_storage }

