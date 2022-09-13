export type ProductProps = {
    title: string,
    description?: string,
    categories?: string[],
    product_categories: string | number,
    product_sizes: string | number,
    bucket: string,
    bucket_folder: string,
    price: number,
}