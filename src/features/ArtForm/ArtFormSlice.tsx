import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ArtFormState {
  imgWidth: number
  imgHeight: number
  colors: string[]
  shadowOffsetX: number
  shadowOffsetY: number
  shadowBlur: number
  shadowOpacity: number
  minLineWidth: number
  maxLineWidth: number
  strokeDashArray: number[]
  strokeDashOffset: number 
  passes: number
}

const initialState: ArtFormState = {
  imgWidth: 805,
  imgHeight: 500,
  colors: ['cyan', 'yellow', 'magenta'],
  shadowOffsetX: 1,
  shadowOffsetY: 2,
  shadowBlur: 4,
  shadowOpacity: 33,
  minLineWidth: 3,
  maxLineWidth: 18,
  strokeDashArray: [5,15],
  strokeDashOffset: 0,
  passes: 32
}

interface BaseMinMax {
  min?: number
  max?: number
}

interface MinParams extends BaseMinMax {
  min: number
  max?: undefined
}

interface MaxParams extends BaseMinMax {
  min?: undefined
  max: number
}

interface BaseOffsetParams {
  x?: number
  y?: number
}

interface XOffsetParams extends BaseOffsetParams {
  x: number
  y?: undefined
}

interface YOffsetParams extends BaseOffsetParams {
  y: number
  x?: undefined
}

type OffsetParams = BaseOffsetParams & (XOffsetParams|YOffsetParams)
type MinMaxParams = BaseMinMax & (MinParams|MaxParams)

export const artFormSlice = createSlice({
  name: 'artForm',
  initialState,
  reducers: {
    setImageSize: (state: ArtFormState, action: PayloadAction<[number, number]>) => {
      state.imgHeight = action.payload[1] 
      state.imgWidth = action.payload[0]
    },
    addColor: (state: ArtFormState, action: PayloadAction<string>) => {
      state.colors = [...state.colors, action.payload]
    },
    removeColor: (state: ArtFormState, action: PayloadAction<string>) => {
      const index: number = state.colors.indexOf(action.payload)
      const temp: string[] = [...state.colors]
      temp.splice(index, 1)
      state.colors = temp
    },
    setShadowOffset: (state: ArtFormState, action: PayloadAction<OffsetParams>) => {
      if (action.payload.x) state.shadowOffsetX = action.payload.x 
      if (action.payload.y) state.shadowOffsetY = action.payload.y
    },
    setShadowBlur: (state: ArtFormState, action: PayloadAction<number>) => {
      state.shadowBlur = action.payload
    },
    setShadowOpacity: (state: ArtFormState, action: PayloadAction<number>) => {
      state.shadowOpacity = action.payload
    },
    setLineWidth: (state: ArtFormState, action: PayloadAction<MinMaxParams>) => {
      if (action.payload.min) state.minLineWidth = action.payload.min
      if (action.payload.max) state.maxLineWidth = action.payload.max
    },
    setStrokeDashOffset: (state: ArtFormState, action: PayloadAction<number>) => {
      state.strokeDashOffset = action.payload
    },
    setStrokeDashArray: (state: ArtFormState, action: PayloadAction<number[]>) => {
      state.strokeDashArray = action.payload
    },
    setPasses: (state: ArtFormState, action: PayloadAction<number>) => {
      state.passes = action.payload
    }
  }
})

export const { 
  setImageSize,
  addColor,
  removeColor,
  setShadowOffset,
  setShadowBlur,
  setShadowOpacity,
  setLineWidth,
  setStrokeDashArray,
  setStrokeDashOffset,
  setPasses
 } = artFormSlice.actions

 export default artFormSlice.reducer