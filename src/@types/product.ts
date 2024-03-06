type ProductSizesNumber = {
    [key: number]: boolean | number;
}

type ProductSizesLetter = {
    P: number | boolean,
    M: number | boolean,
    G: number | boolean,
    GG: number | boolean,
}

type ProductTypes = ProductSizesNumber | ProductSizesLetter;

type ProductProps = {
    id?: string | number,
    title: string,
    description?: string,
    categories?: string[],
    type_product_sizes?: "letter" | "numeric",
    // product_sizes: ProductTypes[],
    product_categories: string | number,
    sizes_available?: any,
    price?: number,
    product_available: boolean,
}

type BucketProps = {
    bucket_name: string;
    bucket_folder: string;
}

type AllProductProps = ProductProps & BucketProps;


export type {
    ProductProps,
    BucketProps,
    ProductTypes,
    ProductSizesNumber,
    ProductSizesLetter,
    AllProductProps
};