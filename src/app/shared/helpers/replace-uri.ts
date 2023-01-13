export function encodeParams(...values: string[]) {
  return values.map((value) => {
    if (typeof value === 'string') {
      return value
        .replace(/\%/gi, '%25')
        .replace(/\+/gi, '%2B')
        .replace(/\#/gi, '%23')
        .replace(/\\/gi, '%5C')
        .replace(/\=/gi, '%3D')
        .replace(/\|/gi, '%7C')
        .replace(/\//gi, '%2F')
        .replace(/\?/gi, '%3F')
        .replace(/\[/gi, '%5B')
        .replace(/\]/gi, '%5D')
        .replace(/\{/gi, '%7B')
        .replace(/\}/gi, '%7D')
        .replace(/\$/gi, '%24');
    } else {
      return value;
    }
  });
}

export function decodeParams(...values: string[]) {
  return values.map((value) => {
    if (typeof value === 'string') {
      return value
        .replace(/\%2B/gi, '+')
        .replace(/\%23/gi, '#')
        .replace(/\%5C/gi, '\\')
        .replace(/\%3D/gi, '=')
        .replace(/\%7C/gi, '|')
        .replace(/\%2F/gi, '/')
        .replace(/\%24/gi, '$')
        .replace(/\%25/gi, '%')
        .replace(/\%3F/gi, '?')
        .replace(/\%5B/gi, '[')
        .replace(/\%7B/gi, '{')
        .replace(/\%7D/gi, '}')
        .replace(/\%5D/gi, ']');
    } else {
      return value;
    }
  });
}
