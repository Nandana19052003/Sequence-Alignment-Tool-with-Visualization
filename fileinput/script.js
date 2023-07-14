// JavaScript code
function alignSequences() {
  var sequence1 = document.getElementById('sequence1').value;
  var sequence2 = document.getElementById('sequence2').value;
  var matchScore = parseInt(document.getElementById('matchScore').value);
  var mismatchScore = parseInt(document.getElementById('mismatchScore').value);
  var gapScore = parseInt(document.getElementById('gapScore').value);

  var alignmentResult = performNeedlemanWunsch(sequence1, sequence2, matchScore, mismatchScore, gapScore); // or performSmithWaterman(sequence1, sequence2);

  document.getElementById('alignmentResult').innerHTML = alignmentResult;
}

function clearAlignment() {
  document.getElementById('sequence1').value = '';
  document.getElementById('sequence2').value = '';
  document.getElementById('matchScore').value = '1';
  document.getElementById('mismatchScore').value = '-1';
  document.getElementById('gapScore').value = '-2';
  document.getElementById('alignmentResult').innerHTML = '';
  document.getElementById('alignmentMatrix').innerHTML = '';
}

// Needleman-Wunsch algorithm implementation
function performNeedlemanWunsch(sequence1, sequence2, matchScore, mismatchScore, gapScore) {
  var matrix = [];
  var i, j;

  // Initialize the matrix with zeros
  for (i = 0; i <= sequence1.length; i++) {
    matrix[i] = [0];
    for (j = 1; j <= sequence2.length; j++) {
      matrix[i][j] = 0;
    }
  }

  // Fill the matrix with scores
  for (i = 1; i <= sequence1.length; i++) {
    matrix[i][0] = matrix[i - 1][0] + gapScore;
  }

  for (j = 1; j <= sequence2.length; j++) {
    matrix[0][j] = matrix[0][j - 1] + gapScore;
  }

  for (i = 1; i <= sequence1.length; i++) {
    for (j = 1; j <= sequence2.length; j++) {
      var diagonal = matrix[i - 1][j - 1] + (sequence1[i - 1] === sequence2[j - 1] ? matchScore : mismatchScore);
      var top = matrix[i - 1][j] + gapScore;
      var left = matrix[i][j - 1] + gapScore;
      matrix[i][j] = Math.max(diagonal, top, left);
    }
  }

  // Render the matrix
  var matrixTable = document.getElementById('alignmentMatrix');
  matrixTable.innerHTML = '';
  for (i = 0; i <= sequence1.length; i++) {
    var row = document.createElement('tr');
    for (j = 0; j <= sequence2.length; j++) {
      var cell = document.createElement('td');
      cell.textContent = matrix[i][j];
      row.appendChild(cell);
    }
    matrixTable.appendChild(row);
  }

  // Traceback to find the alignment
  var alignment1 = '';
  var alignment2 = '';
  i = sequence1.length;
  j = sequence2.length;
  while (i > 0 && j > 0) {
    if (matrix[i][j] === matrix[i - 1][j - 1] + (sequence1[i - 1] === sequence2[j - 1] ? matchScore : mismatchScore)) {
      alignment1 = sequence1[i - 1] + alignment1;
      alignment2 = sequence2[j - 1] + alignment2;
      i--;
      j--;
    } else if (matrix[i][j] === matrix[i - 1][j] + gapScore) {
      alignment1 = sequence1[i - 1] + alignment1;
      alignment2 = '-' + alignment2;
      i--;
    } else {
      alignment1 = '-' + alignment1;
      alignment2 = sequence2[j - 1] + alignment2;
      j--;
    }
  }

  while (i > 0) {
    alignment1 = sequence1[i - 1] + alignment1;
    alignment2 = '-' + alignment2;
    i--;
  }

  while (j > 0) {
    alignment1 = '-' + alignment1;
    alignment2 = sequence2[j - 1] + alignment2;
    j--;
  }

  // Highlight traceback alignment path in red
  var alignmentResult = '';
  var alignmentLength = alignment1.length;
  for (var k = 0; k < alignmentLength; k++) {
    if (alignment1[k] === alignment2[k]) {
      alignmentResult += alignment1[k];
    } else {
      alignmentResult += '<span class="mismatch">' + alignment1[k] + '</span>';
    }
  }

  return alignmentResult + '<br>' + alignment2;
}


function startVisualization() {
  var sequence1 = document.getElementById('sequence1').value;
  var sequence2 = document.getElementById('sequence2').value;

  if (sequence1 && sequence2) {
    var alignmentResult = visualizeSmithWaterman(sequence1, sequence2);

    var visualizationSection = document.getElementById('visualization-section');
    visualizationSection.innerHTML = '';

    var alignmentMatrix = document.createElement('div');
    alignmentMatrix.id = 'alignment-matrix';
    alignmentMatrix.innerHTML = alignmentResult.matrix;
    visualizationSection.appendChild(alignmentMatrix);

    var alignmentResultDiv = document.createElement('div');
    alignmentResultDiv.id = 'alignment-result';
    alignmentResultDiv.textContent = alignmentResult.alignmentResult;
    visualizationSection.appendChild(alignmentResultDiv);

    visualizationSection.classList.remove('hidden');
  }
}

function visualizeSmithWaterman(sequence1, sequence2) {
  // Calculate the alignment matrix and perform traceback
  var matrix = []; // Alignment matrix
  var maxScore = 0; // Maximum score
  var maxScorePos = { row: 0, col: 0 }; // Position of the maximum score
  var alignmentResult = ''; // Alignment result string

  // Initialize the alignment matrix with zeros
  for (var i = 0; i <= sequence1.length; i++) {
    matrix[i] = [];
    for (var j = 0; j <= sequence2.length; j++) {
      matrix[i][j] = 0;
    }
  }

  // Perform the Smith-Waterman algorithm
  for (var i = 1; i <= sequence1.length; i++) {
    for (var j = 1; j <= sequence2.length; j++) {
      if (sequence1[i - 1] === sequence2[j - 1]) {
        // Match
        var matchScore = 1;
        matrix[i][j] = Math.max(
          0,
          matrix[i - 1][j - 1] + matchScore,
          matrix[i][j - 1] - 1,
          matrix[i - 1][j] - 1
        );
      } else {
        // Mismatch
        var mismatchScore = -1;
        matrix[i][j] = Math.max(
          0,
          matrix[i - 1][j - 1] + mismatchScore,
          matrix[i][j - 1] - 1,
          matrix[i - 1][j] - 1
        );
      }

      // Update the maximum score and its position
      if (matrix[i][j] > maxScore) {
        maxScore = matrix[i][j];
        maxScorePos = { row: i, col: j };
      }
    }
  }

  // Perform traceback to generate the alignment result
  var row = maxScorePos.row;
  var col = maxScorePos.col;

  while (matrix[row][col] !== 0) {
    if (sequence1[row - 1] === sequence2[col - 1]) {
      alignmentResult = sequence1[row - 1] + alignmentResult;
    } else {
      alignmentResult = '-' + alignmentResult;
    }

    var currentScore = matrix[row][col];
    var diagonalScore = matrix[row - 1][col - 1];
    var leftScore = matrix[row][col - 1];
    var topScore = matrix[row - 1][col];

    if (currentScore === diagonalScore + 1 && sequence1[row - 1] === sequence2[col - 1]) {
      row--;
      col--;
    } else if (currentScore === diagonalScore - 1) {
      row--;
      col--;
    } else if (currentScore === leftScore - 1) {
      col--;
    } else if (currentScore === topScore - 1) {
      row--;
    }
  }

  // Return the alignment result and matrix
  return {
    alignmentResult: alignmentResult,
    matrix: getMatrixHTML(matrix),
  };
}

function getMatrixHTML(matrix) {
  var html = '<table>';
  for (var i = 0; i < matrix.length; i++) {
    html += '<tr>';
    for (var j = 0; j < matrix[i].length; j++) {
      html += '<td>' + matrix[i][j] + '</td>';
    }
    html += '</tr>';
  }
  html += '</table>';
  return html;
}
