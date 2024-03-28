import React, { useEffect } from 'react'
import { ToggleGroup } from '../ToggleGroup';
import { Field, useField } from 'formik';
import { CheckboxInput } from '../CheckboxInput';
import { Text, View } from 'react-native';
import { styles } from './style';

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

type RenderSizesProps = {
    inputData: { [key: string]: boolean };
    type: string;
}

const ChekboxesGroup = ({ inputData, type }: RenderSizesProps) => {
    // if (type !== 'letter' && type !== 'numeric') {
    //     return (
    //         <Text>Tipo de input incompatível</Text>
    //     )
    // }

    return Object.keys(inputData[type]).map((inputName, key) => {
        const currentInputValue: boolean = inputData[type][inputName]

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


function SelectSize({ availableSizes, sizeType, ...props }: SelectSizeProps) {
    console.log(sizeType, "size type props");

    return (
        <View>
            <Field name="type_product_sizes" >
                {({ field, form, meta }) => (
                    <ToggleGroup
                        label="Tamanhos disponíveis :"
                        name="type_product_sizes"
                        toggleValues={[
                            { label: 'Letras', value: 'letter' },
                            { label: 'Numérico', value: 'numeric' }
                        ]}
                        value={field.value}
                    />
                )}
            </Field>
            <Field name="sizes_available" >
                {({ field, form, meta }) => {
                    const currentSizeType = form.values.type_product_sizes;
                    const allSizes = field.value;

                    return (
                        <>
                            <View style={currentSizeType == "letter" ? {} : styles.hiddenField}>
                                <ChekboxesGroup
                                    inputData={allSizes}
                                    type={"letter"}
                                />
                            </View>
                            <View style={currentSizeType == "numeric" ? {} : styles.hiddenField}>
                                <ChekboxesGroup
                                    inputData={allSizes}
                                    type={"numeric"}
                                />
                            </View>
                        </>
                    )
                }}
            </Field>
        </View>
    )
}


export { mapDefaultValues, size_letter, size_numeric, SelectSize }