import React from 'react'
import { ToggleGroup } from '../ToggleGroup';
import { Field } from 'formik';
import { CheckboxInput } from '../CheckboxInput';


type DefaultSizesValues = Array<string | number>;

const size_letter = ["P", "M", "G", "GG"];
const size_numeric = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43];

function mapDefaultValues(value: DefaultSizesValues) {
    return value.reduce((prevItem, currentItem) => ({ ...prevItem, [currentItem]: false }), {});
}

function SelectSize() {
    return (
        <>
            <ToggleGroup
                label="Tamanhos disponíveis :"
                name="type_product_sizes"
                toggleValues={[
                    { label: 'Letras', value: 'letter' },
                    { label: 'Numérico', value: 'numeric' }
                ]}
                value={values.type_product_sizes}
            />

            <Field name="sizes_available" >
                {() => (
                    <>
                        {values.type_product_sizes === 'letter' &&
                            Object.keys(values.sizes_available.letter).map((inputName, key, obj) => {
                                const currentInputValue = values.sizes_available.letter[inputName]

                                return (
                                    <CheckboxInput
                                        key={key}
                                        name={`sizes_available.letter.${inputName}`}
                                        value={currentInputValue}
                                        label={inputName}
                                    />
                                )
                            })}

                        {values.type_product_sizes === 'numeric' &&
                            Object.keys(values.sizes_available.numeric).map((inputName, key, obj) => {
                                const currentInputValue = values.sizes_available.numeric[inputName]

                                return (
                                    <CheckboxInput
                                        key={key}
                                        name={`sizes_available.numeric.${inputName}`}
                                        value={currentInputValue}
                                        label={inputName}
                                    />
                                )
                            })}
                    </>
                )}
            </Field>

        </>
    )
}

export { mapDefaultValues, size_letter, size_numeric, SelectSize }
