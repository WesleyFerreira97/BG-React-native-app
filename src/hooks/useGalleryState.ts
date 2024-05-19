// Gerenciar as sessões ativas de galerias ( main, blue, purple etc...)

import { useState } from "react";
import { SectionColorsProps } from "../screens/AddProduct/AddProductStepTwo/sectionColors";

export function useGalleryState() {
    const [currentGallerySections, setCurrentGallerySections] = useState<SectionColorsProps[]>([]);

    const handleSection = (sectionProps: SectionColorsProps) => {
        const noActiveSections = (currentGallerySections.length === 0);

        if (noActiveSections) return addNewSection(sectionProps)

        const isDuplicate = currentGallerySections.some(
            section => section.name === sectionProps.name
        );

        if (isDuplicate) return setSnackBarStatus({
            state: true,
            text: "Seção Já adicionada"
        });

        addNewSection(sectionProps);
    }

    return { handleNewSection, currentGallerySections, setImages }
}


// Deve retornar ;
// Função para adicionar Galeria nova handleNewSection
// Lista de galerias ativas currentGallerySections e suas respectivas Imagens
// Função para adicionar imagens a galerias especificas setImages