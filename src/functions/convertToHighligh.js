export const ConvertToHighlight = (text) => {
  // Replace [Point] with a space
  text = text.replace(/\[Point\]/g, ' ');
  text = text.replace(/-/g,' ');
  const indexOfAsterisk = text.indexOf('*');
  const indexOfColon = text.indexOf(':');
  const indexOfBacktick = text.indexOf('`');

  if (
    indexOfColon !== -1 &&
    (indexOfAsterisk === -1 || indexOfColon < indexOfAsterisk) &&
    (indexOfBacktick === -1 || indexOfColon < indexOfBacktick)
  ) {
    const textBeforeColon = text.substring(0, indexOfColon);
    const textAfterColon = text.substring(indexOfColon + 1);
    return (
      <>
        <strong style={{ backgroundColor: '#D5FFE4' }}>{textBeforeColon}</strong>
        {textAfterColon}
      </>
    );
  } else if (
    indexOfAsterisk !== -1 &&
    (indexOfColon === -1 || indexOfAsterisk < indexOfColon) &&
    (indexOfBacktick === -1 || indexOfAsterisk < indexOfBacktick)
  ) {
    const textBeforeAsterisk = text.substring(0, indexOfAsterisk);
    const textAfterAsterisk = text.substring(indexOfAsterisk + 1).split(' ')[0];
    const restOfTextAfterAsterisk = text.substring(indexOfAsterisk + 1).split(' ').slice(1).join(' ');
    return (
      <>
        <span style={{ backgroundColor: 'lightblue' }}>{textBeforeAsterisk}</span>
        <span style={{ backgroundColor: 'lightblue' }}>{textAfterAsterisk}</span>
        {restOfTextAfterAsterisk}
      </>
    );
  } else if (
    indexOfBacktick !== -1 &&
    (indexOfColon === -1 || indexOfBacktick < indexOfColon) &&
    (indexOfAsterisk === -1 || indexOfBacktick < indexOfAsterisk)
  ) {
    const textBeforeBacktick = text.substring(0, indexOfBacktick);
    const textAfterBacktick = text.substring(indexOfBacktick + 1).split('`').join('');
    return (
      <>
        {textBeforeBacktick}
        <span style={{ backgroundColor: 'lightgreen' }}>{textAfterBacktick}</span>
      </>
    );
  }

  return text;
};
