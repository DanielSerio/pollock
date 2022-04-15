import { Accordion, Box, Button, ColorInput, Divider, Group, NumberInput, TextInput, useMantineColorScheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, Plus, ColorSwatch, Shadow, Line, RefreshDot, Refresh } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../components/app/hooks';
import RemovableColorSwatch from '../../components/controls/RemovableColorSwatch';
import { addColor, removeColor, setImageSize, setLineWidth, setPasses, setShadowBlur, setShadowOffset, setShadowOpacity, setStrokeDashArray, setStrokeDashOffset } from './ArtFormSlice';

export default function ArtForm() {
  const [newColor, setNewColor] = useState<string>('#11efac')
  const { colorScheme } = useMantineColorScheme()
  const handleChange = (color: string) => {
    setNewColor(color)
  }

  const iconColor = useMemo(() => colorScheme === 'dark' ? 'rgb(100,100,100)' : 'rgb(200,200,200)', [colorScheme])

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

  const setDimensions = useCallback(() => {
    dispatch(setImageSize([form.values.imgWidth, form.values.imgHeight]))
  }, [form])

  const handleShadowOffset = useCallback(({ x, y }: {x?: true, y?: true}) => {
    if (x) dispatch(setShadowOffset({x: form.values.shadowOffsetX}))
    if (y) dispatch(setShadowOffset({y: form.values.shadowOffsetY}))
  }, [form])
  const setBlur = useCallback(() => {
    dispatch(setShadowBlur(form.values.shadowBlur))  
  }, [form])

  const setOpacity = useCallback(() => {
    dispatch(setShadowOpacity(form.values.shadowOpacity))  
  }, [form])

  const handleLineWidth = useCallback(({ min, max }: {min?: true, max?: true}) => {
    const { minLineWidth, maxLineWidth } = form.values
    if (min) dispatch(setLineWidth({min: minLineWidth})) 
    if (max) dispatch(setLineWidth({max: maxLineWidth}))   
  }, [form])

  const handleStrokeDashArray = useCallback(() => {
    const { strokeDashArray } = form.values
    dispatch(setStrokeDashArray(strokeDashArray))
  }, [form])

  const handleStrokeDashOffset = useCallback(() => {
    const { strokeDashOffset } = form.values
    dispatch(setStrokeDashOffset(strokeDashOffset))
  }, [form])

  const handlePasses = useCallback(() => {
    const { passes } = form.values
    dispatch(setPasses(passes))
  }, [form])


  return (
    <Box component={'form'} my={'xl'}>
      <Accordion>
        <Accordion.Item 
          icon={<Dimensions color={iconColor}/>} 
          label="Dimensions">
          <NumberInput 
            label="Width" 
            min={200} 
            max={2000} 
            {...form.getInputProps('imgWidth')}
            onBlur={setDimensions}/>
          <NumberInput 
            label="Height" 
            min={200} 
            max={2000} 
            {...form.getInputProps('imgHeight')}
            onBlur={setDimensions}/>
        </Accordion.Item>
        <Accordion.Item 
          icon={<ColorSwatch color={iconColor} />} 
          label="Colors">
          <Group spacing={'xs'} mt={'sm'}>
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
        <Accordion.Item 
          icon={<Shadow color={iconColor} />} 
          label="Shadows">
          <NumberInput 
            label="Offset X" 
            {...form.getInputProps('shadowOffsetX')}
            onBlur={() => handleShadowOffset({ x: true })}/>
          <NumberInput 
            label="Offset Y" 
            {...form.getInputProps('shadowOffsetY')}
            onBlur={() => handleShadowOffset({ y: true })}/>
          <NumberInput 
            label="Blur" 
            {...form.getInputProps('shadowBlur')}
            onBlur={setBlur}/>
          <NumberInput 
          label="Opacity" 
          min={0} 
          max={100} 
          step={1} 
          {...form.getInputProps('shadowOpacity')}
          onBlur={setOpacity}/>
        </Accordion.Item>
        <Accordion.Item 
          icon={<Line color={iconColor}/>} 
          label="Lines">
          <NumberInput 
            label="Minimum Line Width" 
            {...form.getInputProps('minLineWidth')}
            onBlur={() => handleLineWidth({ min: true })}/>
          <NumberInput 
            label="Maximum Line Width" 
            {...form.getInputProps('maxLineWidth')}
            onBlur={() => handleLineWidth({ max: true })}/>
          <TextInput 
            label="Stroke Dasharray (comma separated)" 
            {...form.getInputProps('strokeDashArray')}
            onBlur={handleStrokeDashArray}/>
          <NumberInput 
          label="Stroke Dashoffset" 
          {...form.getInputProps('strokeDashOffset')}
          onBlur={handleStrokeDashOffset}/>
        </Accordion.Item>
        <Accordion.Item 
          icon={<RefreshDot color={iconColor} />} 
          label="Passes">
          <NumberInput 
            label="Passes" 
            {...form.getInputProps('passes')}
            onBlur={handlePasses}/>
        </Accordion.Item>
      </Accordion>
      <Group my={'xl'} pl={36}>
        <Button 
          variant={'gradient'} 
          type="submit" 
          rightIcon={<Refresh />}
          gradient={{from: 'green', to: 'lime'}}>Generate</Button>
      </Group>
    </Box>
  );
}
