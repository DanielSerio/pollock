import { Accordion, Box, Button, ColorInput, Divider, Grid, Group, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { ChangeEvent, useState } from 'react';
import { Plus } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../components/app/hooks';
import RemovableColorSwatch from '../../components/controls/RemovableColorSwatch';
import { addColor, removeColor } from './ArtFormSlice';

export default function ArtForm() {
  const [newColor, setNewColor] = useState<string>('#11efac')

  const handleChange = (color: string) => {
    setNewColor(color)
  }

  const imageSize: [number, number] = useAppSelector((state) => {
    const {imgHeight, imgWidth } = state.artForm
    return [imgWidth, imgHeight]
  })
  const shadowOffset: [number, number] = useAppSelector((state) => {
    const { shadowOffsetX, shadowOffsetY } = state.artForm
    return [shadowOffsetX, shadowOffsetY]
  })
  const lineWidth: [number, number] = useAppSelector((state) => {
    const { minLineWidth, maxLineWidth } = state.artForm
    return [minLineWidth, maxLineWidth]
  })
  const shadowBlur: number = useAppSelector((state) => {
    return state.artForm.shadowBlur
  })
  const shadowOpacity: number = useAppSelector((state) => {
    return state.artForm.shadowOpacity
  })
  const colors: string[] = useAppSelector((state) => {
    return state.artForm.colors
  })
  const strokeDashArray: number[] = useAppSelector((state) => {
    return state.artForm.strokeDashArray
  })
  const strokeDashOffset: number = useAppSelector((state) => {
    return state.artForm.strokeDashOffset
  })
  const passes: number = useAppSelector((state) => {
    return state.artForm.passes
  })

  const dispatch = useAppDispatch()

  const form = useForm({
    initialValues: {
      imgWidth: imageSize[0],
      imgHeight: imageSize[1],
      colors,
      shadowOffsetX: shadowOffset[0],
      shadowOffsetY: shadowOffset[1],
      shadowBlur,
      shadowOpacity,
      minLineWidth: lineWidth[0],
      maxLineWidth: lineWidth[1],
      strokeDashArray,
      strokeDashOffset,
      passes
    }
  })


  return (
    <Box component={'form'} my={'xl'}>
      <Accordion>
        <Accordion.Item label="Dimensions">
          <NumberInput 
            label="Width" 
            min={200} 
            max={2000} 
            {...form.getInputProps('imgWidth')}/>
          <NumberInput 
            label="Height" 
            min={200} 
            max={2000} 
            {...form.getInputProps('imgHeight')}/>
        </Accordion.Item>
        <Accordion.Item label="Colors">
          <Group spacing={'xs'}>
            {colors.map((color: string) => {
              return (
                <RemovableColorSwatch 
                  key={color} 
                  color={color} 
                  onDeleteClick={() => dispatch(removeColor(color))}/>
              )
            })}
          </Group>
          <Divider my={'xl'}/>
          <Box sx={{display: 'flex' }}>
            <Box sx={{ flex: 1, marginRight: '2ch' }}>
              <ColorInput defaultValue={newColor} onChange={handleChange}/>
            </Box>
            <Box sx={{ flex: 0 }}>
              <Button color={'gray'} leftIcon={<Plus />} onClick={() => dispatch(addColor(newColor))}>Add</Button>
            </Box>
          </Box>
        </Accordion.Item>
      </Accordion>
    </Box>
  );
}
