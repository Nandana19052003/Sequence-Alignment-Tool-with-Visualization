// Function to compute the Smith-Waterman algorithm
function alignSequences() {
  // Get input values
  var sequence1 = document.getElementById('sequence1').value;
  var sequence2 = document.getElementById('sequence2').value;
  var matchScore = parseInt(document.getElementById('matchScore').value);
  var mismatchScore = parseInt(document.getElementById('mismatchScore').value);
  var gapScore = parseInt(document.getElementById('gapScore').value);

  // Perform sequence alignment
  var alignment = smithWaterman(sequence1, sequence2, matchScore, mismatchScore, gapScore);

  // Display alignment result
  document.getElementById('alignmentResult').textContent = alignment.result;
  document.getElementById('alignmentScore').innerHTML = 'Score: ' + alignment.score;

  // Display alignment matrix
  var matrixHtml = '';
  for (var i = 0; i < alignment.matrix.length; i++) {
    matrixHtml += '<tr>';
    for (var j = 0; j < alignment.matrix[i].length; j++) {
      matrixHtml += '<td>' + alignment.matrix[i][j] + '</td>';
    }
    matrixHtml += '</tr>';
  }
  document.getElementById('alignmentMatrix').innerHTML = matrixHtml;
}

// Function to clear the alignment result and matrix
function clearAlignment() {
  document.getElementById('alignmentResult').textContent = '';
  document.getElementById('alignmentScore').textContent = '';
  document.getElementById('alignmentMatrix').innerHTML = '';
}

// Function to perform the Smith-Waterman algorithm
function smithWaterman(sequence1, sequence2, matchScore, mismatchScore, gapScore) {
  // Initialize alignment matrix
  var matrix = [];
  for (var i = 0; i <= sequence1.length; i++) {
    matrix[i] = [];
    for (var j = 0; j <= sequence2.length; j++) {
      matrix[i][j] = 0;
    }
  }

  // Fill the alignment matrix
  var maxScore = 0;
  var maxScorePosition = { i: 0, j: 0 };
  for (var i = 1; i <= sequence1.length; i++) {
    for (var j = 1; j <= sequence2.length; j++) {
      var diagonalScore = matrix[i - 1][j - 1] + (sequence1[i - 1] === sequence2[j - 1] ? matchScore : mismatchScore);
      var topScore = matrix[i - 1][j] + gapScore;
      var leftScore = matrix[i][j - 1] + gapScore;
      var score = Math.max(0, diagonalScore, topScore, leftScore);
      matrix[i][j] = score;
      if (score > maxScore) {
        maxScore = score;
        maxScorePosition = { i: i, j: j };
      }
    }
  }

  // Traceback to compute the alignment
  var alignment1 = '';
  var alignment2 = '';
  var i = maxScorePosition.i;
  var j = maxScorePosition.j;
  while (i > 0 && j > 0 && matrix[i][j] > 0) {
    if (matrix[i][j] === matrix[i - 1][j - 1] + (sequence1[i - 1] === sequence2[j - 1] ? matchScore : mismatchScore)) {
      alignment1 = sequence1[i - 1] + alignment1;
      alignment2 = sequence2[j - 1] + alignment2;
      i--;
      j--;
    } else if (matrix[i][j] === matrix[i - 1][j] + gapScore) {
      alignment1 = sequence1[i - 1] + alignment1;
      alignment2 = '-' + alignment2;
      i--;
    } else if (matrix[i][j] === matrix[i][j - 1] + gapScore) {
      alignment1 = '-' + alignment1;
      alignment2 = sequence2[j - 1] + alignment2;
      j--;
    }
  }

  // Create alignment result object
  var alignment = {
    result: alignment1 + '\n' + alignment2,
    score: maxScore,
    matrix: matrix
  };

  return alignment;
}
