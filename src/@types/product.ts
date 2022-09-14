export type ProductSizes = {
    P: string,
    M: string,
    G: string,
    GG: string,
}

export type ProductProps = {
    title: string,
    description?: string,
    categories?: string[],
    product_categories: string | number,
    product_sizes: ProductSizes,
    bucket: string,
    bucket_folder: string,
    price: number,
}
