import { useEffect, useState } from "react";
import { sectionColors, SectionColorsNames, SectionProps } from "../screens/AddProduct/AddProductStepTwo/sectionColors";
import { FileObject } from "../@types/supabase";

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

        setGallerySections(prev => [
            ...prev,
            {
                ...sectionColors[sectionSlug],
                images: [...images]
            }
        ]);

        return;
    }

    const addImages = (sectionSlug: SectionColorsNames, images: FileObject[]) => {
        if (!gallerySections.some(section => section.slug === sectionSlug)) {
            handleNewSection(sectionSlug, images);
            return;
        }

        // let sectionIndex = gallerySections.findIndex(section => section.slug === sectionSlug);
        // // console.log(sectionIndex, " Section Index");

        // gallerySections.forEach(item => {
        //     console.log(item.slug, " loop slug ");

        // })


        // addImagesByIndex(sectionIndex, images);
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


    return { handleNewSection, gallerySections, addImages, error }
}