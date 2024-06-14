import React from "react";

type SectionColorsNames = 'blue' | 'white' | 'purple' | 'main';

type SectionColorsProps = {
    slug: string;
    name: string;
    colorCode: string;
}

type SectionProps = {
    images?: any[];
    bucketPath: string;
    removeDbImages: (params: any) => void;
    // removeDbImages: React.Dispatch<React.SetStateAction<string[]>>;
} & SectionColorsProps;

const sectionColors: Record<SectionColorsNames, SectionColorsProps> = {
    blue: {
        slug: 'blue',
        name: 'Azul',
        colorCode: '#083AA9'
    },
    white: {
        slug: 'white',
        name: "Branco",
        colorCode: '#B2B2B2',
    },
    purple: {
        slug: 'purple',
        name: "Roxo",
        colorCode: '#3F3351',
    },
    main: {
        slug: 'main',
        name: "Imagem Principal",
        colorCode: '#3F3351',
    }
}

export { SectionColorsNames, SectionColorsProps, sectionColors, SectionProps }