import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import persistState from 'redux-localstorage'
import createRootReducer from './redux'

export const history = createBrowserHistory()

export default function configureStore(preloadedState?: any) {
	const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
	const store = createStore(
		createRootReducer(history),
		preloadedState,
		composeEnhancer(applyMiddleware(routerMiddleware(history)), persistState())
	)

	// Hot reloading
	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./redux', () => {
			store.replaceReducer(createRootReducer(history))
		})
	}

	return store
}
