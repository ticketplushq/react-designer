import _ from 'lodash'
import WebFont from 'webfontloader'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from 'iconoir-react'
import { useHasProperty } from '../hooks/useHasProperty'
import PropertyGroup from './PropertyGroup'
import { GridContainer } from './GridContainer'
import { RowFlex } from './RowFlex'
import { NameItem } from './NameItem'
import { Switch } from './Switch'
import { RadioGroup } from './RadioGroup'
import { RadioInput } from './RadioInput'
import { fontFamilies } from '../utils/fontFamilies'
import styles from './styles'

export const TextPanel = ({ onChange, object }) => {
  const [hasProperty] = useHasProperty(object)

  const handleFontFamilyChange = (e) => {
    const value = e.target.value
    WebFont.load({
      google: {
        families: [value],
      },
    })
    onChange('fontFamily', value)
  }

  const handleTextAnchor = (value) => {
    onChange('textAnchor', value)
  }

  const sortFonts = (f1, f2) =>
    f1.name.toLowerCase() > f2.name.toLowerCase()
      ? 1
      : f1.name.toLowerCase() < f2.name.toLowerCase()
      ? -1
      : 0

  return (
    <PropertyGroup showIf={_.has(object, 'text')}>
      <GridContainer>
        <NameItem>Text:</NameItem>
        <RowFlex>
          <input
            style={{ ...styles.input, ...styles.textInput }}
            onChange={(e) => onChange('text', e.target.value)}
            value={object.text}
          />
        </RowFlex>
        <NameItem>Label:</NameItem>
        <RowFlex>
          <input
            style={{ ...styles.input, ...styles.textInput }}
            onChange={(e) => onChange('label', e.target.value)}
            value={object.label}
          />
        </RowFlex>
        <RowFlex>
          <NameItem>Text style:</NameItem>
          {hasProperty('fontWeight') && (
            <Switch
              label="fontWeight"
              icon={<Bold />}
              defaultValue="normal"
              nextValue="bold"
              onChange={(value) => onChange('fontWeight', value)}
            />
          )}
          {hasProperty('fontStyle') && (
            <Switch
              label="fontStyle"
              icon={<Italic />}
              defaultValue="normal"
              nextValue="italic"
              onChange={(value) => onChange('fontStyle', value)}
            />
          )}
          {hasProperty('textDecoration') && (
            <Switch
              icon={<Underline />}
              defaultValue="none"
              nextValue="underline"
              onChange={(value) => onChange('textDecoration', value)}
            />
          )}
        </RowFlex>
        {hasProperty('textAnchor') && (
          <RowFlex>
            <NameItem>Align text:</NameItem>
            <RadioGroup
              name="textAnchor"
              defaultValue={object.textAnchor}
              onChange={({ value }) => handleTextAnchor(value)}
            >
              <RadioInput value="start" icon={<AlignLeft />} />
              <RadioInput value="middle" icon={<AlignCenter />} />
              <RadioInput value="end" icon={<AlignRight />} />
            </RadioGroup>
          </RowFlex>
        )}

        {hasProperty('fontSize') && (
          <RowFlex>
            <NameItem>Font size:</NameItem>
            <input
              style={{ ...styles.input, ...styles.integerInput, width: 35 }}
              value={object.fontSize}
              onChange={(e) => onChange('fontSize', e.target.value)}
            />
          </RowFlex>
        )}
        <RowFlex>
          <NameItem>Font family:</NameItem>
          <select value={object.fontFamily} onChange={handleFontFamilyChange}>
            {fontFamilies.sort(sortFonts).map(({ name, family }) => (
              <option key={family} value={family}>
                {name}
              </option>
            ))}
          </select>
        </RowFlex>
      </GridContainer>
    </PropertyGroup>
  )
}
