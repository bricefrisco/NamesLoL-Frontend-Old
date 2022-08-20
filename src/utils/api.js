import { useLocation } from 'react-router-dom';

export const parseResponse = (response) =>
  new Promise((res, rej) => {
    if (!response.ok) {
      response.text().then((err) => rej(err));
    } else {
      response.json().then(res);
    }
  });

export const useParams = () => new URLSearchParams(useLocation().search);

export const navigate = (history, time, backwards, nameLength) => {
  let url = '/summoners';
  url += `?time=${time}`;
  url += `&backwards=${backwards}`;
  if (nameLength) {
    url += `&nameLength=${nameLength}`;
  }
  history.push(url);
};
