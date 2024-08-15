import React, { useState } from "react";
import { sectionColors, SectionColorsNames, SectionProps } from "../screens/AddProduct/AddImages/sectionColors";
import { FileObject } from "../@types/supabase";
import { FilesStrucutreProps } from "./useBucket";

type Props = {
    slug: SectionColorsNames;
    data: FileObject[]
}

export function useGallery() {
    const [gallerySections, setGallerySections] = useState<SectionProps[]>([]);
    const [error, setError] = useState<any>(null);

    const handleNewSection = (sectionSlug: SectionColorsNames, images?: FileObject[]) => {
        const sectionExists = gallerySections.some(
            section => section.slug === sectionSlug
        );

        if (sectionExists) return setError({
            state: true,
            text: "Seção Já adicionada"
        });

        const initialImages = images ? [...images] : [];

        setGallerySections(prev => [
            ...prev,
            {
                ...sectionColors[sectionSlug],
                images: initialImages,
                bucketPath: "",
                removeDbImages: () => { }
            }
        ]);

        return;
    }

    const addImages = (sectionSlug: SectionColorsNames, images: FileObject[]) => {
        let sectionIndex = gallerySections.findIndex(section => section.slug === sectionSlug);

        if (sectionIndex === -1) return setError({
            state: true,
            text: "Seção Já adicionada"
        });

        addImagesByIndex(sectionIndex, images);
    }

    const addImagesByIndex = (index: number, images: FileObject[]) => {

        setGallerySections(prev => {
            const newGallerySections = [...prev];
            const currentImages = newGallerySections[index].images || [];

            newGallerySections[index] = {
                ...newGallerySections[index],
                images: [...currentImages, ...images]
            }

            return newGallerySections;
        })
    }

    const fillGallery = (galleryData: FilesStrucutreProps[]) => {
        const out = galleryData.map(item => {
            return {
                ...sectionColors[item.slug],
                images: [...item.images],
                bucketPath: item.bucketPath,
            }
        })

        setGallerySections(out as React.SetStateAction<SectionProps[]>)
    }

    return { handleNewSection, gallerySections, addImages, error, fillGallery }
}