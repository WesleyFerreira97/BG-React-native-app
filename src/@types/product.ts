type ProductSizesNumber = {
    [key: number]: boolean | number;
}
export type ProductSizesLetter = {
    P: number | boolean,
    M: number | boolean,
    G: number | boolean,
    GG: number | boolean,
}

export type ProductTypes = ProductSizesNumber | ProductSizesLetter;

export type ProductProps = {
    title: string,
    description?: string,
    categories?: string[],
    type_product_sizes?: string,
    product_categories: string | number,
    // product_sizes: ProductTypes[],
    product_sizes: any,
    bucket: string,
    bucket_folder: string,
    price: number,
}

