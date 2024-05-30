type SectionColorsNames = 'blue' | 'white' | 'purple';

type SectionColorsProps = {
    slug: SectionColorsNames;
    name: string;
    colorCode: string;
}

type f = {
    [key in SectionColorsNames]: {
        slug: string,
        name: string,
        colorCode: string
    }
}

type SectionProps = {
    images?: any[];
    bucketPath: string;
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
    }
}

export { SectionColorsNames, SectionColorsProps, sectionColors, SectionProps }