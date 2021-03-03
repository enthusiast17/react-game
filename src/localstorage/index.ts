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
};

interface IStatStore {
  level: number,
  score: number,
  time: number,
}

const storeStats = () => {
  let stats = JSON.parse(localStorage.getItem('react-game-enthusiast17-stats') || '[]') as IStatStore[];
  stats.push({
    level: store.getState().game.level,
    score: store.getState().game.score,
    time: store.getState().game.time,
  });
  stats = stats.sort((a: IStatStore, b: IStatStore) => {
    if (a.time < b.time) return -1;
    else if (a.time > b.time) return 1;
    else return 0;
  });
  localStorage.setItem('react-game-enthusiast17-stats', JSON.stringify(stats.slice(0, 10)));
};

const getStats = (): { level: number, score: number, time: string }[] => {
  return JSON.parse(localStorage.getItem('react-game-enthusiast17-stats') || '[]').map((element: IStatStore) => {
    const sec = Math.floor(element.time % 60)
    const min = Math.floor(element.time / 60)
    return ({
      ...element,
      time: `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`,
    })
  })
}

export {
  storeLastGame,
  storeStats,
  isLastGameExists,
  getLastGame,
  getStats,
};
