import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const storePersistorConfig = () => {
	let store = createStore(
		persistedReducer,
		composeWithDevTools(applyMiddleware(thunk))
	);

	let persistor = persistStore(store);
	return { store, persistor };
};
