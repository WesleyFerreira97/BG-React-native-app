import React, { useEffect } from 'react'
import { ToggleGroup } from '../ToggleGroup';
import { Field } from 'formik';
import { CheckboxInput } from '../CheckboxInput';


type DefaultSizesValues = Array<string | number>;

const size_letter = ["P", "M", "G", "GG"];
const size_numeric = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43];

function mapDefaultValues(value: DefaultSizesValues) {
    return value.reduce((prevItem, currentItem) => ({ ...prevItem, [currentItem]: false }), {});
}

type SelectSizeProps = {
    sizeType: "letter" | "numeric";
    availableSizes: DefaultSizesValues;
}

function SelectSize({ availableSizes, sizeType }: SelectSizeProps) {

    const renderSizes = (type: 'letter' | 'numeric') => {
        return Object.keys(availableSizes[type]).map((inputName, key) => {
            const currentInputValue = availableSizes[type][inputName]

            return (
                <CheckboxInput
                    key={key}
                    name={`sizes_available.${type}.${inputName}`}
                    value={currentInputValue}
                    label={inputName}
                />
            )
        })
    }

    return (
        <>
            <ToggleGroup
                label="Tamanhos disponíveis :"
                name="type_product_sizes"
                toggleValues={[
                    { label: 'Letras', value: 'letter' },
                    { label: 'Numérico', value: 'numeric' }
                ]}
                value={sizeType}
            />

            <Field name="sizes_available" >
                {() => (
                    <>
                        {sizeType === 'letter' && renderSizes('letter')}
                        {sizeType === 'numeric' && renderSizes('numeric')}
                    </>
                )}
            </Field>

        </>
    )
}

export { mapDefaultValues, size_letter, size_numeric, SelectSize }
