var undos = [];
var redos = [];
var chars = '';
var base1 = 0;
var base2 = 0;
var count1 = 0;
var count2 = 0;
var searchCharsLimit = '';
var nboxes = 0;
var drawType = 2;
var brushsize = 1;
var verticalMirror = false;
var horizontalMirror = false;
var diagonalMirror = false;
var diagonalMirror2 = false;
var circularMirror = false;
var encryptionNboxes = 0;
var activex;
var activey;
var backupUndo = '';
var startColor = '';
var decryptIncrementColumn = 0;
var backupEncryptionNboxes = '';

//mouse state management for Drawing
var isMouseDown = false;
document.body.addEventListener('mousedown', function() {
  isMouseDown = true;
});
document.body.addEventListener('mouseup', function() {
  isMouseDown = false;
});

document.body.addEventListener('mouseup', function() {
  encryptGrid();
  if (
    (backupUndo != '') &
    (backupUndo != undos[undos.length - 1])
  ) {
    redos = [];
    undos.push(backupUndo);
    document.getElementById('undoButton').disabled = false;
    document.getElementById('redoButton').disabled = true;
    backupUndo = '';
    if (undos.length > 100) {
      undos.splice(0, 1);
    }
  }
});

function showHint() {
  document.getElementById('hint').blur();
  alert(
    'You can hover your cursor over just about anything on this page to view hints, reminders, and other helpful information about how to use the these tools.'
  );
}

function reset() {
  undos = [];
  redos = [];
  preCharOrder(3);
  document.getElementById('undoButton').disabled = true;
  document.getElementById('redoButton').disabled = true;
  document.getElementById('base1').value = '0';
  document.getElementById('base2').value = 'F';
  document.getElementById('count1').value = '0';
  document.getElementById('count2').value = '100';
  document.getElementById('order').value =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  document.getElementById('valueToConvert').value = 'Hi';
  document.getElementById('columnToSearch').value = 'i';
  document.getElementById('output').innerHTML = '';
  document.getElementById('output2').innerHTML = '';
  document.getElementById('output3').innerHTML = '';
  resetDraw();
  document.getElementById('numBoxes').value = 20;
  document.getElementById('boxSize').value = 15;
  document.getElementById('hideNames').checked = false;
  document.getElementById('colorCode').checked = false;
  searchCharsLimit = '';
  backupEncryptionNboxes = '';
  decryptIncrementColumn = 0;
  createEncryptionGrid(true);
  calculate();
}

function sanitize(string) {
  var elt = document.createElement('span');
  elt.appendChild(document.createTextNode(string));
  return elt.textContent;
}

function calculate() {
  initGlobalVars();
  var binLength = Math.floor(
    Math.log(2 * count2 + 1) / Math.log(Math.E) / Math.LN2
  );
  var output = document.getElementById('output');
  var Binary = -1;
  var Decimal = -1;
  var Hexadecimal = -1;
  var Uppercase = -1;
  var Lowercase = -1;
  var UppercaseLetters = -1;
  var LowercaseLetters = -1;
  var rand1 = 1 + Math.floor(Math.random() * 50) / 50;
  var rand2 = 1 + Math.floor(Math.random() * 50) / 50;
  var rand3 = 1 + Math.floor(Math.random() * 50) / 50;
  var t = '';
  var q = 0;
  t += '<table><tr>';
  for (var j = base1; j <= base2; j++) {
    if (j != 0) {
      var title =
        '"' + chars.charAt('0') + ' to ' + chars.charAt(j) + '"';
      if ((j != chars.charAt(j)) | (chars.charAt('0') != '0')) {
        title += ' or "0 to ' + j + '"';
      }
      title += '\n\nThis Number System Contains:\n';
      title +=
        sanitize(chars.substr(0, j + 1))
          .split('')
          .join(', ') + '.';
      t +=
        "<td style='background-color:#C0C0C0;' title='" +
        title +
        "'>";
      if (document.getElementById('hideNames').checked == false) {
        if (j == chars.charAt(j)) {
          t += chars.charAt('0') + ' to ' + chars.charAt(j);
        } else {
          t +=
            chars.charAt('0') +
            ' to ' +
            chars.charAt(j) +
            ' (' +
            j +
            ')';
        }
        if ((j == 1) & (chars.indexOf('01') == 0)) {
          t = t + '<br><b>Binary</b><br>';
          Binary = 1;
        } else if ((j == 2) & (chars.indexOf('012') == 0)) {
          t = t + '<br><b>Ternary<br>';
        } else if ((j == 3) & (chars.indexOf('0123') == 0)) {
          t = t + '<br><b>Quaternary<br>';
        } else if ((j == 4) & (chars.indexOf('01234') == 0)) {
          t = t + '<br><b>Quinary<br>';
        } else if ((j == 5) & (chars.indexOf('012345') == 0)) {
          t = t + '<br><b>Senary<br>';
        } else if ((j == 6) & (chars.indexOf('0123456') == 0)) {
          t = t + '<br><b>Septenary<br>';
        } else if ((j == 7) & (chars.indexOf('01234567') == 0)) {
          t = t + '<br><b>Octal<br>';
        } else if ((j == 8) & (chars.indexOf('012345678') == 0)) {
          t = t + '<br><b>Nonary<br>';
        } else if (
          (j == 9) &
          (chars.indexOf('0123456789') == 0)
        ) {
          t = t + '<br><b>Decimal</b><br>';
          Decimal = 9;
        } else if (
          (j == 10) &
          (chars.indexOf('0123456789A') == 0)
        ) {
          t = t + '<br><b>Undecimal<br>';
        } else if (
          (j == 11) &
          (chars.indexOf('0123456789AB') == 0)
        ) {
          t = t + '<br><b>Duodecimal<br>';
        } else if (
          (j == 12) &
          (chars.indexOf('0123456789ABC') == 0)
        ) {
          t = t + '<br><b>Tridecimal<br>';
        } else if (
          (j == 13) &
          (chars.indexOf('0123456789ABCD') == 0)
        ) {
          t = t + '<br><b>Tetradecimal<br>';
        } else if (
          (j == 14) &
          (chars.indexOf('0123456789ABCDE') == 0)
        ) {
          t = t + '<br><b>Pentadecimal<br>';
        } else if (
          (j == 15) &
          (chars.indexOf('0123456789ABCDEF') == 0)
        ) {
          t = t + '<br><b>Hexadecimal</b><br>';
          Hexadecimal = 15;
        } else if (
          (j == 17) &
          (chars.indexOf('0123456789ABCDEFGH') == 0)
        ) {
          t = t + '<br><b>Octodecimal<br>';
        } else if (
          (j == 19) &
          (chars.indexOf('0123456789ABCDEFGHIJ') == 0)
        ) {
          t = t + '<br><b>Vigesimal<br>';
        } else if (
          (j == 23) &
          (chars.indexOf('0123456789ABCDEFGHIJKLMN') == 0)
        ) {
          t = t + '<br><b>Tetravigesimal<br>';
        } else if (
          (j == 24) &
          (chars.indexOf('0123456789ABCDEFGHIJKLMNO') == 0)
        ) {
          t = t + '<br><b>Pentavigesimal<br>';
        } else if (
          (j == 25) &
          (chars.indexOf('0123456789ABCDEFGHIJKLMNOP') == 0)
        ) {
          t = t + '<br><b>Hexavigesimal<br>';
        } else if (
          (j == 26) &
          (chars.indexOf('0123456789ABCDEFGHIJKLMNOPQ') == 0)
        ) {
          t = t + '<br><b>Septemvigesimal<br>';
        } else if (
          (j == 27) &
          (chars.indexOf('0123456789ABCDEFGHIJKLMNOPQR') == 0)
        ) {
          t = t + '<br><b>Octovigesimal<br>';
        } else if (
          (j == 29) &
          (chars.indexOf('0123456789ABCDEFGHIJKLMNOPQRST') == 0)
        ) {
          t = t + '<br><b>Trigesimal<br>';
        } else if (
          (j == 31) &
          (chars.indexOf('0123456789ABCDEFGHIJKLMNOPQRSTUV') == 0)
        ) {
          t = t + '<br><b>Duotrigesimal<br>';
        } else if (
          (j == 35) &
          (chars.indexOf(
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
          ) ==
            0)
        ) {
          t = t + '<br><b>Hexatrigesimal</b><br>';
          Uppercase = 35;
        } else if (
          (j == 59) &
          (chars.indexOf(
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx'
          ) ==
            0)
        ) {
          t = t + '<br><b>Sexagesimal<br>';
        } else if (
          (j == 61) &
          (chars.indexOf(
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
          ) ==
            0)
        ) {
          t = t + '<br><b>Duosexagesimal</b><br>';
          Lowercase = 61;
        } else if (
          (j == 25) &
          (chars.indexOf('ABCDEFGHIJKLMNOPQRSTUVWXYZ') == 0)
        ) {
          t = t + '<br><b>Hexavigesimal</b><br>';
          UppercaseLetters = 25;
        } else if (
          (j == 25) &
          (chars.indexOf('abcdefghijklmnopqrstuvwxyz') == 0)
        ) {
          t = t + '<br><b>Hexavigesimal</b><br>';
          UppercaseLetters = 25;
        }
      } else {
        t += chars.charAt(j);
      }
      t = t + '</td>';
    }
  }
  t = t + '</tr>';
  for (var num = count1; num <= count2; num++) {
    var tooltip = getTooltip(num);
    t = t + '<tr>';
    for (var j = base1; j <= base2; j++) {
      if (j != 0) {
        q = num;
        var bin = '';
        if (q != 0) {
          while (q != 0) {
            bin = chars.charAt(q % (j + 1)) + bin;
            q = Math.floor(q / (j + 1));
          }
        } else {
          bin = chars.charAt(0);
        }
        var isSearchResult = false;
        if (document.getElementById('searchResult')) {
          if (
            document.getElementById('searchResult').innerText ==
            bin
          ) {
            isSearchResult = true;
          }
        }
        var title = tooltip.replace(
          '*header*',
          chars.charAt('0') + ' to ' + chars.charAt(j)
        );
        title = title.replace('*current*', bin);
        title = title.replace('*length*', bin.length);
        if (isSearchResult) {
          t =
            t +
            "<td style='background-color:#40C0FF; font-weight:900; text-decoration:underline;' title='" +
            title +
            "'>" +
            bin +
            '</td>';
        } else {
          if (document.getElementById('colorCode').checked) {
            var c = 0;
            for (var i = 0; i < bin.length; i++) {
              var index = chars.indexOf(bin.charAt(i));
              c =
                c +
                Number(index) * Math.pow(2, chars.length - i - 1);
            }
            var r = Math.floor(
              Math.abs(Math.sin((1 + c) * rand1)) * 255
            );
            var g = Math.floor(
              Math.abs(Math.sin((1 + c) * rand2)) * 255
            );
            var b = Math.floor(
              Math.abs(Math.sin((1 + c) * rand3)) * 255
            );
            var r1 = Math.floor((255 + r + r) / 3);
            var g1 = Math.floor((255 + g + g) / 3);
            var b1 = Math.floor((255 + b + b) / 3);
            t =
              t +
              "<td style='background-color:rgb(" +
              r1 +
              ',' +
              g1 +
              ',' +
              b1 +
              ");' title='" +
              title +
              "'>" +
              bin +
              '</td>';
          } else {
            if (
              (j == Binary) |
              (j == Decimal) |
              (j == Hexadecimal) |
              (j == Uppercase) |
              (j == Lowercase) |
              (j == UppercaseLetters) |
              (j == LowercaseLetters)
            ) {
              t =
                t +
                "<td style='background-color:#DDDDDD;' title='" +
                title +
                "'>" +
                bin +
                '</td>';
            } else {
              t =
                t + "<td title='" + title + "'>" + bin + '</td>';
            }
          }
        }
      }
    }
    t = t + '</tr>';
  }
  t = t + '</table>';
  output.innerHTML = t;
  document.getElementById('base1').title =
    chars +
    '\nUse your UP and DOWN arrow keys to scroll through these characters.';
  document.getElementById('base2').title =
    chars +
    '\nUse your UP and DOWN arrow keys to scroll through these characters.';
  document.getElementById('count1').title = '0123456789';
  document.getElementById('count2').title = '0123456789';
  document.getElementById('valueToConvert').title =
    'Must only contain these characters:\n\n' + chars;
  valueToConvertChanged();
}

function getTooltip(num) {
  var digits = '0123456789';
  var letters = 'abcdefghijklmnopqrstuvwxyz';
  letters += letters.toUpperCase();
  var characters = digits + letters;
  var base64 = letters + digits + '+/';
  var encr =
    'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM 1234567890-+.?!';

  function mkBase(base, name, chars = characters) {
    return {
      base,
      name,
      chars,
      value: ''
    };
  }

  var bases = [
    mkBase(2, 'Binary'),
    mkBase(8, 'Octal'),
    mkBase(16, 'Hexadecimal'),
    mkBase(36, 'Hexatrigesimal'),
    mkBase(62, 'Duosexagesimal'),
    mkBase(26, 'Encryption', encr),
    mkBase(26, 'Hexavigesimal', letters),
    mkBase(64, 'Base 64', base64)
  ];

  function calc(base) {
    var nbr = num;
    if (!nbr) base.value = base.chars.charAt(0);
    while (nbr) {
      base.value += base.chars.charAt(nbr % base.base);
      nbr = Math.floor(nbr / base.base);
    }
  }

  var t = '*header*:\t\t*current*\n';
  t += 'Length:\t\t*length*\n\n';
  t += 'Quick Conversion Equivalents:\n';
  t += 'Decimal:\t\t' + num + '\n';

  for (base of bases.values()) {
    calc(base);
    t += base.name + ':\t\t' + base.value + '\n';
  }
  return t;
}

function convert() {
  initGlobalVars();
  if (document.getElementById('valueToConvert').value == '') {
    document.getElementById(
      'valueToConvert'
    ).value = chars.charAt(0);
  }
  var val = document.getElementById('valueToConvert').value;
  var binIndex = 0;
  var fixedVal = val;
  var changes = 0;
  for (var b = 0; b < val.length; b++) {
    //remove any characters that aren't in chars variable
    var index = chars.indexOf(val.charAt(b));
    if (index == -1) {
      fixedVal =
        fixedVal.substr(0, b) +
        '*' +
        val.substr(b + 1, val.length - 1);
      changes++;
    }
  }
  for (var i = 1; i <= changes; i++) {
    fixedVal = fixedVal.replace('*', '');
  }
  if (fixedVal == '') {
    fixedVal = chars.charAt(1);
  }
  val = fixedVal;
  document.getElementById('valueToConvert').value = val;
  if ((val.charAt(0) == chars.charAt(0)) & (val.length > 1)) {
    document.getElementById('output2').innerHTML = '';
    alert('There are no results for your search');
    return;
  }
  if (
    (document.getElementById('columnToSearch').value == '') |
    (chars.indexOf(
      document.getElementById('columnToSearch').value
    ) ==
      -1)
  ) {
    //if column specification is blank
    for (var b = 0; b < val.length; b++) {
      //find best index
      var index = chars.indexOf(val.charAt(b));
      if (index > binIndex) {
        binIndex = index;
      }
    }
    document.getElementById(
      'columnToSearch'
    ).value = chars.charAt(binIndex);
  } else {
    binIndex = chars.indexOf(
      document.getElementById('columnToSearch').value
    ); //if column is specified
  }
  var num = 0;
  for (var b = 0; b < val.length; b++) {
    //convert to decimal format
    var index = chars.indexOf(val.charAt(b));
    num =
      num +
      Number(index) * Math.pow(1 + binIndex, val.length - b - 1);
  }
  var t = '<table>';
  t = t + '<tr>';
  if ((binIndex < base1) | (binIndex > base2)) {
    //if binary index is not inside dimensions
    var title =
      '"' +
      chars.charAt('0') +
      ' to ' +
      chars.charAt(binIndex) +
      '"';
    if (
      (binIndex != chars.charAt(binIndex)) |
      (chars.charAt('0') != '0')
    ) {
      title += ' or "0 to ' + binIndex + '"';
    }
    title += '\n\nThis Number System Contains:\n';
    title +=
      sanitize(chars.substr(0, binIndex + 1))
        .split('')
        .join(', ') + '.';
    t +=
      "<td style='background-color:#C0C0C0;' title='" +
      title +
      "'>";
    if (document.getElementById('hideNames').checked == false) {
      if (binIndex == chars.charAt(binIndex)) {
        t += chars.charAt('0') + ' to ' + chars.charAt(binIndex);
      } else {
        t +=
          chars.charAt('0') +
          ' to ' +
          chars.charAt(binIndex) +
          ' (' +
          binIndex +
          ')';
      }
      if ((binIndex == 1) & (chars.indexOf('01') == 0)) {
        t = t + '<br><b>Binary</b>';
      } else if ((binIndex == 2) & (chars.indexOf('012') == 0)) {
        t = t + '<br><b>Ternary';
      } else if ((binIndex == 3) & (chars.indexOf('0123') == 0)) {
        t = t + '<br><b>Quaternary';
      } else if (
        (binIndex == 4) &
        (chars.indexOf('01234') == 0)
      ) {
        t = t + '<br><b>Quinary';
      } else if (
        (binIndex == 5) &
        (chars.indexOf('012345') == 0)
      ) {
        t = t + '<br><b>Senary';
      } else if (
        (binIndex == 6) &
        (chars.indexOf('0123456') == 0)
      ) {
        t = t + '<br><b>Septenary';
      } else if (
        (binIndex == 7) &
        (chars.indexOf('01234567') == 0)
      ) {
        t = t + '<br><b>Octal';
      } else if (
        (binIndex == 8) &
        (chars.indexOf('012345678') == 0)
      ) {
        t = t + '<br><b>Nonary';
      } else if (
        (binIndex == 9) &
        (chars.indexOf('0123456789') == 0)
      ) {
        t = t + '<br><b>Decimal</b>';
      } else if (
        (binIndex == 10) &
        (chars.indexOf('0123456789A') == 0)
      ) {
        t = t + '<br><b>Undecimal';
      } else if (
        (binIndex == 11) &
        (chars.indexOf('0123456789AB') == 0)
      ) {
        t = t + '<br><b>Duodecimal<br>';
      } else if (
        (binIndex == 12) &
        (chars.indexOf('0123456789ABC') == 0)
      ) {
        t = t + '<br><b>Tridecimal';
      } else if (
        (binIndex == 13) &
        (chars.indexOf('0123456789ABCD') == 0)
      ) {
        t = t + '<br><b>Tetradecimal';
      } else if (
        (binIndex == 14) &
        (chars.indexOf('0123456789ABCDE') == 0)
      ) {
        t = t + '<br><b>Pentadecimal';
      } else if (
        (binIndex == 15) &
        (chars.indexOf('0123456789ABCDEF') == 0)
      ) {
        t = t + '<br><b>Hexadecimal</b>';
      } else if (
        (binIndex == 17) &
        (chars.indexOf('0123456789ABCDEFGH') == 0)
      ) {
        t = t + '<br><b>Octodecimal';
      } else if (
        (binIndex == 19) &
        (chars.indexOf('0123456789ABCDEFGHIJ') == 0)
      ) {
        t = t + '<br><b>Vigesimal';
      } else if (
        (binIndex == 23) &
        (chars.indexOf('0123456789ABCDEFGHIJKLMN') == 0)
      ) {
        t = t + '<br><b>Tetravigesimal';
      } else if (
        (binIndex == 24) &
        (chars.indexOf('0123456789ABCDEFGHIJKLMNO') == 0)
      ) {
        t = t + '<br><b>Pentavigesimal';
      } else if (
        (binIndex == 25) &
        (chars.indexOf('0123456789ABCDEFGHIJKLMNOP') == 0)
      ) {
        t = t + '<br><b>Hexavigesimal';
      } else if (
        (binIndex == 26) &
        (chars.indexOf('0123456789ABCDEFGHIJKLMNOPQ') == 0)
      ) {
        t = t + '<br><b>Septemvigesimal';
      } else if (
        (binIndex == 27) &
        (chars.indexOf('0123456789ABCDEFGHIJKLMNOPQR') == 0)
      ) {
        t = t + '<br><b>Octovigesimal';
      } else if (
        (binIndex == 29) &
        (chars.indexOf('0123456789ABCDEFGHIJKLMNOPQRST') == 0)
      ) {
        t = t + '<br><b>Trigesimal';
      } else if (
        (binIndex == 31) &
        (chars.indexOf('0123456789ABCDEFGHIJKLMNOPQRSTUV') == 0)
      ) {
        t = t + '<br><b>Duotrigesimal';
      } else if (
        (binIndex == 35) &
        (chars.indexOf('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ') ==
          0)
      ) {
        t = t + '<br><b>Hexatrigesimal</b>';
      } else if (
        (binIndex == 59) &
        (chars.indexOf(
          '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx'
        ) ==
          0)
      ) {
        t = t + '<br><b>Sexagesimal';
      } else if (
        (binIndex == 61) &
        (chars.indexOf(
          '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        ) ==
          0)
      ) {
        t = t + '<br><b>Duosexagesimal</b>';
      } else if (
        (binIndex == 25) &
        (chars.indexOf('ABCDEFGHIJKLMNOPQRSTUVWXYZ') == 0)
      ) {
        t = t + '<br><b>Hexavigesimal</b>';
      } else if (
        (binIndex == 25) &
        (chars.indexOf('abcdefghijklmnopqrstuvwxyz') == 0)
      ) {
        t = t + '<br><b>Hexavigesimal</b>';
      }
    } else {
      t += chars.charAt(binIndex);
    }
    t = t + '</td>';
  }
  var Binary = -1;
  var Decimal = -1;
  var Hexadecimal = -1;
  var Uppercase = -1;
  var Lowercase = -1;
  var UppercaseLetters = -1;
  var LowercaseLetters = -1;
  for (var j = base1; j <= base2; j++) {
    if (j != 0) {
      var title =
        '"' + chars.charAt('0') + ' to ' + chars.charAt(j) + '"';
      if ((j != chars.charAt(j)) | (chars.charAt('0') != '0')) {
        title += ' or "0 to ' + j + '"';
      }
      t =
        t +
        "<td style='background-color:#C0C0C0' title='" +
        title +
        "'>";
      if (document.getElementById('hideNames').checked == false) {
        if (j == chars.charAt(j)) {
          t += chars.charAt('0') + ' to ' + chars.charAt(j);
        } else {
          t +=
            chars.charAt('0') +
            ' to ' +
            chars.charAt(j) +
            ' (' +
            j +
            ')';
        }
        if ((j == 1) & (chars.indexOf('01') == 0)) {
          t = t + '<br><b>Binary</b>';
          Binary = 1;
        } else if ((j == 2) & (chars.indexOf('012') == 0)) {
          t = t + '<br><b>Ternary';
        } else if ((j == 3) & (chars.indexOf('0123') == 0)) {
          t = t + '<br><b>Quaternary';
        } else if ((j == 4) & (chars.indexOf('01234') == 0)) {
          t = t + '<br><b>Quinary';
        } else if ((j == 5) & (chars.indexOf('012345') == 0)) {
          t = t + '<br><b>Senary';
        } else if ((j == 6) & (chars.indexOf('0123456') == 0)) {
          t = t + '<br><b>Septenary';
        } else if ((j == 7) & (chars.indexOf('01234567') == 0)) {
          t = t + '<br><b>Octal';
        } else if ((j == 8) & (chars.indexOf('012345678') == 0)) {
          t = t + '<br><b>Nonary';
        } else if (
          (j == 9) &
          (chars.indexOf('0123456789') == 0)
        ) {
          t = t + '<br><b>Decimal</b>';
          Decimal = 9;
        } else if (
          (j == 10) &
          (chars.indexOf('0123456789A') == 0)
        ) {
          t = t + '<br><b>Undecimal';
        } else if (
          (j == 11) &
          (chars.indexOf('0123456789AB') == 0)
        ) {
          t = t + '<br><b>Duodecimal';
        } else if (
          (j == 12) &
          (chars.indexOf('0123456789ABC') == 0)
        ) {
          t = t + '<br><b>Tridecimal';
        } else if (
          (j == 13) &
          (chars.indexOf('0123456789ABCD') == 0)
        ) {
          t = t + '<br><b>Tetradecimal';
        } else if (
          (j == 14) &
          (chars.indexOf('0123456789ABCDE') == 0)
        ) {
          t = t + '<br><b>Pentadecimal';
        } else if (
          (j == 15) &
          (chars.indexOf('0123456789ABCDEF') == 0)
        ) {
          t = t + '<br><b>Hexadecimal</b>';
          Hexadecimal = 15;
        } else if (
          (j == 17) &
          (chars.indexOf('0123456789ABCDEFGH') == 0)
        ) {
          t = t + '<br><b>Octodecimal';
        } else if (
          (j == 19) &
          (chars.indexOf('0123456789ABCDEFGHIJ') == 0)
        ) {
          t = t + '<br><b>Vigesimal';
        } else if (
          (j == 23) &
          (chars.indexOf('0123456789ABCDEFGHIJKLMN') == 0)
        ) {
          t = t + '<br><b>Tetravigesimal';
        } else if (
          (j == 24) &
          (chars.indexOf('0123456789ABCDEFGHIJKLMNO') == 0)
        ) {
          t = t + '<br><b>Pentavigesimal';
        } else if (
          (j == 25) &
          (chars.indexOf('0123456789ABCDEFGHIJKLMNOP') == 0)
        ) {
          t = t + '<br><b>Hexavigesimal';
        } else if (
          (j == 26) &
          (chars.indexOf('0123456789ABCDEFGHIJKLMNOPQ') == 0)
        ) {
          t = t + '<br><b>Septemvigesimal';
        } else if (
          (j == 27) &
          (chars.indexOf('0123456789ABCDEFGHIJKLMNOPQR') == 0)
        ) {
          t = t + '<br><b>Octovigesimal';
        } else if (
          (j == 29) &
          (chars.indexOf('0123456789ABCDEFGHIJKLMNOPQRST') == 0)
        ) {
          t = t + '<br><b>Trigesimal';
        } else if (
          (j == 31) &
          (chars.indexOf('0123456789ABCDEFGHIJKLMNOPQRSTUV') == 0)
        ) {
          t = t + '<br><b>Duotrigesimal';
        } else if (
          (j == 35) &
          (chars.indexOf(
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
          ) ==
            0)
        ) {
          t = t + '<br><b>Hexatrigesimal</b>';
          Uppercase = 35;
        } else if (
          (j == 59) &
          (chars.indexOf(
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx'
          ) ==
            0)
        ) {
          t = t + '<br><b>Sexagesimal';
        } else if (
          (j == 61) &
          (chars.indexOf(
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
          ) ==
            0)
        ) {
          t = t + '<br><b>Duosexagesimal</b>';
          Lowercase = 61;
        } else if (
          (j == 25) &
          (chars.indexOf('ABCDEFGHIJKLMNOPQRSTUVWXYZ') == 0)
        ) {
          t = t + '<br><b>Hexavigesimal</b>';
          UppercaseLetters = 25;
        } else if (
          (j == 25) &
          (chars.indexOf('abcdefghijklmnopqrstuvwxyz') == 0)
        ) {
          t = t + '<br><b>Hexavigesimal</b>';
          LowercaseLetters = 25;
        }
      } else {
        t += chars.charAt(j);
      }
    }
    t = t + '</td>';
  }
  t = t + '</tr>';
  //headers done, now for the data...
  t = t + '<tr>';
  var tooltip = getTooltip(num);
  if ((binIndex < base1) | (binIndex > base2)) {
    //if binary index is not in dimensions
    var q = num;
    var bin = '';
    if (q != 0) {
      while (q != 0) {
        bin = chars.charAt(q % (binIndex + 1)) + bin;
        q = Math.floor(q / (binIndex + 1));
      }
    } else {
      bin = chars.charAt(0);
    }
    var title = tooltip.replace(
      '*header*',
      chars.charAt('0') + ' to ' + chars.charAt(binIndex)
    );
    title = title.replace('*current*', bin);
    title = title.replace('*length*', bin.length);
    if (bin == val) {
      t =
        t +
        "<td id='searchResult' style='background-color:#40C0FF' title='" +
        title +
        "'>" +
        bin +
        '</td>';
    } else {
      t =
        t +
        "<td id='searchResult' style='background-color:#FF8080 title='" +
        title +
        "'>" +
        bin +
        '</td>';
      alert(
        "Your search was too long to find a perfect match.\nHere's the closest match I could find..."
      );
    }
  }
  for (var j = base1; j <= base2; j++) {
    var q = num;
    var bin = '';
    if (j != 0) {
      while (q != 0) {
        bin = chars.charAt(q % (j + 1)) + bin;
        q = Math.floor(q / (j + 1));
      }
      if (bin == '') bin = '0';
      var title = tooltip.replace(
        '*header*',
        chars.charAt('0') + ' to ' + chars.charAt(j)
      );
      title = title.replace('*current*', bin);
      title = title.replace('*length*', bin.length);
      if (bin == val) {
        t =
          t +
          "<td id='searchResult' style='background-color:#40C0FF' title='" +
          title +
          "'>" +
          bin +
          '</td>';
      } else {
        if (
          (j == Binary) |
          (j == Decimal) |
          (j == Hexadecimal) |
          (j == Uppercase) |
          (j == Lowercase) |
          (j == UppercaseLetters) |
          (j == LowercaseLetters)
        ) {
          t =
            t +
            "<td style='background-color:#DDDDDD' title='" +
            title +
            "'>" +
            bin +
            '</td>';
        } else {
          t = t + "<td title='" + title + "'>" + bin + '</td>';
        }
      }
    }
  }
  t = t + '</tr>';
  t = t + '</table>';
  t =
    t +
    "<hr><button type='button' onclick='javascript:setToWindowLocation(" +
    binIndex +
    ',' +
    num +
    ");' style='float:left;'>Show in the Other Table</button><hr>";
  document.getElementById('output2').innerHTML = t;
}

function setToWindowLocation(bits, count) {
  convert();
  window.scrollTo(0, 0);
  if ((bits < base1) | (bits > base2)) {
    if (bits != 0) {
      document.getElementById('base1').value = chars.charAt(
        bits - 7
      );
      document.getElementById('base2').value = chars.charAt(
        bits + 7
      );
    }
  }
  if ((count < count1) | (count > count2)) {
    document.getElementById('count1').value = count + 80;
    document.getElementById('count2').value = count - 20;
  }
  document.getElementById('colorCode').checked = false;
  calculate();
}

function initGlobalVars() {
  nboxes = document.getElementById('numBoxes').value;
  chars = document.getElementById('order').value;
  if (chars.length <= 1) {
    chars =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    document.getElementById('order').value = chars;
  }
  if (
    (document.getElementById('base1').value == '') |
    (chars.indexOf(document.getElementById('base1').value) == -1)
  ) {
    document.getElementById('base1').value = chars.charAt(0);
  }
  if (
    (document.getElementById('base2').value == '') |
    (chars.indexOf(document.getElementById('base2').value) == -1)
  ) {
    document.getElementById('base2').value = chars.charAt(
      chars.length - 1
    );
  }
  document.getElementById(
    'base1'
  ).value = document.getElementById('base1').value.charAt(0);
  document.getElementById(
    'base2'
  ).value = document.getElementById('base2').value.charAt(0);
  base1 =
    1 +
    chars.indexOf(
      document.getElementById('base1').value.charAt(0)
    );
  base2 = chars.indexOf(
    document.getElementById('base2').value.charAt(0)
  );
  count1 = Number(document.getElementById('count1').value);
  count2 = Number(document.getElementById('count2').value);
  if (count1 < 0) {
    count1 = 0;
    document.getElementById('count1').value = count1;
  }
  if (count2 < 0) {
    count2 = 0;
    document.getElementById('count2').value = count2;
  }
  if (count1 > count2) {
    var backup = count1;
    count1 = count2;
    count2 = backup;
    document.getElementById('count1').value = count1;
    document.getElementById('count2').value = count2;
  }
  if (
    chars.indexOf(document.getElementById('base1').value) >
    chars.indexOf(document.getElementById('base2').value)
  ) {
    var backup = base1;
    base1 = base2;
    base2 = backup;
    var backup2 = document.getElementById('base1').value;
    document.getElementById(
      'base1'
    ).value = document.getElementById('base2').value;
    document.getElementById('base2').value = backup2;
  }
  document.getElementById('columnCount').innerHTML =
    ' (' + (1 + base2 - base1) + ')';
  document.getElementById('rowCount').innerHTML =
    ' (' + (1 + count2 - count1) + ')';
}

function characterOrderChanged() {
  valueToConvertChanged();
  calculate();
}

function columnToSearchChanged() {
  var i = 0;
  var v = document.getElementById('valueToConvert').value;
  for (var b = 0; b < v.length; b++) {
    //find the shortest column that matches the results
    var index = chars.indexOf(v.charAt(b));
    if (index > i) {
      i = index;
      shortestColumn = v.charAt(b);
    }
  }
  if (
    chars.indexOf(
      document.getElementById('columnToSearch').value
    ) < i
  ) {
    document.getElementById(
      'columnToSearch'
    ).value = shortestColumn;
    alert(
      'There are no results for "' +
        v +
        '" in any column that is less then "' +
        shortestColumn +
        '".'
    );
  }
}

function valueToConvertChanged() {
  var chars = document.getElementById('order').value;
  var v = document.getElementById('valueToConvert').value;
  var fixedVal = v;
  var changes = 0;
  for (var b = 0; b < v.length; b++) {
    //remove any characters that aren't in chars variable
    var index = chars.indexOf(v.charAt(b));
    if (index == -1) {
      fixedVal =
        fixedVal.substr(0, b) +
        '*' +
        v.substr(b + 1, v.length - 1);
      changes++;
    }
  }
  for (var i = 1; i <= changes; i++) {
    fixedVal = fixedVal.replace('*', '');
  }
  document.getElementById('valueToConvert').value = fixedVal;
  var i = 0;
  var shortestColumn = '';
  for (var b = 0; b < fixedVal.length; b++) {
    //find the shortest column that matches the results
    var index = chars.indexOf(fixedVal.charAt(b));
    if (index > i) {
      i = index;
      shortestColumn = fixedVal.charAt(b);
    }
  }
  searchCharsLimit = chars.substr(i);
  document.getElementById('columnToSearch').title =
    'Can be any of the characters below:\n\n' +
    searchCharsLimit +
    '\nUse your UP and DOWN arrow keys to scroll through these characters.';
  document.getElementById(
    'columnToSearch'
  ).value = document
    .getElementById('columnToSearch')
    .value.charAt(0);
  if (
    chars.indexOf(shortestColumn) >
    chars.indexOf(document.getElementById('columnToSearch').value)
  ) {
    document.getElementById(
      'columnToSearch'
    ).value = shortestColumn;
  }
}

function randomizeEncryptionGrid() {
  backupUndo = document.getElementById('output3').value;
  verticalMirror = document.getElementById('verticalMirror')
    .checked;
  horizontalMirror = document.getElementById('horizontalMirror')
    .checked;
  diagonalMirror = document.getElementById('diagonalMirror')
    .checked;
  diagonalMirror2 = document.getElementById('diagonalMirror2')
    .checked;
  circularMirror = document.getElementById('circularMirror')
    .checked;
  for (var y = 1; y <= nboxes; y++) {
    for (var x = 1; x <= nboxes; x++) {
      if (document.getElementById(x + ',' + y)) {
        document.getElementById(
          x + ',' + y
        ).style.backgroundColor = '#FFFFFF';
      }
    }
  }
  for (var y = 1; y <= nboxes; y++) {
    for (var x = 1; x <= nboxes; x++) {
      if (document.getElementById(x + ',' + y)) {
        if (Math.floor(Math.random() * 2) == 0) {
          drawPoint(x, y, false);
          if (horizontalMirror) {
            drawPoint(x, nboxes - y + 1, false);
          }
          if (verticalMirror) {
            drawPoint(nboxes - x + 1, y, false);
          }
          if (horizontalMirror & verticalMirror) {
            drawPoint(nboxes - x + 1, nboxes - y + 1, false);
          }
          if (diagonalMirror) {
            drawPoint(nboxes - y + 1, nboxes - x + 1, false);
          }
          if (diagonalMirror2) {
            drawPoint(y, x, false);
          }
          if (diagonalMirror & diagonalMirror2) {
            drawPoint(nboxes - x + 1, nboxes - y + 1, false);
          }
          if (circularMirror) {
            drawPoint(nboxes - x + 1, nboxes - y + 1, false);
          }
        }
      }
    }
  }
  encryptGrid();
}

function clearDrawing() {
  backupUndo = document.getElementById('output3').value;
  document.getElementById('numBoxes').value = 20;
  document.getElementById('boxSize').value = 15;
  createEncryptionGrid(false);
}

function createEncryptionGrid(resetSettings) {
  if (resetSettings) {
    brushsize = 1;
    document.getElementById('brushSizeLabel').innerText = '1px';
    document.getElementById('horizontalMirror').checked = false;
    document.getElementById('verticalMirror').checked = false;
    document.getElementById('diagonalMirror').checked = false;
    document.getElementById('diagonalMirror2').checked = false;
    document.getElementById('circularMirror').checked = false;
  }
  nboxes = document.getElementById('numBoxes').value;
  var size = document.getElementById('boxSize').value;
  var w = size * nboxes;
  if (w <= 300) w = 300;
  document.getElementById('output3').style.width = w + 'px';
  var t = '';
  for (var y = 1; y <= nboxes; y++) {
    for (var x = 1; x <= nboxes; x++) {
      t =
        t +
        "<button class='encryptionButton' id='" +
        x +
        ',' +
        y +
        "' style='background-color:#FFFFFF; width:" +
        size +
        'px;height:' +
        size +
        "px;' onmouseover='buttonClicked(false," +
        x +
        ',' +
        y +
        ")' onmousedown='buttonClicked(true," +
        x +
        ',' +
        y +
        ")'></button>";
    }
    t = t + '<br><b>';
  }
  document.getElementById('drawgrid').innerHTML = t;
  encryptGrid();
}

function updateEncryptionGrid() {
  backupUndo = document.getElementById('output3').value;
  if (document.getElementById('numBoxes').value < 2)
    document.getElementById('numBoxes').value = 2;
  if (document.getElementById('boxSize').value < 5)
    document.getElementById('boxSize').value = 5;
  oldnboxes = nboxes;
  nboxes = document.getElementById('numBoxes').value;
  nboxchange = nboxes - oldnboxes;
  var size = document.getElementById('boxSize').value;
  var w = size * nboxes;
  if (w <= 400) w = 400;
  document.getElementById('output3').style.width = w + 'px';
  var t = '';
  for (var y = 1; y <= nboxes; y++) {
    for (var x = 1; x <= nboxes; x++) {
      if (document.getElementById(x + ',' + y)) {
        if (
          document.getElementById(x + ',' + y).style
            .backgroundColor == 'rgb(255, 255, 255)'
        ) {
          t =
            t +
            "<button class='encryptionButton' id='" +
            x +
            ',' +
            y +
            "' style='background-color:#FFFFFF; width:" +
            size +
            'px;height:' +
            size +
            "px;' onmouseover='buttonClicked(false," +
            x +
            ',' +
            y +
            ")' onmousedown='buttonClicked(true," +
            x +
            ',' +
            y +
            ")'></button>";
        } else {
          t =
            t +
            "<button class='encryptionButton' id='" +
            x +
            ',' +
            y +
            "' style='background-color:#000000; width:" +
            size +
            'px;height:' +
            size +
            "px;' onmouseover='buttonClicked(false," +
            x +
            ',' +
            y +
            ")' onmousedown='buttonClicked(true," +
            x +
            ',' +
            y +
            ")'></button>";
        }
      } else {
        t =
          t +
          "<button class='encryptionButton' id='" +
          x +
          ',' +
          y +
          "' style='background-color:#FFFFFF; width:" +
          size +
          'px;height:' +
          size +
          "px;' onmouseover='buttonClicked(false," +
          x +
          ',' +
          y +
          ")' onmousedown='buttonClicked(true," +
          x +
          ',' +
          y +
          ")'></button>";
      }
    }
    t = t + '<br><b>';
  }
  document.getElementById('drawgrid').innerHTML = t;
  encryptGrid();
}

function buttonClicked(clicked, x, y) {
  verticalMirror = document.getElementById('verticalMirror')
    .checked;
  horizontalMirror = document.getElementById('horizontalMirror')
    .checked;
  diagonalMirror = document.getElementById('diagonalMirror')
    .checked;
  diagonalMirror2 = document.getElementById('diagonalMirror2')
    .checked;
  circularMirror = document.getElementById('circularMirror')
    .checked;
  if (brushsize > nboxes) brushsize = nboxes;
  if (brushsize < 1) brushsize = 1;
  if (mouseDown | clicked) {
    if (clicked) {
      startColor = document.getElementById(x + ',' + y).style
        .backgroundColor;
    }
    if (drawType == 4) {
      if (mouseDown == false) {
        backupUndo = document.getElementById('output3').value;
        var btn = document.getElementById(x + ',' + y);
        if (btn.style.backgroundColor == 'rgb(255, 255, 255)') {
          fill(x, y, 'rgb(0, 0, 0)');
        } else {
          fill(x, y, 'rgb(255, 255, 255)');
        }
      }
      return;
    }
    drawPoint(x, y, true);
    if (horizontalMirror) {
      drawPoint(x, nboxes - y + 1, true);
    }
    if (verticalMirror) {
      drawPoint(nboxes - x + 1, y, true);
    }
    if (horizontalMirror & verticalMirror) {
      drawPoint(nboxes - x + 1, nboxes - y + 1, true);
    }
    if (diagonalMirror) {
      drawPoint(nboxes - y + 1, nboxes - x + 1, true);
    }
    if (diagonalMirror2) {
      drawPoint(y, x, true);
    }
    if (diagonalMirror & diagonalMirror2) {
      drawPoint(nboxes - x + 1, nboxes - y + 1, true);
    }
    if (circularMirror) {
      drawPoint(nboxes - x + 1, nboxes - y + 1, true);
    }
    if (clicked)
      backupUndo = document.getElementById('output3').value;
  }
}

function drawPoint(x, y, useDefault) {
  if (useDefault & (drawType != 4)) {
    startOffset = Math.floor((brushsize + 1) / 2) - 1;
    stopOffset = Math.ceil((brushsize + 1) / 2) - 1;
  } else {
    startOffset = 0;
    stopOffset = 0;
  }
  for (yi = y - startOffset; yi <= y + stopOffset; yi++) {
    for (xi = x - startOffset; xi <= x + stopOffset; xi++) {
      if (document.getElementById(xi + ',' + yi)) {
        var btn = document.getElementById(xi + ',' + yi);
        if ((drawType == 1) & useDefault) {
          if (startColor == 'rgb(255, 255, 255)') {
            btn.style.backgroundColor = '#FFFFFF';
          } else {
            btn.style.backgroundColor = '#000000';
          }
        }
        if ((drawType == 2) & useDefault) {
          if (startColor == 'rgb(255, 255, 255)') {
            btn.style.backgroundColor = '#000000';
          } else {
            btn.style.backgroundColor = '#FFFFFF';
          }
        }
        if ((drawType == 3) | (useDefault == false)) {
          if (btn.style.backgroundColor == 'rgb(255, 255, 255)') {
            btn.style.backgroundColor = '#000000';
          } else {
            btn.style.backgroundColor = '#FFFFFF';
          }
        }
      }
    }
  }
}

function fill(startx, starty, color) {
  document.getElementById(
    startx + ',' + starty
  ).style.backgroundColor = color;
  activex = new Array();
  activey = new Array();
  activex.push(startx);
  activey.push(starty);
  while (activex.length > 0) {
    for (var i = 0; i < activex.length; i++) {
      check(activex[i] - 1, activey[i], color);
      check(activex[i] + 1, activey[i], color);
      check(activex[i], activey[i] - 1, color);
      check(activex[i], activey[i] + 1, color);
      activex.splice(i, 1);
      activey.splice(i, 1);
    }
  }
}

function check(x, y, color) {
  if (document.getElementById(x + ',' + y)) {
    if (
      document.getElementById(x + ',' + y).style
        .backgroundColor != color
    ) {
      document.getElementById(
        x + ',' + y
      ).style.backgroundColor = color;
      activex.push(x);
      activey.push(y);
    }
  }
}

function drawToolbox(type) {
  drawType = type;
  if (type == 1) {
    document.getElementById('draw1').disabled = true;
    document.getElementById('draw2').disabled = false;
    document.getElementById('draw3').disabled = false;
    document.getElementById('draw4').disabled = false;
    document.getElementById('draw1').style.backgroundColor =
      '#CCCCCC';
    document.getElementById('draw2').style.backgroundColor = '';
    document.getElementById('draw3').style.backgroundColor = '';
    document.getElementById('draw4').style.backgroundColor = '';
  }
  if (type == 2) {
    document.getElementById('draw1').disabled = false;
    document.getElementById('draw2').disabled = true;
    document.getElementById('draw3').disabled = false;
    document.getElementById('draw4').disabled = false;
    document.getElementById('draw1').style.backgroundColor = '';
    document.getElementById('draw2').style.backgroundColor =
      '#CCCCCC';
    document.getElementById('draw3').style.backgroundColor = '';
    document.getElementById('draw4').style.backgroundColor = '';
  }
  if (type == 3) {
    document.getElementById('draw1').disabled = false;
    document.getElementById('draw2').disabled = false;
    document.getElementById('draw3').disabled = true;
    document.getElementById('draw4').disabled = false;
    document.getElementById('draw1').style.backgroundColor = '';
    document.getElementById('draw2').style.backgroundColor = '';
    document.getElementById('draw3').style.backgroundColor =
      '#CCCCCC';
    document.getElementById('draw4').style.backgroundColor = '';
  }
  if (type == 4) {
    document.getElementById('draw1').disabled = false;
    document.getElementById('draw2').disabled = false;
    document.getElementById('draw3').disabled = false;
    document.getElementById('draw4').disabled = true;
    document.getElementById('draw1').style.backgroundColor = '';
    document.getElementById('draw2').style.backgroundColor = '';
    document.getElementById('draw3').style.backgroundColor = '';
    document.getElementById('draw4').style.backgroundColor =
      '#CCCCCC';
  }
}

function resetDraw() {
  document.getElementById('brushSizeLabel').innerText = '1px';
  document.getElementById('horizontalMirror').checked = false;
  document.getElementById('verticalMirror').checked = false;
  document.getElementById('diagonalMirror').checked = false;
  document.getElementById('diagonalMirror2').checked = false;
  document.getElementById('circularMirror').checked = false;
  document.getElementById('decryptTextarea').value = '';
  document.getElementById('output4').innerHTML = '';
  document.getElementById('editDrawing').hidden = true;
  drawToolbox(2);
  nboxes = 0;
  brushsize = 1;
  verticalMirror = false;
  horizontalMirror = false;
  diagonalMirror = false;
  diagonalMirror2 = false;
  circularMirror = false;
}

function brushSize(increment) {
  if (increment == 0) {
    brushsize--;
  } else {
    brushsize++;
  }
  if (brushsize > nboxes) brushsize = nboxes;
  if (brushsize < 1) brushsize = 1;
  document.getElementById('brushSizeLabel').innerText =
    brushsize + 'px';
}

function mirrorSelected(selection) {
  if (selection == 5) {
    if (
      document.getElementById('horizontalMirror').checked &
      document.getElementById('verticalMirror').checked
    ) {
      document.getElementById('horizontalMirror').checked = false;
      document.getElementById('verticalMirror').checked = false;
    }
    if (
      document.getElementById('diagonalMirror').checked &
      document.getElementById('diagonalMirror2').checked
    ) {
      document.getElementById('diagonalMirror').checked = false;
      document.getElementById('diagonalMirror2').checked = false;
    }
  }
  if (
    (selection == 1) |
    (selection == 2) |
    (selection == 3) |
    (selection == 4)
  ) {
    if (
      document.getElementById('horizontalMirror').checked &
      document.getElementById('verticalMirror').checked
    ) {
      if (document.getElementById('circularMirror').checked) {
        document.getElementById('circularMirror').checked = false;
      }
    }
    if (
      document.getElementById('diagonalMirror').checked &
      document.getElementById('diagonalMirror2').checked
    ) {
      if (document.getElementById('circularMirror').checked) {
        document.getElementById('circularMirror').checked = false;
      }
    }
  }
}

function getGridBinary() {
  nboxes = document.getElementById('numBoxes').value;
  var l = Number(nboxes) - 0.5;
  var count = 0;
  var x = 1;
  var y = 1;
  bin = '';
  while (l > 0) {
    count++;
    if ((l == nboxes - 1.5) & (count == 3)) l += 0.5;
    if ((l == 0.5) & (count == 4) & (nboxes % 2 == 0)) l += 0.5;
    if ((l == 0.5) & (count == 2) & (nboxes % 2 == 1)) l += 0.5;
    for (var i = 1; i <= l; i++) {
      btn = document.getElementById(x + ',' + y);
      if (btn) {
        if (btn.style.backgroundColor == 'rgb(255, 255, 255)') {
          bin = bin + '0';
        } else {
          bin = bin + '1';
        }
      }
      if (count == 1) x++;
      if (count == 2) y++;
      if (count == 3) x--;
      if (count == 4) y--;
    }
    l -= 0.5;
    if (count == 4) count = 0;
  }
  return bin;
}

function encryptGrid() {
  var size = document.getElementById('boxSize').value;
  var w = size * nboxes;
  if (w >= 400)
    document.getElementById('output3').style.width = w + 'px';
  var bin = getGridBinary();
  var e = '';
  var s = '';
  var characters =
    'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM 1234567890-+.?!';
  var count = 0;
  for (i = 0; i < Math.ceil(bin.length / 52); i++) {
    b = '1' + bin.substr(i * 52, 52);
    var dec = 0;
    for (var j = 0; j < b.length; j++) {
      dec = dec + b.charAt(j) * Math.pow(2, b.length - j - 1);
    }
    var q = dec;
    olds = s;
    s = '';
    while (q != 0) {
      s = characters.charAt(q % characters.length) + s;
      q = Math.floor(q / characters.length);
    }
    if ((olds == s) & (count < characters.length - 2)) {
      count++;
    } else {
      var c = characters.charAt(count);
      if (count >= 1) {
        e = e.substr(0, e.length - 10) + c + olds;
        e = e + characters.charAt(0) + s;
      } else {
        e = e + c + s;
      }
      count = 0;
    }
  }
  if (count > 1) {
    var c = characters.charAt(count);
    e = e + c + olds;
  }
  document.getElementById('output3').innerHTML = e;
  document.getElementById('output3').title =
    'Length: \t' + e.length + ' characters';
}

function decrypt(valueToUse) {
  if (valueToUse == '') {
    decryptTextareaChange(false);
    e = document.getElementById('decryptTextarea').value;
  } else {
    e = valueToUse;
  }
  colonNum = '';
  colonSize = '';
  if (e.indexOf(':') != -1) {
    colonNum = e.substr(1 + e.indexOf(':'));
    e = e.substr(0, e.indexOf(':'));
  }
  if (colonNum.indexOf(':') != -1) {
    colonSize = colonNum.substr(1 + colonNum.indexOf(':'));
    colonNum = colonNum.substr(0, colonNum.indexOf(':'));
  }
  if (e.length <= 1) return;
  if (
    (valueToUse == '') &
    (document.getElementById('encryptionCount').innerHTML != '')
  )
    return;
  var characters =
    'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM 1234567890-+.?!';
  var b = '';
  var binary = '';
  for (var i = 0; i < Math.ceil(e.length / 10); i++) {
    b = e.substr(i * 10 + 1, 9);
    n = characters.indexOf(e.substr(i * 10, 1)) + 1;
    for (var j = 1; j <= n; j++) {
      var num = 0;
      for (var k = 0; k < b.length; k++) {
        //convert to decimal format
        var index = characters.indexOf(b.charAt(k));
        num =
          num +
          Number(index) *
            Math.pow(characters.length, b.length - k - 1);
      }
      var bin = '';
      var q = num;
      while (q != 0) {
        bin = (q % 2).toString() + bin;
        q = Math.floor(q / 2);
      }
      binary = binary + bin.substr(1, bin.length - 1);
    }
  }
  var size = 0;
  if (colonSize == '') {
    size = Math.ceil(
      document.getElementById('boxSize').value / 1.3
    );
  } else {
    var defaultCharacters =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    var num = 0;
    for (var i = 0; i < colonSize.length; i++) {
      var index = defaultCharacters.indexOf(colonSize.charAt(i));
      num =
        num +
        Number(index) * Math.pow(10, colonSize.length - i - 1);
    }
    if (num < 5)
      num = Math.ceil(
        document.getElementById('boxSize').value / 1.3
      );
    size = num;
  }
  if (valueToUse != '')
    size = Math.ceil(document.getElementById('boxSize').value);
  if (colonNum == '') {
    encryptionNboxes = Math.ceil(Math.sqrt(binary.length));
  } else {
    var defaultCharacters =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    var num = 0;
    for (var i = 0; i < colonNum.length; i++) {
      var index = defaultCharacters.indexOf(colonNum.charAt(i));
      num =
        num +
        Number(index) * Math.pow(10, colonNum.length - i - 1);
    }
    if (num < 2) num = Math.ceil(Math.sqrt(binary.length));
    encryptionNboxes = num;
  }
  if (
    (encryptionNboxes >= 100) &
    (backupEncryptionNboxes != encryptionNboxes)
  ) {
    alert(
      'Warning! You are about to create ' +
        encryptionNboxes * encryptionNboxes +
        ' buttons!'
    );
    backupEncryptionNboxes = encryptionNboxes;
    return;
  }
  backupEncryptionNboxes = encryptionNboxes;
  if (valueToUse == '') {
    var t = '';
    for (var y = 1; y <= encryptionNboxes; y++) {
      for (var x = 1; x <= encryptionNboxes; x++) {
        t =
          t +
          "<button id='decrypted" +
          x +
          ',' +
          y +
          "' disabled class='encryptionButton' style='background-color:#FFFFFF; width:" +
          size +
          'px;height:' +
          size +
          "px;'></button>";
      }
      t = t + '<br><b>';
    }
    document.getElementById('output4').innerHTML = t;
  } else {
    document.getElementById('numBoxes').value = encryptionNboxes;
    document.getElementById('boxSize').value = size;
    createEncryptionGrid(false);
  }
  var l = Number(encryptionNboxes) - 0.5;
  var count = 0;
  var x = 1;
  var y = 1;
  var b = 0;
  while (l > 0) {
    count++;
    if ((l == encryptionNboxes - 1.5) & (count == 3)) l += 0.5;
    if ((l == 0.5) & (count == 4) & (encryptionNboxes % 2 == 0))
      l += 0.5;
    if ((l == 0.5) & (count == 2) & (encryptionNboxes % 2 == 1))
      l += 0.5;
    for (var i = 1; i <= l; i++) {
      if (valueToUse == '') {
        if (document.getElementById('decrypted' + x + ',' + y)) {
          btn = document.getElementById(
            'decrypted' + x + ',' + y
          );
          if (binary.charAt(b) == '1') {
            btn.style.backgroundColor = '#101010';
          } else {
            btn.style.backgroundColor = '#FFFFFF';
          }
          b++;
        }
      } else {
        if (document.getElementById(x + ',' + y)) {
          btn = document.getElementById(x + ',' + y);
          if (binary.charAt(b) == '1') {
            btn.style.backgroundColor = '#000000';
          } else {
            btn.style.backgroundColor = '#FFFFFF';
          }
          b++;
        }
      }
      if (count == 1) x++;
      if (count == 2) y++;
      if (count == 3) x--;
      if (count == 4) y--;
    }
    l -= 0.5;
    if (count == 4) count = 0;
  }
  if (valueToUse == '') {
    document.getElementById('editDrawing').hidden = false;
  } else {
    document.getElementById('numBoxes').value = encryptionNboxes;
  }
  document.getElementById('output4').title =
    'Number of Boxes: ' +
    encryptionNboxes +
    '\nBox Sizes: ' +
    size +
    'px';
}

function editDrawing() {
  backupUndo = document.getElementById('output3').value;
  document.getElementById('numBoxes').value = encryptionNboxes;
  createEncryptionGrid(true);
  for (var y = 1; y <= encryptionNboxes; y++) {
    for (var x = 1; x <= encryptionNboxes; x++) {
      if (
        document.getElementById('decrypted' + x + ',' + y).style
          .backgroundColor == 'rgb(255, 255, 255)'
      ) {
        document.getElementById(
          x + ',' + y
        ).style.backgroundColor = 'rgb(255, 255, 255)';
      } else {
        document.getElementById(
          x + ',' + y
        ).style.backgroundColor = 'rgb(0, 0, 0)';
      }
    }
  }
  encryptGrid();
  document.getElementById('1,1').focus();
  document.getElementById('1,1').blur();
}

function copyDown() {
  document.getElementById(
    'decryptTextarea'
  ).value = document.getElementById('output3').value;
  decrypt('');
  document.getElementById('decryptTextarea').focus();
}

function decryptTextareaChange(edited) {
  var characters =
    'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM 1234567890-+.?!';
  var v = document.getElementById('decryptTextarea').value;
  var v2 = v;
  if (v2.indexOf(':') != -1) v2 = v2.substr(0, v2.indexOf(':'));
  if (v2.length % 10 == 1) {
    document.getElementById('encryptionCount').innerHTML =
      '[Invalid Length! Please Add or Remove a Character]';
  } else {
    document.getElementById('encryptionCount').innerHTML = '';
  }
  var fixedVal = v;
  var notAllowed = '';
  changes = 0;
  var colons = 0;
  for (var b = 0; b < v.length; b++) {
    var index = characters.indexOf(v.charAt(b));
    if (index == -1) {
      if ((v.charAt(b) == ':') & (colons < 2)) {
        colons++;
      } else {
        notAllowed += '(' + v.charAt(b) + ')';
        fixedVal =
          fixedVal.substr(0, b) +
          '*' +
          v.substr(b + 1, v.length - 1);
        changes++;
      }
    }
  }
  for (var i = 1; i <= changes; i++) {
    fixedVal = fixedVal.replace('*', '');
  }
  if (changes == 1)
    alert('The character: ' + notAllowed + ' is not allowed.');
  if (changes > 1)
    alert('The characters: ' + notAllowed + ' are not allowed.');
  document.getElementById('decryptTextarea').value = fixedVal;
  if (edited) decrypt('');
}

function incrementDecryption(n) {
  var v = document.getElementById('decryptTextarea').value;
  var colonString = '';
  if (v.indexOf(':') != -1) {
    colonString = v.substr(v.indexOf(':'));
    v = v.substr(0, v.indexOf(':'));
  }
  var numColumns = Math.ceil(v.length / 10);
  if (decryptIncrementColumn > numColumns - 1)
    decryptIncrementColumn = numColumns - 1;
  if (decryptIncrementColumn < 0) decryptIncrementColumn = 0;
  s = v
    .substr((numColumns - decryptIncrementColumn - 1) * 10, 10)
    .substr(1);
  if (s == '') s = 'q';
  var characters =
    'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM 1234567890-+.?!';
  var num = 0;
  for (var i = 0; i < s.length; i++) {
    var index = characters.indexOf(s.charAt(i));
    num =
      num +
      Number(index) *
        Math.pow(characters.length, s.length - i - 1);
  }
  if (n == 1) {
    num++;
  } else {
    num--;
  }
  if (num < 0) num = 0;
  var bin = '';
  var q = num;
  while (q != 0) {
    bin = characters.charAt(q % characters.length) + bin;
    q = Math.floor(q / characters.length);
  }
  var finalString =
    v.substr(
      0,
      1 + (numColumns - decryptIncrementColumn - 1) * 10
    ) +
    bin +
    v.substr(10 + (numColumns - decryptIncrementColumn - 1) * 10);
  document.getElementById('decryptTextarea').value =
    finalString + colonString;
  decrypt('');
}

function undo() {
  if (undos.length > 0) {
    redos.push(document.getElementById('output3').value);
    document.getElementById('redoButton').disabled = false;
    decrypt(undos[undos.length - 1]);
    undos.pop();
    encryptGrid();
  }
  if (undos.length == 0) {
    document.getElementById('undoButton').disabled = true;
  }
}

function redo() {
  if (redos.length > 0) {
    undos.push(document.getElementById('output3').value);
    document.getElementById('undoButton').disabled = false;
    decrypt(redos[redos.length - 1]);
    redos.pop();
    encryptGrid();
  }
  if (redos.length == 0) {
    document.getElementById('redoButton').disabled = true;
  }
}
document.body.addEventListener('keydown', function(e) {
  var evtobj = window.event ? event : e;
  var unicode = evtobj.charCode
    ? evtobj.charCode
    : evtobj.keyCode;
  if (document.activeElement.id == 'base1') {
    if ((unicode == 13) | (unicode == 39)) {
      //enter or right
      document.getElementById('base2').focus();
      return false;
    }
    if (unicode == 38) {
      //up
      var a =
        chars.indexOf(document.getElementById('base1').value) + 1;
      if (a > chars.length - 1) a = chars.length - 1;
      document.getElementById('base1').value = chars.charAt(a);
      initGlobalVars();
      return false;
    }
    if (unicode == 40) {
      //down
      var a =
        chars.indexOf(document.getElementById('base1').value) - 1;
      if (a < 0) a = 0;
      document.getElementById('base1').value = chars.charAt(a);
      initGlobalVars();
      return false;
    }
  }
  if (document.activeElement.id == 'base2') {
    if ((unicode == 13) | (unicode == 39)) {
      document.getElementById('count1').focus();
      return false;
    }
    if (unicode == 37) {
      //left
      document.getElementById('base1').focus();
      initGlobalVars();
      return false;
    }
    if (unicode == 38) {
      //up
      var a =
        chars.indexOf(document.getElementById('base2').value) + 1;
      if (a > chars.length - 1) a = chars.length - 1;
      document.getElementById('base2').value = chars.charAt(a);
      initGlobalVars();
      return false;
    }
    if (unicode == 40) {
      //down
      var a =
        chars.indexOf(document.getElementById('base2').value) - 1;
      if (a < 0) a = 0;
      document.getElementById('base2').value = chars.charAt(a);
      initGlobalVars();
      return false;
    }
  }
  if (document.activeElement.id == 'count1') {
    if (unicode == 13) {
      document.getElementById('count2').focus();
      return false;
    }
  }
  if (document.activeElement.id == 'count2') {
    if (unicode == 13) {
      calculate();
      document.getElementById('base1').focus();
      return false;
    }
  }
  if (document.activeElement.id == 'order') {
    if (unicode == 13) {
      characterOrderChanged();
      return false;
    }
  }
  if (document.activeElement.id == 'valueToConvert') {
    if (unicode == 13) {
      document.getElementById('columnToSearch').focus();
      document
        .getElementById('columnToSearch')
        .setSelectionRange(
          0,
          document.getElementById('columnToSearch').value.length
        );
      return false;
    }
  }
  if (document.activeElement.id == 'columnToSearch') {
    if (unicode == 13) {
      convert();
      document.getElementById('valueToConvert').focus();
      return false;
    }
    if (unicode == 38) {
      //up
      var a =
        searchCharsLimit.indexOf(
          document.getElementById('columnToSearch').value
        ) + 1;
      if (a > searchCharsLimit.length - 1)
        a = searchCharsLimit.length - 1;
      document.getElementById(
        'columnToSearch'
      ).value = searchCharsLimit.charAt(a);
      return false;
    }
    if (unicode == 40) {
      //down
      var a =
        searchCharsLimit.indexOf(
          document.getElementById('columnToSearch').value
        ) - 1;
      if (a < 0) a = 0;
      document.getElementById(
        'columnToSearch'
      ).value = searchCharsLimit.charAt(a);
      return false;
    }
  }
  if (document.activeElement.id == 'numBoxes') {
    if (unicode == 13) {
      updateEncryptionGrid();
      document.getElementById('boxSize').focus();
      return false;
    }
  }
  if (document.activeElement.id == 'boxSize') {
    if (unicode == 13) {
      updateEncryptionGrid();
      document.getElementById('numBoxes').focus();
      return false;
    }
  }
  if (document.activeElement.id == 'output3') {
    if (unicode == 13) {
      copyDown();
      return false;
    }
  }
  if (document.activeElement.id == 'decryptTextarea') {
    if (unicode == 13) {
      //enter
      decrypt('');
      return false;
    }
    if (evtobj.ctrlKey) {
      if (unicode == 38) {
        //up
        incrementDecryption(1);
        return false;
      }
      if (unicode == 40) {
        //down
        incrementDecryption(2);
        return false;
      }
      if (unicode == 37) {
        //left
        decryptIncrementColumn++;
        return false;
      }
      if (unicode == 39) {
        //right
        decryptIncrementColumn--;
        return false;
      }
    }
  }
});

function preCharOrder(type) {
  switch (type) {
    case 0:
      document.getElementById('order').value =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
      document.getElementById('base1').value = '0';
      document.getElementById('base2').value = '~';
      break;
    case 1:
      document.getElementById('order').value = '01';
      document.getElementById('base1').value = '0';
      document.getElementById('base2').value = '1';
      break;
    case 2:
      document.getElementById('order').value = '0123456789';
      document.getElementById('base1').value = '0';
      document.getElementById('base2').value = '9';
      break;
    case 3:
      document.getElementById('order').value = '0123456789ABCDEF';
      document.getElementById('base1').value = '0';
      document.getElementById('base2').value = 'F';
      break;
    case 4:
      document.getElementById('order').value =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      document.getElementById('base1').value = 'A';
      document.getElementById('base2').value = '/';
      break;
    case 5:
      document.getElementById('order').value =
        'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM 1234567890-+.?!';
      document.getElementById('base1').value = 'q';
      document.getElementById('base2').value = '!';
      break;
    case 5:
      document.getElementById('order').value =
        'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM 1234567890-+.?!';
      document.getElementById('base1').value = 'q';
      document.getElementById('base2').value = '!';
      break;
    case 6:
      document.getElementById('order').value =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      document.getElementById('base1').value = 'A';
      document.getElementById('base2').value = 'Z';
      break;
    case 7:
      document.getElementById('order').value =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      document.getElementById('base1').value = 'A';
      document.getElementById('base2').value = 'z';
      break;
  }
  calculate();
}

calculate();
createEncryptionGrid(true);
