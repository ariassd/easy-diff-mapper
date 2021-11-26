// post install script

const colors = {
  Reset: '\x1b[0m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
};

function logColor(color, text) {
  return `${color}${text}${colors.Reset}`;
}

const postInstallMessage = `
  ${logColor(colors.FgGreen, '**********************************')}
  ${logColor(colors.FgGreen, '**')}${logColor(colors.FgMagenta, '                                 ')}${logColor(colors.FgGreen, '**')}
  ${logColor(colors.FgGreen, '**')}${logColor(colors.FgYellow, ' Thanks for use easy-diff-mapper ')}${logColor(colors.FgGreen, '**')}
  ${logColor(colors.FgGreen, '**')}${logColor(colors.FgYellow, '         Made with ❤️             ')}${logColor(colors.FgGreen, '**')}
  ${logColor(colors.FgGreen, '**')}${logColor(colors.FgMagenta, '                                 ')}${logColor(colors.FgGreen, '**')}
  ${logColor(colors.FgGreen, '**********************************')}
`;

console.log(postInstallMessage);
