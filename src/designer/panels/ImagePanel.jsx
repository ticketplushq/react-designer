import { useCallback } from 'react'
import _ from 'lodash'
import Dropzone from 'react-dropzone'
import PropertyGroup from './PropertyGroup'

import { RowFlex } from './RowFlex'
import { GridContainer } from './GridContainer'
import { NameItem } from './NameItem'
import styles from './styles'

export const ImagePanel = ({ onChange, object }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length == 0) {
      return
    }
    const file = acceptedFiles[0]
    const fr = new FileReader()

    const setImage = function (e) {
      onChange('xlinkHref', e.target.result)
    }

    fr.onload = setImage
    fr.readAsDataURL(file)
  }, [])

  return (
    <PropertyGroup object={object} showIf={_.has(object, 'xlinkHref')}>
      <GridContainer>
        <NameItem>Label:</NameItem>
        <RowFlex>
          <input
            style={{ ...styles.input, ...styles.textInput }}
            onChange={(e) => onChange('label', e.target.value)}
            value={object.label}
          />
        </RowFlex>
        <RowFlex>
          <NameItem>Image:</NameItem>
          <Dropzone
            accept="image/*"
            onDrop={onDrop}
            multiple={false}
            style={{
              float: 'left',
              marginRight: '3px',
              padding: '3px',
              border: '1px solid gray',
              color: 'gray',
              borderRadius: '3px',
              width: '100px',
              textAlign: 'center',
            }}
            activeStyle={{
              border: '1px solid blue',
              backgroundColor: 'white',
              color: 'black',
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drop new file</p>
              </div>
            )}
          </Dropzone>
        </RowFlex>
      </GridContainer>
    </PropertyGroup>
  )
}
