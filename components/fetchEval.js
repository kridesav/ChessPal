
export const fetchEval = async (fen, depth) => {
  const response = await fetch(`https://stockfish.online/api/s/v2.php?fen=${fen}&depth=${depth}`);
  const data = await response.json();
  return data;
};