// Gerenciar as sessões ativas de galerias ( main, blue, purple etc...)

import { useState } from "react";
import { sectionColors, SectionColorsNames, SectionColorsProps, SectionProps } from "../screens/AddProduct/AddProductStepTwo/sectionColors";

export function useGallery() {
    const [gallerySections, setGallerySections] = useState<SectionProps[]>([]);
    const [error, setError] = useState<any>(null);

    const handleNewSection = (sectionName: SectionColorsNames) => {
        const noActiveSections = (gallerySections.length === 0);

        if (noActiveSections) return setGallerySections(prev => [...prev, {
            ...sectionColors[sectionName],
            images: []
        }]);

        const isDuplicate = gallerySections.some(
            section => section.name === sectionName
        );

        if (isDuplicate) return setError({
            state: true,
            text: "Seção Já adicionada"
        });

        setGallerySections(prev => [...prev, {
            ...sectionColors[sectionName],
            images: []
        }]);
    }

    const addImages = (sectionName: SectionColorsNames, images: any[]) => {
        const sectionIndex = gallerySections.findIndex(
            section => section.name === sectionName
        );

        if (sectionIndex === -1) return setError({
            state: true,
            text: "Seção não encontrada"
        });

        setGallerySections(prev => {
            const newGallerySections = [...prev];
            const currentImages = newGallerySections[sectionIndex].images;

            newGallerySections[sectionIndex].images = [...currentImages, ...images];
            return newGallerySections;
        });
    }

    return { handleNewSection, gallerySections, addImages, error }
}

// handleNewSection('blue')
// setImages('blue', [image1, image2, image3])
// Deve retornar ;
// Função para adicionar Galeria nova handleNewSection
// Lista de galerias ativas currentGallerySections e suas respectivas Imagens
// Função para adicionar imagens a galerias especificas setImages


const gallerySections = {
    blue: {
        name: "Azul",
        slug: "blue",
        colorCode: "#083AA9",
        images: []
    }
}