import _ from 'lodash'
import WebFont from 'webfontloader'
import { useHasProperty } from '../hooks/useHasProperty'
import PropertyGroup from './PropertyGroup'
import { GridContainer } from './GridContainer'
import { RowFlex } from './RowFlex'
import { NameItem } from './NameItem'
import { Switch } from './Switch'
import { RadioGroup } from './RadioGroup'
import { RadioInput } from './RadioInput'
import { fontFamilies } from '../utils/fontFamilies'
import styles from './styles/panel.module.css'

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
    <PropertyGroup className="react-designer-text-panel" showIf={_.has(object, 'text')}>
      <GridContainer>
        {hasProperty('active') && (
          <RowFlex>
            <NameItem>Active:</NameItem>
            <Switch
              label="active"
              defaultChecked={object?.active}
              onChange={(_, checked) => onChange('active', checked)}
            />
          </RowFlex>
        )}
        <NameItem>Text:</NameItem>
        <RowFlex>
          <input
            className={`${styles.input} ${styles.textInput}`}
            onChange={(e) => onChange('text', e.target.value)}
            value={object.text}
          />
        </RowFlex>
        <NameItem>Label:</NameItem>
        <RowFlex>
          <input
            className={`${styles.input} ${styles.textInput}`}
            onChange={(e) => onChange('label', e.target.value)}
            value={object.label}
          />
        </RowFlex>
        <RowFlex>
          <NameItem>Text style:</NameItem>
        </RowFlex>
        <RowFlex>
          {hasProperty('fontWeight') && (
            <Switch
              label="fontWeight"
              text="Bold"
              defaultValue="normal"
              nextValue="bold"
              onChange={(value) => onChange('fontWeight', value)}
            />
          )}
          {hasProperty('fontStyle') && (
            <Switch
              label="fontStyle"
              text="Italic"
              defaultValue="normal"
              nextValue="italic"
              onChange={(value) => onChange('fontStyle', value)}
            />
          )}
          {hasProperty('textDecoration') && (
            <Switch
              text="Underline"
              defaultValue="none"
              nextValue="underline"
              onChange={(value) => onChange('textDecoration', value)}
            />
          )}
        </RowFlex>
        {hasProperty('textAnchor') && (
          <>
          <RowFlex>
            <NameItem>Align text:</NameItem>
          </RowFlex>
          <RowFlex>
            <RadioGroup
              name="textAnchor"
              defaultValue={object.textAnchor}
              onChange={({ value }) => handleTextAnchor(value)}
            >
              <RadioInput value="start" label="Left" />
              <RadioInput value="middle" label="Center" />
              <RadioInput value="end" label="Right" />
            </RadioGroup>
          </RowFlex>
          </>
        )}

        {hasProperty('fontSize') && (
          <RowFlex>
            <NameItem>Font size:</NameItem>
            <input
              min={1}
              type="number"
              className={`${styles.input} ${styles.textInput}`}
              style={{width: 50 }}
              value={object.fontSize}
              onChange={(e) => onChange('fontSize', e.target.value)}
            />
          </RowFlex>
        )}
        {hasProperty('isExpand') && (
          <RowFlex>
            <NameItem>Expand length:</NameItem>
            <Switch
              label="isExpand"
              defaultChecked={object?.isExpand}
              onChange={(_, checked) => onChange('isExpand', checked)}
            />
          </RowFlex>
        )}
        {hasProperty('maxLength') && !object?.isExpand && (
          <RowFlex>
            <NameItem>Max length:</NameItem>
            <input
              min={2}
              type="number"
              className={`${styles.input} ${styles.textInput}`}
              style={{ width: 50 }}
              value={object.maxLength}
              onChange={(e) => onChange('maxLength', e.target.value)}
            />
          </RowFlex>
        )}
        {hasProperty('letterSpacing') && (
          <RowFlex>
            <NameItem>Letter Spacing (px):</NameItem>
            <input
              type="number"
              min={-10}
              className={styles.input}
              style={{ width: 60 }}
              value={object.letterSpacing}
              onChange={(e) => onChange('letterSpacing', parseInt(e.target.value, 10))}
            />
          </RowFlex>
        )}
        {hasProperty('lineHeight') && (
          <RowFlex>
            <NameItem>Line Height:</NameItem>
            <input
              type="number"
              min={0.1}
              step={0.1}
              className={styles.input}
              style={{ width: 60 }}
              value={object.lineHeight}
              onChange={(e) => onChange('lineHeight', parseFloat(e.target.value))}
            />
          </RowFlex>
        )}
        {hasProperty('writingMode') && (
          <>
            <RowFlex>
              <NameItem>Writing Mode:</NameItem>
            </RowFlex>
            <RowFlex>
              <RadioGroup
                  name="writingMode"
                  defaultValue={object.writingMode}
                  onChange={({ value }) => onChange('writingMode', value)}
                >
                  <RadioInput value="horizontal-tb" label="Horizontal" />
                  <RadioInput value="vertical-rl" label="Vert(R to L)" />
                  <RadioInput value="vertical-lr" label="Vert(L to R)" />
                </RadioGroup>
            </RowFlex>
          </>
        )}
        {hasProperty('textOrientation') && (
          <>
            <RowFlex>
              <NameItem>Text Orientation:</NameItem>
            </RowFlex>
            <RowFlex>
              <RadioGroup
                  name="textOrientation"
                  defaultValue={object.textOrientation}
                  onChange={({ value }) => onChange('textOrientation', value)}
                >
                  <RadioInput value="mixed" label="Mixed" />
                  <RadioInput value="upright" label="Upright" />
                  <RadioInput value="sideways" label="Sideways" />
                </RadioGroup>
            </RowFlex>
          </>
        )}
        <RowFlex>
          <NameItem>Font family:</NameItem>
          <select className="react-designer-select" value={object.fontFamily} onChange={handleFontFamilyChange}>
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
