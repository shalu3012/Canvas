import React, { useState } from 'react'
import {ChromePicker} from 'react-color'
import { FabricJSCanvas, useFabricJSEditor} from 'fabricjs-react'
import Navbar from './Navbar'

const Canvas = ({loggedIn}) => {
  const [colorPicker,setColorPicker]=useState(false)
  const [color,setColor]=useState("#fff")
  const { editor, onReady } = useFabricJSEditor()
  const [text,setText]=useState('Click to edit')
  const toggleColorPicker=()=>{
    setColorPicker(!colorPicker)
  }
  const onAddCircle = () => {
    editor.addCircle()
  }
  const onAddRectangle = () => {
    editor.addRectangle()
  }
  const onAddLine = () => {
    editor.addLine()
  }
const onDelete=()=>{
  editor.deleteAll()
}
const onDeleteSelected=()=>{
  editor.deleteSelected()
}
const fillColor=()=>{
  editor.setFillColor(color)
}
const pickColor=(updatedColor)=>{
  setColor(updatedColor);
  fillColor()
}
const onAddText=(e)=>{
  editor.addText(text)
  editor.zoomIn()
}
const onUpdateText=()=>{
  editor.updateText()
}
const onZoomIn=()=>{
  editor.zoomIn()
}
const onZoomOut=()=>{
  editor.zoomOut()
}
  return (
  <div>
    <Navbar/>
    <button className='btn-canvas' onClick={onAddCircle}>Add circle</button>
    <button className='btn-canvas' onClick={onAddRectangle}>Add Rectangle</button>
    <button className='btn-canvas' onClick={onAddLine}>Add Line</button>
    <button className='btn-canvas' onClick={onAddText}>Add Text</button>
    <button className='btn-canvas' onClick={onUpdateText}>Update Text</button>
    <button className='btn-canvas' onClick={onZoomIn}>Zoom In</button>
    <button className='btn-canvas' onClick={onZoomOut}>Zoom Out</button>
    <button className='btn-canvas' onClick={onDelete}>Delete All</button>
    <button className='btn-canvas' onClick={onDeleteSelected}>Delete</button>
    <button className='btn-canvas color-btn' onClick={toggleColorPicker} >Select color
    </button>
    <div className="colorPicker">
    {colorPicker&&<ChromePicker color={color} onChange={(updatedColor)=>pickColor(updatedColor.hex)}/>}
    </div>
      
    <FabricJSCanvas width="100px" className="sample-canvas" onReady={onReady}  />
  </div>)
}

export default Canvas