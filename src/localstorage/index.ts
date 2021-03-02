import { store } from "../store";

const storeLastGame = () => {
  if (localStorage.getItem('react-game-enthusiast17-last-game')) localStorage.removeItem('react-game-enthusiast17-last-game');
  localStorage.setItem('react-game-enthusiast17-last-game', JSON.stringify({
    level: store.getState().game.level,
    score: store.getState().game.score,
    code: store.getState().game.code,
  }));
};

interface ILastGameStore {
  level: number,
  score: number,
  code: string,
}

const isLastGameExists = (): boolean => localStorage.getItem('react-game-enthusiast17-last-game') !== null;

const getLastGame = (): ILastGameStore => {
  return JSON.parse(
    localStorage.getItem('react-game-enthusiast17-last-game') ||
    `{ level: 0, score: 0, code: '// code here' }`
    );
}

export {
  storeLastGame,
  isLastGameExists,
  getLastGame,
};
