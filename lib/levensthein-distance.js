/**
 * Gives you a array with filled with 1 to amount.
 * @param {number} amount
 * @returns {number[]}
 */
function range(amount) {
  const range = Array.from({amount});
  range[0] = 1;
  for (let i = 1; range[i - 1] < amount; i++) range[i] = i + 1;
  return range;
}

/**
 * Check if the amount of edits between firstString and secondString is <= maxEdits.
 * It uses the Levenshtein distance algorithm with the two matrix rows variant.
 * @param {string} firstString First string to be checked against the other string
 * @param {string} secondString Second string to be checked against the other string
 * @param {number} maxEdit The maximum amount of edits that these 2 string should have.
 * @returns {boolean} indicate if the 2 strings's edits are less or equal to maxEdits
 */
function LevenshteinDistanceWithMax(firstString, secondString, maxEdit) {
  const lenOne = firstString.length;
  const lenTwo = secondString.length;

  const lenDiff = Math.abs(lenOne - lenTwo);
  // Are the difference between 2 lengths greater than
  // maxEdit, we know to bail out early on.
  if (lenDiff > maxEdit) {
    return false;
  }

  const distance = range(lenOne);
  let lastDistanceCost;
  let editCost;
  for (let i = 1; i <= lenTwo; i++) {
    // Calculate the current row distances from the previous row.
    distance[0] = i;
    lastDistanceCost = i - 1;
    let CurrentCostForRow = maxEdit + 1;
    for (let j = 1; j <= lenOne; j++) {
      let minimumCost = distance[j] + 1;
      if ((distance[j - 1] + 1) < minimumCost) {
        minimumCost = distance[j - 1] + 1;
      }

      editCost = firstString[j - 1] === secondString[i - 1] ? 0 : 1;
      if ((lastDistanceCost + editCost) < minimumCost) {
        minimumCost = lastDistanceCost + editCost;
      }

      if (minimumCost < CurrentCostForRow) {
        CurrentCostForRow = minimumCost;
      }
      
      lastDistanceCost = distance[j];
      distance[j] = minimumCost;
    }

    // Check after each row if maxEdit is less than miniumCostRow
    // to know when to stop early on.
    if (CurrentCostForRow > maxEdit) {
      return false;
    }
  }

  return true;
}

module.exports = {
  LevenshteinDistanceWithMax
};