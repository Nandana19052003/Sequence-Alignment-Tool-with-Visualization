function alignSequences() {
  var sequence1 = document.getElementById('sequence1').value;
  var sequence2 = document.getElementById('sequence2').value;
  var matchScore = parseInt(document.getElementById('matchScore').value);
  var mismatchScore = parseInt(document.getElementById('mismatchScore').value);
  var gapScore = parseInt(document.getElementById('gapScore').value);

  var alignmentResult = performNeedlemanWunsch(sequence1, sequence2, matchScore, mismatchScore, gapScore);

  document.getElementById('alignmentResult').innerHTML = alignmentResult.alignment;
  document.getElementById('alignmentScore').innerHTML = 'Score: ' + alignmentResult.score;
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
    var currentScore = matrix[i][j];
    var diagonalScore = matrix[i - 1][j - 1];
    var topScore = matrix[i - 1][j];
    var leftScore = matrix[i][j - 1];

    if (currentScore === diagonalScore + (sequence1[i - 1] === sequence2[j - 1] ? matchScore : mismatchScore)) {
      alignment1 = sequence1[i - 1] + alignment1;
      alignment2 = sequence2[j - 1] + alignment2;
      i--;
      j--;
    } else if (currentScore === topScore + gapScore) {
      alignment1 = '-' + alignment1;
      alignment2 = sequence2[j - 1] + alignment2;
      j--;
    } else {
      alignment1 = sequence1[i - 1] + alignment1;
      alignment2 = '-' + alignment2;
      i--;
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

  // Calculate the alignment score
  var alignmentScore = matrix[sequence1.length][sequence2.length];

  // Return the alignment result and score
  return {
    alignment: alignmentResult + '<br>' + alignment2,
    score: alignmentScore
  };
}
