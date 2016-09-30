import { firebaseApp } from 'utils/firebase';
import * as t from 'constants/ActionTypes';

import store from 'store';

let deviceID = store.get('device_id');

export const resourceBaseUrl = `users/${deviceID}`;
export const Collection = firebaseApp.database().ref(`${resourceBaseUrl}/collections/`);
export const RecentComic = firebaseApp.database().ref(`${resourceBaseUrl}/recentComics/`);
export const ReadingRecord = firebaseApp.database().ref(`${resourceBaseUrl}/readingRecord`);

/* Collection Resource */
export const fetchCollections = () => {
	return dispatch => {
		Collection.on('value', snapshot => {
			dispatch({
				type: t.FETCH_ALL_COLLECTION,
				collections: snapshot.val() || {}
			});
		});
	};
};

export const turnOffFetchCollectionCallback = () => {
	return dispatch => Collection.off();
};

export const addCollection = (comic) => {
	return dispatch => firebaseApp.database().ref(`${resourceBaseUrl}/collections/${comic.comicID}`).set({...comic, created_at: new Date().getTime()});
};

export const removeCollection = (key, callback=null) => {
	return dispatch => {
		Collection.child(key).remove();
		if (callback) callback();
	};
};

/* RecentComic Resource */
export const fetchRecentComic = () => {
	return dispatch => {
		RecentComic.on('value', snapshot => {
			dispatch({
				type: t.FETCH_RECENT_COMICS,
				recentComics: snapshot.val() || {}
			});
		});
	};
};

export const turnOffFetchRecentComicCallback = () => {
	return dispatch => RecentComic.off();
};

export const addRecentComic = (comic) => {
	return dispatch => firebaseApp.database().ref(`${resourceBaseUrl}/recentComics/${comic.comicID}`).set({...comic, last_read_at: new Date().getTime()});
};

export const removeRecentComic = (key, callback=null) => {
	return dispatch => {
		RecentComic.child(key).remove();
		if (callback) callback();
	};
};

/* Reading Resource */
export const updateReadingRecord = ({comicID, chapterID}) => {
	let ref = firebaseApp.database().ref(`${resourceBaseUrl}/readingRecord/${comicID}`);
	ref.once('value').then(snapshot => {
		ref.update({...snapshot.val(), [chapterID]: new Date().getTime()});
	});
};

