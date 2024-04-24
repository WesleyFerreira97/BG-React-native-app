type SectionColorsNames = 'blue' | 'white' | 'purple';

type SectionColorsProps = {
    slug: string;
    name: string;
    color: string;
}

type f = {
    [key in SectionColorsNames]: {
        slug: string,
        name: string,
        color: string
    }
}

const sectionColors: Record<SectionColorsNames, SectionColorsProps> = {
    blue: {
        slug: 'blue',
        name: 'Azul',
        color: '#083AA9'
    },
    white: {
        slug: 'white',
        name: "Branco",
        color: '#B2B2B2',
    },
    purple: {
        slug: 'purple',
        name: "Roxo",
        color: '#3F3351',
    }
}

export { SectionColorsNames, SectionColorsProps, sectionColors }