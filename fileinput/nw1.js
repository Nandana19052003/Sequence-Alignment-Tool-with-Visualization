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
    document.getElementById('alignmentScore').innerHTML = '';
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
  
    // Calculate the alignment score
    var alignmentScore = 0;
    for (i = 0; i < alignment1.length; i++) {
      if (alignment1[i] === alignment2[i]) {
        alignmentScore += matchScore;
      } else {
        alignmentScore += mismatchScore;
      }
    }
  
    return {
      alignment: alignment1 + '<br>' + alignment2,
      score: alignmentScore
    };
  }
  
  function loadSequence(event, sequenceIdentifier) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
      var text = reader.result;
      if (sequenceIdentifier === 'sequence1') {
        document.getElementById('sequence1').value = text;
      } else if (sequenceIdentifier === 'sequence2') {
        document.getElementById('sequence2').value = text;
      }
    };
    reader.readAsText(input.files[0]);
  }
  