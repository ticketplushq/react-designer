import { getSilabas } from './silabajs'

function getFlatValue(word, maxLength) {
  if (word.length === maxLength) return 0
  if (word.length < maxLength) return -1
  if (word.length > maxLength) return 1
}

function joinSilabas(silabas, start) {
  return silabas
    .map((s) => s.silaba)
    .slice(start, silabas.length + 1)
    .join('')
}

function joinLineAndSilabas(lastLine, silabas, maxLength) {
  let newLine = lastLine?.length ? lastLine : ''
  let add = false
  let lastReadSilaba = 0
  for (const s of silabas) {
    const isNewWord = lastReadSilaba === 0 && newLine.length
    const l = isNewWord ? `${newLine} ${s.silaba}` : `${newLine}${s.silaba}`
    if (l?.length < maxLength) {
      add = true
      newLine = l
      lastReadSilaba++
    } else {
      break
    }
  }

  return [newLine, add, lastReadSilaba]
}

function getLineBreakRest(restWord, maxLength) {
  return restWord.length > maxLength
    ? lineBreak([restWord], maxLength)
    : [restWord]
}

export function lineBreak(text, maxLength) {
  //-1: text length less than maximum length
  //0: text length equal maxLength
  //1: Text length greater than maximum length
  let flat = 0

  return text.reduce((lines, word, index) => {
    const lengthCurrentWord = word?.length
    const lastLine = lines[lines?.length - 1]

    if (lengthCurrentWord === maxLength) {
      flat = 0
      return [...lines, word]
    }

    if (lengthCurrentWord < maxLength) {
      if (flat === -1 && lastLine) {
        const newLines = lines.slice(0, lines.length - 1)
        const line = `${lastLine} ${word}`

        if (line.length <= maxLength) {
          flat = line.length === maxLength ? 0 : -1
          return [...newLines, line]
        }

        const wordInfo = getSilabas(word)
        const [newLine, isAddSilaba, lastReadSilaba] = joinLineAndSilabas(
          lastLine,
          wordInfo.silabas,
          maxLength
        )

        if (isAddSilaba) {
          const restWord = joinSilabas(wordInfo.silabas, lastReadSilaba)
          const buildRestLines = getLineBreakRest(restWord, maxLength)
          const lastRestLine = buildRestLines[buildRestLines.length - 1]

          flat = getFlatValue(lastRestLine, maxLength)

          return [...newLines, `${newLine}-`, ...buildRestLines]
        }
      }

      flat = -1
      return [...lines, word]
    }

    if (lengthCurrentWord > maxLength) {
      const wordInfo = getSilabas(word)
      const [newLine, isAddSilaba, lastReadSilaba] = joinLineAndSilabas(
        lastLine,
        wordInfo.silabas,
        maxLength
      )

      if (isAddSilaba) {
        const restWord = joinSilabas(wordInfo.silabas, lastReadSilaba)
        const buildRestLines = getLineBreakRest(restWord, maxLength)
        const lastRestLine = buildRestLines[buildRestLines.length - 1]

        let newLines = [...lines]
        if (lines.length === 1) {
          newLines = [`${newLine}-`]
        }

        if (flat === -1) {
          newLines = newLines.slice(0, lines.length - 1)
        }

        flat = getFlatValue(lastRestLine, maxLength)

        return [...newLines, `${newLine}-`, ...buildRestLines]
      }

      const isTheLastWord = index === text.length - 1
      if (isTheLastWord && index !== 0) {
        const newLines = lineBreak([word], maxLength)
        return [...lines, ...newLines]
      }
    }

    return [...lines, word]
  }, [])
}
