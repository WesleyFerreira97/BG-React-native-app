import React, { useEffect } from 'react'
import { ToggleGroup } from '../ToggleGroup';
import { Field, useField } from 'formik';
import { CheckboxInput } from '../CheckboxInput';
import { Text, View } from 'react-native';


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
        // if (type !== 'letter' && type !== 'numeric') {
        //     return (
        //         <Text>Tipo de input incompatível</Text>
        //     )
        // }
        console.log(availableSizes[sizeType]);

        // return Object.keys(availableSizes[sizeType]).map((inputName, key) => {
        //     const currentInputValue = availableSizes[type][inputName]

        //     return (
        //         <CheckboxInput
        //             key={key}
        //             name={`sizes_available.${type}.${inputName}`}
        //             value={currentInputValue}
        //             label={inputName}
        //         />
        //     )
        // })
    }

    return (
        <View>
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
                        {renderSizes(sizeType)}
                    </>
                )}
            </Field>

        </View>
    )
}

export { mapDefaultValues, size_letter, size_numeric, SelectSize }
