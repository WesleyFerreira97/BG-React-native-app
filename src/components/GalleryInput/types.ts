type FileFormatProps = {
    uri: string,
    name: string,
    type: string,
}

type ImageInputProps = {
    name: string;
}

type GalleryHeaderProps = {
    pickImage: () => void,
    name: string,
    color: string,
}


export { FileFormatProps, GalleryHeaderProps, ImageInputProps }